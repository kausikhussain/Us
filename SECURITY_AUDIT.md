# K & N Anniversary Website — Comprehensive Security Audit (Pre-Change)

**Audit Date:** 23 November 2026  
**Auditor:** Principal Application Security Architect & Penetration Testing Team  
**Scope:** Repository `https://github.com/kausikhussain/Us.git` (commit `2803bf0`), Vercel Production Deployment (`https://k-and-n-gold.vercel.app`)  
**Standard:** OWASP ASVS 4.0, NIST SP 800-63B (AAL2), CIS Benchmarks  

---

## 1. Executive Summary

A comprehensive pre-change source code and infrastructure audit was conducted across the K & N Anniversary Website codebase, its build artefacts, and its deployment configurations.

While the application features world-class design, typography, and motion engineering, the pre-audit security architecture exhibits **critical vulnerabilities**:
1. Private letters and messages are embedded directly into client-side JavaScript bundles distributed to all visitors.
2. High-resolution personal photographs and licensed master audio tracks are served directly from the public CDN without authentication.
3. The existing access gate relies on a guessable anniversary date passcode (`23112020`).
4. Original unoptimized personal photos are tracked in the public Git history.

A total of **10 distinct security findings** were identified:
- **3 Critical Severity**
- **3 High Severity**
- **3 Medium Severity**
- **1 Low Severity**

---

## 2. Platform Architecture & Hosting Inventory

- **Frontend Framework:** Next.js 14.2.23 (App Router), React 18.3.1, Tailwind CSS 3.4.14.
- **Runtimes:** Vercel Serverless Functions (Node.js 20.x runtime for API route handlers) + Vercel Edge Runtime (for `middleware.ts`).
- **3D & Motion Stack:** Three.js 0.160.0, `@react-three/fiber` 8.16.8, `@react-three/drei` 9.105.6, GSAP 3.12.5, Framer Motion 11.11.11, Lenis 1.1.18.
- **Hosting & Infrastructure:** Vercel Global Edge Network with automated Git deployment integration (`kausikhussain/Us` on `main`).
- **Asset Storage:** Local disk repository (`public/` and `OurPictures/`), served via Next.js static asset handler.

---

## 3. Detailed Audit Findings & Evidence

### [SEC-01] CRITICAL: Private Love Letters & Messages Embedded in Public Client JavaScript Bundles
- **Location:**
  - `content/letters.ts` (lines 19–79): Contains all 3 keepsake love letters with intimate salutations, memories, and signatures.
  - `content/surprise.ts` (lines 18–29): Contains the confidential surprise message (*"In a life full of rushing hours..."*).
  - `content/quotes.ts` (lines 1–250): Contains 67 personal devotion quotes.
  - `components/MainStoryApp.tsx` (lines 14–27): Directly imports these components, causing Next.js compiler to bundle the plaintext contents into `_next/static/chunks/` files.
- **Vulnerability Mechanism:**
  Any unauthenticated user or automated crawler requesting the website can fetch `_next/static/chunks/*.js` and extract the complete plaintext of every private letter, quote, and secret message using a simple grep command, completely bypassing any frontend gate.
- **Remediation:** Remove static imports of private content from client bundles. Move content to server-side protected API routes (`/api/private/content`) that require an authenticated, MFA-verified session token (`requireAccess()`).

---

### [SEC-02] CRITICAL: Direct Unauthenticated Public Media Access via Edge CDN
- **Location:**
  - `public/images/our-story/` (49 personal portrait and couple photographs).
  - `public/audio/alfaaz.m4a` (6.8 MB master audio track).
  - `public/audio/dilruba-dilnasee.mp3` (7.0 MB master audio track).
  - `middleware.ts` (lines 10–15): Explicitly bypasses `/audio` and `/images`:
    ```ts
    if (pathname.startsWith('/audio') || pathname.startsWith('/images')) {
      return NextResponse.next();
    }
    ```
