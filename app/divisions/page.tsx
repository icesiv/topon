import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Ship,
  Truck,
  Fish,
  Briefcase,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Operating Divisions | Top On Group",
  description:
    "Explore the 5 core operating divisions of Top On Group: Top On-Tech (Trading & Sourcing), Top Express Limited (Customs C&F), Daily Shipping & Logistics (Freight Forwarding), Top On-Agro Farm (Fisheries & Aquaculture), and Top On-Solution (Corporate Consultancy).",
};

const DIVISIONS = [
  {
    id: "tech",
    name: "Top On-Tech",
    role: "Import, Export & General Trading",
    badge: "Industrial Sourcing • B2B Procurement",
    desc: "Connecting international manufacturers with Bangladesh's core industries. Specializing in heavy machinery procurement, industrial chemicals, RMG production inputs, and turnkey commercial supply.",
    image: "/images/topontech_hero.jpg",
    logo: "/images/logo/topon-tech.png",
    href: "/divisions/trading-topontech",
    icon: Building2,
    highlights: [
      "Heavy Industrial Machinery & Spares",
      "Chemical Reagents & Raw Processing Additives",
      "RMG Yarns, Fabrics & Garment Accessories",
      "Direct OEM Import Contracts & B2B Supply",
    ],
  },
  {
    id: "express",
    name: "Top Express Limited",
    role: "Customs Clearing & Forwarding (C&F)",
    badge: "Licensed C&F • Port Operations",
    desc: "A fully licensed customs brokerage operating across Chittagong Port, Mongla, Benapole land port, and Dhaka Airport (HSIA). Built on 30+ years of trade heritage ensuring zero-demurrage cargo release.",
    image: "/images/topexpress_hero.jpg",
    logo: "/images/logo/tel.png",
    href: "/divisions/express-topexpress",
    icon: Truck,
    highlights: [
      "Authorized Customs Brokerage at All Key Ports",
      "NBR Tariff Classification & HS Code Advisory",
      "Pre-Arrival Audit & Rapid Bill-of-Entry Assessment",
      "Bonded Warehouse Transit & Project Cargo Clearance",
    ],
  },
  {
    id: "shipping",
    name: "Daily Shipping & Logistics",
    role: "International Freight Forwarding",
    badge: "Ocean Freight • Air Cargo • Intermodal",
    desc: "An agile, tech-driven multimodal freight forwarder coordinating containerized ocean shipping (FCL/LCL), priority air charters via Dhaka Cargo Village, and nationwide inland road haulage.",
    image: "/images/dailyshipping_hero.jpg",
    logo: "/images/logo/dsl.png",
    href: "/divisions/logistics-dailyshipping",
    icon: Ship,
    highlights: [
      "Global Ocean Container Shipping (FCL & LCL)",
      "Priority HSIA Dhaka Air Cargo Charters",
      "Nationwide GPS-Monitored Container Haulage",
      "20,000+ Containers Managed with Zero Loss",
    ],
  },
  {
    id: "agro",
    name: "Top On-Agro Farm",
    role: "Commercial Fisheries & Aquaculture",
    badge: "Biofloc Aquaculture • Cold Chain",
    desc: "Pioneering commercial sustainable aquaculture, scientifically engineered biofloc aeration ponds, certified pathogen-free broodstock hatcheries, and temperature-controlled nationwide distribution.",
    image: "/images/toponagro_hero.jpg",
    logo: "/images/logo/topon-agro.png",
    href: "/divisions/agro-toponagro",
    icon: Fish,
    highlights: [
      "High-Density Aerated Biofloc Pond Systems",
      "Scientific Broodstock & Disease-Free Fingerlings",
      "Refrigerated Cold-Chain Fleet to Metro Markets",
      "100% Antibiotic-Free Certified Protein Purity",
    ],
  },
  {
    id: "solution",
    name: "Top On-Solution",
    role: "Corporate Consultancy & Business Advisory",
    badge: "Company Formation • Tax & VAT • Compliance",
    desc: "Comprehensive business support guiding startups, growing enterprises, and multinational investors through company formation, RJSC filing, NBR tax and VAT compliance, trade licensing, and corporate audit.",
    image: "/images/toponsolution_wide.jpg",
    logo: "/images/logo/topon-solution.png",
    href: "/divisions/consultancy-toponsolution",
    icon: Briefcase,
    highlights: [
      "RJSC Incorporation, BIDA & Trade Licensing",
      "Taxation Strategy, Income Tax & Monthly VAT Compliance",
      "Customs Regulatory & Trade Policy Advisory",
      "Internal Audit & Corporate Legal Governance",
    ],
  },
];

export default function DivisionsOverviewPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900 select-none">
      {/* 1. Header Hero */}
      <section className="relative py-20 lg:py-24 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider shadow-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diversified Industry Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Our Operating <span className="text-gold-light-gradient">Divisions</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            Top On Group operates 5 specialized operating divisions spanning international trading, customs clearance, freight forwarding, commercial agro, and corporate consultancy.
          </p>
        </div>
      </section>

      {/* 2. Divisions Showcase List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-10">
          {DIVISIONS.map((div, idx) => {
            const Icon = div.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={div.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group"
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-5 relative h-72 lg:h-auto min-h-[300px] overflow-hidden ${
                    isEven ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={div.image}
                    alt={div.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    quality={80}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040C18]/80 via-transparent to-transparent lg:hidden" />

                  {/* Logo overlay badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-md flex items-center space-x-2">
                    <div className="relative w-6 h-6">
                      <Image
                        src={div.logo}
                        alt={`${div.name} logo`}
                        fill
                        className="object-contain"
                        quality={100}
                      />
                    </div>
                    <span className="text-xs font-bold text-brand-navy">{div.name}</span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold text-brand-goldDark bg-brand-gold/15 px-3 py-1 rounded-full uppercase tracking-wider">
                        {div.badge}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2.5">
                        <div className="p-2 rounded-xl bg-brand-navy text-brand-gold">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold font-serif text-brand-navy">
                          {div.name}
                        </h2>
                      </div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider pl-12">
                        {div.role}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {div.desc}
                    </p>

                    {/* Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {div.highlights.map((h, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={div.href}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white font-bold text-xs shadow-md border border-brand-gold/30 hover:border-brand-gold transition-all"
                    >
                      <span>Explore {div.name} Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>

                    <Link
                      href="/contact"
                      className="text-xs font-semibold text-slate-600 hover:text-brand-navy transition-colors flex items-center space-x-1"
                    >
                      <span>Request Quote / Inquiry</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Cross-Division Synergy Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2240] via-[#071930] to-[#040D1A] rounded-3xl p-8 sm:p-12 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider font-mono">
              Unified Enterprise Solutions
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Need Multi-Division Coordination?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Top On Group synchronizes international sourcing, customs clearing, air/sea freight forwarding, and corporate tax compliance under one single window.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold transition-all duration-200 flex items-center space-x-2 flex-shrink-0"
          >
            <span>Consult Our Commercial Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
