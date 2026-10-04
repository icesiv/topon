import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Award,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Quote,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Building2,
  FileText,
  BadgeCheck,
  ExternalLink,
  Target,
  Compass,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import LeadershipGallery from "@/components/LeadershipGallery";

export const metadata: Metadata = {
  title: "Message from the Group CEO | Md. Abdullah Al Mamun - Top On Group",
  description:
    "Official executive address to clients, partners, and stakeholders from Md. Abdullah Al Mamun, Group Chief Executive Officer of Top On Group.",
};

const STRATEGIC_PILLARS = [
  {
    title: "Quality & Service Excellence",
    desc: "Delivering reliable, flawless operational execution across clearing, freight, indenting, and agriculture.",
    icon: Target,
  },
  {
    title: "Integrity & Compliance",
    desc: "Unwavering commitment to NBR customs laws, international maritime standards, and ethical trade governance.",
    icon: ShieldCheck,
  },
  {
    title: "Innovation & Technology",
    desc: "Embracing smart digital systems, data visibility, and modern logistics technology for maximum client value.",
    icon: Lightbulb,
  },
  {
    title: "Sustainable Partnerships",
    desc: "Fostering long-term mutual prosperity with clients, port authorities, overseas partners, and community stakeholders.",
    icon: HeartHandshake,
  },
];

