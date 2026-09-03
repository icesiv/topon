"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  Ship,
  Truck,
  Fish,
  Mail,
  Home,
  ArrowRight,
} from "lucide-react";
import ParticleCanvas from "@/components/ParticleCanvas";

export default function ComingSoonPage() {
  const divisions = [
    {
      name: "Top On-Tech",
      desc: "Import, Export, and Trading Enterprise",
      icon: Building2,
      href: "/trading-topontech",
    },
    {
      name: "Top Express Limited",
      desc: "Customs Clearing and Forwarding (C&F) Company",
      icon: Truck,
      href: "/express-topexpress",
    },
    {
      name: "Daily Shipping & Logistics",
      desc: "Freight Forwarding and International Trade Support",
      icon: Ship,
      href: "/logistics-dailyshipping",
    },
    {
      name: "Top On-Agro Farm",
      desc: "Commercial Fisheries, Aquaculture & Sustainable Cold Chain",
      icon: Fish,
      href: "/agro-toponagro",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/60 to-white text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      {/* Animated Interactive Particle Canvas */}
      <ParticleCanvas />

      {/* Decorative Light Radial Gradients & Glow Orbs (Just like Home Hero) */}
      <div className="absolute top-0 left-1/4 w-[28rem] h-[28rem] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[32rem] h-[32rem] bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.12] pointer-events-none" />

      {/* Main Centerpiece */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center my-auto">
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-[#0B2240] text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-xs">
          <Sparkles className="w-4 h-4 text-brand-goldDark animate-pulse" />
          <span>Something Exceptional Is Coming Soon</span>
        </div>

        {/* Centered Big Logo with White Card Container */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-center px-6 py-4 sm:px-10 sm:py-5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200 hover:border-brand-gold/60 transition-all">
            <Image
              src="/logo-text.png"
              alt="Top On Group"
              width={380}
              height={80}
              priority
              className="h-12 sm:h-16 md:h-20 w-auto object-contain"
            />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B2240] font-serif leading-[1.15] max-w-4xl mx-auto">
          We Are Crafting The Next Generation of{" "}
          <span className="text-gold-gradient block sm:inline mt-1 sm:mt-0">
            Global Trade & Logistics
          </span>
        </h1>


        {/* Official Email Contact Pill */}
        <div className="mt-8 flex items-center justify-center">
          <a
            href="mailto:info@toponbd.com"
            className="inline-flex items-center space-x-2.5 px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 hover:border-brand-gold text-slate-700 hover:text-brand-navy text-xs sm:text-sm font-medium transition-all shadow-xs backdrop-blur-sm group"
          >
            <Mail className="w-4 h-4 text-brand-goldDark group-hover:scale-110 transition-transform" />
            <span>Corporate Inquiries: <strong className="text-[#0B2240]">info@toponbd.com</strong></span>
          </a>
        </div>

        {/* Business Wings Strip */}
        <div className="mt-12 pt-10 border-t border-slate-200">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-5">
            Operating Divisions of Top On Group
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-left">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <Link
                  key={i}
                  href={div.href}
                  className="p-4 rounded-xl bg-white/90 border border-slate-200 hover:border-brand-gold/60 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group backdrop-blur-sm shadow-xs"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 rounded-lg bg-slate-50 text-brand-navy border border-slate-200 group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:border-brand-gold transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="font-semibold text-xs sm:text-sm text-[#0B2240] group-hover:text-brand-goldDark transition-colors">
                      {div.name}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pl-1">
                    {div.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>
          &copy; {new Date().getFullYear()} <strong className="text-[#0B2240] font-semibold">TOP ON GROUP</strong>. All rights reserved.
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 text-slate-500 text-xs flex-wrap justify-center">
          <a
            href="mailto:info@toponbd.com"
            className="hover:text-brand-navy transition-colors flex items-center space-x-1.5 text-slate-600"
          >
            <Mail className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>info@toponbd.com</span>
          </a>
          <span>•</span>
          <span className="text-[#0B2240] font-medium">toponbd.com</span>
          <span>•</span>
          <span>Corporate HQ: Dhaka, Bangladesh</span>
        </div>
      </footer>

      {/* Discreet Bottom Right Home Button Link */}
      <div className="fixed bottom-4 right-4 z-50">
        <Link
          href="/home"
          id="coming-soon-home-btn"
          aria-label="Go to Home page"
          title="Go to Home"
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900/5 hover:bg-slate-900/10 border border-slate-300 text-slate-600 hover:text-[#0B2240] text-xs opacity-35 hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-xs"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="text-[11px] font-normal tracking-wide">Home</span>
        </Link>
      </div>
    </div>
  );
}
