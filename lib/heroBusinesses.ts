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
}

export interface BusinessPanel extends Omit<BusinessPanelData, "iconName"> {
  icon: LucideIcon;
  iconName: string;
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
    href: "/trading-topontech",
    image: "/images/topontech_hero.jpg",
    iconName: "Building2",
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
    href: "/express-topexpress",
    image: "/images/topexpress_hero.jpg",
    iconName: "FileCheck2",
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
    href: "/logistics-dailyshipping",
    image: "/images/dailyshipping_hero.jpg",
    iconName: "Ship",
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
    href: "/agro-toponagro",
    image: "/images/toponagro_hero.jpg",
    iconName: "Fish",
  },
];

export function resolveBusinessPanel(data: BusinessPanelData): BusinessPanel {
  const icon = ICON_MAP[data.iconName] || Building2;
  return {
    ...data,
    icon,
  };
}

export function resolveBusinessPanels(dataList: BusinessPanelData[]): BusinessPanel[] {
  return dataList.map(resolveBusinessPanel);
}

const SETTINGS_COLLECTION = "settings";
const HERO_DOC_ID = "heroBusinesses";

export async function fetchHeroBusinesses(): Promise<BusinessPanelData[]> {
  if (!isFirebaseConfigured() || !db) {
    return DEFAULT_BUSINESS_PANELS;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, HERO_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.panels) && snap.data()?.panels.length > 0) {
      return snap.data().panels as BusinessPanelData[];
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
          onUpdate(snap.data().panels as BusinessPanelData[]);
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
  panels: BusinessPanelData[]
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
      },
      { merge: true }
    );
    return { success: true };
  } catch (err: any) {
    console.error("Error saving hero businesses:", err);
    return {
      success: false,
      error: err?.message || "Failed to save data to Firestore.",
    };
  }
}
