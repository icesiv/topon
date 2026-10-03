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

interface SlideData {
  id: number;
  image: string;
  category: string;
  headline: string;
  icon: typeof Cpu;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: "/images/topontech_slide_1.jpg",
    category: "Industrial Machinery & Spare Parts",
    headline: "Precision CNC tooling, automated plant equipment & verified OEM spares.",
    icon: Cpu,
  },
  {
    id: 2,
    image: "/images/topontech_slide_2.jpg",
    category: "Chemical & Raw Material Supply",
    headline: "High-grade industrial chemicals, polymers & reagents with full COA & MSDS.",
    icon: FlaskConical,
  },
  {
    id: 3,
    image: "/images/topontech_slide_3.jpg",
    category: "Textile Fabrics & Production Inputs",
    headline: "Woven & knit fabrics, specialized yarns, and RMG production inputs.",
    icon: Scissors,
  },
  {
    id: "4" as unknown as number,
    image: "/images/topontech_slide_4.jpg",
    category: "Electronics & Tech Hardware",
    headline: "Commercial B2B electronics, LED drivers, automation & custom components.",
    icon: Layers,
  },
];

export default function TopOnTechHeroSlider() {
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
      aria-label="Top On-Tech Sourcing & Trading Image Slider"
    >
      {/* 1. Full-Width Background Slides */}
      {SLIDES.map((slide, idx) => {
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

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/95 via-[#030914]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-transparent to-[#040D1A]/50" />
          </div>
        );
      })}

      {/* 2. Repositioned Text Overlay (Container Aligned) */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl space-y-5 text-left">
          {/* Top On-Tech Logo */}
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

          {/* Main Hero Headings */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-tight sm:leading-none">
            Top On-Tech: <br />
            <span className="text-gold-light-gradient">Global Sourcing &amp; General Trading</span>
          </h1>

          {/* Core Tagline / Quote */}
          <p className="max-w-2xl text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
            &quot;Trust is our most valuable trading asset.&quot; Facilitating seamless international procurement of industrial components, chemicals, fabrics, and tech hardware.
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
              className={`group transition-all duration-300 flex items-center ${isActive ? "w-10 sm:w-12 h-2.5 bg-brand-gold rounded-full" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70 rounded-full"
                }`}
              aria-label={`Go to slide ${idx + 1}: ${slide.category}`}
            />
          );
        })}
      </div>
    </div>
  );
}
