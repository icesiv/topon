"use client";

import { useState } from "react";
import { Send, CheckCircle2, Building2, Ship, AlertCircle } from "lucide-react";

interface QuoteFormProps {
  defaultDivision?: "topontech" | "dailyshipping" | "both";
  compact?: boolean;
}

export default function QuoteForm({ defaultDivision = "both", compact = false }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    division: defaultDivision === "both" ? "trading" : defaultDivision === "topontech" ? "trading" : "logistics",
    serviceType: "general",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-emerald-500/40 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-serif text-[#0B2240]">Inquiry Transmitted Successfully</h3>
        <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to <strong>Top On Group</strong>. Our commercial and operations desk has received your request and will review your specifications within 2–4 business hours.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                companyName: "",
                contactPerson: "",
                email: "",
                phone: "",
                division: "trading",
                serviceType: "general",
                message: "",
              });
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:border-brand-gold hover:text-brand-navy text-xs font-bold transition-all"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4 ${
        compact ? "text-xs" : "text-sm"
      }`}
    >
      <div className="space-y-1 mb-2">
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B2240] flex items-center space-x-2">
          <span>Request Corporate Quotation / Consultation</span>
        </h3>
        <p className="text-xs text-slate-500">
          Direct inquiry to Top On-Tech & Daily Shipping & Logistics desks.
        </p>
      </div>

      {/* Division Selector */}
      <div>
        <label className="block text-xs font-bold text-[#0B2240] uppercase tracking-wider mb-1.5">
          Select Target Business Division *
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, division: "trading" })}
            className={`flex items-center justify-center space-x-2 p-3 rounded-xl border text-xs font-bold transition-all ${
              formData.division === "trading"
                ? "bg-[#0B2240] text-brand-gold border-[#0B2240] shadow-md"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-gold"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Top On-Tech (Trading)</span>
          </button>

          <button
            type="button"
            onClick={() => setFormData({ ...formData, division: "logistics" })}
            className={`flex items-center justify-center space-x-2 p-3 rounded-xl border text-xs font-bold transition-all ${
              formData.division === "logistics"
                ? "bg-[#0B2240] text-brand-gold border-[#0B2240] shadow-md"
                : "bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-gold"
            }`}
          >
            <Ship className="w-4 h-4" />
            <span>Daily Shipping (Freight & C&F)</span>
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. Apex Industrial Ltd."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person *</label>
          <input
            type="text"
            required
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            placeholder="e.g. Tariq Ahmed"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1700-000000"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
          />
        </div>
      </div>

      {/* Service Type Selection */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Requirement Category</label>
        <select
          value={formData.serviceType}
          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
        >
          {formData.division === "trading" ? (
            <>
              <option value="machinery">Industrial Machinery & Spare Parts</option>
              <option value="chemicals">Chemicals & Industrial Raw Materials</option>
              <option value="textiles">Textile Fabrics & Production Inputs</option>
              <option value="electronics">Electronics & Consumer Goods Sourcing</option>
              <option value="general_trade">General Cross-Border Import / Export</option>
            </>
          ) : (
            <>
              <option value="ocean_freight">Ocean Freight Forwarding (FCL / LCL)</option>
              <option value="customs_cnf">Customs Clearance & Brokerage (C&F)</option>
              <option value="air_cargo">Air Freight Cargo</option>
              <option value="port_handling">Chittagong / Mongla Port Handling</option>
              <option value="multimodal">Complete Multimodal Supply Chain Solution</option>
            </>
          )}
        </select>
      </div>

      {/* Details / Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Detailed Specifications & Timeline *
        </label>
        <textarea
          required
          rows={compact ? 3 : 4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Please describe volume, origin/destination ports, HS codes, or product specifications..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-gold focus:bg-white transition-colors text-xs"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
      >
        {loading ? (
          <span>Processing Quotation Request...</span>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Transmit Inquiry to Commercial Desk</span>
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500 text-center flex items-center justify-center space-x-1.5 pt-1">
        <AlertCircle className="w-3.5 h-3.5 text-brand-gold" />
        <span>All corporate trade inquiries are held under strict non-disclosure.</span>
      </p>
    </form>
  );
}
