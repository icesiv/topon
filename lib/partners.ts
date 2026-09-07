import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface Partner {
  id?: string;
  name: string;
  image: string;
  order?: number;
  status?: "draft" | "published";
  isDeleted?: boolean;
}

export const DEFAULT_PARTNERS: Partner[] = [
  { id: "partner_walton", name: "Walton", image: "/images/partners/walton.png", order: 0, status: "published" },
  { id: "partner_remark", name: "Remark", image: "/images/partners/remark.png", order: 1, status: "published" },
  { id: "partner_bangla_cat", name: "Bangla Cat", image: "/images/partners/bangla-cat.jpeg", order: 2, status: "published" },
  { id: "partner_army_pharma", name: "Army Pharma", image: "/images/partners/army-pharma.png", order: 3, status: "published" },
  { id: "partner_fervent", name: "Fervent", image: "/images/partners/fervent.jpg", order: 4, status: "published" },
  { id: "partner_ikbal_textile", name: "Ikbal Textile Mills", image: "/images/partners/ikbal-textile.png", order: 5, status: "published" },
  { id: "partner_fusion_group", name: "Fusion Group", image: "/images/partners/fusion-group.png", order: 6, status: "published" },
  { id: "partner_aa_intl", name: "AA International", image: "/images/partners/aa-international.jpg", order: 7, status: "published" },
  { id: "partner_dril", name: "Dril", image: "/images/partners/dril.png", order: 8, status: "published" },
  { id: "partner_majesto", name: "Majesto Limited", image: "/images/partners/majesto.png", order: 9, status: "published" },
  { id: "partner_factomart", name: "Factomart BD", image: "/images/partners/factomart.png", order: 10, status: "published" },
  { id: "partner_acorn", name: "Acorn Infrastructure Services", image: "/images/partners/acorn.png", order: 11, status: "published" },
  { id: "partner_bd_lamps", name: "Bangladesh Lamps Ltd.", image: "/images/partners/bangladesh-lamps.jpg", order: 12, status: "published" },
  { id: "partner_kashmir_fans", name: "Kashmir Fans Bangladesh", image: "/images/partners/kashmir-fans.png", order: 13, status: "published" },
  { id: "partner_whirlpool", name: "Whirlpool", image: "/images/partners/whirlpool.png", order: 14, status: "published" },
  { id: "partner_transcom", name: "Transcom Electronics Ltd.", image: "/images/partners/transcom.jpg", order: 15, status: "published" },
  { id: "partner_tst", name: "Tst White House", image: "/images/partners/tst-white-house.png", order: 16, status: "published" },
  { id: "partner_genuine", name: "Genuine technology & research Limited", image: "/images/partners/genuine-technology.png", order: 17, status: "published" },
  { id: "partner_madras", name: "Madras Security Printers", image: "/images/partners/madras-security.png", order: 18, status: "published" },
  { id: "partner_spectra", name: "Spectra Hexa", image: "/images/partners/spectra-hexa.jpg", order: 19, status: "published" },
  { id: "partner_ms_elec", name: "MS Electronics", image: "/images/partners/ms-electronics.jpg", order: 20, status: "published" },
  { id: "partner_f_and_b", name: "F & B", image: "/images/partners/f-and-b.png", order: 21, status: "published" },
  { id: "partner_bishwash", name: "Bishwash Holdings", image: "/images/partners/bishwash-holdings.jpg", order: 22, status: "published" },
  { id: "partner_motion_care", name: "Motion Care Ltd.", image: "/images/partners/motion-care.png", order: 23, status: "published" },
  { id: "partner_spark", name: "Spark", image: "/images/partners/spark.png", order: 24, status: "published" },
];

const SETTINGS_COLLECTION = "settings";
const PARTNERS_DOC = "partners";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${PARTNERS_DOC}`;

export async function fetchPartners(useCache: boolean = true): Promise<Partner[]> {
  if (useCache) {
    const cached = getCached<Partner[]>(CACHE_KEY);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_PARTNERS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PARTNERS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.partners) && snap.data()?.partners.length > 0) {
      const activePartners = (snap.data().partners as Partner[]).filter((p) => !p.isDeleted);
      setCache(CACHE_KEY, activePartners, 120000);
      return activePartners;
    }
  } catch (err) {
    console.error("Error fetching partners from Firestore:", err);
  }

  return DEFAULT_PARTNERS;
}

export function subscribePartners(
  onUpdate: (partners: Partner[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(DEFAULT_PARTNERS);
    return null;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PARTNERS_DOC);
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists() && Array.isArray(snap.data()?.partners) && snap.data()?.partners.length > 0) {
          const activePartners = (snap.data().partners as Partner[]).filter((p) => !p.isDeleted);
          setCache(CACHE_KEY, activePartners, 120000);
          onUpdate(activePartners);
        } else {
          onUpdate(DEFAULT_PARTNERS);
        }
      },
      (err) => {
        console.warn("Firestore partners snapshot error, using default:", err);
        onUpdate(DEFAULT_PARTNERS);
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to partners:", err);
    onUpdate(DEFAULT_PARTNERS);
    return null;
  }
}

export async function savePartners(
  partners: Partner[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PARTNERS_DOC);
    await setDoc(
      docRef,
      {
        partners,
        updatedAt: new Date().toISOString(),
        updatedBy: userEmail || "admin",
        status: "published",
        isDeleted: false,
      },
      { merge: true }
    );
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Error saving partners to Firestore:", err);
    return {
      success: false,
      error: err?.message || "Failed to save partners to Firestore.",
    };
  }
}
