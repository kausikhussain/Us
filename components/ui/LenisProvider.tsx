'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useAppStore } from '@/lib/store';

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { reducedMotion } = useAppStore();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
};
