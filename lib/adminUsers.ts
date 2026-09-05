import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Editor" | "Operations Admin" | "Viewer";
  status: "Active" | "Pending" | "Suspended";
  createdAt: string;
  lastLogin?: string;
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

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_ADMIN_USERS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.users) && snap.data()?.users.length > 0) {
      return snap.data().users as AdminUser[];
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
          onUpdate(snap.data().users as AdminUser[]);
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
  users: AdminUser[]
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADMIN_USERS_DOC);
    await setDoc(docRef, { users, updatedAt: new Date().toISOString() }, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error("Error saving admin users:", err);
    return { success: false, error: err?.message || "Failed to save admin users." };
  }
}
