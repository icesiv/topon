import { doc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { DEFAULT_BUSINESS_PANELS, BusinessPanelData } from "./heroBusinesses";
import { DEFAULT_DIVISION_SLIDES, DivisionSlideData, DivisionKey } from "./divisionSliders";
import { DEFAULT_PARTNERS, Partner } from "./partners";
import { DEFAULT_GENERAL_INFO, GeneralInfoData } from "./generalInfo";
import { DEFAULT_ADMIN_USERS, AdminUser } from "./adminUsers";

export interface SeedResult {
  success: boolean;
  message: string;
  details?: {
    heroBusinesses: number;
    divisionSliders: number;
    partners: number;
    generalInfo: boolean;
    adminUsers: number;
  };
  error?: string;
}

const SETTINGS_COLLECTION = "site_settings";

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

  // 2. Always persist into browser local storage for instant sync and offline reliability
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("topon_hero_businesses", JSON.stringify(DEFAULT_BUSINESS_PANELS));
      localStorage.setItem("topon_division_sliders", JSON.stringify(DEFAULT_DIVISION_SLIDES));
      localStorage.setItem("topon_partners", JSON.stringify(DEFAULT_PARTNERS));
      localStorage.setItem("topon_general_info", JSON.stringify(DEFAULT_GENERAL_INFO));
      localStorage.setItem("topon_admin_users", JSON.stringify(DEFAULT_ADMIN_USERS));

      // Dispatch change notification events across windows and components
      window.dispatchEvent(new CustomEvent("topon_hero_businesses_changed", { detail: DEFAULT_BUSINESS_PANELS }));
      window.dispatchEvent(new CustomEvent("topon_division_sliders_changed", { detail: DEFAULT_DIVISION_SLIDES }));
      window.dispatchEvent(new CustomEvent("topon_partners_changed", { detail: DEFAULT_PARTNERS }));
      window.dispatchEvent(new CustomEvent("topon_general_info_changed", { detail: DEFAULT_GENERAL_INFO }));
      window.dispatchEvent(new CustomEvent("topon_admin_users_changed", { detail: DEFAULT_ADMIN_USERS }));
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
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
      },
    };
  }

  try {
    // Write site_settings docs
    await Promise.all([
      setDoc(doc(db, SETTINGS_COLLECTION, "hero_businesses"), heroData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "division_sliders"), slidersData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "partners"), partnersData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "general_info"), generalData, { merge: true }),
      setDoc(doc(db, SETTINGS_COLLECTION, "admin_users"), adminData, { merge: true }),
    ]);

    // Also write dedicated root collection documents for flexible querying in Firebase console
    const individualPromises: Promise<any>[] = [];

    // Partners collection
    DEFAULT_PARTNERS.forEach((partner, idx) => {
      const partnerId = partner.id || `partner_${idx + 1}`;
      individualPromises.push(
        setDoc(
          doc(db!, "partners", partnerId),
          {
            ...partner,
            id: partnerId,
            order: idx,
            updatedAt: timestamp,
            updatedBy: userEmail,
          },
          { merge: true }
        )
      );
    });

    // Hero businesses collection
    DEFAULT_BUSINESS_PANELS.forEach((panel) => {
      individualPromises.push(
        setDoc(
          doc(db!, "hero_businesses", panel.id),
          {
            ...panel,
            updatedAt: timestamp,
            updatedBy: userEmail,
          },
          { merge: true }
        )
      );
    });

    // Division sliders collection
    (Object.keys(DEFAULT_DIVISION_SLIDES) as DivisionKey[]).forEach((divKey) => {
      individualPromises.push(
        setDoc(
          doc(db!, "division_sliders", divKey),
          {
            division: divKey,
            slides: DEFAULT_DIVISION_SLIDES[divKey],
            updatedAt: timestamp,
            updatedBy: userEmail,
          },
          { merge: true }
        )
      );
    });

    await Promise.all(individualPromises);

    return {
      success: true,
      message: "Successfully seeded all current data into Firebase Firestore!",
      details: {
        heroBusinesses: DEFAULT_BUSINESS_PANELS.length,
        divisionSliders: Object.keys(DEFAULT_DIVISION_SLIDES).length,
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
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
        partners: DEFAULT_PARTNERS.length,
        generalInfo: true,
        adminUsers: DEFAULT_ADMIN_USERS.length,
      },
    };
  }
}
