import { ShieldCheck, CheckCircle } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";

interface HomeQuoteSectionProps {
  id?: string;
  badge?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  description?: React.ReactNode;
  defaultDivision?: "topontech" | "dailyshipping" | "both";
}

export default function HomeQuoteSection({
  id = "quote",
  badge = "Direct Commercial Access",
  titlePrefix = "Ready to Accelerate Your",
  titleHighlight = "Global Trade Operations?",
  description,
  defaultDivision = "both",
}: HomeQuoteSectionProps) {
  return (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Commercial Reassurances & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider">
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
            {titlePrefix} <br />
            <span className="text-gold-gradient">{titleHighlight}</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {description || (
              <>
                Whether you need precision industrial component sourcing through <strong>Top On-Tech</strong>, or sea/air container slots and port clearance through <strong>Daily Shipping &amp; Logistics</strong>, our team delivers with unmatched reliability.
              </>
            )}
          </p>

          <div className="space-y-3 text-xs text-slate-700 pt-2">
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-brand-navy flex-shrink-0" />
              <span className="font-semibold">Fast quote response within 2–4 business hours</span>
            </div>
            <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-brand-navy flex-shrink-0" />
              <span className="font-semibold">Confidential bill of lading &amp; tariff evaluation</span>
            </div>
          </div>
        </div>

        {/* Right: Quote Form Card */}
        <div className="lg:col-span-7">
          <QuoteForm defaultDivision={defaultDivision} />
        </div>
      </div>
    </section>
  );
}
