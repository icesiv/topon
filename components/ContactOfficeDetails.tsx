"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import {
  subscribeGeneralInfo,
  DEFAULT_GENERAL_INFO,
  GeneralInfoData,
} from "@/lib/generalInfo";

export default function ContactOfficeDetails() {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>(DEFAULT_GENERAL_INFO);

  useEffect(() => {
    const unsub = subscribeGeneralInfo((data) => setGeneralInfo(data));
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
      <div>
        <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono mb-1">
          Our Locations
        </span>
        <h2 className="text-xl font-bold font-serif text-[#0B2240] flex items-center space-x-2.5">
          <Building2 className="w-5 h-5 text-brand-navy" />
          <span>Corporate Offices</span>
        </h2>
      </div>

      <div className="space-y-4 text-xs text-slate-700">
        {/* Head Office */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center space-x-2 text-[#0B2240] font-bold font-serif text-sm">
            <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <span>Head Office (Dhaka)</span>
          </div>
          <p className="text-slate-600 leading-relaxed pl-6">
            {generalInfo.headOfficeAddress}
          </p>
          <div className="pl-6 pt-1 flex items-center space-x-2 text-slate-700">
            <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
            <a
              href={`tel:${generalInfo.dhakaPhone?.replace(/[^0-9+]/g, "") || "+8801711775280"}`}
              className="hover:text-brand-navy font-semibold font-mono"
            >
              {generalInfo.dhakaPhone}
            </a>
          </div>
        </div>

        {/* Chattogram Office */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center space-x-2 text-[#0B2240] font-bold font-serif text-sm">
            <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <span>Chattogram Office</span>
          </div>
          <p className="text-slate-600 leading-relaxed pl-6">
            {generalInfo.chattogramOfficeAddress}
          </p>
          {generalInfo.ctgPhone && (
            <div className="pl-6 pt-1 flex items-center space-x-2 text-slate-700">
              <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <a
                href={`tel:${generalInfo.ctgPhone?.replace(/[^0-9+]/g, "") || "+8801711775281"}`}
                className="hover:text-brand-navy font-semibold font-mono"
              >
                {generalInfo.ctgPhone}
              </a>
            </div>
          )}
        </div>

        {/* Email & Operating Hours */}
        <div className="pt-2 space-y-2.5 border-t border-slate-100">
          <div className="flex items-start space-x-3">
            <Mail className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Corporate Communications</strong>
              <a
                href={`mailto:${generalInfo.email || "info@toponbd.com"}`}
                className="text-brand-navy hover:text-brand-gold font-semibold"
              >
                {generalInfo.email || "info@toponbd.com"}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block">Operating Hours</strong>
              <span className="text-slate-600">
                {generalInfo.operatingHours || "Sat – Thu: 10:00 AM – 07:00 PM (GMT+6)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
