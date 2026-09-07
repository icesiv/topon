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
  BookOpen,
  Users,
  Building,
  CheckCircle,
  FileText,
  BadgeCheck,
} from "lucide-react";
import LeadershipGallery from "@/components/LeadershipGallery";

export const metadata: Metadata = {
  title: "About the Group CEO | Md. Abdullah Al Mamun - Top On Group",
  description:
    "Biography, professional profile, executive address, and credentials of Md. Abdullah Al Mamun (CSCM, ITP, CACC), Group Chief Executive Officer of Top On Group.",
};

const trainings = [
  {
    title: "How to Read Financial Statement",
    organizer: "International Finance Corporation (IFC – South Asia Enterprise Development Facility)",
    location: "Khulna, Bangladesh",
    date: "July 2008",
  },
  {
    title: "How to Construct Financial Statement",
    organizer: "International Finance Corporation (IFC – South Asia Enterprise Development Facility)",
    location: "Khulna, Bangladesh",
    date: "July 2008",
  },
  {
    title: "How Do Banks Assess Your Creditworthiness",
    organizer: "International Finance Corporation (IFC – South Asia Enterprise Development Facility)",
    location: "Bangladesh",
    date: "Certified",
  },
  {
    title: "ICT for SMEs",
    organizer: "SME Foundation in association with Bangladesh Computer Council (BCC)",
    location: "Dhaka, Bangladesh",
    date: "Certified",
  },
  {
    title: "Computer Application Packages and Programming",
    organizer: "Bangladesh Computer Council (BCC)",
    location: "Dhaka, Bangladesh",
    date: "Certified",
  },
];

const associations = [
  {
    name: "Chittagong Customs Clearing and Forwarding Agents Association (CCAA)",
    role: "Member Agent",
    scope: "Port Customs & Clearance Operations",
  },
  {
    name: "Dhaka Customs Clearing and Forwarding Agents Association (DCAA)",
    role: "Member Agent",
    scope: "Inland & Air Customs Brokerage",
  },
  {
    name: "Bangladesh Freight Forwarders Association (BAFFA)",
    role: "Registered Member",
    scope: "International Logistics & Freight Forwarding",
  },
  {
    name: "Bangladesh Electronics Merchants Association (BEMA)",
    role: "Corporate Member",
    scope: "Electronics & Industrial Trade",
  },
  {
    name: "Bangladesh Electrical Motor Pump Importers Association (BEMPIA)",
    role: "Corporate Member",
    scope: "Industrial Machinery & Pump Imports",
  },
];

export default function MessageFromEntrepreneurPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Header Hero */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Leadership Profile &amp; Address</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
            About the <span className="text-gold-light-gradient">Group CEO</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed font-light">
            Visionary leadership, 15+ years of supply chain governance, regulatory mastery, and institutional stewardship.
          </p>
        </div>
      </section>

      {/* 2. Main Executive Profile & Biography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Portrait & Credentials Box */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              {/* Circular Portrait & Identification */}
              <div className="flex flex-col items-center text-center space-y-4 mb-4">
                <div className="relative p-1.5 rounded-full bg-gradient-to-tr from-brand-gold via-amber-200 to-brand-goldLight shadow-2xl shadow-brand-gold/30">
                  <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white shadow-inner group">
                    <Image
                      src="/images/profile/profile01.jpg"
                      alt="Md. Abdullah Al Mamun - Group Chief Executive Officer, Top On Group"
                      fill
                      priority
                      sizes="(max-width: 1024px) 240px, 240px"
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
                    Executive Leadership
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
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

              {/* Verified Credentials Grid */}
              <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-brand-gold/30 space-y-3.5 shadow-lg">
                <div className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Executive Credentials</span>
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                </div>

                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-start space-x-2.5">
                    <Briefcase className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">15+ Years SCM Leadership</strong>
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
                      <strong className="text-white block font-medium">Academic Degrees</strong>
                      <span className="text-slate-400">BBS, MBS &amp; Bachelor of Laws (LLB)</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <Award className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">CACC &amp; Certified ITP</strong>
                      <span className="text-slate-400">A. Wahab &amp; Co. (ICAB) | NBR Authorized</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <BadgeCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-medium">CEFR C1 (Advanced)</strong>
                      <span className="text-slate-400">IET, United Kingdom</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct CEO Desk Contacts */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-brand-gold" />
                  <span>Executive Secretariat</span>
                </div>
                <div className="text-slate-600 space-y-1">
                  <p className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <a href="mailto:mamun@toponbd.com" className="hover:text-brand-navy">
                      mamun@toponbd.com
                    </a>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                    <span>+880 1713 060 970</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Full Narrative & Detailed Biography */}
            <div className="lg:col-span-7 space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
              {/* Biography Narrative */}
              <div className="space-y-4">
                <p>
                  Mr. Md. Abdullah Al Mamun is a visionary business leader with more than 15 years of professional experience in supply chain management, trade policy, customs operations-C&amp;F, freight forwarding, logistics, vat with taxation, compliance audit and corporate administration. Known for his strategic mindset, ethical leadership, and commitment to excellence, he has played a significant role in strengthening operational standards within Bangladesh&apos;s SCM industry.
                </p>

                <p>
                  He holds a <strong>Bachelor of Business Studies (BBS)</strong>, a <strong>Master of Business Studies (MBS)</strong>, and a <strong>Bachelor of Laws (LLB)</strong>. He also completed the <strong>Chartered Accountancy Course Completion (CACC)</strong> at A. Wahab &amp; Co., Chartered Accountants, under the <strong>Institute of Chartered Accountants of Bangladesh (ICAB)</strong>. In addition, he earned the internationally recognized <strong>Certified Supply Chain Manager (CSCM)</strong> certification from <strong>ISCEA, USA</strong>, and <strong>CEFR C1 (Advanced)</strong> certification from <strong>IET, UK</strong>. He is also a certified <strong>Income Tax Practitioner (ITP)</strong>, authorized by the <strong>National Board of Revenue (NBR), Bangladesh</strong>.
                </p>

                <p>
                  Mr. Mamun began his professional journey with <strong>Mosharaf Group</strong>, where he developed strong foundations in business operations and corporate management. His dedication, analytical skills, and leadership capabilities later led him to <strong>Walton Group</strong> in 2016. During his tenure, he served as <strong>Executive Director of Supply Chain Management and Head of C&amp;F Operations</strong>, gaining extensive expertise in supply chain, Customs, NBR trade policy, budget, customs excise and vat and audit &amp; compliance.
                </p>

                <p>
                  Throughout his professional tenure at Walton, Mr. Mamun received several awards and recognitions for his outstanding performance and professional excellence, particularly during his leadership roles as Executive Director and Head of Customs Clearance &amp; Forwarding (C&amp;F). Among these recognitions, he received the <strong>Best Performer Award in 2018 from the Internal Audit &amp; Compliance (IAC) Department</strong>, reflecting his leadership, highlighting his dedication to operational integrity, compliance excellence, and commitment to organizational success.
                </p>

                <p>
                  Driven by more than 15 years of professional experience and expertise, Mr. Mamun brought his extensive knowledge in supply chain management, customs clearance and forwarding, logistics, trading, and business operations to the own business as <strong>Group Chief Executive Officer of Top On Group</strong>.
                </p>

                <p>
                  Under his leadership, Top On Group continues to build a strong and diversified business platform across trade, logistics, supply chain, agriculture, and fisheries. Guided by integrity, innovation, and operational excellence, he is focused on sustainable growth, technology-driven solutions, and long-term value creation.
                </p>

                <p>
                  An approachable and forward-thinking leader, Mr. Mamun is committed to continuous learning, team development, client satisfaction, and building lasting relationships with partners and stakeholders.
                </p>
              </div>

              {/* Professional Training & Development */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center space-x-2 text-[#0B2240] font-serif font-bold text-xl">
                  <BookOpen className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>Professional Training &amp; Development</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Mr. Mamun has actively participated in several professional training and development programs, enhancing his expertise in finance, ICT, business operations, and management:
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {trainings.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-gold/50 transition-colors flex items-start space-x-3"
                    >
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs">
                        <strong className="text-slate-900 font-semibold block text-sm">
                          {t.title}
                        </strong>
                        <span className="text-slate-600 block">
                          Organized by {t.organizer}
                        </span>
                        <span className="text-slate-400 block font-mono text-[11px]">
                          {t.location} • {t.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Memberships & Professional Associations */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center space-x-2 text-[#0B2240] font-serif font-bold text-xl">
                  <Users className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>Memberships &amp; Professional Associations</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {associations.map((a, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-gold/50 transition-colors space-y-1 text-xs"
                    >
                      <div className="font-bold text-slate-900 leading-snug">
                        {a.name}
                      </div>
                      <div className="text-brand-goldDark font-semibold">
                        {a.role}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {a.scope}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Message / Letter Card */}
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#071930] to-[#040D1A] text-white border border-brand-gold/40 shadow-xl space-y-4">
                  <div className="flex items-center space-x-2 text-brand-gold text-xs font-bold uppercase tracking-wider font-mono">
                    <Quote className="w-4 h-4 rotate-180 text-brand-gold" />
                    <span>Message from the Group Chief Executive Officer</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white">
                    Dear Valued Clients, Partners and Stakeholders,
                  </h4>

                  <p className="text-slate-200 text-sm leading-relaxed">
                    It is my privilege to welcome you to <strong className="text-brand-gold">Top On Group</strong>. Our journey is built on a strong foundation of experience, trust, and commitment. With a heritage rooted in Bangladesh’s customs and trade sector, we have continuously evolved by expanding our capabilities across customs clearance and forwarding, freight forwarding and logistics, international trade, trading and supply, agriculture, and fisheries.
                  </p>

                  <div className="p-4 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-xs italic text-slate-100">
                    &quot;We remain committed to our purpose — to deliver Quality, serve with dedication, and Together, we strive for excellence for our people and sustainable progress for our nation.&quot;
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-white/10">
                    <div>
                      <strong className="text-white block font-serif text-base">Md. Abdullah Al Mamun</strong>
                      <span className="text-brand-gold">Group Chief Executive Officer, Top On Group</span>
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-brand-gold text-brand-navy font-bold text-xs shadow-gold hover:bg-brand-goldLight transition-colors"
                    >
                      <span>Connect with CEO Desk</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200 shadow-xl">
          <LeadershipGallery />
        </div>
      </section>
    </div>
  );
}
