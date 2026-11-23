# K & N Anniversary Platform — Environment Variable Specification (`ENVIRONMENT.md`)

**Date:** 23 November 2026  
**Classification:** Confidential DevOps & Security Architecture  

---

## 1. Overview

The K & N Anniversary Platform uses zero hardcoded credentials and strictly fails closed. Every deployment (Localhost, Preview, Production) requires specific environment variables configured in its runtime environment.

All secrets must be cryptographically generated with high entropy.

---

## 2. Environment Variables Specification

| Variable Name | Required | Type | Sensitivity | Default / Format | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ANNIVERSARY_SESSION_SECRET` | **YES** | String (Hex/Base64) | **CRITICAL SECRET** | 64+ char random hex string | Key for HMAC-SHA256 signing of JWT session tokens (`AAL1` & `AAL2`). If rotated, all active sessions are immediately invalidated. |
| `AUTHORIZED_USERS_JSON` | **YES (Prod)** | JSON String | **CRITICAL SECRET** | JSON array of `AuthorizedUser` | Serverless-durable allowlist containing user IDs, hashed primary passkeys, salt, TOTP secret, and recovery code hashes. Kept in Vercel Encrypted Environment Variables. |
| `WEBAUTHN_RPID` | **YES** | String | Public / Config | `k-and-n-gold.vercel.app` (Prod) / `localhost` (Dev) | FIDO2 Relying Party ID matching host domain for WebAuthn passkey attestation and assertion. |
| `WEBAUTHN_ORIGIN` | **YES** | String | Public / Config | `https://k-and-n-gold.vercel.app` (Prod) / `http://localhost:3000` (Dev) | Fully qualified origin for WebAuthn client challenge validation. |
| `WEBAUTHN_RPNAME` | No | String | Public / Config | `"K & N Anniversary"` | Display name shown on Apple Passwords / Google Authenticator prompt when creating passkey. |
| `NEXT_PUBLIC_TIMEZONE` | No | String | Public / Config | `Asia/Kolkata` | Milestone reference timezone for live milestone countdown. |

---

## 3. Production Configuration Checklist (Vercel)

1. Open **Vercel Dashboard** → `k-and-n` project → **Settings** → **Environment Variables**.
2. Add `ANNIVERSARY_SESSION_SECRET` as an encrypted Secret across **Production** and **Preview**.
3. Run `npm run admin:provision` locally to generate `AUTHORIZED_USERS_JSON`. Paste into Vercel settings.
4. Set `WEBAUTHN_RPID` to `k-and-n-gold.vercel.app`.
5. Set `WEBAUTHN_ORIGIN` to `https://k-and-n-gold.vercel.app`.
6. Redeploy application to apply new configuration.
