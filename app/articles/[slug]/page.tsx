import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DEFAULT_ARTICLES,
  fetchArticles,
  fetchArticleBySlug,
  Article,
} from "@/lib/articles";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  BookOpen,
  Sparkles,
  Ship,
  FileCheck2,
  Building2,
  MapPin,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await fetchArticles();
  const all = articles.length > 0 ? articles : DEFAULT_ARTICLES;
  return all.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Top On Group",
    };
  }

  return {
    title: `${article.title} | Top On Group Articles`,
    description: article.excerpt,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [
        {
          url: article.coverImage || "/images/dailyshipping_hero.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
  };
}

export default async function SingleArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await fetchArticles();
  const activeArticles = (allArticles.length > 0 ? allArticles : DEFAULT_ARTICLES).filter(
    (a) => a.status === "published"
  );
  const relatedArticles = activeArticles.filter((a) => a.id !== article.id).slice(0, 2);

  // Markdown renderer helper
  const renderMarkdownContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = (key: string) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={key} className="space-y-2 my-4 pl-2">
            {listBuffer.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-700 leading-relaxed text-sm sm:text-base">
                <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                <span>
                  {item.split("**").map((chunk, cIdx) =>
                    cIdx % 2 === 1 ? (
                      <strong key={cIdx} className="text-[#0B2240] font-semibold">
                        {chunk}
                      </strong>
                    ) : (
                      chunk
                    )
                  )}
                </span>
              </li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        listBuffer.push(trimmed.slice(2));
        return;
      }

      flushList(`list-before-${index}`);

      if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={index}
            className="text-xl sm:text-2xl font-bold font-serif text-[#0B2240] mt-10 mb-4 pt-4 border-t border-slate-200"
          >
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={index}
            className="text-lg sm:text-xl font-bold font-serif text-[#0B2240] mt-6 mb-3"
          >
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        elements.push(
          <blockquote
            key={index}
            className="p-4 sm:p-5 rounded-2xl bg-brand-navy/5 border-l-4 border-l-brand-gold my-6 text-slate-800 text-sm sm:text-base italic leading-relaxed"
          >
            {trimmed.slice(2).replace(/\*\*/g, "")}
          </blockquote>
        );
      } else if (trimmed.startsWith("```")) {
        // Simple code/diagram blocks
        elements.push(
          <pre
            key={index}
            className="p-4 rounded-xl bg-slate-900 text-brand-gold text-xs font-mono my-4 overflow-x-auto leading-relaxed border border-slate-800"
          >
            {trimmed.replace(/```/g, "")}
          </pre>
        );
      } else if (trimmed === "---") {
        elements.push(<hr key={index} className="my-8 border-slate-200" />);
      } else if (trimmed.length > 0) {
        // Regular paragraph with **bold** parsing
        elements.push(
          <p
            key={index}
            className="text-slate-700 leading-relaxed text-sm sm:text-base my-3 text-justify"
          >
            {trimmed.split("**").map((chunk, cIdx) =>
              cIdx % 2 === 1 ? (
                <strong key={cIdx} className="text-[#0B2240] font-semibold">
                  {chunk}
                </strong>
              ) : (
                chunk
              )
            )}
          </p>
        );
      }
    });

    flushList("list-final");
    return elements;
  };

  return (
    <div className="bg-slate-50 text-slate-900 pb-20">
      {/* 1. TOP BREADCRUMB & BACK BAR */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between text-xs text-slate-500">
          <Link
            href="/articles"
            className="inline-flex items-center space-x-1.5 text-brand-navy hover:text-brand-gold transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <div className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono">
            <Link href="/" className="hover:text-brand-navy">
              Home
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-brand-navy">
              Articles
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      {/* 2. ARTICLE HEADER SECTION */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-8">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-brand-gold/15 text-brand-navy border border-brand-gold/30 text-xs font-bold uppercase tracking-wider font-mono">
              {article.category}
            </span>
            <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                <span>{article.publishedAt}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-brand-gold" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0B2240] tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-sm shadow-xs">
                TO
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">
                  {article.author}
                </strong>
                <span className="text-[11px] text-slate-500">
                  Top On Group Supply Chain &amp; Maritime Research Desk
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. FEATURED COVER IMAGE */}
        <div className="relative h-64 sm:h-96 lg:h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <Image
            src={article.coverImage || "/images/dailyshipping_hero.jpg"}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* 4. EXECUTIVE SUMMARY BOX */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
            Executive Summary &amp; Scope
          </span>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
            {article.excerpt}
          </p>
        </div>

        {/* 5. ARTICLE BODY (Markdown formatted) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
          {renderMarkdownContent(article.content)}
        </div>

        {/* 6. TAGS CLOUD */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-2 uppercase tracking-wider">
            Topics:
          </span>
          {article.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 7. DIVISION AUTHOR BIO & CREDENTIALS */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0B2240] text-white border border-brand-gold/30 shadow-xl space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 mt-1">
              <Ship className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold font-serif text-white">
                Published by Top On Group Trade &amp; Freight Advisory
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Operating specialized group entities including <strong>Daily Shipping &amp; Logistics</strong> (freight forwarding with 20,000+ TEUs handled) and <strong>Top Express Limited</strong> (licensed C&amp;F operations across Chittagong, Dhaka Airport, Kamalapur ICD, Pangaon, and Benapole).
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-300">
              Need freight quotes or customs tariff consultation?
            </span>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-[#0B2240] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Consult Port Operations Desks
            </Link>
          </div>
        </div>

        {/* 8. RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 space-y-6">
            <h3 className="text-xl font-bold font-serif text-[#0B2240] flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-brand-navy" />
              <span>More Freight &amp; Supply Chain Guides</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/articles/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-gold/50 shadow-xs hover:shadow-lg transition-all group block space-y-3"
                >
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider font-mono">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold font-serif text-[#0B2240] group-hover:text-brand-navy leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {rel.excerpt}
                  </p>
                  <div className="pt-2 flex items-center justify-between text-xs text-brand-navy font-semibold">
                    <span>{rel.readTime}</span>
                    <span className="inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
