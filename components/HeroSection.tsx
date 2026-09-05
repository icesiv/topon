"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  DEFAULT_BUSINESS_PANELS,
  resolveBusinessPanels,
  subscribeHeroBusinesses,
  BusinessPanel,
} from "@/lib/heroBusinesses";

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const [businesses, setBusinesses] = useState<BusinessPanel[]>(() =>
    resolveBusinessPanels(DEFAULT_BUSINESS_PANELS)
  );

  useEffect(() => {
    const unsub = subscribeHeroBusinesses((data) => {
      setBusinesses(resolveBusinessPanels(data));
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <section
      className="relative w-full h-[calc(100vh-6rem)] min-h-[640px] max-h-[960px] bg-[#040C18] overflow-hidden select-none"
      aria-label="Top On Group Business Divisions Hero"
      onMouseLeave={() => setActiveIdx(0)}
    >
      {/* Interactive Expanding Vertical Panels */}
      <div className="w-full h-full flex flex-col lg:flex-row">
        {businesses.map((biz, idx) => {
          const Icon = biz.icon;
          const isExpanded = activeIdx === idx;
          const isAnyExpanded = activeIdx !== null;

          return (
            <Link
              key={biz.id || idx}
              href={biz.href}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onTouchStart={() => setActiveIdx(idx)}
              className={`group relative flex flex-col justify-between overflow-hidden cursor-pointer border-b lg:border-b-0 lg:border-r border-white/15 last:border-b-0 last:border-r-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isExpanded
                  ? "flex-[2.8] lg:flex-[3.2] shadow-2xl z-20"
                  : isAnyExpanded
                  ? "flex-[0.7] lg:flex-[0.7] opacity-80"
                  : "flex-1 opacity-100"
              }`}
              style={{ willChange: "flex-grow, flex-basis" }}
            >
              {/* Background Thumbnail Image with Smooth Ken Burns Zoom & Hover Highlight */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={biz.image || "/images/topontech_hero.jpg"}
                  alt={biz.name}
                  fill
                  priority={idx < 2}
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isExpanded
                      ? "scale-105 brightness-110 contrast-105 saturate-115"
                      : isAnyExpanded
                      ? "scale-100 brightness-[0.5] contrast-90 saturate-75"
                      : "scale-100 brightness-[0.8] contrast-100 group-hover:brightness-105"
                  }`}
                />

                {/* Dynamic Gradient Overlay: Clear & highlighted on active, dimmed on inactive */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isExpanded
                      ? "bg-gradient-to-t from-[#040C18] via-[#040C18]/45 to-transparent opacity-95"
                      : isAnyExpanded
                      ? "bg-[#040C18]/65"
                      : "bg-gradient-to-t from-[#040C18] via-[#040C18]/60 to-black/35 opacity-85"
                  }`}
                />

                {/* Golden Inset Glow Highlight on Active */}
                <div
                  className={`absolute inset-0 border-2 transition-all duration-500 pointer-events-none ${
                    isExpanded
                      ? "border-brand-gold/60 shadow-[inset_0_0_50px_rgba(197,168,92,0.15)]"
                      : "border-transparent"
                  }`}
                />
              </div>

              {/* Bottom Content: Name, Tagline & Click to Open */}
              <div className="relative z-10 p-5 sm:p-7 lg:p-8 space-y-3 mt-auto">
                {/* Business Name */}
                <h2
                  className={`font-serif font-bold tracking-tight text-white transition-all duration-300 leading-tight ${
                    isExpanded
                      ? "text-2xl sm:text-3xl lg:text-4xl text-brand-goldLight drop-shadow-lg"
                      : "text-xl sm:text-2xl lg:text-2xl xl:text-3xl group-hover:text-brand-goldLight"
                  }`}
                >
                  {isExpanded ? biz.name : biz.name_short}
                </h2>

                {/* Short Tagline */}
                <p
                  className={`text-slate-200 transition-all duration-500 font-sans leading-relaxed ${
                    isExpanded
                      ? "text-xs sm:text-sm lg:text-base opacity-100 max-h-28"
                      : "text-xs sm:text-sm opacity-90 line-clamp-2 max-h-12"
                  }`}
                >
                  {isExpanded ? biz.fullTagline : biz.tagline}
                </p>

                {/* Click to Open Prompt Placed at Bottom */}
                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2 text-xs font-semibold text-brand-gold group-hover:text-brand-goldLight transition-colors">
                    <span className="tracking-wide">Click to Open</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-200">
                    {biz.number}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
