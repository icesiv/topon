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
  FileDown,
  Download,
} from "lucide-react";

interface DivisionItem {
  name: string;
  tag: string;
  href: string;
  icon: typeof Building2;
}

const DIVISIONS: DivisionItem[] = [
  {
    name: "Top On-Tech",
    tag: "Trading & Sourcing",
    href: "/trading-topontech",
    icon: Building2,
  },
  {
    name: "Top Express Limited",
    tag: "Customs Clearing (C&F)",
    href: "/express-topexpress",
    icon: Truck,
  },
  {
    name: "Daily Shipping & Logistics",
    tag: "Freight Forwarding",
    href: "/logistics-dailyshipping",
    icon: Ship,
  },
  {
    name: "Top On-Agro Farm",
    tag: "Fisheries & Agro",
    href: "/agro-toponagro",
    icon: Fish,
  },
];

const ABOUT_LINKS = [
  { title: "About Top On Group", href: "/about" },
  { title: "Our Journey & Story", href: "/about/journey" },
  { title: "Entrepreneur's Message", href: "/about/message" },
  { title: "Mission, Vision & Values", href: "/about/values" },
  { title: "Milestones & Accreditations", href: "/about/milestones" },
];

const COMPANY_PROFILES = [
  {
    name: "Top Express Limited",
    badge: "Customs C&F",
    pdfUrl: "/profiles/TEL-profile.pdf",
    filename: "TEL-profile.pdf",
    icon: Truck,
    size: "4.9 MB",
  },
  {
    name: "Top On-Tech",
    badge: "Trading House",
    pdfUrl: "/profiles/TopOnTech-profile.pdf",
    filename: "TopOnTech-profile.pdf",
    icon: Building2,
    size: "738 KB",
  },
  {
    name: "Daily Shipping & Logistics",
    badge: "Freight Forwarding",
    pdfUrl: "/profiles/DSL-profile.pdf",
    filename: "DSL-profile.pdf",
    icon: Ship,
    size: "933 KB",
  },
  {
    name: "Top On-Agro Farm",
    badge: "Fisheries & Agro",
    pdfUrl: "/profiles/TopOnAgro-profile.pdf",
    filename: "TopOnAgro-profile.pdf",
    icon: Fish,
    size: "1.0 MB",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [profilesDropdownOpen, setProfilesDropdownOpen] = useState(false);
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
    setProfilesDropdownOpen(false);
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
          <div className="flex items-center space-x-4">
            <a
              href="tel:+8801711775280"
              className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>01711-775280</span>
            </a>

            <span className="text-white/20">|</span>

            <a
              href="mailto:info@toponbd.com"
              className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>info@toponbd.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-400 font-medium mr-1">Dhaka &bull; Chittagong &bull; Mongla</span>
            <div className="flex items-center space-x-1.5">
              <a
                href="https://www.facebook.com/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center text-slate-300 hover:text-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/20 flex items-center justify-center text-slate-300 hover:text-brand-gold transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-2.5"
          : "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-text.png"
              alt="Top On Group"
              width={200}
              height={42}
              quality={100}
              priority
              className="h-8 md:h-10 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 font-medium text-xs sm:text-sm">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${isActive("/") || isActive("/home")
                ? "text-brand-navy bg-brand-gold/15 font-bold"
                : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
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
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${pathname.startsWith("/about")
                  ? "text-brand-navy bg-brand-gold/15 font-bold"
                  : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
                  }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </Link>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-xl shadow-slate-900/10">
                    {ABOUT_LINKS.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="block px-3 py-2 text-xs rounded-lg text-slate-700 hover:bg-slate-50 hover:text-brand-navy transition-colors font-medium"
                      >
                        {item.title}
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
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${isCompanyActive
                  ? "text-brand-navy bg-brand-gold/15 font-bold"
                  : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
                  }`}
                aria-expanded={companyDropdownOpen}
              >
                <span>Divisions</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {companyDropdownOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xl shadow-slate-900/10 space-y-1">
                    {DIVISIONS.map((div, idx) => {
                      const Icon = div.icon;
                      return (
                        <Link
                          key={idx}
                          href={div.href}
                          className="flex items-center space-x-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors flex-shrink-0">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="font-semibold text-xs text-brand-navy group-hover:text-brand-navy">
                              {div.name}
                            </div>
                            <span className="text-[10px] text-slate-500">
                              {div.tag}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Services Simple Nav Item */}
            <Link
              href="/services"
              className={`px-3 py-1.5 rounded-lg transition-colors ${pathname.startsWith("/services")
                ? "text-brand-navy bg-brand-gold/15 font-bold"
                : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
                }`}
            >
              Services
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-1.5 rounded-lg transition-colors ${isActive("/contact")
                ? "text-brand-navy bg-brand-gold/15 font-bold"
                : "text-slate-700 hover:text-brand-navy hover:bg-slate-100"
                }`}
            >
              Contact
            </Link>

            {/* Company Profile PDF Button */}
            <div
              className="relative"
              onMouseEnter={() => setProfilesDropdownOpen(true)}
              onMouseLeave={() => setProfilesDropdownOpen(false)}
            >
              <button
                className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-semibold ${profilesDropdownOpen
                  ? "bg-brand-gold text-brand-navy border-brand-gold shadow-sm"
                  : "bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-navy border-brand-gold/40"
                  }`}
                aria-expanded={profilesDropdownOpen}
              >
                <FileDown className="w-3.5 h-3.5 text-brand-goldDark" />
                <span>Profile</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${profilesDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profilesDropdownOpen && (
                <div className="absolute top-full right-0 w-72 pt-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-xl shadow-slate-900/10 space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 mb-1">
                      Company Profiles (PDF)
                    </div>

                    {COMPANY_PROFILES.map((profile, idx) => {
                      const Icon = profile.icon;
                      return (
                        <a
                          key={idx}
                          href={profile.pdfUrl}
                          download={profile.filename}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group text-xs"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="p-1.5 rounded-lg bg-brand-navy text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors flex-shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="font-semibold text-brand-navy">
                                {profile.name}
                              </div>
                              <span className="text-[10px] text-slate-500">
                                {profile.badge} &bull; {profile.size}
                              </span>
                            </div>
                          </div>
                          <Download className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-navy transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg bg-brand-navy text-white text-xs font-semibold shadow-sm"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-2 mt-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200 text-sm">
            <div className="space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                About Us
              </Link>
              <div className="pl-3 py-1 space-y-1 border-l-2 border-brand-gold/30 ml-3">
                {DIVISIONS.map((div, idx) => (
                  <Link
                    key={idx}
                    href={div.href}
                    className="block px-2 py-1.5 text-xs text-brand-navy font-medium hover:bg-slate-50 rounded"
                  >
                    {div.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/services"
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-lg font-medium text-slate-800 hover:bg-slate-50"
              >
                Contact
              </Link>

              {/* Mobile Company Profile PDFs */}
              <div className="pt-2 border-t border-slate-200">
                <div className="px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Company Profiles (PDF)
                </div>
                <div className="grid grid-cols-2 gap-1.5 mt-1">
                  {COMPANY_PROFILES.map((profile, idx) => (
                    <a
                      key={idx}
                      href={profile.pdfUrl}
                      download={profile.filename}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 text-xs text-brand-navy font-medium hover:bg-brand-gold/15"
                    >
                      <span className="truncate">{profile.name}</span>
                      <Download className="w-3 h-3 text-brand-goldDark flex-shrink-0 ml-1" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Contact Quick Info */}
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 px-1">
              <a href="tel:+8801711775280" className="flex items-center space-x-1 hover:text-brand-navy">
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>01711-775280</span>
              </a>
              <a href="mailto:info@toponbd.com" className="flex items-center space-x-1 hover:text-brand-navy">
                <Mail className="w-3.5 h-3.5 text-brand-gold" />
                <span>info@toponbd.com</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