- **Vulnerability Mechanism:**
  Any request to `https://k-and-n-gold.vercel.app/images/our-story/together/IMG-20210516-WA0011.jpg` or `https://k-and-n-gold.vercel.app/audio/alfaaz.m4a` returns `HTTP 200 OK` with `Cache-Control: public, max-age=31536000, immutable`. Anyone with a link or scraper can download all photos and songs without authenticating.
- **Remediation:** Move all personal images and audio out of `/public/` into protected storage (`private_media/`). Serve exclusively through authenticated streaming endpoints (`/api/media/[...path]`) with `Cache-Control: private, no-store`.

---

### [SEC-03] CRITICAL: Original High-Resolution Photographs Tracked in Git Repository
- **Location:**
  - `OurPictures/` directory containing 49 original high-resolution personal images (e.g., `DSC_0111_1.JPG` at 7.5MB, `IMG_0724.JPG` at 8.7MB).
  - Tracked in Git history (commit `636c997` and earlier).
- **Vulnerability Mechanism:**
  Anyone with read access to the GitHub repository (or if the repository visibility changes) has immediate access to all raw unoptimized family and couple photographs with full EXIF metadata.
- **Remediation:** Remove `OurPictures/` from Git tracking, purge from Git history via filter-repo / git rm, add `OurPictures/` to `.gitignore`, and migrate needed assets to encrypted private storage.

---

### [SEC-04] HIGH: Guessable Anniversary Date Passcode & Legacy Bypass References
- **Location:**
  - `lib/auth.ts` (line 8): `export const DEFAULT_ACCESS_CODE = '23112020';`
  - `content/site.ts` (line 34): `accessPasscode: "23112020"`
  - `components/ui/PasswordGate.tsx` (lines 16, 29): `sessionStorage.getItem('kauseen_unlocked')`
  - `.env.example` (line 5): `ANNIVERSARY_ACCESS_CODE=23112020`
  - `PRIVACY.md` (line 25): `- 23112020 (Our anniversary date: 23 November 2020)`
- **Vulnerability Mechanism:**
  The relationship anniversary date is easily guessable by any friend, relative, or acquaintance. Relying on `23112020` provides trivial security.
- **Remediation:** Completely remove date-based passcode verification. Replace with individual cryptographic identity authentication (WebAuthn / Passkeys + TOTP MFA) restricted to an explicit server-side allowlist.

---

### [SEC-05] HIGH: Client-Side Session Hydration & Incomplete Middleware Protection
- **Location:**
  - `app/page.tsx` (lines 8–18): Passes `initialAuthenticated` to `AnniversaryGate`.
  - `components/ui/AnniversaryGate.tsx` (lines 28–39): If initial check is false, queries `/api/auth/session` on the client.
- **Vulnerability Mechanism:**
  Relying solely on middleware or client-side component wrappers without endpoint-level re-verification is vulnerable to middleware bypasses and state spoofing.
- **Remediation:** Enforce defence in depth. Every route handler and API endpoint must invoke a shared `requireAccess()` helper that verifies token signature, expiry, allowlist membership, and MFA level (AAL2).

---

### [SEC-06] HIGH: Open Historical Deployments on Vercel
- **Location:**
  - Previous deployment URLs (e.g., `k-and-3qo5atwtg-kausik1314s-projects.vercel.app`, `k-and-57cnad4pt-kausik1314s-projects.vercel.app`).
- **Vulnerability Mechanism:**
  Vercel preserves preview deployments indefinitely by default. Historical deployments serve older copies of public assets and allow access via legacy routes.
- **Remediation:** Delete legacy deployments from the Vercel project dashboard, enable Vercel Deployment Protection on preview branches, and rotate all credentials.

---

### [SEC-07] MEDIUM: Missing Content Security Policy (CSP) & Permissions-Policy
- **Location:** `next.config.js` (lines 8–32).
- **Vulnerability Mechanism:**
  The application sets `X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff`, but lacks a Content Security Policy (`Content-Security-Policy`), leaving the app vulnerable to XSS and clickjacking. `Permissions-Policy` and HSTS preload are also unconfigured.
