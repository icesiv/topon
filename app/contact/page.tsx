import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Building2,
  Ship,
  Headphones,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Contact Us & Port Desks | Top On Group",
  description:
    "Get in touch with Top On Group headquarters in Dhaka and operations desks at Chittagong & Mongla ports. Submit RFQs for Top On-Tech trading and Daily Shipping logistics.",
  keywords: [
    "Contact Top On Group",
    "Chittagong Port Office",
    "Dhaka Sourcing Desk",
    "Top On Group Email Phone",
    "Freight Forwarding Quote Dhaka",
  ],
};

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
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
              <h2 className="text-xl font-bold font-serif text-[#0B2240] flex items-center space-x-2.5">
                <Building2 className="w-5 h-5 text-brand-navy" />
                <span>Corporate Headquarters</span>
              </h2>

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Head Office</strong>
                    <span className="text-slate-600">Dhaka, Bangladesh</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Corporate Communications</strong>
                    <a href="mailto:info@topongroup.com" className="text-brand-navy hover:text-brand-gold font-semibold">
                      info@topongroup.com
                    </a>
                    {" / "}
                    <a href="mailto:contact@topongroup.com" className="text-brand-navy hover:text-brand-gold font-semibold">
                      contact@topongroup.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">Operating Hours</strong>
                    <span className="text-slate-600">Monday – Saturday: 09:00 AM – 06:00 PM (GMT+6)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Port Desks */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-base font-bold font-serif text-[#0B2240] flex items-center space-x-2.5">
                <Ship className="w-5 h-5 text-brand-navy" />
                <span>Port Operations Desks</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0B2240] block">Chittagong Port &amp; Custom House Desk</strong>
                  <p className="text-slate-600 mt-0.5">
                    Agrabad Commercial Area, Chattogram, Bangladesh. Handling ocean vessel manifests, container unstuffing, and customs release.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0B2240] block">Mongla Port &amp; Khulna Liaison Desk</strong>
                  <p className="text-slate-600 mt-0.5">
                    Specialized bulk cargo, project equipment, and south-western corridor transshipment coordination.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <strong className="text-[#0B2240] block">Air Freight Desk - DAC Cargo Village</strong>
                  <p className="text-slate-600 mt-0.5">
                    Hazrat Shahjalal International Airport, Kurmitola, Dhaka. Expedited customs clearing and bonded warehouse handling.
                  </p>
                </div>
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
