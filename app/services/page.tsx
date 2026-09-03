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
  Fish,
  Waves,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Warehouse,
  Boxes,
  Compass,
} from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "Our Services | Trading, Customs C&F, Freight Forwarding & Agro-Fisheries",
  description:
    "Explore the comprehensive trade, customs clearing, international shipping, and commercial agro-fisheries services of Top On Group across Bangladesh.",
  keywords: [
    "Top On Group Services",
    "Bangladesh Import Export Trading",
    "Top On-Tech Machinery Sourcing",
    "Top Express Limited C&F Agent",
    "Chittagong Port Customs Clearance",
    "Daily Shipping & Logistics Freight Forwarding",
    "Ocean Freight Bangladesh",
    "Air Cargo HSIA Dhaka",
    "Top On-Agro Farm Fisheries",
    "Aquaculture Bangladesh",
  ],
};

export default function ServicesPage() {
  const servicePillars = [
    {
      id: "trading",
      division: "Top On-Tech",
      badge: "Import, Export & Trading Enterprise",
      title: "General Trading, Industrial Machinery & Raw Material Sourcing",
      subtitle:
        "Connecting Bangladeshi industrial manufacturing plants and commercial enterprises with verified global suppliers across Asia, Europe, and North America.",
      image: "/images/trading_sourcing.jpg",
      imageAlt: "Top On-Tech industrial machinery and chemical sourcing inspection in Bangladesh warehouse",
      locationTag: "Dhaka & Regional Industrial Zones (Gazipur, Savar, EPZs)",
      icon: Building2,
      href: "/trading-topontech",
      features: [
        {
          title: "Heavy Machinery & Industrial Equipment",
          desc: "Procurement of specialized manufacturing plants, CNC machinery, textile & RMG production lines, and OEM-certified mechanical spares.",
        },
        {
          title: "Industrial Chemicals & Raw Materials",
          desc: "Bulk sourcing and compliant supply of specialty industrial reagents, polymers, dyes, processing aids, and high-purity chemicals.",
        },
        {
          title: "Pre-Shipment Quality Control & Inspection",
          desc: "End-to-end technical inspection, specification audits, and supplier verification to ensure 100% compliance before dispatch.",
        },
        {
          title: "Bilateral Import & Export Trade Support",
          desc: "Structured trade financing coordination, LC documentation compliance, and door-to-factory delivery throughout Bangladesh.",
        },
      ],
      highlights: ["Direct Factory Sourcing", "OEM Warranty Compliance", "Turnkey Procurement Frameworks"],
    },
    {
      id: "customs",
      division: "Top Express Limited",
      badge: "Customs Clearing & Forwarding (C&F) Company",
      title: "Licensed Customs Clearance, Duty Advisory & Port C&F Brokerage",
      subtitle:
        "Licensed customs brokerage delivering precision documentation, duty classification, and zero-demurrage cargo release across major maritime, air, and land ports in Bangladesh.",
      image: "/images/customs_cnf.jpg",
      imageAlt: "Top Express Limited licensed C&F agents conducting customs inspection at Chittagong Port",
      locationTag: "Chittagong Port, Mongla Port, Dhaka Airport (HSIA) & Dhaka ICD",
      icon: FileCheck2,
      href: "/express-topexpress",
      features: [
        {
          title: "Port Customs Clearance (Chittagong & Mongla)",
          desc: "Rapid on-dock processing, physical cargo survey facilitation, and streamlined delivery orders at Bangladesh's primary maritime gateways.",
        },
        {
          title: "Air Cargo Customs Clearance (HSIA Dhaka)",
          desc: "Accelerated clearance for urgent shipments, time-sensitive raw materials, pharmaceuticals, and spare parts at Dhaka Air Cargo Village.",
        },
        {
          title: "NBR HS Code Classification & Tariff Advisory",
          desc: "Expert tariff assessment under National Board of Revenue (NBR) regulations, duty optimization, and Statutory Regulatory Order (SRO) benefit application.",
        },
        {
          title: "Advance Bill of Entry & Demurrage Prevention",
          desc: "Pre-arrival documentation and automated customs filing to secure immediate container discharge and prevent port demurrage fees.",
        },
      ],
      highlights: ["Licensed C&F Broker", "100% NBR Compliance", "Zero-Demurrage Strategy"],
    },
    {
      id: "freight",
      division: "Daily Shipping & Logistics",
      badge: "Freight Forwarding Company",
      title: "Multimodal Ocean & Air Freight Forwarding with Global Reach",
      subtitle:
        "Comprehensive international cargo shipping linking Bangladesh's export-import sectors to worldwide trade lanes through bonded partnerships with leading container carriers and airlines.",
      image: "/images/hero_port.jpg",
      secondaryImage: "/images/air_cargo.jpg",
      imageAlt: "Daily Shipping & Logistics vessel operations and container terminals at Chittagong Port",
      locationTag: "Global Feeder Hubs (Singapore, Colombo, Port Klang) & HSIA Cargo Terminal",
      icon: Ship,
      href: "/logistics-dailyshipping",
      features: [
        {
          title: "Ocean Freight Forwarding (FCL & LCL)",
          desc: "Guaranteed container slots on principal global shipping lines covering major trade lanes between Asia, the Middle East, Europe, and the Americas.",
        },
        {
          title: "Expedited Air Cargo Logistics",
          desc: "Priority scheduled air charters and consolidated air cargo via Hazrat Shahjalal International Airport (HSIA) for time-critical shipments.",
        },
        {
          title: "Inland Container Transportation & Linehaul",
          desc: "Dedicated heavy trailer fleet transporting containers securely between seaport gates, inland container depots (ICDs), and factory gates.",
        },
        {
          title: "Multimodal Project Cargo & Heavy Lift",
          desc: "Specialized breakbulk, flat-rack container handling, and oversized project cargo transport for national infrastructure initiatives.",
        },
      ],
      highlights: ["20,000+ Containers Managed", "Dedicated Feeder Slots", "End-to-End Multimodal Tracking"],
    },
    {
      id: "agro",
      division: "Top On-Agro Farm",
      badge: "Commercial Fisheries & Aquaculture",
      title: "Sustainable Commercial Fish Farming, Hatcheries & Cold-Chain Supply",
      subtitle:
        "Modern scientific aquaculture infrastructure delivering protein security, high-vitality fingerlings, and premium harvest directly to national wholesale markets in Bangladesh.",
      image: "/images/agro_farm.jpg",
      imageAlt: "Top On-Agro Farm commercial fish harvesting, modern aerated ponds, and cold storage logistics in Bangladesh",
      locationTag: "Commercial Farms, Hatcheries & Dhaka Wholesale Distribution Hubs",
      icon: Fish,
      href: "/agro-toponagro",
      features: [
        {
          title: "Commercial High-Density Pond Aquaculture",
          desc: "Large-scale scientific farming of Tilapia, Pangasius, Rui, Katla, and Carp utilizing mechanical paddlewheel aeration and biosecure water controls.",
        },
        {
          title: "Certified Hatchery & Fingerling Breeding",
          desc: "Selective broodstock conditioning producing pathogen-free fingerlings with high survival rates for commercial aquaculture growers.",
        },
        {
          title: "Cold-Chain Logistics & Temperature Control",
          desc: "Refrigerated transport fleet preserving peak freshness from harvest ponds to central distribution hubs without chemical preservatives.",
        },
        {
          title: "Nationwide Wholesale Market Supply",
          desc: "Consistent bulk supply catering to major metropolitan wholesale markets in Dhaka (Karwan Bazar, Jatrabari) and institutional food processors.",
        },
      ],
      highlights: ["100% Antibiotic-Free Nutrition", "Modern Aerated Pond Systems", "Direct-to-Market Cold Chain"],
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Hero - Contrasting Dark Navy Segment with Gold Accents */}
      <section className="relative py-20 lg:py-24 dark-segment border-b border-brand-gold/20 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[30rem] h-[30rem] bg-[#133560]/50 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#C5A85C_1.2px,transparent_1.2px)] [background-size:32px_32px] opacity-[0.08] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-5">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>End-to-End Enterprise Capabilities in Bangladesh</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Comprehensive Trade, Logistics &amp;{" "}
            <span className="text-gold-light-gradient block mt-1 sm:mt-2">
              Agro-Fisheries Solutions
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            Top On Group integrates four specialized operating divisions to deliver clockwork execution across
            international sourcing, licensed customs clearing, global maritime shipping, and sustainable commercial aquaculture in Bangladesh.
          </p>

          {/* Quick Jump Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <a
              href="#trading"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy text-slate-200 font-semibold border border-white/15 transition-all backdrop-blur-md"
            >
              1. Top On-Tech (Trading)
            </a>
            <a
              href="#customs"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy text-slate-200 font-semibold border border-white/15 transition-all backdrop-blur-md"
            >
              2. Top Express Limited (Customs C&amp;F)
            </a>
            <a
              href="#freight"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy text-slate-200 font-semibold border border-white/15 transition-all backdrop-blur-md"
            >
              3. Daily Shipping (Freight Forwarding)
            </a>
            <a
              href="#agro"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-navy text-slate-200 font-semibold border border-white/15 transition-all backdrop-blur-md"
            >
              4. Top On-Agro Farm (Fisheries)
            </a>
          </div>
        </div>
      </section>

      {/* 2. Four Comprehensive Business Divisions Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {servicePillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isReversed = idx % 2 === 1;

          return (
            <section
              key={pillar.id}
              id={pillar.id}
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
            >
              {/* Top Banner Header */}
              <div className="p-6 sm:p-8 lg:p-10 border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3.5 rounded-2xl bg-[#0B2240] text-brand-gold shadow-md">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-brand-goldDark uppercase tracking-wider">
                          Division: {pillar.division}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-medium text-slate-500">
                          {pillar.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240] mt-0.5">
                        {pillar.title}
                      </h2>
                    </div>
                  </div>

                  <Link
                    href={pillar.href}
                    className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xs shrink-0 self-start md:self-center"
                  >
                    <span>Division Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                  {pillar.subtitle}
                </p>
              </div>

              {/* Content Grid: Bangladesh Perspective Image & Service Capabilities */}
              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left/Right Media Column */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? "lg:order-2" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group h-72 sm:h-96 w-full">
                    <Image
                      src={pillar.image}
                      alt={pillar.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={idx === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-[#0B2240]/20 to-transparent" />

                    {/* Bangladesh Location Tag Badge */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-medium shadow-md">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        <span className="truncate">{pillar.locationTag}</span>
                      </div>
                    </div>

                    {/* Image Caption Overline */}
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <p className="text-xs text-brand-gold font-semibold uppercase tracking-wider">
                        Bangladesh Operational Footprint
                      </p>
                      <p className="text-xs sm:text-sm text-slate-100 font-medium line-clamp-2 mt-0.5">
                        {pillar.imageAlt}
                      </p>
                    </div>
                  </div>

                  {/* Highlights Badges Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {pillar.highlights.map((badge, bIdx) => (
                      <div
                        key={bIdx}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[#0B2240] text-xs font-semibold"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-goldDark" />
                        <span>{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Left/Right Detailed Capabilities Column */}
                <div className={`lg:col-span-6 space-y-4 ${isReversed ? "lg:order-1" : ""}`}>
                  <h3 className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    Key Core Services &amp; Operational Deliverables
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillar.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-brand-gold/60 hover:bg-white transition-all shadow-2xs group"
                      >
                        <h4 className="font-bold text-[#0B2240] text-sm group-hover:text-brand-goldDark transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. Bangladesh Strategic Infrastructure & Network Advantage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2240] rounded-3xl p-8 sm:p-12 text-white border border-brand-gold/30 shadow-2xl relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-gold/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                National Logistics Footprint
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
                Why Bangladesh Enterprises Rely On Top On Group
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                From Chittagong Port container terminals to Dhaka ICD and regional EPZs, we provide seamless domestic integration backed by deep regulatory familiarity with the National Board of Revenue (NBR) and international carrier alliances.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <h3 className="font-bold text-white text-base">Port-Centric Agility</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Permanent field presence at Customs House Chattogram, Mongla Port, and Dhaka ICD Kamalapur for accelerated cargo release.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <h3 className="font-bold text-white text-base">Verified Global Sourcing</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Established factory partnerships across China, India, Europe, and the US delivering OEM quality industrial parts and chemicals.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <h3 className="font-bold text-white text-base">HSIA Air Cargo Priority</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Priority air freight handling via Hazrat Shahjalal International Airport for fast-turnaround export RMG samples and critical spares.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="w-9 h-9 rounded-xl bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <h3 className="font-bold text-white text-base">Cold-Chain Food Security</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Modern biofloc aquaculture and temperature-controlled distribution delivering antibiotic-free fresh fish nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Direct RFQ Proposal Section */}
      <section id="quote" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-navy text-xs font-semibold">
                <Clock className="w-3.5 h-3.5 text-brand-goldDark" />
                <span>Rapid Response Commercial Desk</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0B2240] leading-tight">
                Request a Formal Commercial Proposal or RFQ
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you require industrial plant machinery sourcing, licensed Chittagong customs clearance, international ocean freight forwarding, or bulk commercial aquaculture supply, our commercial specialists are ready to serve you.
              </p>

              <div className="pt-2 space-y-3 text-xs text-slate-600">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent tariff estimations &amp; HS code advisory</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct contact with licensed supply chain managers</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Corporate headquarters located at Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <QuoteForm defaultDivision="both" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
