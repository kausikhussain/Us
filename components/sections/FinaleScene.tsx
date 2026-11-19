'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrandWordmark } from '@/components/ui/BrandWordmark';
import { Monogram } from '@/components/ui/Monogram';
import { RotateCcw, Heart, Shield } from 'lucide-react';

export const FinaleScene: React.FC = () => {
  const replayStory = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="finale"
      className="relative min-h-screen py-32 sm:py-44 px-6 sm:px-12 flex flex-col justify-between items-center text-center select-none overflow-hidden bg-gradient-to-b from-transparent via-burgundy-900/60 to-wine-990"
    >
      {/* Background Candlelight & Deep Wine Glow */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Flourish */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 py-1.5 px-4 rounded-full border border-rosegold-400/30 bg-wine-950/60 backdrop-blur-sm">
          The Grand Reveal · Six Years & Beyond
        </span>
      </motion.div>

      {/* Central Finale Composition */}
      <div className="z-20 my-auto max-w-4xl mx-auto flex flex-col items-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <BrandWordmark size="hero" showSubtitle={false} animated />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="space-y-3 mt-8"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-light tracking-[0.05em]">
            Six Years.
          </h2>
          <h3 className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blush-200 via-rosegold-300 to-blush-200 font-light">
            Still My Favourite Story.
          </h3>
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-rosegold-300 mt-4">
            23 November 2020 — Forever
          </p>
        </motion.div>

        {/* Concluding Devotional Note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="font-serif italic text-base sm:text-xl text-ivory-50/80 max-w-2xl mt-8 leading-relaxed font-light"
        >
          &ldquo;Thank you for every laughter-filled day, every quiet holding of hands, and every promise kept. Here is to our six years, and to the thousands of memories waiting for us ahead.&rdquo;
        </motion.p>

        {/* Replay Story Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-12"
        >
          <button
            onClick={replayStory}
            className="px-8 py-3.5 rounded-full bg-wine-950/80 hover:bg-burgundy-900 border border-rosegold-400/50 text-ivory-50 text-xs uppercase tracking-[0.25em] flex items-center space-x-3 transition-all shadow-luxury hover:scale-105 active:scale-95"
            data-cursor="play"
          >
            <RotateCcw size={15} />
            <span>Replay Our Story</span>
          </button>
        </motion.div>
      </div>

      {/* Footer Branding & Dev/Personalization Notice */}
      <footer className="z-10 w-full max-w-5xl mx-auto pt-16 border-t border-rosegold-400/20 flex flex-col sm:flex-row items-center justify-between text-xs text-ivory-50/50">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <Monogram size={32} />
          <div className="flex flex-col text-left">
            <span className="font-serif text-sm tracking-[0.2em] text-ivory-50 uppercase">
              KAUSEEN
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-rosegold-300">
              Private Anniversary Keepsake
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-rosegold-400/80">
          <Shield size={12} />
          <span>Strictly Private · Noindex · Encrypted</span>
        </div>
      </footer>
    </section>
  );
};
