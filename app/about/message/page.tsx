import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  FileDown,
  Quote,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Message from Entrepreneur | Md. Abdullah Al Mamun - Top On Group",
  description:
    "An executive message from Md. Abdullah Al Mamun (CSCM, ITP, CACC), Owner and Visionary Leader of Top On Group, outlining our commitment to trade integrity, zero-demurrage logistics, and sustainable aquaculture in Bangladesh.",
};

export default function MessageFromEntrepreneurPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Header Hero */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Address</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Message from the <span className="text-gold-light-gradient">Entrepreneur</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            A personal commitment to regulatory excellence, operational discipline, and enduring enterprise value from our founder and visionary leader.
          </p>
        </div>
      </section>

      {/* 2. Main Executive Letter & Portrait */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Portrait & Credentials Box */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-2xl group">
                <Image
                  src="/images/leadership_mamun.jpg"
                  alt="Md. Abdullah Al Mamun - Owner & Visionary Leader, Top On Group"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040C18]/90 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <h3 className="text-xl font-bold font-serif text-white">
                      Md. Abdullah Al Mamun
                    </h3>
                    <p className="text-xs text-brand-gold font-medium">
                      Owner &amp; Visionary Leader, Top On Group
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified Credentials Grid */}
              <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-brand-gold/30 space-y-3.5 shadow-lg">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Executive Credentials</span>
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center space-x-2.5">
                    <Briefcase className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Ex-Executive Director, Walton Group</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Award className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>CSCM (Certified Supply Chain Manager, USA)</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>CACC (Chartered Accountancy Course Completed)</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>ITP (Income Tax Practitioner, Recognized by NBR)</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Track Record:</span>
                  <span className="font-bold text-white font-mono">20,000+ Containers Handled</span>
                </div>
              </div>

              {/* Quick Contact Desk */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-900">Executive Office Liaison:</div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                  <span>info@toponbd.com</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                  <span>+880 1971-867661</span>
                </div>
              </div>
            </div>

            {/* Right Column: The Full Executive Letter */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider">
                <Quote className="w-3 h-3 text-brand-goldDark" />
                <span>Founder&apos;s Letter</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0B2240] leading-tight">
                Architecting Enduring Value in <br />
                <span className="text-gold-gradient">Global Trade &amp; National Enterprise</span>
              </h2>

              <p className="font-medium text-slate-900 italic border-l-4 border-brand-gold pl-4 py-1">
                &quot;When we founded Top On Group, our guiding conviction was simple yet uncompromising: international trade must not be held hostage by uncertainty, bureaucratic demurrage, or compliance risks.&quot;
              </p>

              <p>
                Having spent over 15 years directing enterprise-scale supply chains—most notably as Executive Director at Walton Group—I experienced first-hand how the difference of just 24 hours at Chittagong Port or a single misclassified HS code can disrupt an entire industrial assembly line.
              </p>

              <p>
                In an increasingly interconnected yet volatile global economic landscape, Bangladeshi businesses cannot afford fragmented or opaque logistical intermediaries. That realization inspired the birth of <strong>Top On Group</strong>.
              </p>

              <div className="my-8 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h4 className="text-base font-bold text-[#0B2240] font-serif">
                  The Four Cardinal Pillars of Our Governance:
                </h4>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Demurrage as a Discipline:</strong> We view customs clearance not as an administrative chore, but as a time-critical mission where minutes matter and demurrage is unacceptable.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                    <span>
                      <strong>Direct Factory Procurement:</strong> Through Top On-Tech, we eliminate layers of middlemen to import precision industrial plant machinery and certified chemicals directly with OEM warranties.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                    <span>
                      <strong>100% Regulatory Integrity:</strong> Full compliance with the National Board of Revenue (NBR), port authorities, and foreign exchange regulations protects our corporate partners from costly audits or penalties.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0 mt-0.5" />
                    <span>
                      <strong>Sustainable National Food Security:</strong> With Top On-Agro Farm, we apply that same operational discipline to commercial fisheries, high-density biofloc farming, and cold chain distribution.
                    </span>
                  </li>
                </ul>
              </div>

              <p>
                To our prospective and existing corporate partners, financial institutions, and overseas principals: when you work with Top On Group, you do not just hire a service provider. You gain an executive partner whose reputation is on the line with every consignment.
              </p>

              <p>
                We promise punctuality, financial transparency, and unyielding compliance: <strong>On Time. Every Time.</strong>
              </p>

              {/* Signature Block */}
              <div className="pt-6 border-t border-slate-200">
                <div className="space-y-1">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-[#0B2240]">
                    Md. Abdullah Al Mamun
                  </div>
                  <div className="text-xs font-semibold text-brand-goldDark uppercase tracking-wider">
                    Owner &amp; Visionary Leader, Top On Group
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    CSCM (USA) | ITP (NBR) | CACC | Ex-Executive Director, Walton Group
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Request Executive Meeting</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="/topon-profile.pdf"
                  download
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-800 hover:border-brand-gold hover:text-brand-navy font-bold text-xs uppercase tracking-wider transition-colors flex items-center space-x-2"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Corporate Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Strategic Divisions Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="dark-segment rounded-3xl p-8 sm:p-12 border border-brand-gold/30 space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Explore Top On Group&apos;s Operating Wings
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Discover how Top On-Tech, Top Express Limited, Daily Shipping &amp; Logistics, and Top On-Agro Farm deliver coordinated enterprise excellence.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-gold hover:bg-brand-goldLight transition-colors"
            >
              View All Services
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
