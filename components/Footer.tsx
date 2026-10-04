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
  Briefcase,
  ArrowRight,
  Facebook,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      {/* Top Banner / Value Strip - Pure White */}
      <div className="bg-white border-b border-slate-200/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-navy flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-navy" />
            </div>
            <div>
              <h4 className="text-brand-navy font-bold text-sm sm:text-base tracking-tight">
                Trusted Cross-Border Partner in Bangladesh
              </h4>
              <p className="text-xs text-slate-500">
                100% regulatory compliance across customs, port clearance, and international freight.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="/contact"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navyLight text-white font-semibold text-xs transition-all shadow-sm hover:shadow flex items-center space-x-2 group"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 text-xs">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-4 space-y-3.5">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-text.png"
              alt="Top On Group"
              width={190}
              height={40}
              quality={100}
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          <p className="text-slate-500 leading-relaxed max-w-sm">
            A premier multi-sector conglomerate empowering trade through import/export sourcing, licensed customs clearing, global freight forwarding, commercial fisheries, and corporate consultancy.
          </p>

          <div className="pt-1 space-y-2 text-slate-600">
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <a
                href="mailto:info@toponbd.com"
                className="hover:text-brand-navy transition-colors font-medium"
              >
                info@toponbd.com
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a
                href="tel:+8801711775280"
                className="flex items-center space-x-1.5 hover:text-brand-navy transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Dhaka: 01711-775280</span>
              </a>
              <a
                href="tel:+8801711775281"
                className="flex items-center space-x-1.5 hover:text-brand-navy transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>CTG: 01711-775281</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-2 pt-1">
            <a
              href="https://www.facebook.com/topongroup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-200/70 hover:bg-brand-navy hover:text-white flex items-center justify-center text-slate-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/company/topongroup"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-200/70 hover:bg-brand-navy hover:text-white flex items-center justify-center text-slate-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Col 2: Business Divisions */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-brand-navy font-bold text-xs uppercase tracking-wider">
            <Link href="/divisions" className="hover:text-brand-goldDark transition-colors">
              Divisions
            </Link>
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link
                href="/divisions/express-topexpress"
                className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top Express Limited</span>
              </Link>
            </li>
            <li>
              <Link
                href="/divisions/logistics-dailyshipping"
                className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
              >
                <Ship className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Daily Shipping</span>
              </Link>
            </li>
            <li>
              <Link
                href="/divisions/trading-topontech"
                className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
              >
                <Building2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top On-Tech</span>
              </Link>
            </li>
            <li>
              <Link
                href="/divisions/agro-toponagro"
                className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
              >
                <Fish className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top On-Agro Farm</span>
              </Link>
            </li>
            <li>
              <Link
                href="/divisions/consultancy-toponsolution"
                className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
              >
                <Briefcase className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>Top On-Solution</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Company & Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-brand-navy font-bold text-xs uppercase tracking-wider">
            Company
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <Link href="/about" className="hover:text-brand-navy transition-colors">
                About Top On Group
              </Link>
            </li>
            <li>
              <Link href="/about/journey" className="hover:text-brand-navy transition-colors">
                Our Journey &amp; Story
              </Link>
            </li>
            <li>
              <Link href="/about/values" className="hover:text-brand-navy transition-colors">
                Mission &amp; Values
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-brand-navy transition-colors">
                Services Catalog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-navy transition-colors">
                Contact &amp; Port Desks
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Office Addresses */}
        <div className="lg:col-span-4 space-y-3.5">
          <h3 className="text-brand-navy font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>Our Offices</span>
          </h3>

          <div className="space-y-3 text-[11px] text-slate-600 leading-relaxed">
            {/* Head Office */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <strong className="text-brand-navy font-bold block text-xs">
                Head Office (Dhaka)
              </strong>
              <p className="text-slate-600">
                House: Ka/11 (1st Floor), Matbar Bari Moasjid Road, Jagannathpur, Bashundhara, Vatara, Dhaka-1229
              </p>
            </div>

            {/* Chattogram Office */}
            <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
              <strong className="text-brand-navy font-bold block text-xs">
                Chattogram Office
              </strong>
              <p className="text-slate-600">
                Suraiya Mansion (6th Floor), 30 Agrabad Commercial Area, Chattogram-4100
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200/80 bg-white py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-brand-navy font-semibold">Top On Group</strong>. All rights reserved.
          </p>

          <div className="flex items-center space-x-4 text-[11px] text-slate-500">
            <span className="text-brand-goldDark font-semibold">BUILT ON TRUST</span>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-brand-navy transition-colors">
              Privacy &amp; Terms
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-brand-navy transition-colors">
              Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