export default function MessageFromCEOPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900 select-none">
      {/* 1. Executive Hero Section */}
      <section className="relative py-20 lg:py-24 dark-segment border-b border-brand-gold/20 overflow-hidden">
        {/* Glow & Backdrop */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          {/* Breadcrumb / Category Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider shadow-gold">
            <Quote className="w-3.5 h-3.5 rotate-180" />
            <span>Official Executive Address</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            Message from the{" "}
            <span className="text-gold-light-gradient">Group Chief Executive Officer</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            A personal address to our valued clients, global partners, and stakeholders on our foundational commitments, operational excellence, and shared future.
          </p>
        </div>
      </section>

      {/* 2. Main Executive Letter & Profile Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Sticky CEO Sidebar */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              {/* Leader Photo & Credentials */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-brand-gold via-amber-200 to-brand-goldLight shadow-2xl shadow-brand-gold/25">
                  <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-inner group">
                    <Image
                      src="/images/profile/profile01.jpg"
                      alt="Md. Abdullah Al Mamun - Group Chief Executive Officer, Top On Group"
                      fill
                      priority
                      quality={80}
                      sizes="(max-width: 1024px) 224px, 224px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
                    Executive Leadership
                  </span>
                  <h2 className="text-2xl font-bold font-serif text-slate-900 tracking-tight">
                    Md. Abdullah Al Mamun
                  </h2>
                  <p className="text-sm font-semibold text-brand-goldDark">
                    Group Chief Executive Officer
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                    Top On Group
                  </p>
                </div>
              </div>

              {/* Verified Credentials Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-slate-200 border border-brand-gold/30 space-y-3 shadow-md">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Leadership Credentials</span>
                  <BadgeCheck className="w-4 h-4 text-brand-gold" />
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start space-x-2.5">
                    <Briefcase className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">15+ Years SCM Mastery</strong>
                      <span className="text-slate-400">Former Executive Director at Walton Group</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <Award className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">CSCM (USA) Certified</strong>
                      <span className="text-slate-400">Certified Supply Chain Manager (ISCEA, USA)</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <GraduationCap className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Chartered Accountancy &amp; Tax</strong>
                      <span className="text-slate-400">CACC (ICAB) &amp; Certified ITP (NBR Authorized)</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">Trade Governance</strong>
                      <span className="text-slate-400">NBR Customs Tariff &amp; Port Clearance Advisory</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct CEO Desk Contacts */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Executive Secretariat</span>
                </div>
                <div className="text-slate-600 space-y-1">
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <a href="mailto:mamun@toponbd.com" className="hover:text-brand-navy">
                      mamun@toponbd.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Action Link to Full Biography */}
              <Link
                href="/about/about-ceo"
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-brand-gold/15 text-brand-navy hover:text-brand-navy font-bold text-xs border border-slate-200 hover:border-brand-gold/40 transition-all duration-200"
              >
                <FileText className="w-3.5 h-3.5 text-brand-goldDark" />
                <span>Read Full Biography &amp; Career History</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Full Formal Executive Letter */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200 shadow-xl space-y-8 relative overflow-hidden">
              {/* Top Accent Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-amber-200 to-brand-goldDark" />

              {/* Letterhead Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest font-mono">
                    Executive Address
                  </span>
                  <div className="text-xl sm:text-2xl font-serif font-bold text-brand-navy">
                    Top On Group
                  </div>
                  <p className="text-xs text-slate-500">
                    Dhaka &bull; Chattogram &bull; Mongla, Bangladesh
                  </p>
                </div>

                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs self-start sm:self-auto font-medium">
                  <span>Official Communiqué</span>
                </div>
              </div>

              {/* Salutation */}
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug">
                  Dear Valued Clients, Partners and Stakeholders,
                </h3>
                <p className="text-base sm:text-lg text-brand-navy font-semibold leading-relaxed">
                  It is my privilege to welcome you to <span className="text-brand-goldDark">Top On Group</span>.
                </p>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base text-justify">
                <p>
                  Our journey is built on a strong foundation of experience, trust, and commitment. With a heritage rooted in Bangladesh’s customs and trade sector, we have continuously evolved by expanding our capabilities across customs clearance and forwarding, freight forwarding and logistics, international trade, trading and supply, agriculture, and fisheries.
                </p>

                <p>
                  At Top On Group, we believe that sustainable success is built on <strong className="text-slate-900">quality, integrity, innovation, and service excellence</strong>. In an increasingly competitive and rapidly changing business environment, we are committed to embracing modern technology, smart solutions, and professional business practices to create greater value for our clients and business partners.
                </p>

                <p>
                  As we move forward, our focus remains on building a stronger, more integrated, and sustainable business platform. We are committed to strengthening our capabilities, empowering our people, maintaining the highest standards of professionalism, and building long-term relationships based on trust and mutual success.
                </p>

                <p>
                  I extend my sincere appreciation to our valued clients, partners, employees, and stakeholders for their continued trust and support. Together, we will continue to pursue responsible growth and contribute to the development of Bangladesh&apos;s trade, logistics, agriculture, and commercial sectors.
                </p>
              </div>

              {/* Illuminated Purpose Quote Block */}
              <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#071930] via-[#0B2240] to-[#040D1A] text-white border border-brand-gold/40 shadow-xl space-y-3">
                <div className="flex items-center space-x-2 text-brand-gold font-mono text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  <span>Our Unwavering Purpose</span>
                </div>
                <p className="text-base sm:text-lg text-slate-100 font-serif italic leading-relaxed">
                  &quot;We remain committed to our purpose — to deliver Quality, serve with dedication, and Together, we strive for excellence for our people and sustainable progress for our nation.&quot;
                </p>
              </div>

              {/* Strategic Pillars Grid */}
              <div className="pt-4 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Pillars of Our Strategic Execution
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {STRATEGIC_PILLARS.map((pillar, idx) => {
                    const Icon = pillar.icon;
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center space-x-2 text-brand-navy font-bold text-xs sm:text-sm">
                          <Icon className="w-4 h-4 text-brand-gold" />
                          <span>{pillar.title}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Signature Block */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="space-y-1.5">
                  <span className="text-xs text-slate-500 block">Respectfully and sincerely,</span>
                  <div className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                    Md. Abdullah Al Mamun
                  </div>
                  <div className="text-xs font-bold text-brand-goldDark uppercase tracking-wider">
                    Group Chief Executive Officer
                  </div>
                  <div className="text-xs text-slate-500">
                    Top On Group
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white font-bold text-xs shadow-md border border-brand-gold/30 hover:border-brand-gold transition-all"
                  >
                    <span>Connect with CEO Desk</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    <span>Explore Divisions</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
