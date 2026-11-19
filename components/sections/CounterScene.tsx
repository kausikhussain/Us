'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNowInIST, getCounterState, RelationshipDuration, CounterMode } from '@/lib/time';
import { QUOTES_DATA } from '@/content/quotes';
import { useAppStore } from '@/lib/store';
import { Clock, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const CounterScene: React.FC = () => {
  const { timeTravelMode, setTimeTravelMode } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date>(() => new Date("2026-11-23T00:00:00+05:30"));
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
    setNow(getNowInIST(timeTravelMode));
    const timer = setInterval(() => {
      setNow(getNowInIST(timeTravelMode));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeTravelMode]);

  const { mode, elapsedFromStart, countdownToAnniversary } = getCounterState(now);

  // Auto-advance quotes every 6 seconds
  useEffect(() => {
    const qTimer = setInterval(() => {
      setActiveQuoteIndex((prev) => (prev + 1) % QUOTES_DATA.length);
    }, 6000);
    return () => clearInterval(qTimer);
  }, []);

  const activeQuote = QUOTES_DATA[activeQuoteIndex];

  // Pick which duration to display based on mode
  const displayDuration = mode === 'before' ? countdownToAnniversary : elapsedFromStart;

  const timeUnits = [
    { label: 'Years', value: displayDuration.years },
    { label: 'Months', value: displayDuration.months },
    { label: 'Days', value: displayDuration.days },
    { label: 'Hours', value: displayDuration.hours },
    { label: 'Minutes', value: displayDuration.minutes },
    { label: 'Seconds', value: displayDuration.seconds },
  ];

  return (
    <section
      id="counter"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto space-y-24">
        {/* COUNTER CONTAINER */}
        <div className="text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene VIII · The Measure of Devotion
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 tracking-[0.05em]">
            {mode === 'before'
              ? 'Countdown to Our Sixth Anniversary'
              : mode === 'anniversary'
              ? 'Today We Celebrate Six Beautiful Years'
              : 'Our Journey Together — Every Second Counted'}
          </h2>

          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.2em] mt-3">
            {mode === 'before'
              ? '23 November 2026 · Asia/Kolkata Timezone'
              : 'Started 23 November 2020 · Living Forever'}
          </p>

          {/* Time Display Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mt-12">
            {timeUnits.map((unit) => (
              <motion.div
                key={unit.label}
                whileHover={{ y: -4 }}
                className="bg-wine-950/80 backdrop-blur-xl border border-rosegold-400/30 rounded-2xl p-6 shadow-luxury flex flex-col items-center justify-center"
              >
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-ivory-50 via-blush-200 to-rosegold-300 font-light">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-rosegold-300 mt-2">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Total Days Ribbon */}
          <div className="mt-8 flex items-center justify-center space-x-3 text-xs uppercase tracking-[0.22em] text-ivory-50/70">
            <Clock size={14} className="text-rosegold-400" />
            <span>Over {elapsedFromStart.totalDays} Days of Growing Together</span>
          </div>

          {/* Dev-Only Time-Travel Switcher for Testing Verification */}
          <div className="mt-8 p-3 rounded-xl bg-burgundy-900/30 border border-rosegold-400/20 inline-flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.18em]">
            <span className="text-rosegold-300 mr-2">Testing State:</span>
            {(['before', 'anniversary', 'after', null] as const).map((m) => (
              <button
                key={m || 'real'}
                onClick={() => setTimeTravelMode(m)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  timeTravelMode === m
                    ? 'bg-crimson-600 border-rosegold-400 text-ivory-50'
                    : 'border-rosegold-400/20 text-ivory-50/60 hover:text-ivory-50'
                }`}
              >
                {m ? m : 'Real-Time'}
              </button>
            ))}
          </div>
        </div>

        {/* QUOTES CAROUSEL */}
        <div className="max-w-3xl mx-auto text-center border-t border-rosegold-400/20 pt-16">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-4 block">
            Little Things That Mean Everything
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeQuote.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-ivory-50 leading-relaxed font-light">
                &ldquo;{activeQuote.text}&rdquo;
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.25em] text-rosegold-300">
                <span>{activeQuote.author}</span>
                {activeQuote.context && (
                  <>
                    <span className="text-rosegold-400/40">·</span>
                    <span>{activeQuote.context}</span>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Manual Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() =>
                setActiveQuoteIndex(
                  (activeQuoteIndex - 1 + QUOTES_DATA.length) % QUOTES_DATA.length
                )
              }
              className="p-2 rounded-full border border-rosegold-400/30 text-ivory-50/70 hover:text-rosegold-300 transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex space-x-2">
              {QUOTES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveQuoteIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeQuoteIndex === idx
                      ? 'w-6 bg-crimson-600'
                      : 'bg-rosegold-400/30 hover:bg-rosegold-400/60'
                  }`}
                  aria-label={`Jump to quote ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActiveQuoteIndex((activeQuoteIndex + 1) % QUOTES_DATA.length)
              }
              className="p-2 rounded-full border border-rosegold-400/30 text-ivory-50/70 hover:text-rosegold-300 transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
