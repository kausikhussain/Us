'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SURPRISE_DATA } from '@/content/surprise';
import { useAppStore } from '@/lib/store';
import { Gift, Sparkles, Heart, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

export const SurpriseScene: React.FC = () => {
  const { isSurpriseUnlocked, setIsSurpriseUnlocked } = useAppStore();
  const [holdingProgress, setHoldingProgress] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerUnlock = () => {
    setIsSurpriseUnlocked(true);
    // Haptic vibration
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([40, 60, 80]);
    }
    // Rose petal celebratory confetti
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#B83250', '#E8BBC7', '#C99A83', '#FFF9F6'],
    });
  };

  const startHold = () => {
    if (isSurpriseUnlocked) return;
    let p = 0;
    holdIntervalRef.current = setInterval(() => {
      p += 10;
      setHoldingProgress(p);
      if (p >= 100) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        triggerUnlock();
      }
    }, 120);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if (!isSurpriseUnlocked) {
      setHoldingProgress(0);
    }
  };

  const handleReset = () => {
    setIsSurpriseUnlocked(false);
    setHoldingProgress(0);
  };

  return (
    <section
      id="surprise"
      className="relative min-h-[90vh] py-24 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene XI · Intimate Secret
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 tracking-[0.05em]">
            {SURPRISE_DATA.title}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.2em] mt-3">
            {SURPRISE_DATA.subtitle}
          </p>
        </div>

        {/* Gift Interaction Dais */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isSurpriseUnlocked ? (
              /* SEALED GIFT BOX */
              <motion.div
                key="sealed-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center"
              >
                {/* Hold to Unlock Circular Stage */}
                <div
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center cursor-pointer group"
                  data-cursor="unlock"
                >
                  {/* SVG Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="46%"
                      stroke="rgba(201, 154, 131, 0.2)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r="46%"
                      stroke="#B83250"
                      strokeWidth="3.5"
                      fill="none"
                      strokeDasharray="290"
                      strokeDashoffset={290 - (290 * holdingProgress) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-100"
                    />
                  </svg>

                  {/* Sealed Box Icon Interior */}
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-br from-burgundy-900 to-wine-950 border border-rosegold-400/50 shadow-luxury-lg flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                    <Gift size={42} className="text-rosegold-300 drop-shadow-rosegold" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ivory-50/80 mt-2">
                      {holdingProgress > 0 ? `${holdingProgress}%` : 'Hold to Open'}
                    </span>
                  </div>
                </div>

                <p className="text-xs uppercase tracking-[0.25em] text-rosegold-300 mt-6 text-center">
                  {SURPRISE_DATA.instruction}
                </p>

                {/* Accessible direct click unlock */}
                <button
                  onClick={triggerUnlock}
                  className="mt-4 px-6 py-2 rounded-full border border-rosegold-400/30 text-[10px] uppercase tracking-[0.2em] text-ivory-50/60 hover:text-ivory-50 hover:border-rosegold-400/60 transition-colors"
                >
                  Quick Unlock Alternative
                </button>
              </motion.div>
            ) : (
              /* UNLOCKED SECRET CARD & PHOTOGRAPH */
              <motion.div
                key="unlocked-content"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-gradient-to-b from-burgundy-900/90 to-wine-950/95 border border-rosegold-400/50 rounded-3xl p-8 sm:p-14 shadow-luxury-lg text-center relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rosegold-400 via-crimson-600 to-rosegold-400" />

                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-crimson-600/30 border border-rosegold-400 text-rosegold-300">
                    <Sparkles size={24} />
                  </div>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50">
                  {SURPRISE_DATA.unlockedTitle}
                </h3>

                <p className="font-serif italic text-lg sm:text-2xl text-blush-200 mt-6 max-w-2xl mx-auto leading-relaxed">
                  &ldquo;{SURPRISE_DATA.secretMessage}&rdquo;
                </p>

                {/* Treasured Revealed Photograph */}
                <div className="relative w-full max-w-md h-64 sm:h-80 mx-auto my-8 rounded-2xl overflow-hidden border border-rosegold-400/60 shadow-luxury">
                  <Image
                    src={SURPRISE_DATA.photo.src}
                    alt={SURPRISE_DATA.photo.alt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-serif italic text-sm text-ivory-50">
                      {SURPRISE_DATA.photo.caption}
                    </p>
                  </div>
                </div>

                {/* Re-lock button */}
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2.5 rounded-full border border-rosegold-400/30 text-xs uppercase tracking-[0.2em] text-ivory-50/70 hover:text-ivory-50 hover:border-rosegold-400 flex items-center space-x-2 mx-auto transition-colors"
                >
                  <RefreshCw size={13} />
                  <span>Reseal Secret Gift</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
