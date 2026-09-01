"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Ship,
  CheckCircle2,
  ArrowRight,
  Cpu,
  FlaskConical,
  Scissors,
  Layers,
  Anchor,
  FileCheck2,
  Globe,
  Truck,
} from "lucide-react";

export default function DivisionTabs() {
  const [activeTab, setActiveTab] = useState<"tech" | "shipping">("tech");

  return (
    <section className="py-20 bg-slate-100/70 relative overflow-hidden border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Core Operating Divisions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
            Specialized Arms for <span className="text-gold-gradient">Every Trade Dimension</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
            Top On Group executes global commerce through two specialized powerhouse divisions: high-caliber product trading with <strong>Top On-Tech</strong>, and compliant freight forwarding with <strong>Daily Shipping & Logistics</strong>.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-10">
          <div className="p-1.5 rounded-2xl bg-white border border-slate-300 shadow-md flex space-x-2">
            <button
              onClick={() => setActiveTab("tech")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "tech"
                  ? "bg-[#0B2240] text-brand-gold shadow-lg shadow-navy/20 scale-100"
                  : "text-slate-600 hover:text-[#0B2240] hover:bg-slate-100"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Top On-Tech</span>
              <span className="hidden sm:inline-block text-[11px] opacity-80 font-normal">
                (Est. Jan 2024)
              </span>
            </button>

            <button
              onClick={() => setActiveTab("shipping")}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === "shipping"
                  ? "bg-[#0B2240] text-brand-gold shadow-lg shadow-navy/20 scale-100"
                  : "text-slate-600 hover:text-[#0B2240] hover:bg-slate-100"
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>Daily Shipping & Logistics</span>
              <span className="hidden sm:inline-block text-[11px] opacity-80 font-normal">
                (Est. Sep 2025)
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="transition-all duration-500">
          {activeTab === "tech" ? (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Visual Image Banner with Bangladeshi Engineers */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                  <div className="relative h-72 sm:h-96 w-full">
                    <Image
                      src="/images/trading_sourcing.jpg"
                      alt="Top On-Tech Bangladeshi trade and quality inspection team"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                        Top On-Tech On-Ground Team
                      </span>
                      <p className="text-xs text-slate-200 font-medium">
                        Bangladeshi industrial engineers verifying OEM machinery & chemical specifications.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-md bg-[#0B2240] text-brand-gold text-xs font-bold uppercase tracking-wider">
                      Import • Export • Global Sourcing
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">Established Jan 2024</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                    Top On-Tech: <span className="text-gold-gradient">Trust is Our Most Valuable Asset</span>
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Top On-Tech functions as an international trading house bridging global manufacturers and Bangladeshi industrial enterprises. We specialize in precision procurement, raw materials, heavy machinery, and specialized commercial goods.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Cpu className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Industrial Machinery & Spares</h4>
                        <p className="text-[11px] text-slate-600">High-spec components & plant equipment</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <FlaskConical className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Chemical & Raw Material Supply</h4>
                        <p className="text-[11px] text-slate-600">Specialty industrial & processing chemicals</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Scissors className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Textile Fabrics & Garment Inputs</h4>
                        <p className="text-[11px] text-slate-600">Certified fabrics, yarn & production inputs</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Layers className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Electronics & Consumer Sourcing</h4>
                        <p className="text-[11px] text-slate-600">Customized B2B sourcing solutions</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href="/trading-topontech"
                      className="px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-2"
                    >
                      <span>Explore Top On-Tech</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact?division=topontech"
                      className="px-6 py-3 rounded-xl border border-slate-300 text-slate-800 hover:border-brand-gold hover:text-brand-navy font-semibold text-xs transition-colors"
                    >
                      Request Sourcing Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Visual Image Banner with Bangladeshi Port C&F Team */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                  <div className="relative h-72 sm:h-96 w-full">
                    <Image
                      src="/images/customs_cnf.jpg"
                      alt="Daily Shipping Bangladeshi customs clearance team at Chittagong port"
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                        Chittagong Port C&F Officers
                      </span>
                      <p className="text-xs text-slate-200 font-medium">
                        On-ground Bangladeshi customs brokers ensuring 100% duty accuracy and zero demurrage.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-md bg-[#0B2240] text-brand-gold text-xs font-bold uppercase tracking-wider">
                      Freight Forwarding • C&F Operations
                    </span>
                    <span className="text-slate-500 text-xs font-semibold">Established Sep 2025</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                    Daily Shipping: <span className="text-gold-gradient">20,000+ Containers Handled</span>
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    A technology-driven logistics arm built on two decades of combined operational mastery. Specializing in international ocean freight, air cargo, rapid customs clearance, and total trade compliance at all Bangladesh ports.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Anchor className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Ocean Freight (FCL / LCL)</h4>
                        <p className="text-[11px] text-slate-600">Competitive global container slots</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <FileCheck2 className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Customs Clearing (C&F)</h4>
                        <p className="text-[11px] text-slate-600">Chittagong, Mongla & Dhaka Airport</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Globe className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">International Freight Network</h4>
                        <p className="text-[11px] text-slate-600">Seamless ocean transit coordination</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <Truck className="w-5 h-5 text-brand-navy flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Inland Multimodal Logistics</h4>
                        <p className="text-[11px] text-slate-600">Door-to-door container haulage</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      href="/logistics-dailyshipping"
                      className="px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center space-x-2"
                    >
                      <span>Explore Daily Shipping</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact?division=dailyshipping"
                      className="px-6 py-3 rounded-xl border border-slate-300 text-slate-800 hover:border-brand-gold hover:text-brand-navy font-semibold text-xs transition-colors"
                    >
                      Request Freight Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
