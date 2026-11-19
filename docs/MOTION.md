# KAUSEEN — MOTION DESIGN SYSTEM
*Motion is breath, not decoration. Slow, weighted, eased.*

---

## 1. MOTION PHILOSOPHY

Every movement in **KAUSEEN** serves an emotional purpose:
- **Weighted & Liquid**: Movements possess tactile mass and fluid drag, resembling heavy silk falling through warm air.
- **Never Snapping**: Cheap elastic bounces and robotic linear speeds are banned.
- **Single Focal Event**: At any given scroll position, only one primary visual event commands attention.

---

## 2. TIMING & EASING TOKENS

```typescript
export const MOTION_EASING = {
  // Heavy silk floating in still air
  silk: [0.22, 1, 0.36, 1],
  // Deep velvet curtain draw
  velvet: [0.65, 0, 0.35, 1],
  // Rose petal drifting and tumbling
  petal: [0.16, 1, 0.3, 1],
  // Gentle tactile spring for UI buttons
  gentleSpring: { stiffness: 180, damping: 24, mass: 1 },
  // Settle spring for modal & lightbox
  settleSpring: { stiffness: 220, damping: 28, mass: 1.2 }
};

export const MOTION_DURATIONS = {
  micro: 0.18,      // Tooltip, button hover, border glow
  ui: 0.42,         // Tab switch, menu toggle, player collapse
  reveal: 0.90,     // Card entrance, text line fade, image clip-path
  scene: 1.60       // Full atmospheric backdrop shift, scene transitions
};
```

---

## 3. SCROLL & TICKER SYNCHRONIZATION

- **Lenis Smooth Scroll** drives native window scrolling with a virtual momentum of `1.15` and easing function `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- **GSAP ScrollTrigger Integration**:
  ```typescript
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  ```
- **Scrubbed Pinned Sequences**:
  - **Scene 1 to Scene 2**: Ribbon approaches from two separated anchors, twines, and forms the mathematical infinity knot (lemniscate).
  - **Scene 3 (Timeline)**: Pinned horizontal scroll container allowing years 2020 through 2026 to progress seamlessly with parallax image transitions.
  - **Scene 9 (The Finale)**: Camera dollies backward while deep burgundy wine fog rises and petals ascend.

---

## 4. SIGNATURE TRANSITIONS & CHOREOGRAPHY

1. **Masked Line Typography Reveal**:
   - Each heading line is wrapped in an `overflow-hidden` container.
   - Text elements animate `translateY(110%)` to `translateY(0%)` with a `stagger: 0.08s` delay and `ease-silk`.
2. **Curved Image Unveil (Clip-Path & Counter-Parallax)**:
   - Initial state: `clip-path: inset(100% 0% 0% 0%)`.
   - Final state: `clip-path: inset(0% 0% 0% 0%)`.
   - The interior image starts scaled at `1.15` and scales down to `1.0` as the frame slides, creating editorial depth.
3. **Wax Seal Breaking & Envelope Fold**:
   - Beat 1: Wax seal gently fissures along an organic path (`0.4s`).
   - Beat 2: Top triangular flap rotates `-180deg` on the X-axis in 3D perspective (`0.7s`).
   - Beat 3: Heavy cotton letter slides vertically upward by `75%` and softly lays forward onto the foreground reading plane (`0.9s`).
4. **Surprise Unboxing**:
   - Long press (1.2s) fills a circumferential rose-gold light ring.
   - Haptic feedback pattern (`[40, 60, 80]ms`).
   - Silk knot untwines and blossoms outward with rose petals and sparkling light particles.

---

## 5. ACCESSIBILITY & PREFERS-REDUCED-MOTION

Under `prefers-reduced-motion: reduce`:
- Three.js WebGL canvas swaps to optimized static high-resolution poster captures with subtle low-intensity CSS ambient lighting.
- All pinned scrubbed timelines convert to standard native vertical document flow.
- Fast `0.2s` opacity cross-fades replace long spatial translations.
- Lenis virtual momentum is completely bypassed in favor of native instant scrolling.
