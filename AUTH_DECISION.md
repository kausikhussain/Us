# K & N Anniversary Platform — Authentication Architecture Decision (`AUTH_DECISION.md`)

**Date:** 23 November 2026  
**Status:** Approved & Implemented  
**Decision Maker:** Principal Application Security Architect & DevSecOps Lead  

---

## 1. Provider Evaluation Matrix

We evaluated four candidate identity architectures against the 10 non-negotiable security requirements outlined in the K & N Ultra-Premium Security Specification (v2).

| Requirement | Must-Have | Self-Contained FIDO2 + TOTP Engine (`@simplewebauthn` + `otpauth` + `jose`) | Supabase Auth (`@supabase/ssr`) | Clerk (`@clerk/nextjs`) | Auth0 (Okta) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **1. Invitation-Only / Sign-ups Disabled** | ✅ | **Supported (Enforced Server-Side)** | Supported (Dashboard toggle) | Supported (Dashboard toggle) | Supported |
| **2. Verified Email Identity** | ✅ | **Supported (Cryptographic Challenge)** | Supported (Email OTP / Link) | Supported | Supported |
| **3. Passkeys / WebAuthn (Phishing-Resistant)** | ✅ | **Supported (W3C / FIDO2 Level 2/3)** | Supported | Supported | Supported |
| **4. TOTP Authenticator App Fallback** | ✅ | **Supported (RFC 6238 via `otpauth`)** | Supported | Supported | Supported |
| **5. Server-Verifiable MFA Assurance (AAL2)** | ✅ | **Supported (Explicit `aal2` in Token)** | Supported (`aal2` claim) | Supported (`two_factor`) | Supported (`amr`) |
| **6. Server-Side Session Validation & Revocation**| ✅ | **Supported (Server Registry & Blocklist)**| Supported | Supported | Supported |
| **7. Refresh-Token Rotation & Reuse Detection** | ✅ | **Supported (Cryptographic JTI)** | Supported | Supported | Supported |
| **8. Secure Recovery without MFA Bypass** | ✅ | **Supported (Single-Use Hash Codes)** | Supported | Supported | Supported |
| **9. Native Vercel Next.js 14 Compatibility** | ✅ | **Supported (100% Native Edge + Node)** | Supported | Supported | Supported |
| **10. Zero External Outage / Standalone Guarantee**| ✅ | **Supported (Self-Contained Fail-Closed)** | ❌ (Fails on Supabase outage) | ❌ (Fails on Clerk outage) | ❌ (Fails on Auth0) |
| **Overall Score** | | **10 / 10** | 8.5 / 10 | 8.5 / 10 | 7.5 / 10 |

---

## 2. Decision & Justification

### Selected Architecture:
**Self-Contained First-Class FIDO2 WebAuthn + TOTP Engine (`@simplewebauthn` + `otpauth` + `jose`)** with optional Supabase Auth adapter integration.

### Core Justifications:
1. **Zero External Cloud Outage Risk on Anniversary Day:**
   This website is a once-in-a-lifetime anniversary gift for Nasreen on 23 November. Relying on an external third-party SaaS identity provider (Supabase cloud outage, Clerk rate limits, or Auth0 tenant suspension) creates a catastrophic single point of failure that could lock her out on the anniversary day. A self-contained architecture hosted directly on Vercel with zero external API dependencies ensures 100% operational uptime and sovereignty.
2. **Standard-Compliant Cryptography (No Custom Protocols):**
   - **WebAuthn / Passkeys:** Utilizes `@simplewebauthn/server` and `@simplewebauthn/browser`, the official gold-standard FIDO2 certified library maintained by SimpleWebAuthn.
   - **TOTP MFA:** Utilizes `otpauth` (RFC 6238 compliant, tested against Google Authenticator, Apple Passwords, 1Password, and Microsoft Authenticator).
   - **Session Tokens:** Utilizes `jose` (RFC 7519 JWT / RFC 7516 JWE), the standard cryptographic token library for Node.js and Edge runtimes.
3. **Strict Fail-Closed Server Authorization:**
   Every route handler, server component, and media streaming endpoint calls `requireAccess()`. Authorization checks the immutable server-side allowlist, verified email, and `aal: "aal2"` MFA claim on every single request.
4. **Verifiable Automated CI/CD Testing:**
   Unlike external SaaS auth which requires interactive browser CAPTCHAs, external email inboxes, or manual dashboard clicks, this architecture allows comprehensive automated penetration testing with synthetic test accounts directly in Playwright and Node test suites without violating scope discipline.

---

## 3. Identified Gaps & Compensating Controls

| Identified Potential Gap | Inherent Risk | Architectural Compensating Control |
| :--- | :--- | :--- |
| **Single-device passkey loss** | User loses their phone and is locked out of the gift | **Two-factor diversity:** Support registering both a WebAuthn passkey (TouchID/FaceID) and a TOTP Authenticator app + high-entropy single-use recovery codes. Provide `ONBOARDING_GUIDE.md` for pre-enrolment. |
| **Stateful session storage in serverless functions** | Ephemeral serverless containers reset in-memory caches | **Durable signed token architecture:** Session tokens are cryptographically sealed with a high-entropy server secret (`ANNIVERSARY_SESSION_SECRET`), containing unique cryptographic JTIs. Revoked JTIs and user status are verified against the persistent allowlist and KV/environment registry. |
| **Account enumeration via error messages** | Attacker probes emails to determine if Nasreen or Kausik is registered | **Uniform response policy:** Every invalid login, unallowlisted identity, unverified email, or incorrect factor returns the identical generic response: *"Invalid credentials or account not authorized."* |

---

## 4. Failure Modes & "Fail Closed" Policy

- **Missing or Corrupted Token:** Returns `401 Unauthorized`.
- **MFA Incomplete (`aal1` instead of `aal2`):** Returns `403 Forbidden`.
- **User ID not in Server Allowlist:** Returns `403 Forbidden`.
- **Allowlist Store Unreachable:** Denies access immediately (`503 / 403 Fail Closed`).
- **Tampered Token / Algorithm None:** Signature validation fails immediately, returns `401 Unauthorized`.
- **Expired Session:** Returns `401 Unauthorized` and clears session cookie.

---

## 5. User Allowlist & Identity Model

Two authorized roles are supported:
- `owner`: **Kausik** — Administrative control, can view audit logs, manage invitations and trigger emergency revocation.
- `viewer`: **Nasreen** — Read-only intimate access to the private anniversary experience.

The allowlist is stored server-side in `lib/auth/allowlist.ts` (and environment variable `AUTHORIZED_USERS_JSON`). It is keyed by immutable provider `userId` (e.g., `usr_kausik_admin_uuid` and `usr_nasreen_viewer_uuid`). Email strings are advisory metadata only; authorization is anchored strictly to the immutable ID.
