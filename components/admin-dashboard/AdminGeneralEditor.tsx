"use client";

import { useState, useEffect, useRef } from "react";
import {
  DEFAULT_GENERAL_INFO,
  GeneralInfoData,
  getGeneralInfoSync,
  saveGeneralInfo,
  subscribeGeneralInfo,
} from "@/lib/generalInfo";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  FileText,
  Info,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function AdminGeneralEditor() {
  const { user } = useAuth();
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>(DEFAULT_GENERAL_INFO);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isDirtyRef = useRef(false);
  isDirtyRef.current = isDirty;

  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const unsub = subscribeGeneralInfo((data) => {
      // NEVER overwrite user inputs while they are actively typing/editing
      if (!isDirtyRef.current) {
        setGeneralInfo(data);
      }
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const updateField = (field: keyof GeneralInfoData, value: string) => {
    setIsDirty(true);
    isDirtyRef.current = true;
    setGeneralInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDiscardChanges = () => {
    setIsDirty(false);
    isDirtyRef.current = false;
    const currentSync = getGeneralInfoSync();
    setGeneralInfo(currentSync);
    setSaveStatus({
      type: "info",
      message: "Discarded unsaved changes. Reverted to last saved data.",
    });
  };

  const handleSaveGeneralInfo = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await saveGeneralInfo(generalInfo, user?.email || undefined);
      if (res.success) {
        setIsDirty(false);
        isDirtyRef.current = false;
        setSaveStatus({
          type: "success",
          message: "General Info successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save general info.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {saveStatus.type && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-200 ${saveStatus.type === "success"
            ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-200"
            : saveStatus.type === "info"
              ? "bg-blue-500/20 border border-blue-500/50 text-blue-200"
              : "bg-red-500/20 border border-red-500/50 text-red-200"
            }`}
        >
          <div className="flex items-center space-x-2.5">
            {saveStatus.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            ) : saveStatus.type === "info" ? (
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </div>
          <button
            onClick={() => setSaveStatus({ type: null, message: "" })}
            className="text-xs opacity-70 hover:opacity-100 underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div>
              {isDirty ? (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                  Unsaved Changes
                </span>
              ) : (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                  Synced
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isDirty && (
              <button
                type="button"
                onClick={handleDiscardChanges}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-xs border border-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveGeneralInfo}
              disabled={isSaving}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${isDirty
                ? "bg-brand-gold hover:bg-brand-goldLight text-brand-navy ring-2 ring-brand-gold/50"
                : "bg-brand-gold hover:bg-brand-goldLight text-brand-navy"
                }`}
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Info"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Company Name
            </label>
            <input
              type="text"
              value={generalInfo.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              placeholder="Top On Group"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Tagline */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Company Tagline
            </label>
            <input
              type="text"
              value={generalInfo.tagline}
              onChange={(e) => updateField("tagline", e.target.value)}
              placeholder="Vision With Trust"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Brand Description */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <FileText className="w-3.5 h-3.5 text-brand-gold" />
              <span>Company Description (Footer Brand Summary)</span>
            </label>
            <textarea
              rows={3}
              value={generalInfo.description || ""}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Top On Group is a leading international conglomerate..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Dhaka Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Dhaka Office Phone</span>
            </label>
            <input
              type="text"
              value={generalInfo.dhakaPhone}
              onChange={(e) => updateField("dhakaPhone", e.target.value)}
              placeholder="+880 1819-219155"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono"
            />
          </div>

          {/* Ctg Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>Chittagong Port Office Phone</span>
            </label>
            <input
              type="text"
              value={generalInfo.ctgPhone}
              onChange={(e) => updateField("ctgPhone", e.target.value)}
              placeholder="+880 1711-720633"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none font-mono"
            />
          </div>

          {/* Corporate Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-brand-gold" />
              <span>Corporate Email</span>
            </label>
            <input
              type="email"
              value={generalInfo.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="info@toponbd.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Operating Hours */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>Operating Hours</span>
            </label>
            <input
              type="text"
              value={generalInfo.operatingHours}
              onChange={(e) => updateField("operatingHours", e.target.value)}
              placeholder="Sun – Thu: 09:00 AM – 06:00 PM"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Head Office Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Head Office Address (Dhaka)</span>
            </label>
            <input
              type="text"
              value={generalInfo.headOfficeAddress}
              onChange={(e) => updateField("headOfficeAddress", e.target.value)}
              placeholder="House #18, Road #03, Sector #11, Uttara, Dhaka-1230"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Chattogram Office Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Chattogram Office Address</span>
            </label>
            <input
              type="text"
              value={generalInfo.chattogramOfficeAddress || ""}
              onChange={(e) => updateField("chattogramOfficeAddress", e.target.value)}
              placeholder="G.P.O. Box #878, 128 Strand Road, Agrabad, Chittagong"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
            />
          </div>

          {/* Facebook URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Facebook Page URL
            </label>
            <input
              type="text"
              value={generalInfo.facebookUrl}
              onChange={(e) => updateField("facebookUrl", e.target.value)}
              placeholder="https://facebook.com/topongroup"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
            />
          </div>

          {/* LinkedIn URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              LinkedIn Company URL
            </label>
            <input
              type="text"
              value={generalInfo.linkedinUrl}
              onChange={(e) => updateField("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/company/top-on-group"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white focus:border-brand-gold focus:outline-none font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
