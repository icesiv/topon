import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Cpu,
  FlaskConical,
  Scissors,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  FileCheck2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Top On-Tech | Import, Export & General Trading Division",
  description:
    "Top On-Tech is the international trading and sourcing arm of Top On Group in Bangladesh. Specializing in industrial machinery, chemical supplies, textile fabrics, and electronics.",
  keywords: [
    "Top On-Tech",
    "Import Export Bangladesh",
    "Industrial Machinery Sourcing",
    "Chemical Raw Materials Bangladesh",
    "Textile Fabric Trading",
    "B2B Global Sourcing",
  ],
};

export default function TopOnTechPage() {
  const tradingCategories = [
    {
      icon: Cpu,
      title: "Industrial Machinery & Spare Parts",
      description:
        "Procurement of heavy manufacturing equipment, automated assembly spares, precision CNC parts, and processing components from verified global manufacturers.",
      features: [
        "Factory-direct warranties & inspection certificates",
        "Original OEM spare parts verification",
        "Custom technical specs matching and procurement",
      ],
    },
    {
      icon: FlaskConical,
      title: "Chemical & Raw Material Supply",
      description:
        "Sourcing high-grade industrial chemicals, polymers, pigments, and process reagents adhering to international MSDS standards and environmental protocols.",
      features: [
        "Full MSDS & Certificate of Analysis (COA)",
        "Temperature & humidity controlled cargo handling",
        "Bulk container and drum logistics support",
      ],
    },
    {
      icon: Scissors,
      title: "Textile Fabrics & Production Inputs",
      description:
        "Supplying Bangladesh’s booming RMG and textile sector with high-performance woven & knit fabrics, specialized yarns, and garment accessories.",
      features: [
        "Oeko-Tex & GOTS compliant fabric sourcing",
        "Color fastness and GSM laboratory validation",
        "Rapid sample turnaround for production trials",
      ],
    },
    {
      icon: Layers,
      title: "Electronics & Customized Sourcing",
      description:
        "Comprehensive B2B sourcing of consumer electronics, testing equipment, LED drivers, and bespoke commercial merchandise for corporate distributors.",
      features: [
        "Strict quality assurance testing prior to dispatch",
        "Direct manufacturer pricing & LC negotiation",
        "Custom branding and OEM packaging support",
      ],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Contrasting Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>Top On Group Trading Division • Est. Jan 2024</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Top On-Tech: <br />
            <span className="text-gold-light-gradient">Global Sourcing &amp; General Trading</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            &quot;Trust is our most valuable trading asset.&quot; Facilitating seamless international procurement of industrial components, chemicals, fabrics, and tech hardware.
          </p>
        </div>
      </section>

      {/* 2. On-Ground Engineering Inspection Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/trading_sourcing.jpg"
                alt="Top On-Tech Bangladeshi quality engineers checking machinery blueprints and chemicals"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Quality &amp; Technical Verification
                </span>
                <p className="text-xs text-slate-200">
                  Every consignment undergoes rigorous physical and lab testing before clearing Bangladesh ports.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Procurement Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Direct Global Manufacturer Alliances Without Middlemen
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Top On-Tech eliminates procurement bottlenecks for Bangladeshi factories and commercial houses. We negotiate directly with Tier-1 manufacturers across China, India, Europe, and Southeast Asia to secure competitive factory-gate pricing, verified OEM warranties, and full regulatory compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <Globe2 className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">Global Sourcing</div>
                <p className="text-[11px] text-slate-500">Tier-1 certified suppliers</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <FileCheck2 className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">LC &amp; Trade Finance</div>
                <p className="text-[11px] text-slate-500">Complete documentary support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sourcing Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Product Portfolios</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
            Specialized <span className="text-gold-gradient">Trading Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tradingCategories.map((cat, idx) => {
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

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  {cat.features.map((f, fIdx) => (
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

      {/* 4. Quote & Sourcing RFQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider">
              Procurement Request
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Looking for a Specific Industrial Component or Raw Material?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Submit your technical specifications or Bills of Material. Our global trading desk will source factory-grade quotes and timeline estimates.
            </p>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md text-xs text-slate-700 space-y-2">
              <div className="font-bold text-[#0B2240]">Why Trade with Top On-Tech?</div>
              <div>• Direct factory price negotiations</div>
              <div>• Full customs documentation and HS compliance</div>
              <div>• Flexible LC and commercial arrangements</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm defaultDivision="topontech" />
          </div>
        </div>
      </section>
    </div>
  );
}
