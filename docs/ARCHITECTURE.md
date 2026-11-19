# KAUSEEN — TECHNICAL ARCHITECTURE
*A High-Performance, Cinematic WebGL & Motion Architecture*

---

## 1. TECHNOLOGY STACK & DEPENDENCY JUSTIFICATION

| Library | Version / Role | Justification |
|---|---|---|
| **Next.js 15 (App Router)** | Core Framework | Server-side rendering for instant First Contentful Paint, React Server Components for zero-bundle text layout, static route generation with zero layout shifts. |
| **TypeScript (Strict)** | Language | 100% type safety across content schemas, WebGL uniforms, 3D math, and date calculations. |
| **Tailwind CSS v3** | Styling & Tokens | Zero-runtime CSS with custom design tokens mapped directly to our Art Direction Bible (`--ivory-50`, `--burgundy-900`, etc.). |
| **Framer Motion** | UI & Micro-interactions | Declarative physics-based transitions for modals, envelope 3D flips, buttons, and responsive bottom sheets. |
| **GSAP & ScrollTrigger** | Cinematic Scroll Choreography | Imperative scrubbed scroll control, timeline synchronization, and pinned narrative beats where React state re-renders would cause frame drops. |
| **Three.js / React Three Fiber / Drei** | 3D WebGL Engine | Procedural silk ribbon splines, instanced rose petal physics, glass transmission shader, and atmospheric lighting with automatic resource disposal. |
| **Lenis** | Smooth Scrolling | Hardware-accelerated smooth scrolling integrated directly into GSAP’s tick loop for butter-smooth 60fps tracking. |
| **Zustand** | Global State | Ultra-lightweight store (audio playback, quality tier, letter modal state, active year) without Context provider hell or re-render churn. |
| **Zod** | Content Validation | Strict validation of user data files in `/content/` ensuring no broken images or missing attributes crash the build. |
| **Lucide React** | Thin-Line Iconography | Featherweight, customizable 1.25px stroke SVG icons matching our luxury editorial aesthetic. |
| **Playwright** | Verification & E2E | Multi-device browser testing (Chromium, Mobile iPhone/Android viewports, Firefox) with automated visual regression screenshot capture. |

---

## 2. DIRECTORY STRUCTURE

