'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_DATA, TimelineMilestone } from '@/content/timeline';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';

export const TimelineScene: React.FC = () => {
  const { selectedYear, setSelectedYear, openLightbox } = useAppStore();

  const activeMilestone =
    TIMELINE_DATA.find((m) => m.year === selectedYear) || TIMELINE_DATA[0];
  const currentIndex = TIMELINE_DATA.findIndex((m) => m.year === selectedYear);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % TIMELINE_DATA.length;
    setSelectedYear(TIMELINE_DATA[nextIdx].year);
  }, [currentIndex, setSelectedYear]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length;
    setSelectedYear(TIMELINE_DATA[prevIdx].year);
  }, [currentIndex, setSelectedYear]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if timeline is visible in viewport before capturing arrows
      const el = document.getElementById('timeline');
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      id="timeline"
      className="relative min-h-screen py-24 sm:py-32 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene III · Six Years of Devotion
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 tracking-[0.05em]">
            Six Years, Countless Memories
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.22em] mt-3">
            23 November 2020 through 23 November 2026
          </p>
        </div>

        {/* Timeline Spine: Giant Outlined Year Numerals */}
        <div className="flex items-center justify-between sm:justify-center sm:space-x-8 md:space-x-12 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-rosegold-400/20">
          {TIMELINE_DATA.map((milestone) => {
            const isActive = milestone.year === selectedYear;
            return (
              <button
                key={milestone.year}
                onClick={() => setSelectedYear(milestone.year)}
                className={`relative group px-3 py-2 flex flex-col items-center transition-all ${
                  isActive ? 'scale-110' : 'opacity-40 hover:opacity-80'
                }`}
                aria-label={`View milestone for year ${milestone.year}`}
              >
                <span
                  className={`font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.08em] transition-colors ${
                    isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-ivory-50 to-rosegold-300 font-normal drop-shadow-crimson-glow'
                      : 'text-ivory-50/40 font-light'
                  }`}
                >
                  {milestone.year}
                </span>
                <span
                  className={`text-[9px] uppercase tracking-[0.2em] mt-1 transition-colors ${
                    isActive ? 'text-crimson-600 font-medium' : 'text-transparent'
                  }`}
                >
                  {milestone.highlightBadge}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.div
                    layoutId="timelineActiveUnderline"
                    className="absolute -bottom-[1px] w-full h-[2px] bg-gradient-to-r from-rosegold-400 via-crimson-600 to-rosegold-400"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Milestone Stage (Editorial Layout) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone.year}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
          >
            {/* Left Column: Photograph with Architectural Frame */}
            <div className="lg:col-span-6 relative group">
              <div
                onClick={() => openLightbox(0)}
                className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury-lg cursor-pointer"
                data-cursor="view"
              >
                <Image
                  src={activeMilestone.photos[0]?.src || '/photos/inspiration/scrapbook-our-story.jpg'}
                  alt={activeMilestone.photos[0]?.alt || 'Milestone photo'}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-silk"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />

                {/* Caption Badge */}
                {activeMilestone.photos[0]?.caption && (
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-serif italic text-sm sm:text-base text-ivory-50 drop-shadow-md">
                      &ldquo;{activeMilestone.photos[0].caption}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Narrative Story & Quote */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center space-x-3 text-rosegold-300">
                <Calendar size={16} />
                <span className="text-xs uppercase tracking-[0.25em] font-sans">
                  {activeMilestone.dateString}
                </span>
                <span className="text-rosegold-400/40">|</span>
                <span className="text-xs uppercase tracking-[0.2em] text-crimson-600 font-medium">
                  {activeMilestone.highlightBadge}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory-50 tracking-[0.05em] leading-snug">
                {activeMilestone.heading}
              </h3>

              <p className="font-sans text-sm sm:text-base text-ivory-50/80 leading-relaxed font-light">
                {activeMilestone.summary}
              </p>

              {/* Quote Card */}
              <div className="p-6 rounded-2xl bg-burgundy-900/40 border border-rosegold-400/25 backdrop-blur-md relative">
                <span className="font-serif text-3xl text-rosegold-400/40 absolute top-2 left-4">
                  &ldquo;
                </span>
                <p className="font-serif italic text-base sm:text-lg text-blush-200 pl-4">
                  {activeMilestone.quote}
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-rosegold-400/20">
                <button
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-full border border-rosegold-400/30 text-xs uppercase tracking-[0.2em] text-ivory-50 hover:bg-wine-950 flex items-center space-x-2 transition-all"
                  aria-label="Previous year milestone"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-300">
                  {currentIndex + 1} of {TIMELINE_DATA.length}
                </span>

                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-full border border-rosegold-400/30 text-xs uppercase tracking-[0.2em] text-ivory-50 hover:bg-wine-950 flex items-center space-x-2 transition-all"
                  aria-label="Next year milestone"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
