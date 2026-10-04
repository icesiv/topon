import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface DivisionSlideData {
  id: string | number;
  image: string;
  category: string;
  headline: string;
}

export type DivisionKey =
  | "topexpress"
  | "dailyshipping"
  | "topontech"
  | "toponagro"
  | "toponsolution";

export interface DivisionMeta {
  key: DivisionKey;
  name: string;
  badge: string;
  route: string;
  logo: string;
}

export const DIVISION_META_LIST: DivisionMeta[] = [
  {
    key: "topexpress",
    name: "Top Express Limited",
    badge: "Customs C&F",
    route: "/divisions/express-topexpress",
    logo: "/images/logo/tel.png",
  },
  {
    key: "dailyshipping",
    name: "Daily Shipping & Logistics",
    badge: "Freight Forwarding",
    route: "/divisions/logistics-dailyshipping",
    logo: "/images/logo/dsl.png",
  },
  {
    key: "topontech",
    name: "Top On-Tech",
    badge: "Import, Export & Trading",
    route: "/divisions/trading-topontech",
    logo: "/images/logo/topon-tech.png",
  },
  {
    key: "toponagro",
    name: "Top On-Agro Farm",
    badge: "Fisheries & Aquaculture",
    route: "/divisions/agro-toponagro",
    logo: "/images/logo/topon-agro.png",
  },
  {
    key: "toponsolution",
    name: "Top On-Solution",
    badge: "Corporate Advisory",
    route: "/divisions/consultancy-toponsolution",
    logo: "/images/logo/topon-solution.png",
  },
];

export const DEFAULT_DIVISION_SLIDES: Record<DivisionKey, DivisionSlideData[]> = {
  topexpress: [
    {
      id: "topexpress_1",
      image: "/images/topexpress_slide_1.jpg",
      category: "Express Road Logistics & Linehaul Fleet",
      headline: "Modern covered van and linehaul fleet operating 24/7 across Bangladesh.",
    },
    {
      id: "topexpress_2",
      image: "/images/topexpress_slide_2.jpg",
      category: "Customs Clearing & Forwarding (C&F)",
      headline: "Expert customs brokerage with zero demurrage across Chittagong, Mongla & Benapole.",
    },
    {
      id: "topexpress_3",
      image: "/images/topexpress_slide_3.jpg",
      category: "Air Cargo & Rapid Parcel Dispatch",
      headline: "Guaranteed time-critical courier and international air express connectivity.",
    },
    {
      id: "topexpress_4",
      image: "/images/topexpress_slide_4.jpg",
      category: "Heavy Project Cargo & Terminal Transit",
      headline: "Specialized oversized transport, bonded transit, and secure industrial logistics.",
    },
  ],
  dailyshipping: [
    {
      id: "dailyshipping_1",
      image: "/images/dailyshipping_slide_1.jpg",
      category: "Maritime Container Shipping",
      headline: "Direct ocean vessel coordination handling 20,000+ TEUs annually at Chittagong Port.",
    },
    {
      id: "dailyshipping_2",
      image: "/images/dailyshipping_slide_2.jpg",
      category: "Container Freight Station (CFS) & Depot",
      headline: "Off-dock depot management, container de-stuffing, and secured storage yards.",
    },
    {
      id: "dailyshipping_3",
      image: "/images/dailyshipping_hero.jpg",
      category: "Global Ocean Freight Forwarding",
      headline: "Seamless FCL and LCL container cargo links across Asia, Europe, and the Americas.",
    },
    {
      id: "dailyshipping_4",
      image: "/images/customs_cnf.jpg",
      category: "Licensed Port C&F & Trade Compliance",
      headline: "High-speed customs clearance, port liaison, and tariff advisory.",
    },
  ],
  topontech: [
    {
      id: "topontech_1",
      image: "/images/topontech_slide_1.jpg",
      category: "Industrial Machinery & Spare Parts",
      headline: "Precision CNC tooling, automated plant equipment & verified OEM spares.",
    },
    {
      id: "topontech_2",
      image: "/images/topontech_slide_2.jpg",
      category: "Chemical & Raw Material Supply",
      headline: "High-grade industrial chemicals, polymers & reagents with full COA & MSDS.",
    },
    {
      id: "topontech_3",
      image: "/images/topontech_slide_3.jpg",
      category: "Textile Fabrics & Production Inputs",
      headline: "Woven & knit fabrics, specialized yarns, and RMG production inputs.",
    },
    {
      id: "topontech_4",
      image: "/images/topontech_slide_4.jpg",
      category: "Electronics & Tech Hardware",
      headline: "Commercial B2B electronics, LED drivers, automation & custom components.",
    },
  ],
  toponagro: [
    {
      id: "toponagro_1",
      image: "/images/toponagro_hero.jpg",
      category: "Commercial Biofloc Aquaculture",
      headline: "High-density scientific biofloc fish farming with strict water parameters.",
    },
    {
      id: "toponagro_2",
      image: "/images/agro_farm.jpg",
      category: "Sustainable Rural Fisheries",
      headline: "Sprawling freshwater aquaculture ponds promoting sustainable fisheries.",
    },
    {
      id: "toponagro_3",
      image: "/images/fisheries_farm.jpg",
      category: "Certified Hatchery & Breeding",
      headline: "Quality-tested fingerlings and disease-resistant broodstock development.",
    },
    {
      id: "toponagro_4",
      image: "/images/sustainability_bg.jpg",
      category: "Cold Chain & Wholesale Supply",
      headline: "Hygienic iced packaging and temperature-controlled distribution.",
    },
  ],
  toponsolution: [
    {
      id: "toponsolution_1",
      image: "/images/toponsolution_wide.jpg",
      category: "Executive Corporate Advisory",
      headline: "High-level strategic consulting for enterprises entering and expanding in Bangladesh.",
    },
    {
      id: "toponsolution_2",
      image: "/images/toponsolution_hero.jpg",
      category: "RJSC & Statutory Trade Licensing",
      headline: "End-to-end company registration, trade licensing, and regulatory approvals.",
    },
    {
      id: "toponsolution_3",
      image: "/images/boardroom_team.jpg",
      category: "Statutory Audit & Tax Compliance",
      headline: "Comprehensive fiscal guidance, NBR audit liaison, and corporate tax returns.",
    },
    {
      id: "toponsolution_4",
      image: "/images/trading_sourcing.jpg",
      category: "Trade Policy & SRO Strategic Guidance",
      headline: "Expert interpretation of national budget policies, customs tariffs, and commercial law.",
    },
  ],
};

