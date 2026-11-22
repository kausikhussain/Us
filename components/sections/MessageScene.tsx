'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const MessageScene: React.FC = () => {
  return (
    <section
      id="message-before-journey"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-24 text-center select-none overflow-hidden bg-gradient-to-b from-wine-950/40 via-burgundy-950/60 to-wine-950/80"
    >
      {/* Decorative Subtle Keylines */}
      <div className="absolute top-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-rosegold-400/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-3xl mx-auto flex flex-col items-center"
      >
        <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-rosegold-300/90 mb-8 py-1 px-4 rounded-full border border-rosegold-400/20 bg-burgundy-950/40">
          A Message Before The Journey
        </span>

        {/* Huge Serif Masked Quote */}
        <h2 className="font-serif italic text-2xl sm:text-3xl md:text-5xl text-ivory-50 font-light leading-[1.35] tracking-tight">
          &ldquo;Some people have a way of making the world feel a little softer. You are that person for me.&rdquo;
        </h2>

        <div className="w-16 h-[1px] bg-rosegold-400/40 my-8" />

        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-blush-200/90 font-light">
          Kausik & Nasreen — Six Years of Us
        </p>

        <p className="font-serif italic text-sm text-ivory-50/60 mt-2 font-light">
          23 November 2020 — 23 November 2026
        </p>
      </motion.div>

      <div className="absolute bottom-12 w-24 h-[1px] bg-gradient-to-r from-transparent via-rosegold-400/40 to-transparent" />
    </section>
  );
};
