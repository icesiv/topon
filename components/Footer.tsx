import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Building2,
  Ship,
  Truck,
  Fish,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#030914] border-t border-brand-gold/20 text-slate-300">
      {/* Top Banner / Value Strip */}
      <div className="border-b border-white/5 bg-gradient-to-r from-brand-navy/60 via-[#071930] to-brand-navy/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">
                Trusted Cross-Border Partner in Bangladesh
              </h4>
              <p className="text-xs text-slate-400">
                Operating with 100% regulatory compliance across customs, ports, and global sourcing corridors.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg bg-brand-gold text-brand-navy hover:bg-brand-goldLight font-bold text-xs transition-all shadow-gold flex items-center space-x-2"
            >
              <span>Schedule Advance Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/home" className="flex items-center space-x-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-slate-900 p-1 border border-brand-gold/30">
              <Image
                src="/logo.png"
                alt="Top On Group Logo"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block leading-none font-serif">
                TOP ON <span className="text-brand-gold">GROUP</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase block font-sans mt-0.5">
                On Time. Every Time
              </span>
            </div>
          </Link>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Top On Group is a premier multi-sector conglomerate in Bangladesh empowering international trade through import/export trading (<strong className="text-slate-200">Top On-Tech</strong>), licensed customs clearing &amp; forwarding (<strong className="text-slate-200">Top Express Limited</strong>), international freight forwarding (<strong className="text-slate-200">Daily Shipping &amp; Logistics</strong>), and commercial fisheries &amp; aquaculture (<strong className="text-slate-200">Top On-Agro Farm</strong>).
          </p>

          <div className="pt-2 text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Corporate HQ: Dhaka, Bangladesh | Port Hubs: Chittagong &amp; Mongla</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <a href="mailto:info@toponbd.com" className="hover:text-brand-gold">
                info@toponbd.com
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Business Divisions */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase border-b border-brand-gold/30 pb-2 inline-block">
            Key Divisions
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link
                href="/trading-topontech"
                className="text-slate-300 hover:text-brand-gold transition-colors flex items-center space-x-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top On-Tech</span>
              </Link>
              <span className="text-[11px] text-slate-500 block pl-5">Import, Export &amp; Trading Enterprise</span>
            </li>
            <li>
              <Link
                href="/express-topexpress"
                className="text-slate-300 hover:text-brand-gold transition-colors flex items-center space-x-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top Express Limited</span>
              </Link>
              <span className="text-[11px] text-slate-500 block pl-5">Customs Clearing and Forwarding (C&amp;F)</span>
            </li>
            <li>
              <Link
                href="/logistics-dailyshipping"
                className="text-slate-300 hover:text-brand-gold transition-colors flex items-center space-x-1.5"
              >
                <Ship className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Daily Shipping &amp; Logistics</span>
              </Link>
              <span className="text-[11px] text-slate-500 block pl-5">Freight Forwarding &amp; Shipping Support</span>
            </li>
            <li>
              <Link
                href="/agro-toponagro"
                className="text-slate-300 hover:text-brand-gold transition-colors flex items-center space-x-1.5"
              >
                <Fish className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top On-Agro Farm</span>
              </Link>
              <span className="text-[11px] text-slate-500 block pl-5">Commercial Fisheries &amp; Aquaculture</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Core Services */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase border-b border-brand-gold/30 pb-2 inline-block">
            Core Services
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/services#trading" className="hover:text-brand-gold transition-colors">
                Industrial Machinery &amp; Equipment
              </Link>
            </li>
            <li>
              <Link href="/services#trading" className="hover:text-brand-gold transition-colors">
                Chemical &amp; Raw Material Sourcing
              </Link>
            </li>
            <li>
              <Link href="/services#customs" className="hover:text-brand-gold transition-colors">
                Customs Clearing &amp; Port C&amp;F Brokerage
              </Link>
            </li>
            <li>
              <Link href="/services#freight" className="hover:text-brand-gold transition-colors">
                Ocean &amp; Air Freight Forwarding
              </Link>
            </li>
            <li>
              <Link href="/services#agro" className="hover:text-brand-gold transition-colors">
                Commercial Fisheries &amp; Aquaculture
              </Link>
            </li>
            <li>
              <Link href="/services#agro" className="hover:text-brand-gold transition-colors">
                Cold Chain Storage &amp; Bulk Supply
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Corporate Governance & Quick Links */}
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-sm tracking-wider uppercase border-b border-brand-gold/30 pb-2 inline-block">
            Governance
          </h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/about/journey" className="hover:text-brand-gold transition-colors">
                Our Journey &amp; Corporate Story
              </Link>
            </li>
            <li>
              <Link href="/about/message" className="hover:text-brand-gold transition-colors">
                Message from Entrepreneur
              </Link>
            </li>
            <li>
              <Link href="/about/values" className="hover:text-brand-gold transition-colors">
                Mission, Vision &amp; Values
              </Link>
            </li>
            <li>
              <Link href="/about/milestones" className="hover:text-brand-gold transition-colors">
                Milestones &amp; Accreditations
              </Link>
            </li>
            <li>
              <a href="/topon-profile.pdf" download className="hover:text-brand-gold transition-colors flex items-center space-x-1">
                <span>Company Profile (PDF)</span>
                <ExternalLink className="w-3 h-3 text-brand-gold" />
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-gold transition-colors">
                Contact &amp; Port Desks
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#02050B] py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-white">TOP ON GROUP</strong>. All rights reserved. Registered in Bangladesh.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Operating divisions: Top On-Tech, Top Express Limited, Daily Shipping &amp; Logistics, and Top On-Agro Farm.
            </p>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <span className="text-brand-gold font-medium">On Time. Every Time.</span>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300">Privacy &amp; Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300">Trade Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
