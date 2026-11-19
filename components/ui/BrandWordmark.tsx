'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  animated?: boolean;
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  animated = false,
}) => {
  const sizeClasses = {
    sm: 'text-2xl tracking-[0.25em]',
    md: 'text-4xl md:text-5xl tracking-[0.28em]',
    lg: 'text-5xl md:text-7xl tracking-[0.3em]',
    hero: 'text-6xl sm:text-7xl md:text-9xl tracking-[0.32em]',
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Editorial Luxury Wordmark SVG */}
      <div className="relative group">
        <h1
          className={`font-serif font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-ivory-50 via-blush-200 to-ivory-50 ${sizeClasses[size]} drop-shadow-[0_4px_24px_rgba(184,50,80,0.25)]`}
          style={{ fontVariantLigatures: 'common-ligatures' }}
        >
          KAUSEEN
        </h1>

        {/* Delicate Rose-Gold Hairline Rule with central diamond */}
        <div className="relative w-full flex items-center justify-center mt-2.5">
          {animated ? (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="w-full flex items-center justify-center"
            >
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
              <div className="mx-2 w-1.5 h-1.5 rotate-45 border border-rosegold-400 bg-burgundy-900 flex-shrink-0" />
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
            </motion.div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
              <div className="mx-2 w-1.5 h-1.5 rotate-45 border border-rosegold-400 bg-burgundy-900 flex-shrink-0" />
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {showSubtitle && (
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.25em] text-rosegold-300 uppercase mt-2.5 opacity-90">
          23 November 2020 — Forever
        </span>
      )}
    </div>
  );
};
