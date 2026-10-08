"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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

  // Mobile Slider State
  const [mobileSlide, setMobileSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    const unsub = subscribeHeroBusinesses((data) => {
      setBusinesses(resolveBusinessPanels(data));
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Auto-advance mobile slider every 5 seconds (when not paused)
  useEffect(() => {
    if (isPaused || businesses.length <= 1) return;
    const interval = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % businesses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, businesses.length]);

  const prevSlide = () => {
    setMobileSlide((prev) => (prev - 1 + businesses.length) % businesses.length);
  };

  const nextSlide = () => {
    setMobileSlide((prev) => (prev + 1) % businesses.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartXRef.current = e.targetTouches[0].clientX;
    touchEndXRef.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;
    if (diff > minSwipeDistance) {
      nextSlide();
    } else if (diff < -minSwipeDistance) {
      prevSlide();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      className="relative w-full bg-[#040C18] overflow-hidden select-none lg:h-[calc(100vh-6rem)] lg:min-h-[640px] lg:max-h-[660px]"
      aria-label="Top On Group Entities Hero"
      onMouseLeave={() => setActiveIdx(0)}
    >
      {/* ========================================================================= */}
      {/* 1. MOBILE SLIDER (< lg) - Touch-enabled Carousel */}
      {/* ========================================================================= */}
      <div
        className="block lg:hidden relative w-full h-[580px] sm:h-[620px] overflow-hidden"
        role="region"
        aria-roledescription="carousel"
        aria-label="Group Entities Carousel"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Slider Track */}
        <div
          className="flex w-full h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${mobileSlide * 100}%)` }}
        >
          {businesses.map((biz, idx) => {
            const IconComponent = biz.icon;
            return (
              <div
                key={biz.id || idx}
                className="w-full h-full flex-shrink-0 relative flex flex-col justify-between overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={biz.image || "/images/topontech_hero.jpg"}
                    alt={biz.name}
                    fill
                    priority={idx === 0}
                    quality={85}
                    sizes="100vw"
                    className="object-cover"
                  />
                  {/* Dynamic Dark Gradient Overlays for Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/70 to-black/40" />
                  <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-[#040C18]/80" />
                </div>

                {/* Top Section: Logo & Counter */}
                <div className="relative z-10 p-5 pt-6 flex items-start justify-between gap-3">
                  {biz.logo ? (
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xl ring-1 ring-brand-gold/30 flex items-center justify-center">
                      <Image
                        src={biz.logo}
                        alt={`${biz.name} Logo`}
                        width={200}
                        height={60}
                        className="h-10 sm:h-12 w-auto max-w-[160px] sm:max-w-[200px] object-contain"
                        priority={idx === 0}
                        quality={100}
                      />
                    </div>
                  ) : (
                    <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs">
                      {biz.name_short}
                    </div>
                  )}

                  <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-brand-gold/40 backdrop-blur-md text-brand-gold font-mono text-xs font-semibold shadow-md">
                    <span>{biz.number}</span>
                    <span className="text-white/40">/</span>
                    <span className="text-white/60">0{businesses.length}</span>
                  </div>
                </div>

                {/* Bottom Section: Category, Title, Tagline & Action */}
                <div className="relative z-10 p-5 pb-20 space-y-3 mt-auto">
                  {biz.category && (
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-goldLight text-[11px] font-semibold tracking-wide">
                      {IconComponent && <IconComponent className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />}
                      <span className="truncate max-w-[260px]">{biz.category}</span>
                    </div>
                  )}

                  <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {biz.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed">
                    {biz.fullTagline || biz.tagline}
                  </p>

                  <div className="pt-1">
                    <Link
                      href={biz.href}
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight active:bg-brand-goldDark text-brand-navy font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-gold/20 group"
                    >
                      <span>Explore Entity</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-navy group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls Overlay */}
        <div className="absolute bottom-4 left-0 right-0 z-20 px-5 flex items-center justify-between pointer-events-auto">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            aria-label="Previous entity"
            className="w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 active:scale-95 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/55 border border-white/15 backdrop-blur-md">
            {businesses.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setMobileSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  mobileSlide === dotIdx
                    ? "w-6 bg-brand-gold shadow-[0_0_8px_rgba(197,168,92,0.8)]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            aria-label="Next entity"
            className="w-10 h-10 rounded-full bg-black/55 hover:bg-black/75 active:scale-95 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HERO (lg and up) - Interactive Expanding Vertical Panels */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex w-full h-full flex-row">
        {businesses.map((biz, idx) => {
          const isExpanded = activeIdx === idx;
          const isAnyExpanded = activeIdx !== null;

          return (
            <Link
              key={biz.id || idx}
              href={biz.href}
              onMouseEnter={() => setActiveIdx(idx)}
              onFocus={() => setActiveIdx(idx)}
              onTouchStart={() => setActiveIdx(idx)}
              className={`group relative flex flex-col justify-between overflow-hidden cursor-pointer border-r border-white/15 last:border-r-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isExpanded
                  ? "flex-[3.2] shadow-2xl z-20"
                  : isAnyExpanded
                    ? "flex-[0.7] opacity-80"
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
                  quality={80}
                  sizes="60vw"
                  className={`object-cover transition-all duration-700 ease-out ${
                    isExpanded
                      ? "scale-105 brightness-110 contrast-105 saturate-115"
                      : isAnyExpanded
                        ? "scale-100 brightness-[0.5] contrast-90 saturate-75"
                        : "scale-100 brightness-[0.8] contrast-100 group-hover:brightness-105"
                  }`}
                />

                {/* Dynamic Gradient Overlay */}
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

              {/* Top Section: Company Logo when extended / Division Number when collapsed */}
              <div className="relative z-10 p-7 lg:p-8 flex items-start justify-between">
                {isExpanded && biz.logo ? (
                  <div className="bg-white/95 backdrop-blur-md px-6 md:px-7 py-3.5 md:py-4 rounded-3xl border border-white/60 shadow-2xl shadow-black/35 ring-1 ring-brand-gold/30 flex items-center justify-center transition-all duration-500 animate-in fade-in zoom-in-95">
                    <Image
                      src={biz.logo}
                      alt={`${biz.name} Logo`}
                      width={400}
                      height={130}
                      className="h-20 md:h-24 lg:h-28 w-auto max-w-[300px] md:max-w-[360px] lg:max-w-[400px] object-contain drop-shadow-xs"
                      priority
                      quality={100}
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                    <span className="font-mono text-xs font-semibold text-brand-gold">
                      {biz.number}
                    </span>
                  </div>
                )}

                {isExpanded && (
                  <span className="font-mono text-xs font-semibold text-brand-gold px-3 py-1.5 rounded-full bg-black/50 border border-brand-gold/40 backdrop-blur-sm shadow-md">
                    {biz.number}
                  </span>
                )}
              </div>

              {/* Bottom Content: Name, Tagline & Click to Open */}
              <div className="relative z-10 p-7 lg:p-8 space-y-3 mt-auto">
                <h2
                  className={`font-serif font-bold tracking-tight text-white transition-all duration-300 leading-tight ${
                    isExpanded
                      ? "text-3xl lg:text-4xl text-brand-goldLight drop-shadow-lg"
                      : "text-2xl lg:text-2xl xl:text-3xl group-hover:text-brand-goldLight"
                  }`}
                >
                  {isExpanded ? biz.name : biz.name_short}
                </h2>

                <p
                  className={`text-slate-200 transition-all duration-500 font-sans leading-relaxed text-justify ${
                    isExpanded
                      ? "text-sm lg:text-base opacity-100 max-h-28"
                      : "text-sm opacity-90 line-clamp-2 max-h-12"
                  }`}
                >
                  {isExpanded ? biz.fullTagline : biz.tagline}
                </p>

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
