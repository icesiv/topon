import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Quote,
  Mail,
  Phone,
  FileText,
  BadgeCheck,
} from "lucide-react";

export default function LeadershipSpotlight() {
  return (
    <section className="py-20 sm:py-28 bg-[#040D1A] text-white relative overflow-hidden border-y border-brand-gold/20 select-none">
      {/* Glow Effects */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #C5A85C 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest shadow-gold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Executive Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Leadership of{" "}
            <span className="text-brand-gold">Top On Group</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed text-justify">
            Guided by visionary stewardship, ethical governance, and over 15 years of industry-defining supply chain mastery.
          </p>
        </div>

        {/* CEO Portrait & Credentials Spotlight Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#081C36] to-[#040D1A] p-8 sm:p-10 lg:p-12 border border-brand-gold/40 shadow-2xl shadow-black/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: CEO Portrait & Identification */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-5">
              <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-brand-gold via-amber-200/70 to-brand-gold/30 shadow-2xl shadow-brand-gold/25">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-brand-navy shadow-inner group">
                  <Image
                    src="/images/profile/profile01.jpg"
                    alt="Md. Abdullah Al Mamun - Group Chief Executive Officer, Top On Group"
                    fill
                    sizes="(max-width: 768px) 224px, 224px"
                    priority
                    quality={80}
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
                  Executive Stewardship
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif tracking-tight">
                  Md. Abdullah Al Mamun
                </h3>
                <p className="text-sm sm:text-base text-brand-goldLight font-medium">
                  Group Chief Executive Officer
                </p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Top On Group
                </p>
              </div>

              {/* Direct Secretarial Contact */}
              <div className="pt-2 flex items-center justify-center space-x-4 text-xs text-slate-300">
                <a
                  href="mailto:mamun@toponbd.com"
                  className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-gold" />
                  <span>mamun@toponbd.com</span>
                </a>
              </div>
            </div>

            {/* Right: Credentials Grid & Direct CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center space-x-2">
                  <BadgeCheck className="w-4 h-4 text-brand-gold" />
                  <span>Verified Credentials &amp; Leadership Record</span>
                </span>
              </div>

              {/* 4 Core Credentials Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#0B2240]/80 border border-brand-gold/20 hover:border-brand-gold/40 transition-colors flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-brand-gold/15 text-brand-gold shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm font-semibold">
                      15+ Years SCM Mastery
                    </strong>
                    <span className="text-slate-400 text-xs leading-relaxed block mt-0.5">
                      Former Executive Director at Walton Group &amp; Head of C&amp;F Operations
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B2240]/80 border border-brand-gold/20 hover:border-brand-gold/40 transition-colors flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-brand-gold/15 text-brand-gold shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm font-semibold">
                      CSCM (USA) Certified
                    </strong>
                    <span className="text-slate-400 text-xs leading-relaxed block mt-0.5">
                      Certified Supply Chain Manager from ISCEA, USA
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B2240]/80 border border-brand-gold/20 hover:border-brand-gold/40 transition-colors flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-brand-gold/15 text-brand-gold shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm font-semibold">
                      Chartered Accountancy &amp; Tax
                    </strong>
                    <span className="text-slate-400 text-xs leading-relaxed block mt-0.5">
                      CACC Course Completed (ICAB) &amp; Certified ITP (NBR Authorized)
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B2240]/80 border border-brand-gold/20 hover:border-brand-gold/40 transition-colors flex items-start space-x-3">
                  <div className="p-2 rounded-xl bg-brand-gold/15 text-brand-gold shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm font-semibold">
                      Trade Governance
                    </strong>
                    <span className="text-slate-400 text-xs leading-relaxed block mt-0.5">
                      NBR Customs Tariff, Port Operations &amp; Corporate Compliance
                    </span>
                  </div>
                </div>
              </div>

              {/* Concise Executive Statement */}
              <div className="p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 flex items-start space-x-3 text-slate-200">
                <Quote className="w-5 h-5 text-brand-gold rotate-180 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm italic leading-relaxed text-slate-100 text-justify">
                  &quot;At Top On Group, our purpose is clear: to deliver quality, serve with dedication, and drive sustainable progress for our people, our partners, and our nation.&quot;
                </p>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/about/message"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Read Message from Group CEO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/about/about-ceo"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium text-xs transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-brand-gold" />
                  <span>About the Group CEO</span>
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium text-xs transition-colors"
                >
                  <span>Contact CEO Secretariat</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
