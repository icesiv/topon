import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  updateProfile as firebaseUpdateProfile,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  User,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "./firebase";

export interface AuthSessionUser {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role: "Super Admin" | "Editor";
  isMock?: boolean;
}

const LOCAL_STORAGE_AUTH_KEY = "topon_admin_session";

/**
 * Save mock/local session for offline or development mode
 */
function setLocalSession(user: AuthSessionUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(user));
  } catch (e) {
    console.warn("Could not save local auth session:", e);
  }
}

function getLocalSession(): AuthSessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearLocalSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  } catch (e) {
    console.warn("Could not clear local auth session:", e);
  }
}

import { findAdminByEmail, recordAdminLogin, fetchAdminUsers, saveAdminUsers } from "./adminUsers";

/**
 * Login user verifying strictly against the authorized Firebase Admin Users directory
 */
export async function loginAdmin(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AuthSessionUser; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !pass) {
    return { success: false, error: "Please enter both email and password." };
  }

  // 1. Authorize: Check if this user is in the Firebase Admin Users directory
  const adminRecord = await findAdminByEmail(cleanEmail);

  if (!adminRecord) {
    return {
      success: false,
      error: `Access Denied: The email "${email.trim()}" is not registered as an authorized administrator. Only team members listed in Admin Team & Role Management can access the system.`,
    };
  }

  // 2. Status check: Account must be Active
  if (adminRecord.status !== "Active") {
    return {
      success: false,
      error: `Access Denied: Your administrator account is currently marked as "${adminRecord.status}". Please contact a Super Admin to restore access.`,
    };
  }

  let fbUser: User | null = null;
  let authSuccess = false;

  // 3. Authenticate credential
  const hasCustomPassword = Boolean(adminRecord.password && adminRecord.password.trim());

  if (hasCustomPassword) {
    // If a custom password has been explicitly set in Firestore for this admin:
    // That custom password is the absolute source of truth. Old passwords and bootstrap defaults are strictly rejected!
    if (pass !== adminRecord.password!.trim()) {
      return { success: false, error: "Invalid password. Please check your credentials." };
    }

    // Password matches the active administrator password!
    if (isFirebaseConfigured() && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
        fbUser = userCredential.user;
      } catch {
        // Firebase Auth user might not exist or may have an un-synced password.
        // We grant access because the administrator password in Firestore was verified.
      }
    }
    authSuccess = true;
  } else {
    // No custom password set on this admin record yet (initial unconfigured account):
    if (isFirebaseConfigured() && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
        fbUser = userCredential.user;
        authSuccess = true;
      } catch (err: any) {
        // Fallback to initial bootstrap passwords ONLY when no custom password exists:
        const initialBootstrapPasswords = ["admin123456", "admin@123", "topon2026"];
        if (initialBootstrapPasswords.includes(pass)) {
          authSuccess = true;
        } else {
          let errorMsg = "Invalid password. Please check your credentials.";
          if (err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential") {
            errorMsg = "Invalid password. Please check your credentials.";
          } else if (err?.code === "auth/too-many-requests") {
            errorMsg = "Too many failed login attempts. Please wait a moment and try again.";
          }
          return { success: false, error: errorMsg };
        }
      }
    } else {
      const initialBootstrapPasswords = ["admin123456", "admin@123", "topon2026"];
      if (initialBootstrapPasswords.includes(pass)) {
        authSuccess = true;
      } else {
        return { success: false, error: "Invalid password. Please check your credentials." };
      }
    }
  }

  if (!authSuccess) {
    return { success: false, error: "Authentication failed. Please verify your credentials." };
  }

  // 4. Session user strictly adopts role and profile from Firebase Admin Users record
  const sessionUser: AuthSessionUser = {
    uid: fbUser ? fbUser.uid : adminRecord.id,
    email: adminRecord.email,
    displayName: adminRecord.name,
    role: adminRecord.role,
    isMock: !fbUser,
  };

  setLocalSession(sessionUser);

  // 5. Update last login timestamp in Firebase
  recordAdminLogin(adminRecord.email).catch(() => {});

  return { success: true, user: sessionUser };
}

/**
 * Log out user from Firebase Auth and clear local session
 */
export async function logoutAdmin(): Promise<{ success: boolean; error?: string }> {
  clearLocalSession();
  if (isFirebaseConfigured() && auth) {
    try {
      await firebaseSignOut(auth);
    } catch (err: any) {
      console.warn("Firebase sign out error:", err);
    }
  }
  return { success: true };
}

/**
 * Update password for the currently logged-in user and persist to Firebase Firestore
 */
