import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import JSONLD from "@/components/JSONLD";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0B2240",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Top On Group | International Trading & Freight Forwarding Logistics",
    template: "%s | Top On Group",
  },
  description:
    "Top On Group is a leading international conglomerate in Bangladesh, delivering excellence in general trading (Top On-Tech) and elite freight forwarding (Daily Shipping & Logistics). Led by seasoned supply chain veterans with 20,000+ containers managed.",
  keywords: [
    "Top On Group",
    "Top On-Tech",
    "Daily Shipping & Logistics",
    "Bangladesh Freight Forwarding",
    "Import Export Bangladesh",
    "Customs Clearing C&F",
    "Md. Abdullah Al Mamun",
    "International Sourcing",
    "Ocean Freight FCL LCL",
    "Industrial Spares & Chemicals",
  ],
  metadataBase: new URL("https://www.topongroup.com"),
  authors: [{ name: "Top On Group Corporate Affairs" }],
  creator: "Top On Group",
  publisher: "Top On Group",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Top On Group | Trusted Sourcing & Logistics Partner",
    description:
      "Empowering global trade through dependable general trading and compliant freight forwarding. Led by supply chain veteran Md. Abdullah Al Mamun.",
    url: "https://www.topongroup.com",
    siteName: "Top On Group",
    images: [
      {
        url: "/images/hero_port.jpg",
        width: 1200,
        height: 675,
        alt: "Top On Group - Global Trading & Logistics at Chittagong Port",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top On Group | International Trading & Logistics",
    description:
      "On Time. Every Time. Premier import/export and multimodal logistics conglomerate in Bangladesh.",
    images: ["/images/hero_port.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-gold selection:text-brand-navy flex flex-col justify-between">
        <JSONLD />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

