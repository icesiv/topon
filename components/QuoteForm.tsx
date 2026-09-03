"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Building2,
  Ship,
  Truck,
  Fish,
  AlertCircle,
  Clock,
  ShieldCheck,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

interface QuoteFormProps {
  defaultDivision?: "topontech" | "dailyshipping" | "topexpress" | "agro" | "both";
  compact?: boolean;
}

export default function QuoteForm({ defaultDivision = "both", compact = false }: QuoteFormProps) {
  const getInitialDivision = () => {
    switch (defaultDivision) {
      case "topontech":
        return "trading";
      case "topexpress":
        return "customs";
      case "dailyshipping":
        return "freight";
      case "agro":
        return "agro";
      default:
        return "trading";
    }
  };

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    division: getInitialDivision(),
    serviceType: "machinery",
    estimatedVolume: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const divisions = [
    {
      id: "trading",
      name: "Top On-Tech",
      role: "Import, Export & Trading",
      icon: Building2,
      defaultCategory: "machinery",
    },
    {
      id: "customs",
      name: "Top Express Ltd.",
      role: "Customs Clearing (C&F)",
      icon: FileCheck2,
      defaultCategory: "port_customs",
    },
    {
      id: "freight",
      name: "Daily Shipping",
      role: "Freight Forwarding",
      icon: Ship,
      defaultCategory: "ocean_fcl",
    },
    {
      id: "agro",
      name: "Top On-Agro",
      role: "Fisheries & Aquaculture",
      icon: Fish,
      defaultCategory: "bulk_fish",
    },
  ];

  const handleDivisionChange = (divisionId: string, defaultCat: string) => {
    setFormData((prev) => ({
      ...prev,
      division: divisionId,
      serviceType: defaultCat,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-brand-gold/40 text-center space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-goldDark">
            Inquiry Reference: TOG-{Math.floor(100000 + Math.random() * 900000)}
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240]">
            Corporate Request Transmitted
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
            Thank you for connecting with <strong>Top On Group</strong>. Our specialized commercial division desk has logged your specifications and will deliver a preliminary proposal within <strong>2–4 business hours</strong>.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                companyName: "",
                contactPerson: "",
                email: "",
                phone: "",
                division: getInitialDivision(),
                serviceType: "machinery",
                estimatedVolume: "",
                message: "",
              });
            }}
            className="px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            Submit Another Inquiry
          </button>
          <a
            href="mailto:info@toponbd.com"
            className="px-5 py-3 rounded-xl border border-slate-200 hover:border-brand-gold text-slate-700 text-xs font-semibold transition-all"
          >
            Direct Desk: info@toponbd.com
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl shadow-slate-900/5 space-y-6 ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-100 pb-5 space-y-1.5">
        <div className="flex items-center space-x-2 text-xs font-bold text-brand-goldDark uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Priority Desk • 2–4 Hr Commercial Response</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B2240] tracking-tight">
          Request Corporate Quotation / Consultation
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 font-light">
          Submit your requirements directly to Top On Group&apos;s division directors across Bangladesh.
        </p>
      </div>

      {/* Division Selector: 4 Modern Interactive Cards */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider">
          1. Select Target Operating Division *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {divisions.map((div) => {
            const Icon = div.icon;
            const isSelected = formData.division === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => handleDivisionChange(div.id, div.defaultCategory)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 group relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#0B2240] text-white border-[#0B2240] shadow-md ring-2 ring-brand-gold/30"
                    : "bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-brand-gold/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isSelected
                        ? "bg-brand-gold text-brand-navy"
                        : "bg-white text-[#0B2240] border border-slate-200 group-hover:border-brand-gold/40"
                    } transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                  )}
                </div>
                <div>
                  <div
                    className={`font-bold text-xs ${
                      isSelected ? "text-white" : "text-[#0B2240]"
                    }`}
                  >
                    {div.name}
                  </div>
                  <div
                    className={`text-[10px] leading-tight mt-0.5 ${
                      isSelected ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {div.role}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Inputs Section */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider">
          2. Organization &amp; Contact Details *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Company / Enterprise Name *
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. Apex Industrial Sourcing Ltd."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Contact Person &amp; Designation *
            </label>
            <input
              type="text"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              placeholder="e.g. Tariq Ahmed (Supply Chain Head)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Corporate Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tariq@apexindustrial.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Phone / WhatsApp Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+880 1712-345678"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Service Requirement Category */}
      <div className="space-y-4">
        <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider">
          3. Requirement Scope &amp; Category
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Service Category *
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs font-medium"
            >
              {formData.division === "trading" && (
                <>
                  <option value="machinery">Industrial Machinery &amp; CNC Plant Equipment</option>
                  <option value="chemicals">Industrial Chemicals, Reagents &amp; Dyes</option>
                  <option value="textiles">Textile &amp; RMG Manufacturing Inputs</option>
                  <option value="electronics">Electronics &amp; Commercial Component Sourcing</option>
                  <option value="general_trade">Bilateral Import / Export Trade Facilitation</option>
                </>
              )}
              {formData.division === "customs" && (
                <>
                  <option value="port_customs">Chittagong / Mongla Port Customs Clearance (C&amp;F)</option>
                  <option value="air_customs">HSIA Dhaka Air Cargo Village Clearance</option>
                  <option value="icd_customs">Dhaka ICD Kamalapur Customs Handling</option>
                  <option value="hs_code">NBR HS Code Tariff Classification &amp; SRO Advisory</option>
                  <option value="advance_boe">Advance Bill of Entry &amp; Demurrage Minimization</option>
                </>
              )}
              {formData.division === "freight" && (
                <>
                  <option value="ocean_fcl">Ocean Freight Forwarding (Full Container FCL)</option>
                  <option value="ocean_lcl">Ocean Freight Forwarding (Consolidated LCL)</option>
                  <option value="air_cargo">Expedited Air Freight Logistics (HSIA)</option>
                  <option value="multimodal">Inland Haulage &amp; Container Linehaul Distribution</option>
                  <option value="project_cargo">Heavy-Lift Breakbulk &amp; Project Cargo</option>
                </>
              )}
              {formData.division === "agro" && (
                <>
                  <option value="bulk_fish">Commercial Bulk Wholesale Freshwater Fish Supply</option>
                  <option value="fingerlings">Certified Hatchery Broodstock &amp; Fingerlings</option>
                  <option value="cold_chain">Cold-Chain Temperature Controlled Transport</option>
                  <option value="biofloc">Commercial Aerated &amp; Biofloc Pond Consulting</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Estimated Volume / Containers / Weight (Optional)
            </label>
            <input
              type="text"
              value={formData.estimatedVolume}
              onChange={(e) => setFormData({ ...formData, estimatedVolume: e.target.value })}
              placeholder="e.g. 5x 40ft FCL monthly / 50 MT"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Detailed Specifications, Ports, HS Codes or Timelines *
          </label>
          <textarea
            required
            rows={compact ? 3 : 4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please detail your cargo description, origin/destination ports, target delivery timeline, or technical requirements..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white transition-all text-xs leading-relaxed"
          />
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] text-slate-600">
        <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-150">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">Confidential NDA Protection</span>
        </div>
        <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-150">
          <CheckCircle2 className="w-4 h-4 text-brand-goldDark shrink-0" />
          <span className="font-medium">NBR &amp; Port Compliant</span>
        </div>
        <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-50 border border-slate-150">
          <Clock className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-medium">2–4 Hour Review SLA</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 px-6 rounded-2xl bg-[#0B2240] hover:bg-[#133560] text-brand-gold font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-2xl flex items-center justify-center space-x-2 group hover:-translate-y-0.5"
      >
        {loading ? (
          <span className="animate-pulse">Processing Commercial Transmission...</span>
        ) : (
          <>
            <span>Transmit Inquiry to Commercial Desk</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center flex items-center justify-center space-x-1.5 pt-0.5">
        <AlertCircle className="w-3.5 h-3.5 text-brand-gold" />
        <span>Inquiries are reviewed directly by Top On Group&apos;s licensed operations team in Dhaka.</span>
      </p>
    </form>
  );
}
