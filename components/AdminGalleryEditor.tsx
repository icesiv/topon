"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GalleryItem,
  DEFAULT_GALLERY,
  PRESET_GALLERY_CATEGORIES,
  saveGallery,
  subscribeGallery,
} from "@/lib/gallery";
import { isFirebaseConfigured } from "@/lib/firebase";
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
  Search,
  Eye,
  Camera,
  Calendar,
  Tag,
  Copy,
  X,
  Edit3,
} from "lucide-react";

// Curated preset image options from the project
const PRESET_IMAGE_OPTIONS = [
  "/images/pic-gallary/mamun1.jpeg",
  "/images/pic-gallary/mamun2.jpeg",
  "/images/pic-gallary/mamun3.jpeg",
  "/images/pic-gallary/mamun4.jpeg",
  "/images/pic-gallary/mamun5.jpeg",
  "/images/pic-gallary/mamun6.jpeg",
  "/images/pic-gallary/mamun7.jpeg",
  "/images/pic-gallary/mamun8.jpeg",
  "/images/pic-gallary/mamun9.jpeg",
  "/images/pic-gallary/mamun10.jpeg",
  "/images/pic-gallary/mamun11.jpeg",
  "/images/pic-gallary/mamun12.jpeg",
  "/images/dailyshipping_hero.jpg",
  "/images/hero_port.jpg",
  "/images/customs_cnf.jpg",
  "/images/air_cargo.jpg",
  "/images/topexpress_slide_1.jpg",
  "/images/topexpress_slide_2.jpg",
  "/images/agro_farm.jpg",
  "/images/boardroom_team.jpg",
  "/images/trading_sourcing.jpg",
  "/images/toponsolution_hero.jpg",
];

