import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
  date?: string;
  order: number;
  status: "published" | "draft";
  isFeatured?: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export const PRESET_GALLERY_CATEGORIES = [
  "Leadership & Summits",
  "Port & Maritime Operations",
  "Global Trade Delegations",
  "Customs & Logistics",
  "Commercial Aquaculture",
  "Corporate & Events",
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    title: "International Trade Mission & Bilateral Delegation",
    category: "Global Trade Delegations",
    imageUrl: "/images/pic-gallary/mamun1.jpeg",
    caption: "Group CEO Md. Abdullah Al Mamun leading high-level bilateral trade and commerce discussions with international enterprise partners.",
    date: "2026",
    order: 0,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_2",
    title: "Chittagong Port & Maritime Operations Review",
    category: "Port & Maritime Operations",
    imageUrl: "/images/dailyshipping_hero.jpg",
    caption: "Daily Shipping & Logistics port operations team overseeing international container vessel berth turnaround and cargo dispatch.",
    date: "2026",
    order: 1,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_3",
    title: "Executive Strategic Council & Board Meeting",
    category: "Leadership & Summits",
    imageUrl: "/images/pic-gallary/mamun2.jpeg",
    caption: "Top On Group leadership convened for the annual strategic expansion review across trade, shipping, and sustainable agro operations.",
    date: "2025",
    order: 2,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_4",
    title: "Customs Clearing & Regulatory Compliance Desk",
    category: "Customs & Logistics",
    imageUrl: "/images/customs_cnf.jpg",
    caption: "Licensed C&F operational specialists navigating ASYCUDA World electronic Bill of Entry clearance across major customs houses.",
    date: "2026",
    order: 3,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_5",
    title: "Industry Excellence & Commerce Accolade",
    category: "Leadership & Summits",
    imageUrl: "/images/pic-gallary/mamun3.jpeg",
    caption: "Recognition ceremony honoring pioneering supply chain leadership, regulatory compliance, and cross-border commercial excellence.",
    date: "2025",
    order: 4,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_6",
    title: "Air Cargo & Express Express Clearance Hub",
    category: "Port & Maritime Operations",
    imageUrl: "/images/air_cargo.jpg",
    caption: "Time-critical cargo operations at Hazrat Shahjalal International Airport Cargo Village, Dhaka.",
    date: "2026",
    order: 5,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_7",
    title: "Corporate Partnership & Overseas Sourcing Summit",
    category: "Global Trade Delegations",
    imageUrl: "/images/pic-gallary/mamun4.jpeg",
    caption: "Collaborative engagement with international manufacturing suppliers and industrial capital goods distributors.",
    date: "2025",
    order: 6,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_8",
    title: "Modern Linehaul Transport & Covered Van Fleet",
    category: "Customs & Logistics",
    imageUrl: "/images/topexpress_slide_1.jpg",
    caption: "Top Express dedicated GPS-monitored fleet ensuring 24/7 bonded transit between port terminals and industrial hubs.",
    date: "2026",
    order: 7,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_9",
    title: "Chamber of Commerce & Economic Leadership Dialogue",
    category: "Leadership & Summits",
    imageUrl: "/images/pic-gallary/mamun5.jpeg",
    caption: "Engaging national trade policy stakeholders and freight forwarding council members on port modernization and logistics efficiency.",
    date: "2025",
    order: 8,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_10",
    title: "Sustainable Biofloc Commercial Aquaculture",
    category: "Commercial Aquaculture",
    imageUrl: "/images/agro_farm.jpg",
    caption: "Top On-Agro Farm biosecure aquaculture ponds producing antibiotic-free freshwater fish for domestic food security.",
    date: "2026",
    order: 9,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_11",
    title: "Global Supply Chain Keynote Address",
    category: "Leadership & Summits",
    imageUrl: "/images/pic-gallary/mamun6.jpeg",
    caption: "Md. Abdullah Al Mamun delivering a keynote presentation on freight forwarding resilience, port dwell times, and demurrage mitigation.",
    date: "2025",
    order: 10,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_12",
    title: "Deep Sea Port Logistics & Ocean Freight Terminal",
    category: "Port & Maritime Operations",
    imageUrl: "/images/hero_port.jpg",
    caption: "High-capacity quay gantry cranes handling containerized ocean freight at Chittagong Port terminal berths.",
    date: "2026",
    order: 11,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_13",
    title: "Trade Advisory & Commercial Enterprise Forum",
    category: "Corporate & Events",
    imageUrl: "/images/pic-gallary/mamun7.jpeg",
    caption: "Top On-Solution consulting forum advising foreign direct investors and corporate groups on regulatory compliance.",
    date: "2025",
    order: 12,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_14",
    title: "Overseas Industrial Manufacturing Delegation",
    category: "Global Trade Delegations",
    imageUrl: "/images/pic-gallary/mamun8.jpeg",
    caption: "Top On-Tech engineering and procurement specialists inspecting industrial machinery and production lines overseas.",
    date: "2025",
    order: 13,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_15",
    title: "Enterprise Technology & Supply Chain Synergy",
    category: "Corporate & Events",
    imageUrl: "/images/boardroom_team.jpg",
    caption: "Cross-divisional operational team coordinating end-to-end sourcing, freight forwarding, and domestic distribution.",
    date: "2026",
    order: 14,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_16",
    title: "Corporate Civic Leadership & Community Engagement",
    category: "Corporate & Events",
    imageUrl: "/images/pic-gallary/mamun9.jpeg",
    caption: "Top On Group community social responsibility (CSR) initiatives and youth education sponsorship programs.",
    date: "2025",
    order: 15,
    status: "published",
    isFeatured: false,
  },
];

const SETTINGS_COLLECTION = "settings";
const GALLERY_DOC = "gallery";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${GALLERY_DOC}`;

export async function fetchGallery(useCache: boolean = true): Promise<GalleryItem[]> {
  if (useCache) {
    const cached = getCached<GalleryItem[]>(CACHE_KEY);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_GALLERY;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GALLERY_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.items) && snap.data()?.items.length > 0) {
      const activeItems = (snap.data().items as GalleryItem[]).filter(
        (g) => g.status === "published"
      );
      setCache(CACHE_KEY, activeItems, 120000);
      return activeItems;
    }
  } catch (err) {
    console.error("Error fetching gallery from Firestore, using default:", err);
  }

  return DEFAULT_GALLERY;
}

export function subscribeGallery(
  onUpdate: (items: GalleryItem[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(DEFAULT_GALLERY);
    return null;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GALLERY_DOC);
    return onSnapshot(
      docRef,
      (snap) => {
        if (
          snap.exists() &&
          Array.isArray(snap.data()?.items) &&
          snap.data()?.items.length > 0
        ) {
          const items = snap.data()?.items as GalleryItem[];
          setCache(CACHE_KEY, items, 120000);
          onUpdate(items);
        } else {
          onUpdate(DEFAULT_GALLERY);
        }
      },
      (err) => {
        console.warn("Firestore gallery snapshot error, using default:", err);
        onUpdate(DEFAULT_GALLERY);
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to gallery:", err);
    onUpdate(DEFAULT_GALLERY);
    return null;
  }
}

export async function saveGallery(
  items: GalleryItem[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error: "Firebase is not configured in .env.local",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GALLERY_DOC);
    await setDoc(
      docRef,
      {
        items,
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
    console.error("Failed to save gallery to Firestore:", err);
    return {
      success: false,
      error: err?.message || "Failed to save gallery",
    };
  }
}
