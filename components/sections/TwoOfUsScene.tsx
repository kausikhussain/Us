'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getPairingsBySection } from '@/content/photo-quote-pairings';
import { useAppStore } from '@/lib/store';

export const TwoOfUsScene: React.FC = () => {
  const pairings = getPairingsBySection('05-two-of-us');
  const { openLightbox } = useAppStore();

  return (
    <section
      id="the-two-of-us"
      className="relative min-h-screen py-28 px-6 sm:px-12 select-none overflow-hidden bg-gradient-to-b from-wine-950/80 via-burgundy-900/40 to-wine-950/90"
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
            Scene V · Together Across Time
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.0 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 mt-6 tracking-tight font-light"
          >
            The Two of Us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.0 }}
            className="font-serif italic text-base sm:text-lg text-blush-200/80 mt-3 font-light"
          >
            Where two separate journeys quietly converged into one shared story.
          </motion.p>
        </div>

        {/* Asymmetric Editorial Compositions */}
        <div className="flex flex-col space-y-24">
          {/* Pair 1: Featured Asymmetric Duet ( ph-034 Selfie + ph-033 Ice Cream Cones ) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Primary Portrait Card (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1 }}
              className="lg:col-span-7 flex flex-col group cursor-pointer"
              onClick={() => openLightbox(0)}
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-rosegold-400/30 shadow-luxury bg-wine-950">
                <Image
                  src={pairings[0]?.imagePath || ''}
                  alt={pairings[0]?.caption || 'K & N together'}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-990/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-5 px-2">
                <p className="font-serif italic text-xl sm:text-2xl text-ivory-50 font-light leading-relaxed">
                  &ldquo;{pairings[0]?.quoteText}&rdquo;
                </p>
                <span className="text-[11px] font-sans text-rosegold-300 uppercase tracking-widest block mt-2">
                  {pairings[0]?.caption} · {pairings[0]?.date}
                </span>
              </div>
            </motion.div>

            {/* Supporting Offset Card (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col group cursor-pointer lg:mt-16"
              onClick={() => openLightbox(2)}
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-rosegold-400/30 shadow-luxury bg-wine-950">
                <Image
                  src={pairings[2]?.imagePath || ''}
                  alt={pairings[2]?.caption || 'Ice cream date'}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-990/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="mt-4 px-2">
                <p className="font-serif italic text-base sm:text-lg text-ivory-50/90 font-light leading-relaxed">
                  &ldquo;{pairings[2]?.quoteText}&rdquo;
                </p>
                <span className="text-[11px] font-sans text-rosegold-300 uppercase tracking-widest block mt-2">
                  {pairings[2]?.caption} · {pairings[2]?.date}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Pair 2: Ultrawide Cinematic Golden Hour Panorama (ph-048) */}
          {pairings[5] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="flex flex-col group cursor-pointer"
              onClick={() => openLightbox(5)}
            >
              <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury bg-wine-950">
                <Image
                  src={pairings[5].imagePath}
                  alt={pairings[5].caption || 'Golden hour horizon'}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-990/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl">
                  <p className="font-serif italic text-xl sm:text-3xl text-ivory-50 font-light drop-shadow-md">
                    &ldquo;{pairings[5].quoteText}&rdquo;
                  </p>
                  <span className="text-[11px] font-sans text-rosegold-300 uppercase tracking-[0.25em] block mt-2">
                    {pairings[5].caption}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pair 3: Dual Balanced Memories (ph-009 & ph-049) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {[pairings[1], pairings[4]].filter(Boolean).map((pair, idx) => (
              <motion.div
                key={pair.photoId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, delay: idx * 0.2 }}
                className="flex flex-col group cursor-pointer"
                onClick={() => openLightbox(idx === 0 ? 1 : 4)}
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-rosegold-400/30 shadow-luxury bg-wine-950">
                  <Image
                    src={pair.imagePath}
                    alt={pair.caption || 'K & N together'}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-990/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 px-2">
                  <p className="font-serif italic text-base sm:text-lg text-ivory-50 font-light leading-relaxed">
                    &ldquo;{pair.quoteText}&rdquo;
                  </p>
                  <span className="text-[11px] font-sans text-rosegold-300 uppercase tracking-widest block mt-2">
                    {pair.caption} · {pair.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
