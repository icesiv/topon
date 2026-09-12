"use client";

import Image from "next/image";
import { Sparkles, Cpu, History } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-white text-slate-900 overflow-hidden border-y border-slate-200/80 select-none">
      {/* Decorative Subtle Radial Glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Geometric Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0B2240 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">


        {/* Section Header */}
        <div className="flex flex-col justify-center items-center max-w-3xl mx-auto space-y-4">
          <Image
            src="/images/logo/topon-group.png"
            alt="Top On Group"
            width={500}
            height={220}
            priority
            quality={100}
            sizes="(max-width: 768px) 90vw, 300px"
            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-sm"
          />

        </div>

        {/* Featured High Quality Company Logo Card */}
        <div className="p-6 sm:p-10  text-center rounded-3xl bg-gradient-to-br from-white via-slate-50/60 to-amber-50/20 border border-slate-200/90 shadow-lg relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-brand-gold/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />



          <p className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed">
            A diversified, family-owned conglomerate in Bangladesh delivering end-to-end excellence across Customs C&amp;F, Freight Logistics, International Trade, Agriculture, and Fisheries.
          </p>

          {/* Heritage Tag Line */}
          <div className="pt-4 mt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-goldDark">
                <History className="w-4.5 h-4.5 text-brand-goldDark" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">Heritage &amp; Evolution</span>
                <h3 className="text-xs sm:text-sm font-bold text-[#0B2240] font-serif">1990 – Present Day</h3>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              Est. 1990 • Bangladesh
            </span>
          </div>
        </div>

        {/* Single Column Story & Commitment Cards */}
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/80 backdrop-blur-md border border-slate-200/90 space-y-4 shadow-sm text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              <strong className="text-[#0B2240] font-semibold">Top On Group</strong> is a diversified, family-owned business group in Bangladesh with an expanding presence across <span className="text-[#0B2240] font-medium">Customs Clearance &amp; Forwarding</span>, <span className="text-[#0B2240] font-medium">Freight Forwarding &amp; Logistics</span>, <span className="text-[#0B2240] font-medium">International Trade</span>, <span className="text-[#0B2240] font-medium">Trading &amp; Supply</span>, <span className="text-[#0B2240] font-medium">Agriculture</span>, and <span className="text-[#0B2240] font-medium">Fisheries</span>.
            </p>
            <p>
              Our journey began in <strong className="text-[#0B2240]">1990</strong> with <strong className="text-[#0B2240]">Shahabuddin Enterprise</strong>, a government-approved Customs Clearing &amp; Forwarding business. Built on decades of practical experience, professional expertise, and strong business relationships, the business achieved significant growth and evolved over the years.
            </p>
            <p>
              As part of its continued growth and corporate evolution, Shahabuddin Enterprise transitioned from a sole proprietorship into a limited company under the name <strong className="text-[#0B2240]">Top Express Limited</strong>, marking an important milestone in our journey and reflecting our continued commitment to professionalism, corporate growth, and long-term development.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-gold/10 via-amber-50/30 to-slate-50 border border-brand-gold/30 space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-[#0B2240] font-bold text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-brand-goldDark" />
              <span>Our Modern Vision &amp; Core Commitment</span>
            </div>
            <p className="text-slate-800 text-sm sm:text-base font-medium">
              At the heart of our business is a simple commitment: <strong className="text-[#0B2240]">to understand our clients, deliver with integrity, and build relationships that last.</strong>
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              As we look toward the future, Top On Group remains committed to responsible growth, operational excellence, innovation, and creating sustainable value for our clients, partners, employees, and the wider economy. We combine modern technology, <strong className="text-[#0B2240]">AI-enabled solutions</strong>, strong governance, and a service-first approach to create lasting value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
