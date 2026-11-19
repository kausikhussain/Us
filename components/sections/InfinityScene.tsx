'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Monogram } from '@/components/ui/Monogram';

export const InfinityScene: React.FC = () => {
  return (
    <section
      id="infinity"
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-24 text-center select-none overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />

      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-4 block"
        >
          Scene II · The Convergence
        </motion.span>

        {/* Editorial Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 tracking-[0.05em] leading-tight"
        >
          Where Two Paths Converged Into Forever
        </motion.h2>

        {/* Visual Infinity Nexus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay: 0.2 }}
          className="relative my-12 flex items-center justify-center"
        >
          {/* Subtle Ambient Halo */}
          <div className="absolute w-64 h-64 bg-crimson-600/15 rounded-full blur-[80px] pointer-events-none" />

          {/* Infinity SVG Ornament */}
          <div className="relative w-72 sm:w-96 h-36 flex items-center justify-center">
            <svg
              viewBox="0 0 300 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-rosegold"
            >
              <path
                d="M 150,70 C 190,10 280,10 280,70 C 280,130 190,130 150,70 C 110,10 20,10 20,70 C 20,130 110,130 150,70 Z"
                stroke="url(#infinity-stroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="opacity-90"
              />
              <defs>
                <linearGradient id="infinity-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E8BBC7" />
                  <stop offset="50%" stopColor="#C99A83" />
                  <stop offset="100%" stopColor="#B83250" />
                </linearGradient>
              </defs>
            </svg>

            {/* Center Monogram Emblem */}
            <div className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center bg-wine-950/80 rounded-full border border-rosegold-400/50 shadow-luxury">
              <Monogram size={42} />
            </div>
          </div>
        </motion.div>

        {/* Narrative Prose */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="font-serif italic text-lg sm:text-2xl text-ivory-50/85 max-w-2xl leading-relaxed"
        >
          &ldquo;Two separate lives, two individual stories, drawn together by quiet destiny into an unbreakable infinity.&rdquo;
        </motion.p>

        {/* Details line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="mt-6 flex items-center space-x-4 text-xs uppercase tracking-[0.22em] text-rosegold-300/80"
        >
          <span>Kausik</span>
          <span className="w-1.5 h-1.5 rotate-45 bg-crimson-600" />
          <span>Parveen</span>
          <span className="w-1.5 h-1.5 rotate-45 bg-crimson-600" />
          <span>KAUSEEN</span>
        </motion.div>
      </div>
    </section>
  );
};
