import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Quality Services | Top On Group",
  description:
    "Explore our full suite of clearing & forwarding, export management, inland transportation, 3PL logistics, and trade consultancy services.",
};

const QUALITY_CAPABILITIES = [
  "EX-WORK",
  "CUSTOMS CLEARANCE",
  "DOOR TO DOOR DELIVERY",
  "TRANSPORTATION",
  "IMPORT FACILITIES",
  "TRADE POLICY & CONSULTANCY",
  "CONSOLIDATION AND BREAK-BULK SOLUTION",
];

interface ServiceItem {
  title: string;
  desc: string;
  image: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    title: "Clearing & Forwarding Services",
    desc: "End-to-end customs clearance and forwarding solutions for seamless cargo movement.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/sliders/1761246716762-vmm671xyc.jpg",
  },
  {
    title: "Export Operations & Management",
    desc: "Comprehensive support for all export-related activities, ensuring smooth international trade execution.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/services/1761372823603-9r44lx3bf.jpeg",
  },
  {
    title: "Inland Road Transportation",
    desc: "Reliable and efficient domestic logistics network covering all major routes across Bangladesh.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/services/1763633094948-fsp90jnjf.jpg",
  },
  {
    title: "Third-party Logistics (3pl) Support",
    desc: "Integrated warehousing, distribution, and supply chain management services tailored to client needs.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/services/1763633237631-6jz843rda.jpg",
  },
  {
    title: "Trade Policy & Consultancy",
    desc: "Expert advisory on company trade policies, NBR budget implications, and regulatory compliance.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/services/1763633299893-ab07x3n4w.jpg",
  },
  {
    title: "Documentation & Regulatory Processing",
    desc: "Assistance with trade and business documentation, including: Trade License, RJSC, BIDA, BEZA, BEPZA, CCIE, BIN, TIN, VAT & Tax Return, and related registrations.",
    image:
      "https://addiitsstorage.blob.core.windows.net/jsc/services/1763633551809-5vml4fr5k.png",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* 1. Page Hero Header */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-slate-900 via-brand-navy to-[#061324] text-white border-b border-brand-gold/20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-brand-navyLight/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Excellence Across Every Trade Lane</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Our Quality Services
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-xs sm:text-sm leading-relaxed">
            Delivering precision customs clearance, end-to-end freight forwarding, multimodal transportation, and regulatory consultancy.
          </p>
        </div>
      </section>

      {/* 2. OUR QUALITY SERVICES Featured Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Image Column */}
            <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[320px] w-full">
              <Image
                src="https://addiitsstorage.blob.core.windows.net/jsc/home-page-sections/home-section-left-hn7iekj8i-midk5vtt-w2saim-1764090764035.jpg"
                alt="Our Quality Services"
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
            </div>

            {/* Right List Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-goldDark uppercase tracking-wider block mb-1">
                  Core Operational Strengths
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
                  Comprehensive Supply Chain Solutions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {QUALITY_CAPABILITIES.map((capability, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-goldDark flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0B2240] tracking-wide">
                      {capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Services Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-navy text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-goldDark" />
            <span>Service Catalog</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#0B2240] tracking-tight">
            Our Services
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Discover what we can do for you with reliable, compliant, and clockwork execution across Bangladesh.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_LIST.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-gold/50 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow space-y-2.5">
                <h3 className="text-base sm:text-lg font-bold text-[#0B2240] group-hover:text-brand-navy transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-grow">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Contact & Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-gradient-to-r from-brand-navy via-[#0c284d] to-brand-navy rounded-3xl p-8 sm:p-12 text-white border border-brand-gold/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Need Tailored Logistics or Customs Brokerage?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Connect with our licensed desk officers in Dhaka, Chittagong, and Mongla for swift quotes and seamless trade operations.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center space-x-2 group flex-shrink-0"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
