import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Ship,
  FileCheck2,
  Fish,
  ArrowRight,
  FileDown,
  CheckCircle2,
  Globe2,
  Award,
  TrendingUp,
  ShieldCheck,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Journey & Story | Top On Group",
  description:
    "The story of Top On Group: from executive corporate supply chain leadership to an integrated multi-sector conglomerate across trading, C&F, freight forwarding, and commercial aquaculture.",
};

const pillars = [
  {
    name: "Top On-Tech",
    year: "Est. Jan 2024",
    role: "Import, Export, and Trading Enterprise",
    image: "/images/trading_sourcing.jpg",
    desc: "Launched to eliminate procurement friction for Bangladeshi manufacturing plants. Top On-Tech imports precision industrial machinery, specialty chemicals, and raw production inputs directly from verified overseas manufacturers.",
    icon: Building2,
    href: "/trading-topontech",
    stats: "OEM Certified • Direct Sourcing",
  },
  {
    name: "Top Express Limited",
    year: "Est. 2024",
    role: "Customs Clearing and Forwarding (C&F) Company",
    image: "/images/customs_cnf.jpg",
    desc: "Licensed customs brokerage dedicated to frictionless port clearance. Stationed at Chittagong Port, Mongla, and Dhaka ICD to guarantee error-free tariff assessment, rapid bill-of-entry filing, and zero demurrage.",
    icon: FileCheck2,
    href: "/express-topexpress",
    stats: "Licensed C&F • Zero Demurrage",
  },
  {
    name: "Daily Shipping & Logistics",
    year: "Est. Sep 2025",
    role: "Freight Forwarding Company",
    image: "/images/hero_port.jpg",
    desc: "An agile, tech-driven multimodal freight forwarder coordinating containerized ocean shipping (FCL/LCL), priority air charters via Dhaka Airport, and nationwide inland road haulage.",
    icon: Ship,
    href: "/logistics-dailyshipping",
    stats: "20,000+ Containers Managed",
  },
  {
    name: "Top On-Agro Farm",
    year: "Est. 2025",
    role: "Commercial Fisheries, Aquaculture",
    image: "/images/agro_farm.jpg",
    desc: "Commercial sustainable aquaculture leveraging aerated biofloc pond engineering, certified disease-free broodstock hatcheries, and temperature-controlled cold-chain logistics to supply wholesome fish protein nationwide.",
    icon: Fish,
    href: "/agro-toponagro",
    stats: "Scientific Hatchery • Cold Chain",
  },
];

export default function JourneyStoryPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Header Hero */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Heritage &amp; Evolution</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Our Journey &amp; <span className="text-gold-light-gradient">Corporate Story</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            How seasoned executive leadership and unwavering operational discipline shaped one of Bangladesh&apos;s most dynamic trading, logistics, and agro-fisheries conglomerates.
          </p>
        </div>
      </section>

      {/* 2. The Genesis & Founding Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[#0B2240] text-xs font-bold uppercase tracking-wider">
              <span>The Genesis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0B2240] leading-snug">
              Born from Two Decades of <span className="text-gold-gradient">Enterprise Mastery</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Top On Group was not conceived overnight. It was forged through more than 15 years of executive-tier supply chain governance by founder <strong>Md. Abdullah Al Mamun (CSCM, ITP, CACC)</strong>, who previously served as Executive Director at Walton Group, managing multi-million-dollar import/export operations and over 20,000+ shipping containers.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Observing the chronic pain points facing Bangladeshi industrialists—unpredictable lead times, opaque customs duties, demurrage penalties, and fragmented freight forwarders—Mr. Mamun set out to build an integrated conglomerate built around one core promise: <strong>On Time. Every Time.</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="/topon-profile.pdf"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Corporate Profile</span>
              </a>
              <Link
                href="/about/message"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-800 hover:border-brand-gold hover:text-brand-navy font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Read Founder&apos;s Message</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
            <div className="relative h-80 sm:h-[420px] w-full">
              <Image
                src="/images/boardroom_team.jpg"
                alt="Top On Group executive boardroom strategy in Dhaka"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#040C18]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Dhaka Corporate Headquarters
                </span>
                <p className="text-xs text-slate-200">
                  Strategic governance, trade finance, and supply chain operations meeting in Dhaka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Four Pillars of Our Growth */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <TrendingUp className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Strategic Enterprise Footprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B2240]">
            The Four Pillars of <span className="text-gold-gradient">Top On Group</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Each operating company was strategically established to solve a critical link in Bangladesh&apos;s commercial infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-gold transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/40 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-bold">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.year}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block">
                      {p.role}
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-white">{p.name}</h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0B2240] flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-goldDark" />
                      <span>{p.stats}</span>
                    </span>

                    <Link
                      href={p.href}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-brand-navy hover:text-brand-goldDark transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Strategic Strengths & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider bg-brand-gold/15 border border-brand-gold/40 px-3.5 py-1 rounded-full">
              Our Future Horizon
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Shaping the Next Decade of Trade &amp; Sustainable Production
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We continue to invest in proprietary logistics automation, cold chain infrastructure, and direct international vendor networks to ensure that our clients maintain an enduring competitive advantage in an ever-evolving global market.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-brand-goldLight transition-colors"
              >
                Connect With Leadership
              </Link>
              <Link
                href="/about/milestones"
                className="px-6 py-3 rounded-xl border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                View Key Milestones
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
