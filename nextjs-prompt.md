# System Prompt: Generate an SEO-Optimized Next.js Website for Top On Group

Copy and paste the entire block below into your AI code generator (e.g., Claude 3.5 Sonnet, GPT-4, or Gemini) to generate a complete, production-ready, and SEO-optimized website built with Next.js and Tailwind CSS.

***

```markdown
You are an expert Frontend Developer and Technical SEO Specialist. Your task is to generate a modern, fully responsive, and highly search-engine-optimized company website using **Next.js 14+ (App Router)**, **TypeScript**, and **Tailwind CSS**. 

The website is for **Top On Group**, an international business conglomerate based in Bangladesh, consisting of key divisions like **Top On-Tech** (Import, Export & Trading) and **Daily Shipping & Logistics** (Freight Forwarding & C&F Operations).

---

### 1. SEO & Performance Architecture Requirements

To ensure the highest search engine visibility, follow these architectural patterns strictly:
1. **Semantic HTML Structure**: Always use semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). 
2. **Next.js Metadata API**: Implement static and dynamic metadata using the `generateMetadata` function. Include descriptive `title`, `description`, `keywords`, and Open Graph (OG) tags for every route.
3. **Structured JSON-LD Schema**: Embed a JSON-LD structured data script on the homepage using `Organization` and `LocalBusiness` schemas to help Google understand the business hierarchy, services, and leadership.
4. **Image Optimization**: Use Next.js `<Image />` tags with explicit `alt` attributes, widths, heights, and priority loading for Above-The-Fold hero images.
5. **Dynamic Sitemap & Robots**: Provide code templates for dynamic sitemap generation (`app/sitemap.ts`) and custom search engine rules (`app/robots.ts`).
6. **Core Web Vitals Optimization**: Use Google Fonts optimized via `next/font/google` (e.g., Inter/Playfair Display) to prevent cumulative layout shifts (CLS).
7. **Heading Hierarchy**: Ensure exactly one `<h1>` per page, followed by properly nested `<h2>`, `<h3>`, etc. Do not skip heading levels.

---

### 2. Branding, Colors & Visual Language

- **Primary Colors**: Deep Navy Blue (`#0B2240` / `bg-slate-900`) and Brushed Metallic Gold/Bronze (`#C5A85C` / `text-amber-500` or `text-yellow-600`) as seen in the brand logos.
- **Accents**: Clean whites, slate gray text for legibility, and gold borders to convey premium trust.
- **Style**: Professional, corporate, globally connected, clean borders, minimal layouts, subtle hover transitions (using Tailwind's `transition-all duration-300`).
- **Brand Tagline**: "On Time. Every Time."

---

### 3. Website Pages & Structural Layout (Grounded Content)

Build the website sections with the following exact copy and information extracted from the official company profiles:

#### A. Global Navigation Layout (Sitemap Grid)
- **Top Bar**: Social media links (Facebook, WhatsApp, LinkedIn, Instagram) and a direct "Contact Us" link.
- **Main Navigation Bar**:
  - **Home** (Featuring 3D elements/banners)
  - **About Us** (Dropdown: Our Values, Our Journey, Message From Entrepreneur, Mission & Vision, Milestones, Career, Accreditation)
  - **Company** (Dropdown: Top On-Tech, Top Express Limited, Daily Shipping & Logistics, Top On-Agro Firm)
  - **Services** (Dropdown: Trading-Import & Export, Customs Clearing & Forwarding, Freight Forwarding)
  - **Download Profile** (Call-to-action button)

#### B. Home Page Structure
1. **Hero Section (Above the Fold)**:
   - High-impact headline: "Connecting Products, Markets, and Global Opportunities"
   - Subheadline: "Top On Group is Bangladesh's trusted conglomerate delivering excellence in general trading, international sourcing, and compliant end-to-end logistics coordination."
   - Background: Overlay of professional maritime shipping or trade visuals. Primary CTA "Explore Services", Secondary CTA "Get a Quote".
2. **Division Highlights (Grid)**:
   - **Top On-Tech (Est. Jan 2024)**: A diversified trading house specializing in industrial machinery & spares, chemical supply, textile fabrics, electronics, and customized consumer sourcing. Focus: "Trust is our most valuable trading asset."
   - **Daily Shipping & Logistics (Est. Sep 2025)**: Technology-driven freight forwarding partner. Built on over 20,000+ containers of operational experience, specializing in international ocean freight, documentation accuracy, and customs trade compliance.
3. **Core Values Section**:
   - Showcase cards for: *Integrity, Quality, Accountability, Customer Focus, Innovation, and Trade Compliance*.
4. **Leadership Spotlight**:
   - Introduce **Mr. Md. Abdullah Al Mamun (Owner & visionary leader)**. 
   - Highlight 15+ years of supply chain experience, former Executive Director at Walton Group, carrying certifications like CSCM (USA), ITP (Income Tax Practitioner), and CACC (Chartered Accountancy Course Completion). Focus: "Sustainable success is built through integrity, accountability, and long-term relationships."

#### C. Contact & Footer (Conversion Oriented)
- Clear contact form capturing Company Name, Requirement Type (Trading vs. Logistics), and Message.
- Footer with division office links, standard licensing disclaimer, and sitemap links.

---

### 4. Required File Outputs & Code Structures

Generate code for the following Next.js components and structures:

#### Component 1: Main SEO Metadata & Layout Setup (`app/layout.tsx`)
```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Top On Group | International Trading & Freight Forwarding Logistics",
  description: "Top On Group is a leading conglomerate in Bangladesh, offering premium general trading (Top On-Tech) and elite freight forwarding (Daily Shipping & Logistics) services. Established leadership with 20,000+ containers handled.",
  keywords: ["Top On Group", "Top On-Tech", "Daily Shipping & Logistics", "Bangladesh Freight Forwarding", "Import Export Bangladesh", "Customs Clearing C&F", "Md. Abdullah Al Mamun", "International Sourcing"],
  metadataBase: new URL("https://www.topongroup.com"),
  openGraph: {
    title: "Top On Group | Trusted Sourcing & Logistics Partner",
    description: "Empowering global trade through dependable trading and compliant logistics. Led by supply chain veteran Md. Abdullah Al Mamun.",
    url: "https://www.topongroup.com",
    siteName: "Top On Group",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Top On Group - Sourcing & Freight Forwarding Logistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-800 antialiased selection:bg-amber-500 selection:text-slate-900">
        {children}
      </body>
    </html>
  );
}
```

#### Component 2: SEO JSON-LD Structured Data Schema (`components/JSONLD.tsx`)
```tsx
export default function JSONLD() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.topongroup.com/#organization",
        "name": "Top On Group",
        "url": "https://www.topongroup.com",
        "logo": "https://www.topongroup.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/topongroup",
          "https://www.linkedin.com/company/topongroup"
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Daily Shipping & Logistics",
        "description": "Premium freight forwarding and trade compliance coordination company in Bangladesh.",
        "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
        "knowsAbout": ["Freight Forwarding", "Customs Clearing", "Ocean Freight", "Trade Compliance"],
        "numberOfEmployees": "50+"
      },
      {
        "@type": "LocalBusiness",
        "name": "Top On-Tech",
        "description": "Diversified import, export and trading house sourcing industrial and commercial products.",
        "parentOrganization": { "@id": "https://www.topongroup.com/#organization" },
        "knowsAbout": ["Sourcing", "International Trade", "Product Distribution", "Machinery Sourcing"]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

#### Component 3: Dynamic Sitemap Generator (`app/sitemap.ts`)
```typescript
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.topongroup.com";

  const staticRoutes = [
    "",
    "/about",
    "/trading-topontech",
    "/logistics-dailyshipping",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
```

#### Component 4: Fully SEO-Ground, Interactive Header Navigation Component (`components/Header.tsx`)
- Write a fully responsive navigation bar including the Top Social Bar and Main Nav Dropdowns. Implement mobile navigation toggle. Must use standard Tailwind CSS styles and hover states (deep navy `#0B2240` backgrounds, golden `#C5A85C` accents on active and hover states).

#### Component 5: High-Converting SEO Home Page Layout (`app/page.tsx`)
- Create the main page layout featuring the Hero Section, Group Overview, Division Tabs (Top On-Tech vs. Daily Shipping & Logistics), Core Values, and the Owner's Leadership Bio with exact credential representation.

Generate the code modules sequentially, prioritizing clean styling, TypeScript typing correctness, accessibility (ARIA attributes), and extreme SEO readability (including keyword-rich heading tags). Keep layout and styling pixel-perfect to a modern, high-trust corporate portal.
```
***

Please generate the code files based on this prompt. Keep code clean and self-contained.
