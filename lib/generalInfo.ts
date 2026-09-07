import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { BaseFirestoreDoc, setCache, getCached, clearCache } from "./firebase-service";

export interface GeneralInfoData extends Partial<BaseFirestoreDoc> {
  companyName: string;
  tagline: string;
  dhakaPhone: string;
  ctgPhone: string;
  email: string;
  headOfficeAddress: string;
  operatingHours: string;
  facebookUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
}

export const DEFAULT_GENERAL_INFO: GeneralInfoData = {
  companyName: "Top On Group",
  tagline: "On Time. Every Time.",
  dhakaPhone: "01711-775280",
  ctgPhone: "01711-775281",
  email: "info@toponbd.com",
  headOfficeAddress: "Dhaka, Bangladesh",
  operatingHours: "Monday – Saturday: 09:00 AM – 06:00 PM (GMT+6)",
  facebookUrl: "https://www.facebook.com/topongroup",
  linkedinUrl: "https://www.linkedin.com/company/topongroup",
  whatsappNumber: "+8801700000000",
  status: "published",
  isDeleted: false,
};

const SETTINGS_COLLECTION = "settings";
const GENERAL_INFO_DOC = "generalInfo";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${GENERAL_INFO_DOC}`;

export async function fetchGeneralInfo(useCache: boolean = true): Promise<GeneralInfoData> {
  if (useCache) {
    const cached = getCached<GeneralInfoData>(CACHE_KEY);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_GENERAL_INFO;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data()) {
      const data = { ...DEFAULT_GENERAL_INFO, ...(snap.data() as Partial<GeneralInfoData>) };
      setCache(CACHE_KEY, data, 120000); // 2 minute cache
      return data;
    }
  } catch (err) {
    console.error("Error fetching general info:", err);
  }

  return DEFAULT_GENERAL_INFO;
}

export function subscribeGeneralInfo(
  onUpdate: (info: GeneralInfoData) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(DEFAULT_GENERAL_INFO);
    return null;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists() && snap.data()) {
          const data = { ...DEFAULT_GENERAL_INFO, ...(snap.data() as Partial<GeneralInfoData>) };
          setCache(CACHE_KEY, data, 120000);
          onUpdate(data);
        } else {
          onUpdate(DEFAULT_GENERAL_INFO);
        }
      },
      (err) => {
        console.warn("Firestore general info snapshot error:", err);
        onUpdate(DEFAULT_GENERAL_INFO);
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to general info:", err);
    onUpdate(DEFAULT_GENERAL_INFO);
    return null;
  }
}

export async function saveGeneralInfo(
  info: Partial<GeneralInfoData>,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    const now = new Date().toISOString();
    const payload = {
      ...info,
      updatedAt: now,
      updatedBy: userEmail || "admin",
      status: info.status || "published",
      isDeleted: false,
    };
    await setDoc(docRef, payload, { merge: true });
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Error saving general info:", err);
    return { success: false, error: err?.message || "Failed to save general info." };
  }
}
