import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface GalleryItem {
  id: string;
  slug: string; // url/folder slug, used for public/images/gallary/[slug]
  title: string;
  description: string;
  caption?: string; // backwards compatibility alias
  date?: string; // optional date e.g. "2026", "October 2026", "2026-10-08"
  category?: string; // legacy optional field
  coverImage?: string; // primary cover image
  imageUrl?: string; // backwards compatibility alias for coverImage
  images: string[]; // MULTIPLE images in this gallery album
  order: number;
  status: "published" | "draft";
  isFeatured?: boolean;
  updatedAt?: string;
  updatedBy?: string;
}

export const PRESET_GALLERY_CATEGORIES: string[] = [];

/**
 * Recursively strips undefined values so Firebase Firestore setDoc/updateDoc
 * will never fail with "Unsupported field value: undefined".
 */
export function cleanFirestoreData<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => cleanFirestoreData(item)) as unknown as T;
  }
  if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    const cleaned: Record<string, any> = {};
    for (const [key, value] of Object.entries(obj as Record<string, any>)) {
      if (value !== undefined) {
        cleaned[key] = cleanFirestoreData(value);
      }
    }
    return cleaned as T;
  }
  return obj;
}

export function normalizeGalleryItem(
  item: Partial<GalleryItem> & Record<string, any>,
  index: number = 0
): GalleryItem {
  // Support both images array and legacy imageUrl/coverImage
  const rawImages = Array.isArray(item.images) && item.images.length > 0
    ? item.images.filter(Boolean)
    : [];

  const legacyImg = item.imageUrl || item.coverImage;
  const images = rawImages.length > 0
    ? rawImages
    : (legacyImg ? [legacyImg] : ["/images/dailyshipping_hero.jpg"]);

  const cover = item.coverImage || item.imageUrl || images[0] || "/images/dailyshipping_hero.jpg";
  const title = item.title || "Untitled Gallery Album";
  const description = item.description || item.caption || "";

  const slug =
    item.slug ||
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") ||
    `gallery-${index + 1}`;

  const timestamp = new Date().toISOString();

  return {
    id: item.id || `gal_${Date.now()}_${index}`,
    slug,
    title,
    description,
    caption: description,
    date: item.date || "",
    category: item.category || "",
    coverImage: cover,
    imageUrl: cover,
    images,
    order: typeof item.order === "number" ? item.order : index,
    status: item.status === "draft" ? "draft" : "published",
    isFeatured: Boolean(item.isFeatured),
    updatedAt: item.updatedAt || timestamp,
    updatedBy: item.updatedBy || "admin",
  };
}

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: "gal_1",
    slug: "md-mamun-delegations",
    title: "International Trade Mission & Bilateral Delegation",
    coverImage: "/images/gallary/md_mamun/mamun1.jpeg",
    imageUrl: "/images/gallary/md_mamun/mamun1.jpeg",
    images: [
      "/images/gallary/md_mamun/mamun1.jpeg",
      "/images/gallary/md_mamun/mamun2.jpeg",
      "/images/gallary/md_mamun/mamun3.jpeg",
      "/images/gallary/md_mamun/mamun4.jpeg",
      "/images/gallary/md_mamun/mamun10.jpeg",
    ],
    description: "Group CEO Md. Abdullah Al Mamun leading high-level bilateral trade and commerce discussions with international enterprise partners.",
    caption: "Group CEO Md. Abdullah Al Mamun leading high-level bilateral trade and commerce discussions with international enterprise partners.",
    date: "2026",
    order: 0,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_2",
    slug: "chittagong-port-operations",
    title: "Chittagong Port & Maritime Operations Review",
    coverImage: "/images/dailyshipping_hero.jpg",
    imageUrl: "/images/dailyshipping_hero.jpg",
    images: [
      "/images/dailyshipping_hero.jpg",
      "/images/dailyshipping_slide_1.jpg",
      "/images/dailyshipping_slide_2.jpg",
    ],
    description: "Daily Shipping & Logistics port operations team overseeing international container vessel berth turnaround and cargo dispatch.",
    caption: "Daily Shipping & Logistics port operations team overseeing international container vessel berth turnaround and cargo dispatch.",
    date: "2026",
    order: 1,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_3",
    slug: "executive-strategic-council",
    title: "Executive Strategic Council & Board Meeting",
    coverImage: "/images/gallary/md_mamun/mamun2.jpeg",
    imageUrl: "/images/gallary/md_mamun/mamun2.jpeg",
    images: [
      "/images/gallary/md_mamun/mamun2.jpeg",
      "/images/boardroom_team.jpg",
    ],
    description: "Top On Group leadership convened for the annual strategic expansion review across trade, shipping, and sustainable agro operations.",
    caption: "Top On Group leadership convened for the annual strategic expansion review across trade, shipping, and sustainable agro operations.",
    date: "2025",
    order: 2,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_4",
    slug: "customs-clearing-desk",
    title: "Customs Clearing & Regulatory Compliance Desk",
    coverImage: "/images/customs_cnf.jpg",
    imageUrl: "/images/customs_cnf.jpg",
    images: [
      "/images/customs_cnf.jpg",
      "/images/hero_port.jpg",
    ],
    description: "Licensed C&F operational specialists navigating ASYCUDA World electronic Bill of Entry clearance across major customs houses.",
    caption: "Licensed C&F operational specialists navigating ASYCUDA World electronic Bill of Entry clearance across major customs houses.",
    date: "2026",
    order: 3,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_5",
    slug: "industry-excellence-accolade",
    title: "Industry Excellence & Commerce Accolade",
    coverImage: "/images/gallary/md_mamun/mamun3.jpeg",
    imageUrl: "/images/gallary/md_mamun/mamun3.jpeg",
    images: [
      "/images/gallary/md_mamun/mamun3.jpeg",
      "/images/gallary/md_mamun/mamun12.jpeg",
    ],
    description: "Recognition ceremony honoring pioneering supply chain leadership, regulatory compliance, and cross-border commercial excellence.",
    caption: "Recognition ceremony honoring pioneering supply chain leadership, regulatory compliance, and cross-border commercial excellence.",
    date: "2025",
    order: 4,
    status: "published",
    isFeatured: true,
  },
  {
    id: "gal_6",
    slug: "air-cargo-express-hub",
    title: "Air Cargo & Express Express Clearance Hub",
    coverImage: "/images/air_cargo.jpg",
    imageUrl: "/images/air_cargo.jpg",
    images: [
      "/images/air_cargo.jpg",
      "/images/topexpress_hero.jpg",
    ],
    description: "Time-critical cargo operations at Hazrat Shahjalal International Airport Cargo Village, Dhaka.",
    caption: "Time-critical cargo operations at Hazrat Shahjalal International Airport Cargo Village, Dhaka.",
    date: "2026",
    order: 5,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_7",
    slug: "overseas-sourcing-summit",
    title: "Corporate Partnership & Overseas Sourcing Summit",
    coverImage: "/images/gallary/md_mamun/mamun4.jpeg",
    imageUrl: "/images/gallary/md_mamun/mamun4.jpeg",
    images: [
      "/images/gallary/md_mamun/mamun4.jpeg",
      "/images/trading_sourcing.jpg",
    ],
    description: "Collaborative engagement with international manufacturing suppliers and industrial capital goods distributors.",
    caption: "Collaborative engagement with international manufacturing suppliers and industrial capital goods distributors.",
    date: "2025",
    order: 6,
    status: "published",
    isFeatured: false,
  },
  {
    id: "gal_8",
    slug: "sustainable-fisheries-harvest",
    title: "Sustainable Fisheries & Hatchery Harvest",
    coverImage: "/images/fisheries_farm.jpg",
    imageUrl: "/images/fisheries_farm.jpg",
    images: [
      "/images/fisheries_farm.jpg",
      "/images/agro_farm.jpg",
    ],
    description: "High-density scientific biofloc aquaculture facility yielding premium commercial export-grade species.",
    caption: "High-density scientific biofloc aquaculture facility yielding premium commercial export-grade species.",
    date: "2026",
    order: 7,
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
      const normalized = (snap.data().items as any[]).map((item, idx) =>
        normalizeGalleryItem(item, idx)
      );
      const activeItems = normalized.filter((g) => g.status === "published");
      setCache(CACHE_KEY, activeItems, 120000);
      return activeItems;
    } else {
      // Document does not exist yet in Firestore: auto-seed DEFAULT_GALLERY
      try {
        await saveGallery(DEFAULT_GALLERY, "system_init");
        setCache(CACHE_KEY, DEFAULT_GALLERY, 120000);
        return DEFAULT_GALLERY;
      } catch (seedErr) {
        console.warn("Could not auto-seed gallery in Firestore:", seedErr);
      }
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
          const items = (snap.data()?.items as any[]).map((item, idx) =>
            normalizeGalleryItem(item, idx)
          );
          setCache(CACHE_KEY, items, 120000);
          onUpdate(items);
        } else {
          // If Firestore document doesn't exist yet, auto-seed and display defaults
          saveGallery(DEFAULT_GALLERY, "system_init").catch(() => {});
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
  const timestamp = new Date().toISOString();
  const normalized = items.map((item, idx) => ({
    ...normalizeGalleryItem(item, idx),
    order: idx,
    updatedAt: item.updatedAt || timestamp,
    updatedBy: item.updatedBy || userEmail || "admin",
  }));

  // Sync with local storage and dispatch event for immediate local UI sync
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("topon_gallery", JSON.stringify(normalized));
      window.dispatchEvent(new CustomEvent("topon_gallery_changed", { detail: normalized }));
    } catch (e) {
      // ignore
    }
  }

  if (!isFirebaseConfigured() || !db) {
    // If Firebase is not configured, local state is still saved
    return { success: true };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, GALLERY_DOC);
    const payload = cleanFirestoreData({
      items: normalized,
      updatedAt: timestamp,
      updatedBy: userEmail || "admin",
      status: "published",
      isDeleted: false,
    });

    await setDoc(docRef, payload, { merge: true });
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
