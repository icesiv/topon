"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DEFAULT_BUSINESS_PANELS,
  BusinessPanelData,
  AVAILABLE_ICONS,
  ICON_MAP,
  saveHeroBusinesses,
  subscribeHeroBusinesses,
} from "@/lib/heroBusinesses";
import { isFirebaseConfigured, firebaseConfig } from "@/lib/firebase";
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  Eye,
  Info,
} from "lucide-react";

const PRESET_IMAGES = [
  "/images/topontech_hero.jpg",
  "/images/topexpress_hero.jpg",
  "/images/dailyshipping_hero.jpg",
  "/images/toponagro_hero.jpg",
  "/images/hero_port.jpg",
  "/images/trading_sourcing.jpg",
  "/images/customs_cnf.jpg",
  "/images/air_cargo.jpg",
  "/images/agro_farm.jpg",
];

export default function AdminHeroEditor() {
  const [panels, setPanels] = useState<BusinessPanelData[]>(DEFAULT_BUSINESS_PANELS);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [configured, setConfigured] = useState(false);
  const [previewExpanded, setPreviewExpanded] = useState(true);

  useEffect(() => {
    setConfigured(isFirebaseConfigured());

    const unsub = subscribeHeroBusinesses((data) => {
      setPanels(data);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const currentPanel = panels[selectedIdx] || panels[0];

  const updateCurrentField = (field: keyof BusinessPanelData, value: string) => {
    setPanels((prev) => {
      const next = [...prev];
      next[selectedIdx] = {
        ...next[selectedIdx],
        [field]: value,
      };
      return next;
    });
    // Clear save status message when typing
    if (saveStatus.type) setSaveStatus({ type: null, message: "" });
  };

  const handleAddPanel = () => {
    const nextNum = (panels.length + 1).toString().padStart(2, "0");
    const newPanel: BusinessPanelData = {
      id: `division_${Date.now()}`,
      number: nextNum,
      name: `New Division ${nextNum}`,
      name_short: `Div ${nextNum}`,
      category: "Commercial Business Sector",
      tagline: "Short summary tagline for this division.",
      fullTagline:
        "Comprehensive detailed description and capabilities for this business division in Top On Group.",
      href: "/services",
      image: PRESET_IMAGES[panels.length % PRESET_IMAGES.length],
      iconName: "Building2",
    };
    const updated = [...panels, newPanel];
    setPanels(updated);
    setSelectedIdx(updated.length - 1);
  };

  const handleDeletePanel = (index: number) => {
    if (panels.length <= 1) {
      alert("At least one business panel is required.");
      return;
    }
    if (confirm(`Are you sure you want to remove "${panels[index].name}"?`)) {
      const updated = panels.filter((_, i) => i !== index);
      // Re-number panels
      const renumbered = updated.map((p, i) => ({
        ...p,
        number: (i + 1).toString().padStart(2, "0"),
      }));
      setPanels(renumbered);
      setSelectedIdx(Math.max(0, index - 1));
    }
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= panels.length) return;

    const next = [...panels];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);

    // Re-number
    const renumbered = next.map((p, i) => ({
      ...p,
      number: (i + 1).toString().padStart(2, "0"),
    }));

    setPanels(renumbered);
    setSelectedIdx(targetIdx);
  };

  const handleResetToDefaults = () => {
    if (
      confirm(
        "Reset all panels back to standard default divisions (Top On-Tech, Top Express, Daily Shipping, Top On-Agro)?"
      )
    ) {
      setPanels(DEFAULT_BUSINESS_PANELS);
      setSelectedIdx(0);
      setSaveStatus({
        type: "success",
        message: "Reset to default values in editor. Click 'Save to Firebase' to persist.",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      const res = await saveHeroBusinesses(panels);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "All changes successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save data. Please check Firebase configuration.",
        });
      }
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err?.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const SelectedIcon = currentPanel ? ICON_MAP[currentPanel.iconName] || ICON_MAP.Building2 : ICON_MAP.Building2;

  return (
    <div className="min-h-screen bg-[#061324] text-slate-200 pb-20">
      {/* Admin Top Header */}
      <header className="bg-[#0B2240] border-b border-brand-gold/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-white font-bold font-serif text-lg leading-tight flex items-center space-x-2">
                <span>Top On Group</span>
                <span className="text-xs px-2 py-0.5 rounded bg-brand-gold text-brand-navy font-sans font-bold">
                  ADMIN
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Hero Section Business Panels Manager
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-white/10"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save to Firebase"}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Firebase Environment Status Banner */}
        {!configured ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm space-y-1">
                <strong className="text-white block font-semibold">
                  Firebase Environment Variables Not Detected
                </strong>
                <p className="text-slate-300 text-xs">
                  To save directly to Cloud Firestore, fill in your Firebase credentials in{" "}
                  <code className="bg-black/30 px-1.5 py-0.5 rounded text-brand-gold">
                    .env.local
                  </code>
                  . Currently falling back to local memory state.
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 flex-shrink-0">
              NEXT_PUBLIC_FIREBASE_*
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                <strong>Firebase Connected:</strong> Project ID:{" "}
                <code className="text-white font-mono">{firebaseConfig.projectId || "Active"}</code>
              </span>
            </div>
            <span className="text-[11px] text-emerald-400/80">Real-time sync ready</span>
          </div>
        )}

        {/* Save Status Toast/Banner */}
        {saveStatus.type && (
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between animate-in fade-in duration-200 ${
              saveStatus.type === "success"
                ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-200"
                : "bg-red-500/20 border border-red-500/50 text-red-200"
            }`}
          >
            <div className="flex items-center space-x-2.5">
              {saveStatus.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              )}
              <span>{saveStatus.message}</span>
            </div>
            <button
              onClick={() => setSaveStatus({ type: null, message: "" })}
              className="text-xs opacity-70 hover:opacity-100 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Division Selector & Tabs Strip */}
        <div className="bg-[#0B2240] p-4 rounded-2xl border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Business Divisions Panels ({panels.length})</span>
              </h2>
              <p className="text-xs text-slate-400">
                Select a tab below to edit division details or reorder the columns.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleResetToDefaults}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs flex items-center space-x-1.5 border border-white/10 transition-colors"
                title="Reset all panels back to initial dataset"
              >
                <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
                <span>Reset Defaults</span>
              </button>

              <button
                type="button"
                onClick={handleAddPanel}
                className="px-3 py-1.5 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold hover:text-brand-goldLight text-xs font-semibold flex items-center space-x-1.5 border border-brand-gold/30 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Division</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {panels.map((p, idx) => {
              const Icon = ICON_MAP[p.iconName] || ICON_MAP.Building2;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={p.id || idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? "bg-brand-gold/15 border-brand-gold text-white shadow-lg ring-1 ring-brand-gold"
                      : "bg-[#061324]/80 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-brand-gold font-bold">
                      {p.number}
                    </span>
                    <Icon className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="font-semibold text-xs sm:text-sm text-white truncate">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    Short: <strong className="text-slate-300">{p.name_short}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor Form & Live Preview Grid */}
        {currentPanel && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Fields (7 cols) */}
            <div className="lg:col-span-7 bg-[#0B2240] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>Editing Panel {currentPanel.number}:</span>
                    <span className="text-brand-gold">{currentPanel.name}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    ID: <code className="font-mono text-slate-300">{currentPanel.id}</code>
                  </p>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => handleMove(selectedIdx, "up")}
                    disabled={selectedIdx === 0}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                    title="Move Left / Earlier"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(selectedIdx, "down")}
                    disabled={selectedIdx === panels.length - 1}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                    title="Move Right / Later"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePanel(selectedIdx)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 ml-2"
                    title="Delete Division"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Business Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Full Business Name (Expanded State) <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentPanel.name}
                    onChange={(e) => updateCurrentField("name", e.target.value)}
                    placeholder="e.g. Top On-Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>

                {/* Short Name (Collapsed State) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Short Name (Collapsed State) <span className="text-brand-gold">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentPanel.name_short}
                    onChange={(e) => updateCurrentField("name_short", e.target.value)}
                    placeholder="e.g. Tech, TEL, DSL, Agro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>

                {/* Number Index */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Display Number (e.g. 01, 02)
                  </label>
                  <input
                    type="text"
                    value={currentPanel.number}
                    onChange={(e) => updateCurrentField("number", e.target.value)}
                    placeholder="01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Link URL / Route */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Target Route / Page Link
                  </label>
                  <input
                    type="text"
                    value={currentPanel.href}
                    onChange={(e) => updateCurrentField("href", e.target.value)}
                    placeholder="/trading-topontech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Category / Sector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Industry Category / Sub-heading
                </label>
                <input
                  type="text"
                  value={currentPanel.category}
                  onChange={(e) => updateCurrentField("category", e.target.value)}
                  placeholder="e.g. Multi-Sector Import, Export & Trading"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors"
                />
              </div>

              {/* Short Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Short Tagline (Displayed on Inactive/Small views)
                </label>
                <textarea
                  rows={2}
                  value={currentPanel.tagline}
                  onChange={(e) => updateCurrentField("tagline", e.target.value)}
                  placeholder="Short one-sentence summary"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors leading-relaxed"
                />
              </div>

              {/* Full Tagline */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Full Tagline / Description (Displayed when Panel is Active/Expanded)
                </label>
                <textarea
                  rows={3}
                  value={currentPanel.fullTagline}
                  onChange={(e) => updateCurrentField("fullTagline", e.target.value)}
                  placeholder="Detailed multi-sentence description with capabilities"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors leading-relaxed"
                />
              </div>

              {/* Hero Image */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Background Image Path or URL
                </label>
                <input
                  type="text"
                  value={currentPanel.image}
                  onChange={(e) => updateCurrentField("image", e.target.value)}
                  placeholder="/images/topontech_hero.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061324] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none transition-colors font-mono"
                />

                {/* Quick Presets Picker */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400">Available Stock Assets:</span>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_IMAGES.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => updateCurrentField("image", img)}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${
                          currentPanel.image === img
                            ? "bg-brand-gold text-brand-navy font-bold border-brand-gold"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        {img.replace("/images/", "").replace(".jpg", "")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lucide Icon Picker */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Icon Identifier
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {AVAILABLE_ICONS.map((iconKey) => {
                    const IconComp = ICON_MAP[iconKey];
                    const isIconSelected = currentPanel.iconName === iconKey;
                    return (
                      <button
                        key={iconKey}
                        type="button"
                        onClick={() => updateCurrentField("iconName", iconKey)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                          isIconSelected
                            ? "bg-brand-gold/20 border-brand-gold text-brand-gold shadow-md"
                            : "bg-[#061324] border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                        }`}
                      >
                        <IconComp className="w-5 h-5" />
                        <span className="text-[10px] truncate max-w-full font-sans">{iconKey}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Live Mini Panel Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-brand-gold" />
                  <span>Interactive Panel Preview</span>
                </h3>
                <div className="flex items-center space-x-1.5 text-xs bg-[#0B2240] p-1 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => setPreviewExpanded(false)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      !previewExpanded
                        ? "bg-brand-gold text-brand-navy"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Collapsed
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewExpanded(true)}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      previewExpanded
                        ? "bg-brand-gold text-brand-navy"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Expanded
                  </button>
                </div>
              </div>

              {/* Preview Container mimicking Hero Section Column */}
              <div
                className={`relative rounded-3xl overflow-hidden border transition-all duration-500 min-h-[480px] flex flex-col justify-between shadow-2xl ${
                  previewExpanded
                    ? "border-brand-gold/60 ring-2 ring-brand-gold/20"
                    : "border-white/15 opacity-90"
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={currentPanel.image || "/images/topontech_hero.jpg"}
                    alt={currentPanel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className={`object-cover transition-all duration-500 ${
                      previewExpanded
                        ? "scale-105 brightness-110"
                        : "scale-100 brightness-[0.7]"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      previewExpanded
                        ? "bg-gradient-to-t from-[#040C18] via-[#040C18]/50 to-transparent"
                        : "bg-gradient-to-t from-[#040C18] via-[#040C18]/70 to-black/40"
                    }`}
                  />
                </div>

                {/* Top Badge */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-brand-gold">
                    <SelectedIcon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-white bg-black/40 px-2.5 py-1 rounded-lg border border-white/15">
                    {currentPanel.number}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 space-y-2 mt-auto">
                  <h4 className="text-2xl font-serif font-bold text-white">
                    {previewExpanded ? currentPanel.name : currentPanel.name_short}
                  </h4>

                  <p className="text-xs text-slate-200 leading-relaxed">
                    {previewExpanded ? currentPanel.fullTagline : currentPanel.tagline}
                  </p>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs text-brand-gold font-semibold">
                    <span>Click to Open</span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {currentPanel.href}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Instructions Card */}
              <div className="p-4 rounded-2xl bg-[#0B2240] border border-white/10 text-xs text-slate-300 space-y-2">
                <div className="flex items-center space-x-1.5 text-brand-gold font-bold">
                  <Info className="w-4 h-4" />
                  <span>How Firebase Persistence Works:</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  When you click <strong>Save to Firebase</strong>, all panels are saved to the{" "}
                  <code className="text-brand-gold">settings/heroBusinesses</code> Firestore document.
                  The public homepage listens to changes in real-time, instantly reflecting your edits without needing a redeploy!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
