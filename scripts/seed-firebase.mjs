#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from "firebase/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// 1. Parse .env and .env.local
function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, "utf-8");
  const parsed = {};
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const idx = trimmed.indexOf("=");
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      parsed[key] = val;
    }
  });
  return parsed;
}

const envPath = path.join(rootDir, ".env");
const envLocalPath = path.join(rootDir, ".env.local");

const envConfig = {
  ...loadEnvFile(envPath),
  ...loadEnvFile(envLocalPath),
};

// Parse command line arguments (--email=..., --password=...)
const args = process.argv.slice(2);
let cliEmail = null;
let cliPassword = null;
args.forEach((arg) => {
  if (arg.startsWith("--email=")) cliEmail = arg.split("=")[1];
  if (arg.startsWith("--password=")) cliPassword = arg.split("=")[1];
});

const authEmail = cliEmail || process.env.FIREBASE_AUTH_EMAIL || envConfig.FIREBASE_AUTH_EMAIL;
const authPassword = cliPassword || process.env.FIREBASE_AUTH_PASSWORD || envConfig.FIREBASE_AUTH_PASSWORD;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || envConfig.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || envConfig.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || envConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || envConfig.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || envConfig.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || envConfig.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log("\n==========================================");
console.log(" Top On Group - Firebase Firestore Seeder ");
console.log("==========================================\n");

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error("❌ Error: Missing Firebase configuration in .env or .env.local!");
  process.exit(1);
}

console.log(`📡 Loaded Firebase configuration from .env:`);
console.log(`   Project ID: ${firebaseConfig.projectId}`);
console.log(`   Auth Domain: ${firebaseConfig.authDomain}`);
console.log(`   Storage Bucket: ${firebaseConfig.storageBucket}`);
console.log(`   App ID: ${firebaseConfig.appId}`);
console.log(`📡 Connecting to Firebase project: [${firebaseConfig.projectId}]`);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// 2. Data Definitions (Current Structured Content)
const timestamp = new Date().toISOString();
const userEmail = authEmail || "cli-seeder@toponbd.com";

const BUSINESS_PANELS = [
  {
    id: "topexpress",
    number: "01",
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
    order: 0,
    status: "published",
    isDeleted: false,
  },
  {
    id: "dailyshipping",
    number: "02",
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
    order: 1,
    status: "published",
    isDeleted: false,
  },
  {
    id: "topontech",
    number: "03",
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
    order: 2,
    status: "published",
    isDeleted: false,
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
    isDeleted: false,
  },
  {
    id: "toponsolution",
    number: "05",
    name: "Top On-Solution",
    name_short: "Solution",
    category: "Corporate Consultancy & Business Advisory",
    tagline: "Company Setup, Regulatory Compliance, Tax, VAT & Trade Advisory",
    fullTagline:
      "Strategic advisory empowering foreign investors and domestic enterprises with statutory licensing, legal compliance, and operational advisory.",
    href: "/divisions/consultancy-toponsolution",
    image: "/images/toponsolution_hero.jpg",
    iconName: "Briefcase",
    logo: "/images/logo/topon-solution.png",
    order: 4,
    status: "published",
    isDeleted: false,
  },
];

const DIVISION_SLIDES = {
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
      category: "Global Sourcing & Procurement",
      headline: "End-to-end international procurement of industrial components, chemicals, and equipment.",
    },
    {
      id: "topontech_2",
      image: "/images/topontech_slide_2.jpg",
      category: "Industrial Technology & Hardware Supply",
      headline: "High-reliability IT hardware, networking systems, and factory automation components.",
    },
    {
      id: "topontech_3",
      image: "/images/topontech_slide_3.jpg",
      category: "Bulk Raw Materials & Fabrics",
      headline: "Direct mill relationships for industrial chemicals, textile auxiliaries, and raw polymers.",
    },
  ],
  toponagro: [
    {
      id: "toponagro_1",
      image: "/images/toponagro_slide_1.jpg",
      category: "Modern Aquaculture & Biofloc Technology",
      headline: "Eco-friendly, bio-secure freshwater fish production with automated water quality monitoring.",
    },
    {
      id: "toponagro_2",
      image: "/images/toponagro_slide_2.jpg",
      category: "Hatchery Breeding & Cold-Chain Logistics",
      headline: "Certified broodstock fingerlings, temperature-controlled transit, and premium market supply.",
    },
    {
      id: "toponagro_3",
      image: "/images/fisheries_farm.jpg",
      category: "Sustainable Commercial Fisheries",
      headline: "Pioneering responsible commercial aquaculture for national food security.",
    },
  ],
  toponsolution: [
    {
      id: "toponsolution_1",
      image: "/images/toponsolution_slide_1.jpg",
      category: "Corporate Legal & Regulatory Advisory",
      headline: "Statutory licensing, RJSC company incorporation, trade permissions, and corporate governance.",
    },
    {
      id: "toponsolution_2",
      image: "/images/toponsolution_slide_2.jpg",
      category: "NBR Tax, VAT & Customs Dispute Management",
      headline: "Certified Income Tax Practitioners (ITP) managing fiscal audits, VAT return filings, and appeals.",
    },
    {
      id: "toponsolution_3",
      image: "/images/toponsolution_hero.jpg",
      category: "Supply Chain & Industrial Feasibility",
      headline: "Strategic consulting for enterprise supply chains, warehouse planning, and import feasibility.",
    },
  ],
};

