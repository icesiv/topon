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
      year: "2010 - 2023",
      title: "Corporate Supply Chain Leadership",
      description:
        "Mr. Md. Abdullah Al Mamun served at top corporate executive tiers, including Executive Director at Walton Group, managing multi-million-dollar import/export and supply chain portfolios.",
    },
    {
      year: "Jan 2024",
      title: "Establishment of Top On-Tech",
      description:
        "Launched as a specialized cross-border trading house focusing on industrial machinery, chemical procurement, and premium textiles sourcing for leading industrial sectors in Bangladesh.",
    },
    {
      year: "Sep 2025",
      title: "Establishment of Daily Shipping & Logistics",
      description:
        "Incorporated as an agile, compliance-first freight forwarding and C&F arm, leveraging cumulative expertise of over 20,000+ containers handled.",
    },
    {
      year: "Present & Future",
      title: "Integrated Conglomerate Expansion",
      description:
        "Solidifying unified trade finance, sourcing, ocean freight, and customs brokerage under the Top On Group banner with a focus on digitized trade.",
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
      <section id="milestones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
            <span>Growth &amp; Heritage</span>
          </div>
          <h2 className="text-3xl font-bold font-serif text-[#0B2240]">
            Key Corporate <span className="text-gold-gradient">Milestones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 relative overflow-hidden hover:shadow-xl hover:border-brand-gold transition-all"
            >
              <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                {m.year}
              </div>
              <h3 className="text-base font-bold text-[#0B2240] font-serif">{m.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{m.description}</p>
            </div>
          ))}
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
