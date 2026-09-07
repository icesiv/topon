import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  Firestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let auth: Auth | null = null;

if (typeof window !== "undefined" || isFirebaseConfigured()) {
  try {
    if (isFirebaseConfigured()) {
      app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

      // Enable persistent IndexedDB offline local cache in browser environment
      if (typeof window !== "undefined") {
        try {
          db = initializeFirestore(app, {
            localCache: persistentLocalCache({
              tabManager: persistentMultipleTabManager(),
            }),
          });
        } catch (cacheErr) {
          // If already initialized, fallback to getFirestore
          db = getFirestore(app);
        }
      } else {
        db = getFirestore(app);
      }

      storage = getStorage(app);
      auth = getAuth(app);
    }
  } catch (err) {
    console.warn("Firebase initialization skipped or failed:", err);
  }
}

/**
 * Helper to optionally initialize Firebase App Check for production security
 */
export async function initAppCheck() {
  if (typeof window === "undefined" || !app) return null;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!recaptchaKey) return null;

  try {
    const { initializeAppCheck, ReCaptchaV3Provider } = await import("firebase/app-check");
    return initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (err) {
    console.warn("Firebase App Check failed to initialize:", err);
    return null;
  }
}

export { app, db, storage, auth, firebaseConfig };
