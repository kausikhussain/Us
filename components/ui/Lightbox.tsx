'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { GALLERY_COMPOSITIONS, GalleryItem } from '@/content/gallery';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';

export const Lightbox: React.FC = () => {
  const { lightboxOpen, lightboxIndex, closeLightbox, openLightbox } = useAppStore();
  const [zoomed, setZoomed] = useState(false);

  // Flatten all gallery items for continuous lightbox browsing
  const allItems: GalleryItem[] = React.useMemo(() => {
    return GALLERY_COMPOSITIONS.flatMap((comp) => comp.items);
  }, []);

  const currentItem = allItems[lightboxIndex] || allItems[0];

  const handleNext = useCallback(() => {
    setZoomed(false);
    openLightbox((lightboxIndex + 1) % allItems.length);
  }, [lightboxIndex, allItems.length, openLightbox]);

  const handlePrev = useCallback(() => {
    setZoomed(false);
    openLightbox((lightboxIndex - 1 + allItems.length) % allItems.length);
  }, [lightboxIndex, allItems.length, openLightbox]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, handleNext, handlePrev]);

  if (!lightboxOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-wine-990/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery lightbox"
      >
        {/* Top Header Chrome */}
        <div className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-300">
              Memory {lightboxIndex + 1} of {allItems.length}
            </span>
            <span className="font-serif text-lg sm:text-xl text-ivory-50 tracking-[0.08em]">
              {currentItem.title}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setZoomed(!zoomed)}
              className="p-2.5 rounded-full border border-rosegold-400/30 text-ivory-50/80 hover:text-rosegold-300 transition-colors"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full border border-rosegold-400/30 text-ivory-50/80 hover:text-crimson-600 transition-colors"
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Image Stage */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          <div
            className={`relative transition-all duration-500 ease-silk ${
              zoomed
                ? 'w-full h-full scale-125 cursor-zoom-out'
                : 'w-full max-w-4xl h-[65vh] cursor-zoom-in'
            }`}
            onClick={() => setZoomed(!zoomed)}
          >
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Nav Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-2 sm:left-6 p-3 rounded-full bg-wine-950/60 border border-rosegold-400/40 text-ivory-50 hover:bg-burgundy-900 transition-all"
            aria-label="Previous photograph"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-6 p-3 rounded-full bg-wine-950/60 border border-rosegold-400/40 text-ivory-50 hover:bg-burgundy-900 transition-all"
            aria-label="Next photograph"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Bottom Caption & Date */}
        <div className="w-full max-w-3xl mx-auto text-center z-10">
          <p className="font-serif italic text-base sm:text-lg text-ivory-50/90 leading-relaxed">
            &ldquo;{currentItem.caption}&rdquo;
          </p>
          {currentItem.date && (
            <span className="text-xs uppercase tracking-[0.25em] text-rosegold-300 mt-1 block">
              {currentItem.date}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
