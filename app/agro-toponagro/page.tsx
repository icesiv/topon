import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Fish,
  Waves,
  Droplets,
  Snowflake,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Warehouse,
  ArrowRight,
  Sparkles,
  Truck,
  Scale,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Top On-Agro Farm | Commercial Fisheries & Sustainable Aquaculture",
  description:
    "Top On-Agro Farm is the specialized commercial fisheries and aquaculture arm of Top On Group in Bangladesh. Operating high-density aerated fish farming, certified hatcheries, cold-chain logistics, and bulk wholesale fish supply.",
  keywords: [
    "Top On-Agro Farm",
    "Top On Group Fisheries",
    "Bangladesh Commercial Aquaculture",
    "Fish Farming Dhaka",
    "Fish Hatchery Bangladesh",
    "Cold Chain Fish Storage Bangladesh",
    "Bulk Fish Supplier Bangladesh",
  ],
};

export default function TopOnAgroPage() {
  const fisheriesCategories = [
    {
      icon: Fish,
      title: "Commercial Aquaculture & High-Density Pond Farming",
      description:
        "Large-scale commercial production of premium freshwater fish species (Tilapia, Pangasius, Rui, Katla, Carp, and Catfish) utilizing advanced aeration wheels, biofloc tanks, and strict biosecurity protocols.",
      features: [
        "Continuous dissolved oxygen & water quality monitoring",
        "100% antibiotic-free, nutritionally optimized feed",
        "High-density sustainable biofloc & earthen pond ecosystems",
      ],
    },
    {
      icon: Waves,
      title: "Certified Hatchery & Fingerling Broodstock Breeding",
      description:
        "State-of-the-art breeding facilities cultivating genetically superior, pathogen-free fish fries and fingerlings with high survival rates and rapid growth conversion.",
      features: [
        "Selective broodstock breeding & genetic vitality assurance",
        "Hygienic larval incubation & nursery pond management",
        "Consistent nationwide fingerling supply for commercial farms",
      ],
    },
    {
      icon: Snowflake,
      title: "Cold-Chain Preservation & Cryo-Fish Logistics",
      description:
        "Immediate post-harvest temperature control, hygienic grading bays, and insulated refrigerated fleet preserving texture, flavor, and prime market value from pond to city.",
      features: [
        "Rapid ice-slurry chilling directly at harvest point",
        "Multi-temperature refrigerated transit with GPS temperature logs",
        "Zero-degradation cold chain to major Dhaka wholesale hubs",
      ],
    },
    {
      icon: Truck,
      title: "Bulk Wholesale & Institutional Fish Distribution",
      description:
        "Reliable B2B bulk supply contracts for superstore chains, corporate hospitality, food processors, and national fish markets with scheduled daily deliveries.",
      features: [
        "Standardized weight sorting and transparent batch grading",
        "Direct-from-farm wholesale pricing with trade billing support",
        "Contract farming & guaranteed volume supply agreements",
      ],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Dark Navy Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Fish className="w-3.5 h-3.5" />
            <span>Top On Group Fisheries &amp; Aquaculture Division</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Top On-Agro Farm: <br />
            <span className="text-gold-light-gradient">Commercial Fisheries &amp; Sustainable Aquaculture</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            &quot;Pioneering sustainable aquaculture and premium freshwater fisheries across Bangladesh.&quot; High-tech biofloc ponds, certified hatchery breeding, cold chain integrity, and bulk fish distribution.
          </p>
        </div>
      </section>

      {/* 2. Overview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/agro_farm.jpg"
                alt="Top On-Agro Farm commercial aquaculture ponds and fish harvest team"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Commercial Aquaculture Excellence
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  Scientific pond management, high-efficiency aeration, and rapid cold chain dispatch.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Fisheries Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              Delivering Premium Quality Freshwater Fish at Scale
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              <strong>Top On-Agro Farm</strong> operates exclusively in the commercial fisheries and aquaculture sector. We merge scientific aquatic biosecurity, continuous water oxygenation, and eco-friendly feed formulations to produce superior freshwater table fish and healthy fingerlings.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Backed by our dedicated cold-chain transport fleet, we ensure zero spoilage from the moment fish leave our harvest nets until they reach superstores, institutional processors, and wholesale terminals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <Waves className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">Aerated Ponds &amp; Hatcheries</div>
                <p className="text-[11px] text-slate-500">Continuous dissolved oxygen &amp; clean water bio-control</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <Snowflake className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">Cold-Chain Fleet</div>
                <p className="text-[11px] text-slate-500">Ice-slurry harvest chilling &amp; refrigerated transit</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Fisheries Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Specialized Portfolios</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
            Fisheries <span className="text-gold-gradient">Sectors &amp; Operations</span>
          </h2>
          <p className="mt-2 text-slate-600 text-sm">
            End-to-end commercial capabilities spanning fingerling breeding, pond cultivation, and nationwide wholesale distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fisheriesCategories.map((cat, idx) => {
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

      {/* 4. Fisheries Inquiries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuoteForm />
      </section>
    </div>
  );
}
