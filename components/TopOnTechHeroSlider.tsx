"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building2,
  Cpu,
  FlaskConical,
  Scissors,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import {
  subscribeDivisionSlides,
  DEFAULT_DIVISION_SLIDES,
  DivisionSlideData,
} from "@/lib/divisionSliders";

export default function TopOnTechHeroSlider() {
  const [slides, setSlides] = useState<DivisionSlideData[]>(
    DEFAULT_DIVISION_SLIDES.topontech
  );
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsub = subscribeDivisionSlides("topontech", (data) => {
      if (data && data.length > 0) {
        setSlides(data);
      }
    });
    return () => unsub();
  }, []);

  const nextSlide = useCallback(() => {
    setSlides((currSlides) => {
      if (currSlides.length === 0) return currSlides;
      setCurrent((prev) => (prev + 1) % currSlides.length);
      return currSlides;
    });
  }, []);

  const prevSlide = useCallback(() => {
    setSlides((currSlides) => {
      if (currSlides.length === 0) return currSlides;
      setCurrent((prev) => (prev - 1 + currSlides.length) % currSlides.length);
      return currSlides;
    });
  }, []);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden select-none bg-[#040D1A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Top On-Tech Sourcing & Trading Image Slider"
    >
      {/* 1. Full-Width Background Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              priority={idx === 0}
              quality={80}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${isActive ? "scale-105" : "scale-100"
                }`}
            />

            {/* Exact Live Slide Card Preview Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/50 to-black/30" />
          </div>
        );
      })}

      {/* 2. Content Overlay matching Live Slide Card Preview */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-20 sm:pb-24 pointer-events-none">
        <div className="max-w-4xl space-y-3 sm:space-y-4 text-left pointer-events-auto">
          {/* Top On-Tech Logo kept as is */}
          <div className="inline-block p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40">
            <Image
              src="/images/logo/topon-tech.png"
              alt="Top On-Tech Logo"
              width={160}
              height={130}
              quality={100}
              priority
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </div>

          {/* Dynamic Slide Content matching Live Slide Card Preview */}
          <div className="relative min-h-[90px] sm:min-h-[110px]">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <div
                  key={slide.id || idx}
                  className={`space-y-2 sm:space-y-3 transition-all duration-700 ease-in-out ${
                    isActive
                      ? "relative opacity-100 translate-y-0"
                      : "absolute inset-0 opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/70 border border-brand-gold/50 backdrop-blur-md text-brand-gold text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider">
                    <span>{slide.category || "Entity Category"}</span>
                  </div>
                  <h1 className="text-white font-serif font-bold text-2xl sm:text-4xl lg:text-5xl leading-snug sm:leading-tight drop-shadow-md">
                    {slide.headline}
                  </h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Bottom Slider Controls (Prev, Indicators, Next) */}
      <div className="absolute bottom-5 sm:bottom-6 left-0 right-0 z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Bottom Slide Navigation Indicators */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-md">
            {slides.map((slide, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`group transition-all duration-300 flex items-center ${
                    isActive
                      ? "w-8 sm:w-12 h-2 sm:h-2.5 bg-brand-gold rounded-full"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/40 hover:bg-white/70 rounded-full"
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
                />
              );
            })}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
