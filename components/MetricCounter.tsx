import { ShieldCheck, Anchor, Clock, Globe2 } from "lucide-react";

export default function MetricCounter() {
  const metrics = [
    {
      icon: Anchor,
      value: "20,000+",
      label: "Containers Handled",
      detail: "Operational freight & C&F volume",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Customs & Trade Compliance",
      detail: "Zero demurrage proactive clearance",
    },
    {
      icon: Globe2,
      value: "Global",
      label: "Sourcing Corridors",
      detail: "Direct Asian & European manufacturer links",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Shipment Tracking",
      detail: "On Time. Every Time execution",
    },
  ];

  return (
    <div className="relative -mt-12 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-lg shadow-slate-900/5 hover:border-brand-gold/60 hover:shadow-xl transition-all duration-300 flex items-center space-x-4"
            >
              <div className="p-3.5 rounded-xl bg-[#0B2240] text-brand-gold shadow-md flex-shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#0B2240] font-serif tracking-tight">
                  <span className="text-gold-gradient">{m.value}</span>
                </div>
                <div className="text-xs font-bold text-slate-800">{m.label}</div>
                <div className="text-[11px] text-slate-500">{m.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
