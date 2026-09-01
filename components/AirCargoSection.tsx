import Image from "next/image";
import { Plane } from "lucide-react";

export default function AirCargoSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text and Features */}
        <div className="lg:col-span-6 space-y-5">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy text-xs font-bold uppercase tracking-wider">
            <Plane className="w-3.5 h-3.5" />
            <span>Expedited Air &amp; Port Freight</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
            Time-Critical Air Freight at <br />
            <span className="text-gold-gradient">Hazrat Shahjalal Int&apos;l Airport (DAC)</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            When industrial machinery parts, pharmaceutical inputs, or high-value garments require urgent delivery, our air cargo logistics team operates directly at Dhaka Airport Cargo Village with prioritized customs release and bonded haulage.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#0B2240]">Next Flight Out</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Expedited cargo booking</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-[#0B2240]">Airport C&amp;F Release</div>
              <div className="text-[11px] text-slate-500 mt-0.5">24/7 dedicated clearance desk</div>
            </div>
          </div>
        </div>

        {/* Right: Bangladeshi Air Freight Image */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
          <div className="relative h-[300px] sm:h-[360px] w-full">
            <Image
              src="/images/air_cargo.jpg"
              alt="Bangladeshi air cargo handlers and logistics managers at Dhaka Airport tarmac"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
            <div className="text-white space-y-0.5">
              <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
                Dhaka Airport Cargo Village
              </span>
              <p className="text-xs text-slate-200">
                On-tarmac air freight handlers coordinating priority consignments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
