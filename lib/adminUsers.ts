import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor";
  status: "Active" | "Pending" | "Suspended";
  createdAt: string;
  lastLogin?: string;
  password?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

/**
 * Canonical default admin users synchronized with Firebase
 */
export const DEFAULT_ADMIN_USERS: AdminUser[] = [
  {
    id: "admin_1",
    name: "Md. Abdullah Al Mamun",
    email: "mamun@toponbd.com",
    role: "Super Admin",
    status: "Active",
    createdAt: "2024-01-01",
    lastLogin: "Active Now",
  },
  {
    id: "admin_2",
    name: "Corporate Communications",
    email: "info@toponbd.com",
    role: "Editor",
    status: "Active",
    createdAt: "2024-03-15",
    lastLogin: "1 day ago",
  },
];

const SETTINGS_COLLECTION = "settings";
const ADMIN_USERS_DOC = "adminUsers";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${ADMIN_USERS_DOC}`;

/**
 * Fetch admin users directly from Firebase Firestore with optional caching
 */
export async function fetchAdminUsers(useCache: boolean = true): Promise<AdminUser[]> {
  if (useCache) {
    const cached = getCached<AdminUser[]>(CACHE_KEY);
    if (cached && cached.length > 0) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_ADMIN_USERS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.users) && snap.data()?.users.length > 0) {
      const activeUsers = (snap.data().users as AdminUser[]).filter((u) => !u.isDeleted);
      if (activeUsers.length > 0) {
        if (useCache) setCache(CACHE_KEY, activeUsers, 30000);
        return activeUsers;
      }
    }
  } catch (err) {
    console.warn("Error fetching admin users from Firebase:", err);
  }

  return DEFAULT_ADMIN_USERS;
}

/**
 * Subscribe in real time to admin users updates in Firebase Firestore
 */
export function subscribeAdminUsers(
  onUpdate: (users: AdminUser[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(DEFAULT_ADMIN_USERS);
    return null;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists() && Array.isArray(snap.data()?.users) && snap.data()?.users.length > 0) {
          const activeUsers = (snap.data().users as AdminUser[]).filter((u) => !u.isDeleted);
          setCache(CACHE_KEY, activeUsers, 30000);
          onUpdate(activeUsers);
        } else {
          onUpdate(DEFAULT_ADMIN_USERS);
        }
      },
      (err) => {
        console.warn("Firestore admin users snapshot subscription error:", err);
        fetchAdminUsers(false).then((data) => onUpdate(data)).catch(() => onUpdate(DEFAULT_ADMIN_USERS));
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to admin users:", err);
    onUpdate(DEFAULT_ADMIN_USERS);
    return null;
  }
}

/**
 * Save admin users to Firebase Firestore
 */
export async function saveAdminUsers(
  users: AdminUser[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const timestamp = new Date().toISOString();
    const payload = {
      users,
      updatedAt: timestamp,
      updatedBy: userEmail || "admin",
      status: "published",
      isDeleted: false,
    };

    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    await setDoc(docRef, payload, { merge: true });

    clearCache(SETTINGS_COLLECTION);
    setCache(CACHE_KEY, users, 30000);

    return { success: true };
  } catch (err: any) {
    console.error("Error saving admin users to Firebase:", err);
    return { success: false, error: err?.message || "Failed to save admin users to Firebase." };
  }
}

/**
 * Look up an authorized administrator by email address (case-insensitive)
 */
export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  if (!email) return null;
  const clean = email.trim().toLowerCase();
  const users = await fetchAdminUsers(false);
  return users.find((u) => u.email.trim().toLowerCase() === clean && !u.isDeleted) || null;
}

/**
 * Record lastLogin timestamp in Firebase for the given administrator
 */
export async function recordAdminLogin(email: string): Promise<void> {
  try {
    if (!email) return;
    const clean = email.trim().toLowerCase();
    const users = await fetchAdminUsers(false);
    let changed = false;
    const updated = users.map((u) => {
      if (u.email.trim().toLowerCase() === clean) {
        changed = true;
        return {
          ...u,
          lastLogin: "Active Now",
          updatedAt: new Date().toISOString(),
        };
      }
      return u;
    });

    if (changed) {
      await saveAdminUsers(updated, clean);
    }
  } catch (err) {
    console.warn("Could not record administrator last login activity:", err);
  }
}
