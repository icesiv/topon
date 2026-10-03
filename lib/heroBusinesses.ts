import {
  Building2,
  FileCheck2,
  Ship,
  Fish,
  Truck,
  Briefcase,
  Globe,
  PackageCheck,
  Leaf,
  ShieldCheck,
  Anchor,
  Store,
  LucideIcon,
} from "lucide-react";
import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  FileCheck2,
  Ship,
  Fish,
  Truck,
  Briefcase,
  Globe,
  PackageCheck,
  Leaf,
  ShieldCheck,
  Anchor,
  Store,
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export const DEFAULT_BUSINESS_LOGOS: Record<string, string> = {
  topontech: "/images/logo/topon-tech.png",
  topexpress: "/images/logo/tel.png",
  dailyshipping: "/images/logo/dsl.png",
  toponagro: "/images/logo/topon-agro.png",
  toponsolution: "/images/logo/topon-solution.png",
};

export interface BusinessPanelData {
  id: string;
  number: string;
  name: string;
  name_short: string;
  category: string;
  tagline: string;
  fullTagline: string;
  href: string;
  image: string;
  iconName: string;
  logo?: string;
  order?: number;
  status?: "draft" | "published";
  isDeleted?: boolean;
}

export interface BusinessPanel extends Omit<BusinessPanelData, "iconName"> {
  icon: LucideIcon;
  iconName: string;
  logo: string;
}

export const DEFAULT_BUSINESS_PANELS: BusinessPanelData[] = [
  {
    id: "topontech",
    number: "01",
    name: "Top On-Tech",
    name_short: "Tech",
    category: "Multi-Sector Import, Export & Trading",
    tagline:
      "Multi-sector import, export, and trading enterprise connecting global suppliers with diverse markets.",
    fullTagline:
      "Top On-Tech is a multi-sector import, export, and trading enterprise that connects global suppliers with diverse markets through reliable B2B sourcing and delivery coordination.",
    href: "/divisions/trading-topontech",
    image: "/images/topontech_hero.jpg",
    iconName: "Building2",
    logo: "/images/logo/topon-tech.png",
    order: 0,
    status: "published",
  },
  {
    id: "topexpress",
    number: "02",
    name: "Top Express Limited",
    name_short: "TEL",
    category: "Customs Clearing & Forwarding (C&F)",
    tagline: "Licensed C&F Brokerage, Port Clearance & NBR Tariff Advisory",
    fullTagline:
      "Licensed customs brokerage delivering precision documentation, tariff classification, and zero-demurrage container release across Chittagong Port and Dhaka ICD.",
    href: "/divisions/express-topexpress",
    image: "/images/topexpress_hero.jpg",
    iconName: "FileCheck2",
    logo: "/images/logo/tel.png",
    order: 1,
    status: "published",
  },
  {
    id: "dailyshipping",
    number: "03",
    name: "Daily Shipping & Logistics",
    name_short: "DSL",
    category: "International Freight Forwarding",
    tagline: "Ocean FCL/LCL, Expedited Air Cargo & Multimodal Logistics",
    fullTagline:
      "Comprehensive international cargo shipping linking Bangladesh to worldwide trade lanes via global container lines and priority air freight charters.",
    href: "/divisions/logistics-dailyshipping",
    image: "/images/dailyshipping_hero.jpg",
    iconName: "Ship",
    logo: "/images/logo/dsl.png",
    order: 2,
    status: "published",
  },
  {
    id: "toponagro",
    number: "04",
    name: "Top On-Agro Farm",
    name_short: "Agro",
    category: "Commercial Fisheries & Aquaculture",
    tagline: "Sustainable Fish Farming, Hatcheries & Nationwide Cold Chain",
    fullTagline:
      "High-density aerated biofloc pond farming, certified pathogen-free fingerling hatcheries, and refrigerated cold-chain distribution to metropolitan wholesale markets.",
    href: "/divisions/agro-toponagro",
    image: "/images/toponagro_hero.jpg",
    iconName: "Fish",
    logo: "/images/logo/topon-agro.png",
    order: 3,
    status: "published",
  },
  {
    id: "toponsolution",
    number: "05",
    name: "Top On-Solution",
    name_short: "Solution",
    category: "Corporate Consultancy & Business Advisory",
    tagline: "Company Setup, Regulatory Compliance, Tax, VAT & Trade Advisory",
    fullTagline:
      "Top On-Solution provides consultancy and practical support for company setup, regulatory compliance, tax, VAT, customs, trade, audit, sourcing and other business requirements.",
    href: "/divisions/consultancy-toponsolution",
    image: "/images/toponsolution_hero.jpg",
    iconName: "Briefcase",
    logo: "/images/logo/topon-solution.png",
    order: 4,
    status: "published",
  },
];

