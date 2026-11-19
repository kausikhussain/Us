import { QualityTier } from './store';

export function detectQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 'high';

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return 'static';
  }

  // Check WebGL availability
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'static';
  } catch {
    return 'static';
  }

  // Check mobile / small screens
  const isMobile = window.innerWidth < 768;
  const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };

  if (nav.deviceMemory && nav.deviceMemory <= 4) {
    return isMobile ? 'low' : 'medium';
  }

  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) {
    return isMobile ? 'low' : 'medium';
  }

  if (isMobile) {
    return 'medium';
  }

  return 'high';
}
