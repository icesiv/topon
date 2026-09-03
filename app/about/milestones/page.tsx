import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  ShieldCheck,
  Building2,
  Ship,
  Fish,
  FileCheck2,
  Calendar,
  CheckCircle2,
  Scale,
  Plane,
  FileDown,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Milestones & Accreditations | Top On Group",
  description:
    "Explore the corporate milestones, regulatory accreditations, and official trade certifications of Top On Group across NBR customs clearance, freight forwarding, and commercial aquaculture in Bangladesh.",
};

const accreditations = [
  {
    title: "NBR Licensed Customs Clearing & Forwarding (C&F)",
    authority: "National Board of Revenue (NBR), Bangladesh",
    desc: "Authorized customs brokerage license for handling sea, air, and dry port import/export consignments with real-time electronic assessment and duty settlement.",
    icon: FileCheck2,
    badge: "Official NBR License",
  },
  {
    title: "Chittagong & Mongla Port Operational Approvals",
    authority: "Chittagong Port Authority (CPA) & Mongla Port",
    desc: "Direct operational desks and bonded access for vessel discharge, container yard clearance, and heavy machinery offloading.",
    icon: Ship,
    badge: "Port Authority Approved",
  },
  {
    title: "Multimodal Freight Forwarding & BAFFA Alignment",
    authority: "Bangladesh Freight Forwarders Association Alignment",
    desc: "Global shipping slot allocations, container leasing agreements, and priority air cargo terminal handling at HSIA Dhaka.",
    icon: Plane,
    badge: "Multimodal Transit",
  },
  {
    title: "CSCM (Certified Supply Chain Manager - USA)",
    authority: "International Supply Chain Education Alliance (ISCEA)",
    desc: "Executive supply chain certification held by leadership, guaranteeing global best practices in inventory, transit, and cold-chain risk management.",
    icon: Award,
    badge: "Global Standard",
  },
  {
    title: "ITP (Income Tax Practitioner) & NBR Advisory",
    authority: "Recognized by National Board of Revenue",
    desc: "In-house taxation and customs tariff advisory ensuring complete compliance with the Customs Act, VAT legislation, and tariff schedules.",
    icon: Scale,
    badge: "Tax & Tariff Advisory",
  },
  {
    title: "Department of Fisheries (DoF) Commercial Approval",
    authority: "Ministry of Fisheries and Livestock, Bangladesh",
    desc: "Strict adherence to scientific bio-security, sustainable aquaculture practices, antibiotic-free standards, and food-safety traceability.",
    icon: Fish,
    badge: "Fisheries Compliance",
  },
];

const milestones = [
  {
    step: "01",
    year: "2010 – 2023",
    phase: "Executive Leadership",
    title: "Corporate Supply Chain Leadership & Foundation",
    description:
      "Founder Md. Abdullah Al Mamun (CSCM, ITP, CACC) directed premier corporate supply chains, serving at executive tiers including Executive Director at Walton Group, stewarding multi-million-dollar import/export operations and 20,000+ containers.",
    metric: "20,000+ Containers Handled",
    icon: Award,
  },
  {
    step: "02",
    year: "2024",
    phase: "Trading Enterprise",
    title: "Establishment of Top On-Tech",
    description:
      "Launched as a specialized cross-border trading enterprise focusing on direct procurement of industrial machinery, precision plant spares, and specialty chemical sourcing for Bangladesh's core manufacturing hubs.",
    metric: "Global Machinery & Chemicals",
    icon: Building2,
  },
  {
    step: "03",
    year: "2024 – 2025",
    phase: "Logistics & Customs",
    title: "Top Express Ltd. & Daily Shipping & Logistics",
    description:
      "Incorporated licensed Customs Clearing and Forwarding (C&F) with Top Express Limited across Chittagong Port and Dhaka ICD, coupled with Daily Shipping & Logistics for international ocean and air freight carriage.",
    metric: "Licensed Port C&F & Shipping",
    icon: FileCheck2,
  },
  {
    step: "04",
    year: "2025",
    phase: "Agro-Fisheries",
    title: "Founding of Top On-Agro Farm",
    description:
      "Diversified into commercial aquaculture with high-density aerated fish farming, certified broodstock hatcheries, and temperature-controlled cold chain logistics supplying metropolitan wholesale fish markets.",
    metric: "Scientific Aquaculture & Cold Chain",
    icon: Fish,
  },
  {
    step: "05",
    year: "Present & Horizon",
    phase: "Conglomerate Synergy",
    title: "Integrated Conglomerate Expansion",
    description:
      "Unifying international trade, port customs clearance, ocean shipping, and commercial agro-fisheries under the Top On Group central governance framework with a relentless commitment to reliability: On Time. Every Time.",
    metric: "On Time. Every Time.",
    icon: Globe2,
  },
];