export default function AdminGalleryEditor() {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [selectedItemId, setSelectedItemId] = useState<string>(
    DEFAULT_GALLERY[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    setConfigured(isFirebaseConfigured());

    const unsub = subscribeGallery((data) => {
      setItems(data);
      if (data.length > 0 && !selectedItemId) {
        setSelectedItemId(data[0].id);
      }
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const selectedItem =
    items.find((item) => item.id === selectedItemId) || items[0];

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category).filter(Boolean))),
  ];

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      filterCategory === "All" || item.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ? true : item.status === filterStatus;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const updateSelectedField = (field: keyof GalleryItem, value: any) => {
    if (!selectedItem) return;
    setItems((prev) =>
      prev.map((i) => (i.id === selectedItem.id ? { ...i, [field]: value } : i))
    );
    if (saveStatus.type) setSaveStatus({ type: null, message: "" });
  };

  const handleAddNew = () => {
    const timestamp = Date.now();
    const newId = `gal_${timestamp}`;
    const newItem: GalleryItem = {
      id: newId,
      title: `Corporate Operation Event #${items.length + 1}`,
      category: "Leadership & Summits",
      imageUrl: PRESET_IMAGE_OPTIONS[items.length % PRESET_IMAGE_OPTIONS.length],
      caption: "Description of the operation, meeting or trade milestone.",
      date: new Date().getFullYear().toString(),
      order: items.length,
      status: "published",
      isFeatured: false,
    };

    const nextItems = [newItem, ...items];
    setItems(nextItems);
    setSelectedItemId(newId);
  };

  const handleDelete = (id: string, title: string) => {
    if (items.length <= 1) {
      alert("At least one gallery photo must remain in the system.");
      return;
    }
    if (confirm(`Are you sure you want to permanently delete photo:\n"${title}"?`)) {
      const remaining = items.filter((i) => i.id !== id);
      setItems(remaining);
      setSelectedItemId(remaining[0]?.id || "");
    }
  };

  const handleDuplicate = (item: GalleryItem) => {
    const copy: GalleryItem = {
      ...item,
      id: `gal_${Date.now()}`,
      title: `${item.title} (Copy)`,
      order: items.length,
      status: "draft",
    };
    setItems([copy, ...items]);
    setSelectedItemId(copy.id);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    setItems(next.map((item, idx) => ({ ...item, order: idx })));
  };

  const handleToggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const nextStatus = i.status === "published" ? "draft" : "published";
          return { ...i, status: nextStatus };
        }
        return i;
      })
    );
  };

  const handleResetToDefault = () => {
    if (
      confirm(
        "Reset gallery to the default curated collection of photos? Any unsaved edits will be discarded."
      )
    ) {
      setItems(DEFAULT_GALLERY);
      setSelectedItemId(DEFAULT_GALLERY[0].id);
      setSaveStatus({
        type: "success",
        message: "Reset to default gallery. Click 'Save Gallery' to persist.",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("topon_gallery", JSON.stringify(items));
        window.dispatchEvent(new CustomEvent("topon_gallery_changed", { detail: items }));
      }

      if (configured) {
        const res = await saveGallery(items, "admin@toponbd.com");
        if (res.success) {
          setSaveStatus({
            type: "success",
            message: "Gallery successfully saved and synced to Firebase Firestore!",
          });
        } else {
          setSaveStatus({
            type: "error",
            message: res.error || "Failed to sync to Firestore.",
          });
        }
      } else {
        setSaveStatus({
          type: "success",
          message: "Gallery saved to local offline storage (Firebase is not configured in .env).",
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
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-brand-navy text-brand-gold">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Media &amp; Photo Gallery Manager
              </h2>
              <p className="text-xs text-slate-500">
                Manage, add, reorder, and edit high-resolution photo highlights displayed on{" "}
                <Link
                  href="/gallery"
                  target="_blank"
                  className="text-brand-navy hover:text-brand-gold underline font-semibold inline-flex items-center space-x-1"
                >
                  <span>/gallery</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center space-x-1.5"
            title="Reset gallery to default curated photos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset Defaults</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-[#0B2240] hover:bg-[#133560] text-white font-bold text-xs transition-all shadow-md flex items-center space-x-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-brand-gold" />
            <span>{isSaving ? "Saving..." : "Save Gallery"}</span>
          </button>
        </div>
      </div>

      {/* Save Notification */}
      {saveStatus.type && (
        <div
          className={`p-4 rounded-xl flex items-center space-x-3 text-xs font-medium animate-in fade-in duration-200 ${
            saveStatus.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {saveStatus.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="flex-1">{saveStatus.message}</span>
          <button
            onClick={() => setSaveStatus({ type: null, message: "" })}
            className="p-1 hover:opacity-75"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid: Gallery List Sidebar + Editor Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Photos List (5 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search photos by title, caption..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
              {categories.slice(0, 4).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap uppercase tracking-wider transition-colors ${
                    filterCategory === cat
                      ? "bg-brand-navy text-brand-gold"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500 text-[11px] font-medium">
                {filteredItems.length} Photo{filteredItems.length !== 1 ? "s" : ""}
              </span>
              <div className="flex items-center space-x-1">
                {(["all", "published", "draft"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      filterStatus === status
                        ? "bg-brand-navy text-brand-gold"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photos Cards List */}
          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-0.5">
            {filteredItems.map((item) => {
              const isSelected = item.id === selectedItem?.id;
              const globalIndex = items.findIndex((i) => i.id === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer group relative ${
                    isSelected
                      ? "bg-brand-navy/5 border-brand-navy/30 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      {item.isFeatured && (
                        <div className="absolute top-1 left-1 bg-brand-gold text-brand-navy p-0.5 rounded shadow-xs">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-brand-goldDark uppercase tracking-wider truncate">
                          {item.category}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            item.status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-navy line-clamp-2 leading-snug">
                        {item.title}
                      </h4>

                      {item.date && (
                        <div className="flex items-center space-x-1 text-[10px] text-slate-400 mt-1 font-mono">
                          <Calendar className="w-2.5 h-2.5" />
                          <span>{item.date}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Controls Bar */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(globalIndex, "up");
                        }}
                        disabled={globalIndex === 0}
                        className="p-1 hover:text-slate-900 disabled:opacity-20 rounded"
                        title="Move Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMove(globalIndex, "down");
                        }}
                        disabled={globalIndex === items.length - 1}
                        className="p-1 hover:text-slate-900 disabled:opacity-20 rounded"
                        title="Move Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(item.id);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          item.status === "published"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                        title="Toggle Draft/Published"
                      >
                        {item.status === "published" ? "Draft" : "Publish"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(item);
                        }}
                        className="p-1 hover:text-brand-navy rounded"
                        title="Duplicate Photo"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id, item.title);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Editor Form (8 cols) */}
        {selectedItem ? (
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <Edit3 className="w-4 h-4 text-brand-navy" />
                <h3 className="text-sm font-bold text-slate-900 font-serif">
                  Edit Photo Details
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    selectedItem.status === "published"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Photo Title / Event Name *
                </label>
                <input
                  type="text"
                  value={selectedItem.title}
                  onChange={(e) => updateSelectedField("title", e.target.value)}
                  placeholder="e.g. International Trade Mission & Bilateral Delegation"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-serif text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white"
                />
              </div>

              {/* Category & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    list="gallery-category-suggestions"
                    value={selectedItem.category}
                    onChange={(e) => updateSelectedField("category", e.target.value)}
                    placeholder="e.g. Leadership & Summits"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                  />
                  <datalist id="gallery-category-suggestions">
                    {PRESET_GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Year / Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={selectedItem.date || ""}
                    onChange={(e) => updateSelectedField("date", e.target.value)}
                    placeholder="e.g. 2026 or Mar 2026"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              {/* Image URL & Preset Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  value={selectedItem.imageUrl}
                  onChange={(e) => updateSelectedField("imageUrl", e.target.value)}
                  placeholder="/images/pic-gallary/mamun1.jpeg"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono mb-2"
                />

                {/* Preset Thumbnails */}
                <div>
                  <span className="text-[11px] text-slate-500 font-medium block mb-1">
                    Or select an image from the corporate library:
                  </span>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 max-h-40 overflow-y-auto p-1 bg-slate-50 rounded-xl border border-slate-200">
                    {PRESET_IMAGE_OPTIONS.map((preset, pIdx) => (
                      <div
                        key={pIdx}
                        onClick={() => updateSelectedField("imageUrl", preset)}
                        className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                          selectedItem.imageUrl === preset
                            ? "border-brand-gold scale-105 shadow-sm"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={preset}
                          alt="Preset option"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Caption Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Photo Caption &amp; Detailed Context
                </label>
                <textarea
                  rows={3}
                  value={selectedItem.caption || ""}
                  onChange={(e) => updateSelectedField("caption", e.target.value)}
                  placeholder="Detailed background regarding this meeting, terminal operation, or event..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                />
              </div>

              {/* Status & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Publication Status
                  </label>
                  <select
                    value={selectedItem.status}
                    onChange={(e) =>
                      updateSelectedField("status", e.target.value as any)
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden from public)</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200 mt-auto">
                  <input
                    type="checkbox"
                    id="gallery-featured-checkbox"
                    checked={Boolean(selectedItem.isFeatured)}
                    onChange={(e) => updateSelectedField("isFeatured", e.target.checked)}
                    className="w-4 h-4 rounded text-brand-navy focus:ring-brand-gold"
                  />
                  <label
                    htmlFor="gallery-featured-checkbox"
                    className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Featured Spotlight</span>
                  </label>
                </div>
              </div>

              {/* Card & Lightbox Preview */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Preview in Public Gallery Card
                </span>
                <div className="max-w-sm rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
                  <div className="relative aspect-[4/3] w-full bg-slate-900">
                    <Image
                      src={selectedItem.imageUrl}
                      alt={selectedItem.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#0B2240]/90 text-brand-gold text-[9px] font-bold uppercase tracking-wider">
                        {selectedItem.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <h4 className="text-xs font-bold text-[#0B2240] leading-snug">
                      {selectedItem.title}
                    </h4>
                    {selectedItem.caption && (
                      <p className="text-[10px] text-slate-500 line-clamp-2">
                        {selectedItem.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 p-12 text-center bg-white rounded-3xl border border-slate-200">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Select a photo from the left or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
