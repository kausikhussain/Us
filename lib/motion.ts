import { Variants } from 'framer-motion';

export const MOTION_EASING = {
  silk: [0.22, 1, 0.36, 1] as const,
  velvet: [0.65, 0, 0.35, 1] as const,
  petal: [0.16, 1, 0.3, 1] as const,
};

export const MOTION_DURATIONS = {
  micro: 0.18,
  ui: 0.42,
  reveal: 0.90,
  scene: 1.60,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASING.silk,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const lineReveal: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.1,
      ease: MOTION_EASING.silk,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.reveal,
      ease: MOTION_EASING.silk,
    },
  },
};

export const envelopeFlap: Variants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: -180,
    transition: {
      duration: 0.85,
      ease: MOTION_EASING.velvet,
    },
  },
};

export const letterSlide: Variants = {
  folded: { y: 0, opacity: 0 },
  emerging: {
    y: -140,
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: MOTION_EASING.silk,
    },
  },
  reading: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: MOTION_EASING.silk,
    },
  },
};
