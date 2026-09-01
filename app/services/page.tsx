import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Ship,
  FileCheck2,
  Anchor,
  Plane,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Our Services | Trading, Customs Clearing & Freight Forwarding",
  description:
    "Explore the comprehensive trade and logistics solutions of Top On Group in Bangladesh. From raw material sourcing to sea/air freight forwarding and licensed C&F clearance.",
  keywords: [
    "Top On Group Services",
    "Bangladesh Sourcing",
    "Chittagong C&F Agent",
    "Ocean Freight Forwarder Bangladesh",
    "Customs Duty Classification NBR",
    "Industrial Spares Procurement",
  ],
};

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Contrasting Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Integrated Trade &amp; <br />
            <span className="text-gold-light-gradient">Supply Chain Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            Delivering clockwork execution from global factory floors to Bangladeshi industrial hubs: On Time. Every Time.
          </p>
        </div>
      </section>

      {/* 2. Trading Services (Top On-Tech) */}
      <section id="trading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-[#0B2240] text-brand-gold shadow-md">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Division: Top On-Tech
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                  General Trading &amp; International Sourcing
                </h2>
              </div>
            </div>

            <Link
              href="/trading-topontech"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase text-[#0B2240] hover:text-brand-gold"
            >
              <span>Explore division detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Industrial Machinery &amp; Spares</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Procurement of CNC machinery, heavy production plant components, and precision spare parts with OEM guarantees.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Chemicals &amp; Industrial Inputs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct factory sourcing of industrial polymers, textile dyes, processing reagents, and specialty raw materials.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Textiles &amp; Electronics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-grade fabric inputs, yarns, test instruments, and consumer electronics with verified quality control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Customs Clearing & C&F Services */}
      <section id="customs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-[#0B2240] text-brand-gold shadow-md">
                <FileCheck2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Division: Daily Shipping &amp; Logistics
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                  Customs Clearing &amp; Forwarding (C&amp;F)
                </h2>
              </div>
            </div>

            <Link
              href="/logistics-dailyshipping"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase text-[#0B2240] hover:text-brand-gold"
            >
              <span>Explore division detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Port Customs Clearance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rapid documentation and inspection handling at Chittagong Port, Mongla Port, and Dhaka ICD Kamalapur.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">HS Code &amp; Tariff Advisory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accurate classification, duty calculations, regulatory compliance, and SRO benefit processing.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Zero Demurrage Strategy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advance bill-of-entry filing ensuring containers leave port gates without penalty delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Freight Forwarding (Ocean & Air) */}
      <section id="freight" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3.5 rounded-2xl bg-[#0B2240] text-brand-gold shadow-md">
                <Ship className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                  Division: Daily Shipping &amp; Logistics
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                  Freight Forwarding (Ocean &amp; Air)
                </h2>
              </div>
            </div>

            <Link
              href="/logistics-dailyshipping"
              className="inline-flex items-center space-x-1 text-xs font-bold uppercase text-[#0B2240] hover:text-brand-gold"
            >
              <span>Explore division detail</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Ocean FCL &amp; LCL Forwarding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Global container slot bookings with major ocean lines covering Asia, Europe, Middle East, and the Americas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Expedited Air Cargo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Time-critical air freight via Hazrat Shahjalal International Airport with prioritized clearance and release.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-[#0B2240] text-base">Inland Haulage &amp; Door Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Container trailer fleet connecting sea terminals to factories across Dhaka, Gazipur, Narayanganj, and EPZs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct RFQ Quote Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
              Get an Immediate Service Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you require a single container shipment or a turnkey industrial procurement framework, our specialists are ready to support your business.
            </p>
          </div>
          <div className="lg:col-span-7">
            <QuoteForm defaultDivision="both" />
          </div>
        </div>
      </section>
    </div>
  );
}
