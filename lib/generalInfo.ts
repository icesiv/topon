import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface GeneralInfoData {
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
};

const SETTINGS_COLLECTION = "settings";
const GENERAL_INFO_DOC = "generalInfo";

export async function fetchGeneralInfo(): Promise<GeneralInfoData> {
  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_GENERAL_INFO;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data()) {
      return { ...DEFAULT_GENERAL_INFO, ...(snap.data() as Partial<GeneralInfoData>) };
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
          onUpdate({ ...DEFAULT_GENERAL_INFO, ...(snap.data() as Partial<GeneralInfoData>) });
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
  info: GeneralInfoData
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    await setDoc(docRef, { ...info, updatedAt: new Date().toISOString() }, { merge: true });
    return { success: true };
  } catch (err: any) {
    console.error("Error saving general info:", err);
    return { success: false, error: err?.message || "Failed to save general info." };
  }
}
