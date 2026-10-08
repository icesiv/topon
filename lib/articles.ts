import { doc, getDoc, setDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { setCache, getCached, clearCache } from "./firebase-service";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  status: "published" | "draft" | "archived";
  isFeatured?: boolean;
  order?: number;
  views?: number;
  updatedAt?: string;
  updatedBy?: string;
}

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: "art_freight_forwarding_bangladesh_2026",
    slug: "strategic-guide-freight-forwarding-bangladesh",
    title:
      "The Strategic Guide to Freight Forwarding in Bangladesh: Navigating Chittagong Port, Bay Terminal & Global Multimodal Corridors",
    category: "Freight Forwarding & Maritime",
    author: "Daily Shipping & Logistics Operations Desk",
    coverImage: "/images/dailyshipping_hero.jpg",
    readTime: "7 min read",
    publishedAt: "2026-03-28",
    status: "published",
    isFeatured: true,
    order: 0,
    excerpt:
      "An in-depth operational analysis of Bangladesh's evolving ocean and air freight landscape—examining Chittagong Port turnaround efficiencies, off-dock container logistics, Bay Terminal megaprojects, and multimodal strategies for international shippers.",
    tags: [
      "Freight Forwarding",
      "Chittagong Port",
      "Ocean Freight",
      "Multimodal Logistics",
      "Supply Chain",
      "Daily Shipping",
    ],
    content: `## 1. Introduction: The Arteries of Bangladesh's Global Trade

Bangladesh sits at a pivotal juncture of South Asian trade routes. With merchandise exports surpassing **$55 billion**—driven predominantly by the Ready-Made Garments (RMG) sector—and industrial imports expanding rapidly in machinery, raw cotton, steel, chemicals, and energy, efficient freight forwarding is not merely a service; it is the economic backbone of the nation.

For global supply chain executives, managing freight to and from Bangladesh requires navigating specific maritime dynamics, draught constraints, inland transport chokepoints, and high-stakes customs formalities. This strategic guide explores how modern freight forwarders coordinate seamless multi-carrier movements, optimize turnaround times, and mitigate risks across Bangladesh's premier maritime and inland gateways.

---

## 2. Chittagong Port (CPA): Realities, Draught Limits & Tidal Navigation

Handling over **92% of the country's maritime commerce** and 98% of container traffic, **Chittagong Port** (administered by the Chittagong Port Authority - CPA) is the nation's primary maritime gateway. 

### Key Maritime Parameters
* **Karnafuli River Draught:** Vessels are restricted to approximately 9.5 to 10 meters draught depending on daily lunar tide levels.
* **Length Overall (LOA):** Maximum LOA currently caps around 190 to 200 meters for conventional berths.
* **Transshipment Feeders:** Due to these river restrictions, deep-draft mega container vessels (15,000+ TEUs) cannot call directly at Chittagong. Freight forwarders must orchestrate feeder lines connecting Chittagong with transshipment hubs in **Singapore, Port Klang, Colombo, and Tanjung Pelepas**.

> **Strategic Takeaway:** Selecting a freight forwarding partner with guaranteed feeder space allocations and dual-hub contracts (Colombo + Singapore/Port Klang) prevents transit bottlenecks during regional monsoon surges and seasonal peak shipping volumes.

---

## 3. The Vital Ecosystem of Off-Dock Inland Container Depots (ICDs)

To ease severe congestion inside port jetty yards, Bangladesh operates a decentralized off-dock system comprising **19 private Inland Container Depots (ICDs)** located across Chittagong.

* **Export Cargo Consolidation:** Nearly 100% of outbound export container cargo (FCL and LCL) is stuffed and processed at these private off-docks rather than the port's internal aprons.
* **Designated Import Commodities:** 38+ designated bulk import commodities are mandated for transfer to off-dock yards immediately after discharge from the vessel.

Forwarding teams on the ground must closely manage off-dock trailer coordination, empty container repositioning, and Container Freight Station (CFS) de-stuffing to avoid detention charges levied by shipping lines.

---

## 4. Transformative Megaprojects: Bay Terminal & Matarbari Deep Sea Port

The next decade will fundamentally redefine Bangladesh's maritime profile through two game-changing infrastructure investments:

### A. The Chittagong Bay Terminal
Located just 6 km north of Chittagong Port on the Bay of Bengal coastline, the **Bay Terminal** eliminates river draught restrictions:
* Accommodates vessels with up to **12-meter draught** and **300-meter LOA**.
* Eliminates reliance on daylight tidal navigation, enabling 24/7 docking cycles.
* Multiplies annual container handling capacity by over 3 million TEUs.

### B. Matarbari Deep Sea Port
With an extraordinary draught capability exceeding **16 to 18 meters**, Matarbari in Cox's Bazar district will welcome direct mainline container mother vessels carrying up to 8,000–10,000 TEUs. This direct connectivity will shave **4 to 7 days off transit times** to Europe and North America by bypassing secondary feeder transshipment hubs.

---

## 5. Multimodal Corridors: River, Rail & Express Linehaul

Achieving end-to-end supply chain reliability in Bangladesh requires combining maritime ocean legs with dedicated domestic transit channels:

1. **Pangaon Inland Container Terminal (PICT):** Located along the Buriganga River in Keraniganj, Dhaka. Enables containerized barge movement directly from Chittagong and Mongla to the industrial heart of the capital, bypassing highway road congestion.
2. **Kamalapur Railway ICD (Dhaka):** Direct broad-gauge container freight trains connecting Chittagong Port terminal rails with central Dhaka, ideal for heavy industrial raw materials and bulk consignments.
3. **Dedicated Highway Linehaul:** Express GPS-monitored covered van and trailer fleets operating along the Dhaka-Chittagong 4-lane highway corridor, delivering factory-to-port turnaround in under 8–12 hours under bonded transit protocols.

---

## 6. How Shippers Can Optimize Freight Economics in Bangladesh

To minimize demurrage and achieve competitive freight rates:

* **Lock Pre-Clearance Documentation:** Ensure all Bills of Lading (B/L), Commercial Invoices, Packing Lists, and Certificates of Origin are audited 48 hours prior to vessel berthing.
* **Negotiate Free-Time Windows:** Secure 14 to 21 days of container detention free-time directly with ocean liners to protect against seasonal port congestion.
* **Leverage Sea-Air Transshipment:** When urgent delivery timelines threaten production deadlines, utilize sea-air hybrid forwarding via Dubai or Colombo to cut delivery cycles by 60% compared to ocean freight.
* **Partner with an Integrated Operator:** Work with an organization offering end-to-end synergy—seamlessly uniting international ocean chartering (**Daily Shipping & Logistics**), licensed customs brokerage (**Top Express Limited**), and secure linehaul transport.`,
  },
  {
    id: "art_customs_clearance_cnf_bangladesh_2026",
    slug: "customs-clearance-cnf-operations-guide-bangladesh",
    title:
      "Customs Clearing & Forwarding (C&F) in Bangladesh: ASYCUDA World, Regulatory Compliance & Port Delivery Playbook",
    category: "Customs & Trade Compliance",
    author: "Top Express Limited Customs Operations Team",
    coverImage: "/images/customs_cnf.jpg",
    readTime: "6 min read",
    publishedAt: "2026-04-02",
    status: "published",
    isFeatured: false,
    order: 1,
    excerpt:
      "Mastering customs brokerage in Bangladesh: step-by-step Bill of Entry processing, HS code valuation pitfalls, automated ASYCUDA World navigation, and strategic clearance across sea, air, and land customs houses.",
    tags: [
      "Customs Clearance",
      "C&F Operations",
      "ASYCUDA World",
      "Bill of Entry",
      "Top Express",
      "Trade Compliance",
    ],
    content: `## 1. The Regulatory Landscape: National Board of Revenue & The Customs Act

Navigating customs in Bangladesh is a rigorous legal and procedural discipline. Regulated by the **National Board of Revenue (NBR)** under the **Customs Act, 2023** (updating the historic 1969 statute), international trade clearance requires certified operational expertise.

In Bangladesh, importers and exporters are legally required to transact customs entries through government-licensed **Customs Clearing & Forwarding (C&F) Agents**. A competent C&F broker acts as the fiduciary bridge between commercial cargo owners and customs authorities, ensuring statutory declarations, duty calculations, physical inspections, and final out-of-charge releases are conducted with zero demurrage and full legal compliance.

---

## 2. The 7-Step Customs Clearance Lifecycle

Every import consignment arriving at Bangladesh ports moves through a structured administrative progression:

\`\`\`
[1. Manifest Inward] ──► [2. Electronic B/E Filing] ──► [3. Document Assessment]
                                                                  │
[7. Port Delivery]   ◄── [6. Out-of-Charge (OOC)]   ◄── [4. Duty & Tax Payment]
                                                                  ▲
                                                                  │
                                                     [5. Physical Examination]
\`\`\`

1. **Import General Manifest (IGM) Submission:** The ocean carrier or airline submits the electronic manifest into customs servers prior to arrival.
2. **Bill of Entry (B/E) Filing:** The licensed C&F broker lodges the detailed declaration in the **ASYCUDA World** automated customs platform.
3. **Assessment & Tariff Classification:** Customs appraisers verify the 8-digit Harmonized System (HS) Code, valuation database benchmarks, and applicable duty rates (Customs Duty, Regulatory Duty, Supplementary Duty, VAT, AIT, and Advance Tax).
4. **Assessment Notice & Duty Payment:** Real-time RTGS or e-Payment of assessed duties and taxes through designated commercial bank channels.
5. **Physical Examination & Lab Testing:** Based on channel risk assessment, customs officers conduct container un-stuffing, physical cargo counting, or laboratory composition tests (for chemicals, industrial polymers, and food ingredients).
6. **Out-of-Charge (OOC) Clearance:** Final statutory authorization releasing the cargo from customs custody.
7. **Port Authority Clearance & Delivery:** Payment of port/CFS port dues, container security clearance, and gate-pass issuance for vehicular departure.

---

## 3. ASYCUDA World Channel Routing Demystified

The automated ASYCUDA World system routes submissions through one of four risk-management lanes:

| Channel | Procedure | Processing Time |
| :--- | :--- | :--- |
| **Green Channel** | Automated clearance without physical examination or prior document assessment. Reserved for AEO (Authorized Economic Operators). | **2 to 4 Hours** |
| **Yellow Channel** | Detailed documentary review of commercial invoice, packing list, L/C, and certificates. Physical inspection waived unless discrepancies emerge. | **12 to 24 Hours** |
| **Red Channel** | Mandatory 100% or random physical examination by customs inspection teams accompanied by C&F representatives. | **24 to 48 Hours** |
| **Blue Channel** | Post-clearance audit lane where goods are cleared rapidly but audited after release. | **Immediate Delivery** |

---

## 4. The 5 Strategic Customs Houses in Bangladesh

Operational efficiency depends on knowing the specific nuances of the five premier customs houses:

* **1. Customs House, Chattogram:** Handles the overwhelming volume of containerized ocean cargo, heavy industrial plants, and raw material imports.
* **2. Customs House, Airport, Dhaka (HSIA Cargo Village):** Specialized in high-value, time-sensitive shipments, pharmaceutical ingredients, electronics, and garment sample deliveries under bonded warehouse controls.
* **3. Customs House ICD, Kamalapur (Dhaka):** Inland dry port rail terminal tailored for rapid industrial cargo transit directly into central Dhaka.
* **4. Customs House, Pangaon (Keraniganj, Dhaka):** River container terminal operating specialized barge traffic between coastal seaports and the capital.
* **5. Customs House Benapole, Jashore:** The nation's largest land border crossing, managing extensive bilateral road transit of industrial raw materials and consumer goods from India.

---

## 5. Critical Pitfalls: How to Avoid Demurrage & Costly Penalties

1. **HS Code Discrepancies:** Declaring an incorrect 8-digit tariff code—even inadvertently—can trigger accusations of false declaration, resulting in 200% penalty duties or confiscation. Always audit HS codes with experienced C&F tariff specialists prior to shipment departure from origin.
2. **Letter of Credit (L/C) Non-Conformity:** In Bangladesh, strict Foreign Exchange regulations dictate that commercial documents must mirror L/C stipulations verbatim. Any typographic discrepancy can stall banking endorsement and hold up clearance.
3. **Container Demurrage & Detention:** Port yard storage tariffs and shipping line container detention compound daily after free time expires. Immediate electronic manifest matching and pre-arrival document verification are essential to clear cargo within the free-time window.
4. **Import Policy Order (IPO) Conditions:** Certain commodities require mandatory testing by BSTI (Bangladesh Standards and Testing Institution), Atomic Energy Commission, or Plant Quarantine. Engaging a knowledgeable C&F agent ensures sampling appointments are pre-scheduled.

---

## 6. The Top Express Advantage

With licensed customs operations spanning **Chittagong, Dhaka Airport, Kamalapur ICD, Pangaon, and Benapole**, **Top Express Limited** provides:

* Dedicated operational desks physically stationed at every customs gate.
* Advanced computerized ASYCUDA World pre-entry filing.
* Transparent fiduciary itemized costings with zero hidden charges.
* Real-time milestone updates from IGM entry to port gate-out delivery.`,
  },
];