- **Remediation:** Configure a robust CSP with explicit whitelists for Next.js, Three.js WebGL, Google Fonts, and the authentication provider. Set `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

---

### [SEC-08] MEDIUM: In-Memory Rate Limiting Failure in Serverless Environments
- **Location:** `/api/auth/verify` has no persistent rate limiting.
- **Vulnerability Mechanism:**
  Serverless function instances are ephemeral. In-memory counters reset on cold starts, allowing attackers to brute-force credentials across distributed serverless instances.
- **Remediation:** Implement durable IP and identifier rate limiting using a persistent store or provider-level protection with progressive backoff and temporary lockouts.

---

### [SEC-09] MEDIUM: Information Disclosure in Auth Error Messages
- **Location:**
  - `/api/auth/verify` returns specific messages distinguishing bad inputs vs errors.
- **Vulnerability Mechanism:**
  Detailed error messages allow attackers to enumerate valid identities, registered factors, or account states.
- **Remediation:** Standardize all authentication responses to generic copy: *"Invalid credentials or account not authorized."* Log granular diagnostics on the server only.

---

### [SEC-10] LOW: SessionStorage Usage for Audio Player Settings
- **Location:** `lib/audio.ts` (lines 26–30, 191–199).
- **Vulnerability Mechanism:**
  Volume and mute settings are written to `sessionStorage`. While non-sensitive, any sensitive data placed in web storage is vulnerable to DOM-based exfiltration.
- **Remediation:** Ensure no auth tokens or personal flags ever reside in `sessionStorage` or `localStorage`.

---

## 4. Severity Rating Summary

| Finding ID | Title | Severity | CVSS v3.1 | Status |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Private letters & messages bundled into static JS | **CRITICAL** | **9.1** | Pending Fix |
| **SEC-02** | Unauthenticated direct media access via CDN | **CRITICAL** | **8.6** | Pending Fix |
| **SEC-03** | Raw high-resolution personal photos in Git | **CRITICAL** | **7.5** | Pending Fix |
| **SEC-04** | Guessable anniversary date passcode (`23112020`) | **HIGH** | **7.4** | Pending Fix |
| **SEC-05** | Lack of endpoint-level server authorization guard | **HIGH** | **7.2** | Pending Fix |
| **SEC-06** | Active historical Vercel deployment URLs | **HIGH** | **6.5** | Pending Fix |
| **SEC-07** | Missing CSP and Permissions-Policy headers | **MEDIUM** | **5.3** | Pending Fix |
| **SEC-08** | Lack of durable serverless rate limiting | **MEDIUM** | **5.3** | Pending Fix |
| **SEC-09** | Potential account enumeration in error copy | **MEDIUM** | **4.3** | Pending Fix |
| **SEC-10** | Web storage hygiene for client state | **LOW** | **2.5** | Pending Fix |

---

## 5. Prioritized Remediation Roadmap

1. **Step 1 (Identity Architecture):** Implement strong authentication with WebAuthn/Passkeys and TOTP MFA, invitation-only allowlist.
2. **Step 2 (Server Authorization):** Create shared `requireAccess()` guard for every route handler and server action.
3. **Step 3 (Content Decoupling):** Extract private letters, quotes, and surprise text from client bundles to `/api/private/content`.
4. **Step 4 (Media Protection):** Relocate sensitive images and audio to `private_media/` with authenticated streaming (`/api/media/[...path]`).
5. **Step 5 (Session & Abuse Hardening):** Enforce HttpOnly secure cookies, server-side revocation, and durable rate limiting.
6. **Step 6 (Security Headers & CSP):** Enforce strict Content-Security-Policy, HSTS, Permissions-Policy.
7. **Step 7 (History & Legacy Cleanup):** Remove all date-passcode references and purge raw photos from Git.
8. **Step 8 (Automated Penetration Testing):** Execute test matrix on preview and production URLs.
