'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPairingsBySection } from '@/content/photo-quote-pairings';
import { useAppStore } from '@/lib/store';

export const LittleMomentsScene: React.FC = () => {
  const pairings = getPairingsBySection('06-little-moments');
  const { openLightbox } = useAppStore();

  return (
    <section
      id="little-moments"
      className="relative min-h-screen py-28 px-6 sm:px-12 select-none overflow-hidden bg-gradient-to-b from-wine-950/90 via-wine-950/80 to-burgundy-950/70"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-sans uppercase tracking-[0.35em] text-rosegold-300 py-1.5 px-4 rounded-full border border-rosegold-400/20 bg-burgundy-900/30 backdrop-blur-sm"
          >
            Scene VI · Candids & Everyday Life
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.0 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 mt-6 tracking-tight font-light"
          >
            Little Moments, Big Feelings
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.0 }}
            className="font-serif italic text-base sm:text-lg text-blush-200/80 mt-3 font-light"
          >
            The unscripted glances, shared walks, and quiet laughter that built our entire world.
          </motion.p>
        </div>

        {/* Film-Strip & Floating Polaroid Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pairings.map((pair, idx) => (
            <motion.div
              key={pair.photoId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: idx * 0.1 }}
              className="flex flex-col bg-burgundy-950/40 p-4 rounded-2xl border border-rosegold-400/20 shadow-luxury group cursor-pointer hover:border-rosegold-400/40 transition-all"
              onClick={() => openLightbox(idx)}
            >
              {/* Polaroid-Style Image Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-wine-950">
                <Image
                  src={pair.imagePath}
                  alt={pair.caption || 'Candid memory'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Quote & Subtitle */}
              <div className="mt-4 px-1 flex flex-col justify-between flex-1">
                <p className="font-serif italic text-sm sm:text-base text-ivory-50/90 font-light leading-relaxed">
                  &ldquo;{pair.quoteText}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-4 pt-2 border-t border-rosegold-400/10 text-[10px] text-rosegold-300/80 uppercase tracking-widest font-sans">
                  <span>{pair.caption}</span>
                  {pair.date && <span>{pair.date}</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