const PARTNERS = [
  { name: "Walton Hi-Tech Industries", image: "/images/partners/walton.png" },
  { name: "Remark HB Ltd.", image: "/images/partners/remark.png" },
  { name: "Bangla CAT (Caterpillar)", image: "/images/partners/bangla-cat.jpeg" },
  { name: "Army Pharma Limited", image: "/images/partners/army-pharma.png" },
  { name: "Fervent Multiboard Ind.", image: "/images/partners/fervent.jpg" },
  { name: "Ikbal Textile Mills Ltd.", image: "/images/partners/ikbal-textile.png" },
  { name: "Fusion Group", image: "/images/partners/fusion-group.png" },
  { name: "A&A International", image: "/images/partners/aa-international.jpg" },
  { name: "DRIL", image: "/images/partners/dril.png" },
  { name: "Majesto", image: "/images/partners/majesto.png" },
  { name: "Factomart", image: "/images/partners/factomart.png" },
  { name: "Acorn Consumer Products", image: "/images/partners/acorn.png" },
  { name: "Bangladesh Lamps Limited", image: "/images/partners/bangladesh-lamps.jpg" },
  { name: "Kashmir Fans", image: "/images/partners/kashmir-fans.png" },
  { name: "Whirlpool Bangladesh", image: "/images/partners/whirlpool.png" },
  { name: "Transcom Group", image: "/images/partners/transcom.jpg" },
  { name: "TST White House", image: "/images/partners/tst-white-house.png" },
  { name: "Genuine Technology", image: "/images/partners/genuine-technology.png" },
  { name: "Madras Security Printers", image: "/images/partners/madras-security.png" },
  { name: "Spectra Hexa Feeds Ltd.", image: "/images/partners/spectra-hexa.jpg" },
  { name: "M/S Electronics", image: "/images/partners/ms-electronics.jpg" },
  { name: "F&B Associates", image: "/images/partners/f-and-b.png" },
  { name: "Bishwash Holdings Ltd.", image: "/images/partners/bishwash-holdings.jpg" },
  { name: "Motion Care Bangladesh", image: "/images/partners/motion-care.png" },
  { name: "Spark International", image: "/images/partners/spark.png" },
];

const GENERAL_INFO = {
  companyName: "Top On Group",
  tagline: "Connecting Global Supply Chains with Local Precision",
  email: "info@toponbd.com",
  phone: "+880 1711-775280",
  secondaryPhone: "+880 1711-775281",
  address: "House 32, Road 11, Block D, Banani, Dhaka-1213, Bangladesh",
  chittagongOffice: "Agrabad Commercial Area, Chattogram-4100, Bangladesh",
  benapoleOffice: "Customs Clearing Station, Benapole Land Port, Jashore",
  businessHours: "Sunday - Thursday: 9:00 AM - 6:00 PM (Port desks operate 24/7)",
  facebookUrl: "https://www.facebook.com/topongroup",
  linkedinUrl: "https://www.linkedin.com/company/topongroup",
};

