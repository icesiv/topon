"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Ship,
  FileCheck2,
  Fish,
  CheckCircle2,
  ArrowRight,
  Cpu,
  FlaskConical,
  Scissors,
  Layers,
  Anchor,
  Globe,
  Truck,
  ShieldCheck,
  Scale,
  Waves,
  Sparkles,
  Plane,
} from "lucide-react";

type DivisionId = "tech" | "express" | "shipping" | "agro";

interface DivisionInfo {
  id: DivisionId;
  name: string;
  role: string;
  badge: string;
  logo: string;
  headline: string;
  description: string;
  image: string;
  imageCaption: string;
  imageSubcaption: string;
  icon: typeof Building2;
  pageHref: string;
  quoteHref: string;
  features: {
    title: string;
    desc: string;
    icon: typeof Building2;
  }[];
}

const divisionsData: Record<DivisionId, DivisionInfo> = {
  tech: {
    id: "tech",
    name: "Top On-Tech",
    role: "Import, Export, and Trading Enterprise",
    badge: "Import • Export • Global Sourcing",
    logo: "/images/logo/topon-tech.png",
    headline: "Engineered Sourcing & Heavy Industrial Procurement",
    description:
      "Top On-Tech operates as an international general trading house connecting global manufacturers with Bangladesh's core industrial sectors. We specialize in precision machinery procurement, industrial chemicals, RMG production inputs, and turnkey commercial supply.",
    image: "/images/trading_sourcing.jpg",
    imageCaption: "Dhaka Industrial Sourcing Hub",
    imageSubcaption:
      "Engineers and technical procurement officers verifying OEM machinery specs and chemical grades.",
    icon: Building2,
    pageHref: "/trading-topontech",
    quoteHref: "/#quote",
    features: [
      {
        title: "Industrial Machinery & Spares",
        desc: "Precision CNC machinery, tooling, and heavy manufacturing plant spares.",
        icon: Cpu,
      },
      {
        title: "Industrial Chemical Sourcing",
        desc: "Raw chemical reagents, processing additives, and certified factory supplies.",
        icon: FlaskConical,
      },
      {
        title: "RMG & Textile Inputs",
        desc: "High-grade yarns, synthetic fabrics, trims, and specialized accessories.",
        icon: Scissors,
      },
      {
        title: "B2B OEM Procurement",
        desc: "Direct-from-manufacturer import contracts with authentic factory warranties.",
        icon: Layers,
      },
    ],
  },
  express: {
    id: "express",
    name: "Top Express Limited",
    role: "Customs Clearing and Forwarding (C&F) Company",
    badge: "Licensed C&F • Port Clearance",
    logo: "/images/logo/tel.png",
    headline: "Fast-Track NBR Clearance & Zero-Demurrage Execution",
    description:
      "Top Express Limited is a fully licensed Customs Clearing and Forwarding (C&F) company operating across Chittagong Port, Mongla, Benapole, and Dhaka Airport (HSIA). We safeguard your cargo against demurrage through regulatory mastery, precise HS code classifications, and real-time electronic assessment.",
    image: "/images/customs_cnf.jpg",
    imageCaption: "Chittagong Port On-Ground C&F Officers",
    imageSubcaption:
      "Authorized customs brokers conducting physical inspections and bill-of-entry verification.",
    icon: FileCheck2,
    pageHref: "/express-topexpress",
    quoteHref: "/#quote",
    features: [
      {
        title: "Licensed Port C&F Brokerage",
        desc: "Full operational presence at Chittagong Port, Mongla, Benapole, and Dhaka ICD.",
        icon: ShieldCheck,
      },
      {
        title: "NBR Tariff & HS Code Advisory",
        desc: "Audited customs tariff optimization preventing misdeclaration penalties.",
        icon: Scale,
      },
      {
        title: "Zero-Demurrage Release",
        desc: "Pre-arrival documentation audits ensuring same-day assessment and container gate-out.",
        icon: CheckCircle2,
      },
      {
        title: "Bonded Cargo & Transit",
        desc: "EPZ, bonded warehouse, and project cargo customs documentation and escort.",
        icon: Truck,
      },
    ],
  },
  shipping: {
    id: "shipping",
    name: "Daily Shipping & Logistics",
    role: "Freight Forwarding Company",
    badge: "Ocean • Air • Multimodal Transit",
    logo: "/images/logo/dsl.png",
    headline: "Clockwork Freight Forwarding Across Global Sea & Air Lanes",
    description:
      "Daily Shipping & Logistics is an agile international freight forwarding company leveraging executive mastery over 20,000+ containers handled. We coordinate ocean container carriage (FCL/LCL), priority air charters via Dhaka Cargo Village, and nationwide inland intermodal haulage.",
    image: "/images/hero_port.jpg",
    imageCaption: "Chittagong Maritime Terminal",
    imageSubcaption:
      "Direct vessel container slot coordination linking Bangladesh to Southeast Asia, Europe, and the Americas.",
    icon: Ship,
    pageHref: "/logistics-dailyshipping",
    quoteHref: "/#quote",
    features: [
      {
        title: "Ocean Freight (FCL / LCL)",
        desc: "Direct carrier contract rates and secured container allocations on major trade lines.",
        icon: Anchor,
      },
      {
        title: "HSIA Dhaka Air Cargo",
        desc: "Priority express air cargo slots and chartered services for time-critical consignments.",
        icon: Plane,
      },
      {
        title: "Nationwide Inland Haulage",
        desc: "GPS-monitored trailer fleets connecting coastal seaports to industrial zones across Bangladesh.",
        icon: Truck,
      },
      {
        title: "20,000+ Containers Handled",
        desc: "Decades of executive supply chain governance guaranteeing seamless execution.",
        icon: Globe,
      },
    ],
  },
  agro: {
    id: "agro",
    name: "Top On-Agro Farm",
    role: "Commercial Fisheries, Aquaculture",
    badge: "Commercial Aquaculture • Cold Chain",
    logo: "/images/logo/topon-agro.png",
    headline: "Modern High-Density Fisheries & Nationwide Cold Chain",
    description:
      "Top On-Agro Farm pioneers commercial sustainable aquaculture, scientifically managed broodstock hatcheries, and temperature-controlled cold chain distribution. We supply premium-grade fresh fish directly to metropolitan wholesale markets with uncompromising purity.",
    image: "/images/agro_farm.jpg",
    imageCaption: "Modern Aquaculture & Pond Harvesting",
    imageSubcaption:
      "High-density aerated aquaculture ponds maintaining stringent bio-security and antibiotic-free standards.",
    icon: Fish,
    pageHref: "/agro-toponagro",
    quoteHref: "/#quote",
    features: [
      {
        title: "High-Density Biofloc Aquaculture",
        desc: "Advanced aerated pond systems yielding disease-free, export-grade fish protein.",
        icon: Waves,
      },
      {
        title: "Certified Broodstock Hatcheries",
        desc: "High-vitality fingerlings bred with scientific genetics and optimized feed formulas.",
        icon: ShieldCheck,
      },
      {
        title: "Refrigerated Cold-Chain Fleet",
        desc: "Insulated temperature-controlled trucks preserving dock-fresh quality to Dhaka markets.",
        icon: Truck,
      },
      {
        title: "100% Antibiotic-Free Purity",
        desc: "Clean aquaculture adhering to national fisheries standards and food-safety compliance.",
        icon: CheckCircle2,
      },
    ],
  },
};