export async function changeAdminPassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters long." };
  }

  const localSession = getLocalSession();
  if (!localSession?.email) {
    return { success: false, error: "No active user session found to update password. Please log in again." };
  }

  const adminRecord = await findAdminByEmail(localSession.email);
  if (!adminRecord) {
    return { success: false, error: "Administrator record not found in system directory." };
  }

  // 1. Validate the current password
  let currentPasswordValid = false;

  if (adminRecord.password && adminRecord.password.trim()) {
    currentPasswordValid = currentPassword === adminRecord.password.trim();
  } else {
    // If no custom password was set yet, check initial bootstrap passwords
    const initialBootstrapPasswords = ["admin123456", "admin@123", "topon2026"];
    currentPasswordValid = initialBootstrapPasswords.includes(currentPassword);
  }

  // Also check Firebase Auth re-authentication if available
  if (isFirebaseConfigured() && auth && auth.currentUser && auth.currentUser.email) {
    try {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      currentPasswordValid = true;
    } catch {
      // Re-authentication failed or unnecessary if directory matched
    }
  }

  if (!currentPasswordValid) {
    return { success: false, error: "The current password you entered is incorrect." };
  }

  // 2. Update Firebase Auth password if currentUser is logged in
  if (isFirebaseConfigured() && auth && auth.currentUser) {
    try {
      await firebaseUpdatePassword(auth.currentUser, newPassword);
    } catch (err: any) {
      console.warn("Notice: Firebase Auth password update:", err?.message);
    }
  }

  // 3. Persist new password into Firestore settings/adminUsers so it takes effect everywhere
  try {
    const allUsers = await fetchAdminUsers(false);
    const updatedUsers = allUsers.map((u) => {
      if (u.email.toLowerCase() === localSession.email!.toLowerCase()) {
        return {
          ...u,
          password: newPassword,
          updatedAt: new Date().toISOString(),
        };
      }
      return u;
    });

    const saveRes = await saveAdminUsers(updatedUsers, localSession.email);
    if (!saveRes.success) {
      return { success: false, error: saveRes.error || "Failed to save new password to Firestore." };
    }
  } catch (err: any) {
    console.error("Error saving new password to Firestore:", err);
    return { success: false, error: err?.message || "Failed to update password in Firestore." };
  }

  return { success: true };
}

/**
 * Update administrative profile info (displayName, role)
 */
export async function updateAdminProfile(
  displayName: string,
  role?: "Super Admin" | "Editor"
): Promise<{ success: boolean; user?: AuthSessionUser; error?: string }> {
  const current = getLocalSession();
  const updatedUser: AuthSessionUser = {
    uid: current?.uid || "local_admin_mamun",
    email: current?.email || "admin@toponbd.com",
    displayName: displayName.trim(),
    role: (role || current?.role || "Super Admin") as "Super Admin" | "Editor",
    isMock: current?.isMock ?? false,
  };

  if (isFirebaseConfigured() && auth && auth.currentUser) {
    try {
      await firebaseUpdateProfile(auth.currentUser, { displayName: displayName.trim() });
    } catch (e) {
      console.warn("Firebase updateProfile warning:", e);
    }
  }

  setLocalSession(updatedUser);
  return { success: true, user: updatedUser };
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (isFirebaseConfigured() && auth) {
    try {
      await firebaseSendPasswordResetEmail(auth, email.trim());
      return { success: true };
    } catch (err: any) {
      console.error("Password reset error:", err);
      return { success: false, error: err?.message || "Failed to send reset email." };
    }
  }

  return {
    success: true,
    error: "Mock mode: Password reset email request recorded.",
  };
}

/**
 * Subscribe to auth state changes and verify against Firebase Admin directory
 */
export function subscribeToAuthState(
  callback: (user: AuthSessionUser | null) => void
): () => void {
  if (typeof window === "undefined") {
    callback(null);
    return () => {};
  }

  // Check initial local session first for instant UI response, but verify against Firebase asynchronously
  const initialLocal = getLocalSession();
  if (initialLocal) {
    callback(initialLocal);
    // Asynchronously verify this session is still an active admin in Firebase
    if (initialLocal.email) {
      findAdminByEmail(initialLocal.email).then((adminRecord) => {
        if (!adminRecord || adminRecord.status !== "Active") {
          clearLocalSession();
          if (isFirebaseConfigured() && auth) {
            firebaseSignOut(auth).catch(() => {});
          }
          callback(null);
        } else if (
          adminRecord.role !== initialLocal.role ||
          adminRecord.name !== initialLocal.displayName
        ) {
          const synced: AuthSessionUser = {
            ...initialLocal,
            role: adminRecord.role,
            displayName: adminRecord.name,
          };
          setLocalSession(synced);
          callback(synced);
        }
      }).catch(() => {});
    }
  }

  if (isFirebaseConfigured() && auth) {
    const unsub = onAuthStateChanged(auth, async (fbUser: User | null) => {
      if (fbUser && fbUser.email) {
        try {
          const adminRecord = await findAdminByEmail(fbUser.email);
          if (!adminRecord || adminRecord.status !== "Active") {
            clearLocalSession();
            if (auth) {
              await firebaseSignOut(auth).catch(() => {});
            }
            callback(null);
            return;
          }

          const sessionUser: AuthSessionUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: adminRecord.name || fbUser.displayName || fbUser.email.split("@")[0],
            role: adminRecord.role,
            isMock: false,
          };
          setLocalSession(sessionUser);
          callback(sessionUser);
        } catch {
          callback(null);
        }
      } else {
        const local = getLocalSession();
        if (local && local.email) {
          findAdminByEmail(local.email).then((adminRecord) => {
            if (adminRecord && adminRecord.status === "Active") {
              const synced: AuthSessionUser = {
                ...local,
                role: adminRecord.role,
                displayName: adminRecord.name,
              };
              setLocalSession(synced);
              callback(synced);
            } else {
              clearLocalSession();
              callback(null);
            }
          }).catch(() => {
            clearLocalSession();
            callback(null);
          });
        } else {
          clearLocalSession();
          callback(null);
        }
      }
    });

    return () => unsub();
  }

  callback(initialLocal);
  return () => {};
}
