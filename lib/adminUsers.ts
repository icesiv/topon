import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor" | "Operations Admin" | "Viewer";
  status: "Active" | "Pending" | "Suspended";
  createdAt: string;
  lastLogin?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

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
  {
    id: "admin_3",
    name: "Logistics Operations Desk",
    email: "shipping@toponbd.com",
    role: "Operations Admin",
    status: "Active",
    createdAt: "2024-06-20",
    lastLogin: "3 days ago",
  },
];

const SETTINGS_COLLECTION = "settings";
const ADMIN_USERS_DOC = "adminUsers";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${ADMIN_USERS_DOC}`;

export async function fetchAdminUsers(useCache: boolean = true): Promise<AdminUser[]> {
  if (useCache) {
    const cached = getCached<AdminUser[]>(CACHE_KEY);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_ADMIN_USERS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.users) && snap.data()?.users.length > 0) {
      const activeUsers = (snap.data().users as AdminUser[]).filter((u) => !u.isDeleted);
      setCache(CACHE_KEY, activeUsers, 120000);
      return activeUsers;
    }
  } catch (err) {
    console.error("Error fetching admin users:", err);
  }

  return DEFAULT_ADMIN_USERS;
}

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
          setCache(CACHE_KEY, activeUsers, 120000);
          onUpdate(activeUsers);
        } else {
          onUpdate(DEFAULT_ADMIN_USERS);
        }
      },
      (err) => {
        console.warn("Firestore admin users snapshot error:", err);
        onUpdate(DEFAULT_ADMIN_USERS);
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to admin users:", err);
    onUpdate(DEFAULT_ADMIN_USERS);
    return null;
  }
}

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
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    await setDoc(
      docRef,
      {
        users,
        updatedAt: new Date().toISOString(),
        updatedBy: userEmail || "admin",
      },
      { merge: true }
    );
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Error saving admin users:", err);
    return { success: false, error: err?.message || "Failed to save admin users." };
  }
}
