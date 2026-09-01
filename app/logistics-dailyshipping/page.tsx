import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

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
      {/* 1. Hero - Contrasting Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Ship className="w-3.5 h-3.5" />
            <span>Top On Group Logistics Arm • Est. Sep 2025</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Daily Shipping &amp; Logistics: <br />
            <span className="text-gold-light-gradient">20,000+ Containers of Operational Mastery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            Delivering technology-driven freight forwarding, precision customs clearing (C&amp;F), and end-to-end multimodal transport across Bangladesh&apos;s maritime corridors.
          </p>
        </div>
      </section>

      {/* 2. On-Ground Port C&F Team Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/customs_cnf.jpg"
                alt="Daily Shipping Bangladeshi customs clearance officers at Chittagong Port terminal"
                fill
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

      {/* 4. Port Desks & RFQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider">
              Freight Quotation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Instant Container &amp; Customs Inquiries
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Contact our port coordination desks for ocean freight slot bookings, import clearing checklists, or export forwarding documentation.
            </p>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-navy flex-shrink-0" />
                <span>Chittagong Port Liaison: Agrabad Commercial Area, Chattogram</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-navy flex-shrink-0" />
                <span>Mongla Port Desk: Khulna City / Port Complex</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-navy flex-shrink-0" />
                <span>Dhaka Airport Air Freight Desk: Cargo Village, HSIA</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm defaultDivision="dailyshipping" />
          </div>
        </div>
      </section>
    </div>
  );
}
