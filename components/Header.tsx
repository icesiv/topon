"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Mail,
  Phone,
  ChevronDown,
  Menu,
  X,
  Building2,
  Ship,
  Truck,
  Fish,
  Facebook,
  Linkedin,
} from "lucide-react";

interface DivisionItem {
  name: string;
  desc: string;
  href: string;
  icon: typeof Building2;
}

const DIVISIONS: DivisionItem[] = [
  {
    name: "Top On-Tech",
    desc: "Import, Export & Industrial Trading Enterprise",
    href: "/trading-topontech",
    icon: Building2,
  },
  {
    name: "Top Express Limited",
    desc: "Customs Clearing and Forwarding (C&F) Company",
    href: "/express-topexpress",
    icon: Truck,
  },
  {
    name: "Daily Shipping & Logistics",
    desc: "International Freight Forwarding & Ocean Carriage",
    href: "/logistics-dailyshipping",
    icon: Ship,
  },
  {
    name: "Top On-Agro Farm",
    desc: "Commercial Fisheries, Aquaculture & Sustainable Cold Chain",
    href: "/agro-toponagro",
    icon: Fish,
  },
];

const ABOUT_LINKS = [
  {
    title: "Our Journey & Story",
    sub: "Roots and vision of excellence",
    href: "/about/journey",
  },
  {
    title: "Message from Entrepreneur",
    sub: "Md. Abdullah Al Mamun",
    href: "/about/message",
  },
  {
    title: "Mission, Vision & Values",
    sub: "Core operating tenets",
    href: "/about/values",
  },
  {
    title: "Milestones & Accreditations",
    sub: "Industry certifications & roadmap",
    href: "/about/milestones",
  },
];