const ADMIN_USERS = [
  {
    id: "user_1",
    name: "Md. Abdullah Al Mamun",
    email: "mamun@toponbd.com",
    role: "Super Admin",
    status: "Active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "user_2",
    name: "System Administrator",
    email: "admin@toponbd.com",
    role: "Admin",
    status: "Active",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

async function seed() {
  try {
    // Attempt authentication if credentials provided
    if (authEmail && authPassword) {
      console.log(`🔐 Authenticating as: [${authEmail}]...`);
      try {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
        console.log("   ✓ Authentication successful!");
      } catch (authErr) {
        console.warn(`   ⚠️ Firebase Auth login warning: ${authErr.message}. Attempting write...`);
      }
    }

    console.log("🌱 1/5 Seeding Hero Businesses...");
    const heroPayload = {
      panels: BUSINESS_PANELS,
      status: "published",
      isDeleted: false,
      updatedAt: timestamp,
      updatedBy: userEmail,
    };
    await setDoc(doc(db, "site_settings", "hero_businesses"), heroPayload, { merge: true });
    await setDoc(doc(db, "settings", "heroBusinesses"), heroPayload, { merge: true });
    console.log(`   ✓ Seeded ${BUSINESS_PANELS.length} hero panels.`);

    console.log("🌱 2/5 Seeding Division Hero Sliders...");
    const slidersPayload = {
      slides: DIVISION_SLIDES,
      status: "published",
      isDeleted: false,
      updatedAt: timestamp,
      updatedBy: userEmail,
    };
    await setDoc(doc(db, "site_settings", "division_sliders"), slidersPayload, { merge: true });
    await setDoc(doc(db, "settings", "divisionSliders"), slidersPayload, { merge: true });
    const totalSlides = Object.values(DIVISION_SLIDES).reduce((acc, curr) => acc + curr.length, 0);
    console.log(`   ✓ Seeded 5 divisions (${totalSlides} total slides).`);

    console.log("🌱 3/5 Seeding Business Partners...");
    const partnersPayload = {
      partners: PARTNERS,
      status: "published",
      isDeleted: false,
      updatedAt: timestamp,
      updatedBy: userEmail,
    };
    await setDoc(doc(db, "site_settings", "partners"), partnersPayload, { merge: true });
    await setDoc(doc(db, "settings", "partners"), partnersPayload, { merge: true });
    console.log(`   ✓ Seeded ${PARTNERS.length} strategic partners.`);

    console.log("🌱 4/5 Seeding General Information...");
    const generalPayload = {
      ...GENERAL_INFO,
      status: "published",
      isDeleted: false,
      updatedAt: timestamp,
      updatedBy: userEmail,
    };
    await setDoc(doc(db, "site_settings", "general_info"), generalPayload, { merge: true });
    await setDoc(doc(db, "settings", "generalInfo"), generalPayload, { merge: true });
    console.log("   ✓ Seeded corporate address, contacts, and desks.");

    console.log("🌱 5/5 Seeding Admin Users...");
    const usersPayload = {
      users: ADMIN_USERS,
      status: "published",
      isDeleted: false,
      updatedAt: timestamp,
      updatedBy: userEmail,
    };
    await setDoc(doc(db, "site_settings", "admin_users"), usersPayload, { merge: true });
    await setDoc(doc(db, "settings", "adminUsers"), usersPayload, { merge: true });
    console.log(`   ✓ Seeded ${ADMIN_USERS.length} authorized administrator records.`);

    // Dedicated Collections for Easy Inspection in Firebase Console
    console.log("\n📦 Seeding direct collection records...");
    for (const panel of BUSINESS_PANELS) {
      await setDoc(doc(db, "hero_businesses", panel.id), { ...panel, updatedAt: timestamp, updatedBy: userEmail }, { merge: true });
    }
    for (const [key, slides] of Object.entries(DIVISION_SLIDES)) {
      await setDoc(doc(db, "division_sliders", key), { division: key, slides, updatedAt: timestamp, updatedBy: userEmail }, { merge: true });
    }
    for (let i = 0; i < PARTNERS.length; i++) {
      const p = PARTNERS[i];
      await setDoc(doc(db, "partners", `partner_${i + 1}`), { ...p, id: `partner_${i + 1}`, order: i, updatedAt: timestamp, updatedBy: userEmail }, { merge: true });
    }
    console.log("   ✓ Direct collections populated successfully.");

    console.log("\n==========================================");
    console.log(" 🎉 ALL DATA SEEDED SUCCESSFULLY TO FIREBASE! ");
    console.log("==========================================\n");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed with error:", error?.message || error);

    if (error?.code === "permission-denied" || error?.message?.includes("PERMISSION_DENIED")) {
      console.log("\n💡 Firestore Security Rules Notice:");
      console.log("Your Firestore rules require authentication. You can run:");
      console.log("  node scripts/seed-firebase.mjs --email=admin@toponbd.com --password=<your-password>");
      console.log("Or:");
      console.log("  Open http://localhost:3047/admin -> System Diagnostics and click 'Seed Firestore Database' while logged in.\n");
    } else {
      console.log("\nTip: If you encounter a 403 / SERVICE_DISABLED error, ensure Cloud Firestore API is enabled in your Google Cloud / Firebase console for project [topon-ae2d7].\n");
    }
    process.exit(1);
  }
}

seed();
