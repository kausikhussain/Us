'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUOTES_DATA, QUOTE_CATEGORIES, QuoteCategory, getRandomQuote, QuoteItem } from '@/content/quotes';
import Image from 'next/image';
import { Heart, Sparkles, Shuffle, Bookmark, Quote } from 'lucide-react';

export const QuoteJourneyScene: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<QuoteCategory>('The Beginning');
  const [randomNote, setRandomNote] = useState<QuoteItem | null>(null);
  const [isDrawingNote, setIsDrawingNote] = useState(false);

  const filteredQuotes = QUOTES_DATA.filter((q) => q.category === activeCategory);

  const handleDrawRandomNote = () => {
    setIsDrawingNote(true);
    setTimeout(() => {
      setRandomNote(getRandomQuote());
      setIsDrawingNote(false);
    }, 450);
  };

  return (
    <section
      id="quotes-journey"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene V · The Quote Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 tracking-[0.05em] leading-tight">
            A Thousand Things I Feel, A Few I Can Put Into Words.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.22em] mt-3">
            Original Words of Devotion, Wonder, and Quiet Love
          </p>
        </div>

        {/* Interactive Random Love Note Generator Pill */}
        <div className="flex flex-col items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDrawRandomNote}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-crimson-600 to-burgundy-900 border border-rosegold-400/40 text-ivory-50 text-xs uppercase tracking-[0.22em] flex items-center space-x-2.5 shadow-crimson-glow transition-all"
          >
            <Shuffle size={14} className={isDrawingNote ? 'animate-spin' : ''} />
            <span>Draw a Random Love Note</span>
          </motion.button>

          {/* Random Note Reveal Modal / Banner */}
          <AnimatePresence>
            {randomNote && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="mt-6 w-full max-w-xl bg-burgundy-900/80 backdrop-blur-xl border border-rosegold-400/50 rounded-2xl p-6 text-center shadow-luxury"
              >
                <div className="flex justify-center mb-2">
                  <Heart size={16} className="text-crimson-600 fill-crimson-600" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-rosegold-300">
                  {randomNote.category}
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-ivory-50 mt-2">
                  &ldquo;{randomNote.text}&rdquo;
                </p>
                <span className="text-xs text-rosegold-400 font-sans tracking-[0.18em] uppercase mt-2 block">
                  — {randomNote.author} {randomNote.context ? `· ${randomNote.context}` : ''}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 14 Category Filter Pills (Scrollable) */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none border-b border-rosegold-400/20 max-w-5xl mx-auto">
          {QUOTE_CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.18em] transition-all flex-shrink-0 whitespace-nowrap border ${
                  isActive
                    ? 'bg-crimson-600/30 border-rosegold-400 text-ivory-50 shadow-crimson-glow'
                    : 'border-rosegold-400/20 text-ivory-50/60 hover:text-ivory-50 hover:border-rosegold-400/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quotes Display Grid for Selected Category */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Photograph-Overlay Feature Quote */}
          <div className="md:col-span-5 relative group">
            <div className="relative h-[480px] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury-lg">
              <Image
                src="/images/our-story/portraits/IMG_20231018_221857.jpg"
                alt="K & N portrait"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-silk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-990 via-wine-950/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-center flex flex-col items-center">
                <Quote size={24} className="text-rosegold-400/70 mb-2" />
                <p className="font-serif italic text-lg sm:text-xl text-ivory-50 leading-relaxed">
                  &ldquo;{filteredQuotes[0]?.text || "Somewhere between ordinary days and unforgettable moments, you became my favourite part of life."}&rdquo;
                </p>
                <span className="text-[10px] uppercase tracking-[0.25em] text-rosegold-300 mt-3 block">
                  K & N · {activeCategory}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Collection Cards (Minimalist & Handwritten Style) */}
          <div className="md:col-span-7 flex flex-col space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {filteredQuotes.map((q, idx) => (
                  <motion.div
                    key={q.id}
                    whileHover={{ y: -3 }}
                    className={`rounded-2xl p-6 sm:p-8 border transition-all shadow-luxury ${
                      idx === 1
                        ? 'bg-[#FFFBF8] text-wine-950 border-rosegold-400/50' // Handwritten stationery style
                        : 'bg-wine-950/80 backdrop-blur-xl border-rosegold-400/25 text-ivory-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] uppercase tracking-[0.25em] ${idx === 1 ? 'text-burgundy-900 font-medium' : 'text-rosegold-300'}`}>
                        {q.context || activeCategory}
                      </span>
                      <Bookmark size={14} className={idx === 1 ? 'text-crimson-600' : 'text-rosegold-400/60'} />
                    </div>

                    <p
                      className={`text-lg sm:text-2xl leading-relaxed ${
                        idx === 1
                          ? 'font-script text-2xl sm:text-3xl font-normal text-wine-950'
                          : 'font-serif italic text-ivory-50/90 font-light'
                      }`}
                    >
                      &ldquo;{q.text}&rdquo;
                    </p>

                    <div className="mt-4 pt-3 border-t border-current/15 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] opacity-75">
                      <span>{q.author}</span>
                      <span>Six Years · One Story</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
