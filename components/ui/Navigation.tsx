'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from './Monogram';
import { useAppStore } from '@/lib/store';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overture', href: '#hero' },
  { label: 'The Infinity', href: '#infinity' },
  { label: 'Six Years', href: '#timeline' },
  { label: 'Our Gallery', href: '#gallery' },
  { label: 'Letters', href: '#letters' },
  { label: 'Soundtrack', href: '#soundtrack' },
  { label: 'Surprise', href: '#surprise' },
  { label: 'Anniversary', href: '#counter' },
  { label: 'Finale', href: '#finale' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isPlaying, isMuted, toggleMute, timeTravelMode, setTimeTravelMode } = useAppStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'py-3.5 bg-wine-950/80 backdrop-blur-md border-b border-rosegold-400/20 shadow-luxury'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center space-x-3 group cursor-pointer"
            aria-label="KAUSEEN Home"
          >
            <Monogram size={38} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.25em] text-ivory-50 group-hover:text-blush-200 transition-colors uppercase">
                KAUSEEN
              </span>
              <span className="text-[9px] tracking-[0.22em] text-rosegold-300 uppercase">
                Six Years
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs uppercase tracking-[0.22em] text-ivory-50/80 hover:text-rosegold-300 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-rosegold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Controls & Quick Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Quick Sound Mute Button */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full border border-rosegold-400/30 text-ivory-50/90 hover:text-rosegold-300 hover:border-rosegold-400/60 transition-all"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ivory-50 hover:text-rosegold-300 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-wine-950/95 backdrop-blur-xl flex flex-col justify-center px-8 lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-2xl tracking-[0.2em] text-ivory-50 hover:text-rosegold-300 uppercase transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-6 border-t border-rosegold-400/20 flex justify-center space-x-4">
                <button
                  onClick={toggleMute}
                  className="px-5 py-2.5 rounded-full border border-rosegold-400/40 text-xs tracking-[0.2em] uppercase text-ivory-50 flex items-center space-x-2"
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  <span>{isMuted ? 'Sound Muted' : 'Sound On'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
