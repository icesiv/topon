import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Compass,
  Award,
  Briefcase,
  Building2,
  Ship,
  Truck,
  Fish,
  Globe2,
  FileCheck2,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  History,
  Cpu,
  Layers,
  HeartHandshake,
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";

export const metadata: Metadata = {
  title: "Top On Group | BUILT ON TRUST",
  description:
    "Customs Clearing and Forwarding, Freight Forwarding, Import, Trade, Consultancy & Supply",
  keywords: [
    "About Top On Group",
    "Top On Group Bangladesh",
    "Shahabuddin Enterprise 1990",
    "Top Express Limited",
    "Daily Shipping and Logistics",
    "Top On-Tech",
    "Top On-Agro Farm",
    "Md. Abdullah Al Mamun",
  ],
};

const FOUR_BUSINESSES = [
  {
    name: "Top Express Limited",
    role: "Customs Clearing and Forwarding (C&F) Agency",
    desc: "Licensed customs brokerage delivering precision documentation, tariff classification, and zero-demurrage container release across Chittagong Port and Dhaka ICD.",
    icon: FileCheck2,
    logo: "/images/logo/tel.png",
    href: "/divisions/express-topexpress",
    heritage: "Evolved from Shahabuddin Enterprise (Est. 1990)",
  },
  {
    name: "Daily Shipping & Logistics",
    role: "Freight Forwarding Agency & Logistics",
    desc: "International freight forwarding, multi-carrier ocean container bookings (FCL/LCL), priority air cargo charters, and integrated multimodal transport.",
    icon: Ship,
    logo: "/images/logo/dsl.png",
    href: "/divisions/logistics-dailyshipping",
    heritage: "Global Trade Lane Connectivity",
  },
  {
    name: "Top On-Tech",
    role: "Import, Export, Trading & Supply",
    desc: "Multi-sector import, export, and trading enterprise connecting global suppliers with diverse markets through reliable B2B sourcing and delivery coordination.",
    icon: Building2,
    logo: "/images/logo/topon-tech.png",
    href: "/divisions/trading-topontech",
    heritage: "Cross-Border Industrial Sourcing",
  },
  {
    name: "Top On-Agro Farm",
    role: "Agriculture & Fisheries",
    desc: "Sustainable aquaculture, high-density biofloc pond farming, certified pathogen-free hatcheries, and temperature-controlled nationwide cold chain distribution.",
    icon: Fish,
    logo: "/images/logo/topon-agro.png",
    href: "/divisions/agro-toponagro",
    heritage: "Sustainable Food Security",
  },
  {
    name: "Top On-Solution",
    role: "Corporate Consultancy & Business Support",
    desc: "Consultancy and practical support for company setup, regulatory compliance, tax, VAT, customs, trade, audit, sourcing and business requirements.",
    icon: Briefcase,
    logo: "/images/logo/topon-solution.png",
    href: "/divisions/consultancy-toponsolution",
    heritage: "Regulatory & Commercial Governance",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Page Header with Interactive Particle Background */}
      <section className="relative py-24 sm:py-32 bg-[#040D1A] text-white border-b border-brand-gold/20 overflow-hidden select-none">
        <ParticleCanvas
          className="opacity-75"
          particleColor="rgba(197, 168, 92, 0.55)"
          lineColor="rgba(197, 168, 92, 0.15)"
        />
        <div className="absolute -top-32 left-1/3 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest shadow-gold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>About — Top On Group</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight">
            BUILT ON <span className="text-brand-gold">TRUST</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-lg leading-relaxed">
            A diversified, family-owned business group in Bangladesh combining deep industry knowledge, modern technology, and a service-first commitment to long-term national value.
          </p>
        </div>
      </section>

      {/* 2. Core Corporate Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base text-justify">
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
              <Building2 className="w-3.5 h-3.5 text-brand-gold" />
              <span>Corporate Heritage &amp; Evolution</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
              Building Enduring Value Since 1990
            </h2>

            <p>
              <strong>Top On Group</strong> is a diversified, family-owned business group in Bangladesh with an expanding presence across Customs Clearance &amp; Forwarding, Freight Forwarding &amp; Logistics, International Trade, Trading &amp; Supply, Agriculture, and Fisheries.
            </p>

            <p>
              Our journey began in <strong className="text-[#0B2240]">1990</strong> with <strong className="text-[#0B2240]">Shahabuddin Enterprise</strong>, a government-approved Customs Clearing &amp; Forwarding business. Built on decades of practical experience, professional expertise, and strong business relationships, the business achieved significant growth and evolved over the years.
            </p>

            <p>
              As part of its continued growth and corporate evolution, Shahabuddin Enterprise transitioned from a sole proprietorship into a limited company under the name <strong className="text-[#0B2240]">Top Express Limited</strong>, marking an important milestone in our journey and reflecting our continued commitment to professionalism, corporate growth, and long-term development.
            </p>

            <p>
              At the heart of our business is a simple commitment: <strong className="text-[#0B2240]">to understand our clients, deliver with integrity, and build relationships that last.</strong>
            </p>

          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden  h-80 sm:h-[420px] w-full">
              <Image
                src="/images/logo/topon-group.png"
                alt="Top On Group corporate headquarters and executive leadership"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />

            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Complementary Businesses Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-[#0B2240] border border-brand-gold/30 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Group Structure</span>
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Together, our businesses combine deep industry knowledge with an integrated approach to trade, logistics, supply chain, commercial operations, agriculture, and fisheries, enabling us to deliver practical, reliable, and efficient solutions to our clients and business partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FOUR_BUSINESSES.map((biz) => {
            return (
              <div
                key={biz.name}
                className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-brand-gold/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative h-28 w-48 sm:h-32 sm:w-56 bg-slate-50/80 border border-slate-200/80 rounded-2xl p-2.5 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-brand-gold/40 group-hover:bg-white transition-all">
                      <Image
                        src={biz.logo}
                        alt={`${biz.name} Logo`}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 300px, 400px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform"
                      />
                    </div>

                  </div>

                  <div className="space-y-1">

                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-goldDark">
                      {biz.role}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify">
                    {biz.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href={biz.href}
                    className="inline-flex items-center space-x-2 text-xs font-bold text-[#0B2240] hover:text-brand-goldDark transition-colors"
                  >
                    <span>Explore Division Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Corporate Motto: BUILT ON TRUST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2240] via-[#071930] to-[#040D1A] rounded-3xl p-8 sm:p-12 lg:p-16 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          {/* Ambient background glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #C5A85C 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 space-y-10 sm:space-y-12">
            {/* Header Block: Motto Announcement & Links */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-widest shadow-gold">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Our Guiding Motto &amp; Operating Philosophy</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
                  BUILT ON <span className="text-gold-light-gradient">TRUST</span>
                </h2>
              </div>
            </div>

            {/* Narrative & Trust Pillars Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: The Narrative of Trust */}
              <div className="lg:col-span-6 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed text-justify">
                <p>
                  At <strong className="text-white">Top On Group</strong>, our corporate motto—<strong className="text-brand-gold">BUILT ON TRUST</strong>—is not just an aspirational slogan; it is the non-negotiable benchmark that governs every consignment we clear, every container we book, every trading contract we fulfill, and every harvest we nurture.
                </p>
                <p>
                  Founded in 1990 as Shahabuddin Enterprise and evolved into a multi-sector conglomerate, we know that true commercial trust is forged through unwavering integrity, zero-demurrage discipline, and total regulatory adherence.
                </p>
                <p className="text-slate-200">
                  As we look toward the future, we combine this trusted foundation with <span className="text-brand-goldLight font-medium underline decoration-brand-gold/60 underline-offset-4">AI-enabled solutions</span>, digital cargo transparency, modern aquaculture bio-telemetry, and corporate advisory—delivering predictable, high-value outcomes for our partners and contributing to Bangladesh&apos;s national economic sovereignty.
                </p>

              </div>

              {/* Right Column: 4 Pillars of BUILT ON TRUST */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pillar 1 */}
                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-2.5 group">
                  <div className="flex items-center space-x-2.5 text-brand-gold font-bold text-xs uppercase tracking-wider">
                    <div className="p-2 rounded-lg bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span>Integrity &amp; Compliance</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Uncompromising regulatory adherence, accurate declarations, and transparent fiduciary stewardship with zero hidden costs.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-2.5 group">
                  <div className="flex items-center space-x-2.5 text-brand-gold font-bold text-xs uppercase tracking-wider">
                    <div className="p-2 rounded-lg bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors shrink-0">
                      <Target className="w-4 h-4" />
                    </div>
                    <span>Precision &amp; Speed</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Clockwork logistics execution engineered around rapid electronic bill-of-entry filing and expedited port container dispatch.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-2.5 group">
                  <div className="flex items-center space-x-2.5 text-brand-gold font-bold text-xs uppercase tracking-wider">
                    <div className="p-2 rounded-lg bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span>AI &amp; Smart Tech</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Integrating AI-enabled solutions, digital cargo tracking, and modern data-driven governance for predictable performance.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-2.5 group">
                  <div className="flex items-center space-x-2.5 text-brand-gold font-bold text-xs uppercase tracking-wider">
                    <div className="p-2 rounded-lg bg-brand-gold/15 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <span>Enduring Value</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed text-justify">
                    Cultivating generational client partnerships and driving sustainable national prosperity across trade, industry, and food security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
