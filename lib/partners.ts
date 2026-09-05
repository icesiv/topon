import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface Partner {
  id?: string;
  name: string;
  image: string;
}

export const DEFAULT_PARTNERS: Partner[] = [
  { id: "partner_walton", name: "Walton", image: "/images/partners/walton.png" },
  { id: "partner_remark", name: "Remark", image: "/images/partners/remark.png" },
  { id: "partner_bangla_cat", name: "Bangla Cat", image: "/images/partners/bangla-cat.jpeg" },
  { id: "partner_army_pharma", name: "Army Pharma", image: "/images/partners/army-pharma.png" },
  { id: "partner_fervent", name: "Fervent", image: "/images/partners/fervent.jpg" },
  { id: "partner_ikbal_textile", name: "Ikbal Textile Mills", image: "/images/partners/ikbal-textile.png" },
  { id: "partner_fusion_group", name: "Fusion Group", image: "/images/partners/fusion-group.png" },
  { id: "partner_aa_intl", name: "AA International", image: "/images/partners/aa-international.jpg" },
  { id: "partner_dril", name: "Dril", image: "/images/partners/dril.png" },
  { id: "partner_majesto", name: "Majesto Limited", image: "/images/partners/majesto.png" },
  { id: "partner_factomart", name: "Factomart BD", image: "/images/partners/factomart.png" },
  { id: "partner_acorn", name: "Acorn Infrastructure Services", image: "/images/partners/acorn.png" },
  { id: "partner_bd_lamps", name: "Bangladesh Lamps Ltd.", image: "/images/partners/bangladesh-lamps.jpg" },
  { id: "partner_kashmir_fans", name: "Kashmir Fans Bangladesh", image: "/images/partners/kashmir-fans.png" },
  { id: "partner_whirlpool", name: "Whirlpool", image: "/images/partners/whirlpool.png" },
  { id: "partner_transcom", name: "Transcom Electronics Ltd.", image: "/images/partners/transcom.jpg" },
  { id: "partner_tst", name: "Tst White House", image: "/images/partners/tst-white-house.png" },
  { id: "partner_genuine", name: "Genuine technology & research Limited", image: "/images/partners/genuine-technology.png" },
  { id: "partner_madras", name: "Madras Security Printers", image: "/images/partners/madras-security.png" },
  { id: "partner_spectra", name: "Spectra Hexa", image: "/images/partners/spectra-hexa.jpg" },
  { id: "partner_ms_elec", name: "MS Electronics", image: "/images/partners/ms-electronics.jpg" },
  { id: "partner_f_and_b", name: "F & B", image: "/images/partners/f-and-b.png" },
  { id: "partner_bishwash", name: "Bishwash Holdings", image: "/images/partners/bishwash-holdings.jpg" },
  { id: "partner_motion_care", name: "Motion Care Ltd.", image: "/images/partners/motion-care.png" },
  { id: "partner_spark", name: "Spark", image: "/images/partners/spark.png" },
];

const SETTINGS_COLLECTION = "settings";
const PARTNERS_DOC = "partners";

export async function fetchPartners(): Promise<Partner[]> {
  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_PARTNERS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, PARTNERS_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.partners) && snap.data()?.partners.length > 0) {
      return snap.data().partners as Partner[];
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
          onUpdate(snap.data().partners as Partner[]);
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
  partners: Partner[]
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
      },
      { merge: true }
    );
    return { success: true };
  } catch (err: any) {
    console.error("Error saving partners to Firestore:", err);
    return {
      success: false,
      error: err?.message || "Failed to save partners to Firestore.",
    };
  }
}
