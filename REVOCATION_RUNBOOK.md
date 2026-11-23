# K & N Security — Access Revocation Runbook (`REVOCATION_RUNBOOK.md`)

**Target Audience:** Platform Owner (Kausik)  
**Objective:** Immediately terminate access and purge session tokens if a device is stolen, compromised, or access must be revoked.

---

## 1. Instant User Revocation

To revoke access for an account immediately:

```bash
npx tsx scripts/admin-provision.ts revoke --id "usr_nasreen_viewer"
```

### What Happens Instantly:
1. The user's status is changed from `active` to `revoked` in `auth_allowlist.json`.
2. Every subsequent request to `/api/private/content`, `/api/media/[...path]`, or any page immediately invokes `requireAccess()`.
3. `requireAccess()` verifies the user's status in the allowlist on **every single request**.
4. The revoked user receives `403 Forbidden` on their very next click or background poll.
5. All cached media and content requests fail closed immediately.

---

## 2. Emergency Global Session Flush

If you suspect the session signing key or environment was compromised:

### Step 1: Rotate `ANNIVERSARY_SESSION_SECRET`
1. Generate a new 64-character high-entropy secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Update `ANNIVERSARY_SESSION_SECRET` in Vercel Environment Variables.
3. Trigger a redeployment.

### Result:
- **100% of all existing session tokens** across all devices immediately fail signature validation.
- All users must re-authenticate with primary credentials and MFA.

---

## 3. Individual Device / Session Logout
Users can re-lock or log out directly from the website:
- Floating Navigation Bar: Click the **Lock** button.
- Section 13 (Finale): Click **Lock Story**.
- The server invalidates the cryptographic `jti` in the server revocation registry and clears the cookie.
