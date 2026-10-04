"use client";

import { useState, useEffect, useRef } from "react";
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
  Briefcase,
  Facebook,
  Linkedin,
  FileDown,
  Download,
  ArrowRight,
  Sparkles,
  History,
  ShieldCheck,
  Award,
  Users,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface DivisionItem {
  name: string;
  tag: string;
  href: string;
  icon: typeof Building2;
}

const DIVISIONS: DivisionItem[] = [
  {
    name: "Top Express Limited",
    tag: "Customs Clearing & Forwarding (C&F)",
    href: "/divisions/express-topexpress",
    icon: Truck,
  },
  {
    name: "Daily Shipping & Logistics",
    tag: "Freight Forwarding",
    href: "/divisions/logistics-dailyshipping",
    icon: Ship,
  },
  {
    name: "Top On-Tech",
    tag: "Import, Export, Trading & Sourcing with Supply",
    href: "/divisions/trading-topontech",
    icon: Building2,
  },
  {
    name: "Top On-Agro Farm",
    tag: "Fisheries & Agro",
    href: "/divisions/agro-toponagro",
    icon: Fish,
  },
  {
    name: "Top On-Solution",
    tag: "Business Advisory & Professional Services",
    href: "/divisions/consultancy-toponsolution",
    icon: Briefcase,
  },
];

