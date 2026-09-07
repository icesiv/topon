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
  title: "About Top On Group | Quality. Service. Nation.",
  description:
    "Top On Group is a diversified, family-owned business group in Bangladesh across Customs C&F, Freight Forwarding & Logistics, International Trade, Agriculture, and Fisheries. Est. 1990.",
  keywords: [
    "About Top On Group",
    "Top On Group Bangladesh",
    "Shahabuddin Enterprise 1990",
    "Top Express Limited",
    "Top On-Tech",
    "Daily Shipping and Logistics",
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
    href: "/express-topexpress",
    heritage: "Evolved from Shahabuddin Enterprise (Est. 1990)",
  },
  {
    name: "Top On-Tech",
    role: "Import, Export, Trading & Supply",
    desc: "Multi-sector import, export, and trading enterprise connecting global suppliers with diverse markets through reliable B2B sourcing and delivery coordination.",
    icon: Building2,
    href: "/trading-topontech",
    heritage: "Cross-Border Industrial Sourcing",
  },
  {
    name: "Daily Shipping & Logistics",
    role: "Freight Forwarding Agency & Logistics",
    desc: "International freight forwarding, multi-carrier ocean container bookings (FCL/LCL), priority air cargo charters, and integrated multimodal transport.",
    icon: Ship,
    href: "/logistics-dailyshipping",
    heritage: "Global Trade Lane Connectivity",
  },
  {
    name: "Top On-Agro Farm",
    role: "Agriculture & Fisheries",
    desc: "Sustainable aquaculture, high-density biofloc pond farming, certified pathogen-free hatcheries, and temperature-controlled nationwide cold chain distribution.",
    icon: Fish,
    href: "/agro-toponagro",
    heritage: "Sustainable Food Security",
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
            Quality. Service. <span className="text-brand-gold">Nation.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-lg leading-relaxed">
            A diversified, family-owned business group in Bangladesh combining deep industry knowledge, modern technology, and a service-first commitment to long-term national value.
          </p>
        </div>
      </section>

      {/* 2. Core Corporate Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
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

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/services"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider shadow-md transition-all duration-200"
              >
                <span>Explore Our Businesses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2240] font-bold text-xs uppercase tracking-wider border border-slate-300 transition-all duration-200"
              >
                <span>Partner with Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-80 sm:h-[420px] w-full">
              <Image
                src="/images/boardroom_team.jpg"
                alt="Top On Group corporate headquarters and executive leadership"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-[#0B2240]/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold">Central Governance</span>
                <h4 className="text-lg font-bold font-serif text-white">Top On Group Executive Board</h4>
                <p className="text-xs text-slate-300 mt-1">Guiding 4 complementary business divisions with integrity and strategic foresight.</p>
              </div>
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
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B2240]">
            Four Complementary Businesses
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Together, our businesses combine deep industry knowledge with an integrated approach to trade, logistics, supply chain, commercial operations, agriculture, and fisheries, enabling us to deliver practical, reliable, and efficient solutions to our clients and business partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {FOUR_BUSINESSES.map((biz) => {
            const IconComp = biz.icon;
            return (
              <div
                key={biz.name}
                className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-brand-gold/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {biz.heritage}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B2240] group-hover:text-brand-goldDark transition-colors">
                      {biz.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-goldDark">
                      {biz.role}
                    </p>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
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

      {/* 4. Future Vision & AI-Enabled Technology */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2240] via-[#071930] to-[#040D1A] rounded-3xl p-8 sm:p-12 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>Next-Generation Governance &amp; Technology</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
                Looking Toward the Future
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                As we look toward the future, Top On Group remains committed to responsible growth, operational excellence, innovation, and creating sustainable value for our clients, partners, employees, and the wider economy.
              </p>

              <p className="text-brand-goldLight text-sm sm:text-base font-medium leading-relaxed">
                At Top On Group, we combine modern technology, <span className="underline decoration-brand-gold underline-offset-4">AI-enabled solutions</span>, strong governance, and a service-first approach to create lasting value.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Quality</span>
                </div>
                <p className="text-xs text-slate-300">Uncompromising standards in every container, shipment, and agro harvest.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Service</span>
                </div>
                <p className="text-xs text-slate-300">Client-centric execution with precision speed: On Time. Every Time.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Nation</span>
                </div>
                <p className="text-xs text-slate-300">Strengthening Bangladesh&apos;s trade infrastructure and industrial sovereignty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0B2240] text-base font-serif">Integrity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent transactions, ethical governance, and accountability in every client partnership.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0B2240] text-base font-serif">Operational Excellence</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero-demurrage clearance and clockwork freight handling across international shipping lanes.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0B2240] text-base font-serif">Lasting Relationships</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Long-term commitment to our clients, partners, employees, and community.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#0B2240] text-base font-serif">AI &amp; Innovation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Modern digital tools, AI-assisted tracking, and intelligent automation for resilient supply chains.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
