'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SITE_CONFIG } from '@/content/site';
import { Monogram } from './Monogram';
import { KeyRound } from 'lucide-react';

export const PasswordGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlocked, setUnlocked] = useState(!SITE_CONFIG.enablePasscodeGate);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && SITE_CONFIG.enablePasscodeGate) {
      const stored = sessionStorage.getItem('kauseen_unlocked');
      if (stored === 'true') {
        setUnlocked(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === SITE_CONFIG.accessPasscode) {
      setUnlocked(true);
      setError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('kauseen_unlocked', 'true');
      }
    } else {
      setError(true);
    }
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-wine-950 flex flex-col items-center justify-center p-6 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-wine-990/90 border border-rosegold-400/40 rounded-3xl p-8 sm:p-10 shadow-luxury-lg text-center"
      >
        <Monogram size={64} />
        <h2 className="font-serif text-3xl tracking-[0.2em] text-ivory-50 uppercase mt-6">
          K & N
        </h2>
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-rosegold-300 mt-2">
          Six Years · One Story
        </p>

        <p className="font-serif italic text-sm text-ivory-50/70 mt-6">
          Please enter our anniversary date (DDMMYYYY) or your secret passcode to enter our story.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="relative">
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Enter passcode..."
              className="w-full py-3.5 px-5 rounded-full bg-wine-950/80 border border-rosegold-400/30 text-ivory-50 text-center tracking-[0.3em] text-sm focus:outline-none focus:border-rosegold-400 focus:ring-1 focus:ring-rosegold-400"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-xs text-crimson-600 font-sans tracking-wider">
              Incorrect passcode. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-crimson-600 hover:bg-crimson-700 text-ivory-50 text-xs uppercase tracking-[0.25em] transition-all shadow-crimson-glow flex items-center justify-center space-x-2"
          >
            <KeyRound size={15} />
            <span>Unlock Story</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
