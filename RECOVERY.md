# K & N Security — Emergency Account Recovery Runbook (`RECOVERY.md`)

**Classification:** Security Architecture & Emergency Recovery  

---

## 1. Recovery Philosophy

In a high-security MFA system, the greatest risk is **accidental permanent lockout** of the intended recipient (e.g., Nasreen upgrades her phone or loses authenticator data).

**Security Guardrail:**
> *Recovery must NEVER silently bypass MFA. It must use high-entropy single-use cryptographic recovery codes or verified owner-mediated re-enrolment.*

---

## 2. Single-Use Recovery Codes

During user provisioning (`scripts/admin-provision.ts`), 8 cryptographic single-use recovery codes are minted:
```text
Example:
  1. 7F3A-8B12-9C04
  2. D4E1-6A79-3F20
  3. A1C8-5B32-7E90
  ...
```

### Properties:
1. **High Entropy:** 12 hexadecimal characters formatted with hyphens.
2. **Server-Side Hashing:** Only the SHA-256 hash of each code is stored in the database/allowlist. Plaintext is never stored.
3. **Single-Use Burning:** Once a recovery code is successfully redeemed, it is marked `used: true` and can never be used again.

### How to Use Recovery Codes:
1. On the login screen, enter email and password.
2. At the MFA step, click **"Use recovery code"**.
3. Enter one unused code (e.g. `7F3A-8B12-9C04`).
4. The system validates the hash, burns the code, establishes a valid AAL2 session, and logs the event (`RECOVERY_CODE_USED`).

---

## 3. Owner-Mediated Emergency Recovery (Out-of-Band)

If all recovery codes are lost or unaccessible:
1. Kausik (Owner) logs into the server/CLI.
2. Generates a new TOTP secret or resets credentials using:
   ```bash
   npx tsx scripts/admin-provision.ts add --id "usr_nasreen_viewer" --email "her_email@example.com" --role viewer --password "NewTemporaryPassword!"
   ```
3. Out-of-band (in person or secure voice call), Kausik provides her with the new setup QR code.
4. Old sessions and credentials are automatically superseded.
