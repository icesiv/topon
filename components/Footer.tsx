"use client";

import { useState, useEffect } from "react";
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
  ChevronDown,
} from "lucide-react";
import {
  subscribeGeneralInfo,
  DEFAULT_GENERAL_INFO,
  GeneralInfoData,
} from "@/lib/generalInfo";

export default function Footer() {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>(DEFAULT_GENERAL_INFO);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    divisions: false,
    company: false,
    offices: false,
  });

  useEffect(() => {
    const unsub = subscribeGeneralInfo((data) => setGeneralInfo(data));
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
      {/* ========================================================================= */}
      {/* 1. DESKTOP FOOTER (md and up) - Unchanged layout & styling */}
      {/* ========================================================================= */}
      <div className="hidden md:block">
        {/* Top Banner / Value Strip - Pure White */}
        <div className="bg-white border-b border-slate-200/80 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5 text-left">
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
                className="px-5 py-2.5 rounded-lg bg-brand-navy hover:bg-brand-navyLight text-white font-semibold text-xs transition-all shadow-sm hover:shadow flex items-center space-x-2 group"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12 grid grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 text-xs">
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
              {generalInfo.description ||
                "A premier multi-sector conglomerate empowering trade through import/export sourcing, licensed customs clearing, global freight forwarding, commercial fisheries, and corporate consultancy."}
            </p>

            <div className="pt-1 space-y-2 text-slate-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                <a
                  href={`mailto:${generalInfo.email || "info@toponbd.com"}`}
                  className="hover:text-brand-navy transition-colors font-medium"
                >
                  {generalInfo.email || "info@toponbd.com"}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={`tel:${generalInfo.dhakaPhone?.replace(/[^0-9+]/g, "") || "+8801711775280"}`}
                  className="flex items-center space-x-1.5 hover:text-brand-navy transition-colors font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Dhaka: {generalInfo.dhakaPhone}</span>
                </a>
                {generalInfo.ctgPhone && (
                  <a
                    href={`tel:${generalInfo.ctgPhone?.replace(/[^0-9+]/g, "") || "+8801711775281"}`}
                    className="flex items-center space-x-1.5 hover:text-brand-navy transition-colors font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>CTG: {generalInfo.ctgPhone}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 pt-1">
              {generalInfo.facebookUrl && (
                <a
                  href={generalInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-slate-200/70 hover:bg-brand-navy hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {generalInfo.linkedinUrl && (
                <a
                  href={generalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-slate-200/70 hover:bg-brand-navy hover:text-white flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Group Entities */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-brand-navy font-bold text-xs uppercase tracking-wider">
              <Link href="/divisions" className="hover:text-brand-goldDark transition-colors">
                Group Entities
              </Link>
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link
                  href="/entities/express-topexpress"
                  className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
                >
                  <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Top Express Limited</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/entities/logistics-dailyshipping"
                  className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
                >
                  <Ship className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Daily Shipping</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/entities/trading-topontech"
                  className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Top On-Tech</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/entities/agro-toponagro"
                  className="hover:text-brand-navy transition-colors flex items-center space-x-1.5"
                >
                  <Fish className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                  <span>Top On-Agro Farm</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/entities/consultancy-toponsolution"
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
                <Link href="/articles" className="hover:text-brand-navy transition-colors">
                  Articles &amp; Industry Insights
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-navy transition-colors">
                  Photo Gallery &amp; Media
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
                  {generalInfo.headOfficeAddress}
                </p>
              </div>

              {/* Chattogram Office */}
              <div className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
                <strong className="text-brand-navy font-bold block text-xs">
                  Chattogram Office
                </strong>
                <p className="text-slate-600">
                  {generalInfo.chattogramOfficeAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200/80 bg-white py-4 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between gap-3">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-brand-navy font-semibold">{generalInfo.companyName || "Top On Group"}</strong>. All rights reserved.
            </p>

            <div className="flex items-center space-x-4 text-[11px] text-slate-500">
              <span className="text-brand-goldDark font-semibold">{generalInfo.tagline || "BUILT ON TRUST"}</span>
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
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE FOOTER (< md) - Redesigned Mobile-First Experience */}
      {/* ========================================================================= */}
      <div className="block md:hidden">
        {/* Mobile Call-To-Action Card */}
        <div className="p-4 mx-4 mt-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3.5">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-navy flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-brand-navy" />
            </div>
            <div>
              <h4 className="text-brand-navy font-bold text-sm tracking-tight">
                Trusted Cross-Border Partner
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                100% regulatory compliance across customs, port clearance &amp; freight.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-navyLight active:bg-brand-navyDark text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center space-x-2 group"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Quick Contact Touch-Targets */}
        <div className="px-4 pt-5 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Instant Direct Lines
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={`tel:${generalInfo.dhakaPhone?.replace(/[^0-9+]/g, "") || "+8801711775280"}`}
              className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs active:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-brand-navy" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Dhaka Desk</div>
                <div className="font-mono text-xs font-semibold text-brand-navy truncate mt-0.5">{generalInfo.dhakaPhone}</div>
              </div>
            </a>
            <a
              href={`tel:${generalInfo.ctgPhone?.replace(/[^0-9+]/g, "") || "+8801711775281"}`}
              className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs active:bg-slate-100 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5 text-brand-navy" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">CTG Port Desk</div>
                <div className="font-mono text-xs font-semibold text-brand-navy truncate mt-0.5">{generalInfo.ctgPhone || "01711-775281"}</div>
              </div>
            </a>
          </div>

          <a
            href={`mailto:${generalInfo.email || "info@toponbd.com"}`}
            className="mt-2 flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs active:bg-slate-100 transition-colors"
          >
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/15 border border-brand-gold/25 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5 text-brand-navy" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">Email Inquiries</div>
                <div className="text-xs font-medium text-brand-navy truncate mt-0.5">{generalInfo.email || "info@toponbd.com"}</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-brand-goldDark flex-shrink-0 px-2 py-1 rounded-md bg-brand-gold/10">
              Send Email
            </span>
          </a>
        </div>

        {/* Brand Summary & Social Connections */}
        <div className="px-4 py-4 space-y-3">
          <Link href="/" className="inline-block">
            <Image
              src="/logo-text.png"
              alt={generalInfo.companyName || "Top On Group"}
              width={160}
              height={36}
              quality={100}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed">
            {generalInfo.description ||
              "A premier multi-sector conglomerate empowering trade through import/export sourcing, licensed customs clearing, global freight forwarding, commercial fisheries, and corporate consultancy."}
          </p>
          <div className="flex items-center space-x-2.5 pt-1">
            <span className="text-xs font-medium text-slate-500">Connect:</span>
            {generalInfo.facebookUrl && (
              <a
                href={generalInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-navy active:bg-slate-100 transition-colors shadow-2xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {generalInfo.linkedinUrl && (
              <a
                href={generalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-brand-navy active:bg-slate-100 transition-colors shadow-2xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile Accordion Navigation */}
        <div className="px-4 py-2 space-y-2">
          {/* Section 1: Business Divisions */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleSection("divisions")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-bold text-xs text-brand-navy uppercase tracking-wider"
              aria-expanded={openSections.divisions}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Group Entities (5)</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.divisions ? "rotate-180 text-brand-gold" : ""
                  }`}
              />
            </button>
            {openSections.divisions && (
              <div className="px-4 pb-3.5 pt-1 border-t border-slate-100 space-y-2 text-xs">
                <Link
                  href="/entities/express-topexpress"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Truck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">Top Express Limited</div>
                      <div className="text-[10px] text-slate-400">Customs Clearing &amp; Forwarding (C&amp;F)</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-gold transition-colors" />
                </Link>
                <Link
                  href="/entities/logistics-dailyshipping"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Ship className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">Daily Shipping &amp; Logistics</div>
                      <div className="text-[10px] text-slate-400">Freight Forwarding &amp; Port Logistics</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-gold transition-colors" />
                </Link>
                <Link
                  href="/entities/trading-topontech"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Building2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">Top On-Tech</div>
                      <div className="text-[10px] text-slate-400">Import, Export, Trading &amp; Sourcing</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-gold transition-colors" />
                </Link>
                <Link
                  href="/entities/agro-toponagro"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Fish className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">Top On-Agro Farm</div>
                      <div className="text-[10px] text-slate-400">Commercial Fisheries &amp; Agro Ventures</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-gold transition-colors" />
                </Link>
                <Link
                  href="/entities/consultancy-toponsolution"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors group"
                >
                  <div className="flex items-center space-x-2.5">
                    <Briefcase className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-brand-navy">Top On-Solution</div>
                      <div className="text-[10px] text-slate-400">Business Advisory &amp; Consultancy</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-gold transition-colors" />
                </Link>
              </div>
            )}
          </div>

          {/* Section 2: Company & Resources */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleSection("company")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-bold text-xs text-brand-navy uppercase tracking-wider"
              aria-expanded={openSections.company}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Company &amp; Resources</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.company ? "rotate-180 text-brand-gold" : ""
                  }`}
              />
            </button>
            {openSections.company && (
              <div className="px-4 pb-3.5 pt-1 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/about"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  About Top On Group
                </Link>
                <Link
                  href="/about/journey"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  Our Journey &amp; Story
                </Link>
                <Link
                  href="/about/values"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  Mission &amp; Values
                </Link>
                <Link
                  href="/services"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  Services Catalog
                </Link>
                <Link
                  href="/articles"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  Articles &amp; Insights
                </Link>
                <Link
                  href="/gallery"
                  className="p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-slate-700 hover:text-brand-navy font-medium"
                >
                  Photo Gallery
                </Link>
                <Link
                  href="/contact"
                  className="col-span-2 p-2 rounded-lg hover:bg-slate-50 active:bg-slate-100 transition-colors text-brand-navy font-semibold flex items-center justify-between"
                >
                  <span>Contact &amp; Port Desks</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>
              </div>
            )}
          </div>

          {/* Section 3: Office Locations */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleSection("offices")}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left font-bold text-xs text-brand-navy uppercase tracking-wider"
              aria-expanded={openSections.offices}
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Our Offices</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.offices ? "rotate-180 text-brand-gold" : ""
                  }`}
              />
            </button>
            {openSections.offices && (
              <div className="px-4 pb-3.5 pt-1 border-t border-slate-100 space-y-2.5 text-xs">
                {/* Dhaka Head Office */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-brand-navy font-bold text-xs">Head Office (Dhaka)</strong>
                    <a
                      href={`tel:${generalInfo.dhakaPhone?.replace(/[^0-9+]/g, "") || "+8801711775280"}`}
                      className="text-[10px] text-brand-goldDark font-mono font-semibold flex items-center space-x-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {generalInfo.headOfficeAddress}
                  </p>
                </div>

                {/* Chattogram Office */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-brand-navy font-bold text-xs">Chattogram Office</strong>
                    {generalInfo.ctgPhone && (
                      <a
                        href={`tel:${generalInfo.ctgPhone?.replace(/[^0-9+]/g, "") || "+8801711775281"}`}
                        className="text-[10px] text-brand-goldDark font-mono font-semibold flex items-center space-x-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {generalInfo.chattogramOfficeAddress}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="block text-center py-2 text-[11px] text-brand-navy font-semibold hover:underline"
                >
                  View All Customs Desks &amp; Operating Ports &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="border-t border-slate-200/90 bg-white px-4 py-5 mt-4 space-y-3 text-center text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px]">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-goldDark font-bold text-[10px] tracking-wide">
              {generalInfo.tagline || "BUILT ON TRUST"}
            </span>
            <Link href="/contact" className="hover:text-brand-navy transition-colors font-medium">
              Privacy &amp; Terms
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/contact" className="hover:text-brand-navy transition-colors font-medium">
              Compliance
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/contact" className="hover:text-brand-navy transition-colors font-medium">
              Port Desks
            </Link>
          </div>
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} <strong className="text-brand-navy font-semibold">{generalInfo.companyName || "Top On Group"}</strong>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
