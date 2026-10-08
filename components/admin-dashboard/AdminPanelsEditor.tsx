"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  DEFAULT_BUSINESS_PANELS,
  BusinessPanelData,
  AVAILABLE_ICONS,
  ICON_MAP,
  saveHeroBusinesses,
  subscribeHeroBusinesses,
} from "@/lib/heroBusinesses";
import { uploadOptimizedMedia } from "@/lib/image-optimizer";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Upload,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const PRESET_HERO_IMAGES = [
  "/images/topontech_hero.jpg",
  "/images/topexpress_hero.jpg",
  "/images/dailyshipping_hero.jpg",
  "/images/toponagro_hero.jpg",
  "/images/toponsolution_hero.jpg",
  "/images/hero_port.jpg",
  "/images/trading_sourcing.jpg",
  "/images/customs_cnf.jpg",
  "/images/air_cargo.jpg",
  "/images/agro_farm.jpg",
];

export default function AdminPanelsEditor() {
  const [panels, setPanels] = useState<BusinessPanelData[]>(DEFAULT_BUSINESS_PANELS);
  const [selectedPanelIdx, setSelectedPanelIdx] = useState<number>(0);
  const [previewExpanded, setPreviewExpanded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [compressionFeedback, setCompressionFeedback] = useState<string | null>(null);

  useEffect(() => {
    const unsub = subscribeHeroBusinesses((data) => setPanels(data));
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const currentPanel = panels[selectedPanelIdx] || panels[0];

  const updatePanelField = (field: keyof BusinessPanelData, value: string) => {
    setPanels((prev) => {
      const next = [...prev];
      if (!next[selectedPanelIdx]) return prev;
      next[selectedPanelIdx] = {
        ...next[selectedPanelIdx],
        [field]: value,
      };
      return next;
    });
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
      image: PRESET_HERO_IMAGES[panels.length % PRESET_HERO_IMAGES.length],
      iconName: "Building2",
    };
    const updated = [...panels, newPanel];
    setPanels(updated);
    setSelectedPanelIdx(updated.length - 1);
  };

  const handleDeletePanel = (index: number) => {
    if (panels.length <= 1) {
      alert("At least one business panel is required.");
      return;
    }
    if (confirm(`Are you sure you want to remove "${panels[index].name}"?`)) {
      const updated = panels.filter((_, i) => i !== index);
      const renumbered = updated.map((p, i) => ({
        ...p,
        number: (i + 1).toString().padStart(2, "0"),
      }));
      setPanels(renumbered);
      setSelectedPanelIdx(Math.max(0, index - 1));
    }
  };

  const handleMovePanel = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= panels.length) return;

    const next = [...panels];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);

    const renumbered = next.map((p, i) => ({
      ...p,
      number: (i + 1).toString().padStart(2, "0"),
    }));

    setPanels(renumbered);
    setSelectedPanelIdx(targetIdx);
  };

  const handleSavePanels = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const res = await saveHeroBusinesses(panels);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "Business Panels successfully saved to Firebase Firestore!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save business panels.",
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

  const handleResetPanels = () => {
    if (confirm("Reset panels to default Top On Group entities?")) {
      setPanels(DEFAULT_BUSINESS_PANELS);
      setSelectedPanelIdx(0);
    }
  };

  const handleUploadHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setCompressionFeedback("Compressing image to WebP format...");
    try {
      const uploadRes = await uploadOptimizedMedia(file, "hero", {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.82,
        format: "image/webp",
      });

      if (uploadRes.success && uploadRes.result) {
        updatePanelField("image", uploadRes.result.downloadUrl);
        const originalKB = (file.size / 1024).toFixed(0);
        const compressedKB = (uploadRes.result.sizeBytes / 1024).toFixed(0);
        setCompressionFeedback(`Optimized: ${originalKB}KB → ${compressedKB}KB WebP (${uploadRes.result.width}x${uploadRes.result.height})`);
      } else {
        setCompressionFeedback(`Upload failed: ${uploadRes.error}`);
      }
    } catch (err: any) {
      setCompressionFeedback(`Error: ${err?.message || "Upload error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const SelectedIcon = currentPanel
    ? ICON_MAP[currentPanel.iconName] || ICON_MAP.Building2
    : ICON_MAP.Building2;

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {saveStatus.type && (
        <div
          className={`p-4 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xl animate-in fade-in duration-200 ${saveStatus.type === "success"
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
            className="text-xs opacity-70 hover:opacity-100 underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Panel Tabs Bar */}
      <div className="bg-[#071930] p-4 sm:p-6 rounded-3xl border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Group Entity Panels ({panels.length})
            </h3>
            <p className="text-xs text-slate-400">
              Select an entity tab to modify its copy, image, and collapsed short name.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleResetPanels}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center space-x-1.5 border border-white/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-brand-gold" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handleAddPanel}
              className="px-3 py-1.5 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold text-xs font-semibold flex items-center space-x-1.5 border border-brand-gold/30 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Entity</span>
            </button>

            <button
              type="button"
              onClick={handleSavePanels}
              disabled={isSaving}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? "Saving..." : "Save Panels"}</span>
            </button>
          </div>
        </div>

        {/* Entity Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {panels.map((p, idx) => {
            const Icon = ICON_MAP[p.iconName] || ICON_MAP.Building2;
            const isSelected = selectedPanelIdx === idx;
            return (
              <button
                key={p.id || idx}
                onClick={() => setSelectedPanelIdx(idx)}
                className={`p-3 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between ${isSelected
                  ? "bg-brand-gold/15 border-brand-gold text-white shadow-lg ring-1 ring-brand-gold"
                  : "bg-[#040C18]/80 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200"
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
                  Short: <strong className="text-slate-200">{p.name_short}</strong>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form & Live Preview Grid */}
      {currentPanel && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center space-x-2">
                  <span>Editing:</span>
                  <span className="text-brand-gold">{currentPanel.name}</span>
                </h4>
                <p className="text-xs text-slate-400 font-mono">ID: {currentPanel.id}</p>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => handleMovePanel(selectedPanelIdx, "up")}
                  disabled={selectedPanelIdx === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                  title="Move Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMovePanel(selectedPanelIdx, "down")}
                  disabled={selectedPanelIdx === panels.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10"
                  title="Move Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeletePanel(selectedPanelIdx)}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 ml-2"
                  title="Delete Panel"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Full Entity Name (Expanded) <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="text"
                  value={currentPanel.name}
                  onChange={(e) => updatePanelField("name", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Short Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Short Name (Collapsed) <span className="text-brand-gold">*</span>
                </label>
                <input
                  type="text"
                  value={currentPanel.name_short}
                  onChange={(e) => updatePanelField("name_short", e.target.value)}
                  placeholder="e.g. Tech, TEL, DSL, Agro"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Number Badge
                </label>
                <input
                  type="text"
                  value={currentPanel.number}
                  onChange={(e) => updatePanelField("number", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-mono focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Route */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Route / Link URL
                </label>
                <input
                  type="text"
                  value={currentPanel.href}
                  onChange={(e) => updatePanelField("href", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Category / Industry Sub-title
              </label>
              <input
                type="text"
                value={currentPanel.category}
                onChange={(e) => updatePanelField("category", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
              />
            </div>

            {/* Short Tagline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Short Tagline
              </label>
              <textarea
                rows={2}
                value={currentPanel.tagline}
                onChange={(e) => updatePanelField("tagline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none leading-relaxed"
              />
            </div>

            {/* Full Tagline */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Full Tagline / Detailed Scope
              </label>
              <textarea
                rows={3}
                value={currentPanel.fullTagline}
                onChange={(e) => updatePanelField("fullTagline", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none leading-relaxed"
              />
            </div>

            {/* Background Image & Storage Uploader */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 block">
                  Hero Background Image
                </label>
                <label className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-gold text-[11px] font-bold cursor-pointer transition-colors border border-brand-gold/30">
                  <Upload className="w-3 h-3" />
                  <span>{uploadingImage ? "Compressing..." : "Upload & Convert to WebP"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadHeroImage}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
              </div>

              {compressionFeedback && (
                <div className="text-[11px] font-mono p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                  {compressionFeedback}
                </div>
              )}

              <input
                type="text"
                value={currentPanel.image}
                onChange={(e) => updatePanelField("image", e.target.value)}
                placeholder="https://... or /images/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-mono focus:border-brand-gold focus:outline-none"
              />

              {/* Presets */}
              <div className="flex flex-wrap gap-2">
                {PRESET_HERO_IMAGES.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => updatePanelField("image", img)}
                    className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors ${currentPanel.image === img
                      ? "bg-brand-gold text-brand-navy font-bold border-brand-gold"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                  >
                    {img.replace("/images/", "").replace(".jpg", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Lucide Icon Picker
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {AVAILABLE_ICONS.map((iconKey) => {
                  const IconComp = ICON_MAP[iconKey];
                  const isIconSelected = currentPanel.iconName === iconKey;
                  return (
                    <button
                      key={iconKey}
                      type="button"
                      onClick={() => updatePanelField("iconName", iconKey)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${isIconSelected
                        ? "bg-brand-gold/20 border-brand-gold text-brand-gold shadow-md"
                        : "bg-[#040C18] border-white/10 text-slate-400 hover:text-slate-200"
                        }`}
                    >
                      <IconComp className="w-5 h-5" />
                      <span className="text-[10px] truncate max-w-full">{iconKey}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <Eye className="w-4 h-4 text-brand-gold" />
                <span>Live Card Preview</span>
              </h4>
              <div className="flex items-center space-x-1 text-xs bg-[#071930] p-1 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setPreviewExpanded(false)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${!previewExpanded
                    ? "bg-brand-gold text-brand-navy"
                    : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                  Collapsed
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewExpanded(true)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${previewExpanded
                    ? "bg-brand-gold text-brand-navy"
                    : "text-slate-400 hover:text-slate-200"
                    }`}
                >
                  Expanded
                </button>
              </div>
            </div>

            {/* Preview Box */}
            <div
              className={`relative rounded-3xl overflow-hidden border transition-all duration-500 min-h-[480px] flex flex-col justify-between shadow-2xl ${previewExpanded
                ? "border-brand-gold/60 ring-2 ring-brand-gold/20"
                : "border-white/15 opacity-90"
                }`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={currentPanel.image || "/images/topontech_hero.jpg"}
                  alt={currentPanel.name}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 400px"
                  className={`object-cover transition-all duration-500 ${previewExpanded
                    ? "scale-105 brightness-110"
                    : "scale-100 brightness-[0.7]"
                    }`}
                />
                <div
                  className={`absolute inset-0 transition-all duration-500 ${previewExpanded
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
                <h5 className="text-2xl font-serif font-bold text-white">
                  {previewExpanded ? currentPanel.name : currentPanel.name_short}
                </h5>

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
          </div>
        </div>
      )}
    </div>
  );
}