const SERVICE_LINKS = [
  {
    title: "Import, Export & Trading",
    sub: "Industrial machinery, chemicals & raw materials",
    href: "/services#trading",
  },
  {
    title: "Customs Clearing & Forwarding (C&F)",
    sub: "Licensed port clearance & duty advisory",
    href: "/services#customs",
  },
  {
    title: "Freight Forwarding (Ocean & Air)",
    sub: "Global shipping lines & air cargo logistics",
    href: "/services#freight",
  },
  {
    title: "Commercial Fisheries & Aquaculture",
    sub: "Scientific fish farming & nationwide cold chain",
    href: "/services#agro",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setCompanyDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;
  const isCompanyActive =
    pathname.includes("topontech") ||
    pathname.includes("dailyshipping") ||
    pathname.includes("topexpress") ||
    pathname.includes("toponagro");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#040D1A] border-b border-brand-gold/15 text-xs text-slate-300 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-4">
              <a
                href="tel:+8801711775280"
                className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors duration-200"
                title="Call Dhaka Office"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>
                  <span className="text-slate-400 font-medium">Dhaka:</span>{" "}
                  <span className="font-semibold text-slate-200">01711-775280</span>
                </span>
              </a>

              <span className="text-white/20">|</span>

              <a
                href="tel:+8801711775281"
                className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors duration-200"
                title="Call Chittagong Office"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>
                  <span className="text-slate-400 font-medium">Ctg:</span>{" "}
                  <span className="font-semibold text-slate-200">01711-775281</span>
                </span>
              </a>
            </div>

            <span className="text-white/20">|</span>

            <a
              href="mailto:info@toponbd.com"
              className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors duration-200"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>info@toponbd.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.facebook.com/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center text-slate-300 hover:text-brand-gold transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center text-slate-300 hover:text-brand-gold transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center text-slate-300 hover:text-brand-gold transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-slate-900/5 border-b border-brand-gold/30 py-2.5"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5"
          }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-text.png"
              alt="Top On Group"
              width={220}
              height={46}
              priority
              className="h-9 md:h-11 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-sm">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-md transition-colors ${isActive("/") || isActive("/home")
                ? "text-[#0B2240] bg-brand-gold/20 font-bold"
                : "text-slate-700 hover:text-[#0B2240] hover:bg-slate-100"
                }`}
            >
              Home
            </Link>

            {/* About Us Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link
                href="/about"
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-md transition-colors ${pathname.startsWith("/about")
                  ? "text-[#0B2240] bg-brand-gold/20 font-bold"
                  : "text-slate-700 hover:text-[#0B2240] hover:bg-slate-100"
                  }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </Link>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                    {ABOUT_LINKS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="block px-3 py-2 text-xs rounded-lg text-slate-700 hover:bg-brand-gold/15 hover:text-[#0B2240] transition-colors"
                      >
                        <div className="font-semibold text-sm text-[#0B2240]">
                          {item.title}
                        </div>
                        <span className="text-slate-500 text-[11px]">{item.sub}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Company / Divisions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-md transition-colors ${isCompanyActive
                  ? "text-[#0B2240] bg-brand-gold/20 font-bold"
                  : "text-slate-700 hover:text-[#0B2240] hover:bg-slate-100"
                  }`}
                aria-expanded={companyDropdownOpen}
              >
                <span>Company</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </button>

              {companyDropdownOpen && (
                <div className="absolute top-full left-0 w-84 sm:w-96 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-2xl shadow-slate-900/10 backdrop-blur-xl space-y-1.5">
                    {DIVISIONS.map((div, idx) => {
                      const Icon = div.icon;
                      return (
                        <Link
                          key={idx}
                          href={div.href}
                          className="flex items-start space-x-3 p-2.5 rounded-xl hover:bg-brand-gold/15 transition-colors group"
                        >
                          <div className="p-2 rounded-lg bg-[#0B2240] text-brand-gold group-hover:scale-105 transition-transform flex-shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-[#0B2240] group-hover:text-brand-goldDark">
                              {div.name}
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug">
                              {div.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`flex items-center space-x-1 px-3.5 py-2 rounded-md transition-colors ${pathname === "/services"
                  ? "text-[#0B2240] bg-brand-gold/20 font-bold"
                  : "text-slate-700 hover:text-[#0B2240] hover:bg-slate-100"
                  }`}
                aria-expanded={servicesDropdownOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                    {SERVICE_LINKS.map((serv, idx) => (
                      <Link
                        key={idx}
                        href={serv.href}
                        className="block px-3 py-2 text-xs rounded-lg text-slate-700 hover:bg-brand-gold/15 hover:text-[#0B2240] transition-colors"
                      >
                        <div className="font-semibold text-sm text-[#0B2240]">
                          {serv.title}
                        </div>
                        <span className="text-slate-500 text-[11px]">{serv.sub}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-md transition-colors ${isActive("/contact")
                ? "text-[#0B2240] bg-brand-gold/20 font-bold"
                : "text-slate-700 hover:text-[#0B2240] hover:bg-slate-100"
                }`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-md bg-[#0B2240] text-brand-gold hover:bg-brand-gold hover:text-[#0B2240] transition-colors text-xs font-bold shadow-sm"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-[#0B2240] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-[#0B2240] hover:bg-slate-100"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-[#0B2240] hover:bg-slate-100"
              >
                About Us
              </Link>
              {DIVISIONS.map((div, idx) => (
                <Link
                  key={idx}
                  href={div.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#0B2240] hover:bg-slate-100"
                >
                  • {div.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-[#0B2240] hover:bg-slate-100"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-800 hover:text-[#0B2240] hover:bg-slate-100"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Contact Quick Links */}
            <div className="pt-3 border-t border-slate-200/80 space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+8801711775280"
                  className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-50 hover:bg-brand-gold/15 text-slate-700 hover:text-[#0B2240] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block">Dhaka Desk</span>
                    <span className="font-semibold text-slate-800">01711-775280</span>
                  </div>
                </a>
                <a
                  href="tel:+8801711775281"
                  className="flex items-center space-x-1.5 p-2 rounded-lg bg-slate-50 hover:bg-brand-gold/15 text-slate-700 hover:text-[#0B2240] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[10px] text-slate-500 block">Ctg Desk</span>
                    <span className="font-semibold text-slate-800">01711-775281</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3 text-slate-600">
              <a
                href="https://www.facebook.com/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-gold/20 flex items-center justify-center hover:text-[#0B2240] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-gold/20 flex items-center justify-center hover:text-[#0B2240] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-gold/20 flex items-center justify-center hover:text-[#0B2240] transition-all"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
