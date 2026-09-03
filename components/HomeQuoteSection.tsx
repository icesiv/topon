import { ShieldCheck, CheckCircle2, Clock, Mail, MapPin, Sparkles } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

interface HomeQuoteSectionProps {
  id?: string;
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: React.ReactNode;
  defaultDivision?: "topontech" | "dailyshipping" | "topexpress" | "agro" | "both";
}

export default function HomeQuoteSection({
  id = "quote",
  badge = "Priority Commercial Access",
  titlePrefix = "Ready to Streamline Your",
  titleHighlight = "Trade & Logistics Operations?",
  description,
  defaultDivision = "both",
}: HomeQuoteSectionProps) {
  return (
    <section id={id} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      {/* Background Ambient Glow */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-slate-200/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Commercial Reassurances, Pillars & Info */}
        <div className="lg:col-span-5 space-y-6 pt-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>{badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight leading-[1.15]">
            {titlePrefix} <br />
            <span className="text-gold-gradient block mt-1">{titleHighlight}</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            {description || (
              <>
                Whether you need industrial plant equipment sourcing (<strong className="text-[#0B2240]">Top On-Tech</strong>), licensed Chittagong &amp; Dhaka customs clearance (<strong className="text-[#0B2240]">Top Express Limited</strong>), international ocean/air freight slots (<strong className="text-[#0B2240]">Daily Shipping &amp; Logistics</strong>), or bulk commercial fisheries supply (<strong className="text-[#0B2240]">Top On-Agro Farm</strong>), our specialized operations desks provide immediate quotes with zero obligation.
              </>
            )}
          </p>

          {/* Reassurance Cards */}
          <div className="space-y-3 pt-2 text-xs text-slate-700">
            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-gold/50 transition-colors">
              <div className="p-2 rounded-xl bg-slate-50 text-[#0B2240] border border-slate-200 shrink-0">
                <Clock className="w-4 h-4 text-brand-goldDark" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B2240] text-sm">Rapid Turnaround Response</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Detailed RFQ review and tariff assessment delivered within 2–4 business hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-gold/50 transition-colors">
              <div className="p-2 rounded-xl bg-slate-50 text-[#0B2240] border border-slate-200 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B2240] text-sm">100% NBR &amp; Customs Compliance</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Strict adherence to Bangladeshi customs regulations, HS code mapping, and legal audit protection.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-gold/50 transition-colors">
              <div className="p-2 rounded-xl bg-slate-50 text-[#0B2240] border border-slate-200 shrink-0">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-[#0B2240] text-sm">Direct Operations Access</h4>
                <p className="text-slate-500 text-xs mt-0.5">
                  Connect with licensed supply chain managers and port clearance specialists in Dhaka &amp; Chittagong.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Direct Desk Contact */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-100 to-white border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center space-x-2 text-[#0B2240] font-semibold">
              <Mail className="w-4 h-4 text-brand-goldDark" />
              <span>Direct Commercial Desk: <a href="mailto:info@toponbd.com" className="text-brand-goldDark hover:underline">info@toponbd.com</a></span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>Corporate HQ: Dhaka, Bangladesh | Chittagong Port Liaison</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Quote Form Card */}
        <div className="lg:col-span-7">
          <QuoteForm defaultDivision={defaultDivision} />
        </div>
      </div>
    </section>
  );
}
