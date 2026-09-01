import {
  ShieldCheck,
  Award,
  Scale,
  Users,
  Lightbulb,
  Globe2,
  LucideIcon,
} from "lucide-react";

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const defaultCoreValues: ValueItem[] = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Transparent dealings, ethical corporate governance, and uncompromised regulatory alignment across all borders.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "Rigorous product verification, international tier-one sourcing, and zero-defect logistics execution.",
  },
  {
    icon: Scale,
    title: "Accountability",
    description:
      "Complete ownership of timelines, documentation accuracy, and cargo safety from dispatch to delivery.",
  },
  {
    icon: Users,
    title: "Customer Centricity",
    description:
      "Tailored supply chain workflows, dedicated port liaisons, and bespoke procurement strategies for clients.",
  },
  {
    icon: Lightbulb,
    title: "Modern Innovation",
    description:
      "Digitally tracked freight management, modern container visibility, and forward-thinking trade analytics.",
  },
  {
    icon: Globe2,
    title: "Trade Compliance",
    description:
      "Deep fluency in Bangladesh customs laws, HS Code classification, tariff optimization, and NBR mandates.",
  },
];

interface CoreValuesProps {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  values?: ValueItem[];
}

export default function CoreValues({
  badge = "Corporate Tenets",
  title = "Our Core",
  titleHighlight = "Guiding Values",
  subtitle = "Every transaction, container shipment, and corporate partnership at Top On Group is anchored in six enduring commitments.",
  values = defaultCoreValues,
}: CoreValuesProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-navy font-bold text-xs uppercase tracking-wider mb-3">
          <span>{badge}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
          {title} <span className="text-gold-gradient">{titleHighlight}</span>
        </h2>
        <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {values.map((v, idx) => {
          const Icon = v.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:border-brand-gold hover:shadow-xl transition-all duration-300 space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B2240] text-brand-gold flex items-center justify-center shadow-md">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B2240] font-serif">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
