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
  Phone,
  ArrowRight,
  Home,
  CheckCircle2,
  Clock,
  Globe2,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function ComingSoonPage() {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 34,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  // Newsletter State
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Launch target date: 35 days in the future
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 35);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const divisions = [
    {
      name: "Top On-Tech",
      desc: "General Trading, Industrial Machinery & Chemical Sourcing",
      icon: Building2,
      href: "/trading-topontech",
    },
    {
      name: "Daily Shipping & Logistics",
      desc: "Ocean & Air Freight Forwarding, Port C&F Customs Brokerage",
      icon: Ship,
      href: "/logistics-dailyshipping",
    },
    {
      name: "Top Express Limited",
      desc: "Same-Day Courier, B2B Linehaul Fleet & Parcel Logistics",
      icon: Truck,
      href: "/express-topexpress",
    },
    {
      name: "Top On-Agro Farm",
      desc: "Commercial Fisheries, Aquaculture & Sustainable Cold Chain",
      icon: Fish,
      href: "/agro-toponagro",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#040C18] text-white flex flex-col justify-between overflow-x-hidden selection:bg-brand-gold selection:text-brand-navy">
      {/* Background Decorative Lighting & Ambient Grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(rgba(197, 168, 92, 0.4) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
          }}
        />

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-[#0B2240]/80 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[32rem] h-[32rem] bg-brand-gold/10 rounded-full blur-[160px]" />
      </div>


      {/* Main Centerpiece */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center my-auto">
        {/* Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-gold">
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
          <span>Something Exceptional Is Coming Soon</span>
        </div>


        {/* Centered Big Logo with White Background */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center justify-center px-6 py-4 sm:px-10 sm:py-5 bg-white rounded-2xl shadow-2xl shadow-black/60 border border-brand-gold/40 hover:border-brand-gold transition-all">
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
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-[1.15] max-w-4xl mx-auto">
          We Are Crafting The Next Generation of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark">
            Global Trade & Logistics
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-sans font-light leading-relaxed">
          Top On Group is upgrading its central digital platform. Delivering premier solutions in
          international general trading, customs clearance (C&F), ocean & air freight forwarding,
          and sustainable agro-fisheries.
        </p>


        {/* Business Wings Strip */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-5">
            Operating Divisions of Top On Group
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {divisions.map((div, i) => {
              const Icon = div.icon;
              return (
                <Link
                  key={i}
                  href={div.href}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-brand-gold/40 hover:bg-white/[0.06] transition-all group backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3 mb-1.5">
                    <div className="p-2 rounded-lg bg-[#0B2240] text-brand-gold border border-brand-gold/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h2 className="font-semibold text-xs sm:text-sm text-white group-hover:text-brand-gold transition-colors">
                      {div.name}
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed pl-1">
                    {div.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          &copy; {new Date().getFullYear()} <strong className="text-white font-semibold">TOP ON GROUP</strong>. All rights reserved.
        </div>

        <div className="flex items-center space-x-6 text-slate-400 text-xs">
          <span className="text-brand-gold font-medium">On Time. Every Time.</span>
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
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-xs opacity-25 hover:opacity-100 transition-all duration-300 backdrop-blur-sm shadow-sm"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="text-[11px] font-normal tracking-wide">Home</span>
        </Link>
      </div>
    </div>
  );
}
