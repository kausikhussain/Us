'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  animated?: boolean;
  variant?: 'ampersand' | 'cross';
}

export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  animated = false,
  variant = 'ampersand',
}) => {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl tracking-[0.25em]',
    md: 'text-4xl sm:text-5xl md:text-6xl tracking-[0.28em]',
    lg: 'text-6xl sm:text-7xl md:text-8xl tracking-[0.3em]',
    hero: 'text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-[0.32em]',
  };

  const textLabel = variant === 'cross' ? 'K × N' : 'K & N';

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Editorial Luxury Wordmark */}
      <div className="relative group">
        <h1
          className={`font-serif font-light uppercase text-transparent bg-clip-text bg-gradient-to-r from-ivory-50 via-blush-200 to-ivory-50 ${sizeClasses[size]} drop-shadow-[0_4px_28px_rgba(184,50,80,0.3)]`}
          style={{ fontVariantLigatures: 'common-ligatures' }}
        >
          {textLabel}
        </h1>

        {/* Delicate Rose-Gold Hairline Rule with central diamond */}
        <div className="relative w-full flex items-center justify-center mt-2 sm:mt-3">
          {animated ? (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="w-full flex items-center justify-center"
            >
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
              <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-rosegold-400 bg-burgundy-900 flex-shrink-0" />
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
            </motion.div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
              <div className="mx-3 w-1.5 h-1.5 rotate-45 border border-rosegold-400 bg-burgundy-900 flex-shrink-0" />
              <div className="h-[0.75px] w-full bg-gradient-to-r from-transparent via-rosegold-400 to-transparent" />
            </div>
          )}
        </div>
      </div>

      {showSubtitle && (
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.28em] text-rosegold-300 uppercase mt-3 opacity-90">
          23 November 2020 — Forever
        </span>
      )}
    </div>
  );
};
