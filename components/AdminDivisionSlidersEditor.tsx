"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DivisionKey,
  DivisionSlideData,
  DIVISION_META_LIST,
  DEFAULT_DIVISION_SLIDES,
  fetchAllDivisionSlides,
  saveAllDivisionSlides,
} from "@/lib/divisionSliders";
import { uploadOptimizedMedia } from "@/lib/image-optimizer";
import { useAuth } from "@/lib/auth-context";
import {
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Eye,
  RefreshCw,
} from "lucide-react";

const CURATED_PRESETS: { name: string; url: string }[] = [
  { name: "Top Express 1 (Fleet)", url: "/images/topexpress_slide_1.jpg" },
  { name: "Top Express 2 (Customs C&F)", url: "/images/topexpress_slide_2.jpg" },
  { name: "Top Express 3 (Air Courier)", url: "/images/topexpress_slide_3.jpg" },
  { name: "Top Express 4 (Heavy Cargo)", url: "/images/topexpress_slide_4.jpg" },
  { name: "Daily Shipping 1 (Container)", url: "/images/dailyshipping_slide_1.jpg" },
  { name: "Daily Shipping 2 (Depot)", url: "/images/dailyshipping_slide_2.jpg" },
  { name: "Daily Shipping (Port Vessel)", url: "/images/dailyshipping_hero.jpg" },
  { name: "Customs C&F Operations", url: "/images/customs_cnf.jpg" },
  { name: "Top On-Tech 1 (Machinery)", url: "/images/topontech_slide_1.jpg" },
  { name: "Top On-Tech 2 (Chemicals)", url: "/images/topontech_slide_2.jpg" },
  { name: "Top On-Tech 3 (Textiles)", url: "/images/topontech_slide_3.jpg" },
  { name: "Top On-Tech 4 (Electronics)", url: "/images/topontech_slide_4.jpg" },
  { name: "Trading & Sourcing Hub", url: "/images/trading_sourcing.jpg" },
  { name: "Top On-Agro 1 (Biofloc)", url: "/images/toponagro_hero.jpg" },
  { name: "Agro Fisheries Farm", url: "/images/agro_farm.jpg" },
  { name: "Fisheries Hatchery", url: "/images/fisheries_farm.jpg" },
  { name: "Sustainability & Nature", url: "/images/sustainability_bg.jpg" },
  { name: "Solution Wide (Boardroom)", url: "/images/toponsolution_wide.jpg" },
  { name: "Solution Hero (Advisory)", url: "/images/toponsolution_hero.jpg" },
  { name: "Boardroom Executive Team", url: "/images/boardroom_team.jpg" },
  { name: "Air Cargo Terminal", url: "/images/air_cargo.jpg" },
  { name: "Chittagong Port Maritime", url: "/images/hero_port.jpg" },
];

