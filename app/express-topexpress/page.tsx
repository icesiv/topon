import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Truck,
  PackageCheck,
  Clock,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Top Express Limited | Express Courier & Domestic Logistics Division",
  description:
    "Top Express Limited is the specialized express delivery, courier network, and multimodal freight fleet arm of Top On Group in Bangladesh. Offering rapid city parcel, regional trucking, and B2B linehaul distribution.",
  keywords: [
    "Top Express Limited",
    "Top On Group Express",
    "Bangladesh Express Courier",
    "Domestic Parcel Delivery Dhaka",
    "B2B Linehaul Freight Bangladesh",
    "Fleet Management Bangladesh",
  ],
};

export default function TopExpressPage() {
  const serviceCategories = [
    {
      icon: Zap,
      title: "Same-Day & Next-Day Express Delivery",
      description:
        "Guaranteed time-sensitive document and parcel dispatch across Dhaka metropolitan and major divisional economic hubs including Chittagong, Sylhet, and Khulna.",
      features: [
        "Real-time GPS tracking & delivery timestamps",
        "Dedicated corporate dispatch runners",
        "Secure tamper-proof sealed packaging",
      ],
    },
    {
      icon: Truck,
      title: "B2B Linehaul & Fleet Distribution",
      description:
        "Dedicated covered van fleets and heavy trucks for bulk corporate inventory transfer, manufacturing plant replenishment, and retail warehouse distribution.",
      features: [
        "Fleet ranging from 1-ton to 20-ton covered trucks",
        "Scheduled inter-district linehaul corridors",
        "Comprehensive transit insurance & liability cover",
      ],
    },
    {
      icon: PackageCheck,
      title: "E-Commerce & Enterprise Fulfillment",
      description:
        "Tailored fulfillment solutions for modern e-commerce enterprises and commercial distributors with automated cash-on-delivery (COD) management.",
      features: [
        "Rapid 24-48h COD settlement cycle",
        "Reverse logistics & returns reconciliation",
        "Bulk shipment API & manifest integrations",
      ],
    },
    {
      icon: Layers,
      title: "Project Cargo & Scheduled Logistics",
      description:
        "Customized movement of sensitive high-value equipment, exhibition cargo, promotional assets, and factory installations with end-to-end supervision.",
      features: [
        "On-ground logistics coordinators at pickup and drop",
        "Specialized loading and unloading equipment",
        "Direct point-to-point dedicated routing",
      ],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5" />
            <span>Top On Group Express Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Top Express Limited: <br />
            <span className="text-gold-light-gradient">Rapid Transit &amp; Dedicated Fleet Logistics</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            &quot;Precision in motion.&quot; Connecting urban commerce and industrial manufacturing with resilient covered fleet networks, express courier routing, and zero-compromise timeline adherence.
          </p>
        </div>
      </section>

      {/* 2. Overview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/air_cargo.jpg"
                alt="Top Express Limited fleet and rapid transit logistics operations in Bangladesh"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Express Fleet Management
                </span>
                <p className="text-xs text-slate-200">
                  Fully tracked commercial fleet vehicles delivering nationwide coverage with rapid turnaround.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Domestic Logistics Powerhouse
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Connecting Bangladesh&apos;s Industrial &amp; Commercial Centers
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Top Express Limited bridges the vital last-mile and middle-mile gap for businesses across Bangladesh. Whether transferring critical factory spare parts or managing retail replenishment across districts, our disciplined dispatch infrastructure ensures cargo arrives securely on schedule.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <Navigation className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">64 Districts Covered</div>
                <p className="text-[11px] text-slate-500">Extensive national network</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <Clock className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">Time-Definite SLAs</div>
                <p className="text-[11px] text-slate-500">Strict SLA delivery discipline</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Service Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
            Comprehensive <span className="text-gold-gradient">Express Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:border-brand-gold hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2240] font-serif">{cat.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {cat.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Strategic Advantages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2240] rounded-3xl p-8 sm:p-12 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
              The Top Express Guarantee
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif">
              Built on Institutional Trust &amp; Operational Precision
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              As part of Top On Group, Top Express Limited leverages integrated customs clearance, port linkages, and corporate supply chain infrastructure to offer unrivaled speed and transparency.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact#quote"
                className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs uppercase tracking-wider transition-all shadow-gold inline-flex items-center space-x-2"
              >
                <span>Book Corporate Transit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Inquire Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm />
      </section>
    </div>
  );
}