const SETTINGS_COLLECTION = "settings";
const ARTICLES_DOC = "articles";
const CACHE_KEY = `${SETTINGS_COLLECTION}:${ARTICLES_DOC}`;
const LOCAL_STORAGE_KEY = "topon_articles";
const EVENT_NAME = "topon_articles_changed";

function getLocalArticles(): Article[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage read errors
  }
  return null;
}

function setLocalArticles(articles: Article[], broadcast: boolean = false): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
    if (broadcast) {
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: articles }));
    }
  } catch {
    // Ignore localStorage write errors
  }
}

export function getArticlesSync(): Article[] {
  const cached = getCached<Article[]>(CACHE_KEY);
  if (cached && cached.length > 0) return cached;

  const local = getLocalArticles();
  if (local && local.length > 0) return local;

  return DEFAULT_ARTICLES;
}

export async function fetchArticles(useCache: boolean = true): Promise<Article[]> {
  if (useCache) {
    const cached = getCached<Article[]>(CACHE_KEY);
    if (cached && cached.length > 0) return cached;
  }

  const local = getLocalArticles();
  if (local && local.length > 0) {
    setCache(CACHE_KEY, local, 120000);
    // If offline or fast render, return local
  }

  if (!isFirebaseConfigured() || !db) {
    return local || DEFAULT_ARTICLES;
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ARTICLES_DOC);
    const snap = await getDoc(docRef);
    if (snap.exists() && Array.isArray(snap.data()?.articles) && snap.data()?.articles.length > 0) {
      const activeArticles = (snap.data().articles as Article[]).filter(
        (a) => a.status !== "archived"
      );
      setCache(CACHE_KEY, activeArticles, 120000);
      setLocalArticles(activeArticles, false);
      return activeArticles;
    } else {
      // If doc does not exist yet in Firestore, auto-seed DEFAULT_ARTICLES to Firestore
      try {
        await setDoc(
          docRef,
          {
            articles: DEFAULT_ARTICLES,
            updatedAt: new Date().toISOString(),
            updatedBy: "system_init",
            status: "published",
            isDeleted: false,
          },
          { merge: true }
        );
        setCache(CACHE_KEY, DEFAULT_ARTICLES, 120000);
        setLocalArticles(DEFAULT_ARTICLES, false);
        return DEFAULT_ARTICLES;
      } catch (seedErr) {
        console.warn("Could not auto-seed articles in Firestore:", seedErr);
      }
    }
  } catch (err) {
    console.error("Error fetching articles from Firestore, using fallback:", err);
  }

  return local || DEFAULT_ARTICLES;
}

