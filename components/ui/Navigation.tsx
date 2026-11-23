'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monogram } from './Monogram';
import { useAppStore } from '@/lib/store';
import { Menu, X, Volume2, VolumeX, Lock } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Overture', href: '#hero' },
  { label: 'Message', href: '#message-before-journey' },
  { label: 'Six Years', href: '#counter' },
  { label: 'Nasreen', href: '#beauty-of-you' },
  { label: 'The Two of Us', href: '#the-two-of-us' },
  { label: 'Moments', href: '#little-moments' },
  { label: 'Quotes', href: '#quotes-journey' },
  { label: 'Soundtrack', href: '#soundtrack' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Letters', href: '#letters' },
  { label: 'Surprise', href: '#surprise' },
  { label: 'Finale', href: '#finale' },
];

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMuted, toggleMute } = useAppStore();

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

  const handleLock = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { }
    window.dispatchEvent(new CustomEvent('kn:lock'));
    window.location.reload();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
          ? 'py-3 bg-wine-950/85 backdrop-blur-md border-b border-rosegold-400/20 shadow-luxury'
          : 'py-5 bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Monogram & Name K & N */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center space-x-3 group cursor-pointer"
            aria-label="K & N Home"
          >
            <Monogram size={36} className="group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.25em] text-ivory-50 group-hover:text-blush-200 transition-colors uppercase">
                K & N
              </span>
              <span className="text-[9px] tracking-[0.22em] text-rosegold-300 uppercase">
                Six Years · One Story
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-[11px] uppercase tracking-[0.2em] text-ivory-50/80 hover:text-rosegold-300 transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-rosegold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Controls & Quick Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full border border-rosegold-400/30 text-ivory-50/90 hover:text-rosegold-300 hover:border-rosegold-400/60 transition-all"
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            {/* Lock Story Option */}
            <button
              onClick={handleLock}
              className="p-2 rounded-full border border-rosegold-400/30 text-ivory-50/90 hover:text-rosegold-300 hover:border-rosegold-400/60 transition-all"
              aria-label="Lock Story"
              title="Lock Story"
            >
              <Lock size={15} />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-ivory-50 hover:text-rosegold-300 transition-colors"
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
            className="fixed inset-0 z-30 bg-wine-950/95 backdrop-blur-xl flex flex-col justify-center px-8 xl:hidden"
          >
            <div className="flex flex-col space-y-4 text-center max-h-[85vh] overflow-y-auto py-8">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 + 0.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif text-xl sm:text-2xl tracking-[0.2em] text-ivory-50 hover:text-rosegold-300 uppercase transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="pt-5 border-t border-rosegold-400/20 flex justify-center">
                <button
                  onClick={toggleMute}
                  className="px-5 py-2 rounded-full border border-rosegold-400/40 text-xs tracking-[0.2em] uppercase text-ivory-50 flex items-center space-x-2"
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
