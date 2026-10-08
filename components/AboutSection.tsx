import Image from "next/image";
import {
  FileCheck2,
  Ship,
  Globe,
  PackageCheck,
  Leaf,
  Fish,
  Cpu,
  Quote,
  ArrowRight,
} from "lucide-react";

const SECTORS = [
  { label: "Customs Clearing & Forwarding (CNG)", shortLabel: "Customs & C&F", icon: FileCheck2 },
  { label: "Freight Forwarding Logistics", shortLabel: "Freight Logistics", icon: Ship },
  { label: "Trading, Import, Sourcing & Distribution", shortLabel: "Trading & Sourcing", icon: Globe },
  { label: "Business Advisory Professional Services", shortLabel: "Business Advisory", icon: PackageCheck },
  { label: "Agriculture", shortLabel: "Agro Ventures", icon: Leaf },
  { label: "Fisheries", shortLabel: "Fisheries & Aqua", icon: Fish },
];

const MILESTONES = [
  {
    year: "1990",
    title: "Shahabuddin Enterprise",
    text: "Our journey began as a government-approved Customs Clearing & Forwarding business, built on practical experience and strong relationships.",
  },
  {
    year: "Evolution",
    title: "Top Express Limited",
    text: "Transitioned from a sole proprietorship into a limited company — a milestone reflecting our commitment to professionalism and corporate growth.",
  },
  {
    year: "Today",
    title: "Top On Group",
    text: "A diversified, family-owned conglomerate delivering end-to-end excellence across logistics, trade, agriculture, and fisheries.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative py-14 sm:py-20 lg:py-28 bg-white text-slate-900 overflow-hidden"
    >
      {/* Ambient background */}
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-brand-navy/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0B2240 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* 1. MOBILE ABOUT EXPERIENCE (< lg) - Compact & Ergonomic Redesign */}
        {/* ========================================================================= */}
        <div className="block lg:hidden space-y-9">
          {/* Mobile Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-px w-6 bg-brand-gold" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-brand-goldDark">
                About Top On Group
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy leading-tight">
              Three decades of trust,{" "}
              <span className="bg-gold-gradient bg-clip-text text-transparent">
                built to last.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-brand-navy font-semibold">Top On Group</strong> is a
              diversified, family-owned business group in Bangladesh with an expanding presence
              across six core sectors — combining 30+ years of practical expertise with modern
              technology and a service-first approach.
            </p>
          </div>

          {/* Mobile Group Logo Showcase Card */}
          <div className="relative h-44 sm:h-52 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 shadow-md overflow-hidden flex items-center justify-center p-6">
            <div className="absolute w-[85%] aspect-square rounded-full border border-brand-gold/15 pointer-events-none" />
            <div className="absolute w-[60%] aspect-square rounded-full border border-brand-gold/25 pointer-events-none" />
            <div className="absolute w-44 h-44 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

            <Image
              src="/images/logo/topon-group.png"
              alt="Top On Group"
              width={400}
              height={180}
              priority
              quality={100}
              sizes="85vw"
              className="relative w-auto max-h-24 sm:max-h-28 object-contain drop-shadow-sm"
            />
          </div>

          {/* Mobile 6 Core Sectors Grid (2-Column Compact Grid) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                Core Operating Sectors (6)
              </span>
              <span className="text-[10px] font-mono text-brand-goldDark font-semibold">
                Diversified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SECTORS.map(({ label, shortLabel, icon: Icon }) => (
                <div
                  key={label}
                  className="flex flex-col justify-between p-3 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-2 hover:border-brand-gold/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy leading-snug">
                      {shortLabel}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Heritage Timeline (Connected Left Vertical Track) */}
          <div className="space-y-4 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-navy">
                Our Heritage &amp; Evolution
              </span>
              <span className="text-[10px] font-mono text-brand-goldDark font-semibold">
                1990 &mdash; Today
              </span>
            </div>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-brand-gold before:via-brand-navy before:to-brand-gold/60">
              {MILESTONES.map((m, i) => (
                <div key={m.title} className="relative">
                  {/* Node on vertical line */}
                  <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-brand-navy" />
                  </div>

                  {/* Milestone Content Box */}
                  <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-goldDark font-mono text-[10px] font-bold">
                        {m.year}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        Phase 0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-brand-navy">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Commitment Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-navy-gradient p-5 shadow-navy border border-white/10 space-y-3.5">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-gold/20 rounded-full blur-2xl pointer-events-none" />
            <Quote className="absolute top-3 right-3 h-12 w-12 text-white/5 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-1.5 text-brand-gold text-[10px] font-bold uppercase tracking-[0.15em]">
              <Cpu className="h-3.5 w-3.5" />
              <span>Our Vision &amp; Core Commitment</span>
            </div>

            <p className="relative z-10 font-serif text-lg text-white leading-snug">
              &ldquo;To understand our clients, deliver with integrity, and build relationships that last.&rdquo;
            </p>

            <p className="relative z-10 text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3">
              Top On Group combines modern technology, strong governance, and a service-first approach to create lasting value across supply chains, international trade, and local production.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DESKTOP ABOUT EXPERIENCE (lg and up) - Unaltered Original Layout */}
        {/* ========================================================================= */}
        <div className="hidden lg:block">
          {/* ───────── Intro: Story + Visual ───────── */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — Story */}
            <div className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-3">
                <span className="h-px w-10 bg-brand-gold" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-brand-goldDark">
                  About Top On Group
                </span>
              </div>

              <h2
                id="about-heading"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-[1.15]"
              >
                Three decades of trust,{" "}
                <span className="bg-gold-gradient bg-clip-text text-transparent">
                  built to last.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-justify">
                <strong className="text-brand-navy font-semibold">Top On Group</strong> is a
                diversified, family-owned business group in Bangladesh with an expanding presence
                across six core sectors — combining decades of practical expertise with modern
                technology and a service-first approach.
              </p>

              {/* Sector chips */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SECTORS.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200/90 bg-white/80 backdrop-blur-sm px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-gold/50 hover:shadow-gold"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold transition-colors duration-300 group-hover:bg-brand-gold group-hover:text-brand-navy">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Group Logo Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative h-[360px] sm:h-[460px] rounded-[2rem] border border-slate-200/90 bg-gradient-to-br from-white via-slate-50 to-amber-50/40 shadow-xl overflow-hidden flex items-center justify-center group">
                {/* Decorative rings & glow */}
                <div className="absolute w-[85%] aspect-square rounded-full border border-brand-gold/15 pointer-events-none" />
                <div className="absolute w-[60%] aspect-square rounded-full border border-brand-gold/25 pointer-events-none" />
                <div className="absolute w-72 h-72 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-125" />

                <Image
                  src="/images/logo/topon-group.png"
                  alt="Top On Group"
                  width={500}
                  height={220}
                  priority
                  quality={100}
                  sizes="(max-width: 1024px) 80vw, 420px"
                  className="relative w-[78%] max-w-[420px] h-auto object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* ───────── Heritage Timeline ───────── */}
          <div className="mt-24 sm:mt-28">
            <div className="relative grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Connector line (desktop) */}
              <div className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />

              {MILESTONES.map((m, i) => (
                <div key={m.title} className="relative group flex flex-col">
                  <div className="flex md:justify-center mb-5">
                    <span className="relative z-10 inline-flex h-14 items-center justify-center rounded-full border border-brand-gold/40 bg-white px-5 font-mono text-xs font-semibold uppercase tracking-wider text-brand-goldDark shadow-gold transition-colors duration-300 group-hover:bg-brand-navy group-hover:text-brand-gold">
                      {m.year}
                    </span>
                  </div>
                  <div className="flex-1 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/80 p-6 sm:p-7 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-brand-gold/40">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-lg font-bold text-brand-navy">{m.title}</h3>
                      {i < MILESTONES.length - 1 && (
                        <ArrowRight className="hidden md:block h-4 w-4 text-brand-gold/70 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed text-justify">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ───────── Commitment Banner ───────── */}
          <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-[2rem] bg-navy-gradient p-8 sm:p-12 lg:p-14 shadow-navy">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-navyLight/60 rounded-full blur-3xl pointer-events-none" />
            <Quote className="absolute top-8 right-8 h-20 w-20 text-white/5" />

            <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-[0.2em]">
                  <Cpu className="h-4 w-4" />
                  <span>Our Modern Vision &amp; Core Commitment</span>
                </div>
                <p className="font-serif text-2xl sm:text-3xl text-white leading-snug">
                  &ldquo;To understand our clients, deliver with integrity, and build relationships
                  that last.&rdquo;
                </p>
              </div>
              <p className="lg:col-span-5 text-sm sm:text-base text-slate-300 leading-relaxed lg:border-l lg:border-white/10 lg:pl-10 text-justify">
                As we look toward the future, Top On Group remains committed to responsible growth,
                operational excellence, innovation, and creating sustainable value for our clients,
                partners, employees, and the wider economy. We combine modern technology, strong
                governance, and a service-first approach to create lasting value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
