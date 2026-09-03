"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Building2,
  Ship,
  Truck,
  Fish,
  FileCheck2,
  ExternalLink,
} from "lucide-react";

interface BusinessPanel {
  id: string;
  number: string;
  name: string;
  category: string;
  tagline: string;
  fullTagline: string;
  href: string;
  image: string;
  icon: typeof Building2;
  badge: string;
  highlights: string[];
}

const businesses: BusinessPanel[] = [
  {
    id: "topontech",
    number: "01",
    name: "Top On-Tech",
    category: "General Trading & Global Sourcing",
    tagline: "Industrial Machinery, Chemical Sourcing & Precision Spares",
    fullTagline:
      "Direct factory procurement of high-precision CNC machinery, industrial chemicals, and production inputs with OEM warranties for Bangladesh's core industries.",
    href: "/trading-topontech",
    image: "/images/trading_sourcing.jpg",
    icon: Building2,
    badge: "General Trading",
    highlights: ["OEM Machinery", "Industrial Chemicals", "Turnkey Sourcing"],
  },
  {
    id: "topexpress",
    number: "02",
    name: "Top Express Limited",
    category: "Customs Clearing & Forwarding (C&F)",
    tagline: "Licensed C&F Brokerage, Port Clearance & NBR Tariff Advisory",
    fullTagline:
      "Licensed customs brokerage delivering precision documentation, tariff classification, and zero-demurrage container release across Chittagong Port and Dhaka ICD.",
    href: "/express-topexpress",
    image: "/images/customs_cnf.jpg",
    icon: FileCheck2,
    badge: "Licensed C&F",
    highlights: ["Chittagong Port C&F", "HS Code Advisory", "Zero Demurrage"],
  },
  {
    id: "dailyshipping",
    number: "03",
    name: "Daily Shipping & Logistics",
    category: "International Freight Forwarding",
    tagline: "Ocean FCL/LCL, Expedited Air Cargo & Multimodal Logistics",
    fullTagline:
      "Comprehensive international cargo shipping linking Bangladesh to worldwide trade lanes via global container lines and priority air freight charters.",
    href: "/logistics-dailyshipping",
    image: "/images/hero_port.jpg",
    icon: Ship,
    badge: "20k+ Containers",
    highlights: ["Ocean FCL / LCL", "HSIA Air Cargo", "Global Feeder Links"],
  },
  {
    id: "toponagro",
    number: "04",
    name: "Top On-Agro Farm",
    category: "Commercial Fisheries & Aquaculture",
    tagline: "Sustainable Fish Farming, Hatcheries & Nationwide Cold Chain",
    fullTagline:
      "High-density aerated biofloc pond farming, certified pathogen-free fingerling hatcheries, and refrigerated cold-chain distribution to metropolitan wholesale markets.",
    href: "/agro-toponagro",
    image: "/images/agro_farm.jpg",
    icon: Fish,
    badge: "Fisheries & Hatchery",
    highlights: ["Biofloc Aquaculture", "Certified Hatchery", "Cold Chain Supply"],
  },
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section
      className="relative w-full h-[calc(100vh-6rem)] min-h-[640px] max-h-[960px] bg-[#040C18] overflow-hidden select-none"
      aria-label="Top On Group Business Divisions Hero"
    >

      {/* 4 Interactive Expanding Vertical Panels */}
      <div className="w-full h-full flex flex-col lg:flex-row">
        {businesses.map((biz, idx) => {
          const Icon = biz.icon;
          const isExpanded = activeIdx === idx;
          const isAnyExpanded = activeIdx !== null;

          return (
            <Link
              key={biz.id}
              href={biz.href}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onFocus={() => setActiveIdx(idx)}
              onBlur={() => setActiveIdx(null)}
              onTouchStart={() => setActiveIdx(idx)}
              className={`group relative flex flex-col justify-between overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-r border-white/15 last:border-b-0 last:border-r-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded
                ? "flex-[2.8] lg:flex-[3.2] shadow-2xl z-20"
                : isAnyExpanded
                  ? "flex-[0.7] lg:flex-[0.7] opacity-80"
                  : "flex-1 opacity-100"
                }`}
              style={{ willChange: "flex-grow, flex-basis" }}
            >
              {/* Background Thumbnail Image with Smooth Ken Burns Zoom & Hover Highlight */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={biz.image}
                  alt={biz.name}
                  fill
                  priority={idx < 2}
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isExpanded
                      ? "scale-105 brightness-110 contrast-105 saturate-115"
                      : isAnyExpanded
                      ? "scale-100 brightness-[0.5] contrast-90 saturate-75"
                      : "scale-100 brightness-[0.8] contrast-100 group-hover:brightness-105"
                  }`}
                />

                {/* Dynamic Gradient Overlay: Clear & highlighted on active, dimmed on inactive */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isExpanded
                      ? "bg-gradient-to-t from-[#040C18] via-[#040C18]/45 to-transparent opacity-95"
                      : isAnyExpanded
                      ? "bg-[#040C18]/65"
                      : "bg-gradient-to-t from-[#040C18] via-[#040C18]/60 to-black/35 opacity-85"
                  }`}
                />

                {/* Golden Inset Glow Highlight on Active */}
                <div
                  className={`absolute inset-0 border-2 transition-all duration-500 pointer-events-none ${
                    isExpanded
                      ? "border-brand-gold/60 shadow-[inset_0_0_50px_rgba(197,168,92,0.15)]"
                      : "border-transparent"
                  }`}
                />
              </div>

              {/* Bottom Content: Name, Tagline & Click to Open */}
              <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-3 mt-auto">
                {/* Business Name */}
                <h2
                  className={`font-serif font-bold tracking-tight text-white transition-all duration-300 leading-tight ${
                    isExpanded
                      ? "text-2xl sm:text-3xl lg:text-4xl text-brand-goldLight drop-shadow-lg"
                      : "text-xl sm:text-2xl lg:text-2xl xl:text-3xl group-hover:text-brand-goldLight"
                  }`}
                >
                  {biz.name}
                </h2>

                {/* Short Tagline */}
                <p
                  className={`text-slate-200 transition-all duration-500 font-sans leading-relaxed ${
                    isExpanded
                      ? "text-xs sm:text-sm lg:text-base opacity-100 max-h-28"
                      : "text-xs sm:text-sm opacity-90 line-clamp-2 max-h-12"
                  }`}
                >
                  {isExpanded ? biz.fullTagline : biz.tagline}
                </p>

                {/* Expanded Highlights Chips (Revealed on hover) */}
                <div
                  className={`hidden sm:flex flex-wrap items-center gap-2 pt-1 transition-all duration-500 ${
                    isExpanded
                      ? "opacity-100 max-h-16 translate-y-0"
                      : "opacity-0 max-h-0 pointer-events-none translate-y-2 overflow-hidden"
                  }`}
                >
                  {biz.highlights.map((h, hIdx) => (
                    <span
                      key={hIdx}
                      className="inline-flex items-center text-[10px] font-medium px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-slate-200 backdrop-blur-sm"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>

                {/* Click to Open Prompt Placed at Bottom */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-gold group-hover:text-brand-goldLight transition-colors">
                    <span className="tracking-wide">Click to Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-200">
                    {biz.number}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