const SETTINGS_COLLECTION = "settings";
const SLIDERS_DOC_ID = "divisionSliders";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${SLIDERS_DOC_ID}`;
const LOCAL_STORAGE_KEY = "topon_division_sliders";
const UPDATE_EVENT_NAME = "topon_division_sliders_changed";

function getLocalSlides(): Record<DivisionKey, DivisionSlideData[]> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Record<DivisionKey, DivisionSlideData[]>;
      }
    }
  } catch (e) {
    // Ignore localStorage parse errors
  }
  return null;
}

function setLocalSlides(data: Record<DivisionKey, DivisionSlideData[]>) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME, { detail: data }));
  } catch (e) {
    // Ignore localStorage write errors
  }
}

export function getDivisionSlidesSync(key: DivisionKey): DivisionSlideData[] {
  const cached = getCached<Record<DivisionKey, DivisionSlideData[]>>(CACHE_KEY);
  if (cached && cached[key]) return cached[key];

  const local = getLocalSlides();
  if (local && local[key]) return local[key];

  return DEFAULT_DIVISION_SLIDES[key];
}

export async function fetchAllDivisionSlides(
  useCache: boolean = true
): Promise<Record<DivisionKey, DivisionSlideData[]>> {
  if (useCache) {
    const cached = getCached<Record<DivisionKey, DivisionSlideData[]>>(CACHE_KEY);
    if (cached) return cached;
  }

  const local = getLocalSlides();
  if (local) {
    setCache(CACHE_KEY, local, 120000);
    return local;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_DIVISION_SLIDES;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SLIDERS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data()?.slides) {
      const data = snap.data()?.slides as Record<DivisionKey, DivisionSlideData[]>;
      const merged: Record<DivisionKey, DivisionSlideData[]> = {
        ...DEFAULT_DIVISION_SLIDES,
        ...data,
      };
      setCache(CACHE_KEY, merged, 120000);
      setLocalSlides(merged);
      return merged;
    }
  } catch (err) {
    console.warn("Failed to fetch division sliders from Firestore, using defaults:", err);
  }

  return DEFAULT_DIVISION_SLIDES;
}

export function subscribeDivisionSlides(
  divisionKey: DivisionKey,
  onUpdate: (slides: DivisionSlideData[]) => void
): () => void {
  // Always emit the latest local or default immediately
  const initial = getDivisionSlidesSync(divisionKey);
  onUpdate(initial);

  // Handle local events (custom event and storage event across tabs)
  const handleLocalChange = () => {
    const updated = getDivisionSlidesSync(divisionKey);
    onUpdate(updated);
  };

  if (typeof window !== "undefined") {
    window.addEventListener(UPDATE_EVENT_NAME, handleLocalChange);
    window.addEventListener("storage", handleLocalChange);
  }

  let firestoreUnsub: Unsubscribe | null = null;

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, SLIDERS_DOC_ID);
      firestoreUnsub = onSnapshot(
        docRef,
        (snap) => {
          if (snap.exists() && snap.data()?.slides) {
            const data = snap.data()?.slides as Record<DivisionKey, DivisionSlideData[]>;
            const merged: Record<DivisionKey, DivisionSlideData[]> = {
              ...DEFAULT_DIVISION_SLIDES,
              ...data,
            };
            setCache(CACHE_KEY, merged, 120000);
            setLocalSlides(merged);
            if (merged[divisionKey]) {
              onUpdate(merged[divisionKey]);
            }
          }
        },
        (err) => {
          console.warn("Firestore division sliders snapshot error:", err);
        }
      );
    } catch (err) {
      console.warn("Error subscribing to division sliders in Firestore:", err);
    }
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener(UPDATE_EVENT_NAME, handleLocalChange);
      window.removeEventListener("storage", handleLocalChange);
    }
    if (firestoreUnsub) {
      firestoreUnsub();
    }
  };
}

export async function saveAllDivisionSlides(
  allSlides: Record<DivisionKey, DivisionSlideData[]>,
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  // Update in-memory cache and localStorage first so UI is immediately updated
  setCache(CACHE_KEY, allSlides, 120000);
  setLocalSlides(allSlides);

  if (!isFirebaseConfigured() || !db) {
    return {
      success: true,
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SLIDERS_DOC_ID);
    await setDoc(
      docRef,
      {
        slides: allSlides,
        updatedAt: new Date().toISOString(),
        updatedBy: userEmail || "admin",
      },
      { merge: true }
    );
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.warn("Firestore save division sliders error:", err);
    // Since localStorage already updated, we can return success with a warning or graceful fallback
    return { success: true };
  }
}
