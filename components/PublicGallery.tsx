"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem, subscribeGallery } from "@/lib/gallery";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Sparkles,
  Search,
  Filter,
  Eye,
  Ship,
  ArrowRight,
} from "lucide-react";

interface PublicGalleryProps {
  initialItems: GalleryItem[];
}

export default function PublicGallery({ initialItems }: PublicGalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    // Check local storage for instantaneous sync
    if (typeof window !== "undefined") {
      try {
        const local = localStorage.getItem("topon_gallery");
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch (e) {
        // ignore
      }
    }

    const unsub = subscribeGallery((data) => {
      setItems(data);
    });

    const handleLocalChange = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        setItems(e.detail);
      }
    };
    window.addEventListener("topon_gallery_changed", handleLocalChange);

    return () => {
      if (unsub) unsub();
      window.removeEventListener("topon_gallery_changed", handleLocalChange);
    };
  }, []);

  const publishedItems = items.filter((item) => item.status === "published");

  // Dynamic categories
  const categories = [
    "All",
    ...Array.from(new Set(publishedItems.map((i) => i.category).filter(Boolean))),
  ];

  // Filtering
  const filteredItems = publishedItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Lightbox keyboard controls
  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
    );
  }, [lightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, handleNext, handlePrev, handleClose]);

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Archive &amp; Photographic Journey</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Corporate Gallery &amp; <br />
            <span className="text-gold-light-gradient">Operational Highlights</span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base leading-relaxed">
            A visual documentation of Top On Group&apos;s international trade missions, port operations, leadership summits, fleet transport, and community impact.
          </p>
        </div>
      </section>

      {/* 2. GALLERY INTERACTIVE WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Controls: Category Filter + Search */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
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

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search photos by title, event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold focus:bg-white text-slate-900"
            />
          </div>
        </div>

        {/* Counter Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span className="font-medium">
            Showing <strong className="text-slate-800">{filteredItems.length}</strong> photo
            {filteredItems.length !== 1 ? "s" : ""} in{" "}
            <span className="text-brand-navy font-semibold">{selectedCategory}</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Click any image to view in high-resolution popup
          </span>
        </div>

        {/* 3. GALLERY PHOTO GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Dark Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Category Pill Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-[#0B2240]/90 backdrop-blur-xs text-brand-gold text-[10px] font-bold uppercase tracking-wider border border-brand-gold/30">
                      {item.category}
                    </span>
                  </div>

                  {/* Date Badge Top Right */}
                  {item.date && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-slate-200 text-[10px] font-mono">
                        {item.date}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Caption Area */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                  <h3 className="text-xs sm:text-sm font-bold font-serif text-[#0B2240] group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  {item.caption && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-navy font-semibold">
                    <span className="text-slate-400 font-mono text-[10px]">
                      Photo #{index + 1}
                    </span>
                    <span className="inline-flex items-center space-x-1 text-brand-gold group-hover:translate-x-0.5 transition-transform">
                      <span>Expand</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Camera className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No photos found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No gallery images matched your current filter. Try selecting another category or clearing your search.
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

        {/* 4. LIGHTBOX POPUP MODAL */}
        {activeLightboxItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-200"
            onClick={handleClose}
          >
            {/* Top Toolbar */}
            <div
              className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 text-white">
                <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-wider font-mono">
                  {activeLightboxItem.category}
                </span>
                <span className="text-xs text-slate-300 font-mono hidden sm:inline">
                  {lightboxIndex! + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleClose}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close (ESC)"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-xs hover:scale-110 shadow-xl"
                title="Previous Image (Arrow Left)"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Right Nav Arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-xs hover:scale-110 shadow-xl"
                title="Next Image (Arrow Right)"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Main Stage: Photo + Bottom Caption */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Photo Display */}
              <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden shadow-2xl bg-black/40 border border-white/10">
                <Image
                  src={activeLightboxItem.imageUrl}
                  alt={activeLightboxItem.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Bottom Caption Card */}
              <div className="w-full mt-3 p-4 rounded-2xl bg-slate-900/90 border border-white/10 text-white space-y-1.5 backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm sm:text-base font-bold font-serif text-white">
                    {activeLightboxItem.title}
                  </h2>
                  {activeLightboxItem.date && (
                    <span className="text-xs text-brand-gold font-mono shrink-0">
                      {activeLightboxItem.date}
                    </span>
                  )}
                </div>

                {activeLightboxItem.caption && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeLightboxItem.caption}
                  </p>
                )}

                {/* Mini Thumbnail Navigation Strip */}
                {filteredItems.length > 1 && (
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                    {filteredItems.map((thumb, tIdx) => (
                      <button
                        key={thumb.id}
                        onClick={() => setLightboxIndex(tIdx)}
                        className={`relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          lightboxIndex === tIdx
                            ? "border-brand-gold scale-105 shadow-md"
                            : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={thumb.imageUrl}
                          alt={thumb.title}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 5. BOTTOM CTA BANNER */}
        <section className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-[#061324] via-[#0B2240] to-[#123157] text-white border border-brand-gold/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest block font-mono">
              Commercial Operations &amp; Port Access
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Partner with Bangladesh&apos;s Trusted Cross-Border Group
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore our comprehensive freight forwarding, customs brokerage (C&amp;F), international sourcing, and sustainable agro operations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldLight text-[#0B2240] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:scale-105"
            >
              Contact Operations Desks
            </Link>
            <Link
              href="/services"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/20"
            >
              Explore Services
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
