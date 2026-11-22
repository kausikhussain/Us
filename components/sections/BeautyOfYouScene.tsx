'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPairingsBySection } from '@/content/photo-quote-pairings';
import { useAppStore } from '@/lib/store';

export const BeautyOfYouScene: React.FC = () => {
  const pairings = getPairingsBySection('04-beauty-of-you');
  const { openLightbox } = useAppStore();

  return (
    <section
      id="beauty-of-you"
      className="relative min-h-screen py-28 px-6 sm:px-12 select-none overflow-hidden bg-gradient-to-b from-wine-950/80 via-burgundy-950/70 to-wine-950/80"
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
            Scene IV · Nasreen Portraits
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.0 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 mt-6 tracking-tight font-light"
          >
            The Beauty of You
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.0 }}
            className="font-serif italic text-base sm:text-lg text-blush-200/80 mt-3 font-light"
          >
            Admiring the quiet radiance and effortless grace that guided our six years.
          </motion.p>
        </div>

        {/* Editorial Cathedral Arch Portrait Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {pairings.map((pair, idx) => (
            <motion.div
              key={pair.photoId}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.0, delay: idx * 0.12 }}
              className="group flex flex-col"
            >
              {/* Cathedral Arch Frame */}
              <div
                onClick={() => openLightbox(idx)}
                className="relative w-full aspect-[3/4] rounded-t-[7rem] sm:rounded-t-[8rem] rounded-b-2xl overflow-hidden border border-rosegold-400/30 bg-wine-950/40 shadow-luxury cursor-pointer transform transition-transform duration-700 ease-[0.22,1,0.36,1] group-hover:scale-[1.02]"
                data-cursor="view"
              >
                <Image
                  src={pair.imagePath}
                  alt={pair.caption || 'Nasreen portrait'}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle luxury vignette gradient (safe for faces, anchored to bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-wine-990/70 via-transparent to-transparent pointer-events-none" />

                {/* Expand Pill */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-ivory-50 bg-wine-950/80 px-2.5 py-1 rounded-full border border-rosegold-400/40 backdrop-blur-md">
                    Inspect
                  </span>
                </div>
              </div>

              {/* Quote & Caption Placement strictly BELOW / BESIDE (Never over face) */}
              <div className="mt-5 px-2 flex flex-col">
                <p className="font-serif italic text-base sm:text-lg text-ivory-50 font-light leading-relaxed">
                  &ldquo;{pair.quoteText}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-rosegold-400/20 text-[11px] text-rosegold-300/80 uppercase tracking-widest font-sans">
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
