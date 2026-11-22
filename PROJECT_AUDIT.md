# K & N — COMPREHENSIVE PROJECT AUDIT (PHASE A)
*Kausik for Nasreen · Six Years · 23 November 2020 → 23 November 2026*

---

## 1. EXECUTIVE AUDIT SUMMARY

This audit inspects every route, scene, component, asset, quote, caption, paragraph, letter, audio pipeline, animation, transition, and responsive breakpoint across the repository before implementing the v2 refinement.

| Audit Vector | Current State | Defect Severity | Root Cause | Targeted Fix |
|---|---|---|---|---|
| **Brand Identity & Remnants** | 22 occurrences of former legacy combined name and legacy initials in docs, comments, `package.json`, and badge | **Blocker** | Legacy naming from initial generation | Clean all 22 occurrences, enforce `scripts/lint-identity.ts` in CI and build |
| **Narrative Structure** | 10 scene components scattered in non-sequential order | **Blocker** | Misses mandated 13-section narrative sequence | Reconstruct exact 13-section emotional journey (01 Entrance to 13 Grand Finale) |
| **Photo Curation & Inventory** | 49 photos in `OurPictures/` partially sorted without per-photo face safe-zones | **Major** | No formal `photo-manifest.json` with focal points and safe-zones | Catalog all 49 photos in `PHOTO_INVENTORY.md` and `content/photo-manifest.json` |
| **Photo–Quote Pairing** | Hardcoded pairings inside UI components | **Blocker** | No centralized pairing manifest | Build `content/photo-quote-pairings.ts` as single source of truth with rationale & confidence scores |
| **Letters Experience** | 2 letters displayed in single envelope; no "Open When You Miss Me" | **Blocker** | Missing Letter 03 and dedicated ribbon-sealed envelope | Author 3 complete letters with `{{PERSONAL}}` slots, ribbon seal for Letter 03, deckled edge stationery |
| **Quote Engine & Quality** | 52 quotes existed but lacked strict phrase linting (banned clichés) | **Major** | Need automated validation for banned phrases and word-count bands | Author `scripts/lint-quotes.ts`, expand to 55–65 short/medium quotes + 10–12 long passages in Kausik's voice |
| **Soundtrack & Audio** | Both audio tracks (`alfaaz.m4a`, `dilruba-dilnasee.mp3`) installed with live seek player | **Passed** | Fully verified and operational | Integrate into dedicated Section 08 within narrative sequence |
| **Mobile Responsiveness** | Verified zero overflow, but 13-section expansion requires per-section viewport checks | **Minor** | New sections must obey strict mobile thumb-zones and safe margins | Verify across 360, 375, 390, 430, 768, 1024, 1440, 2560px |

---

## 2. SECTION-BY-SECTION AUDIT (CURRENT VS. TARGET 13-SECTION ARCHITECTURE)

| Target Section | Current Component | Current Status | Required Action for v2 |
|---|---|---|---|
| **01. The Personal Entrance** | `HeroScene.tsx` | Functional with 3D ribbon & glass sculpture | Align subtitle to *"Some stories are too special to fit into ordinary words."*, CTA *"Enter Our Little World"*, ensure intro ≤ 6s |
| **02. A Message Before the Journey** | *Missing* (was collapsed into hero) | **Absent** | Create dedicated full-screen quiet quote transition in warm ivory/powder tones with masked line reveals |
| **03. Our Six Years** | `CounterScene.tsx` | Positioned at Scene 9 (too late) | Move to Section 03; ensure rolling digits, calendar math, before/anniversary/after states |
| **04. The Beauty of You** | Part of `GalleryScene.tsx` | Mixed in generic gallery | Build dedicated editorial portrait gallery of Nasreen with tall arch masks and quotes placed beside/below (never over faces) |
| **05. The Two of Us** | Part of `GalleryScene.tsx` | Mixed in generic gallery | Build dedicated asymmetric together gallery featuring real couple photos with togetherness quotes |
| **06. Little Moments, Big Feelings** | Part of `GalleryScene.tsx` | Mixed in generic gallery | Build dedicated candid/everyday gallery with drifting-polaroid / film-strip styling |
| **07. Words From My Heart** | `QuoteJourneyScene.tsx` | Functional with 14 categories | Polish type duets, full-screen type compositions, and random love note generator |
| **08. Our Soundtrack** | `SongsScene.tsx` + `AudioPlayer.tsx` | Functional | Position cleanly at Section 08 with lyric hooks and expanded controls |
| **09. Six Years, Chapter by Chapter** | `TimelineScene.tsx` | Functional with 2020–2026 milestones | Update thematic labels: *2020 Where It All Began* to *2026 Six Years and Beyond* |
| **10. The Letters** | `LettersScene.tsx` | Contains 2 letters | Expand to 3 letters: Letter 01, Letter 02, and separate sealed Letter 03 (*"Open When You Miss Me"* with soft ribbon) |
| **11. A Little Surprise for You** | `SurpriseScene.tsx` | Functional | Ensure intentional hold-to-unlock trigger, personal message from Kausik, and revealed portrait |
| **12. The Final Memory** | *Missing* (was in finale) | **Absent** | Create dedicated penultimate scene with one signature A-tier photograph and the library's best closing quote |
| **13. The Grand Finale** | `FinaleScene.tsx` | Functional | Conclude with K & N mark, Kausik & Nasreen, *"Some stories are not meant to end. They are meant to keep becoming more beautiful."* and replay CTA |

---

## 3. AUDIT DEFECT LOG & REMEDIATION PLAN

### Defect 1: Legacy Identifier Occurrences (Severity: Blocker)
- **Files Affected:** `package.json`, `package-lock.json`, `components/ui/DevPersonalizationBadge.tsx`, `lib/audio.ts`, `lib/time.ts`, and legacy documentation files.
- **Cause:** Historical project scaffolding name.
- **Fix:** Batch replace with `k-and-n`, `K & N`, and `Kausik & Nasreen`. Enforce via `scripts/lint-identity.ts`.

### Defect 2: Lack of Centralized Photo–Quote Pairing Engine (Severity: Blocker)
- **Files Affected:** `content/gallery.ts`, `components/sections/GalleryScene.tsx`.
- **Cause:** Direct hardcoded imports in components.
- **Fix:** Author `content/photo-quote-pairings.ts` and `PHOTO_QUOTE_PAIRINGS.md` linking specific photo IDs to quote IDs with explicit placement rules and rationales.

### Defect 3: Missing Letter 03 ("Open When You Miss Me") & Stationery Realism (Severity: Blocker)
- **Files Affected:** `content/letters.ts`, `components/sections/LettersScene.tsx`.
- **Cause:** Incomplete specification implementation.
- **Fix:** Implement Letter 03 with intimate ribbon seal; enhance stationery with cotton texture, deckled edges, drop caps, and SVG path signature. Provide `LETTER_FILL_IN.md`.

### Defect 4: Section Flow Discontinuity (Severity: Blocker)
- **Files Affected:** `app/page.tsx`.
- **Cause:** Counter was positioned after letters and surprise rather than establishing the 6-year temporal context upfront.
- **Fix:** Re-sequence `app/page.tsx` to match the exact 13-section narrative order.
