'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from './Monogram';
import { Heart, Sparkles, KeyRound, Lock, ArrowRight } from 'lucide-react';

interface AnniversaryGateProps {
  children: React.ReactNode;
  initialAuthenticated?: boolean;
}

export const AnniversaryGate: React.FC<AnniversaryGateProps> = ({
  children,
  initialAuthenticated = false,
}) => {
  const [unlocked, setUnlocked] = useState(initialAuthenticated);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessRevealing, setIsSuccessRevealing] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(initialAuthenticated);

  // Check server session on mount if initial wasn't authenticated
  useEffect(() => {
    if (!initialAuthenticated) {
      fetch('/api/auth/session')
        .then((res) => res.json())
        .then((data) => {
          if (data?.authenticated) {
            setUnlocked(true);
          }
        })
        .catch(() => {})
        .finally(() => {
          setHasCheckedSession(true);
        });
    }
  }, [initialAuthenticated]);

  // Listen for lock event from Navigation or Finale Scene
  useEffect(() => {
    const handleLock = () => {
      setUnlocked(false);
      setIsSuccessRevealing(false);
      setPasscode('');
      setErrorMsg('');
    };

    window.addEventListener('kn:lock', handleLock);
    return () => window.removeEventListener('kn:lock', handleLock);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: passcode }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Smooth luxury welcome transition
        setIsSuccessRevealing(true);
        setTimeout(() => {
          setUnlocked(true);
          setIsSuccessRevealing(false);
        }, 1800);
      } else {
        setErrorMsg(data.error || "That isn't our special date. Try once more.");
      }
    } catch {
      setErrorMsg("That isn't our special date. Try once more.");
    } finally {
      setIsLoading(false);
    }
  };

  // If already unlocked and not showing reveal transition, display the full website
  if (unlocked && !isSuccessRevealing) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-wine-950 flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden">
      {/* Ambient Candlelight and Deep Wine Backdrop Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-burgundy-900/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-crimson-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rosegold-400/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Floating Rose Petal Particle Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: '15%', y: '18%', scale: 0.8, delay: 0, duration: 9 },
          { x: '82%', y: '25%', scale: 1.1, delay: 1.5, duration: 11 },
          { x: '24%', y: '78%', scale: 0.9, delay: 2.2, duration: 10 },
          { x: '75%', y: '82%', scale: 0.7, delay: 0.8, duration: 12 },
          { x: '50%', y: '12%', scale: 1.0, delay: 3.1, duration: 8.5 },
          { x: '10%', y: '50%', scale: 0.6, delay: 1.0, duration: 13 },
          { x: '90%', y: '60%', scale: 0.85, delay: 2.7, duration: 9.5 },
        ].map((petal, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0.15, 0.45, 0.15],
              y: [-15, 15, -15],
              rotate: [0, 45, -20, 0],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: petal.delay,
            }}
            style={{ left: petal.x, top: petal.y }}
            className="absolute w-5 h-7 rounded-[50%_50%_50%_0%] bg-gradient-to-br from-crimson-600/40 via-burgundy-700/30 to-blush-200/20 blur-[0.5px]"
          />
        ))}
      </div>

      {/* Glassmorphism Luxury Stationery Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg bg-gradient-to-b from-wine-950/90 via-burgundy-990/90 to-wine-990/95 backdrop-blur-2xl border border-rosegold-400/40 rounded-3xl p-8 sm:p-12 shadow-luxury-lg text-center overflow-hidden"
      >
        {/* Subtle Inner Glow Border */}
        <div className="absolute inset-0 rounded-3xl border border-rosegold-400/15 pointer-events-none" />

        <AnimatePresence mode="wait">
          {isSuccessRevealing ? (
            /* Smooth Success Transition View */
            <motion.div
              key="success-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="py-10 flex flex-col items-center justify-center space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <Monogram size={72} />
                <div className="absolute inset-0 rounded-full bg-crimson-600/30 blur-xl pointer-events-none" />
              </motion.div>

              <div className="space-y-2 mt-4">
                <span className="text-[11px] uppercase tracking-[0.3em] text-rosegold-300 block font-sans">
                  Six Years · 23 November 2020
                </span>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-ivory-50 via-blush-200 to-rosegold-300 font-light">
                  Welcome to Our Little World.
                </h3>
              </div>

              <div className="flex items-center space-x-2 text-rosegold-400/80 text-xs tracking-[0.25em] uppercase pt-3">
                <Sparkles size={14} className="animate-spin text-rosegold-300" style={{ animationDuration: '6s' }} />
                <span>Opening memories...</span>
              </div>
            </motion.div>
          ) : (
            /* Luxury Passcode Entry View */
            <motion.div
              key="entry-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Monogram Brand Mark */}
              <div className="mb-4">
                <Monogram size={56} />
              </div>

              {/* Brand Name */}
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-ivory-50 uppercase font-light">
                K & N
              </span>

              {/* Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-[0.04em] mt-5 font-normal">
                A Little World of Ours
              </h2>

              {/* Supporting Text */}
              <p className="font-serif italic text-sm sm:text-base text-blush-200/85 max-w-sm mt-3 leading-relaxed">
                &ldquo;Some memories are meant to be shared only with the ones who know their story.&rdquo;
              </p>

              {/* Subtle Instruction */}
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-rosegold-300/90 mt-6">
                Enter our special date to unlock this little world.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="w-full mt-7 space-y-5">
                <div className="relative">
                  <input
                    type="text"
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="DD / MM / YYYY"
                    disabled={isLoading}
                    autoComplete="off"
                    autoFocus
                    className={`w-full py-4 px-6 rounded-2xl bg-wine-950/90 border text-ivory-50 text-center tracking-[0.35em] text-base sm:text-lg font-mono placeholder:font-mono placeholder:tracking-[0.25em] placeholder:text-ivory-50/30 transition-all focus:outline-none ${
                      errorMsg
                        ? 'border-crimson-600/80 ring-2 ring-crimson-600/30 shadow-[0_0_20px_rgba(159,18,57,0.35)]'
                        : 'border-rosegold-400/40 focus:border-rosegold-400 focus:ring-2 focus:ring-rosegold-400/30 shadow-inner'
                    }`}
                  />
                </div>

                {/* Error State */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-rose-300 bg-crimson-600/20 border border-crimson-600/40 py-2.5 px-4 rounded-xl font-sans tracking-[0.1em]"
                    >
                      {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-crimson-600 via-rose-700 to-burgundy-900 hover:from-crimson-500 hover:to-rose-800 text-ivory-50 text-xs uppercase tracking-[0.28em] font-sans transition-all duration-300 shadow-crimson-glow hover:shadow-[0_0_35px_rgba(225,29,72,0.45)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2.5 group cursor-pointer disabled:opacity-60"
                  data-cursor="play"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3.5 h-3.5 border-2 border-ivory-50 border-t-transparent rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    <>
                      <span>Unlock Our Memories</span>
                      <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform text-rosegold-300"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Discreet Date Hint */}
              <div className="mt-7 flex items-center justify-center space-x-2 text-[10px] uppercase tracking-[0.2em] text-ivory-50/40">
                <Heart size={11} className="text-rosegold-400/60" />
                <span>23 November 2020 · Six Years of Devotion</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
