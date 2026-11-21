'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_COMPOSITIONS } from '@/content/gallery';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { Eye, Film, Sparkles } from 'lucide-react';

export const GalleryScene: React.FC = () => {
  const { openLightbox } = useAppStore();

  const asymmetricComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'editorial-asymmetric')!;
  const cinematicComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'cinematic-fullbleed')!;
  const portraitComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'vertical-portraits')!;
  const filmstripComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'filmstrip-scroller')!;
  const polaroidComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'polaroid-cluster')!;
  const collagesComp = GALLERY_COMPOSITIONS.find((c) => c.id === 'story-collages')!;

  return (
    <section
      id="gallery"
      className="relative py-28 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-28 sm:space-y-36">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene IV · Curated Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 tracking-[0.05em]">
            The Memory Gallery
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.22em] mt-3">
            Six Curated Chapters in Shared Light & Devotion
          </p>
        </div>

        {/* COMPOSITION 1: Asymmetric Editorial Collage */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-rosegold-300">
            <span className="text-xs uppercase tracking-[0.25em]">Chapter I</span>
            <span className="h-[1px] w-12 bg-rosegold-400/30" />
            <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{asymmetricComp.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Large Lead Editorial Frame */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openLightbox(0)}
              className="md:col-span-7 relative h-[420px] sm:h-[540px] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury-lg cursor-pointer group"
              data-cursor="view"
            >
              <Image
                src={asymmetricComp.items[0].src}
                alt={asymmetricComp.items[0].alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-silk"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-rosegold-300">
                  {asymmetricComp.items[0].date}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-ivory-50 mt-1">
                  {asymmetricComp.items[0].title}
                </h4>
                <p className="text-xs text-ivory-50/80 italic mt-1 font-serif">
                  {asymmetricComp.items[0].caption}
                </p>
              </div>
            </motion.div>

            {/* Stacked Right Editorial Frames */}
            <div className="md:col-span-5 flex flex-col space-y-6">
              {asymmetricComp.items.slice(1).map((item, idx) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => openLightbox(idx + 1)}
                  className="relative h-[240px] sm:h-[255px] rounded-2xl overflow-hidden border border-rosegold-400/30 shadow-luxury cursor-pointer group"
                  data-cursor="view"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="font-serif text-lg text-ivory-50">{item.title}</h4>
                    <p className="text-xs text-ivory-50/70 italic font-serif">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPOSITION 2: Full-Bleed Cinematic Frame */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-rosegold-300">
            <span className="text-xs uppercase tracking-[0.25em]">Chapter II</span>
            <span className="h-[1px] w-12 bg-rosegold-400/30" />
            <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{cinematicComp.title}</h3>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => openLightbox(3)}
            className="relative w-full h-[360px] sm:h-[500px] rounded-3xl overflow-hidden border border-rosegold-400/50 shadow-luxury-lg cursor-pointer group"
            data-cursor="view"
          >
            <Image
              src={cinematicComp.items[0].src}
              alt={cinematicComp.items[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-silk"
            />
            <div className="absolute inset-0 bg-radial-vignette opacity-70 group-hover:opacity-90 transition-opacity" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300">
                {cinematicComp.items[0].date}
              </span>
              <h4 className="font-serif text-2xl sm:text-4xl text-ivory-50 mt-2">
                {cinematicComp.items[0].title}
              </h4>
              <p className="font-serif italic text-sm sm:text-base text-blush-200 mt-2">
                &ldquo;{cinematicComp.items[0].caption}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* COMPOSITION 3: Vertical Portrait Stories in Arches */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-rosegold-300">
            <span className="text-xs uppercase tracking-[0.25em]">Chapter III</span>
            <span className="h-[1px] w-12 bg-rosegold-400/30" />
            <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{portraitComp.title}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {portraitComp.items.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(4 + idx)}
                className="relative h-[480px] sm:h-[560px] rounded-t-[140px] rounded-b-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury-lg cursor-pointer group"
                data-cursor="view"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wine-950/85 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <h4 className="font-serif text-2xl text-ivory-50">{item.title}</h4>
                  <p className="text-xs text-ivory-50/75 italic mt-1 font-serif">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* COMPOSITION 4: 35mm Vintage Film Strip */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-rosegold-300">
            <Film size={18} />
            <span className="text-xs uppercase tracking-[0.25em]">Chapter IV</span>
            <span className="h-[1px] w-12 bg-rosegold-400/30" />
            <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{filmstripComp.title}</h3>
          </div>

          {/* Film Strip Frame with Perforations */}
          <div className="relative bg-wine-990 border-y-4 border-black p-4 sm:p-6 shadow-luxury overflow-x-auto scrollbar-none">
            <div className="flex space-x-3 mb-4 opacity-50">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="w-3.5 h-2.5 rounded-sm bg-white/20 flex-shrink-0" />
              ))}
            </div>

            <div className="flex space-x-6 min-w-max pb-2">
              {filmstripComp.items.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => openLightbox(6 + idx)}
                  className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-lg overflow-hidden border border-white/20 cursor-pointer group flex-shrink-0"
                  data-cursor="view"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-wine-950/30 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-2 left-3 right-3 text-left">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-rosegold-300 bg-black/60 px-1.5 py-0.5 rounded">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3 mt-4 opacity-50">
              {Array.from({ length: 28 }).map((_, i) => (
                <div key={i} className="w-3.5 h-2.5 rounded-sm bg-white/20 flex-shrink-0" />
              ))}
            </div>
          </div>
        </div>

        {/* COMPOSITION 5: Floating Polaroid Cluster */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 text-rosegold-300">
            <span className="text-xs uppercase tracking-[0.25em]">Chapter V</span>
            <span className="h-[1px] w-12 bg-rosegold-400/30" />
            <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{polaroidComp.title}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
            {polaroidComp.items.map((item, idx) => {
              const rotations = ['-rotate-2', 'rotate-1', 'rotate-3'];
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -8, rotate: 0, scale: 1.03 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => openLightbox(10 + idx)}
                  className={`bg-[#FAF5F0] p-4 pb-8 rounded-sm shadow-luxury-lg cursor-pointer transform ${rotations[idx % 3]} group`}
                  data-cursor="view"
                >
                  <div className="relative w-full h-64 sm:h-72 bg-neutral-900 rounded-sm overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="font-script text-2xl text-wine-950 font-normal leading-tight">
                      {item.title}
                    </p>
                    <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase block mt-1">
                      {item.date}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* COMPOSITION 6: Romantic Story Collages */}
        {collagesComp && (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-rosegold-300">
              <Sparkles size={18} />
              <span className="text-xs uppercase tracking-[0.25em]">Chapter VI</span>
              <span className="h-[1px] w-12 bg-rosegold-400/30" />
              <h3 className="font-serif text-xl sm:text-2xl text-ivory-50">{collagesComp.title}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
              {collagesComp.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                  onClick={() => openLightbox(13 + idx)}
                  className="relative h-[440px] sm:h-[500px] rounded-3xl overflow-hidden border border-rosegold-400/40 shadow-luxury-lg cursor-pointer group"
                  data-cursor="view"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-990/90 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h4 className="font-serif text-xl text-ivory-50">{item.title}</h4>
                    <p className="text-xs text-ivory-50/80 italic mt-1 font-serif">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
