import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";

interface FeatureCard {
  title: string;
  desc: string;
  image: string;
}

const WHY_CHOOSE_US: FeatureCard[] = [
  {
    title: "Client First Approach",
    desc: "Our personalized service model ensures each client gets tailor-made solutions.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mielcyop-j2h743-1764126780426.jpg",
  },
  {
    title: "Experienced Team",
    desc: "Our knowledgeable team brings years of expertise in C&F operations, ensuring effective solutions for clients.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mielepem-h8gep5-1764126781014.jpg",
  },
  {
    title: "Strong Relationship",
    desc: "Our established connections with port authorities and customs officials facilitate smoother operations and compliance.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-miev48tk-pid0zm-1764126476717.png",
  },
  {
    title: "Reliable Network",
    desc: "Strong relationships with port authorities, customs officials, and logistics partners.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mievac37-hzrcx4-1764126477405.png",
  },
  {
    title: "Real time Support",
    desc: "We utilize advanced technology for tracking and documentation, providing transparency and efficiency in our services.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mife9jin-8l7i8a-1764126477647.png",
  },
  {
    title: "Timely Delivery",
    desc: "We prioritize punctuality, ensuring that all shipments arrive on time, meeting our clients’ business needs.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mife9jx2-0y816p-1764126477928.png",
  },
  {
    title: "Modern Technology",
    desc: "We utilize advanced technology for tracking and documentation, providing transparency and efficiency in our services.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mife9kch-jbdred-1764126478428.jpg",
  },
  {
    title: "Compliance Driven",
    desc: "We adhere strictly to all government regulations and customs procedures.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/section-card-0fhdhxnkp-mifeb88z-u59xg5-1764126478734.png",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-navy text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Why Choose Us?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
            Why Choose Top On Group?
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Have a glimpse of how we manage our work process, ensuring seamless cross-border trade, customs clearance, and logistics operations.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-brand-gold/40 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 relative mb-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  unoptimized
                  className="w-16 h-16 object-contain"
                />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#0B2240] group-hover:text-brand-navy mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
