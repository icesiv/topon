import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function CorporateStrategy() {
  const points = [
    "Single-window accountability for procurement and freight",
    "Dedicated on-ground desks at Chittagong Port, Mongla Port, and DAC Airport",
    "Licensed customs clearing and tariff advisory under Bangladeshi laws",
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Image with Bangladeshi Executive Boardroom */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
            <div className="relative h-[320px] sm:h-[400px] w-full">
              <Image
                src="/images/boardroom_team.jpg"
                alt="Top On Group executive leadership and trade strategy team in Dhaka"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Executive Strategy Desk • Dhaka HQ
                </span>
                <p className="text-xs text-slate-200">
                  Cross-border trade economists &amp; logistics strategists analyzing global shipping routes.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Narrative & Highlights */}
          <div className="lg:col-span-6 space-y-5 text-left">
            <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0B2240] text-brand-gold text-xs font-bold uppercase tracking-wider">
              Integrated Trade Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0B2240] leading-tight">
              Architecting an Integrated <br />
              <span className="text-gold-gradient">Supply Chain Platform</span>
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              By uniting cross-border procurement power with seasoned freight forwarding operations, Top On Group eliminates traditional trade frictions. Our clients gain single-window accountability: from overseas manufacturer contracting and quality control, to ocean transit, port customs clearance, and local factory delivery.
            </p>

            <div className="space-y-2.5 text-xs text-slate-700 pt-2">
              {points.map((point, index) => (
                <div key={index} className="flex items-center space-x-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase text-[#0B2240] hover:text-brand-gold transition-colors"
              >
                <span>Read Corporate Story &amp; Vision</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
