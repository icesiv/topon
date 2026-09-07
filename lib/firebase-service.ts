import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch,
  runTransaction,
  getCountFromServer,
  onSnapshot,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export type DocumentStatus = "draft" | "published" | "archived";

export interface BaseFirestoreDoc {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  status?: DocumentStatus;
  order?: number;
  isDeleted?: boolean;
  deletedAt?: string | null;
}

// In-memory cache for fast, zero-read repeated accesses
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMs: number;
}
const memoryCache = new Map<string, CacheEntry<any>>();

export function getCached<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttlMs) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCache<T>(key: string, data: T, ttlMs: number = 60000): void {
  memoryCache.set(key, { data, timestamp: Date.now(), ttlMs });
}

export function clearCache(keyPattern?: string): void {
  if (!keyPattern) {
    memoryCache.clear();
    return;
  }
  Array.from(memoryCache.keys()).forEach((key) => {
    if (key.includes(keyPattern)) {
      memoryCache.delete(key);
    }
  });
}

/**
 * Fetch a single document by collection path and ID
 */
export async function getDocById<T extends BaseFirestoreDoc>(
  collectionName: string,
  docId: string,
  options?: { useCache?: boolean; ttlMs?: number }
): Promise<T | null> {
  const cacheKey = `${collectionName}:${docId}`;
  if (options?.useCache) {
    const cached = getCached<T>(cacheKey);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) return null;

  try {
    const docRef = doc(db, collectionName, docId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = { id: snap.id, ...snap.data() } as T;
      if (options?.useCache) setCache(cacheKey, data, options.ttlMs || 60000);
      return data;
    }
    return null;
  } catch (err) {
    console.error(`Error fetching document ${collectionName}/${docId}:`, err);
    return null;
  }
}

/**
 * Fetch active published documents from a collection with optimal filtering and sorting
 */
export async function getPublishedDocs<T extends BaseFirestoreDoc>(
  collectionName: string,
  options?: {
    category?: string;
    sortBy?: "order" | "createdAt" | "updatedAt";
    sortDirection?: "asc" | "desc";
    limitCount?: number;
    useCache?: boolean;
    ttlMs?: number;
  }
): Promise<T[]> {
  const cacheKey = `published:${collectionName}:${JSON.stringify(options || {})}`;
  if (options?.useCache) {
    const cached = getCached<T[]>(cacheKey);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) return [];

  try {
    const colRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [
      where("status", "==", "published"),
      where("isDeleted", "==", false),
    ];

    if (options?.category) {
      constraints.push(where("category", "==", options.category));
    }

    const sortField = options?.sortBy || "order";
    const sortDir = options?.sortDirection || "asc";
    constraints.push(orderBy(sortField, sortDir));

    if (options?.limitCount) {
      constraints.push(limit(options.limitCount));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);

    const results: T[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as T[];

    if (options?.useCache) {
      setCache(cacheKey, results, options.ttlMs || 120000); // 2 min default cache
    }

    return results;
  } catch (err) {
    console.error(`Error querying published documents from ${collectionName}:`, err);
    return [];
  }
}

/**
 * Fetch all documents for Admin with cursor pagination
 */
export async function fetchPaginatedDocs<T extends BaseFirestoreDoc>(
  collectionName: string,
  options: {
    pageSize: number;
    lastVisibleDoc?: QueryDocumentSnapshot<DocumentData> | null;
    includeDeleted?: boolean;
    statusFilter?: DocumentStatus | "all";
    sortBy?: string;
    sortDirection?: "asc" | "desc";
  }
): Promise<{
  docs: T[];
  lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> {
  if (!isFirebaseConfigured() || !db) {
    return { docs: [], lastVisible: null, hasMore: false };
  }

  try {
    const colRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [];

    if (!options.includeDeleted) {
      constraints.push(where("isDeleted", "==", false));
    }

    if (options.statusFilter && options.statusFilter !== "all") {
      constraints.push(where("status", "==", options.statusFilter));
    }

    const sortField = options.sortBy || "order";
    const sortDir = options.sortDirection || "asc";
    constraints.push(orderBy(sortField, sortDir));

    if (options.lastVisibleDoc) {
      constraints.push(startAfter(options.lastVisibleDoc));
    }

    constraints.push(limit(options.pageSize + 1)); // Fetch 1 extra to check hasMore

    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);

    const hasMore = snapshot.docs.length > options.pageSize;
    const rawDocs = hasMore ? snapshot.docs.slice(0, options.pageSize) : snapshot.docs;
    const lastDoc = rawDocs.length > 0 ? rawDocs[rawDocs.length - 1] : null;

    const items: T[] = rawDocs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    })) as T[];

    return {
      docs: items,
      lastVisible: lastDoc,
      hasMore,
    };
  } catch (err) {
    console.error(`Error in fetchPaginatedDocs for ${collectionName}:`, err);
    return { docs: [], lastVisible: null, hasMore: false };
  }
}

/**
 * Count total documents using zero-data-transfer aggregation
 */
