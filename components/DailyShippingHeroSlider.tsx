"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  image: string;
  category: string;
  headline: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/images/dailyshipping_slide_1.jpg",
    category: "Maritime Container Shipping",
    headline: "Direct ocean vessel coordination handling 20,000+ TEUs annually at Chittagong Port.",
  },
  {
    id: 2,
    image: "/images/dailyshipping_slide_2.jpg",
    category: "Container Freight Station (CFS) & Depot",
    headline: "Off-dock depot management, container de-stuffing, and secured storage yards.",
  },
  {
    id: 3,
    image: "/images/dailyshipping_hero.jpg",
    category: "Global Ocean Freight Forwarding",
    headline: "Seamless FCL and LCL container cargo links across Asia, Europe, and the Americas.",
  },
  {
    id: 4,
    image: "/images/customs_cnf.jpg",
    category: "Licensed Port C&F & Trade Compliance",
    headline: "High-speed customs clearance, port liaison, and tariff advisory.",
  },
];

export default function DailyShippingHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden select-none bg-[#040D1A]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Daily Shipping & Logistics Hero Image Slider"
    >
      {/* 1. Full-Width Background Slides */}
      {SLIDES.map((slide, idx) => {
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
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl space-y-5 text-left">
          {/* Daily Shipping Logo */}
          <div className="inline-block p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40">
            <Image
              src="/images/logo/dsl.png"
              alt="Daily Shipping & Logistics Logo"
              width={160}
              height={130}
              quality={100}
              priority
              className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
            />
          </div>

          {/* Main Hero Headings */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight sm:leading-none">
            Daily Shipping &amp; Logistics: <br />
            <span className="text-gold-light-gradient">20,000+ Containers of Operational Mastery</span>
          </h1>

          {/* Core Tagline / Quote */}
          <p className="max-w-2xl text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            &quot;Navigating global horizons with precision.&quot; Delivering technology-driven freight forwarding, precision customs clearing (C&amp;F), and end-to-end multimodal transport across Bangladesh&apos;s maritime corridors.
          </p>
        </div>
      </div>

      {/* 3. Slider Controls: Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-gold text-white hover:text-brand-navy backdrop-blur-md border border-white/20 hover:border-brand-gold flex items-center justify-center transition-all duration-200"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* 4. Bottom Slide Navigation Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center items-center space-x-2.5">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`group transition-all duration-300 flex items-center ${
                isActive
                  ? "w-10 sm:w-12 h-2.5 bg-brand-gold rounded-full"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
            />
          );
        })}
      </div>
    </div>
  );
}
