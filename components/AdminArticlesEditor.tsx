"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Article,
  DEFAULT_ARTICLES,
  saveArticles,
  subscribeArticles,
} from "@/lib/articles";
import { useAuth } from "@/lib/auth-context";
import {
  Plus,
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Calendar,
  Clock,
  User,
  Filter,
  Check,
  X,
  Eye,
  Star,
} from "lucide-react";

export default function AdminArticlesEditor() {
  const router = useRouter();
  const { user } = useAuth();

  const [articles, setArticles] = useState<Article[]>(DEFAULT_ARTICLES);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    const unsub = subscribeArticles((data) => {
      setArticles(data);
    });

    return () => {
      if (unsub) unsub();
    };
  }, []);

  // Unique categories for filter dropdown
  const categories = Array.from(new Set(articles.map((a) => a.category))).filter(Boolean);

  // Filtered articles
  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      filterStatus === "all" ? true : a.status === filterStatus;

    const matchesCategory =
      selectedCategory === "all" ? true : a.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Metric counts
  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;
  const featuredCount = articles.filter((a) => a.isFeatured).length;

  const persistArticles = async (
    updatedList: Article[],
    successMessage: string
  ) => {
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });
    try {
      const normalized = updatedList.map((item, idx) => ({
        ...item,
        order: idx,
      }));
      setArticles(normalized);
      const res = await saveArticles(normalized, user?.email || "admin");
      if (res.success) {
        setSaveStatus({ type: "success", message: successMessage });
      } else {
        setSaveStatus({
          type: "error",
          message: res.error || "Failed to update articles.",
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

  const handleToggleStatus = async (id: string) => {
    const updated = articles.map((a) => {
      if (a.id === id) {
        const nextStatus = a.status === "published" ? ("draft" as const) : ("published" as const);
        return { ...a, status: nextStatus };
      }
      return a;
    });
    const target = articles.find((a) => a.id === id);
    const newStatusLabel = target?.status === "published" ? "draft" : "published";
    await persistArticles(updated, `Article status changed to ${newStatusLabel}.`);
  };

  // Active featured article (spotlight)
  const currentFeatured = articles.find((a) => a.isFeatured);

  const handleSetFeaturedArticle = async (targetId: string | null) => {
    const updated = articles.map((a) => ({
      ...a,
      isFeatured: a.id === targetId,
    }));
    const target = articles.find((a) => a.id === targetId);
    const message = target
      ? `Featured News spotlight set to "${target.title}".`
      : "Featured News spotlight cleared (defaulting to latest published article).";
    await persistArticles(updated, message);
  };

  const handleToggleFeatured = async (id: string) => {
    const target = articles.find((a) => a.id === id);
    const willBeFeatured = !target?.isFeatured;
    const updated = articles.map((a) => ({
      ...a,
      isFeatured: a.id === id ? willBeFeatured : false,
    }));
    const message = willBeFeatured
      ? `"${target?.title}" is now set as the Featured News spotlight.`
      : `Removed "${target?.title}" from Featured News spotlight.`;
    await persistArticles(updated, message);
  };

  const handleDuplicate = async (article: Article) => {
    const timestamp = Date.now();
    const copy: Article = {
      ...article,
      id: `art_${timestamp}`,
      slug: `${article.slug}-copy-${timestamp.toString().slice(-4)}`,
      title: `${article.title} (Copy)`,
      status: "draft",
      isFeatured: false,
      order: 0,
    };
    const updated = [copy, ...articles];
    await persistArticles(updated, `Duplicated "${article.title}".`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (articles.length <= 1) {
      alert("At least one article must remain in the system.");
      return;
    }
    if (confirm(`Are you sure you want to delete article:\n"${title}"?`)) {
      const remaining = articles.filter((a) => a.id !== id);
      await persistArticles(remaining, `Deleted article "${title}".`);
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= articles.length) return;
    const next = [...articles];
    const [moved] = next.splice(index, 1);
    next.splice(targetIdx, 0, moved);
    await persistArticles(next, "Article order updated.");
  };

  const handleResetToDefault = async () => {
    if (
      confirm(
        "Reset all articles to the default Freight Forwarding guides? Any custom articles will be overwritten."
      )
    ) {
      await persistArticles(DEFAULT_ARTICLES, "Articles reset to original defaults.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Primary Actions */}
      <div className="bg-[#071930] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center space-x-4">

          <Link
            href="/articles"
            target="_blank"
            className="text-brand-gold hover:underline font-semibold inline-flex items-center space-x-1"
          >
            <span>/articles</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleResetToDefault}
            disabled={isSaving}
            className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center space-x-1.5"
            title="Reset to default Freight Forwarding guides"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>

          <Link
            href="/admin/articles/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs sm:text-sm shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Article</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Total Articles
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
            {articles.length}
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
            Drafts / Review
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-300 mt-1">
            {draftCount}
          </div>
        </div>

        <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md">
          <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider block">
            Featured Articles
          </span>
          <div className="text-2xl sm:text-3xl font-bold text-brand-gold mt-1">
            {featuredCount}
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
            className="text-xs opacity-70 hover:opacity-100 underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Featured News Spotlight Card */}
      <div className="bg-gradient-to-br from-[#071930] via-[#081e3b] to-[#071930] p-5 sm:p-6 rounded-3xl border border-brand-gold/40 shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    Featured News Spotlight
                  </h2>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 font-bold">
                    Hero Lead Story
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Set which article is featured as the lead hero banner on{" "}
                  <Link href="/articles" target="_blank" className="text-brand-gold hover:underline font-semibold inline-flex items-center space-x-1">
                    <span>/articles</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 inline" />
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Quick Selector Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
              <select
                aria-label="Select Featured Article"
                value={currentFeatured?.id || ""}
                onChange={(e) => handleSetFeaturedArticle(e.target.value || null)}
                disabled={isSaving}
                className="w-full sm:w-auto min-w-[220px] max-w-sm px-3.5 py-2.5 rounded-xl bg-[#040C18] border border-brand-gold/40 text-white text-xs font-semibold focus:border-brand-gold focus:ring-1 focus:ring-brand-gold focus:outline-none transition-all cursor-pointer"
              >
                <option value="">-- No explicit featured (Default: Latest) --</option>
                {articles.map((art) => (
                  <option key={art.id} value={art.id}>
                    {art.isFeatured ? "★ " : ""}[{art.status.toUpperCase()}] {art.title}
                  </option>
                ))}
              </select>
              {currentFeatured && (
                <button
                  onClick={() => handleSetFeaturedArticle(null)}
                  disabled={isSaving}
                  className="px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors shrink-0"
                  title="Clear featured spotlight"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Current Active Spotlight Display */}
          {currentFeatured ? (
            <div className="bg-[#040C18]/90 rounded-2xl border border-brand-gold/30 p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start space-x-4 min-w-0 flex-1">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-900 border border-brand-gold/40 shrink-0">
                  <Image
                    src={currentFeatured.coverImage || "/images/dailyshipping_hero.jpg"}
                    alt={currentFeatured.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-1 left-1 bg-brand-gold text-brand-navy p-1 rounded-md shadow-md">
                    <Star className="w-3 h-3 fill-brand-navy" />
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-gold/15 border border-brand-gold/30">
                      {currentFeatured.category}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        currentFeatured.status === "published"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {currentFeatured.status}
                    </span>
                    {currentFeatured.status === "draft" && (
                      <span className="text-[11px] text-amber-300/90 font-mono flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                        (Draft: published status required to appear live to visitors)
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1">
                    <Link
                      href={`/admin/articles/${currentFeatured.id}`}
                      className="hover:text-brand-gold transition-colors"
                    >
                      {currentFeatured.title}
                    </Link>
                  </h3>

                  {currentFeatured.excerpt && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {currentFeatured.excerpt}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-brand-gold" />
                      <span>{currentFeatured.author}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-brand-gold" />
                      <span>{currentFeatured.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="text-slate-400 truncate max-w-xs">/articles/{currentFeatured.slug}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                <Link
                  href={`/articles/${currentFeatured.slug}`}
                  target="_blank"
                  className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
                  <span>View Live</span>
                </Link>

                <Link
                  href={`/admin/articles/${currentFeatured.id}`}
                  className="px-3.5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold flex items-center space-x-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Article</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-[#040C18]/60 rounded-2xl border border-dashed border-white/15 p-4 text-center">
              <p className="text-xs text-slate-300">
                No article is specifically marked as Featured News. The most recent published article automatically serves as the lead spotlight on{" "}
                <Link href="/articles" target="_blank" className="text-brand-gold underline font-semibold">
                  /articles
                </Link>
                .
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Select an article from the dropdown above or click <span className="text-brand-gold font-semibold">&quot;Set as Featured&quot;</span> on any card below to spotlight it.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#071930] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, excerpt, tag, author, or category..."
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filterStatus === status
                    ? "bg-brand-gold text-brand-navy shadow-sm"
                    : "text-slate-400 hover:text-white"
                  }`}
              >
                {status === "all" ? "All" : status}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          {categories.length > 0 && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#040C18] border border-white/15 text-white text-xs font-medium focus:border-brand-gold focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Full-Width Articles List */}
      <div className="space-y-3">
        {filteredArticles.length === 0 ? (
          <div className="bg-[#071930] p-12 text-center rounded-3xl border border-white/10">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-white">No articles matched your criteria</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filters, or click below to add a brand new article.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {(searchQuery || filterStatus !== "all" || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterStatus("all");
                    setSelectedCategory("all");
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <Link
                href="/admin/articles/new"
                className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all"
              >
                + Create Article
              </Link>
            </div>
          </div>
        ) : (
          filteredArticles.map((article, idx) => {
            const globalIndex = articles.findIndex((a) => a.id === article.id);

            return (
              <div
                key={article.id}
                className={`p-4 sm:p-5 rounded-2xl transition-all shadow-md group ${
                  article.isFeatured
                    ? "bg-[#071930] border-2 border-brand-gold shadow-lg shadow-brand-gold/10 ring-1 ring-brand-gold/40"
                    : "bg-[#071930] border border-white/10 hover:border-brand-gold/40"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start space-x-4 min-w-0 flex-1">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0">
                      <Image
                        src={article.coverImage || "/images/dailyshipping_hero.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {article.isFeatured && (
                        <div
                          className="absolute top-1.5 left-1.5 bg-brand-gold text-brand-navy px-1.5 py-0.5 rounded-md shadow-md flex items-center space-x-1"
                          title="Featured News Spotlight"
                        >
                          <Star className="w-3 h-3 fill-brand-navy" />
                          <span className="text-[9px] font-bold uppercase tracking-wider hidden sm:inline">Spotlight</span>
                        </div>
                      )}
                    </div>

                    {/* Metadata & Headline */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20">
                          {article.category}
                        </span>

                        <button
                          onClick={() => handleToggleStatus(article.id)}
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all ${article.status === "published"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30"
                            }`}
                          title="Click to toggle status"
                        >
                          {article.status}
                        </button>

                        {/* Featured News toggle button */}
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(article.id)}
                          disabled={isSaving}
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-all flex items-center space-x-1.5 cursor-pointer ${
                            article.isFeatured
                              ? "bg-brand-gold text-brand-navy border-brand-gold shadow-sm hover:brightness-110"
                              : "bg-white/5 text-slate-300 border-white/10 hover:border-brand-gold/50 hover:text-brand-gold hover:bg-brand-gold/10"
                          }`}
                          title={
                            article.isFeatured
                              ? "Currently Featured News Spotlight. Click to remove."
                              : "Click to set this article as Featured News Spotlight."
                          }
                        >
                          <Star
                            className={`w-3 h-3 ${
                              article.isFeatured ? "fill-brand-navy text-brand-navy" : "text-brand-gold"
                            }`}
                          />
                          <span>{article.isFeatured ? "Featured News" : "Set as Featured News"}</span>
                        </button>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-brand-gold transition-colors font-serif line-clamp-1">
                        <Link href={`/admin/articles/${article.id}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {article.excerpt && (
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 font-mono pt-0.5">
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3 text-brand-gold" />
                          <span>{article.author}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-brand-gold" />
                          <span>{article.publishedAt}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-brand-gold" />
                          <span>{article.readTime}</span>
                        </span>
                        <span>•</span>
                        <span className="text-slate-500 font-sans truncate max-w-xs">
                          /articles/{article.slug}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10 shrink-0">
                    {/* Reorder Buttons */}
                    <div className="flex items-center bg-[#040C18] rounded-xl border border-white/10 p-0.5 mr-1">
                      <button
                        onClick={() => handleMove(globalIndex, "up")}
                        disabled={globalIndex === 0}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move Up in Sequence"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMove(globalIndex, "down")}
                        disabled={globalIndex === articles.length - 1}
                        className="p-1.5 text-slate-400 hover:text-white disabled:opacity-20 transition-colors"
                        title="Move Down in Sequence"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* View Live Article */}
                    <Link
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="View Published Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Duplicate */}
                    <button
                      onClick={() => handleDuplicate(article)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                      title="Duplicate Article"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(article.id, article.title)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Feature Star Action */}
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(article.id)}
                      disabled={isSaving}
                      className={`p-2 rounded-xl border transition-colors ${
                        article.isFeatured
                          ? "bg-brand-gold/20 text-brand-gold border-brand-gold/40 hover:bg-brand-gold/30"
                          : "bg-white/5 hover:bg-brand-gold/20 hover:text-brand-gold text-slate-400 hover:border-brand-gold/30 border-white/10"
                      }`}
                      title={
                        article.isFeatured
                          ? "Featured Spotlight active. Click to remove."
                          : "Set as Featured News Spotlight on /articles"
                      }
                    >
                      <Star
                        className={`w-4 h-4 ${
                          article.isFeatured ? "fill-brand-gold text-brand-gold" : "text-slate-400"
                        }`}
                      />
                    </button>

                    {/* Edit Button (Takes user to dedicated article editor page) */}
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-brand-navy font-bold text-xs shadow-gold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
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
