"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Sparkles,
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
} from "lucide-react";

const galleryImages: string[] = [
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
  "/images/pic-gallary/mamun13.jpeg",
  "/images/pic-gallary/mamun14.jpeg",
  "/images/pic-gallary/mamun15.jpeg",
  "/images/pic-gallary/mamun16.jpeg",
  "/images/pic-gallary/mamun17.jpeg",
  "/images/pic-gallary/mamun18.jpeg",
  "/images/pic-gallary/mamun19.jpeg",
  "/images/pic-gallary/mamun20.jpeg",
  "/images/pic-gallary/mamun21.jpeg",
  "/images/pic-gallary/mamun22.jpeg",
  "/images/pic-gallary/mamun23.jpeg",
  "/images/pic-gallary/mamun24.jpeg",
  "/images/pic-gallary/mamun25.jpeg",
  "/images/pic-gallary/mamun26.jpeg",
  "/images/pic-gallary/mamun27.jpeg",
  "/images/pic-gallary/mamun28.jpeg",
  "/images/pic-gallary/mamun29.jpeg",
  "/images/pic-gallary/mamun30.jpeg",
  "/images/pic-gallary/mamun31.jpeg",
  "/images/pic-gallary/mamun32.jpeg",
  "/images/pic-gallary/mamun33.jpeg",
  "/images/pic-gallary/mamun34.jpeg",
];

const shimmerBlur =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' fill='%23071930'/%3E%3Ccircle cx='50%25' cy='50%25' r='35%25' fill='%23C5A85C' opacity='0.2' filter='url(%23b)'/%3E%3C/svg%3E";

function GalleryThumbnail({
  src,
  index,
  onClick,
}: {
  src: string;
  index: number;
  onClick: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden cursor-pointer bg-[#071930] border border-slate-200 shadow-md hover:shadow-2xl hover:border-brand-gold/60 transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Loading Skeleton / Shimmer Animation (Visible until loaded) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#071930] via-[#0F2D54] to-[#071930] bg-[length:200%_100%] animate-[shimmer_1.8s_infinite] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-2 opacity-60">
            <div className="w-6 h-6 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
            <span className="text-[10px] font-mono tracking-widest text-brand-gold/80 uppercase">
              Loading
            </span>
          </div>
        </div>
      )}

      {/* Image with Low-Quality Blur Placeholder & Smooth Transition */}
      <Image
        src={src}
        alt={`Top On Group Gallery Photo ${index + 1}`}
        fill
        placeholder="blur"
        blurDataURL={shimmerBlur}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        onLoad={() => setIsLoaded(true)}
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded
          ? "opacity-100 blur-0 scale-100"
          : "opacity-40 blur-md scale-105"
          }`}
      />

      {/* Overlay Gradient on Hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center z-20">
        <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
          <Maximize2 className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
}

export default function LeadershipGallery() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeIdx === null) return;

    // Lock body scrolling while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Keyboard navigation handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
      } else if (e.key === "ArrowRight") {
        setModalImageLoaded(false);
        setActiveIdx((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
      } else if (e.key === "ArrowLeft") {
        setModalImageLoaded(false);
        setActiveIdx((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIdx]);

  const openLightbox = (index: number) => {
    setModalImageLoaded(false);
    setActiveIdx(index);
  };

  const closeLightbox = () => {
    setActiveIdx(null);
  };

  const nextImage = () => {
    if (activeIdx !== null) {
      setModalImageLoaded(false);
      setActiveIdx((activeIdx + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (activeIdx !== null) {
      setModalImageLoaded(false);
      setActiveIdx((activeIdx - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Lightbox Modal rendered directly in document.body via Portal
  const lightboxModal =
    mounted && activeIdx !== null
      ? createPortal(
        <div
          className="fixed inset-0 z-[99999] w-screen h-screen min-h-[100dvh] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-[100000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-[100000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-[100000] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20 hover:scale-105 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Photo Container - Strictly Screen Viewport Centered */}
          <div
            className="relative w-full max-w-5xl h-[75vh] sm:h-[82vh] max-h-[85vh] flex flex-col items-center justify-center mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#071930] flex items-center justify-center">
              {/* Modal Loading Shimmer Spinner */}
              {!modalImageLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#071930] space-y-3">
                  <div className="w-10 h-10 border-3 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
                  <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">
                    Loading High-Res Image...
                  </span>
                </div>
              )}

              <Image
                src={galleryImages[activeIdx]}
                alt={`Photo ${activeIdx + 1}`}
                fill
                priority
                placeholder="blur"
                blurDataURL={shimmerBlur}
                sizes="(max-width: 1280px) 95vw, 1200px"
                onLoad={() => setModalImageLoaded(true)}
                className={`object-contain transition-all duration-500 ease-out ${modalImageLoaded
                  ? "opacity-100 blur-0 scale-100"
                  : "opacity-40 blur-md scale-95"
                  }`}
              />
            </div>

            {/* Bottom Counter */}
            <div className="mt-3 text-center">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-medium text-slate-300 border border-white/10">
                {activeIdx + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )
      : null;

  return (
    <div className="space-y-8">
      {/* Section Sub-heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center space-x-2 px-3 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-goldDark text-xs font-bold uppercase tracking-wider">
          <Camera className="w-3.5 h-3.5" />
          <span>Photo Gallery</span>
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {Math.min(visibleCount, galleryImages.length)} of {galleryImages.length} Photographs
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryImages.slice(0, visibleCount).map((src, index) => (
          <GalleryThumbnail
            key={index}
            src={src}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < galleryImages.length && (
        <div className="text-center pt-4">
          <button
            onClick={() => setVisibleCount((prev) => Math.min(prev + 12, galleryImages.length))}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#0B2240] text-brand-gold hover:bg-[#133560] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Grid className="w-4 h-4" />
            <span>Load More Photos ({galleryImages.length - visibleCount} remaining)</span>
          </button>
        </div>
      )}

      {/* Teleported Lightbox Modal */}
      {lightboxModal}
    </div>
  );
}
