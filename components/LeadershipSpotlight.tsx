import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Quote,
  Sparkles,
  CheckCircle2,
  Mail,
  Building2,
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest shadow-gold">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Executive Leadership Address</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            Message from the{" "}
            <span className="text-brand-gold">Group Chief Executive Officer</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: CEO Portrait & Credentials */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden bg-[#071930] p-6 sm:p-7 border border-brand-gold/40 shadow-2xl shadow-black/60">
              {/* Circular Leader Photo & Identification */}
              <div className="flex flex-col items-center text-center space-y-4 mb-6">
                <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-brand-gold via-amber-200/60 to-brand-gold/30 shadow-2xl shadow-brand-gold/20">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-brand-navy shadow-inner group">
                    <Image
                      src="/images/profile/profile01.jpg"
                      alt="Md. Abdullah Al Mamun - Group Chief Executive Officer, Top On Group"
                      fill
                      sizes="(max-width: 768px) 224px, 224px"
                      priority
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
                    Executive Stewardship
                  </span>
                  <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
                    Md. Abdullah Al Mamun
                  </h3>
                  <p className="text-sm text-slate-300 font-medium">
                    Group Chief Executive Officer
                  </p>
                  <p className="text-xs text-brand-gold/80 font-semibold uppercase tracking-wider">
                    Top On Group
                  </p>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3 pt-2 border-t border-white/10 text-xs">
                <div className="flex items-start space-x-3 text-slate-200">
                  <Briefcase className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">15+ Years Supply Chain Mastery</strong>
                    <span className="text-slate-400">Former Executive Director at Walton Group</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <Award className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">CSCM (USA) Certified</strong>
                    <span className="text-slate-400">Certified Supply Chain Manager</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <GraduationCap className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Chartered Accountancy &amp; Tax</strong>
                    <span className="text-slate-400">CACC Course Completed &amp; Certified ITP (Income Tax Practitioner)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Trade Governance &amp; Compliance</strong>
                    <span className="text-slate-400">NBR Customs Tariff &amp; Port Clearance Advisory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Letter Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
            {/* Salutation Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#071930]/90 backdrop-blur-xl border border-white/10 space-y-5 shadow-xl">
              <div className="flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-wider">
                <Quote className="w-4 h-4 text-brand-gold rotate-180" />
                <span>Executive Letter</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                Dear Valued Clients, Partners and Stakeholders,
              </h3>

              <div className="space-y-4 text-slate-300">
                <p className="text-white text-base sm:text-lg font-medium leading-relaxed">
                  It is my privilege to welcome you to <strong className="text-brand-gold">Top On Group</strong>.
                </p>

                <p>
                  Our journey is built on a strong foundation of experience, trust, and commitment. With a heritage rooted in Bangladesh’s customs and trade sector, we have continuously evolved by expanding our capabilities across customs clearance and forwarding, freight forwarding and logistics, international trade, trading and supply, agriculture, and fisheries.
                </p>

                <p>
                  At Top On Group, we believe that sustainable success is built on <strong className="text-white">quality, integrity, innovation, and service excellence</strong>. In an increasingly competitive and rapidly changing business environment, we are committed to embracing modern technology, smart solutions, and professional business practices to create greater value for our clients and business partners.
                </p>

                <p>
                  As we move forward, our focus remains on building a stronger, more integrated, and sustainable business platform. We are committed to strengthening our capabilities, empowering our people, maintaining the highest standards of professionalism, and building long-term relationships based on trust and mutual success.
                </p>

                <p>
                  I extend my sincere appreciation to our valued clients, partners, employees, and stakeholders for their continued trust and support. Together, we will continue to pursue responsible growth and contribute to the development of Bangladesh&apos;s trade, logistics, agriculture, and commercial sectors.
                </p>
              </div>

              {/* Purpose Quote Callout */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-gold/15 via-[#040D1A] to-[#040D1A] border border-brand-gold/30 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold block">
                  Our Unwavering Purpose
                </span>
                <p className="text-sm sm:text-base text-white font-medium italic leading-relaxed">
                  &quot;We remain committed to our purpose — to deliver Quality, serve with dedication, and Together, we strive for excellence for our people and sustainable progress for our nation.&quot;
                </p>
              </div>

              {/* Signature Section */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-serif text-xl font-bold text-white">
                    Md. Abdullah Al Mamun
                  </div>
                  <div className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                    Group Chief Executive Officer
                  </div>
                  <div className="text-xs text-slate-400">
                    Top On Group
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    href="/about/message"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Read Full Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-medium text-xs transition-colors"
                  >
                    <span>Contact CEO Desk</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
