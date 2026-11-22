# Design System & Aesthetic Specification

### Brand Identity: K & N (Kausik & Nasreen)
**Design Classification:** Luxury Romantic Editorial × High-Contrast Serif × Tactile Keepsake

---

## 1. Color Palette

The color system is rooted in rich wine, deep burgundy, warm ivory, and rose-gold accents, avoiding flat saturated pinks.

| Token | Hex Value | Semantic Role |
|---|---|---|
| `wine-990` | `#2D0A17` | Deepest atmospheric background canvas |
| `wine-950` | `#3D0F21` | Primary scene backdrop & card surface |
| `burgundy-950` | `#451125` | Section transition gradient midpoint |
| `burgundy-900` | `#561B31` | Deep romantic container & modal surface |
| `crimson-600` | `#B83250` | Focal button highlights, wax seal base |
| `blush-200` | `#E8BBC7` | Secondary text, italics, and soft highlights |
| `rosegold-400` | `#C99A83` | Hairline borders, seal emblems, badges |
| `rosegold-300` | `#D8B2A1` | Monogram accents, badge text |
| `ivory-50` | `#FFF9F6` | Primary typographic heading and body color |
| `parchment-100` | `#FBF6EE` | Physical keepsake letter paper background |
| `ink-900` | `#2A161B` | Letter body text (resembling fountain pen ink) |

---

## 2. Typography Hierarchy

### Primary Headings (Serif)
- **Family:** `Cormorant Garamond`, `Playfair Display`, serif
- **Weight:** 300 (Light), 400 (Regular), 400 Italic
- **Tracking:** `-0.02em` to `+0.05em`
- **Role:** Hero wordmark, scene titles, quotes, letter headings

### Body & Keepsake Copy (Serif / Sans)
- **Letter Body:** Serif 400, leading `1.85`, tracking `normal`
- **Micro-Copy & Eyebrows:** Sans-serif (`Inter`, `system-ui`), uppercase, tracking `+0.25em` to `+0.35em`
- **Tabular Numerals:** Sans-serif with `tabular-nums` for rock-solid countdown alignment

---

## 3. Brand Monogram (K & N)

```svg
<svg viewBox="0 0 100 100" class="kn-monogram">
  <!-- Outer hairline rose-gold ring -->
  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.4" />
  <circle cx="50" cy="50" r="43" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.8" />
  
  <!-- Kausik Serif Initial -->
  <text x="28" y="58" font-family="serif" font-size="34" font-weight="300" text-anchor="middle" fill="currentColor">K</text>
  
  <!-- Flowing Italic Ampersand Connector -->
  <text x="50" y="59" font-family="serif" font-style="italic" font-size="28" font-weight="300" text-anchor="middle" fill="#C99A83">&</text>
  
  <!-- Nasreen Serif Initial -->
  <text x="72" y="58" font-family="serif" font-size="34" font-weight="300" text-anchor="middle" fill="currentColor">N</text>
  
  <!-- Delicate hairline accent -->
  <path d="M 32 68 L 68 68" stroke="#C99A83" stroke-width="1" opacity="0.6" />
</svg>
```

---

## 4. UI Components & Tactile Keepsakes

### A. Keepsake Letters
- **Deckled Edge Effect:** Multi-layered CSS drop shadows and organic edge clipping simulating handmade cotton rag paper.
- **Wax Seals (Letters 01 & 02):** Deep crimson circular medallion with embossed K & N monogram and gold speckle highlights.
- **Silk Ribbon Knot Seal (Letter 03):** Dual-loop rose-gold woven silk ribbon knot with flowing tails, signifying an intimate keepsake to be opened when missing each other.

### B. Interactive Audio Vinyl Dock
- **Physics:** Spins continuously at 33⅓ RPM when playing; pauses gracefully on stop.
- **Equalizer:** Dynamic 4-bar SVG audio visualizer animating to playback state.
- **Docking:** Unobtrusive bottom-right floating glass pill with expand/collapse states.

### C. Secret Surprise Box
- **Interaction:** Haptic press-and-hold (3,000ms duration) with radial SVG progress ring.
- **Celebration:** Rose-petal particle physics powered by Canvas Confetti with custom color palette (`#B83250`, `#E8BBC7`, `#C99A83`, `#FFF9F6`).

---

## 5. Responsive Breakpoint Standards

- **Mobile (390px - 767px):** Single-column stacked layouts, touch-friendly 44px+ hit targets, zero horizontal scrollbar overflow, adaptive font sizes (`text-3xl` headings).
- **Tablet (768px - 1023px):** 2-column balanced layouts, medium arch frames.
- **Desktop (1024px - 1440px+):** Full cinematic editorial grids, asymmetric 3-column compositions, 21:9 ultrawide panoramic frames.
