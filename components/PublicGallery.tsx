"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setCurrentPhotoIndex(0);
  };

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

  // Filtering by search query
  const filteredItems = publishedItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.date && item.date.toLowerCase().includes(q)) ||
      ((item.description || item.caption) &&
        (item.description || item.caption)!.toLowerCase().includes(q))
    );
  });

  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;
  const albumPhotos = activeLightboxItem
    ? (Array.isArray(activeLightboxItem.images) && activeLightboxItem.images.length > 0
      ? activeLightboxItem.images
      : (activeLightboxItem.imageUrl ? [activeLightboxItem.imageUrl] : []))
    : [];

  // Lightbox controls
  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    const currentItem = filteredItems[lightboxIndex];
    const photos = currentItem
      ? (Array.isArray(currentItem.images) && currentItem.images.length > 0
        ? currentItem.images
        : (currentItem.imageUrl ? [currentItem.imageUrl] : []))
      : [];

    if (photos.length > 1 && currentPhotoIndex < photos.length - 1) {
      // Next photo within current album
      setCurrentPhotoIndex((prev) => prev + 1);
    } else {
      // Next album
      const nextAlbumIdx = (lightboxIndex + 1) % filteredItems.length;
      setLightboxIndex(nextAlbumIdx);
      setCurrentPhotoIndex(0);
    }
  }, [lightboxIndex, currentPhotoIndex, filteredItems]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    const currentItem = filteredItems[lightboxIndex];
    const photos = currentItem
      ? (Array.isArray(currentItem.images) && currentItem.images.length > 0
        ? currentItem.images
        : (currentItem.imageUrl ? [currentItem.imageUrl] : []))
      : [];

    if (photos.length > 1 && currentPhotoIndex > 0) {
      // Previous photo within current album
      setCurrentPhotoIndex((prev) => prev - 1);
    } else {
      // Previous album
      const prevAlbumIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
      setLightboxIndex(prevAlbumIdx);
      const prevItem = filteredItems[prevAlbumIdx];
      const prevPhotos = prevItem
        ? (Array.isArray(prevItem.images) && prevItem.images.length > 0
          ? prevItem.images
          : (prevItem.imageUrl ? [prevItem.imageUrl] : []))
        : [];
      setCurrentPhotoIndex(Math.max(0, prevPhotos.length - 1));
    }
  }, [lightboxIndex, currentPhotoIndex, filteredItems]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
    setCurrentPhotoIndex(0);
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

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-slate-50 text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 dark-segment border-b border-brand-gold/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white tracking-tight">
            Gallery
          </h1>
        </div>
      </section>

      {/* 2. GALLERY INTERACTIVE WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 3. GALLERY PHOTO GRID */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredItems.map((item, index) => {
              const coverImg =
                item.coverImage ||
                item.imageUrl ||
                item.images?.[0] ||
                "/images/dailyshipping_hero.jpg";
              const photoCount = Array.isArray(item.images) && item.images.length > 0 ? item.images.length : 1;

              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-brand-gold/50 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                    <Image
                      src={coverImg}
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

                    {/* Date Badge Top Left */}
                    {item.date && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-1 rounded-lg bg-[#0B2240]/90 backdrop-blur-xs text-brand-gold text-[10px] font-mono border border-brand-gold/30">
                          {item.date}
                        </span>
                      </div>
                    )}

                    {/* Multiple Photos Badge Bottom Right */}
                    {photoCount > 1 && (
                      <div className="absolute bottom-3 right-3 z-10">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono flex items-center space-x-1 shadow-sm">
                          <Camera className="w-3 h-3 text-brand-gold" />
                          <span>{photoCount} photos</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Caption Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
                    <h3 className="text-xs sm:text-sm font-bold font-serif text-[#0B2240] group-hover:text-brand-navy transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {(item.description || item.caption) && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {item.description || item.caption}
                      </p>
                    )}

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-brand-navy font-semibold">
                      <span className="text-slate-400 font-mono text-[10px]">
                        {photoCount > 1 ? `${photoCount} Photos in Album` : `Photo #${index + 1}`}
                      </span>
                      <span className="inline-flex items-center space-x-1 text-brand-gold group-hover:translate-x-0.5 transition-transform">
                        <span>View Album</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <Camera className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-800">No gallery albums found</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No gallery albums matched your search query. Try clearing your search.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-semibold hover:bg-brand-navyLight transition-colors cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* 4. LIGHTBOX POPUP MODAL */}
        {mounted && activeLightboxItem && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none overflow-hidden"
            onClick={handleClose}
          >
            {/* Top Toolbar (Fixed Header) */}
            <div
              className="w-full px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md shrink-0 z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 text-white min-w-0">
                <span className="text-xs text-slate-300 font-mono truncate">
                  Album {lightboxIndex! + 1} of {filteredItems.length}
                  {albumPhotos.length > 1 && (
                    <span className="text-brand-gold ml-1.5 font-bold">
                      • Photo {currentPhotoIndex + 1} of {albumPhotos.length}
                    </span>
                  )}
                </span>
              </div>

              {/* Top Right Actions */}
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-[11px] text-slate-400 font-mono hidden md:inline mr-2">
                  ESC to close • Arrows to navigate
                </span>

                <button
                  onClick={handleClose}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 cursor-pointer"
                  title="Close (ESC)"
                  aria-label="Close image popup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Middle Stage: Photo Display with Prev/Next Navigation */}
            <div
              className="relative flex-1 w-full min-h-0 flex items-center justify-center p-3 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Arrow */}
              {(albumPhotos.length > 1 || filteredItems.length > 1) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-brand-gold transition-all hover:scale-110 shadow-2xl cursor-pointer"
                  title="Previous Photo (Arrow Left)"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Right Arrow */}
              {(albumPhotos.length > 1 || filteredItems.length > 1) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 hover:border-brand-gold transition-all hover:scale-110 shadow-2xl cursor-pointer"
                  title="Next Photo (Arrow Right)"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Main Photo container - dynamically fills all available middle space */}
              <div className="relative w-full h-full max-w-6xl flex items-center justify-center">
                <Image
                  src={
                    albumPhotos[currentPhotoIndex] ||
                    activeLightboxItem.imageUrl ||
                    activeLightboxItem.coverImage ||
                    "/images/dailyshipping_hero.jpg"
                  }
                  alt={activeLightboxItem.title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Panel: Title, Date, Description, and Thumbnails Strip */}
            <div
              className="w-full bg-black/85 backdrop-blur-md border-t border-white/10 px-4 sm:px-8 py-3 shrink-0 z-30 max-h-[35vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-6xl mx-auto space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <h2 className="text-sm sm:text-base font-bold font-serif text-white truncate">
                      {activeLightboxItem.title}
                    </h2>
                    {albumPhotos.length > 1 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-gold/20 text-brand-gold border border-brand-gold/30 shrink-0">
                        {currentPhotoIndex + 1} / {albumPhotos.length}
                      </span>
                    )}
                  </div>

                  {activeLightboxItem.date && (
                    <span className="text-xs text-brand-gold font-mono shrink-0 flex items-center space-x-1">
                      <Calendar className="w-3 h-3 inline text-brand-gold" />
                      <span>{activeLightboxItem.date}</span>
                    </span>
                  )}
                </div>

                {(activeLightboxItem.description || activeLightboxItem.caption) && (
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {activeLightboxItem.description || activeLightboxItem.caption}
                  </p>
                )}

                {/* Album Photos Mini Thumbnails Strip */}
                {albumPhotos.length > 1 && (
                  <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
                      Photos in Album:
                    </span>
                    {albumPhotos.map((photoUrl, pIdx) => (
                      <button
                        key={`${photoUrl}_${pIdx}`}
                        onClick={() => setCurrentPhotoIndex(pIdx)}
                        className={`relative w-12 h-9 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${currentPhotoIndex === pIdx
                            ? "border-brand-gold scale-105 shadow-md ring-1 ring-brand-gold"
                            : "border-transparent opacity-50 hover:opacity-100"
                          }`}
                        title={`View photo ${pIdx + 1}`}
                      >
                        <Image
                          src={photoUrl}
                          alt={`Photo ${pIdx + 1}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
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
