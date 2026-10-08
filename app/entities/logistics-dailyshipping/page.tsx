import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DailyShippingHeroSlider from "@/components/DailyShippingHeroSlider";
import {
  Ship,
  Anchor,
  FileCheck2,
  Globe,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
  Plane,
  Sparkles,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Daily Shipping & Logistics | Freight Forwarding & C&F Operations",
  description:
    "Daily Shipping & Logistics is the elite freight forwarding and customs clearance (C&F) arm of Top On Group in Bangladesh. Managing 20,000+ containers with zero demurrage compliance.",
  keywords: [
    "Daily Shipping & Logistics",
    "Bangladesh Freight Forwarding",
    "Customs Clearing C&F Chittagong",
    "Ocean Freight FCL LCL Dhaka",
    "Air Cargo Logistics Bangladesh",
    "Trade Compliance & Port Handling",
  ],
};

export default function DailyShippingPage() {
  const serviceList = [
    {
      icon: Anchor,
      title: "Ocean Freight (FCL & LCL)",
      description:
        "Full Container Load (FCL) and Less than Container Load (LCL) bookings across major global sea lanes with tier-1 ocean carriers.",
      features: [
        "Guaranteed space allocation during peak seasons",
        "Reefer, open-top, and hazardous cargo capabilities",
        "Direct transshipment hub tracking (Singapore, Colombo, Tanjung Pelepas)",
      ],
    },
    {
      icon: FileCheck2,
      title: "Customs Clearing & Brokerage (C&F)",
      description:
        "Comprehensive licensed customs clearing at Chittagong Port, Mongla Port, Dhaka ICD (Kamalapur), and Hazrat Shahjalal International Airport (DAC).",
      features: [
        "HS Code tariff audit & exemption processing",
        "Rapid assessment and NBR duty alignment",
        "Zero-demurrage clearance workflows",
      ],
    },
    {
      icon: Plane,
      title: "Air Freight Cargo Logistics",
      description:
        "Time-critical expedited air freight solutions for high-value components, urgent spare parts, garments, and pharmaceuticals.",
      features: [
        "Priority belly-hold and freighter charter coordination",
        "Next-flight-out express consignment handling",
        "Door-to-airport & airport-to-door delivery",
      ],
    },
    {
      icon: Truck,
      title: "Inland Haulage & Multimodal Transport",
      description:
        "Reliable container trucking and inland road haulage connecting port terminals to industrial EPZs and private manufacturing facilities.",
      features: [
        "GPS-tracked prime mover fleet",
        "Heavy-lift low-bed trailers for industrial project cargo",
        "24/7 route clearance and terminal liaison",
      ],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Full-Width Hero Slider */}
      <DailyShippingHeroSlider />

      {/* 2. On-Ground Port C&F Team Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/customs_cnf.jpg"
                alt="Daily Shipping Bangladeshi customs clearance officers at Chittagong Port terminal"
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Chittagong Port On-Ground Clearance
                </span>
                <p className="text-xs text-slate-200">
                  Direct port liaisons ensuring fast document audit, customs assessment, and duty release.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Port Mastery &amp; Compliance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Zero-Demurrage Strategy Across All Bangladesh Ports
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              With dedicated operational desks at Chittagong Port, Mongla Port, and Dhaka ICD Kamalapur, Daily Shipping &amp; Logistics executes advance bill-of-entry filing, HS Code tariff verification, and expedited vessel unloading to eliminate port detention charges.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0B2240] text-sm">20,000+</div>
                <div className="text-[11px] text-slate-600 font-medium">Containers Handled</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-[#0B2240] text-sm">100%</div>
                <div className="text-[11px] text-slate-600 font-medium">Customs Compliance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Logistics Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Operational Solutions</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
            Comprehensive <span className="text-gold-gradient">Freight &amp; C&amp;F Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg hover:border-brand-gold hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B2240] font-serif">{srv.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  {srv.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Strategic Customs Houses & Freight Quotation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#040D1A] rounded-3xl p-8 sm:p-12 lg:p-14 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Backdrops */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-white/10 mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>On-Ground Clearance &amp; Freight Quotation</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
                Our 5 Key Customs House Desks
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Direct on-ground customs brokerage, tariff valuation, and expedited container release across Bangladesh.
              </p>
            </div>

            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>5 Stations Active 24/7</span>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 5 Customs Houses */}
            <div className="lg:col-span-7 space-y-3">
              {[
                {
                  id: "airport",
                  number: "1",
                  name: "Customs House, Airport, Dhaka",
                  type: "Air Cargo & Express",
                  hub: "Cargo Village, Hazrat Shahjalal Int'l Airport",
                  icon: Plane,
                },
                {
                  id: "chattogram",
                  number: "2",
                  name: "Customs House, Chattogram",
                  type: "Ocean Seaport & CFS",
                  hub: "Chittagong Port Terminal & Off-Docks",
                  icon: Anchor,
                },
                {
                  id: "icd",
                  number: "3",
                  name: "Customs House ICD, Dhaka",
                  type: "Rail & Dry Port",
                  hub: "Kamalapur Inland Container Depot",
                  icon: Building2,
                },
                {
                  id: "pangaon",
                  number: "4",
                  name: "Customs House, Pangaon, Dhaka",
                  type: "River Container Terminal",
                  hub: "Pangaon Inland Container Terminal (PICT)",
                  icon: Ship,
                },
                {
                  id: "benapole",
                  number: "5",
                  name: "Customs House Benapole, Jashore",
                  type: "Land Border Port",
                  hub: "Benapole Land Customs Station",
                  icon: Truck,
                },
              ].map((house) => {
                const Icon = house.icon;
                return (
                  <div
                    key={house.id}
                    className="group p-4 sm:p-4.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-brand-gold/50 transition-all duration-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-brand-gold/15 text-brand-gold border border-brand-gold/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-brand-gold">
                            {house.number}.
                          </span>
                          <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                            {house.name}
                          </h3>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                          {house.hub}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 shrink-0 group-hover:border-brand-gold/40 group-hover:text-brand-gold transition-colors">
                      {house.type}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right Column: High-Impact Instant Quotation Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-white/10 to-white/[0.03] backdrop-blur-xl border border-brand-gold/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider block font-mono">
                  Express Freight Desk
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Freight Quotation
                </h3>
                <p className="text-xs text-slate-300">
                  Instant FCL/LCL ocean slots, air cargo booking, or customs clearance inquiry.
                </p>
              </div>

              {/* Fast Highlights */}
              <div className="space-y-2 text-xs text-slate-200 border-y border-white/10 py-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero-Demurrage document pre-check</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>2–4 Hour quote turnaround guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct port liaison at all 5 customs houses</span>
                </div>
              </div>

              {/* Instant Call / Email Hotlines */}
              <div className="space-y-2 text-xs">
                <a
                  href="tel:+8801711775280"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-brand-gold/20 border border-white/10 hover:border-brand-gold/40 text-white transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Phone className="w-4 h-4 text-brand-gold" />
                    <span className="font-mono text-xs">+880 1711-775280</span>
                  </div>
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                    Call Direct
                  </span>
                </a>

                <a
                  href="mailto:info@toponbd.com"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-brand-gold/20 border border-white/10 hover:border-brand-gold/40 text-white transition-all group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-4 h-4 text-brand-gold" />
                    <span className="text-xs">info@toponbd.com</span>
                  </div>
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                    Email Desk
                  </span>
                </a>
              </div>

              {/* Action Button */}
              <Link
                href="/contact#quote"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold via-brand-goldLight to-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:shadow-xl transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Request Quotation</span>
                <ArrowRight className="w-4 h-4 text-brand-navy group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
