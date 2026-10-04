import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  Ship,
  Headphones,
  Plane,
  Anchor,
  Truck,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Us & Port Desks | Top On Group",
  description:
    "Get in touch with Top On Group headquarters in Dhaka, Chattogram office, and customs desks at Dhaka Airport, Chattogram, ICD Kamalapur, Pangaon, and Benapole. Submit RFQs for trading and logistics.",
  keywords: [
    "Contact Top On Group",
    "Chittagong Port Office",
    "Dhaka Sourcing Desk",
    "Top On Group Email Phone",
    "Freight Forwarding Quote Dhaka",
    "Customs House Desks",
  ],
};

const customsDesks = [
  {
    num: "1",
    name: "Customs House, Airport, Dhaka",
    icon: Plane,
  },
  {
    num: "2",
    name: "Customs House, Chattogram",
    icon: Anchor,
  },
  {
    num: "3",
    name: "Customs House ICD, Dhaka",
    icon: Building2,
  },
  {
    num: "4",
    name: "Customs House, Pangaon, Dhaka",
    icon: Ship,
  },
  {
    num: "5",
    name: "Customs House Benapole, Jashore",
    icon: Truck,
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Contrasting Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" />
            <span>Direct Commercial Access</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Connect with Our <br />
            <span className="text-gold-light-gradient">Corporate &amp; Port Desks</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            Our trade specialists and port operations managers are available for advance supply chain consultations and instant rate inquiries.
          </p>
        </div>
      </section>

      {/* 2. Direct Channels & Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Head Office & Chattogram Office Cards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <div>
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono mb-1">
                  Our Locations
                </span>
                <h2 className="text-xl font-bold font-serif text-[#0B2240] flex items-center space-x-2.5">
                  <Building2 className="w-5 h-5 text-brand-navy" />
                  <span>Corporate Offices</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                {/* Head Office */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-[#0B2240] font-bold font-serif text-sm">
                    <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Head Office (Dhaka)</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed pl-6">
                    House: Ka/11 (1st Floor), Matbar Bari Moasjid Road, Jagannathpur, Bashundhara, Vatara, Dhaka-1229
                  </p>
                  <div className="pl-6 pt-1 flex items-center space-x-2 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <a href="tel:+8801711775280" className="hover:text-brand-navy font-semibold font-mono">
                      01711-775280
                    </a>
                  </div>
                </div>

                {/* Chattogram Office */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-[#0B2240] font-bold font-serif text-sm">
                    <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Chattogram Office</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed pl-6">
                    Suraiya Mansion (6th Floor), 30 Agrabad Commercial Area, Chattogram-4100
                  </p>
                  <div className="pl-6 pt-1 flex items-center space-x-2 text-slate-700">
                    <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <a href="tel:+8801711775281" className="hover:text-brand-navy font-semibold font-mono">
                      01711-775281
                    </a>
                  </div>
                </div>

                {/* Email & Operating Hours */}
                <div className="pt-2 space-y-2.5 border-t border-slate-100">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Corporate Communications</strong>
                      <a href="mailto:info@toponbd.com" className="text-brand-navy hover:text-brand-gold font-semibold">
                        info@toponbd.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block">Operating Hours</strong>
                      <span className="text-slate-600">Sat – Thu: 10:00 AM – 07:00 PM (GMT+6)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Port & Airport Desks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <div>
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono mb-1">
                  Customs &amp; Ports
                </span>
                <h3 className="text-xl font-bold font-serif text-[#0B2240] flex items-center space-x-2.5">
                  <Ship className="w-5 h-5 text-brand-navy" />
                  <span>Port &amp; Airport Operations Desks</span>
                </h3>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                {customsDesks.map((desk) => {
                  const Icon = desk.icon;
                  return (
                    <div
                      key={desk.num}
                      className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-brand-gold/50 transition-colors flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-brand-navy/5 text-brand-navy border border-brand-navy/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-brand-navy" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[#0B2240] text-sm font-semibold block leading-tight">
                          {desk.num}. {desk.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <QuoteForm defaultDivision="both" />
          </div>
        </div>
      </section>
    </div>
  );
}
