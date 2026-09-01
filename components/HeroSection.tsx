"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileDown,
  Sparkles,
  Building2,
  Ship,
  Truck,
  Fish,
  ChevronRight,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

interface HeroSectionProps {
  tagline?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: React.ReactNode;
}

const subsidiaries = [
  {
    name: "Top On-Tech",
    category: "General Trading & Global Sourcing",
    tagline: "Industrial Machinery, Chemicals & RMG Raw Materials",
    href: "/trading-topontech",
    image: "/images/trading_sourcing.jpg",
    icon: Building2,
    badge: "Est. 2024",
    accent: "border-blue-500/30 text-blue-700",
  },
  {
    name: "Top Express Limited",
    category: "Express Transit & Fleet Logistics",
    tagline: "Same-Day Courier, B2B Linehaul Fleet & Nationwide Fleet",
    href: "/express-topexpress",
    image: "/images/air_cargo.jpg",
    icon: Truck,
    badge: "Rapid Fleet",
    accent: "border-emerald-500/30 text-emerald-700",
  },
  {
    name: "Daily Shipping & Logistics",
    category: "Maritime Freight & C&F Operations",
    tagline: "Ocean FCL/LCL, Chittagong Port Clearance & Customs",
    href: "/logistics-dailyshipping",
    image: "/images/hero_port.jpg",
    icon: Ship,
    badge: "20k+ Containers",
    accent: "border-sky-500/30 text-sky-700",
  },
  {
    name: "Top On-Agro Farm",
    category: "Commercial Aquaculture & Fisheries",
    tagline: "Sustainable Commercial Fish Farming, Hatcheries & Cold Chain Supply",
    href: "/agro-toponagro",
    image: "/images/agro_farm.jpg",
    icon: Fish,
    badge: "Fisheries & Hatchery",
    accent: "border-cyan-500/30 text-cyan-700",
  },
];

export default function HeroSection({
  tagline = "On Time. Every Time.",
  titlePrefix = "Connecting Products, Markets, &",
  titleHighlight = "Global Opportunities",
  description,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex items-center justify-center bg-gradient-to-b from-slate-50 via-slate-100/60 to-white py-12 lg:py-16 overflow-hidden border-b border-slate-200">
      {/* Animated Interactive Particle Canvas */}
      <ParticleCanvas />

      {/* Decorative Light Radial Gradients & Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[32rem] h-[32rem] bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.12] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">

          {/* LEFT COLUMN: Dark Logo Focus, Text Logo, Headlines, Tagline & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-serif tracking-tight text-[#0B2240] leading-[1.15]">
              {titlePrefix}{" "}
              <span className="text-gold-gradient block mt-1">
                {titleHighlight}
              </span>
            </h1>

            {/* Group Summary Description */}
            <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
              {description || (
                <>
                  Top On Group is Bangladesh&apos;s premier multi-sector conglomerate steering four specialized business divisions: international sourcing (<strong className="text-[#0B2240]">Top On-Tech</strong>), express courier &amp; linehaul logistics (<strong className="text-[#0B2240]">Top Express Limited</strong>), licensed port &amp; ocean freight (<strong className="text-[#0B2240]">Daily Shipping &amp; Logistics</strong>), and commercial aquaculture &amp; fisheries (<strong className="text-[#0B2240]">Top On-Agro Farm</strong>).
                </>
              )}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/services"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold flex items-center space-x-2 group hover:-translate-y-0.5"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact#quote"
                className="px-6 sm:px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B2240] border border-slate-300 text-xs font-bold uppercase tracking-wider transition-all shadow-xs hover:border-brand-gold hover:-translate-y-0.5"
              >
                Request RFQ
              </Link>

              <a
                href="/toponprofile.pdf"
                download
                className="px-4 sm:px-5 py-3.5 rounded-xl border border-slate-300 bg-white/70 hover:bg-white text-slate-700 hover:text-brand-navy hover:border-brand-gold text-xs font-semibold transition-all flex items-center space-x-2 shadow-xs"
              >
                <FileDown className="w-4 h-4 text-brand-goldDark" />
                <span>Profile PDF</span>
              </a>
            </div>


          </div>

          {/* RIGHT COLUMN: 4 Company Image Buttons Showcase */}
          <div className="lg:col-span-6 space-y-4">

            {/* Enterprise Division Showcase Container */}
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-xl shadow-slate-900/5 p-5 sm:p-6">

              {/* Header Label inside Right Panel */}
              <div className="flex items-center justify-center pb-3.5 border-b border-slate-100">
                <div className="flex items-center justify-center">
                  <Image
                    src="/logo-text.png"
                    alt="Top On Logo"
                    width={300}
                    height={80}
                    className="object-contain mx-auto"
                  />
                </div>
              </div>

              {/* 4 Interactive Company Buttons with Full Thumbnails */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3.5">
                {subsidiaries.map((company, idx) => {
                  const Icon = company.icon;
                  return (
                    <Link
                      key={idx}
                      href={company.href}
                      className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 hover:border-brand-gold hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-36 sm:h-40 w-full"
                    >
                      {/* Company Image Banner */}
                      <Image
                        src={company.image}
                        alt={company.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 300px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240] via-[#0B2240]/40 to-black/20" />

                      {/* Top Badges / Icon */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-[#0B2240] flex items-center justify-center shadow-md group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Prominent Title & Action at Bottom */}
                      <div className="absolute bottom-0 inset-x-0 p-3 sm:p-3.5 bg-gradient-to-t from-[#0B2240] via-[#0B2240]/80 to-transparent">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-white tracking-wide drop-shadow-md group-hover:text-brand-goldLight transition-colors">
                            {company.name}
                          </h3>
                          <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-brand-gold text-brand-gold group-hover:text-brand-navy flex items-center justify-center transition-all duration-300 shrink-0 ml-2">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
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