export default function AdminDivisionSlidersEditor() {
  const { user } = useAuth();
  const [selectedDivision, setSelectedDivision] = useState<DivisionKey>("topexpress");
  const [allSlides, setAllSlides] = useState<Record<DivisionKey, DivisionSlideData[]>>(DEFAULT_DIVISION_SLIDES);
  const [selectedSlideIdx, setSelectedSlideIdx] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string>("");
  const [isDivisionDropdownOpen, setIsDivisionDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAllDivisionSlides().then((data) => {
      setAllSlides(data);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDivisionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentMeta = DIVISION_META_LIST.find((m) => m.key === selectedDivision) || DIVISION_META_LIST[0];
  const currentDivisionSlides = allSlides[selectedDivision] || [];
  const currentSlide: DivisionSlideData | undefined =
    currentDivisionSlides[selectedSlideIdx] || currentDivisionSlides[0];

  const updateCurrentSlide = (field: keyof DivisionSlideData, value: string) => {
    setAllSlides((prev) => {
      const divisionSlides = [...(prev[selectedDivision] || [])];
      if (!divisionSlides[selectedSlideIdx]) return prev;

      divisionSlides[selectedSlideIdx] = {
        ...divisionSlides[selectedSlideIdx],
        [field]: value,
      };

      return {
        ...prev,
        [selectedDivision]: divisionSlides,
      };
    });
  };

  const handleAddSlide = () => {
    setAllSlides((prev) => {
      const divisionSlides = [...(prev[selectedDivision] || [])];
      const newSlide: DivisionSlideData = {
        id: `${selectedDivision}_${Date.now()}`,
        image: "/images/topexpress_slide_1.jpg",
        category: "New Operational Sector",
        headline: "Enter compelling headline describing operations and specialized services.",
      };
      const updated = [...divisionSlides, newSlide];
      setSelectedSlideIdx(updated.length - 1);
      return {
        ...prev,
        [selectedDivision]: updated,
      };
    });
  };

  const handleDeleteSlide = (idx: number) => {
    if (currentDivisionSlides.length <= 1) {
      alert("Each group entity must maintain at least one hero slide.");
      return;
    }
    if (confirm("Are you sure you want to delete this slide?")) {
      setAllSlides((prev) => {
        const divisionSlides = prev[selectedDivision].filter((_, i) => i !== idx);
        return {
          ...prev,
          [selectedDivision]: divisionSlides,
        };
      });
      setSelectedSlideIdx(Math.max(0, idx - 1));
    }
  };

  const handleMoveSlide = (idx: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentDivisionSlides.length) return;

    setAllSlides((prev) => {
      const divisionSlides = [...prev[selectedDivision]];
      const temp = divisionSlides[idx];
      divisionSlides[idx] = divisionSlides[targetIdx];
      divisionSlides[targetIdx] = temp;
      return {
        ...prev,
        [selectedDivision]: divisionSlides,
      };
    });
    setSelectedSlideIdx(targetIdx);
  };

  const handleResetDivision = () => {
    if (confirm(`Reset slides for ${currentMeta.name} back to default images and copy?`)) {
      setAllSlides((prev) => ({
        ...prev,
        [selectedDivision]: DEFAULT_DIVISION_SLIDES[selectedDivision],
      }));
      setSelectedSlideIdx(0);
      setSaveStatus({
        type: "success",
        message: `Reset ${currentMeta.name} slides. Click "Save All Slides" to persist.`,
      });
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadFeedback("Optimizing and converting image to WebP...");
    try {
      const uploadRes = await uploadOptimizedMedia(file, "division-sliders", {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.84,
        format: "image/webp",
      });

      if (uploadRes.success && uploadRes.result) {
        updateCurrentSlide("image", uploadRes.result.downloadUrl);
        const origKB = (file.size / 1024).toFixed(0);
        const compKB = (uploadRes.result.sizeBytes / 1024).toFixed(0);
        setUploadFeedback(`Optimized: ${origKB}KB → ${compKB}KB WebP (${uploadRes.result.width}x${uploadRes.result.height})`);
      } else {
        setUploadFeedback(`Upload failed: ${uploadRes.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setUploadFeedback(`Error: ${err?.message || "Upload error"}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      const res = await saveAllDivisionSlides(allSlides, user?.email || undefined);
      if (res.success) {
        setSaveStatus({
          type: "success",
          message: "All group entity hero slides saved successfully! Public pages are now updated.",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to persist changes.",
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

  return (
    <div className="space-y-8 select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        {/* Division Selection Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
              <span>Select Group Entity to Edit</span>
              <span className="text-[11px] text-slate-500 font-normal lowercase">(5 entities available)</span>
            </label>
            <span className="text-xs text-brand-gold font-mono font-medium">
              {(allSlides[selectedDivision] || []).length} slides configured
            </span>
          </div>

          {/* Dropdown Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDivisionDropdownOpen((prev) => !prev)}
            className="w-full p-3.5 sm:p-4 rounded-2xl bg-[#0B2240] hover:bg-[#0E2A50] border border-brand-gold/30 hover:border-brand-gold/60 text-white shadow-xl transition-all duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            aria-haspopup="listbox"
            aria-expanded={isDivisionDropdownOpen}
          >
            <div className="flex items-center space-x-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform">
                <Image
                  src={currentMeta.logo}
                  alt={currentMeta.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-base sm:text-lg font-bold text-white font-serif tracking-tight truncate">
                    {currentMeta.name}
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-medium">
                    {currentMeta.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  Target Route: <span className="font-mono text-slate-300">{currentMeta.route}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 ml-3">
              <span className="hidden sm:inline-block text-xs font-semibold text-brand-gold group-hover:text-brand-goldLight transition-colors">
                Change Group Entity
              </span>
              <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-brand-gold group-hover:border-brand-gold/40 transition-all">
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${isDivisionDropdownOpen ? "rotate-180 text-brand-gold" : ""
                    }`}
                />
              </div>
            </div>
          </button>

          {/* Dropdown Menu List */}
          {isDivisionDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#071930] border border-brand-gold/40 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 space-y-1.5 max-h-[380px] overflow-y-auto divide-y divide-white/5">
                {DIVISION_META_LIST.map((div) => {
                  const isSelected = selectedDivision === div.key;
                  const slideCount = (allSlides[div.key] || []).length;

                  return (
                    <button
                      key={div.key}
                      type="button"
                      onClick={() => {
                        setSelectedDivision(div.key);
                        setSelectedSlideIdx(0);
                        setIsDivisionDropdownOpen(false);
                        setSaveStatus({ type: null, message: "" });
                      }}
                      className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between group ${isSelected
                        ? "bg-brand-gold/15 border border-brand-gold/50 text-white shadow-md"
                        : "hover:bg-white/5 text-slate-300 border border-transparent"
                        }`}
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                          <Image
                            src={div.logo}
                            alt={div.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white flex items-center space-x-2">
                            <span className="truncate">{div.name}</span>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full bg-brand-gold text-brand-navy text-[10px] font-bold">
                                Selected
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 flex items-center space-x-2">
                            <span>{div.badge}</span>
                            <span>&bull;</span>
                            <span className="font-mono text-slate-300">{div.route}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0 ml-3">
                        <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-black/40 text-brand-gold border border-white/10 font-semibold">
                          {slideCount} {slideCount === 1 ? "slide" : "slides"}
                        </span>
                        {isSelected ? (
                          <Check className="w-5 h-5 text-brand-gold shrink-0" />
                        ) : (
                          <div className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <Link
            href={currentMeta.route}
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-brand-gold" />
            <span>Live</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2 disabled:opacity-50"
          >
            {isSaving ? (
              <RefreshCw className="w-4 h-4 animate-spin text-brand-navy" />
            ) : (
              <Save className="w-4 h-4 text-brand-navy" />
            )}
            <span>{isSaving ? "Saving..." : "Save All Slides"}</span>
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {saveStatus.type && (
        <div
          className={`p-4 rounded-2xl flex items-center space-x-3 text-xs sm:text-sm font-medium border animate-in fade-in slide-in-from-top-2 ${saveStatus.type === "success"
            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
            : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
        >
          {saveStatus.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{saveStatus.message}</span>
        </div>
      )}



      {/* Main Slide Editor Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Slides List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <Layers className="w-4 h-4 text-brand-gold" />
              <span>{currentMeta.name} Slides ({currentDivisionSlides.length})</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleResetDivision}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs flex items-center space-x-1 border border-white/10 transition-colors"
                title="Reset to default slides"
              >
                <RotateCcw className="w-3 h-3 text-brand-gold" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleAddSlide}
                className="px-3 py-1 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold hover:text-brand-goldLight text-xs font-bold flex items-center space-x-1 border border-brand-gold/40 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Slide</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {currentDivisionSlides.map((slide, idx) => {
              const isActive = selectedSlideIdx === idx;

              return (
                <div
                  key={slide.id || idx}
                  onClick={() => setSelectedSlideIdx(idx)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 group ${isActive
                    ? "bg-white/10 border-brand-gold shadow-md ring-1 ring-brand-gold/30"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-14 rounded-xl overflow-hidden relative shrink-0 border border-white/15 bg-black/40">
                    <Image
                      src={slide.image || "/images/topexpress_slide_1.jpg"}
                      alt={slide.headline || "Slide preview"}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-brand-gold font-bold">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono font-semibold text-brand-gold truncate">
                      {slide.category || "Uncategorized"}
                    </div>
                    <div className="text-xs text-white font-medium line-clamp-1 mt-0.5">
                      {slide.headline || "No headline"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveSlide(idx, "down")}
                      disabled={idx === currentDivisionSlides.length - 1}
                      className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(idx)}
                      disabled={currentDivisionSlides.length <= 1}
                      className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Slide Editor & Live Preview */}
        {currentSlide && (
          <div className="lg:col-span-7 space-y-6 bg-white/5 p-6 rounded-3xl border border-white/10">
            {/* Slide Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center text-xs font-mono font-bold">
                  {selectedSlideIdx + 1}
                </span>
                <h3 className="text-base font-bold text-white">
                  Editing Slide #{selectedSlideIdx + 1} of {currentMeta.name}
                </h3>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                ID: {currentSlide.id}
              </span>
            </div>

            {/* Live Visual Preview of Slide */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
                <Eye className="w-3.5 h-3.5 text-brand-gold" />
                <span>Live Slide Card Preview</span>
              </label>

              <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-brand-gold/40 shadow-xl bg-[#040D1A]">
                <Image
                  src={currentSlide.image || "/images/topexpress_slide_1.jpg"}
                  alt={currentSlide.headline}
                  fill
                  quality={90}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040D1A] via-[#040D1A]/50 to-black/30" />

                {/* Simulated Content Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-2">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/70 border border-brand-gold/50 backdrop-blur-md text-brand-gold text-[10px] font-mono font-semibold uppercase tracking-wider">
                    <span>{currentSlide.category || "Entity Category"}</span>
                  </div>
                  <h4 className="text-white font-serif font-bold text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-md">
                    {currentSlide.headline || "Headline text preview will appear here..."}
                  </h4>
                </div>
              </div>
            </div>

            {/* Slide Fields */}
            <div className="space-y-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Category Tag / Sector Scope
                </label>
                <input
                  type="text"
                  value={currentSlide.category}
                  onChange={(e) => updateCurrentSlide("category", e.target.value)}
                  placeholder="e.g. Express Road Logistics & Linehaul Fleet"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
                />
              </div>

              {/* Headline */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Slide Headline / Caption
                </label>
                <textarea
                  rows={2}
                  value={currentSlide.headline}
                  onChange={(e) => updateCurrentSlide("headline", e.target.value)}
                  placeholder="e.g. Modern covered van and linehaul fleet operating 24/7 across Bangladesh."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Image URL & Upload */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Hero Slide Image</span>
                  </label>

                  {/* Upload Button */}
                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-gold/20 hover:bg-brand-gold/30 text-brand-gold text-xs font-bold border border-brand-gold/40 transition-colors">
                    {uploadingImage ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploadingImage ? "Uploading..." : "Upload New Image"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={currentSlide.image}
                  onChange={(e) => updateCurrentSlide("image", e.target.value)}
                  placeholder="/images/topexpress_slide_1.jpg or https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors font-mono"
                />

                {uploadFeedback && (
                  <p className="text-[11px] text-brand-goldDark font-medium">
                    {uploadFeedback}
                  </p>
                )}
              </div>

              {/* Curated Presets Quick Picker */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Quick Select from Site Images ({CURATED_PRESETS.length} available)
                </label>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 bg-black/20 rounded-xl border border-white/10">
                  {CURATED_PRESETS.map((p) => {
                    const isSelected = currentSlide.image === p.url;
                    return (
                      <button
                        key={p.url}
                        type="button"
                        onClick={() => updateCurrentSlide("image", p.url)}
                        className={`relative h-14 rounded-lg overflow-hidden border transition-all text-left group ${isSelected
                          ? "border-brand-gold ring-2 ring-brand-gold shadow-md"
                          : "border-white/10 hover:border-brand-gold/60 opacity-80 hover:opacity-100"
                          }`}
                        title={p.name}
                      >
                        <Image
                          src={p.url}
                          alt={p.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-black/80 px-1 py-0.5 text-[8px] font-sans text-slate-200 truncate">
                          {p.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
