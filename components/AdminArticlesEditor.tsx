"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Article,
  DEFAULT_ARTICLES,
  fetchArticles,
  saveArticles,
  subscribeArticles,
} from "@/lib/articles";
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
  Edit3,
  Calendar,
  Clock,
  Tag,
  User,
  Folder,
  Copy,
  FileText,
  Check,
  X,
} from "lucide-react";

const PRESET_COVERS = [
  "/images/dailyshipping_hero.jpg",
  "/images/customs_cnf.jpg",
  "/images/hero_port.jpg",
  "/images/air_cargo.jpg",
  "/images/trading_sourcing.jpg",
  "/images/topexpress_hero.jpg",
  "/images/topontech_hero.jpg",
  "/images/agro_farm.jpg",
  "/images/toponsolution_hero.jpg",
];

const PRESET_CATEGORIES = [
  "Freight Forwarding & Maritime",
  "Customs & Trade Compliance",
  "Port Infrastructure & Logistics",
  "Air Express & Cargo",
  "Supply Chain Management",
  "International Sourcing & Trade",
];

export default function AdminArticlesEditor() {
  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    DEFAULT_ARTICLES[0]?.id || ""
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    setConfigured(isFirebaseConfigured());

    const unsub = subscribeArticles((data) => {
      setArticles(data);
      if (data.length > 0 && !selectedArticleId) {
        setSelectedArticleId(data[0].id);
      }
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const selectedArticle =
    articles.find((a) => a.id === selectedArticleId) || articles[0];

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      filterStatus === "all" ? true : a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateSelectedField = (field: keyof Article, value: any) => {
    if (!selectedArticle) return;
    setArticles((prev) =>
      prev.map((a) => (a.id === selectedArticle.id ? { ...a, [field]: value } : a))
    );
    if (saveStatus.type) setSaveStatus({ type: null, message: "" });
  };

  const handleSlugGen = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim();
  };

  const handleCreateNew = () => {
    const timestamp = Date.now();
    const newId = `art_${timestamp}`;
    const newArticle: Article = {
      id: newId,
      slug: `new-freight-article-${articles.length + 1}`,
      title: `Freight & Logistics Insight #${articles.length + 1}`,
      category: "Freight Forwarding & Maritime",
      author: "Top On Group Logistics Desk",
      coverImage: PRESET_COVERS[articles.length % PRESET_COVERS.length],
      readTime: "5 min read",
      publishedAt: new Date().toISOString().split("T")[0],
      status: "draft",
      isFeatured: false,
      order: articles.length,
      excerpt:
        "Detailed executive summary and operational overview of freight forwarding and customs clearance in Bangladesh.",
      tags: ["Freight Forwarding", "Bangladesh Logistics", "Supply Chain"],
      content: `## 1. Executive Overview\n\nWrite your detailed analysis, regulatory commentary, or market review here.\n\n* Key point 1: Highlighting operational efficiency\n* Key point 2: Navigating customs and port clearance\n* Key point 3: Maximizing freight ROI\n\n> "Consistency and regulatory adherence are the core tenets of modern supply chain velocity."\n\n## 2. Strategic Implementation\n\nElaborate on port workflows, off-dock container storage, or ocean feeder schedules.`,
    };

    const nextArticles = [newArticle, ...articles];
    setArticles(nextArticles);
    setSelectedArticleId(newId);
    setIsEditing(true);
    setActiveTab("edit");
  };

  const handleDelete = (id: string, title: string) => {
    if (articles.length <= 1) {
      alert("At least one article must remain in the system.");
      return;
    }
    if (confirm(`Are you sure you want to permanently delete article:\n"${title}"?`)) {
      const remaining = articles.filter((a) => a.id !== id);
      setArticles(remaining);
      setSelectedArticleId(remaining[0]?.id || "");
    }
  };

  const handleDuplicate = (article: Article) => {
    const copy: Article = {
      ...article,
      id: `art_${Date.now()}`,
      slug: `${article.slug}-copy`,
      title: `${article.title} (Copy)`,
      status: "draft",
      isFeatured: false,
      order: articles.length,
    };
    setArticles([copy, ...articles]);
    setSelectedArticleId(copy.id);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= articles.length) return;
    const next = [...articles];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    setArticles(next.map((item, idx) => ({ ...item, order: idx })));
  };

  const handleToggleStatus = (id: string) => {
    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === "published" ? "draft" : "published";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleResetToDefault = () => {
    if (
      confirm(
        "Reset articles to the initial two authoritative Freight Forwarding guides? Any custom articles will be overwritten."
      )
    ) {
      setArticles(DEFAULT_ARTICLES);
      setSelectedArticleId(DEFAULT_ARTICLES[0].id);
      setSaveStatus({
        type: "success",
        message: "Reset to default freight forwarding articles. Click 'Save Articles' to persist.",
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("topon_articles", JSON.stringify(articles));
        window.dispatchEvent(new CustomEvent("topon_articles_changed", { detail: articles }));
      }

      if (configured) {
        const res = await saveArticles(articles, "admin@toponbd.com");
        if (res.success) {
          setSaveStatus({
            type: "success",
            message: "Articles successfully published and synced to Firebase Firestore!",
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
          message: "Articles saved to local offline storage (Firebase is not configured in .env).",
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
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Articles &amp; Industry Insights Manager
              </h2>
              <p className="text-xs text-slate-500">
                Publish, edit, reorder, and manage supply chain articles on{" "}
                <Link
                  href="/articles"
                  target="_blank"
                  className="text-brand-navy hover:text-brand-gold underline font-semibold inline-flex items-center space-x-1"
                >
                  <span>/articles</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-all shadow-xs flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Article</span>
          </button>

          <button
            onClick={handleResetToDefault}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center space-x-1.5"
            title="Reset to default Freight Forwarding in Bangladesh articles"
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
            <span>{isSaving ? "Saving..." : "Save Articles"}</span>
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

      {/* Main Grid: Articles List Sidebar + Editor / Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Articles List (5 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-3">
            {/* Search & Filter */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title, tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500 text-[11px] font-medium">
                {filteredArticles.length} Article{filteredArticles.length !== 1 ? "s" : ""}
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

          {/* Articles Cards List */}
          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-0.5">
            {filteredArticles.map((article, idx) => {
              const isSelected = article.id === selectedArticle?.id;
              const globalIndex = articles.findIndex((a) => a.id === article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => {
                    setSelectedArticleId(article.id);
                    setIsEditing(true);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer group relative ${
                    isSelected
                      ? "bg-brand-navy/5 border-brand-navy/30 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      <Image
                        src={article.coverImage || "/images/dailyshipping_hero.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                      {article.isFeatured && (
                        <div className="absolute top-1 left-1 bg-brand-gold text-brand-navy p-0.5 rounded shadow-xs">
                          <Sparkles className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold text-brand-goldDark uppercase tracking-wider truncate">
                          {article.category}
                        </span>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            article.status === "published"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {article.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-brand-navy line-clamp-2 leading-snug">
                        {article.title}
                      </h4>

                      <div className="flex items-center space-x-2 text-[10px] text-slate-500 mt-1.5 font-mono">
                        <span>{article.publishedAt}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Controls Bar */}
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs">
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
                        disabled={globalIndex === articles.length - 1}
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
                          handleToggleStatus(article.id);
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                          article.status === "published"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        }`}
                        title="Toggle Draft/Published"
                      >
                        {article.status === "published" ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicate(article);
                        }}
                        className="p-1 hover:text-brand-navy rounded"
                        title="Duplicate Article"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <Link
                        href={`/articles/${article.slug}`}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 hover:text-brand-gold rounded"
                        title="View Live Article"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(article.id, article.title);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        title="Delete Article"
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

        {/* Right Column: Detailed Editor & Live Preview (8 cols) */}
        {selectedArticle ? (
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            {/* Header Tabs: Edit vs Preview */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === "edit"
                      ? "bg-[#0B2240] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor &amp; Settings</span>
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    activeTab === "preview"
                      ? "bg-[#0B2240] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Article Preview</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Link
                  href={`/articles/${selectedArticle.slug}`}
                  target="_blank"
                  className="text-xs text-brand-navy hover:text-brand-gold font-semibold flex items-center space-x-1"
                >
                  <span>Open URL</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {activeTab === "edit" ? (
              /* --- EDIT FORM --- */
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Article Headline / Title *
                  </label>
                  <input
                    type="text"
                    value={selectedArticle.title}
                    onChange={(e) => {
                      const newTitle = e.target.value;
                      updateSelectedField("title", newTitle);
                      // Auto update slug if it was closely matched
                      if (
                        !selectedArticle.slug ||
                        selectedArticle.slug.startsWith("new-freight")
                      ) {
                        updateSelectedField("slug", handleSlugGen(newTitle));
                      }
                    }}
                    placeholder="e.g. The Strategic Guide to Freight Forwarding in Bangladesh"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-serif text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white"
                  />
                </div>

                {/* Slug & Category Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      URL Slug *
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-50 border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-brand-gold/20 focus-within:border-brand-gold">
                      <span className="pl-3 text-[11px] text-slate-400 font-mono">
                        /articles/
                      </span>
                      <input
                        type="text"
                        value={selectedArticle.slug}
                        onChange={(e) =>
                          updateSelectedField(
                            "slug",
                            e.target.value.toLowerCase().replace(/\s+/g, "-")
                          )
                        }
                        className="w-full px-2 py-2 text-xs bg-transparent text-slate-900 font-mono focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      list="category-suggestions"
                      value={selectedArticle.category}
                      onChange={(e) => updateSelectedField("category", e.target.value)}
                      placeholder="e.g. Freight Forwarding & Maritime"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                    />
                    <datalist id="category-suggestions">
                      {PRESET_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Author, Read Time, Date & Status */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Author
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.author}
                      onChange={(e) => updateSelectedField("author", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.readTime}
                      onChange={(e) => updateSelectedField("readTime", e.target.value)}
                      placeholder="7 min read"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Published Date
                    </label>
                    <input
                      type="date"
                      value={selectedArticle.publishedAt}
                      onChange={(e) => updateSelectedField("publishedAt", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono text-[11px]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={selectedArticle.status}
                      onChange={(e) =>
                        updateSelectedField("status", e.target.value as any)
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-semibold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={Boolean(selectedArticle.isFeatured)}
                    onChange={(e) => updateSelectedField("isFeatured", e.target.checked)}
                    className="w-4 h-4 rounded text-brand-navy focus:ring-brand-gold"
                  />
                  <label
                    htmlFor="featured-checkbox"
                    className="text-xs font-semibold text-slate-800 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Featured Article (Highlighted at top of /articles page)</span>
                  </label>
                </div>

                {/* Cover Image Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cover Image URL
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={selectedArticle.coverImage}
                      onChange={(e) => updateSelectedField("coverImage", e.target.value)}
                      placeholder="/images/dailyshipping_hero.jpg"
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono"
                    />
                  </div>

                  {/* Preset Covery Gallery */}
                  <div>
                    <span className="text-[11px] text-slate-500 font-medium block mb-1">
                      Or pick from high-res logistics presets:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_COVERS.map((preset, pIdx) => (
                        <div
                          key={pIdx}
                          onClick={() => updateSelectedField("coverImage", preset)}
                          className={`relative h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                            selectedArticle.coverImage === preset
                              ? "border-brand-gold scale-[1.03] shadow-sm"
                              : "border-transparent opacity-75 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={preset}
                            alt="Preset cover"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Short Excerpt / Meta Description (1–2 sentences)
                  </label>
                  <textarea
                    rows={2}
                    value={selectedArticle.excerpt}
                    onChange={(e) => updateSelectedField("excerpt", e.target.value)}
                    placeholder="Brief summary of the article for social sharing and article cards..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold"
                  />
                </div>

                {/* Tags (comma separated) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={selectedArticle.tags?.join(", ") || ""}
                    onChange={(e) =>
                      updateSelectedField(
                        "tags",
                        e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean)
                      )
                    }
                    placeholder="Freight Forwarding, Chittagong Port, Ocean Freight, C&F"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  />
                </div>

                {/* Markdown Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Article Content (Markdown Supported) *
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {selectedArticle.content?.length || 0} characters
                    </span>
                  </div>

                  <textarea
                    rows={16}
                    value={selectedArticle.content}
                    onChange={(e) => updateSelectedField("content", e.target.value)}
                    placeholder="## 1. Title\n\nContent paragraph here..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports Markdown headings (##, ###), bullet points (*), blockquotes (&gt;), tables, and bold text (**).
                  </p>
                </div>
              </div>
            ) : (
              /* --- LIVE PREVIEW --- */
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={selectedArticle.coverImage || "/images/dailyshipping_hero.jpg"}
                    alt={selectedArticle.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-6">
                    <div className="space-y-2 text-white">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-wider">
                        {selectedArticle.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
                        {selectedArticle.title}
                      </h2>
                      <div className="flex items-center space-x-3 text-xs text-slate-200 font-mono pt-1">
                        <span>{selectedArticle.author}</span>
                        <span>•</span>
                        <span>{selectedArticle.publishedAt}</span>
                        <span>•</span>
                        <span>{selectedArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 italic text-slate-600 text-sm leading-relaxed border-l-4 border-l-brand-gold">
                  {selectedArticle.excerpt}
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans">
                  {selectedArticle.content}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {selectedArticle.tags?.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-8 p-12 text-center bg-white rounded-3xl border border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Select an article from the left or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
