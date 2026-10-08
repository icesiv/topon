import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TopOnSolutionHeroSlider from "@/components/TopOnSolutionHeroSlider";
import {
  Briefcase,
  FileCheck2,
  Scale,
  ShieldCheck,
  Building2,
  BadgeCheck,
  CheckCircle2,
  FileDown,
  ArrowRight,
  Sparkles,
  Search,
  BookOpen,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Top On-Solution | Corporate Consultancy & Business Support",
  description:
    "Top On-Solution provides consultancy and practical support for company setup, regulatory compliance, tax, VAT, customs, trade, audit, sourcing and other business requirements.",
  keywords: [
    "Top On-Solution",
    "Company Setup Bangladesh",
    "Regulatory Compliance",
    "Tax and VAT Advisory Bangladesh",
    "Customs Clearance Advisory",
    "RJSC Registration",
    "BIDA Permission",
    "Corporate Consultancy Bangladesh",
    "Top On Group",
  ],
};

const CONSULTING_SERVICES = [
  {
    icon: Building2,
    title: "Business Setup & Company Formation",
    description:
      "End-to-end procedural support for establishing new commercial entities, joint ventures, and liaison offices across Bangladesh.",
    features: [
      "RJSC company incorporation & name clearance",
      "Trade license application, renewal & changes",
      "BIDA (Bangladesh Investment Development Authority) registration",
      "TIN, BIN & e-TIN setup and corporate identity issuance",
    ],
  },
  {
    icon: FileCheck2,
    title: "Trade & Regulatory Licensing",
    description:
      "Acquiring all mandatory statutory licenses and permissions to operate import, export, and domestic manufacturing operations legally.",
    features: [
      "Import Registration Certificate (IRC) & Export Registration Certificate (ERC)",
      "Chamber of Commerce & Trade Association memberships",
      "Factory, Fire & Environmental Clearance certificates",
      "BSTI certification and regulatory permissions",
    ],
  },
  {
    icon: Receipt,
    title: "NBR, Customs, Excise & VAT Advisory",
    description:
      "Expert navigation through complex National Board of Revenue (NBR) regulations, customs duty structures, and tax obligations.",
    features: [
      "Customs tariff classification & duty assessment analysis",
      "Monthly & annual VAT return filing and compliance audit",
      "Bonded warehouse license application & audit coordination",
      "Customs valuation disputes and review petition assistance",
    ],
  },
  {
    icon: FileSpreadsheet,
    title: "Audit, Tax & Return Services",
    description:
      "Comprehensive tax planning, annual statutory audit coordination, and compliance filing for corporate entities and individual directors.",
    features: [
      "Corporate income tax returns and withholding tax management",
      "Coordination with certified chartered accounting firms for statutory audits",
      "Advance income tax (AIT) assessment and rebate processing",
      "Transfer pricing documentation and tax advisory",
    ],
  },
  {
    icon: Scale,
    title: "Budget & Trade Policy Advisory",
    description:
      "Strategic insights into annual national budget changes, SROs (Statutory Regulatory Orders), and commercial policy amendments.",
    features: [
      "Yearly national budget impact assessment for key trade sectors",
      "SRO interpretation, duty exemption rules and fiscal updates",
      "Trade barrier mitigation and tariff optimization strategies",
      "Supply chain commercial compliance evaluation",
    ],
  },
  {
    icon: Search,
    title: "Sourcing, Dispute Settlement & Special Assignments",
    description:
      "Specialized investigative, due diligence, and coordination assignments to resolve operational hurdles and contract disputes.",
    features: [
      "Supplier and partner due diligence and background checks",
      "Inter-agency liaison across port authorities, NBR, and banks",
      "Commercial contract review and arbitration support",
      "Turnkey advisory for complex regulatory situations",
    ],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Requirement Scoping",
    desc: "Detailed evaluation of your company structure, statutory gaps, and immediate regulatory needs.",
  },
  {
    step: "02",
    title: "Regulatory Roadmapping",
    desc: "Drafting a customized action plan with timeline, mandatory documentation checklist, and agency milestones.",
  },
  {
    step: "03",
    title: "Preparation & Filing",
    desc: "Drafting precision legal instruments, financial filings, and liaising directly with regulatory authorities.",
  },
  {
    step: "04",
    title: "Execution & Ongoing Support",
    desc: "Securing approvals, issuing statutory certificates, and providing continuous compliance monitoring.",
  },
];

export default function TopOnSolutionPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-slate-50 text-slate-900">
      {/* 1. Full-Width Hero Slider */}
      <TopOnSolutionHeroSlider />

      {/* 2. Overview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src="/images/toponsolution_wide.jpg"
                alt="Bangladeshi consultants reviewing compliance documents in a Dhaka boardroom"
                fill
                quality={80}
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2240]/90 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">
                  Professional Business Advisory
                </span>
                <p className="text-xs text-slate-200">
                  Reliable guidance through Bangladesh’s complex regulatory and commercial landscape.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold text-[#0B2240] uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Strategic Mission
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-[#0B2240]">
              Empowering Enterprises with Clarity, Precision &amp; Compliance
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              In an evolving trade and regulatory environment, businesses face complex procedural, taxation, and statutory hurdles. Top On-Solution acts as your dedicated corporate advisory wing, handling end-to-end liaison with government bodies, port agencies, and financial authorities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <ShieldCheck className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">100% Compliant</div>
                <p className="text-[11px] text-slate-500">Adhering strictly to NBR, BIDA &amp; RJSC rules</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <BadgeCheck className="w-4 h-4 text-brand-navy" />
                <div className="font-bold text-[#0B2240]">Single-Window Support</div>
                <p className="text-[11px] text-slate-500">One coordinated platform for all statutory needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Consulting Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Scope of Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B2240]">
            Our Professional <span className="text-gold-gradient">Service Portfolio</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Structured consultancy and practical execution tailored for startups, expanding corporate houses, and multinational ventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CONSULTING_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md hover:border-brand-gold/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0B2240] font-serif group-hover:text-brand-navy transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2 text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Strategic Working Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2240] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif">
              Our 4-Stage Consulting Process
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              A transparent, structured workflow designed to eliminate bureaucratic delays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 backdrop-blur-sm hover:border-brand-gold/40 transition-colors"
              >
                <span className="font-mono text-xl font-bold text-brand-gold">
                  {step.step}
                </span>
                <h3 className="font-bold text-white text-sm sm:text-base font-serif">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Download CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-white to-amber-50/50 border border-brand-gold/30 shadow-lg space-y-4">
          <BookOpen className="w-10 h-10 text-[#0B2240] mx-auto" />
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
            Need Comprehensive Advisory Support?
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Download our complete Top On-Solution corporate profile or contact our senior consultants for confidential case review and strategy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="/profiles/TopOnSolution-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#0B2240] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#07172c] transition-colors shadow-md"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Profile (529 KB)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-white text-[#0B2240] font-bold text-xs uppercase tracking-wider border border-slate-300 hover:border-brand-gold transition-colors shadow-xs"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
