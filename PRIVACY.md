# Privacy, Security & Data Sovereignty Policy

### Project: K & N — Six Years, One Story
**Dedicated to:** Nasreen  
**Author:** Kausik  
**Milestone:** 23 November 2020 → 23 November 2026

---

## 1. Local-Only Processing Guarantee
- **Zero Cloud Vision AI:** All photographic analysis, resolution inspection, aspect ratio calculation, face safe-zone estimation, and color palette extraction were performed strictly **locally** using Python PIL on the author's local workstation.
- **No Third-Party APIs:** No photos, facial images, audio recordings, or personal letter texts were transmitted to external cloud servers, cloud vision models, face recognition databases, or third-party storage buckets.

---

## 2. Source Photo Integrity
- **Untouched Originals:** The original master photography directory `OurPictures/` is treated as strictly read-only.
- **Derived Assets Only:** All web-optimized representations reside in `public/images/our-story/` with no modification, compression artifacts, or metadata destruction of the master originals.

---

## 3. Client-Side Access Protection
- **Password Gate:** The entire anniversary website is protected by an elegant, client-side cryptographic password gate (`PasswordGate.tsx`).
- **Passcodes:**
  - `23112020` (Our anniversary date: 23 November 2020)
  - `2311` (Compact anniversary passcode)
- **Local Persistence:** Upon successful unlock, the session state is stored in the user's browser `localStorage` (`kn_unlocked = 'true'`), requiring zero external authentication providers or tracking cookies.

---

## 4. Audio & Media Isolation
- **Local Audio Assets:** All audio tracks (*Alfaaz* and *Dilruba Dilnasee*) are stored locally within the project's static directory (`public/audio/`).
- **Zero Streaming Tracking:** No audio data is queried through Spotify, Apple Music, or third-party telemetry. The Web Audio playback engine runs 100% in-browser.

---

## 5. Deployment Recommendation
- When deploying to production (e.g., Vercel, Netlify, or self-hosted server):
  1. Maintain the password gate active.
  2. Ensure `robots.txt` disallows all web crawlers (`Disallow: /`) and headers include `X-Robots-Tag: noindex, nofollow, noarchive`.
  3. Ensure environment variables and personal data remain private to Kausik and Nasreen.
