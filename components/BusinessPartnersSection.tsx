"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Handshake, Building2, ShieldCheck, Sparkles } from "lucide-react";
import { DEFAULT_PARTNERS, Partner, subscribePartners } from "@/lib/partners";

export default function BusinessPartnersSection() {
  const [partners, setPartners] = useState<Partner[]>(DEFAULT_PARTNERS);

  useEffect(() => {
    const unsub = subscribePartners((data) => {
      setPartners(data);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Split partners into two distinct rows for dynamic two-way marquee slider
  const half = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, half);
  const row2 = partners.slice(half);

  // Duplicate arrays for seamless infinite looping
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 overflow-hidden select-none group-slider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-goldDark text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Strategic Alliances &amp; Enterprise Clients</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0B2240] tracking-tight">
            Business Partners
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Trusted by premier conglomerates, national industrial powerhouses, and multinational leaders across electronics, healthcare, manufacturing, and global supply chains.
          </p>
        </div>
      </div>

      {/* Infinite Continuous Slider Tracks with Gradient Fade Edges */}
      <div className="relative w-full mt-10 space-y-5 overflow-hidden">
        {/* Left & Right Gradient Fog Masks */}
        <div className="absolute left-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Row 1: Sliding Left */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 py-2">
            {duplicatedRow1.map((partner, idx) => (
              <div
                key={`r1-${partner.id || partner.name}-${idx}`}
                className="group relative flex-shrink-0 w-48 sm:w-56 h-28 sm:h-32 bg-white rounded-2xl border border-slate-200/90 hover:border-brand-gold shadow-sm hover:shadow-xl hover:shadow-brand-gold/10 p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Logo Image with Zoom & Scale to Fit */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={partner.image || "/images/partners/walton.png"}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 200px, 240px"
                    className="object-contain object-center scale-95 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating Name Badge on Hover */}
                <div className="absolute -bottom-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30">
                  <span className="bg-[#0B2240] text-brand-goldLight text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-lg border border-brand-gold/30 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Sliding Right (Counter Direction) */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-right flex items-center gap-4 sm:gap-6 py-2">
            {duplicatedRow2.map((partner, idx) => (
              <div
                key={`r2-${partner.id || partner.name}-${idx}`}
                className="group relative flex-shrink-0 w-48 sm:w-56 h-28 sm:h-32 bg-white rounded-2xl border border-slate-200/90 hover:border-brand-gold shadow-sm hover:shadow-xl hover:shadow-brand-gold/10 p-4 sm:p-5 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Logo Image with Zoom & Scale to Fit */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={partner.image || "/images/partners/walton.png"}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 200px, 240px"
                    className="object-contain object-center scale-95 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Floating Name Badge on Hover */}
                <div className="absolute -bottom-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-30">
                  <span className="bg-[#0B2240] text-brand-goldLight text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-lg border border-brand-gold/30 whitespace-nowrap">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Trust Metric Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="pt-6 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <Building2 className="w-4 h-4 text-brand-gold" />
            <span>{partners.length}+ Major Conglomerates &amp; Enterprise Clients</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>100% Regulatory Trade &amp; Port Compliance</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Hover to pause slider</span>
          </div>
        </div>
      </div>
    </section>
  );
}