export async function countCollectionDocs(
  collectionName: string,
  filter?: { status?: DocumentStatus; isDeleted?: boolean }
): Promise<number> {
  if (!isFirebaseConfigured() || !db) return 0;

  try {
    const colRef = collection(db, collectionName);
    const constraints: QueryConstraint[] = [];

    if (filter?.status) {
      constraints.push(where("status", "==", filter.status));
    }
    if (filter?.isDeleted !== undefined) {
      constraints.push(where("isDeleted", "==", filter.isDeleted));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (err) {
    console.error(`Error counting documents in ${collectionName}:`, err);
    return 0;
  }
}

/**
 * Create or overwrite a document with standard metadata
 */
export async function createDoc<T extends Record<string, any>>(
  collectionName: string,
  data: T,
  customId?: string,
  userEmail?: string
): Promise<{ success: boolean; id: string; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, id: "", error: "Firebase is not configured" };
  }

  try {
    const now = new Date().toISOString();
    const docRef = customId ? doc(db, collectionName, customId) : doc(collection(db, collectionName));
    const finalDoc = {
      ...data,
      id: docRef.id,
      createdAt: data.createdAt || now,
      updatedAt: now,
      createdBy: userEmail || "admin",
      status: data.status || "draft",
      order: data.order ?? 0,
      isDeleted: false,
      deletedAt: null,
    };

    await setDoc(docRef, finalDoc);
    clearCache(collectionName);
    return { success: true, id: docRef.id };
  } catch (err: any) {
    console.error(`Error creating document in ${collectionName}:`, err);
    return { success: false, id: "", error: err?.message || "Failed to create document" };
  }
}

/**
 * Update document fields and bump updatedAt timestamp
 */
export async function updateDocById(
  collectionName: string,
  docId: string,
  data: Partial<BaseFirestoreDoc> & Record<string, any>,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, error: "Firebase is not configured" };
  }

  try {
    const docRef = doc(db, collectionName, docId);
    const payload = {
      ...data,
      updatedAt: new Date().toISOString(),
      ...(userEmail ? { updatedBy: userEmail } : {}),
    };

    await updateDoc(docRef, payload);
    clearCache(collectionName);
    return { success: true };
  } catch (err: any) {
    console.error(`Error updating document ${collectionName}/${docId}:`, err);
    return { success: false, error: err?.message || "Failed to update document" };
  }
}

/**
 * Soft delete document (preserves audit history and allows undo)
 */
export async function softDeleteDoc(
  collectionName: string,
  docId: string,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const now = new Date().toISOString();
  return updateDocById(
    collectionName,
    docId,
    {
      isDeleted: true,
      deletedAt: now,
      status: "archived",
    },
    userEmail
  );
}

/**
 * Restore soft-deleted document
 */
export async function restoreDoc(
  collectionName: string,
  docId: string,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  return updateDocById(
    collectionName,
    docId,
    {
      isDeleted: false,
      deletedAt: null,
      status: "draft",
    },
    userEmail
  );
}

/**
 * Batch write multiple items (handles auto-chunking for > 500 items)
 */
export async function batchWriteDocs(
  collectionName: string,
  items: Array<{ id: string; data: Record<string, any>; type?: "set" | "update" | "delete" }>
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, error: "Firebase is not configured" };
  }

  try {
    const CHUNK_SIZE = 450;
    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
      const chunk = items.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);
      const now = new Date().toISOString();

      for (const item of chunk) {
        const docRef = doc(db, collectionName, item.id);
        const action = item.type || "set";

        if (action === "delete") {
          batch.delete(docRef);
        } else if (action === "update") {
          batch.update(docRef, { ...item.data, updatedAt: now });
        } else {
          batch.set(docRef, { ...item.data, updatedAt: now }, { merge: true });
        }
      }

      await batch.commit();
    }

    clearCache(collectionName);
    return { success: true };
  } catch (err: any) {
    console.error(`Batch write error in ${collectionName}:`, err);
    return { success: false, error: err?.message || "Batch write failed" };
  }
}

/**
 * Batch reorder items in an atomic write
 */
export async function batchReorderDocs(
  collectionName: string,
  orderedIds: string[]
): Promise<{ success: boolean; error?: string }> {
  const items = orderedIds.map((id, index) => ({
    id,
    data: { order: index },
    type: "update" as const,
  }));
  return batchWriteDocs(collectionName, items);
}

/**
 * Atomic Transaction Helper for Read-Then-Write consistency (e.g. counters, unique slugs)
 */
export async function runAtomicTransaction<T>(
  updateFn: (transaction: any) => Promise<T>
): Promise<{ success: boolean; data?: T; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, error: "Firebase is not configured" };
  }

  try {
    const result = await runTransaction(db, async (transaction) => {
      return await updateFn(transaction);
    });
    return { success: true, data: result };
  } catch (err: any) {
    console.error("Transaction failed:", err);
    return { success: false, error: err?.message || "Transaction failed" };
  }
}

/**
 * Subscribe to a document with real-time updates
 */
export function subscribeToDoc<T extends BaseFirestoreDoc>(
  collectionName: string,
  docId: string,
  onUpdate: (data: T | null) => void,
  onError?: (error: Error) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(null);
    return null;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          onUpdate({ id: snap.id, ...snap.data() } as T);
        } else {
          onUpdate(null);
        }
      },
      (err) => {
        console.warn(`Snapshot subscription error for ${collectionName}/${docId}:`, err);
        if (onError) onError(err);
      }
    );
  } catch (err: any) {
    console.error(`Failed to subscribe to ${collectionName}/${docId}:`, err);
    return null;
  }
}