const ABOUT_LINKS = [
  {
    title: "About Top On Group",
    href: "/about",
    icon: Building2,
  },
  {
    title: "Our Journey & Story",
    href: "/about/journey",
    icon: History,
  },
  {
    title: "About the Group CEO",
    href: "/about/about-ceo",
    icon: Users,
  },
  {
    title: "Message from Group CEO.",
    href: "/about/message",
    icon: Users,
  },
  {
    title: "Mission, Vision & Values",
    href: "/about/values",
    icon: ShieldCheck,
  },
  {
    title: "Milestones & Accreditations",
    href: "/about/milestones",
    icon: Award,
  },
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
    name: "Daily Shipping & Logistics",
    badge: "Freight Forwarding",
    pdfUrl: "/profiles/DSL-profile.pdf",
    filename: "DSL-profile.pdf",
    icon: Ship,
    size: "933 KB",
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
    name: "Top On-Agro Farm",
    badge: "Fisheries & Agro",
    pdfUrl: "/profiles/TopOnAgro-profile.pdf",
    filename: "TopOnAgro-profile.pdf",
    icon: Fish,
    size: "1.0 MB",
  },
  {
    name: "Top On-Solution",
    badge: "Business Advisory & Professional Services",
    pdfUrl: "/profiles/TopOnSolution-profile.pdf",
    filename: "TopOnSolution-profile.pdf",
    icon: Briefcase,
    size: "529 KB",
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
    pathname.startsWith("/divisions") ||
    pathname.includes("topontech") ||
    pathname.includes("dailyshipping") ||
    pathname.includes("topexpress") ||
    pathname.includes("toponagro") ||
    pathname.includes("toponsolution");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white">
      {/* 1. Top Utility Bar - Dark Corporate Theme */}
      <div className="bg-[#051120] text-slate-300 text-xs border-b border-white/[0.08] hidden lg:block select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
          {/* Left: Direct Contact & Live Status */}
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2 text-slate-300">
              <a
                href="tel:+8801711775280"
                className="flex items-center space-x-1.5 text-slate-300 hover:text-brand-gold transition-colors font-medium text-[11.5px]"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <span>+880 1711-775280 - 81</span>
              </a>
            </div>

            <span className="text-white/20">|</span>

            <a
              href="mailto:info@toponbd.com"
              className="flex items-center space-x-1.5 text-slate-300 hover:text-brand-gold transition-colors font-medium text-[11.5px]"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>info@toponbd.com</span>
            </a>
          </div>

          {/* Right: Key Hubs & Social Links */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium">
              <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
              <span>Dhaka &bull; Chattogram &bull; Benapole</span>
            </div>

            <span className="text-white/20">|</span>

            <div className="flex items-center space-x-1.5">
              <a
                href="https://www.facebook.com/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/25 hover:text-brand-gold flex items-center justify-center text-slate-300 transition-all duration-200"
                aria-label="Top On Group on Facebook"
              >
                <Facebook className="w-3.2 h-3.2" />
              </a>
              <a
                href="https://www.linkedin.com/company/topongroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-brand-gold/25 hover:text-brand-gold flex items-center justify-center text-slate-300 transition-all duration-200"
                aria-label="Top On Group on LinkedIn"
              >
                <Linkedin className="w-3.2 h-3.2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Desktop & Mobile Navigation Bar - 100% Solid Opaque White */}
      <nav
        className={`transition-all duration-300 bg-white border-b border-slate-200/90 ${isScrolled
          ? "shadow-md shadow-slate-900/10 py-2.5"
          : "shadow-sm shadow-slate-900/5 py-3.5"
          }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with 100% Quality & Smooth Micro-interaction */}
          <Link
            href="/"
            className="flex items-center group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg"
          >
            <Image
              src="/logo-text.png"
              alt="Top On Group"
              width={220}
              height={46}
              quality={100}
              priority
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-[13px] font-semibold text-slate-800">
            {/* Home */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${isActive("/") || isActive("/home")
                ? "text-brand-navy font-bold bg-slate-100"
                : "hover:text-brand-navy hover:bg-slate-100/80"
                }`}
            >
              <span>Home</span>
              {(isActive("/") || isActive("/home")) && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>

            {/* About Dropdown (Mega / Rich Card) */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <Link
                href="/about"
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${pathname.startsWith("/about")
                  ? "text-brand-navy font-bold bg-slate-100"
                  : "hover:text-brand-navy hover:bg-slate-100/80"
                  }`}
                aria-expanded={aboutDropdownOpen}
              >
                <span>About</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutDropdownOpen ? "rotate-180 text-brand-gold" : "text-slate-500"
                    }`}
                />
                {pathname.startsWith("/about") && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
                )}
              </Link>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 w-[420px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 overflow-hidden">
                    {/* Links List */}
                    <div className="p-2 space-y-1">
                      {ABOUT_LINKS.map((item, idx) => {
                        const Icon = item.icon;
                        const isCurrent = pathname === item.href;
                        return (
                          <Link
                            key={idx}
                            href={item.href}
                            className={`flex items-center space-x-3 p-2.5 rounded-xl transition-all group ${isCurrent
                              ? "bg-brand-navy/5 text-brand-navy"
                              : "hover:bg-slate-50 text-slate-800"
                              }`}
                          >
                            <div className="p-2 rounded-lg bg-slate-100 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-gold transition-colors flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-slate-900 group-hover:text-brand-navy transition-colors flex items-center justify-between">
                                <span>{item.title}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Divisions Dropdown (Mega 2-Column Showcase) */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyDropdownOpen(true)}
              onMouseLeave={() => setCompanyDropdownOpen(false)}
            >
              <button
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 relative ${isCompanyActive
                  ? "text-brand-navy font-bold bg-slate-100"
                  : "hover:text-brand-navy hover:bg-slate-100/80"
                  }`}
                aria-expanded={companyDropdownOpen}
              >
                <span>Group Entities</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? "rotate-180 text-brand-gold" : "text-slate-500"
                    }`}
                />
                {isCompanyActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
                )}
              </button>

              {companyDropdownOpen && (
                <div className="absolute top-full -left-20 xl:left-0 w-[640px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/15 overflow-hidden">
                    {/* Header Banner */}
                    <div className="px-5 py-3 bg-gradient-to-r from-[#061324] via-[#0B2240] to-[#133560] text-white flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">
                            Operating Companies
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-0.5">
                          5 Specialized Divisions Driving International Trade &amp; Industry
                        </p>
                      </div>
                      <Link
                        href="/services"
                        className="text-[11px] font-semibold text-brand-gold hover:underline flex items-center space-x-1"
                      >
                        <span>All Capabilities</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="p-3 grid grid-cols-2 gap-2">
                      {DIVISIONS.map((div, idx) => {
                        const Icon = div.icon;
                        const isCurrent = pathname === div.href;
                        return (
                          <Link
                            key={idx}
                            href={div.href}
                            className={`flex items-start space-x-3 p-2.5 rounded-xl transition-all duration-200 group border ${isCurrent
                              ? "bg-brand-navy/5 border-brand-navy/20"
                              : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50/90"
                              }`}
                          >
                            <div className="p-2.5 rounded-xl bg-brand-navy text-brand-gold group-hover:scale-105 group-hover:bg-[#061324] transition-all flex-shrink-0 mt-0.5 shadow-xs">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-brand-navy transition-colors truncate">
                                  {div.name}
                                </span>
                                <ArrowRight className="w-3 h-3 text-brand-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
                              </div>
                              <span className="inline-block text-[10px] font-bold text-brand-goldDark uppercase tracking-wider mt-0.5">
                                {div.tag}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Bottom Cross-Division Helper */}
                    <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        Need cross-division sourcing, clearing &amp; shipping?
                      </span>
                      <Link
                        href="/contact"
                        className="text-[11px] font-bold text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
                      >
                        <span>Consult Our Team</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <Link
              href="/services"
              className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${pathname.startsWith("/services")
                ? "text-brand-navy font-bold bg-slate-100"
                : "hover:text-brand-navy hover:bg-slate-100/80"
                }`}
            >
              <span>Services</span>
              {pathname.startsWith("/services") && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>


            {/* articles */}
            <Link
              href="/articles"
              className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${pathname.startsWith("/services")
                ? "text-brand-navy font-bold bg-slate-100"
                : "hover:text-brand-navy hover:bg-slate-100/80"
                }`}
            >
              <span>Articles</span>
              {pathname.startsWith("/articles") && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>

            {/* Gallery */}
            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${pathname.startsWith("/services")
                ? "text-brand-navy font-bold bg-slate-100"
                : "hover:text-brand-navy hover:bg-slate-100/80"
                }`}
            >
              <span>Gallery</span>
              {pathname.startsWith("/gallery") && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-all duration-200 relative ${isActive("/contact")
                ? "text-brand-navy font-bold bg-slate-100"
                : "hover:text-brand-navy hover:bg-slate-100/80"
                }`}
            >
              <span>Contact</span>
              {isActive("/contact") && (
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-brand-gold rounded-full" />
              )}
            </Link>
          </div>

          {/* Desktop Right Action Area: Profiles & CTA */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Company Profiles PDF Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProfilesDropdownOpen(true)}
              onMouseLeave={() => setProfilesDropdownOpen(false)}
            >
              <button
                className={`inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all duration-200 ${profilesDropdownOpen
                  ? "bg-brand-gold/20 text-brand-navy border-brand-gold shadow-xs"
                  : "bg-slate-100/80 hover:bg-brand-gold/15 text-slate-800 hover:text-brand-navy border-slate-300 hover:border-brand-gold/40"
                  }`}
                aria-expanded={profilesDropdownOpen}
              >
                <FileDown className="w-3.5 h-3.5 text-brand-goldDark" />
                <span>Profiles</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${profilesDropdownOpen ? "rotate-180 text-brand-navy" : ""
                    }`}
                />
              </button>

              {profilesDropdownOpen && (
                <div className="absolute top-full right-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-2.5 shadow-2xl shadow-slate-900/15 space-y-1">
                    <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Official Profiles (PDF)
                      </span>
                      <span className="text-[10px] text-brand-goldDark font-semibold">5 Documents</span>
                    </div>

                    {COMPANY_PROFILES.map((profile, idx) => {
                      const Icon = profile.icon;
                      return (
                        <a
                          key={idx}
                          href={profile.pdfUrl}
                          download={profile.filename}
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors group text-xs"
                        >
                          <div className="flex items-center space-x-2.5 min-w-0">
                            <div className="p-1.5 rounded-lg bg-brand-navy text-brand-gold group-hover:bg-[#061324] transition-colors flex-shrink-0">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="truncate">
                              <div className="font-semibold text-slate-900 group-hover:text-brand-navy transition-colors truncate">
                                {profile.name}
                              </div>
                              <span className="text-[10px] text-slate-500">
                                {profile.badge} &bull; {profile.size}
                              </span>
                            </div>
                          </div>
                          <div className="p-1.5 rounded-lg text-slate-400 group-hover:text-brand-navy group-hover:bg-brand-gold/15 transition-all flex-shrink-0 ml-2">
                            <Download className="w-3.5 h-3.5" />
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/contact"
              className="px-3 py-1.5 rounded-lg bg-[#0B2240] text-white text-xs font-semibold shadow-xs border border-brand-gold/30"
            >
              Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:text-brand-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 mt-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 text-sm">
            <div className="space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-xl font-medium ${isActive("/") ? "bg-brand-navy/5 text-brand-navy font-bold" : "text-slate-800 hover:bg-slate-50"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-xl font-medium ${pathname.startsWith("/about")
                  ? "bg-brand-navy/5 text-brand-navy font-bold"
                  : "text-slate-800 hover:bg-slate-50"
                  }`}
              >
                About Us
              </Link>

              {/* Mobile Divisions Section */}
              <div className="pt-1 pb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-1">
                  Operating Divisions
                </span>
                <div className="pl-3 py-1 space-y-1 border-l-2 border-brand-gold/40 ml-3">
                  {DIVISIONS.map((div, idx) => (
                    <Link
                      key={idx}
                      href={div.href}
                      className="block px-2.5 py-1.5 text-xs text-brand-navy font-medium hover:bg-slate-50 rounded-lg"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/services"
                className={`block px-3 py-2 rounded-xl font-medium ${pathname.startsWith("/services")
                  ? "bg-brand-navy/5 text-brand-navy font-bold"
                  : "text-slate-800 hover:bg-slate-50"
                  }`}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-xl font-medium ${isActive("/contact")
                  ? "bg-brand-navy/5 text-brand-navy font-bold"
                  : "text-slate-800 hover:bg-slate-50"
                  }`}
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
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 px-1">
              <a href="tel:+8801711775280" className="flex items-center space-x-1.5 hover:text-brand-navy">
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>+880 1711-775280</span>
              </a>
              <a href="mailto:info@toponbd.com" className="flex items-center space-x-1.5 hover:text-brand-navy">
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
