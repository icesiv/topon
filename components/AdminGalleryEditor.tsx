"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GalleryItem,
  DEFAULT_GALLERY,
  normalizeGalleryItem,
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
  Folder,
  Copy,
  X,
  Edit3,
  ArrowLeft,
  Upload,
  Star,
  Check,
  ImageIcon,
  MoveLeft,
  MoveRight,
} from "lucide-react";

export default function AdminGalleryEditor() {
  const [galleries, setGalleries] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [viewMode, setViewMode] = useState<"list" | "editor">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Search & Filter state for list view
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  // Save / Action feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [configured, setConfigured] = useState(false);

  // Editor form state
  const [formGallery, setFormGallery] = useState<GalleryItem>({
    id: "",
    slug: "",
    title: "",
    description: "",
    caption: "",
    date: "",
    coverImage: "/images/dailyshipping_hero.jpg",
    imageUrl: "/images/dailyshipping_hero.jpg",
    images: [],
    order: 0,
    status: "published",
    isFeatured: false,
  });

  // Uploading state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [manualImageUrl, setManualImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setConfigured(isFirebaseConfigured());

    const unsub = subscribeGallery((data) => {
      setGalleries(data);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Filtered galleries for list view
  const filteredGalleries = galleries.filter((g) => {
    const matchesStatus =
      filterStatus === "all" ? true : g.status === filterStatus;
    const matchesSearch =
      !searchQuery.trim() ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.date && g.date.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSearch;
  });

  // Metrics
  const totalPhotos = galleries.reduce((acc, g) => acc + (g.images?.length || 1), 0);
  const publishedCount = galleries.filter((g) => g.status === "published").length;
  const draftCount = galleries.filter((g) => g.status === "draft").length;

  // Slug generator helper
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // Helper to persist the entire gallery array
  const persistGalleries = async (
    updatedList: GalleryItem[],
    successMessage: string
  ) => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      const normalized = updatedList.map((item, idx) => ({
        ...normalizeGalleryItem(item, idx),
        order: idx,
      }));
      setGalleries(normalized);

      const res = await saveGallery(normalized, "admin@toponbd.com");
      if (res.success) {
        setSaveStatus({ type: "success", message: successMessage });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to update galleries.",
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

  // Open Editor for Creating a New Gallery
  const handleStartCreate = () => {
    const timestamp = Date.now();
    const newId = `gal_${timestamp}`;
    const initialSlug = `gallery-${galleries.length + 1}`;

    setEditingId(newId);
    setFormGallery({
      id: newId,
      slug: initialSlug,
      title: "",
      description: "",
      caption: "",
      date: new Date().getFullYear().toString(),
      coverImage: "",
      imageUrl: "",
      images: [],
      order: galleries.length,
      status: "published",
      isFeatured: false,
    });
    setUploadFeedback({ type: null, message: "" });
    setManualImageUrl("");
    setViewMode("editor");
  };

  // Open Editor for an Existing Gallery
  const handleStartEdit = (gallery: GalleryItem) => {
    setEditingId(gallery.id);
    setFormGallery({
      ...gallery,
      images: Array.isArray(gallery.images) ? [...gallery.images] : (gallery.imageUrl ? [gallery.imageUrl] : []),
      coverImage: gallery.coverImage || gallery.imageUrl || gallery.images?.[0] || "",
    });
    setUploadFeedback({ type: null, message: "" });
    setManualImageUrl("");
    setViewMode("editor");
  };

  // Save changes from Editor form
  const handleSaveEditor = async () => {
    if (!formGallery.title.trim()) {
      alert("Please provide a title for this gallery album.");
      return;
    }

    const currentSlug = formGallery.slug.trim() || slugify(formGallery.title);
    if (!currentSlug) {
      alert("Please specify a URL/folder slug for this gallery.");
      return;
    }

    // Determine cover image: explicit coverImage, or first image, or fallback
    const images = formGallery.images.filter(Boolean);
    const coverImage =
      formGallery.coverImage && images.includes(formGallery.coverImage)
        ? formGallery.coverImage
        : (images[0] || "/images/dailyshipping_hero.jpg");

    const updatedGalleryItem: GalleryItem = {
      ...formGallery,
      slug: currentSlug,
      title: formGallery.title.trim(),
      description: formGallery.description.trim(),
      caption: formGallery.description.trim(),
      date: formGallery.date?.trim() || "",
      coverImage,
      imageUrl: coverImage,
      images: images.length > 0 ? images : [coverImage],
      updatedAt: new Date().toISOString(),
      updatedBy: "admin@toponbd.com",
    };

    let updatedList: GalleryItem[];
    const existsIndex = galleries.findIndex((g) => g.id === updatedGalleryItem.id);

    if (existsIndex >= 0) {
      updatedList = galleries.map((g, i) => (i === existsIndex ? updatedGalleryItem : g));
    } else {
      updatedList = [updatedGalleryItem, ...galleries];
    }

    await persistGalleries(
      updatedList,
      `Gallery album "${updatedGalleryItem.title}" saved successfully!`
    );
    setViewMode("list");
  };

  // Delete a gallery
  const handleDeleteGallery = async (id: string, title: string) => {
    if (galleries.length <= 1) {
      alert("At least one gallery album must remain in the system.");
      return;
    }
    if (confirm(`Are you sure you want to delete gallery album:\n"${title}"?`)) {
      const remaining = galleries.filter((g) => g.id !== id);
      await persistGalleries(remaining, `Deleted gallery album "${title}".`);
    }
  };

  // Duplicate a gallery
  const handleDuplicateGallery = async (gallery: GalleryItem) => {
    const timestamp = Date.now();
    const copy: GalleryItem = {
      ...gallery,
      id: `gal_${timestamp}`,
      slug: `${gallery.slug}-copy-${timestamp.toString().slice(-4)}`,
      title: `${gallery.title} (Copy)`,
      order: 0,
      status: "draft",
      updatedAt: new Date().toISOString(),
      updatedBy: "admin@toponbd.com",
    };
    const updated = [copy, ...galleries];
    await persistGalleries(updated, `Duplicated "${gallery.title}".`);
  };

  // Reorder galleries
  const handleMoveGallery = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= galleries.length) return;
    const next = [...galleries];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    await persistGalleries(next, "Gallery album sequence updated.");
  };

  // Toggle status in list
  const handleToggleStatus = async (id: string) => {
    const updated = galleries.map((g) => {
      if (g.id === id) {
        const nextStatus = g.status === "published" ? ("draft" as const) : ("published" as const);
        return { ...g, status: nextStatus };
      }
      return g;
    });
    const target = galleries.find((g) => g.id === id);
    const newStatusLabel = target?.status === "published" ? "draft" : "published";
    await persistGalleries(updated, `Gallery status changed to ${newStatusLabel}.`);
  };

  // Reset to default
  const handleResetToDefault = async () => {
    if (
      confirm(
        "Reset gallery albums to the default curated Top On Group photo stories? Any custom additions will be overwritten."
      )
    ) {
      await persistGalleries(DEFAULT_GALLERY, "Galleries reset to original defaults.");
    }
  };

  // -------------------------------------------------------------
  // Image Upload Handling (Targeting public/images/gallary/[slug])
  // -------------------------------------------------------------
  const handleImageFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentSlug = formGallery.slug.trim() || slugify(formGallery.title) || "general";

    setIsUploading(true);
    setUploadFeedback({ type: null, message: "" });

    try {
      const uploadData = new FormData();
      uploadData.append("slug", currentSlug);

      for (let i = 0; i < files.length; i++) {
        uploadData.append("files", files[i]);
      }

      const res = await fetch("/api/admin/upload-gallery-image", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to upload gallery images.");
      }

      const newUrls: string[] = Array.isArray(data.urls) ? data.urls : (data.url ? [data.url] : []);

      setFormGallery((prev) => {
        const updatedImages = [...prev.images, ...newUrls];
        const cover = prev.coverImage || updatedImages[0] || "";
        return {
          ...prev,
          slug: data.slug || prev.slug,
          images: updatedImages,
          coverImage: cover,
          imageUrl: cover,
        };
      });

      setUploadFeedback({
        type: "success",
        message: `Successfully uploaded ${newUrls.length} photo${newUrls.length > 1 ? "s" : ""} to public/images/gallary/${data.slug}!`,
      });
    } catch (err: any) {
      console.error("Gallery upload error:", err);
      setUploadFeedback({
        type: "error",
        message: err?.message || "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Add manual image URL
  const handleAddManualImage = () => {
    if (!manualImageUrl.trim()) return;
    const url = manualImageUrl.trim();
    setFormGallery((prev) => {
      const updatedImages = [...prev.images, url];
      const cover = prev.coverImage || updatedImages[0] || url;
      return {
        ...prev,
        images: updatedImages,
        coverImage: cover,
        imageUrl: cover,
      };
    });
    setManualImageUrl("");
  };

  // Remove an image from the gallery
  const handleRemoveImage = (indexToRemove: number) => {
    setFormGallery((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      const isRemovingCover = prev.coverImage === prev.images[indexToRemove];
      const newCover = isRemovingCover ? (updatedImages[0] || "") : prev.coverImage;
      return {
        ...prev,
        images: updatedImages,
        coverImage: newCover,
        imageUrl: newCover,
      };
    });
  };

  // Set image as cover
  const handleSetAsCover = (imgUrl: string) => {
    setFormGallery((prev) => ({
      ...prev,
      coverImage: imgUrl,
      imageUrl: imgUrl,
    }));
  };

  // Move image order
  const handleMoveImage = (index: number, direction: "left" | "right") => {
    const targetIdx = direction === "left" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= formGallery.images.length) return;
    const nextImages = [...formGallery.images];
    const [moved] = nextImages.splice(index, 1);
    nextImages.splice(targetIdx, 0, moved);
    setFormGallery((prev) => ({
      ...prev,
      images: nextImages,
    }));
  };

  // -------------------------------------------------------------
  // RENDER: ADD / EDIT GALLERY VIEW
  // -------------------------------------------------------------
  if (viewMode === "editor") {
    return (
      <div className="space-y-6 antialiased">
        {/* Top Sticky Header */}
        <div className="bg-[#071930] p-5 sm:p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode("list")}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
              title="Return to Galleries List"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Galleries</span>
            </button>

            <div className="h-5 w-px bg-white/10 hidden sm:block" />

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold px-2 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 font-bold">
                  {editingId && galleries.some((g) => g.id === editingId)
                    ? "Edit Gallery Album"
                    : "New Gallery Album"}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${formGallery.status === "published"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    }`}
                >
                  {formGallery.status}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-md mt-0.5 font-serif">
                {formGallery.title || "Untitled Gallery Album"}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveEditor}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save Gallery Album"}</span>
            </button>
          </div>
        </div>

        {/* Editor Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Gallery Information Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#071930] p-6 rounded-3xl border border-white/10 shadow-xl space-y-5">
              <h3 className="text-xs font-bold text-brand-gold uppercase tracking-wider flex items-center space-x-2 border-b border-white/10 pb-3">
                <Folder className="w-4 h-4" />
                <span>Gallery Album Details</span>
              </h3>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Gallery Title *
                </label>
                <input
                  type="text"
                  value={formGallery.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    setFormGallery((prev) => ({
                      ...prev,
                      title: newTitle,
                      // Auto suggest slug if newly creating
                      slug:
                        !editingId || !galleries.some((g) => g.id === editingId)
                          ? slugify(newTitle)
                          : prev.slug,
                    }));
                  }}
                  placeholder="e.g. International Trade Mission & Bilateral Delegation"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-semibold focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Slug / Directory Folder */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Folder Slug * (Storage Path)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    public/images/gallary/[slug]
                  </span>
                </div>
                <div className="flex items-center rounded-xl bg-[#040C18] border border-white/15 overflow-hidden focus-within:border-brand-gold">
                  <span className="pl-3 text-xs text-brand-gold font-mono shrink-0">
                    /gallary/
                  </span>
                  <input
                    type="text"
                    value={formGallery.slug}
                    onChange={(e) =>
                      setFormGallery((prev) => ({
                        ...prev,
                        slug: slugify(e.target.value),
                      }))
                    }
                    placeholder="e.g. trade-mission-2026"
                    className="w-full px-2 py-2.5 text-xs bg-transparent text-white font-mono focus:outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Uploaded images are saved in:{" "}
                  <code className="text-brand-gold font-mono">
                    public/images/gallary/{formGallery.slug || "[slug]"}
                  </code>
                </p>
              </div>

              {/* Optional Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Optional Date</span>
                </label>
                <input
                  type="text"
                  value={formGallery.date || ""}
                  onChange={(e) =>
                    setFormGallery((prev) => ({ ...prev, date: e.target.value }))
                  }
                  placeholder="e.g. 2026 or October 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs focus:border-brand-gold focus:outline-none font-mono"
                />
              </div>

              {/* Publication Status & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Publication Status
                  </label>
                  <select
                    value={formGallery.status}
                    onChange={(e) =>
                      setFormGallery((prev) => ({
                        ...prev,
                        status: e.target.value as "published" | "draft",
                      }))
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs font-semibold focus:border-brand-gold focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft (Hidden)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Spotlight Flag
                  </label>
                  <label className="flex items-center space-x-2 px-3 py-2.5 rounded-xl bg-[#040C18] border border-white/15 cursor-pointer hover:border-brand-gold/40 transition-colors">
                    <input
                      type="checkbox"
                      checked={Boolean(formGallery.isFeatured)}
                      onChange={(e) =>
                        setFormGallery((prev) => ({ ...prev, isFeatured: e.target.checked }))
                      }
                      className="w-4 h-4 rounded text-brand-gold accent-brand-gold focus:ring-brand-gold cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-white">
                      Featured Album
                    </span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Gallery Description *
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {formGallery.description.length} chars
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={formGallery.description}
                  onChange={(e) =>
                    setFormGallery((prev) => ({
                      ...prev,
                      description: e.target.value,
                      caption: e.target.value,
                    }))
                  }
                  placeholder="Detailed description of the trade delegation, summit, operations, or event..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs leading-relaxed focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Multiple Images Manager (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#071930] p-6 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-sm font-bold  uppercase tracking-wider text-brand-gold flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Multiple Gallery Photos ({formGallery.images.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload multiple images or paste URLs. Photos are saved in{" "}
                    <code className="text-brand-gold font-mono text-[11px]">
                      public/images/gallary/{formGallery.slug || "[slug]"}
                    </code>
                    .
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? "Uploading..." : "Upload Photos"}</span>
                </button>
              </div>

              {/* Hidden file input supporting MULTIPLE files */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageFilesUpload}
                className="hidden"
              />

              {/* Upload Feedback Alert */}
              {uploadFeedback.type && (
                <div
                  className={`p-3.5 rounded-2xl text-xs flex items-center justify-between shadow-md ${uploadFeedback.type === "success"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    {uploadFeedback.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>{uploadFeedback.message}</span>
                  </div>
                  <button
                    onClick={() => setUploadFeedback({ type: null, message: "" })}
                    className="text-xs opacity-70 hover:opacity-100 underline ml-3"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Drag & Drop Upload Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-brand-gold/60 bg-[#040C18]/60 hover:bg-[#040C18] rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-brand-gold/20 text-slate-300 group-hover:text-brand-gold flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                  Click to select photos or drag & drop multiple files
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Supported formats: JPG, PNG, WebP, AVIF. Files save to{" "}
                  <span className="font-mono text-brand-gold">
                    public/images/gallary/{formGallery.slug || "[slug]"}
                  </span>
                </p>
              </div>

              {/* Optional: Add via manual path/URL */}
              <div className="p-3.5 rounded-2xl bg-[#040C18] border border-white/10 flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="text"
                  placeholder="Or paste image path (e.g. /images/hero_port.jpg)"
                  value={manualImageUrl}
                  onChange={(e) => setManualImageUrl(e.target.value)}
                  className="flex-1 w-full px-3 py-2 text-xs rounded-xl bg-transparent text-white font-mono placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddManualImage}
                  disabled={!manualImageUrl.trim()}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors disabled:opacity-40 shrink-0"
                >
                  + Add URL
                </button>
              </div>

              {/* Photos Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Photos in this gallery:{" "}
                    <strong className="text-white">{formGallery.images.length}</strong>
                  </span>
                  <span className="text-[11px] text-brand-gold font-mono">
                    ★ Click star to change cover photo
                  </span>
                </div>

                {formGallery.images.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl border border-white/10 bg-[#040C18]/40">
                    <ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
                    <p className="text-xs text-slate-400">
                      No photos added to this gallery yet. Use the upload area above to add photos.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {formGallery.images.map((imgUrl, idx) => {
                      const isCover =
                        formGallery.coverImage === imgUrl ||
                        (!formGallery.coverImage && idx === 0);

                      return (
                        <div
                          key={`${imgUrl}_${idx}`}
                          className={`relative group rounded-2xl overflow-hidden border-2 transition-all bg-[#040C18] flex flex-col ${isCover
                            ? "border-brand-gold shadow-lg shadow-brand-gold/15"
                            : "border-white/10 hover:border-white/30"
                            }`}
                        >
                          {/* Image Thumbnail */}
                          <div className="relative aspect-[4/3] w-full bg-slate-900">
                            <Image
                              src={imgUrl}
                              alt={`Photo ${idx + 1}`}
                              fill
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Cover Badge */}
                            {isCover && (
                              <div className="absolute top-2 left-2 z-10 bg-brand-gold text-brand-navy px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider shadow-md flex items-center space-x-1">
                                <Star className="w-2.5 h-2.5 fill-brand-navy" />
                                <span>Cover</span>
                              </div>
                            )}

                            {/* Index Badge */}
                            <div className="absolute bottom-2 left-2 z-10 bg-black/70 backdrop-blur-xs text-slate-200 px-1.5 py-0.5 rounded text-[10px] font-mono">
                              #{idx + 1}
                            </div>
                          </div>

                          {/* Action Strip under image */}
                          <div className="p-2 bg-[#071930] border-t border-white/10 flex items-center justify-between gap-1">
                            {/* Star / Set as cover */}
                            <button
                              type="button"
                              onClick={() => handleSetAsCover(imgUrl)}
                              className={`p-1.5 rounded-lg text-xs transition-colors flex items-center space-x-1 ${isCover
                                ? "text-brand-gold bg-brand-gold/20"
                                : "text-slate-400 hover:text-brand-gold hover:bg-white/5"
                                }`}
                              title={isCover ? "Current Cover Photo" : "Set as Gallery Cover"}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${isCover ? "fill-brand-gold" : ""
                                  }`}
                              />
                            </button>

                            {/* Move Left / Right */}
                            <div className="flex items-center space-x-0.5">
                              <button
                                type="button"
                                onClick={() => handleMoveImage(idx, "left")}
                                disabled={idx === 0}
                                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Earlier"
                              >
                                <MoveLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveImage(idx, "right")}
                                disabled={idx === formGallery.images.length - 1}
                                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20"
                                title="Move Later"
                              >
                                <MoveRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Delete Image */}
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Remove photo from gallery"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: FULL-WIDTH GALLERIES LIST VIEW
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 antialiased">
      {/* Top Banner & Actions */}
      <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search galleries by title, slug, description, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs sm:text-sm focus:border-brand-gold focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex items-center bg-[#040C18] p-1 rounded-xl border border-white/10">
            {(["all", "published", "draft"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${filterStatus === status
                  ? "bg-brand-gold text-brand-navy shadow-sm"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>
        </div>
        <Link
          href="/gallery"
          target="_blank"
          className="text-brand-gold hover:underline font-semibold inline-flex items-center space-x-1.5 text-sm"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleResetToDefault}
            disabled={isSaving}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center space-x-1.5 cursor-pointer"
            title="Reset to default curated galleries"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleStartCreate}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Total Galleries
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {galleries.length}
          </div>
        </div>

        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider block">
            Total Photos
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-brand-gold mt-1">
            {totalPhotos}
          </div>
        </div>

        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
            Published Live
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-300 mt-1">
            {publishedCount}
          </div>
        </div>

        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
            Drafts / Hidden
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-300 mt-1">
            {draftCount}
          </div>
        </div>
      </div>

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
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span>{saveStatus.message}</span>
          </div>
          <button
            onClick={() => setSaveStatus({ type: null, message: "" })}
            className="text-xs opacity-70 hover:opacity-100 underline ml-4 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Galleries List */}
      <div className="space-y-4">
        {filteredGalleries.length === 0 ? (
          <div className="bg-[#071930] p-12 text-center rounded-3xl border border-white/10">
            <Camera className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-white">No gallery albums found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query or filters, or click below to create a brand new gallery album.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {(searchQuery || filterStatus !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={handleStartCreate}
                className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all"
              >
                + Add New Gallery
              </button>
            </div>
          </div>
        ) : (
          filteredGalleries.map((gallery) => {
            const globalIndex = galleries.findIndex((g) => g.id === gallery.id);
            const cover =
              gallery.coverImage ||
              gallery.imageUrl ||
              gallery.images?.[0] ||
              "/images/dailyshipping_hero.jpg";
            const imageList = Array.isArray(gallery.images) ? gallery.images : [cover];

            return (
              <div
                key={gallery.id}
                className="bg-[#071930] p-5 sm:p-6 rounded-3xl border border-white/10 hover:border-brand-gold/40 transition-all shadow-md group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start space-x-4 min-w-0 flex-1">
                    {/* Cover Thumbnail with photo count badge */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                      <Image
                        src={cover}
                        alt={gallery.title}
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Photo Count Badge */}
                      <div className="absolute bottom-1.5 left-1.5 bg-black/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-md text-[10px] font-mono flex items-center space-x-1 shadow-sm">
                        <Camera className="w-3 h-3 text-brand-gold" />
                        <span>{imageList.length} photo{imageList.length !== 1 ? "s" : ""}</span>
                      </div>

                      {/* Featured Star */}
                      {gallery.isFeatured && (
                        <div
                          className="absolute top-1.5 right-1.5 bg-brand-gold text-brand-navy p-1 rounded-md shadow-md"
                          title="Featured Gallery Album"
                        >
                          <Star className="w-3 h-3 fill-brand-navy" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Headline */}
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {gallery.date && (
                          <span className="text-[10px] text-slate-300 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 flex items-center space-x-1">
                            <Calendar className="w-2.5 h-2.5 text-brand-gold" />
                            <span>{gallery.date}</span>
                          </span>
                        )}

                        <button
                          onClick={() => handleToggleStatus(gallery.id)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${gallery.status === "published"
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30"
                            }`}
                          title="Click to toggle published / draft"
                        >
                          {gallery.status}
                        </button>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-gold transition-colors font-serif line-clamp-1">
                        <button
                          onClick={() => handleStartEdit(gallery)}
                          className="hover:underline text-left cursor-pointer"
                        >
                          {gallery.title}
                        </button>
                      </h3>

                      <div className="text-[11px] font-mono text-slate-400 flex items-center space-x-1">
                        <Folder className="w-3 h-3 text-brand-gold shrink-0" />
                        <span className="text-slate-300 truncate">
                          public/images/gallary/{gallery.slug}
                        </span>
                      </div>

                      {gallery.description && (
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {gallery.description}
                        </p>
                      )}

                      {/* Preview Thumbnails Strip (Up to 5 images) */}
                      {imageList.length > 1 && (
                        <div className="pt-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                          {imageList.slice(0, 5).map((img, iIdx) => (
                            <div
                              key={iIdx}
                              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-slate-900 border border-white/15 shrink-0"
                            >
                              <Image
                                src={img}
                                alt={`Thumb ${iIdx + 1}`}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {imageList.length > 5 && (
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-mono text-brand-gold shrink-0">
                              +{imageList.length - 5}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10 shrink-0">
                    {/* Reorder Buttons */}
                    <div className="flex items-center bg-[#040C18] rounded-xl border border-white/10 p-0.5 mr-1">
                      <button
                        onClick={() => handleMoveGallery(globalIndex, "up")}
                        disabled={globalIndex === 0}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveGallery(globalIndex, "down")}
                        disabled={globalIndex === galleries.length - 1}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 transition-colors cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* View Live on /gallery */}
                    <Link
                      href="/gallery"
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="View Published /gallery"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Duplicate */}
                    <button
                      onClick={() => handleDuplicateGallery(gallery)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      title="Duplicate Gallery Album"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteGallery(gallery.id, gallery.title)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 transition-colors cursor-pointer"
                      title="Delete Gallery Album"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Edit Gallery Button */}
                    <button
                      onClick={() => handleStartEdit(gallery)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Gallery</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
