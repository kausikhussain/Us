'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from './Monogram';

export const InitialLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleSkip = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-wine-950 flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Central Monogram K & N */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Monogram size={72} />

            <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.3em] uppercase text-ivory-50 mt-6">
              K & N
            </h1>
            <span className="text-[10px] tracking-[0.25em] text-rosegold-300 uppercase mt-2">
              Six Years · One Story · A Thousand Feelings
            </span>

            {/* Fine Progress Line */}
            <div className="w-48 h-[1px] bg-rosegold-400/20 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-rosegold-400 to-blush-200"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            <button
              onClick={handleSkip}
              className="mt-6 text-[10px] uppercase tracking-[0.22em] text-ivory-50/50 hover:text-rosegold-300 transition-colors"
            >
              Skip Intro
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
