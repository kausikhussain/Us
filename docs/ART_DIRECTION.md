# K & N — ART DIRECTION BIBLE
*A Private Cinematic Love Story in the Browser*
*Six Years · 23 November 2020 → 23 November 2026*

---

## 1. EXECUTIVE VISION & BRAND ESSENCE

**K & N** is not a generic anniversary card or casual photo gallery. It is an interactive digital romantic film crafted with the restraint and nuance of a luxury fashion house (e.g. Celine, Chanel, The Row), the visual poetry of Wong Kar-wai’s *In the Mood for Love*, and the seamless engineering polish of an Apple keynote reveal.

### Emotional Arc (The 9-Scene Journey)
1. **Overture (Hero)** — *Anticipation & Wonder*
2. **The Infinity Ribbon** — *Destiny & Two Lives Intertwining*
3. **Six Years, Countless Memories (Timeline)** — *Nostalgia & Gratitude*
4. **The Gallery of Us (5 Compositions)** — *Intimacy & Shared Time*
5. **Words I Could Never Fit Into a Moment (Letters)** — *Tenderness & Vulnerability*
6. **Our Soundtrack** — *Atmosphere & Emotional Resonance*
7. **A Little Something for You (Surprise)** — *Delight & Playful Reverence*
8. **Little Things That Mean Everything (Quotes & Live Counter)** — *Presence & Constancy*
9. **The Grand Reveal (Finale)** — *Quiet Awe & Lifelong Devotion*

---

## 2. COLOR PALETTE & DESIGN SYSTEM TOKENS

The chromatic palette is built upon warm natural light transitioning gracefully into nocturnal wine and burgundy. Pure digital black (`#000000`) is strictly forbidden.

| Token | Hex | Role | Contrast / Usage |
|---|---|---|---|
| `--ivory-50` | `#FFF9F6` | Primary light paper surface, pure warmth | Background base for daylight scenes |
| `--powder-100` | `#F8E6EA` | Soft atmospheric wash, delicate card surface | Subtle layered depth |
| `--blush-200` | `#E8BBC7` | Ambient glow, silk highlight reflection | Glows, secondary buttons, pill borders |
| `--dusty-400` | `#C9879C` | Secondary accent, timeline ticks, metadata | Subtitles, captions, subtle borders |
| `--crimson-600` | `#B83250` | Single hero focal accent (used with extreme restraint) | Active indicators, wax seal accent |
| `--burgundy-900` | `#561B31` | Nocturnal cinematic background, wax seal base | Letter envelope, night scenes, finale |
| `--wine-950` | `#2A0C17` | Deepest shadow tone, vignette edges | Depth planes, dark scene foundations |
| `--rosegold-400` | `#C99A83` | Metallic hairlines, luxury borders, jewelry details | Wordmark hairlines, monogram accents |
| `--champagne-200` | `#EAD8CB` | Warm neutral highlight, ribbon edge sheen | Glass reflections, quote quotation marks |

### Chromatic Rules
- **One Saturated Accent Per Viewport**: Crimson `#B83250` is a rare spice, never a wallpaper.
- **Scroll-Driven Eased Crossfades**: Transitions glide smoothly between Ivory (`#FFF9F6`), Blush (`#F8E6EA`), Burgundy (`#561B31`), and Wine (`#2A0C17`).
- **WCAG AA Compliance**: High-contrast pairing throughout (`#2A0C17` on `#FFF9F6` yields > 14:1 contrast; `#FFF9F6` on `#561B31` yields > 10:1 contrast).

---

## 3. TYPOGRAPHIC SYSTEM

### Display Serif: Cormorant Garamond / Playfair Display
- Used for: Section titles, editorial headings, large year numerals, letter titles.
- Attributes: High contrast, elegant vertical axis, razor-sharp serifs, generous optical sizing (`opsz`).
- Tracking: `-0.02em` on extra-large displays; `+0.25em` with small-caps for metadata/eyebrows.

### Body Sans: Inter / Manrope
- Used for: Prose narrative, UI controls, navigation labels, timeline captions.
- Attributes: Balanced geometric curves, open counters, high legibility across mobile and desktop.
- Line height: Generous `1.65`–`1.75` for unhurried reading.

### Accent Script: Pinyon Script / Great Vibes (Self-hosted)
- Used strictly for: Letter signatures, intimate marginalia, and subtle date flourishes.
- **Strict Prohibition**: Never used for titles, buttons, or informational body text.

### Fluid Type Scale (CSS Clamp)
```css
--text-display-hero: clamp(3.2rem, 9vw, 8.5rem);
--text-display-lg:   clamp(2.4rem, 5.5vw, 5.2rem);
--text-display-md:   clamp(1.8rem, 3.5vw, 3.4rem);
--text-body-lg:      clamp(1.125rem, 1.4vw, 1.35rem);
--text-body:         clamp(0.95rem, 1.1vw, 1.1rem);
--text-caption:      clamp(0.75rem, 0.85vw, 0.875rem);
```

---

## 4. BRAND IDENTITY: THE "K & N" MONOGRAM & WORDMARK

### Wordmark Construction
- **Typography**: Custom-kerned serif letterforms with hand-tuned kerning pairs: `K · A · U · S · E · E · N`.
- **Ligature**: Subtle arching connection between the two `E`s or between `S` and `E`.
- **Hairline Accent**: Ultra-thin rose-gold rule (`0.75px`) expanding beneath the wordmark on initial reveal.
- **Iconic Monogram**: `K & N` interlocking monogram inside a delicate rose-gold ring, used as the site loader, wax seal stamp, and favicon.

---

## 5. MATERIALITY, LIGHTING & TEXTURE

1. **Film Grain**: Dynamic 3% opacity SVG/Canvas noise overlay simulating 35mm romantic cinema stock.
2. **Satin Silk Ribbons**: Three.js custom vertex shader calculating continuous wave propagation and curl-noise flutter with fresnel sheen in blush/rose-gold.
3. **Glassmorphism**: Backdrop blur (16px–24px) paired with an inner 1px border gradient (`linear-gradient(135deg, rgba(201,154,131,0.4), rgba(232,187,199,0.1))`).
4. **Burgundy Tinted Shadows**: `box-shadow: 0 20px 48px -12px rgba(86, 27, 49, 0.16)`. No harsh pure black shadows.
5. **Fine Paper Texture**: Subtly embossed fibrous texture on letters and polaroid cards.

---

## 6. EDITORIAL GRID & COMPOSITION

- **12-Column Asymmetric Grid**: Columns break deliberately. Images overlap text layers, creating a high-fashion editorial publication feel.
- **Architectural Masks**: Imagery framed through cathedral arches, softened ellipses, and 35mm film perforations rather than identical rectangular cards.
- **Breathing Space**: Minimum 10rem section padding on desktop to allow moments of visual quiet.

---

## 7. INTERACTION & CURSOR

- **Desktop Cursor**: Minimal rose-gold dot (`6px`) paired with a lagging magnetic halo (`32px`).
- **Contextual States**:
  - Over photos: Halo expands with label `"View"`.
  - Over letters: Halo turns crimson with label `"Read"`.
  - Over music player: Halo animates with label `"Listen"`.
  - Over interactive surprise: Halo pulses with label `"Unlock"`.
- **Touch / Mobile**: Cursor disabled natively; smooth gestures, spring physics, and tap ripples take over.
