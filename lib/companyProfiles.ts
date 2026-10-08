import {
  Building2,
  Ship,
  Truck,
  Fish,
  Briefcase,
  FileText,
  FileDown,
  Globe,
  PackageCheck,
  ShieldCheck,
  Anchor,
  Store,
  FileCheck2,
  LucideIcon,
} from "lucide-react";
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface CompanyProfile {
  id: string;
  name: string;
  badge: string;
  pdfUrl: string;
  filename: string;
  iconName?: string;
  size: string;
  order?: number;
  status?: "published" | "draft";
  isDeleted?: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export const PROFILE_ICON_MAP: Record<string, LucideIcon> = {
  Truck,
  Ship,
  Building2,
  Fish,
  Briefcase,
  FileText,
  FileDown,
  FileCheck2,
  Globe,
  PackageCheck,
  ShieldCheck,
  Anchor,
  Store,
};

export const AVAILABLE_PROFILE_ICONS = Object.keys(PROFILE_ICON_MAP);

export const DEFAULT_COMPANY_PROFILES: CompanyProfile[] = [
  {
    id: "prof_tel",
    name: "Top Express Limited",
    badge: "Customs C&F",
    pdfUrl: "/profiles/TEL-profile.pdf",
    filename: "TEL-profile.pdf",
    iconName: "Truck",
    size: "4.9 MB",
    order: 0,
    status: "published",
  },
  {
    id: "prof_dsl",
    name: "Daily Shipping & Logistics",
    badge: "Freight Forwarding",
    pdfUrl: "/profiles/DSL-profile.pdf",
    filename: "DSL-profile.pdf",
    iconName: "Ship",
    size: "933 KB",
    order: 1,
    status: "published",
  },
  {
    id: "prof_topontech",
    name: "Top On-Tech",
    badge: "Trading House",
    pdfUrl: "/profiles/TopOnTech-profile.pdf",
    filename: "TopOnTech-profile.pdf",
    iconName: "Building2",
    size: "738 KB",
    order: 2,
    status: "published",
  },
  {
    id: "prof_toponagro",
    name: "Top On-Agro Farm",
    badge: "Fisheries & Agro",
    pdfUrl: "/profiles/TopOnAgro-profile.pdf",
    filename: "TopOnAgro-profile.pdf",
    iconName: "Fish",
    size: "1.0 MB",
    order: 3,
    status: "published",
  },
  {
    id: "prof_toponsolution",
    name: "Top On-Solution",
    badge: "Business Advisory & Professional Services",
    pdfUrl: "/profiles/TopOnSolution-profile.pdf",
    filename: "TopOnSolution-profile.pdf",
    iconName: "Briefcase",
    size: "529 KB",
    order: 4,
    status: "published",
  },
];

const SETTINGS_COLLECTION = "settings";
const PROFILES_DOC_ID = "company_profiles";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${PROFILES_DOC_ID}`;
const LOCAL_STORAGE_KEY = "topon_company_profiles";
const EVENT_NAME = "topon_company_profiles_changed";

/**
 * Fetch company profiles with multi-tier caching (Memory -> LocalStorage -> Firestore)
 */
export async function fetchCompanyProfiles(useCache: boolean = true): Promise<CompanyProfile[]> {
  if (useCache) {
    const cached = getCached<CompanyProfile[]>(CACHE_KEY);
    if (cached && cached.length > 0) return cached;
  }

  // Check client-side localStorage fallback
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const active = parsed.filter((p: CompanyProfile) => !p.isDeleted);
          setCache(CACHE_KEY, active, 120000);
          return active;
        }
      }
    } catch (e) {
      console.warn("Error reading company profiles from localStorage:", e);
    }
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_COMPANY_PROFILES;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PROFILES_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.profiles) && snap.data()?.profiles.length > 0) {
      const activeProfiles = (snap.data().profiles as CompanyProfile[])
        .filter((p) => !p.isDeleted)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setCache(CACHE_KEY, activeProfiles, 120000);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeProfiles));
        } catch { }
      }
      return activeProfiles;
    }
  } catch (err) {
    console.error("Error fetching company profiles from Firestore:", err);
  }

  return DEFAULT_COMPANY_PROFILES;
}

/**
 * Real-time subscription to company profiles
 */
export function subscribeCompanyProfiles(
  onUpdate: (profiles: CompanyProfile[]) => void
): Unsubscribe | null {
  // Initial immediate local read for instant render
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const active = parsed
            .filter((p: CompanyProfile) => !p.isDeleted)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          onUpdate(active);
        } else {
          onUpdate(DEFAULT_COMPANY_PROFILES);
        }
      } else {
        onUpdate(DEFAULT_COMPANY_PROFILES);
      }
    } catch {
      onUpdate(DEFAULT_COMPANY_PROFILES);
    }
  } else {
    onUpdate(DEFAULT_COMPANY_PROFILES);
  }

  // Cross-component / Cross-tab listener
  const handleLocalChange = (e: Event) => {
    const customEvt = e as CustomEvent<CompanyProfile[]>;
    if (customEvt.detail && Array.isArray(customEvt.detail)) {
      const active = customEvt.detail
        .filter((p) => !p.isDeleted)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setCache(CACHE_KEY, active, 120000);
      onUpdate(active);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener(EVENT_NAME, handleLocalChange);
  }

  if (!isFirebaseConfigured() || !db) {
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(EVENT_NAME, handleLocalChange);
      }
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PROFILES_DOC_ID);
    const firestoreUnsub = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists() && Array.isArray(snap.data()?.profiles) && snap.data()?.profiles.length > 0) {
          const activeProfiles = (snap.data().profiles as CompanyProfile[])
            .filter((p) => !p.isDeleted)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setCache(CACHE_KEY, activeProfiles, 120000);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeProfiles));
            } catch { }
          }
          onUpdate(activeProfiles);
        } else {
          onUpdate(DEFAULT_COMPANY_PROFILES);
        }
      },
      (err) => {
        console.warn("Firestore company profiles snapshot error, falling back to local:", err);
      }
    );

    return () => {
      firestoreUnsub();
      if (typeof window !== "undefined") {
        window.removeEventListener(EVENT_NAME, handleLocalChange);
      }
    };
  } catch (err) {
    console.error("Failed to subscribe to company profiles:", err);
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(EVENT_NAME, handleLocalChange);
      }
    };
  }
}

/**
 * Save company profiles to Firestore & LocalStorage
 */
export async function saveCompanyProfiles(
  profiles: CompanyProfile[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toISOString();
  const normalizedProfiles = profiles.map((p, idx) => ({
    ...p,
    order: idx,
    updatedAt: timestamp,
    updatedBy: userEmail || "admin",
  }));

  // 1. Immediately persist locally
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalizedProfiles));
      window.dispatchEvent(
        new CustomEvent(EVENT_NAME, { detail: normalizedProfiles })
      );
    } catch (e) {
      console.warn("Failed to save company profiles to localStorage:", e);
    }
  }

  setCache(CACHE_KEY, normalizedProfiles, 120000);

  // 2. Persist to Firestore if configured
  if (!isFirebaseConfigured() || !db) {
    return {
      success: true,
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PROFILES_DOC_ID);
    await setDoc(
      docRef,
      {
        profiles: normalizedProfiles,
        updatedAt: timestamp,
        updatedBy: userEmail || "admin",
        status: "published",
        isDeleted: false,
      },
      { merge: true }
    );
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to save company profiles to Firestore:", err);
    return {
      success: false,
      error: err?.message || "Failed to save company profiles to cloud database",
    };
  }
}
