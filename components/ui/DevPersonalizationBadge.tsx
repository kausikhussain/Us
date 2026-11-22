'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, ExternalLink, CheckCircle } from 'lucide-react';

export const DevPersonalizationBadge: React.FC = () => {
  const [open, setOpen] = useState(false);

  // In production builds, this badge can be suppressed or minimized
  const isDev = process.env.NODE_ENV !== 'production';

  return (
    <>
      {/* Floating Pill in Bottom-Left (safely placed near top on mobile, bottom on desktop) */}
      <div className="fixed top-20 left-4 sm:top-auto sm:bottom-6 sm:left-6 z-40 select-none">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-burgundy-900/90 border border-rosegold-400/50 text-[10px] uppercase tracking-[0.18em] text-rosegold-300 hover:text-ivory-50 shadow-luxury transition-all backdrop-blur-md"
          title="View Personalization Guide"
        >
          <AlertCircle size={13} className="text-rosegold-400" />
          <span>Personal Content Guide</span>
        </button>
      </div>

      {/* Slide-Over Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-wine-990/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-wine-950 border border-rosegold-400/40 rounded-3xl p-6 sm:p-8 shadow-luxury-lg text-ivory-50"
            >
              <div className="flex items-center justify-between pb-4 border-b border-rosegold-400/20">
                <div className="flex items-center space-x-2.5">
                  <AlertCircle size={18} className="text-rosegold-300" />
                  <h3 className="font-serif text-xl tracking-[0.05em]">Personalization Checklist</h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-full text-ivory-50/60 hover:text-ivory-50"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-4 space-y-4 text-xs font-sans text-ivory-50/80">
                <p>
                  To personalize this keepsake, update the following files in <code className="text-rosegold-300 bg-burgundy-900/50 px-1.5 py-0.5 rounded">/content/</code>:
                </p>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-burgundy-900/30 border border-rosegold-400/20 flex items-start space-x-2.5">
                    <CheckCircle size={14} className="text-rosegold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-ivory-50 block font-serif text-sm">content/letters.ts</strong>
                      <span>Personalize Letter 01 and Letter 02 with your genuine memories and signature.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-burgundy-900/30 border border-rosegold-400/20 flex items-start space-x-2.5">
                    <CheckCircle size={14} className="text-rosegold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-ivory-50 block font-serif text-sm">public/photos/ & content/gallery.ts</strong>
                      <span>Drop your real couple photos into /public/photos/ and link them.</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-burgundy-900/30 border border-rosegold-400/20 flex items-start space-x-2.5">
                    <CheckCircle size={14} className="text-rosegold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-ivory-50 block font-serif text-sm">public/audio/ (Alfaaz & Dilruba Dilnasee)</strong>
                      <span>Add your licensed mp3 audio files (built-in synthesizer plays currently).</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-burgundy-900/30 border border-rosegold-400/20 flex items-start space-x-2.5">
                    <CheckCircle size={14} className="text-rosegold-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-ivory-50 block font-serif text-sm">content/surprise.ts</strong>
                      <span>Update the secret surprise message and revealed photograph.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-right">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 rounded-full bg-crimson-600 text-ivory-50 text-[10px] uppercase tracking-[0.2em]"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
