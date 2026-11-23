# K & N Anniversary Platform — Asset Protection Map (`ASSET_PROTECTION_MAP.md`)

**Date:** 23 November 2026  
**Status:** Enforced  
**Classification:** Confidential Security Architecture  

---

## 1. Asset Migration & Authorization Summary

All sensitive assets (photographs, love letters, master audio tracks, relationship timeline, and secret messages) have been relocated out of publicly accessible web directories into protected private storage. Access is granted exclusively through server-side authenticated endpoints protected by multi-factor authentication (`aal2`).

| Asset Category | Pre-Audit Location | New Protected Location | Delivery Mechanism | Authorization Control | Cache Policy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **High-Res Original Photos** | `OurPictures/` (Tracked in Git) | `private_media/originals/` (Purged from Git, in `.gitignore`) | Server-side only / Private Archive | Never served publicly. Admin access only. | N/A |
| **Optimized Couple & Portrait Photos** | `public/images/our-story/*` (Public CDN) | `private_media/images/our-story/*` | `/api/media/images/our-story/[...path]` | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store, must-revalidate` |
| **Master Audio Tracks (Alfaaz & Dilruba)** | `public/audio/*` (Public CDN) | `private_media/audio/*` | `/api/media/audio/[track]` with HTTP Range support | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store, must-revalidate` |
| **Three Keepsake Love Letters** | `content/letters.ts` (Static JS chunks) | Server-side `lib/content/server-content.ts` | `/api/private/content` (Encrypted JSON) | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store` |
| **Secret Surprise Box Message** | `content/surprise.ts` (Static JS chunks) | Server-side `lib/content/server-content.ts` | `/api/private/content` (Encrypted JSON) | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store` |
| **67 Devotion Quotes & 19 Pairings** | `content/quotes.ts` (Static JS chunks) | Server-side `lib/content/server-content.ts` | `/api/private/content` (Encrypted JSON) | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store` |
| **Relationship Timeline (2020–2026)** | `content/timeline.ts` (Static JS chunks) | Server-side `lib/content/server-content.ts` | `/api/private/content` (Encrypted JSON) | `requireAccess()` asserting AAL2 + Allowlist | `private, no-store` |
| **Public Branding & Icons** | `public/favicon.ico`, `public/robots.txt` | `public/` (Unchanged) | Direct static CDN | Public (No private data) | Standard public CDN caching |

---

## 2. Audio Integrity Verification

The two authentic master audio tracks were hashed before and after migration to ensure zero bit rot, corruption, or format deviation:

- **Track 1 (`alfaaz.m4a`):**
  - Expected SHA256: `dca208d04e74181efae22de9238431a695446cb6e7601143bd22c899ca90ae66`
  - Migrated SHA256: `dca208d04e74181efae22de9238431a695446cb6e7601143bd22c899ca90ae66`
  - Match: **100% Exact Match**
- **Track 2 (`dilruba-dilnasee.mp3`):**
  - Expected SHA256: `ea441b0b7b9d6f3498b247a0bbefaa845443a1143d7423950e885d1b6c51ff0e`
  - Migrated SHA256: `ea441b0b7b9d6f3498b247a0bbefaa845443a1143d7423950e885d1b6c51ff0e`
  - Match: **100% Exact Match**

---

## 3. HTTP Range Streaming Guarantee

Audio streaming over `/api/media/audio/[...path]` fully implements RFC 7233 Range requests:
- Handles `Range: bytes=start-end`
- Emits `HTTP 206 Partial Content` with `Content-Range: bytes start-end/totalSize`
- Sets `Accept-Ranges: bytes`
- Enables native seeking, scrubbing, and seamless playback in mobile Safari (iOS) and Chrome (Android).
