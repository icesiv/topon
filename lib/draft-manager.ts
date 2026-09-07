import { updateDocById, BaseFirestoreDoc } from "./firebase-service";

export interface DraftState<T> {
  data: T;
  isDirty: boolean;
  lastSavedAt: string | null;
}

const LOCAL_STORAGE_DRAFT_PREFIX = "topon_draft_";

/**
 * Save draft state to localStorage for offline protection and crash recovery
 */
export function saveLocalDraft<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      data,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${key}`, JSON.stringify(payload));
  } catch (err) {
    console.warn("Could not save draft to localStorage:", err);
  }
}

/**
 * Load draft state from localStorage
 */
export function loadLocalDraft<T>(key: string): { data: T; savedAt: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${key}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not load draft from localStorage:", err);
    return null;
  }
}

/**
 * Clear local draft once published
 */
export function clearLocalDraft(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${LOCAL_STORAGE_DRAFT_PREFIX}${key}`);
  } catch (err) {
    console.warn("Could not clear local draft:", err);
  }
}

/**
 * Publish a draft document explicitly to make it public
 */
export async function publishDocument(
  collectionName: string,
  docId: string,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  return updateDocById(
    collectionName,
    docId,
    {
      status: "published",
      updatedAt: new Date().toISOString(),
    },
    userEmail
  );
}

/**
 * Revert a published document back to draft status
 */
export async function unpublishDocument(
  collectionName: string,
  docId: string,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  return updateDocById(
    collectionName,
    docId,
    {
      status: "draft",
      updatedAt: new Date().toISOString(),
    },
    userEmail
  );
}
