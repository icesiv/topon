import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, GraduationCap, ShieldCheck, ArrowRight, Quote } from "lucide-react";

export default function LeadershipSpotlight() {
  return (
    <section className="py-20 dark-segment relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#133560]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Portrait & Credentials Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden bg-[#071933] p-6 sm:p-8 border border-brand-gold/40 shadow-2xl shadow-black/40">
              {/* Leader Photo */}
              <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden mb-6 border border-brand-gold/30 shadow-lg">
                <Image
                  src="/images/leadership_mamun.jpg"
                  alt="Mr. Md. Abdullah Al Mamun - Owner & Visionary Leader of Top On Group"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071933] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block">
                    Owner & Visionary Leader
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif">
                    Md. Abdullah Al Mamun
                  </h3>
                  <p className="text-xs text-slate-300">Top On Group</p>
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="space-y-3 pt-2 border-t border-slate-700/80 text-xs">
                <div className="flex items-start space-x-3 text-slate-200">
                  <Briefcase className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">15+ Years Supply Chain Mastery</strong>
                    <span className="text-slate-400">Former Executive Director at Walton Group</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <Award className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">CSCM (USA) Certified</strong>
                    <span className="text-slate-400">Certified Supply Chain Manager</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <GraduationCap className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Chartered Accountancy & Tax</strong>
                    <span className="text-slate-400">CACC Course Completed & Certified ITP (Income Tax Practitioner)</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Trade Governance & Compliance</strong>
                    <span className="text-slate-400">Advisory on VAT, Customs Tariff & Port Clearance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <span>Executive Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white tracking-tight leading-tight">
              &quot;Sustainable success is built through <span className="text-gold-light-gradient">integrity, accountability</span>, and long-term partnerships.&quot;
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Under the strategic stewardship of <strong>Mr. Md. Abdullah Al Mamun</strong>, Top On Group has evolved into a premier trade and multimodal freight forwarding conglomerate. Combining deep corporate supply chain acumen honed across Fortune-scale manufacturing with hands-on customs and regulatory fluency.
              </p>
              <p>
                Having directed high-volume international sourcing networks, port clearances, and end-to-end supply chain infrastructure for Bangladesh&apos;s largest conglomerates, Mr. Mamun instills a culture of rigorous compliance, zero-compromise quality, and clockwork precision across every division.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#091F3C] border-l-4 border-brand-gold text-xs sm:text-sm text-slate-200 italic flex items-start space-x-3 shadow-lg">
              <Quote className="w-6 h-6 text-brand-gold flex-shrink-0 rotate-180 mt-0.5" />
              <span>
                &quot;Global commerce requires more than just moving goods; it demands absolute regulatory accuracy, trust at every transit point, and an unwavering commitment to delivering on time, every time.&quot;
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about#leadership"
                className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold flex items-center space-x-2"
              >
                <span>Read Full Leadership Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl border border-white/30 text-white hover:text-brand-gold hover:border-brand-gold/60 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Connect With Leadership Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
