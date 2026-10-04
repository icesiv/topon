"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  subscribeDivisionSlides,
  DEFAULT_DIVISION_SLIDES,
  DivisionSlideData,
} from "@/lib/divisionSliders";

export default function TopOnAgroHeroSlider() {
  const [slides, setSlides] = useState<DivisionSlideData[]>(
    DEFAULT_DIVISION_SLIDES.toponagro
  );
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const unsub = subscribeDivisionSlides("toponagro", (data) => {
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
      aria-label="Top On-Agro Farm Hero Image Slider"
    >
      {/* 1. Full-Width Background Slides */}
      {slides.map((slide, idx) => {
        const isActive = idx === current;
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.category}
              fill
              priority={idx === 0}
              quality={80}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-[6000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/95 via-[#030914]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-transparent to-[#040D1A]/50" />
          </div>
        );
      })}

      {/* 2. Repositioned Text Overlay (Container Aligned) */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pb-20 sm:pb-0">
        <div className="max-w-3xl space-y-5 text-left">
          {/* Top On-Agro Logo */}
          <div className="inline-block p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40">
            <Image
              src="/images/logo/topon-agro.png"
              alt="Top On-Agro Farm Logo"
              width={160}
              height={130}
              quality={100}
              priority
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </div>

          {/* Main Hero Headings */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight sm:leading-none">
            Top On-Agro Farm: <br />
            <span className="text-gold-light-gradient">Commercial Fisheries &amp; Sustainable Aquaculture</span>
          </h1>

          {/* Core Tagline / Quote */}
          <p className="max-w-2xl text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-light text-justify">
            &quot;Pioneering sustainable aquaculture and premium freshwater fisheries across Bangladesh.&quot; High-tech biofloc ponds, certified hatchery breeding, cold chain integrity, and bulk fish distribution.
          </p>
        </div>
      </div>

      {/* 3. Slider Controls: Arrows (Bottom-anchored on mobile, side-aligned on desktop) */}
      <button
        onClick={prevSlide}
        className="absolute bottom-5 sm:bottom-auto left-4 sm:left-6 sm:top-1/2 sm:-translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute bottom-5 sm:bottom-auto right-4 sm:right-6 sm:top-1/2 sm:-translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200 shadow-lg active:scale-95"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 4. Bottom Slide Navigation Indicators */}
      <div className="absolute bottom-7 sm:bottom-6 left-0 right-0 z-30 flex justify-center items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center space-x-2 sm:space-x-2.5">
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
      </div>
    </div>
  );
}