```
/
├── app/
│   ├── favicon.ico
│   ├── layout.tsx              # Root HTML, fonts, metadata, security headers, noindex
│   ├── page.tsx                # Cinematic 9-scene master narrative container
│   ├── not-found.tsx           # Romantic branded 404 page
│   ├── globals.css             # Fluid typography, tokens, noise grain, print styles
│   └── robots.txt              # Strict disallow: / for private protection
├── components/
│   ├── ui/                     # Reusable design system primitives
│   │   ├── Navigation.tsx      # Minimalist auto-hiding header with monogram
│   │   ├── AudioPlayer.tsx     # Floating frosted-glass player with waveform
│   │   ├── CustomCursor.tsx    # Magnetic dual-ring desktop cursor
│   │   ├── Lightbox.tsx        # High-performance editorial lightbox
│   │   ├── LenisProvider.tsx   # Smooth scroll initialization & GSAP sync
│   │   ├── InitialLoader.tsx   # Monogram-drawing initial curtain
│   │   └── PasswordGate.tsx    # Privacy access gate with encrypted session
│   ├── sections/               # The 9 Cinematic Scenes
│   │   ├── HeroScene.tsx       # Scene 1: Overture
│   │   ├── InfinityScene.tsx   # Scene 2: The Ribbon Becomes Infinity
│   │   ├── TimelineScene.tsx   # Scene 3: Six Years, Countless Memories
│   │   ├── GalleryScene.tsx    # Scene 4: The Gallery of Us (5 Compositions)
│   │   ├── LettersScene.tsx    # Scene 5: Love Letters & 3D Envelope
│   │   ├── SongsScene.tsx      # Scene 6: Our Soundtrack
│   │   ├── SurpriseScene.tsx   # Scene 7: Sealed Gift & Haptic Unboxing
│   │   ├── CounterScene.tsx    # Scene 8: Anniversary Timer & Quotes
│   │   └── FinaleScene.tsx     # Scene 9: The Grand Reveal
│   └── three/                  # WebGL 3D Canvas Components
│       ├── MainCanvas.tsx      # Lazy dynamic canvas with Tier detection & fallback
│       ├── SilkRibbon.tsx      # Catmull-Rom spline with vertex displacement shader
│       ├── InfinityRibbon.tsx  # Dual spline morphing into lemniscate knot
│       ├── RosePetals.tsx      # Instanced mesh flutter & distance DOF fade
│       ├── GlassHeart.tsx      # Sculptural translucent refractive mesh
│       └── CameraRig.tsx       # Smooth damped scroll dolly & mouse parallax
├── content/                    # ★ 100% OF PERSONAL DATA LIVES HERE
│   ├── site.ts                 # Names, dates, coordinates, timezone, brand lines
│   ├── timeline.ts             # 2020-2026 milestones, memories, photos, quotes
│   ├── gallery.ts              # 5 layout collections with focal points & captions
│   ├── letters.ts              # Letter 01 and Letter 02 paragraphs & signatures
│   ├── songs.ts                # "Alfaaz" and "Dilruba Dilnasee" metadata & tracks
│   ├── surprise.ts             # Secret message, reveal photo, unlock prompt
│   └── quotes.ts               # Curated romantic phrases with author credits
├── lib/
│   ├── motion.ts               # Framer Motion variants & GSAP timing curves
│   ├── time.ts                 # Asia/Kolkata timezone calendar math & leap year checks
│   ├── audio.ts                # Audio manager & Web Audio synthesizers
│   ├── store.ts                # Zustand global store
│   └── quality.ts              # GPU, DPR, device memory quality tier heuristics
├── public/
│   ├── audio/                  # User audio assets & ambient soundscapes
│   ├── photos/                 # User photography & inspiration assets
│   │   ├── original/           # Uncompressed master source files
│   │   └── optimized/          # WebP/AVIF responsive multi-scale assets
│   └── fonts/                  # Self-hosted typography files
├── docs/                       # Architecture, art direction, and user guides
└── tests/                      # Playwright E2E and visual regression test suites
```

---

## 3. QUALITY TIER & HARDWARE FALLBACK HEURISTICS

To ensure 60fps across high-end desktop GPUs and 5-year-old budget smartphones:
1. **Tier 1 (High Desktop)**: Full WebGL canvas, 250 instanced petals, physical transmission glass heart, post-processing bloom and subtle grain.
2. **Tier 2 (Medium / Tablet / Modern Mobile)**: Standard environment-mapped glass, 60 instanced petals, simplified spline ribbons, native post-FX disabled.
3. **Tier 3 (Low Mobile / Battery Saver)**: Reduced petal count (20), hardware vertex shaders simplified, DPR capped at 1.0.
4. **Tier 4 (Static / No-WebGL / Reduced Motion)**: Canvas unmounted; replaced with CSS 3D gradients, pre-rendered soft lighting, and high-resolution backdrop captures.

---

## 4. DATE CALCULATION ACCURACY SPECIFICATION (Asia/Kolkata)

- Timezone: `Asia/Kolkata` (UTC+05:30).
- Start Date: `2020-11-23T00:00:00+05:30`.
- 6th Anniversary: `2026-11-23T00:00:00+05:30`.
- Calculation Engine:
  - Exact calendar years, calendar months (taking into account month lengths: 28/29/30/31 days), days, hours, minutes, seconds.
  - Accounts for leap year `2024` (366 days).
  - Dev time-travel preview mode via query param `?timeTravel=before`, `?timeTravel=today`, `?timeTravel=after`.