export async function fetchArticleBySlug(
  slug: string,
  useCache: boolean = true
): Promise<Article | null> {
  const articles = await fetchArticles(useCache);
  const found = articles.find((a) => a.slug === slug);
  return found || null;
}

export function subscribeArticles(
  onUpdate: (articles: Article[]) => void
): Unsubscribe | null {
  // 1. Emit instantaneous local/cached data
  const initial = getArticlesSync();
  onUpdate(initial);

  // 2. Cross-component & cross-tab synchronization
  const handleLocalChange = (e: Event) => {
    const customEvt = e as CustomEvent<Article[]>;
    if (customEvt.detail && Array.isArray(customEvt.detail)) {
      setCache(CACHE_KEY, customEvt.detail, 120000);
      onUpdate(customEvt.detail);
    } else {
      const updated = getArticlesSync();
      onUpdate(updated);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener(EVENT_NAME, handleLocalChange);
    window.addEventListener("storage", handleLocalChange);
  }

  let firestoreUnsub: Unsubscribe | null = null;

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, ARTICLES_DOC);
      firestoreUnsub = onSnapshot(
        docRef,
        (snap) => {
          if (
            snap.exists() &&
            Array.isArray(snap.data()?.articles) &&
            snap.data()?.articles.length > 0
          ) {
            const activeArticles = (snap.data().articles as Article[]).filter(
              (a) => a.status !== "archived"
            );
            setCache(CACHE_KEY, activeArticles, 120000);
            setLocalArticles(activeArticles, false);
            onUpdate(activeArticles);
          } else {
            onUpdate(DEFAULT_ARTICLES);
          }
        },
        (err) => {
          console.warn("Firestore articles snapshot error, using default:", err);
          onUpdate(getArticlesSync());
        }
      );
    } catch (err) {
      console.error("Failed to subscribe to articles in Firestore:", err);
    }
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener(EVENT_NAME, handleLocalChange);
      window.removeEventListener("storage", handleLocalChange);
    }
    if (firestoreUnsub) {
      firestoreUnsub();
    }
  };
}

export async function saveArticles(
  articles: Article[],
  userEmail?: string
): Promise<{ success: boolean; error?: string }> {
  const timestamp = new Date().toISOString();
  const normalizedArticles = articles.map((a, idx) => ({
    ...a,
    order: idx,
    updatedAt: timestamp,
    updatedBy: userEmail || "admin",
  }));

  // 1. Immediately update memory cache and localStorage with broadcast event
  setCache(CACHE_KEY, normalizedArticles, 120000);
  setLocalArticles(normalizedArticles, true);

  if (!isFirebaseConfigured() || !db) {
    return {
      success: true,
    };
  }

  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ARTICLES_DOC);
    await setDoc(
      docRef,
      {
        articles: normalizedArticles,
        updatedAt: timestamp,
        updatedBy: userEmail || "admin",
        status: "published",
        isDeleted: false,
      },
      { merge: true }
    );
    clearCache(SETTINGS_COLLECTION);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to save articles to Firestore:", err);
    return {
      success: false,
      error: err?.message || "Failed to save articles to Firebase.",
    };
  }
}
