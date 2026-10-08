"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Article,
  DEFAULT_ARTICLES,
  fetchArticles,
  saveArticles,
} from "@/lib/articles";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Eye,
  Edit3,
  Calendar,
  Clock,
  Tag,
  User,
  Folder,
  FileText,
  X,
  Upload,
  Check,
  ImageIcon,
  Star,
} from "lucide-react";

const PRESET_CATEGORIES = [
  "Freight Forwarding & Maritime",
  "Customs & Trade Compliance",
  "Port Infrastructure & Logistics",
  "Air Express & Cargo",
  "Supply Chain Management",
  "International Sourcing & Trade",
];

interface AdminArticleFormPageProps {
  articleId?: string; // If undefined, mode is "new"
}

export default function AdminArticleFormPage({ articleId }: AdminArticleFormPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const isNew = !articleId || articleId === "new";

  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [formData, setFormData] = useState<Article>({
    id: `art_${Date.now()}`,
    slug: "",
    title: "",
    category: "Freight Forwarding & Maritime",
    author: "Top On Group Logistics Desk",
    coverImage: "/images/hero_port.jpg",
    readTime: "5 min read",
    publishedAt: new Date().toISOString().split("T")[0],
    status: "draft",
    isFeatured: false,
    order: 0,
    excerpt: "",
    tags: ["Freight Forwarding", "Bangladesh Logistics"],
    content: "",
  });

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadFeedback({ type: null, message: "" });

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const res = await fetch("/api/admin/upload-article-image", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        updateField("coverImage", data.url);
        setUploadFeedback({
          type: "success",
          message: `Cover image uploaded to public/images/artical-img/ (${data.sizeFormatted})`,
        });
      } else {
        setUploadFeedback({
          type: "error",
          message: data.error || "Failed to upload image.",
        });
      }
    } catch (err: any) {
      setUploadFeedback({
        type: "error",
        message: err?.message || "An unexpected error occurred during image upload.",
      });
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = "";
    }
  };

  // Auth redirection
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Load article data
  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        const loaded = await fetchArticles(false);
        if (!mounted) return;
        setArticlesList(loaded);

        if (!isNew && articleId) {
          const found = loaded.find((a) => a.id === articleId);
          if (found) {
            setFormData(found);
          } else {
            setSaveStatus({
              type: "error",
              message: `Article ID "${articleId}" was not found. Loaded blank template.`,
            });
          }
        } else {
          // New article default
          setFormData({
            id: `art_${Date.now()}`,
            slug: `new-article-${loaded.length + 1}`,
            title: "",
            category: "Freight Forwarding & Maritime",
            author: user?.displayName || "Top On Group Editorial Desk",
            coverImage: "/images/hero_port.jpg",
            readTime: "5 min read",
            publishedAt: new Date().toISOString().split("T")[0],
            status: "draft",
            isFeatured: false,
            order: loaded.length,
            excerpt: "",
            tags: ["Freight Forwarding", "Bangladesh Trade"],
            content: `## 1. Executive Summary\n\nProvide operational details, industry regulations, or logistics procedures here.\n\n* Key finding 1\n* Key finding 2\n\n## 2. Strategic Implementation\n\nDetail specific port operations or trade lane analysis.`,
          });
        }
      } catch (err: any) {
        if (mounted) {
          setSaveStatus({
            type: "error",
            message: err?.message || "Failed to load articles.",
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, [articleId, isNew, user]);

  const handleSlugGen = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const updateField = (field: keyof Article, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (saveStatus.type) setSaveStatus({ type: null, message: "" });
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setSaveStatus({
        type: "error",
        message: "Please enter an article title / headline.",
      });
      return;
    }

    if (!formData.slug.trim()) {
      setSaveStatus({
        type: "error",
        message: "Please specify a URL slug for this article.",
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      const nowIso = new Date().toISOString();
      const updatedArticle: Article = {
        ...formData,
        slug: formData.slug.toLowerCase().trim().replace(/\s+/g, "-"),
        updatedAt: nowIso,
        updatedBy: user?.email || "admin",
      };

      let updatedList: Article[];
      const existsIndex = articlesList.findIndex((a) => a.id === updatedArticle.id);

      if (existsIndex >= 0) {
        updatedList = articlesList.map((a, i) => (i === existsIndex ? updatedArticle : a));
      } else {
        updatedList = [updatedArticle, ...articlesList];
      }

      // If this article is marked as featured, unset other articles to maintain single lead spotlight
      if (updatedArticle.isFeatured) {
        updatedList = updatedList.map((a) =>
          a.id === updatedArticle.id ? a : { ...a, isFeatured: false }
        );
      }

      // Re-index orders
      const normalizedList = updatedList.map((item, idx) => ({
        ...item,
        order: idx,
      }));

      const res = await saveArticles(normalizedList, user?.email || "admin");
      if (res.success) {
        setArticlesList(normalizedList);
        setSaveStatus({
          type: "success",
          message: `Article "${updatedArticle.title}" saved successfully to Firebase!`,
        });
        // If it was new, update URL seamlessly
        if (isNew) {
          router.replace(`/admin/articles/${updatedArticle.id}`);
        }
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to save article.",
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

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#040C18] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-3 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-mono text-brand-gold tracking-wider">
          Loading Article Editor...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040C18] text-slate-100 flex flex-col antialiased overflow-y-auto">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#071930]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <Link
            href="/admin?tab=articles"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center space-x-1.5 text-xs font-medium shrink-0 border border-white/10"
            title="Return to Articles List"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Articles</span>
          </Link>

          <div className="h-5 w-px bg-white/10 hidden sm:block" />

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold px-2 py-0.5 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                {isNew ? "New Article" : "Edit Article"}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${formData.status === "published"
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                  : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  }`}
              >
                {formData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {formData.slug && (
            <Link
              href={`/articles/${formData.slug}`}
              target="_blank"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/10 transition-colors"
            >
              <span>View Live</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
            </Link>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Article"}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
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
              className="text-xs opacity-70 hover:opacity-100 underline ml-4"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Tab Switcher: Form vs Preview */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2 bg-[#071930] p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActiveTab("edit")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${activeTab === "edit"
                ? "bg-brand-gold text-brand-navy shadow-sm"
                : "text-slate-400 hover:text-white"
                }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Article Editor &amp; Settings</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${activeTab === "preview"
                ? "bg-brand-gold text-brand-navy shadow-sm"
                : "text-slate-400 hover:text-white"
                }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Reader Preview</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-3 text-xs text-slate-400">
            <span>Markdown supported</span>
            <span>•</span>
            <span className="font-mono">{formData.content?.length || 0} characters</span>
          </div>
        </div>

        {activeTab === "edit" ? (
          /* ========================================================= */
          /* FORM VIEW */
          /* ========================================================= */
          <div className="space-y-6">
            {/* 1. Article Details Card */}
            <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <h3 className="text-sm font-bold  uppercase tracking-wider text-brand-gold flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Primary Headline &amp; Metadata</span>
              </h3>

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Article Headline / Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    updateField("title", newTitle);
                    if (!formData.slug || formData.slug.startsWith("new-article")) {
                      updateField("slug", handleSlugGen(newTitle));
                    }
                  }}
                  placeholder="e.g. The Strategic Guide to Freight Forwarding in Bangladesh"
                  className="w-full px-4 py-3 rounded-xl bg-[#040C18] border border-white/15 text-white font-serif text-base font-semibold focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    URL Slug * (SEO Path)
                  </label>
                  <div className="flex items-center rounded-xl bg-[#040C18] border border-white/15 overflow-hidden focus-within:border-brand-gold">
                    <span className="pl-3 text-xs text-slate-500 font-mono">
                      /articles/
                    </span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        updateField("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
                      }
                      className="w-full px-2 py-2.5 text-xs bg-transparent text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Category *
                  </label>
                  <input
                    type="text"
                    list="category-suggestions"
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    placeholder="e.g. Freight Forwarding & Maritime"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                  <datalist id="category-suggestions">
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Author, Read Time, Date, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Author / Desk</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Read Time</span>
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => updateField("readTime", e.target.value)}
                    placeholder="5 min read"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Published Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => updateField("publishedAt", e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-mono focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => updateField("status", e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-sm font-semibold focus:border-brand-gold focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Featured News Spotlight Option */}
              <div className="pt-2 border-t border-white/10">
                <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#040C18] border border-white/15 hover:border-brand-gold/40 cursor-pointer transition-colors group">
                  <input
                    type="checkbox"
                    checked={Boolean(formData.isFeatured)}
                    onChange={(e) => updateField("isFeatured", e.target.checked)}
                    className="w-4 h-4 rounded text-brand-gold accent-brand-gold focus:ring-brand-gold cursor-pointer"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center space-x-1.5">
                      <Star
                        className={`w-4 h-4 transition-colors ${formData.isFeatured
                          ? "text-brand-gold fill-brand-gold"
                          : "text-slate-400 group-hover:text-brand-gold"
                          }`}
                      />
                      <span className="text-xs font-bold text-white">
                        Featured News Spotlight
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      (Pin this article as the primary hero story on /articles)
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Cover Image & Excerpt */}
            <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold flex items-center gap-2">
                  <Folder className="w-4 h-4" />
                  <span>Media &amp; Summary</span>
                </h3>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 self-start sm:self-auto"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? "Uploading Image..." : "Upload Cover Image"}</span>
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />

              {/* Upload Feedback */}
              {uploadFeedback.type && (
                <div
                  className={`p-3 rounded-xl text-xs flex items-center justify-between ${uploadFeedback.type === "success"
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
                    type="button"
                    onClick={() => setUploadFeedback({ type: null, message: "" })}
                    className="text-xs opacity-70 hover:opacity-100 underline ml-2"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Cover Image Preview & Path Card */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-300 block">
                  Cover Image (Saved in <code className="text-brand-gold font-mono">public/images/artical-img/</code>)
                </label>

                {formData.coverImage ? (
                  <div className="rounded-2xl bg-[#040C18] border border-white/15 p-4 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                      <Image
                        src={formData.coverImage}
                        alt="Article Cover Preview"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-400">Current Image URL:</span>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => updateField("coverImage", "")}
                            className="px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={formData.coverImage}
                        onChange={(e) => updateField("coverImage", e.target.value)}
                        placeholder="/images/artical-img/my_image.jpg"
                        className="w-full px-3.5 py-2 rounded-xl bg-[#071930] border border-white/10 text-white font-mono text-xs focus:border-brand-gold focus:outline-none"
                      />

                      <p className="text-[11px] text-slate-400">
                        Uploaded images are stored in <span className="text-brand-gold">public/images/artical-img/</span> and served with high-speed caching.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 rounded-2xl bg-[#040C18] border-2 border-dashed border-white/15 hover:border-brand-gold/50 cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-brand-gold transition-colors">
                        Click to upload article cover image
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        PNG, JPG, WebP, or AVIF (Saved directly to public/images/artical-img/)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Short Excerpt / Meta Description (1–2 sentences)
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => updateField("excerpt", e.target.value)}
                  placeholder="Operational overview of freight forwarding and customs clearance in Bangladesh..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs leading-relaxed focus:border-brand-gold focus:outline-none resize-none"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Tags (Comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={formData.tags?.join(", ") || ""}
                  onChange={(e) =>
                    updateField(
                      "tags",
                      e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                  placeholder="Freight Forwarding, Chittagong Port, Ocean Freight, C&F"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            {/* 3. Markdown Content Card */}
            <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold  uppercase tracking-wider text-brand-gold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Article Body Content (Markdown)</span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">
                  {formData.content?.length || 0} characters
                </span>
              </div>

              <textarea
                rows={18}
                value={formData.content}
                onChange={(e) => updateField("content", e.target.value)}
                placeholder="## 1. Executive Overview&#10;&#10;Write your detailed analysis here..."
                className="w-full p-4 rounded-2xl bg-[#040C18] border border-white/15 text-white font-mono text-xs leading-relaxed focus:border-brand-gold focus:outline-none"
              />

              <p className="text-[11px] text-slate-400">
                Format using Markdown: <code className="text-brand-gold">## Heading</code>,{" "}
                <code className="text-brand-gold">* Bullet Points</code>,{" "}
                <code className="text-brand-gold">&gt; Quotes</code>, and{" "}
                <code className="text-brand-gold">**Bold text**</code>.
              </p>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* LIVE READER PREVIEW */
          /* ========================================================= */
          <div className="bg-[#071930] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8 max-w-4xl mx-auto">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-xl border border-white/10">
              <Image
                src={formData.coverImage || "/images/dailyshipping_hero.jpg"}
                alt={formData.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
                <div className="space-y-3 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-wider">
                    {formData.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white leading-tight">
                    {formData.title || "Article Headline"}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs text-slate-300 font-mono">
                    <span>{formData.author}</span>
                    <span>•</span>
                    <span>{formData.publishedAt}</span>
                    <span>•</span>
                    <span>{formData.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {formData.excerpt && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 italic text-slate-300 text-sm leading-relaxed border-l-4 border-l-brand-gold">
                {formData.excerpt}
              </div>
            )}

            <div className="text-slate-200 leading-relaxed whitespace-pre-line text-sm sm:text-base font-sans">
              {formData.content}
            </div>

            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {formData.tags?.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
