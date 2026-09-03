import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Target,
  Compass,
  ShieldCheck,
  Clock,
  Scale,
  Cpu,
  Waves,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  FileDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mission, Vision & Values | Top On Group",
  description:
    "Explore the guiding mission, long-term corporate vision, and non-negotiable core values that steer Top On Group in international trade, freight forwarding, customs C&F, and sustainable aquaculture.",
};

const values = [
  {
    number: "01",
    title: "Uncompromising Integrity & 100% Compliance",
    desc: "Strict adherence to national customs laws, NBR regulations, international maritime codes, and commercial ethics. We believe trust is forged through transparency, accurate declarations, and zero compromise.",
    icon: ShieldCheck,
    tag: "Regulatory Ethics",
  },
  {
    number: "02",
    title: "Clockwork Precision & Timeliness",
    desc: "In global trade, timing dictates profitability. Our operations are engineered around zero demurrage, same-day electronic bill-of-entry submissions, and punctuality: On Time. Every Time.",
    icon: Clock,
    tag: "Execution Discipline",
  },
  {
    number: "03",
    title: "Fiduciary Accountability & Transparency",
    desc: "Transparent landed costings, itemized freight estimates, and verified overseas procurement invoices with zero hidden surcharges or post-clearance surprises.",
    icon: Scale,
    tag: "Commercial Trust",
  },
  {
    number: "04",
    title: "Technological Modernization",
    desc: "Leveraging digital customs clearance, cloud cargo tracking, and modern aquaculture bio-telemetry to eliminate manual friction and deliver predictable results.",
    icon: Cpu,
    tag: "Digital Trade",
  },
  {
    number: "05",
    title: "Sustainability, Safety & Biosecurity",
    desc: "Committed to eco-friendly cold-chain operations, safe maritime cargo handling, and 100% antibiotic-free, biofloc commercial aquaculture preserving natural ecosystems.",
    icon: Waves,
    tag: "Sustainable Production",
  },
  {
    number: "06",
    title: "Empowering National Industrialization",
    desc: "Strengthening Bangladesh's manufacturing backbone by ensuring steady access to global plant machinery, chemical inputs, raw materials, and fresh food security.",
    icon: TrendingUp,
    tag: "Nation Building",
  },
];

export default function MissionVisionValuesPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Header Hero */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guiding Principles &amp; Tenets</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Mission, Vision &amp; <span className="text-gold-light-gradient">Core Values</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            The strategic North Star and fundamental operating convictions that govern every trade decision, container consignment, and corporate partnership at Top On Group.
          </p>
        </div>
      </section>

      {/* 2. Vision & Mission Cards with Rich Photography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-brand-gold transition-all duration-300">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/hero_port.jpg"
                alt="Top On Group Vision - Global Maritime Connectivity"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/45 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4 text-brand-gold" />
                <span>Our Vision</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  The Benchmark of Trust in South Asian Commerce
                </h2>
              </div>
            </div>

            <div className="p-7 sm:p-9 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To be South Asia&apos;s most trusted, legally compliant, and technologically integrated trading, logistics, and agro-fisheries conglomerate—renowned for transforming complex cross-border supply chains into seamless, clockwork execution.
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Setting the national standard for zero-demurrage port clearance.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Bridging premier overseas industrial manufacturers with Bangladesh factories.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col justify-between group hover:border-brand-gold transition-all duration-300">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <Image
                src="/images/trading_sourcing.jpg"
                alt="Top On Group Mission - Quality industrial procurement and logistics execution"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040C18] via-[#040C18]/45 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-brand-gold text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-brand-gold" />
                <span>Our Mission</span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  Empowering Enterprise Through Reliability
                </h2>
              </div>
            </div>

            <div className="p-7 sm:p-9 space-y-4 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                To empower industrial progress and national prosperity across Bangladesh through dependable international sourcing, verified factory procurement, compliant customs brokerage, clockwork freight forwarding, and wholesome sustainable aquaculture.
              </p>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Uncompromising adherence to our operational motto: <strong>On Time. Every Time.</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Protecting corporate partners through total regulatory and tariff precision.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 6 Core Corporate Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>The Six Pillars of Conduct</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight">
            Our Core <span className="text-gold-gradient">Corporate Values</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            These values are not decorative statements—they are the active standard against which every consignment, contract, and employee is measured.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="group relative p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-lg shadow-slate-900/5 hover:border-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Top Accent Strip */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-goldLight via-brand-gold to-[#0B2240]" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0B2240] text-brand-gold">
                      {val.number}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-goldDark">
                      {val.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-[#0B2240] flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[#0B2240] group-hover:text-brand-goldDark transition-colors leading-snug">
                    {val.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-[#0B2240]">
                  <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                  <span>Institutional Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Commitment Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/30 shadow-2xl text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Experience Value-Driven Supply Chain Partnerships
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
            Partner with a corporate group that combines global reach with uncompromising ethical accountability.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-brand-goldLight transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              href="/about/journey"
              className="px-6 py-3 rounded-xl border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Our Corporate Story
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
