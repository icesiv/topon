import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Target,
  Compass,
  Award,
  Briefcase,
  GraduationCap,
  Building2,
  Ship,
  Truck,
  Fish,
  Globe2,
  FileCheck2,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  FileDown,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Top On Group & Leadership",
  description:
    "Discover the story, vision, and leadership behind Top On Group. Spearheaded by Md. Abdullah Al Mamun (CSCM, ITP, CACC) with 15+ years of strategic supply chain expertise in Bangladesh.",
  keywords: [
    "About Top On Group",
    "Md. Abdullah Al Mamun",
    "Bangladesh Conglomerate",
    "Supply Chain Leadership",
    "Top On-Tech History",
    "Daily Shipping Logistics Mission",
  ],
};

export default function AboutPage() {
  const milestones = [
    {
      step: "01",
      year: "2010 – 2023",
      phase: "Executive Leadership",
      title: "Corporate Supply Chain Leadership",
      description:
        "Founder Md. Abdullah Al Mamun (CSCM, ITP, CACC) directed premier corporate supply chains, serving at executive tiers including Executive Director at Walton Group, stewarding multi-million-dollar import/export operations.",
      metric: "20,000+ Containers Handled",
      icon: Award,
    },
    {
      step: "02",
      year: "2024",
      phase: "Trading Enterprise",
      title: "Establishment of Top On-Tech",
      description:
        "Launched as a specialized cross-border trading enterprise focusing on direct procurement of industrial machinery, precision plant spares, and specialty chemical sourcing for Bangladesh's core manufacturing hubs.",
      metric: "Global Machinery & Chemicals",
      icon: Building2,
    },
    {
      step: "03",
      year: "2024 – 2025",
      phase: "Logistics & Customs",
      title: "Top Express Ltd. & Daily Shipping",
      description:
        "Incorporated licensed Customs Clearing and Forwarding (C&F) with Top Express Limited across Chittagong Port and Dhaka ICD, coupled with Daily Shipping & Logistics for international ocean and air freight carriage.",
      metric: "Licensed Port C&F & Shipping",
      icon: FileCheck2,
    },
    {
      step: "04",
      year: "2025",
      phase: "Agro-Fisheries",
      title: "Founding of Top On-Agro Farm",
      description:
        "Diversified into commercial aquaculture with high-density aerated fish farming, certified broodstock hatcheries, and temperature-controlled cold chain logistics supplying metropolitan wholesale fish markets.",
      metric: "Scientific Aquaculture & Cold Chain",
      icon: Fish,
    },
    {
      step: "05",
      year: "Present & Horizon",
      phase: "Conglomerate Synergy",
      title: "Integrated Conglomerate Expansion",
      description:
        "Unifying international trade, port customs clearance, ocean shipping, and commercial agro-fisheries under the Top On Group central governance framework with a relentless commitment to reliability: On Time. Every Time.",
      metric: "On Time. Every Time.",
      icon: Globe2,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Page Header - Contrasting Navy Blue Segment */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Corporate Story &amp; Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Architecting Global Trade with <br />
            <span className="text-gold-light-gradient">Integrity &amp; Precision</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            Top On Group represents a new benchmark of trust, compliance, and efficiency in Bangladesh&apos;s trade and logistics landscape.
          </p>
        </div>
      </section>

      {/* 2. Overview & Philosophy with Boardroom Image */}
      <section id="overview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
              An End-to-End Bridge Connecting International Markets
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Headquartered in Dhaka with active operational desks at Chittagong and Mongla ports, <strong>Top On Group</strong> was established to eliminate the systemic friction in cross-border supply chains.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We operate two primary divisions: <strong>Top On-Tech</strong>, serving as an agile import, export, and international sourcing house; and <strong>Daily Shipping &amp; Logistics</strong>, delivering freight forwarding, multimodal transit, and licensed C&amp;F operations.
            </p>
            <div className="pt-2">
              <a
                href="/topon-profile.pdf"
                download
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Complete Company Profile</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/boardroom_team.jpg"
                alt="Top On Group executive leadership meeting in Dhaka"
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2240] font-serif">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be South Asia&apos;s most trusted, compliant, and technologically integrated trading and supply chain conglomerate, known for setting the standard in commercial ethics and clockwork freight execution.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#0B2240] font-serif">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Empowering industrial growth across Bangladesh through dependable global sourcing, transparent pricing, zero-demurrage customs clearance, and clockwork logistics: On Time. Every Time.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Message from Founder - Contrasting Navy Blue Segment */}
      <section id="leadership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/40 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-brand-gold/30 shadow-lg">
                <Image
                  src="/images/leadership_mamun.jpg"
                  alt="Md. Abdullah Al Mamun - Owner & Visionary Leader"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top"
                />
              </div>

              <div className="pt-2 text-left space-y-2 text-xs text-slate-300 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Ex-Executive Director, Walton Group</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>CSCM (USA) Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>CACC (CA Course Completed)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>ITP (Income Tax Practitioner)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 text-slate-300 text-sm leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-700/60 pt-6 lg:pt-0 lg:pl-10">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
                <span>Message from the Entrepreneur</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Building Enduring Value in Global Commerce
              </h2>
              <p>
                &quot;When we founded Top On Group, our guiding conviction was simple: global trade should not be burdened by uncertainty. Having spent over 15 years directing enterprise-scale supply chains, I have witnessed first-hand how timing, regulatory mastery, and ethical partnerships dictate business success.&quot;
              </p>
              <p>
                &quot;Top On-Tech and Daily Shipping &amp; Logistics were architected to give our clients an unfair advantage: uncompromising sourcing quality coupled with zero-demurrage freight execution. We measure our growth by the long-term prosperity of our corporate partners.&quot;
              </p>
              <p className="italic text-brand-gold font-medium">
                &quot;We promise punctuality, compliance, and excellence on every consignment.&quot;
              </p>
              <div className="pt-2">
                <strong className="text-white block font-serif text-base">Md. Abdullah Al Mamun</strong>
                <span className="text-xs text-slate-400">Owner &amp; Visionary Leader, Top On Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Milestones */}
      <section id="milestones" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Ambient Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] bg-brand-gold/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Corporate Roadmap &amp; Growth Story</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight">
            Key Corporate <span className="text-gold-gradient">Milestones</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl mx-auto">
            From seasoned corporate supply chain leadership to an integrated multi-sector conglomerate: a chronological journey of disciplined expansion across Bangladesh.
          </p>
        </div>

        {/* Alternating Executive Timeline */}
        <div className="relative z-10">
          {/* Central Connecting Spine Line (Desktop) */}
          <div className="hidden md:block absolute top-6 bottom-6 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-gold via-slate-300 to-brand-gold/40" />

          {/* Left Connecting Line (Mobile) */}
          <div className="md:hidden absolute top-6 bottom-6 left-6 w-0.5 bg-gradient-to-b from-brand-gold via-slate-300 to-brand-gold/40" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Left Side (Desktop) */}
                  <div
                    className={`w-full md:w-1/2 pl-14 md:pl-0 ${
                      isEven
                        ? "md:pr-12 md:text-right"
                        : "md:order-2 md:pl-12 md:text-left"
                    }`}
                  >
                    <div className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-900/5 hover:border-brand-gold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden text-left">
                      {/* Top Accent Gold Bar */}
                      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-goldLight via-brand-gold to-[#0B2240]" />

                      {/* Header in Card */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-goldDark text-xs font-bold uppercase tracking-wider">
                          <Icon className="w-3.5 h-3.5" />
                          <span>{m.phase}</span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          Phase {m.step}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B2240] group-hover:text-brand-goldDark transition-colors leading-snug">
                        {m.title}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {m.description}
                      </p>

                      {/* Bottom Metric Tag */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center space-x-2 text-xs font-semibold text-[#0B2240]">
                        <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
                        <span>{m.metric}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node (Medallion) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#0B2240] border-4 border-white shadow-xl flex items-center justify-center text-brand-gold ring-4 ring-brand-gold/25 group-hover:scale-110 transition-transform">
                      <span className="font-mono font-bold text-xs">{m.step}</span>
                    </div>
                  </div>

                  {/* Opposing Side (Desktop: Large Year & Key Highlight) */}
                  <div
                    className={`hidden md:flex md:w-1/2 flex-col justify-center ${
                      isEven
                        ? "md:pl-12 md:text-left"
                        : "md:order-1 md:pr-12 md:text-right"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-xs">
                        <Calendar className="w-3.5 h-3.5 text-brand-goldDark" />
                        <span>{m.year}</span>
                      </div>
                      <div className="text-2xl lg:text-3xl font-bold font-serif text-[#0B2240] mt-1">
                        {m.year}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-goldDark">
                        {m.phase}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/30 space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Partner with Top On Group Today
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Experience corporate supply chain solutions engineered for dependability and speed.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-brand-goldLight transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
