'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LETTERS_DATA, LoveLetter } from '@/content/letters';
import { useAppStore } from '@/lib/store';
import { Monogram } from '@/components/ui/Monogram';
import { Printer, Mail, FastForward } from 'lucide-react';

export const LettersScene: React.FC = () => {
  const {
    activeLetterId,
    setActiveLetterId,
    isEnvelopeOpen,
    setIsEnvelopeOpen,
    letterRevealMode,
    setLetterRevealMode,
  } = useAppStore();

  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(1);
  const activeLetter =
    LETTERS_DATA.find((l) => l.id === activeLetterId) || LETTERS_DATA[0];

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setRevealedParagraphs(1);
  };

  const handleRevealAll = () => {
    setRevealedParagraphs(activeLetter.paragraphs.length);
    setLetterRevealMode('instant');
  };

  const handleNextParagraph = () => {
    if (revealedParagraphs < activeLetter.paragraphs.length) {
      setRevealedParagraphs(revealedParagraphs + 1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="letters"
      className="relative min-h-screen py-24 sm:py-36 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-rosegold-300 mb-3 block">
            Scene VI · Words in Ink
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 tracking-[0.05em]">
            Words I Could Never Fit Into a Moment
          </h2>
          <p className="font-sans text-xs sm:text-sm text-ivory-50/70 uppercase tracking-[0.2em] mt-3">
            Two Hand-Penned Letters for Six Years & Eternity
          </p>

          {/* Letter Switcher Tabs */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            {LETTERS_DATA.map((letter) => {
              const isActive = letter.id === activeLetterId;
              return (
                <button
                  key={letter.id}
                  onClick={() => {
                    setActiveLetterId(letter.id);
                    setRevealedParagraphs(1);
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.2em] border transition-all ${
                    isActive
                      ? 'bg-crimson-600/30 border-rosegold-400 text-ivory-50 shadow-crimson-glow'
                      : 'border-rosegold-400/20 text-ivory-50/60 hover:text-ivory-50 hover:border-rosegold-400/50'
                  }`}
                >
                  {letter.letterNumber} — {letter.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Envelope Stage */}
        <div className="relative flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isEnvelopeOpen ? (
              /* CLOSED ENVELOPE WITH WAX SEAL */
              <motion.div
                key="closed-envelope"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-xl h-[340px] sm:h-[380px] bg-gradient-to-b from-[#F2D3DA] to-[#E8BBC7] rounded-3xl border border-rosegold-400/40 shadow-luxury-lg flex flex-col items-center justify-center p-8 text-center cursor-pointer group"
                onClick={handleOpenEnvelope}
                data-cursor="read"
              >
                {/* Envelope Flap Lines */}
                <div className="absolute top-0 inset-x-0 h-32 border-b border-rosegold-400/30 pointer-events-none" />

                {/* Wax Seal with Monogram K & N */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-br from-crimson-600 to-burgundy-900 border-2 border-rosegold-400/60 shadow-crimson-glow flex items-center justify-center cursor-pointer mb-6"
                >
                  <Monogram size={56} />
                </motion.div>

                <h3 className="font-serif text-2xl sm:text-3xl text-wine-950 font-normal tracking-[0.05em]">
                  {activeLetter.title}
                </h3>
                <span className="text-[11px] uppercase tracking-[0.25em] text-burgundy-900/80 mt-1">
                  Sealed for 23 November 2026
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEnvelope();
                  }}
                  className="mt-6 px-7 py-3 rounded-full bg-wine-950 text-ivory-50 text-xs uppercase tracking-[0.25em] hover:bg-burgundy-900 transition-colors shadow-luxury flex items-center space-x-2"
                >
                  <Mail size={15} />
                  <span>Open Your Letter</span>
                </button>
              </motion.div>
            ) : (
              /* OPENED LETTER ON FINE COTTON STATIONERY */
              <motion.div
                key="opened-letter"
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-full bg-[#FFFBF8] text-wine-950 rounded-3xl p-8 sm:p-14 shadow-luxury-lg border border-rosegold-400/30 relative print:p-0 print:border-none print:shadow-none"
              >
                {/* Stationary Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-rosegold-400/20 pb-6 mb-8 print:border-b-2">
                  <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                    <Monogram size={42} />
                    <div className="flex flex-col">
                      <span className="font-serif text-lg tracking-[0.2em] text-burgundy-900 uppercase">
                        K & N
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                        Private Keepsake
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-neutral-600 print:hidden">
                    <button
                      onClick={handleRevealAll}
                      className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-crimson-600 text-[10px] flex items-center space-x-1.5 transition-colors"
                      title="Read entire letter at once"
                    >
                      <FastForward size={12} />
                      <span>Read at Once</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3.5 py-1.5 rounded-full border border-neutral-300 hover:border-crimson-600 text-[10px] flex items-center space-x-1.5 transition-colors"
                      title="Print or save as stationery PDF"
                    >
                      <Printer size={12} />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="space-y-6 max-w-2xl mx-auto font-serif">
                  <div className="flex justify-between items-baseline mb-6">
                    <p className="text-xl sm:text-2xl italic text-burgundy-900 font-light">
                      {activeLetter.salutation}
                    </p>
                    <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-sans">
                      {activeLetter.date}
                    </span>
                  </div>

                  {/* Paragraphs with Controlled Reading Pace Reveal */}
                  {activeLetter.paragraphs
                    .slice(0, letterRevealMode === 'instant' ? activeLetter.paragraphs.length : revealedParagraphs)
                    .map((paragraph, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className={`text-base sm:text-lg leading-relaxed text-neutral-800 ${
                          index === 0 ? 'first-letter:text-4xl first-letter:font-serif first-letter:text-crimson-600 first-letter:float-left first-letter:mr-2.5 first-letter:leading-none' : ''
                        }`}
                      >
                        {paragraph}
                      </motion.p>
                    ))}

                  {/* Pacing Action Button */}
                  {letterRevealMode === 'cinematic' &&
                    revealedParagraphs < activeLetter.paragraphs.length && (
                      <div className="pt-4 flex justify-center print:hidden">
                        <button
                          onClick={handleNextParagraph}
                          className="px-6 py-2.5 rounded-full bg-crimson-600 text-ivory-50 text-xs uppercase tracking-[0.2em] hover:bg-burgundy-900 transition-colors shadow-crimson-glow flex items-center space-x-2"
                        >
                          <span>Continue Reading...</span>
                        </button>
                      </div>
                    )}

                  {/* Letter Sign-Off */}
                  {(letterRevealMode === 'instant' ||
                    revealedParagraphs >= activeLetter.paragraphs.length) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="pt-8 border-t border-rosegold-400/20 mt-8"
                    >
                      <p className="italic text-base text-neutral-700">
                        {activeLetter.closing}
                      </p>
                      <p className="font-script text-3xl sm:text-4xl text-crimson-600 mt-2">
                        {activeLetter.signatureName}
                      </p>
                      {activeLetter.postscript && (
                        <p className="text-sm italic text-neutral-500 mt-4 pt-4 border-t border-neutral-200">
                          {activeLetter.postscript}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Close Envelope Button */}
                <div className="mt-12 text-center print:hidden">
                  <button
                    onClick={() => setIsEnvelopeOpen(false)}
                    className="text-xs uppercase tracking-[0.25em] text-neutral-500 hover:text-crimson-600 transition-colors"
                  >
                    Fold & Seal Letter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
