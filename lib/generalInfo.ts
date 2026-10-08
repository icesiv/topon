import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { BaseFirestoreDoc, setCache, getCached, clearCache } from "./firebase-service";

export interface GeneralInfoData extends Partial<BaseFirestoreDoc> {
  companyName: string;
  tagline: string;
  description?: string;
  dhakaPhone: string;
  ctgPhone: string;
  email: string;
  headOfficeAddress: string;
  chattogramOfficeAddress: string;
  operatingHours: string;
  facebookUrl: string;
  linkedinUrl: string;
  whatsappNumber: string;
}

export const DEFAULT_GENERAL_INFO: GeneralInfoData = {
  companyName: "Top On Group",
  tagline: "BUILT ON TRUST",
  description:
    "A premier multi-sector conglomerate empowering trade through import/export sourcing, licensed customs clearing, global freight forwarding, commercial fisheries, and corporate consultancy.",
  dhakaPhone: "01711-775280",
  ctgPhone: "01711-775281",
  email: "info@toponbd.com",
  headOfficeAddress:
    "House: Ka/11 (1st Floor), Matbar Bari Moasjid Road, Jagannathpur, Bashundhara, Vatara, Dhaka-1229",
  chattogramOfficeAddress:
    "Suraiya Mansion (6th Floor), 30 Agrabad Commercial Area, Chattogram-4100",
  operatingHours: "Sat – Thu: 10:00 AM – 07:00 PM (GMT+6)",
  facebookUrl: "https://www.facebook.com/topongroup",
  linkedinUrl: "https://www.linkedin.com/company/top-on-group",
  whatsappNumber: "+8801700000000",
  status: "published",
  isDeleted: false,
};

const SETTINGS_COLLECTION = "settings";
const GENERAL_INFO_DOC = "generalInfo";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${GENERAL_INFO_DOC}`;
const LOCAL_STORAGE_KEY = "topon_general_info";
const EVENT_NAME = "topon_general_info_changed";

function getLocalGeneralInfo(): GeneralInfoData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return { ...DEFAULT_GENERAL_INFO, ...parsed };
      }
    }
  } catch {
    // Ignore localStorage read errors
  }
  return null;
}

function setLocalGeneralInfo(data: GeneralInfoData, broadcast: boolean = false): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    if (broadcast) {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
    }
  } catch {
    // Ignore localStorage write errors
  }
}

export function getGeneralInfoSync(): GeneralInfoData {
  const cached = getCached<GeneralInfoData>(CACHE_KEY);
  if (cached) return cached;

  const local = getLocalGeneralInfo();
  if (local) return local;

  return DEFAULT_GENERAL_INFO;
}

export async function fetchGeneralInfo(useCache: boolean = true): Promise<GeneralInfoData> {
  if (useCache) {
    const cached = getCached<GeneralInfoData>(CACHE_KEY);
    if (cached) return cached;
  }

  const local = getLocalGeneralInfo();
  if (local) {
    setCache(CACHE_KEY, local, 120000);
    return local;
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
      setLocalGeneralInfo(data);
      return data;
    }
  } catch (err) {
    console.error("Error fetching general info:", err);
  }

  return DEFAULT_GENERAL_INFO;
}

export function subscribeGeneralInfo(
  onUpdate: (info: GeneralInfoData) => void
): Unsubscribe {
  // 1. Emit current local or default immediately for instant hydration
  const initial = getGeneralInfoSync();
  onUpdate(initial);

  // 2. Cross-component & cross-tab synchronization
  const handleLocalChange = (e: Event) => {
    const customEvt = e as CustomEvent<GeneralInfoData>;
    if (customEvt.detail) {
      setCache(CACHE_KEY, customEvt.detail, 120000);
      onUpdate(customEvt.detail);
    } else {
      const updated = getGeneralInfoSync();
      onUpdate(updated);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener(EVENT_NAME, handleLocalChange);
    window.addEventListener("storage", handleLocalChange);
  }

  let firestoreUnsub: Unsubscribe | null = null;

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
      firestoreUnsub = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists() && snap.data()) {
            const data = { ...DEFAULT_GENERAL_INFO, ...(snap.data() as Partial<GeneralInfoData>) };
            setCache(CACHE_KEY, data, 120000);
            setLocalGeneralInfo(data);
            onUpdate(data);
          } else {
            onUpdate(DEFAULT_GENERAL_INFO);
          }
        },
        (err) => {
          console.warn("Firestore general info snapshot error:", err);
        }
      );
    } catch (err) {
      console.error("Failed to subscribe to general info:", err);
    }
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener(EVENT_NAME, handleLocalChange);
      window.removeEventListener("storage", handleLocalChange);
    }
    if (firestoreUnsub) {
      firestoreUnsub();
    }
  };
}

export async function saveGeneralInfo(
  info: Partial<GeneralInfoData>,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const merged: GeneralInfoData = {
    ...getGeneralInfoSync(),
    ...info,
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail || "admin",
  };

  // Immediate optimistic update to memory & localStorage for zero UI delay
  setCache(CACHE_KEY, merged, 120000);
  setLocalGeneralInfo(merged, true);

  if (!isFirebaseConfigured() || !db) {
    return {
      success: true,
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GENERAL_INFO_DOC);
    const now = new Date().toISOString();
    const payload = {
      ...merged,
      updatedAt: now,
      updatedBy: userEmail || "admin",
      status: merged.status || "published",
      isDeleted: false,
    };
    await setDoc(docRef, payload, { merge: true });
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Error saving general info to Firestore:", err);
    return { success: false, error: err?.message || "Failed to save general info." };
  }
}
