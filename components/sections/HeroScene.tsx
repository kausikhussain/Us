'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrandWordmark } from '@/components/ui/BrandWordmark';
import { ArrowDown, Sparkles } from 'lucide-react';

export const HeroScene: React.FC = () => {
  const scrollToInfinity = () => {
    const el = document.getElementById('infinity');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('timeline');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between px-6 py-28 text-center select-none overflow-hidden"
    >
      {/* Top Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="z-10 mt-6"
      >
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-rosegold-300 py-1.5 px-4 rounded-full border border-rosegold-400/30 bg-wine-950/40 backdrop-blur-sm">
          A Personal Digital Love Story
        </span>
      </motion.div>

      {/* Central Hero Composition */}
      <div className="z-10 my-auto flex flex-col items-center max-w-4xl mx-auto relative">
        {/* Soft atmospheric backlight halo */}
        <div className="absolute inset-0 m-auto w-80 sm:w-96 h-48 bg-wine-950/70 rounded-full blur-[60px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <BrandWordmark size="hero" showSubtitle={false} animated />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-blush-200 mt-6 max-w-2xl font-light leading-relaxed"
        >
          23 November 2020 — Forever
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="mt-3"
        >
          <h2 className="font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-ivory-50/80">
            Six Years. One Story. A Thousand Feelings.
          </h2>
        </motion.div>

        {/* Featured Editorial Quote in Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.1 }}
          className="mt-6 max-w-2xl px-6 py-4 rounded-2xl bg-burgundy-900/30 border border-rosegold-400/20 backdrop-blur-sm"
        >
          <p className="font-serif italic text-base sm:text-lg text-ivory-50/90 font-light leading-relaxed">
            &ldquo;Six Years. Countless Little Moments. One Person Who Makes Them All Special.&rdquo;
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          <button
            onClick={scrollToInfinity}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-crimson-600 to-burgundy-900 text-ivory-50 text-xs uppercase tracking-[0.25em] border border-rosegold-400/40 shadow-crimson-glow hover:scale-105 active:scale-95 transition-all group"
            data-cursor="play"
          >
            <span>Enter Our Little World</span>
          </button>

          <button
            onClick={scrollToTimeline}
            className="px-6 py-3.5 rounded-full bg-wine-950/60 backdrop-blur-md text-ivory-50/80 text-xs uppercase tracking-[0.22em] border border-rosegold-400/20 hover:text-rosegold-300 hover:border-rosegold-400/50 transition-all"
          >
            Explore Our Story
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="z-10 flex flex-col items-center cursor-pointer group"
        onClick={scrollToInfinity}
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-rosegold-300/80 group-hover:text-rosegold-300 transition-colors mb-2">
          Scroll to discover
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-1 rounded-full border border-rosegold-400/30 text-rosegold-400"
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};