export function resolveBusinessPanel(data: BusinessPanelData): BusinessPanel {
  const icon = ICON_MAP[data.iconName] || Building2;
  const logo =
    data.logo ||
    DEFAULT_BUSINESS_LOGOS[data.id] ||
    (data.name?.toLowerCase().includes("solution")
      ? "/images/logo/topon-solution.png"
      : data.name?.toLowerCase().includes("agro")
      ? "/images/logo/topon-agro.png"
      : data.name?.toLowerCase().includes("daily") || data.name?.toLowerCase().includes("shipping")
      ? "/images/logo/dsl.png"
      : data.name?.toLowerCase().includes("express")
      ? "/images/logo/tel.png"
      : "/images/logo/topon-tech.png");

  return {
    ...data,
    icon,
    logo,
  };
}

export function resolveBusinessPanels(dataList: BusinessPanelData[]): BusinessPanel[] {
  return dataList.map(resolveBusinessPanel);
}

function normalizePanels(panels: BusinessPanelData[]): BusinessPanelData[] {
  const hasSolution = panels.some(
    (p) => p.id === "toponsolution" || p.name?.toLowerCase().includes("solution")
  );
  if (!hasSolution) {
    const solutionPanel = DEFAULT_BUSINESS_PANELS.find((p) => p.id === "toponsolution");
    if (solutionPanel) {
      return [...panels, solutionPanel];
    }
  }
  return panels;
}

const SETTINGS_COLLECTION = "settings";
const HERO_DOC_ID = "heroBusinesses";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${HERO_DOC_ID}`;

export async function fetchHeroBusinesses(useCache: boolean = true): Promise<BusinessPanelData[]> {
  if (useCache) {
    const cached = getCached<BusinessPanelData[]>(CACHE_KEY);
    if (cached) return cached;
  }

  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_BUSINESS_PANELS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, HERO_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.panels) && snap.data()?.panels.length > 0) {
      const activePanels = (snap.data().panels as BusinessPanelData[]).filter((p) => !p.isDeleted);
      const normalized = normalizePanels(activePanels);
      setCache(CACHE_KEY, normalized, 120000);
      return normalized;
    }
  } catch (err) {
    console.error("Error fetching hero businesses from Firestore:", err);
  }

  return DEFAULT_BUSINESS_PANELS;
}

export function subscribeHeroBusinesses(
  onUpdate: (panels: BusinessPanelData[]) => void
): Unsubscribe | null {
  if (!isFirebaseConfigured() || !db) {
    onUpdate(DEFAULT_BUSINESS_PANELS);
    return null;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, HERO_DOC_ID);
    return onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists() && Array.isArray(snap.data()?.panels) && snap.data()?.panels.length > 0) {
          const activePanels = (snap.data().panels as BusinessPanelData[]).filter((p) => !p.isDeleted);
          const normalized = normalizePanels(activePanels);
          setCache(CACHE_KEY, normalized, 120000);
          onUpdate(normalized);
        } else {
          onUpdate(DEFAULT_BUSINESS_PANELS);
        }
      },
      (err) => {
        console.warn("Firestore snapshot error, using default panels:", err);
        onUpdate(DEFAULT_BUSINESS_PANELS);
      }
    );
  } catch (err) {
    console.error("Failed to subscribe to hero businesses:", err);
    onUpdate(DEFAULT_BUSINESS_PANELS);
    return null;
  }
}

export async function saveHeroBusinesses(
  panels: BusinessPanelData[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return {
      success: false,
      error:
        "Firebase is not configured. Please add your Firebase environment variables to .env.local.",
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, HERO_DOC_ID);
    await setDoc(
      docRef,
      {
        panels,
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
    console.error("Error saving hero businesses:", err);
    return {
      success: false,
      error: err?.message || "Failed to save data to Firestore.",
    };
  }
}
