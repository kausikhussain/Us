# Architectural & Curatorial Decisions Log

### Project: K & N — Six Years, One Story
**Dedicated to:** Nasreen  
**Author:** Kausik  
**Milestone:** 23 November 2020 → 23 November 2026 (Six-Year Anniversary)

---

## 1. Identity Lock & Typographic Monogram
- **Decision:** Enforce **K & N** as the exclusive short monogram brand and **Kausik** & **Nasreen** as the exclusive full names in all headings, letters, dedications, and metadata.
- **Rationale:** Eliminate any past naming inconsistencies or draft monograms. The relationship belongs exclusively to Kausik and Nasreen.
- **Implementation:** Created custom SVG monogram featuring high-contrast serif letterforms (Cormorant Garamond inspired) joined by an italicized rose-gold ampersand (`&`) with a delicate hairline horizontal keyline. Built automated AST/regex linter `scripts/lint-identity.ts` preventing any regression.

---

## 2. Photographic Inventory & Quality Tiering
- **Decision:** Conduct local-only audit of all 49 personal photographs in `OurPictures/` using Python PIL.
- **Classification:**
  - **Tier A (13 Signature Images):** High-resolution DSLR and landmark portraits (e.g., `DSC_0111_1.JPG`, `IMG_0724.JPG`, 2020 landmark milestone, 2025 golden-hour wide composition). Assigned to Hero, Section 12 Master Portrait, and primary Scene IV/V centerpieces.
  - **Tier B (24 Portraits & Candids):** Emotionally rich expressions, authentic moments, and candid smiles. Form the backbone of the editorial grids.
  - **Tier C (11 Everyday Memories):** Intimate casual walks, casual snapshots, and filmstrips. Used in Section 06 candid Polaroid stacks.
  - **Tier X (1 Retired Image):** Near-duplicate shot (`ph-044` vs `ph-043`), safely archived in manifest to avoid visual repetition.
- **Integrity Rule:** Originals in `OurPictures/` remain untouched. Web-optimized copies reside in `public/images/our-story/`.

---

## 3. Photo–Quote Pairing & Face-Safe Zones
- **Decision:** Implement strict safe-zone rules for photo-quote pairings (`textPlacement: 'beside' | 'below' | 'overlay-safe-zone'`).
- **Rationale:** Respect the subject. Never place typography, banners, or high-contrast gradients across Nasreen's face or body.
- **Implementation:** Generated 19 curated pairings in `content/photo-quote-pairings.ts`. Every pairing carries 5/5 confidence and a documented editorial rationale.

---

## 4. Quote Engine & Kausik Voice Architecture
- **Decision:** Author 67 original quotes across 10 categories, completely free of generic internet clichés.
- **Voice Guidelines:**
  - Speaks directly to Nasreen with genuine gratitude, admiration, and calm warmth.
  - Zero hollow tropes (banned: *"you are my rock"*, *"words cannot describe"*, *"from the moment I met you"*, *"destined to be"*).
  - Concrete details: the quiet cadence of her laughter, tea growing cold, walking side-by-side in quiet evenings.
- **Distribution:** 56 short/medium reflective lines + 11 expansive long passages. Validated with automated quote linter `scripts/lint-quotes.ts`.

---

## 5. The Letters Architecture (Three Keepsakes)
- **Decision:** Re-architect the letters into three distinct physical-inspired keepsakes:
  - **Letter 01:** *"To the Girl Who Became My Favourite Part of Every Day"* (Classic Burgundy Wax Seal).
  - **Letter 02:** *"For All the Beautiful Chapters We Have Yet to Write"* (Classic Burgundy Wax Seal).
  - **Letter 03:** *"Open When You Miss Me"* (Handcrafted Rose-Gold Silk Ribbon Knot Seal).
- **Interactive Mechanics:** Interactive envelope unsealing animation, drop cap editorial typesetting, deckled-edge textured parchment, reading pace controls (Slow, Reflective, Full), and print styling for physical framing.

---

## 6. 13-Scene Narrative Sequence
- **Decision:** Structure the entire website into a continuous 13-scene cinematic filmic narrative:
  1. `HeroScene` (01 — Overture)
  2. `MessageScene` (02 — A Message Before the Journey)
  3. `CounterScene` (03 — Our Six Years & Milestone)
  4. `BeautyOfYouScene` (04 — Nasreen Portraits)
  5. `TwoOfUsScene` (05 — Together Across Time)
  6. `LittleMomentsScene` (06 — Candids & Filmstrip)
  7. `QuoteJourneyScene` (07 — 67 Curated Quotes & Love Note Drawer)
  8. `SongsScene` (08 — Sacred Soundtrack)
  9. `TimelineScene` (09 — Six-Year Journey 2020–2026)
  10. `LettersScene` (10 — Three Keepsake Envelopes)
  11. `SurpriseScene` (11 — Interactive Rose-Petal Surprise Box)
  12. `FinalMemoryScene` (12 — Master Portrait & Signature Line)
  13. `FinaleScene` (13 — The Grand Reveal & Monogram)

---

## 7. Performance & Audio Engineering
- **Decision:** Zero external CDNs or remote dependencies for core assets.
- **Audio Engine:** HTML5 Web Audio API singleton with smooth gain-node crossfading, vinyl rotation physics, and non-intrusive bottom-right dock.
- **3D Graphics:** Three.js / React Three Fiber canvas with floating silk particles, subtle chromatic aberration, and automatic frame throttling when offscreen.
