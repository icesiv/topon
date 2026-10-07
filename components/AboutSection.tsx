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
  { label: "Customs Clearing & Forwarding (CNG)", icon: FileCheck2 },
  { label: "Freight Forwarding Logistics", icon: Ship },
  { label: "Trading, Import, Sourcing & Distribution", icon: Globe },
  { label: "Business Advisory Professional Services", icon: PackageCheck },
  { label: "Agriculture", icon: Leaf },
  { label: "Fisheries", icon: Fish },
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
      className="relative py-20 sm:py-28 bg-white text-slate-900 overflow-hidden"
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
    </section>
  );
}