export default function DivisionTabs() {
  const [activeTab, setActiveTab] = useState<DivisionId>("tech");
  const current = divisionsData[activeTab];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-slate-100/70 relative overflow-hidden border-y border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Four Operating Pillars</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight">
            Specialized Arms for <span className="text-gold-gradient">Every Trade Dimension</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Top On Group executes global commerce through four specialized corporate divisions—spanning international trading, licensed customs C&F, maritime freight, and sustainable agro-fisheries.
          </p>
        </div>

        {/* 4 Responsive Tab Switcher Buttons with Division Logos */}
        <div className="mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 p-2 rounded-3xl bg-white border border-slate-200 shadow-md">
            {(
              [
                { id: "tech", label: "Top On-Tech", sub: "Import, Export & Trading", logo: "/images/logo/topon-tech.png" },
                { id: "express", label: "Top Express Ltd.", sub: "Customs C&F Company", logo: "/images/logo/tel.png" },
                { id: "shipping", label: "Daily Shipping", sub: "Freight Forwarding", logo: "/images/logo/dsl.png" },
                { id: "agro", label: "Top On-Agro", sub: "Fisheries & Aquaculture", logo: "/images/logo/topon-agro.png" },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-300 ${isActive
                    ? "bg-[#0B2240] text-white shadow-lg shadow-navy/20 scale-[1.02]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0B2240]"
                    }`}
                >
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 p-1.5 transition-all relative overflow-hidden ${isActive
                      ? "bg-white shadow-md ring-2 ring-brand-gold/60"
                      : "bg-slate-100 border border-slate-200"
                      }`}
                  >
                    <Image
                      src={tab.logo}
                      alt={tab.label}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs sm:text-sm font-bold font-serif truncate ${isActive ? "text-brand-goldLight" : "text-slate-900"
                        }`}
                    >
                      {tab.label}
                    </div>
                    <div
                      className={`text-[11px] truncate font-medium ${isActive ? "text-slate-300" : "text-slate-500"
                        }`}
                    >
                      {tab.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Image Banner with Real Perspective */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden  group">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  key={current.logo}
                  src={current.logo}
                  alt={current.name}
                  fill
                  quality={100}
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Details & Capabilities */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240] leading-snug">
                {current.name}:{" "}
                <span className="text-gold-gradient">{current.headline}</span>
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {current.features.map((feat, fIdx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={fIdx}
                      className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-brand-gold/60 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B2240]/10 text-[#0B2240] flex items-center justify-center shrink-0 mt-0.5">
                        <FeatIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                        <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