export default function MilestonesAccreditationsPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Header Hero */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Track Record &amp; Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Milestones &amp; <span className="text-gold-light-gradient">Accreditations</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            Demonstrating our institutional standing, regulatory licenses, and the steady historical milestones that define Top On Group&apos;s growth across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. Visual Photography Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
            <Image
              src="/images/customs_cnf.jpg"
              alt="Licensed customs clearing at Chittagong Port"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/40 to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Chittagong Port C&amp;F
                </span>
                <p className="text-xs text-white font-medium">Licensed on-ground physical inspection &amp; audit.</p>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
            <Image
              src="/images/air_cargo.jpg"
              alt="Air Cargo handling at Dhaka Airport HSIA"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/40 to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  HSIA Cargo Village
                </span>
                <p className="text-xs text-white font-medium">Expedited Dhaka airport clearance &amp; air charters.</p>
              </div>
            </div>
          </div>

          <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-xl group">
            <Image
              src="/images/hero_port.jpg"
              alt="Ocean freight vessel operations"
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/40 to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Maritime Container Terminal
                </span>
                <p className="text-xs text-white font-medium">Over 20,000+ ocean container slots coordinated.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Accreditations & Licenses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Institutional Governance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B2240]">
            Regulatory Licenses &amp; <span className="text-gold-gradient">Accreditations</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            Top On Group operates under full statutory accreditation, ensuring total fiduciary and legal protection for every client.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accreditations.map((acc, idx) => {
            const Icon = acc.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-2xl hover:border-brand-gold transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-gold/15 text-brand-goldDark border border-brand-gold/30">
                      {acc.badge}
                    </span>
                    <Icon className="w-5 h-5 text-brand-navy group-hover:text-brand-goldDark transition-colors" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#0B2240] leading-snug">
                    {acc.title}
                  </h3>

                  <div className="text-xs font-semibold text-brand-goldDark">
                    {acc.authority}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {acc.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-[#0B2240]">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Verified Statutory Compliance</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Chronological Milestones Timeline */}
      <section id="milestones" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Corporate Roadmap &amp; Growth Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight">
            Key Corporate <span className="text-gold-gradient">Milestones</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            From seasoned corporate supply chain leadership to an integrated multi-sector conglomerate: a chronological journey of disciplined expansion across Bangladesh.
          </p>
        </div>

        {/* Alternating Executive Timeline */}
        <div className="relative z-10">
          {/* Central Connecting Spine Line (Desktop) */}
          <div className="hidden md:block absolute top-6 bottom-6 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-gold via-slate-300 to-brand-gold/40" />

          {/* Left Connecting Line (Mobile) */}
          <div className="md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-gradient-to-b from-brand-gold via-slate-300 to-brand-gold/40" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Left Side (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven
                        ? "md:pr-12 md:text-right"
                        : "md:order-2 md:pl-12 md:text-left"
                    }`}
                  >
                    <div className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 hover:border-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left">
                      {/* Top Accent Gold Bar */}
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-goldLight via-brand-gold to-[#0B2240]" />

                      {/* Header in Card */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-goldDark text-xs font-bold uppercase tracking-wider">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{m.phase}</span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          Phase {m.step}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B2240] group-hover:text-brand-goldDark transition-colors leading-snug">
                        {m.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {m.description}
                      </p>

                      {/* Bottom Metric Tag */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-[#0B2240]">
                        <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                        <span>{m.metric}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Medallion) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0B2240] border-4 border-white shadow-xl flex items-center justify-center text-brand-gold ring-4 ring-brand-gold/25 group-hover:scale-110 transition-transform">
                      <span className="font-mono font-bold text-xs">{m.step}</span>
                    </div>
                  </div>

                  {/* Opposing Side (Desktop: Large Year & Key Highlight) */}
                  <div
                    className={`hidden md:flex md:w-1/2 flex-col justify-center ${
                      isEven
                        ? "md:pl-12 md:text-left"
                        : "md:order-1 md:pr-12 md:text-right"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-brand-goldDark" />
                        <span>{m.year}</span>
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold font-serif text-[#0B2240] mt-1">
                        {m.year}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-goldDark">
                        {m.phase}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-xl space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Partner with Certified Logistics &amp; Trade Leaders
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            Experience corporate supply chain solutions engineered for dependability and speed.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-brand-goldLight transition-colors"
            >
              Get in Touch
            </Link>
            <a
              href="/topon-profile.pdf"
              download
              className="px-6 py-3 rounded-xl border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Profile</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
