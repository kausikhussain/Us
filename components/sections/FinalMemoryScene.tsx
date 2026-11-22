'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPairingsBySection } from '@/content/photo-quote-pairings';

export const FinalMemoryScene: React.FC = () => {
  const pairing = getPairingsBySection('12-final-memory')[0];

  if (!pairing) return null;

  return (
    <section
      id="final-memory"
      className="relative min-h-[90vh] flex flex-col items-center justify-center py-28 px-6 sm:px-12 select-none overflow-hidden bg-gradient-to-b from-wine-950 via-burgundy-950/90 to-wine-950"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[11px] font-sans uppercase tracking-[0.35em] text-rosegold-300 py-1.5 px-4 rounded-full border border-rosegold-400/20 bg-burgundy-900/30 backdrop-blur-sm mb-12"
        >
          Scene XII · The Final Memory
        </motion.span>

        {/* Master Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury bg-wine-950"
        >
          <Image
            src={pairing.imagePath}
            alt={pairing.caption || 'Master portrait of Nasreen'}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wine-990/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Closing Signature Quote */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.1 }}
          className="max-w-3xl mt-12"
        >
          <p className="font-serif italic text-2xl sm:text-4xl text-ivory-50 font-light leading-relaxed">
            &ldquo;{pairing.quoteText}&rdquo;
          </p>

          <div className="w-16 h-[1px] bg-rosegold-400/40 my-6 mx-auto" />

          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-rosegold-300">
            {pairing.caption}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
