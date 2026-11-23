# K & N Security — Owner Provisioning Runbook (`PROVISIONING.md`)

**Target Audience:** Kausik (Platform Owner)  
**Security Classification:** Highly Confidential  
**Principle:** Least Privilege & Server-Side Allowlisting  

---

## 1. Overview

The K & N Anniversary Website enforces an **invitation-only** security model. Public user registration is permanently disabled. No one can register, log in, or view any private content unless their immutable User ID is explicitly provisioned in the server-side allowlist.

There are two authorized roles:
1. `owner` (**Kausik**) — Full access + administrative capabilities (invite, revoke, audit).
2. `viewer` (**Nasreen**) — Read-only intimate access to the love letters, quotes, timeline, and media.

---

## 2. Provisioning Real Identities (CLI Method)

To provision yourself or Nasreen without committing credentials to Git:

### Step 1: Provision the Owner Account (Kausik)
Run the following command in your local terminal:
```bash
npx tsx scripts/admin-provision.ts add \
  --id "usr_kausik_owner" \
  --email "your_real_email@example.com" \
  --role "owner" \
  --password "YourStrongUniquePassword123!"
```

### Step 2: Provision the Viewer Account (Nasreen)
```bash
npx tsx scripts/admin-provision.ts add \
  --id "usr_nasreen_viewer" \
  --email "nasreen_real_email@example.com" \
  --role "viewer" \
  --password "HerStrongSecretPassword123!"
```

### What Happens Automatically:
1. Generates an RFC 6238 TOTP base32 secret and an `otpauth://` setup URI.
2. Generates an ASCII/base64 QR Code to scan into Apple Passwords, Google Authenticator, or 1Password.
3. Generates **8 single-use high-entropy recovery codes** (e.g. `B92F-4A1C-88E2`).
4. Securely hashes passwords with SHA-256 and recovery codes before storing.
5. Saves the record to `.system_generated/auth_allowlist.json`.

---

## 3. Configuring Production Environment on Vercel

In production on Vercel, the allowlist is securely read from the encrypted environment variable `AUTHORIZED_USERS_JSON`.

### Step 1: Copy Allowlist Payload
Run:
```bash
node -e "console.log(JSON.stringify(require('./.system_generated/auth_allowlist.json')))"
```

### Step 2: Add to Vercel Environment Variables
1. Go to your **Vercel Dashboard** → Select **k-and-n** project → **Settings** → **Environment Variables**.
2. Key: `AUTHORIZED_USERS_JSON`
3. Value: Paste the JSON output string from Step 1.
4. Target: `Production` and `Preview`.
5. Check **Sensitive / Encrypted** so it is hidden in the dashboard.
6. Click **Save**.

---

## 4. Listing and Verifying Provisioned Users

To inspect provisioned accounts:
```bash
npx tsx scripts/admin-provision.ts list
```
Output:
```text
Authorized Users (2):
  - [OWNER] ID: usr_kausik_owner | Email: kausik@... | Status: active | Factors: totp
  - [VIEWER] ID: usr_nasreen_viewer | Email: nasreen@... | Status: active | Factors: totp
```

---

## 5. Revoking an Identity

If a device is lost or access should be removed immediately:
```bash
npx tsx scripts/admin-provision.ts revoke --id "usr_nasreen_viewer"
```
Revocation takes effect **instantly across all active sessions**.
