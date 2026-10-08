import { doc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { DEFAULT_BUSINESS_PANELS, BusinessPanelData } from "./heroBusinesses";
import { DEFAULT_DIVISION_SLIDES, DivisionSlideData, DivisionKey } from "./divisionSliders";
import { DEFAULT_PARTNERS, Partner } from "./partners";
import { DEFAULT_GENERAL_INFO, GeneralInfoData } from "./generalInfo";
import { DEFAULT_ADMIN_USERS, AdminUser } from "./adminUsers";
import { DEFAULT_ARTICLES, Article } from "./articles";
import { DEFAULT_GALLERY, GalleryItem, cleanFirestoreData, normalizeGalleryItem } from "./gallery";
import { DEFAULT_COMPANY_PROFILES, CompanyProfile } from "./companyProfiles";

export interface SeedResult {
  success: boolean;
  message: string;
  details?: {
    heroBusinesses: number;
    divisionSliders: number;
    companyProfiles: number;
    partners: number;
    generalInfo: boolean;
    adminUsers: number;
    articles: number;
    gallery: number;
  };
  error?: string;
}

const SETTINGS_COLLECTION = "settings";

/**
 * Seeds all core website data into Firebase Firestore and synchronizes
 * local storage caches for instant offline-first availability.
 */
export async function seedFirestoreDatabase(userEmail: string = "system-seeder"): Promise<SeedResult> {
  const timestamp = new Date().toISOString();

  // 1. Prepare Data Payloads with schema-compliant metadata
  const heroData = {
    panels: DEFAULT_BUSINESS_PANELS,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const slidersData = {
    slides: DEFAULT_DIVISION_SLIDES,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const partnersData = {
    partners: DEFAULT_PARTNERS,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const generalData = {
    ...DEFAULT_GENERAL_INFO,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const adminData = {
    users: DEFAULT_ADMIN_USERS,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const articlesData = {
    articles: DEFAULT_ARTICLES,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  const galleryData = cleanFirestoreData({
    items: DEFAULT_GALLERY.map((g, idx) => ({
      ...normalizeGalleryItem(g, idx),
      updatedAt: timestamp,
      updatedBy: userEmail,
    })),
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  });

  const profilesData = {
    profiles: DEFAULT_COMPANY_PROFILES,
    status: "published" as const,
    isDeleted: false,
    updatedAt: timestamp,
    updatedBy: userEmail,
  };

  // 2. Always persist into browser local storage for instant sync and offline reliability
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("topon_hero_businesses", JSON.stringify(DEFAULT_BUSINESS_PANELS));
      localStorage.setItem("topon_division_sliders", JSON.stringify(DEFAULT_DIVISION_SLIDES));
      localStorage.setItem("topon_company_profiles", JSON.stringify(DEFAULT_COMPANY_PROFILES));
      localStorage.setItem("topon_partners", JSON.stringify(DEFAULT_PARTNERS));
      localStorage.setItem("topon_general_info", JSON.stringify(DEFAULT_GENERAL_INFO));
      localStorage.setItem("topon_admin_users", JSON.stringify(DEFAULT_ADMIN_USERS));
      localStorage.setItem("topon_articles", JSON.stringify(DEFAULT_ARTICLES));
      localStorage.setItem("topon_gallery", JSON.stringify(DEFAULT_GALLERY));

      // Dispatch change notification events across windows and components
      window.dispatchEvent(new CustomEvent("topon_hero_businesses_changed", { detail: DEFAULT_BUSINESS_PANELS }));
      window.dispatchEvent(new CustomEvent("topon_division_sliders_changed", { detail: DEFAULT_DIVISION_SLIDES }));
      window.dispatchEvent(new CustomEvent("topon_company_profiles_changed", { detail: DEFAULT_COMPANY_PROFILES }));
      window.dispatchEvent(new CustomEvent("topon_partners_changed", { detail: DEFAULT_PARTNERS }));
      window.dispatchEvent(new CustomEvent("topon_general_info_changed", { detail: DEFAULT_GENERAL_INFO }));
      window.dispatchEvent(new CustomEvent("topon_admin_users_changed", { detail: DEFAULT_ADMIN_USERS }));
      window.dispatchEvent(new CustomEvent("topon_articles_changed", { detail: DEFAULT_ARTICLES }));
      window.dispatchEvent(new CustomEvent("topon_gallery_changed", { detail: DEFAULT_GALLERY }));
    } catch (e) {
      console.warn("Local storage seeding error (non-fatal):", e);
    }
  }

  // 3. Push to Cloud Firestore if configured
  if (!isFirebaseConfigured() || !db) {
    return {
      success: true,
      message: "Data seeded successfully into local storage & memory cache (Firebase is not configured or in offline mode).",
      details: {
        heroBusinesses: DEFAULT_BUSINESS_PANELS.length,
        divisionSliders: Object.keys(DEFAULT_DIVISION_SLIDES).length,
        companyProfiles: DEFAULT_COMPANY_PROFILES.length,
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
        articles: DEFAULT_ARTICLES.length,
        gallery: DEFAULT_GALLERY.length,
      },
    };
  }

  try {
    // Write unified settings singleton documents
    await Promise.all([
      setDoc(doc(db, SETTINGS_COLLECTION, "heroBusinesses"), heroData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "divisionSliders"), slidersData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "partners"), partnersData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "generalInfo"), generalData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "adminUsers"), adminData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "company_profiles"), profilesData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "articles"), articlesData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "gallery"), galleryData, { merge: true }),
    ]);

    return {
      success: true,
      message: "Successfully seeded all current data into Firebase Firestore!",
      details: {
        heroBusinesses: DEFAULT_BUSINESS_PANELS.length,
        divisionSliders: Object.keys(DEFAULT_DIVISION_SLIDES).length,
        companyProfiles: DEFAULT_COMPANY_PROFILES.length,
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
        articles: DEFAULT_ARTICLES.length,
        gallery: DEFAULT_GALLERY.length,
      },
    };
  } catch (err: any) {
    console.error("Firestore seeder error:", err);
    return {
      success: false,
      message: `Failed to push data to Firestore: ${err?.message || "Unknown error"}. Check Firebase console & permissions.`,
      error: err?.message,
      details: {
        heroBusinesses: DEFAULT_BUSINESS_PANELS.length,
        divisionSliders: Object.keys(DEFAULT_DIVISION_SLIDES).length,
        companyProfiles: DEFAULT_COMPANY_PROFILES.length,
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
        articles: DEFAULT_ARTICLES.length,
        gallery: DEFAULT_GALLERY.length,
      },
    };
  }
}
