"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Article, subscribeArticles } from "@/lib/articles";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  Ship,
  FileCheck2,
  ChevronRight,
  Filter,
} from "lucide-react";

interface ArticlesDirectoryProps {
  initialArticles: Article[];
}

export default function ArticlesDirectory({ initialArticles }: ArticlesDirectoryProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("topon_articles");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    }

    const unsub = subscribeArticles((data) => {
      setArticles(data);
    });

    const handleLocalChange = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setArticles(e.detail);
      }
    };
    window.addEventListener("topon_articles_changed", handleLocalChange);

    return () => {
      if (unsub) unsub();
      window.removeEventListener("topon_articles_changed", handleLocalChange);
    };
  }, []);

  const publishedArticles = articles.filter((a) => a.status === "published");

  // Derive unique categories
  const categories = [
    "All",
    ...Array.from(new Set(publishedArticles.map((a) => a.category).filter(Boolean))),
  ];

  // Filtering
  const filteredArticles = publishedArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      article.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle =
    publishedArticles.find((a) => a.isFeatured) || publishedArticles[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Supply Chain Intelligence &amp; Trade Advisory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Industry Articles &amp; <br />
            <span className="text-gold-light-gradient">Freight Logistics Knowledge</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            In-depth operational analyses, customs compliance guidance, and port navigation strategies authored by Top On Group&apos;s maritime and trade specialists.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Search & Categories Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0B2240] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search freight, ports, C&F..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* FEATURED ARTICLE SPOTLIGHT (Shown when searching/filtering doesn't exclude it) */}
        {featuredArticle &&
          selectedCategory === "All" &&
          !searchQuery && (
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl group hover:shadow-2xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Image Column */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-slate-900">
                  <Image
                    src={featuredArticle.coverImage || "/images/dailyshipping_hero.jpg"}
                    alt={featuredArticle.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:hidden" />
                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider shadow-md flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Featured Analysis</span>
                    </span>
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-xs text-brand-goldDark font-bold uppercase tracking-wider font-mono">
                      <span>{featuredArticle.category}</span>
                      <span>•</span>
                      <span>{featuredArticle.readTime}</span>
                    </div>

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0B2240] leading-tight group-hover:text-brand-navy transition-colors">
                      <Link href={`/articles/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h2>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {featuredArticle.tags?.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{featuredArticle.publishedAt}</span>
                    </div>

                    <Link
                      href={`/articles/${featuredArticle.slug}`}
                      className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0B2240] hover:bg-[#133560] text-white text-xs font-bold transition-all group/btn shadow-xs"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

        {/* ARTICLES GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-[#0B2240] flex items-center space-x-2">
              <Ship className="w-5 h-5 text-brand-navy" />
              <span>
                {selectedCategory === "All" && !searchQuery
                  ? "All Supply Chain Articles"
                  : `Articles in "${selectedCategory}" (${filteredArticles.length})`}
              </span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredArticles.length} publication{filteredArticles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-gold/40 transition-all duration-300 flex flex-col group"
                >
                  {/* Card Cover Image */}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900 block"
                  >
                    <Image
                      src={article.coverImage || "/images/dailyshipping_hero.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#0B2240]/90 backdrop-blur-xs text-brand-gold text-[10px] font-bold uppercase tracking-wider border border-brand-gold/30">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-mono">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-brand-gold" />
                          <span>{article.publishedAt}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-brand-gold" />
                          <span>{article.readTime}</span>
                        </span>
                      </div>

                      <h4 className="text-base font-bold font-serif text-[#0B2240] group-hover:text-brand-navy leading-snug">
                        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-medium text-slate-500 truncate max-w-[160px]">
                        By {article.author.split(" ")[0]}...
                      </span>

                      <Link
                        href={`/articles/${article.slug}`}
                        className="text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors inline-flex items-center space-x-1 group/link"
                      >
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No articles matched your criteria</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or choosing another category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* 3. CTA BOTTOM BANNER */}
        <section className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#061324] via-[#0B2240] to-[#123157] text-white border border-brand-gold/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
              Direct Supply Chain Advisory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Need Direct Guidance on Port Tariffs, HS Codes or Ocean Freight?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Top On Group&apos;s licensed customs brokers and freight forwarding directors provide tailored RFQ evaluations and turnkey clearance support across Bangladesh.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-[#0B2240] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              Consult Port Desks
            </Link>
            <Link
              href="/divisions/logistics-dailyshipping"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20"
            >
              Daily Shipping Division
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
