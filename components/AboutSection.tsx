"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Ship,
  FileCheck2,
  Fish,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Cpu,
  TrendingUp,
  History,
  CheckCircle2,
} from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const FOUR_BUSINESSES = [
  {
    name: "Top Express Limited",
    desc: "Customs Clearing and Forwarding (C&F) Agency",
    icon: FileCheck2,
    href: "/express-topexpress",
    tag: "Est. 1990 Roots",
    color: "from-amber-500/20 to-brand-gold/10 border-brand-gold/30 text-brand-gold",
  },
  {
    name: "Top On-Tech",
    desc: "Import, Export, Trading & Supply",
    icon: Building2,
    href: "/trading-topontech",
    tag: "Global Trade",
    color: "from-blue-500/20 to-sky-500/10 border-blue-400/30 text-blue-300",
  },
  {
    name: "Daily Shipping & Logistics",
    desc: "Freight Forwarding Agency & Logistics",
    icon: Ship,
    href: "/logistics-dailyshipping",
    tag: "Ocean & Air",
    color: "from-cyan-500/20 to-blue-600/10 border-cyan-400/30 text-cyan-300",
  },
  {
    name: "Top On-Agro Farm",
    desc: "Agriculture & Fisheries",
    icon: Fish,
    href: "/agro-toponagro",
    tag: "Sustainable Agro",
    color: "from-emerald-500/20 to-teal-500/10 border-emerald-400/30 text-emerald-300",
  },
];

export default function AboutSection() {
  return (
    <section className="relative py-20 sm:py-28 bg-[#040D1A] text-white overflow-hidden border-y border-brand-gold/20 select-none">
      {/* Interactive Particle Animation Background */}
      <ParticleCanvas
        className="opacity-70"
        particleColor="rgba(197, 168, 92, 0.5)"
        lineColor="rgba(197, 168, 92, 0.12)"
      />

      {/* Decorative Radial Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Geometric Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C5A85C 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest shadow-gold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>About — Top On Group</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Quality. Service. <span className="text-brand-gold">Nation.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A diversified, family-owned conglomerate in Bangladesh delivering end-to-end excellence across Customs C&amp;F, Freight Logistics, International Trade, Agriculture, and Fisheries.
          </p>
        </div>

        {/* Two Column Layout: Main Story & Milestone Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Rich Narrative Paragraphs */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 rounded-3xl bg-[#071930]/80 backdrop-blur-xl border border-white/10 space-y-4 shadow-xl">
              <p>
                <strong className="text-white font-semibold">Top On Group</strong> is a diversified, family-owned business group in Bangladesh with an expanding presence across <span className="text-brand-goldLight font-medium">Customs Clearance &amp; Forwarding</span>, <span className="text-brand-goldLight font-medium">Freight Forwarding &amp; Logistics</span>, <span className="text-brand-goldLight font-medium">International Trade</span>, <span className="text-brand-goldLight font-medium">Trading &amp; Supply</span>, <span className="text-brand-goldLight font-medium">Agriculture</span>, and <span className="text-brand-goldLight font-medium">Fisheries</span>.
              </p>
              <p>
                Our journey began in <span className="text-brand-gold font-bold">1990</span> with <strong className="text-white">Shahabuddin Enterprise</strong>, a government-approved Customs Clearing &amp; Forwarding business. Built on decades of practical experience, professional expertise, and strong business relationships, the business achieved significant growth and evolved over the years.
              </p>
              <p>
                As part of its continued growth and corporate evolution, Shahabuddin Enterprise transitioned from a sole proprietorship into a limited company under the name <strong className="text-white">Top Express Limited</strong>, marking an important milestone in our journey and reflecting our continued commitment to professionalism, corporate growth, and long-term development.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-r from-brand-gold/10 via-[#071930] to-[#071930] border border-brand-gold/30 space-y-3">
              <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-brand-gold" />
                <span>Our Modern Vision &amp; Core Commitment</span>
              </div>
              <p className="text-slate-200">
                At the heart of our business is a simple commitment: <strong className="text-white">to understand our clients, deliver with integrity, and build relationships that last.</strong>
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                As we look toward the future, Top On Group remains committed to responsible growth, operational excellence, innovation, and creating sustainable value for our clients, partners, employees, and the wider economy. At Top On Group, we combine modern technology, <strong className="text-brand-goldLight">AI-enabled solutions</strong>, strong governance, and a service-first approach to create lasting value.
              </p>
            </div>
          </div>

          {/* Right Column: Visual Milestone Showcase & 4 Complementary Pillars */}
          <div className="lg:col-span-5 space-y-6">
            {/* Heritage Badge Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B2240] to-[#051326] border border-brand-gold/30 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold">
                  <History className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold">Heritage &amp; Evolution</span>
                  <h3 className="text-lg font-bold text-white font-serif">1990 – Present Day</h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                From pioneering customs clearance as Shahabuddin Enterprise in 1990 to an integrated 4-division multi-sector group delivering comprehensive logistics, trade, and agro-fisheries solutions.
              </p>
            </div>

            {/* 4 Complementary Businesses Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  4 Complementary Businesses
                </span>
                <span className="text-[11px] font-mono text-brand-gold">Synergistic Matrix</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FOUR_BUSINESSES.map((biz) => {
                  const IconComp = biz.icon;
                  return (
                    <Link
                      key={biz.name}
                      href={biz.href}
                      className="p-3.5 rounded-2xl bg-[#071930]/90 hover:bg-[#0B2240] border border-white/10 hover:border-brand-gold/40 transition-all duration-300 group flex flex-col justify-between space-y-2 hover:-translate-y-0.5 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-brand-gold/20 border border-white/10 group-hover:border-brand-gold/30 flex items-center justify-center text-brand-gold transition-colors">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 group-hover:text-brand-gold">
                          {biz.tag}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                          {biz.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {biz.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/about"
                className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-navy font-bold text-sm shadow-gold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Read Full Group Profile &amp; Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
