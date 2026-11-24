/**
 * Administrative Provisioning Script for K & N
 * Executed only by the owner from the CLI or secure server environment.
 * Never accessible via public routes.
 *
 * Usage:
 *   npx tsx scripts/admin-provision.ts add --id usr_nasreen --email her@example.com --role viewer --password "SecretPass123"
 *   npx tsx scripts/admin-provision.ts list
 *   npx tsx scripts/admin-provision.ts export
 *   npx tsx scripts/admin-provision.ts revoke --id usr_nasreen
 */

import { upsertUser, listAuthorizedUserIds, getUserById, revokeUser } from '../lib/auth/allowlist';
import { generateTotpSetup } from '../lib/auth/totp';
import { generateRecoveryCodes } from '../lib/auth/recovery';
import { AuthorizedUser, UserRole } from '../lib/auth/types';
import crypto from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help') {
    console.log(`
K & N Security Provisioning Tool
Commands:
  add       Add or update an authorized user with TOTP & recovery codes
  revoke    Revoke an authorized user
  list      List currently provisioned authorized users
  export    Export JSON string for AUTHORIZED_USERS_JSON environment variable

Flags for add:
  --id        Immutable unique User ID (e.g. usr_kausik_admin, usr_nasreen_viewer)
  --email     User email address (advisory identity)
  --role      owner | viewer (default: viewer)
  --password  Initial strong password
`);
    return;
  }

  function getArg(flag: string): string | undefined {
    const idx = args.indexOf(flag);
    if (idx !== -1 && args[idx + 1]) {
      return args[idx + 1];
    }
    return undefined;
  }

  if (command === 'list') {
    const ids = await listAuthorizedUserIds();
    console.log(`\nAuthorized Users (${ids.length}):`);
    for (const id of ids) {
      const u = await getUserById(id);
      if (u) {
        console.log(`  - [${u.role.toUpperCase()}] ID: ${u.userId} | Email: ${u.email} | Status: ${u.status} | Factors: ${u.enrolledFactors.join(', ')}`);
      }
    }
    return;
  }

  if (command === 'export') {
    const ids = await listAuthorizedUserIds();
    const map: Record<string, AuthorizedUser> = {};
    for (const id of ids) {
      const u = await getUserById(id);
      if (u) map[id] = u;
    }
    console.log(JSON.stringify(map));
    return;
  }

  if (command === 'revoke') {
    const id = getArg('--id');
    if (!id) {
      console.error('Error: --id is required for revoke');
      process.exit(1);
    }
    await revokeUser(id);
    console.log(`User ${id} has been revoked.`);
    return;
  }

  if (command === 'add') {
    const userId = getArg('--id');
    const email = getArg('--email');
    const role = (getArg('--role') || 'viewer') as UserRole;
    const password = getArg('--password');

    if (!userId || !email || !password) {
      console.error('Error: --id, --email, and --password are required');
      process.exit(1);
    }

    const passwordHash = crypto.createHash('sha256').update(password.trim()).digest('hex');
    const { secret: totpSecret, uri: totpUri, qrCodeDataUrl } = await generateTotpSetup(email);
    const { plaintextCodes, hashedCodes } = generateRecoveryCodes(8);

    const user: AuthorizedUser = {
      userId,
      role,
      email: email.trim().toLowerCase(),
      emailVerified: true,
      status: 'active',
      passwordHash,
      enrolledFactors: ['totp'],
      totpSecret,
      webauthnCredentials: [],
      recoveryCodes: hashedCodes,
      createdAt: Date.now(),
    };

    await upsertUser(user);

    // Generate terminal QR code for easy scanning
    let terminalQr = '';
    try {
      terminalQr = await QRCode.toString(totpUri, { type: 'terminal', small: true });
    } catch {
      // Ignore if terminal doesn't support
    }

    // Save a local HTML file so user can view QR in browser
    const htmlPath = path.join(process.cwd(), '.system_generated', `qr-${userId}.html`);
    const htmlContent = `<!DOCTYPE html>
<html>
<head><title>TOTP Setup - ${userId}</title></head>
<body style="background:#1a050f;color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;">
  <h2>Scan with Google Authenticator or Apple Passwords</h2>
  <img src="${qrCodeDataUrl}" style="border:8px solid #fff;border-radius:12px;margin:20px 0;" />
  <p>Manual Key: <code style="background:#331020;padding:6px 12px;border-radius:6px;font-size:16px;">${totpSecret}</code></p>
  <p style="color:#aaa;font-size:13px;">K & N Anniversary Platform</p>
</body>
</html>`;
    try {
      fs.writeFileSync(htmlPath, htmlContent, 'utf-8');
    } catch {}

    console.log('\n======================================================');
    console.log(`✅ Successfully Provisioned Authorized User: ${userId}`);
    console.log('======================================================');
    console.log(`Role:            ${role}`);
    console.log(`Email:           ${email}`);
    console.log(`TOTP Secret:     ${totpSecret}`);
    console.log(`TOTP URI:        ${totpUri}`);
    if (terminalQr) {
      console.log('\nScan with Google Authenticator or Apple Passwords:');
      console.log(terminalQr);
    }
    console.log(`\nBrowser QR View: file:///${htmlPath.replace(/\\/g, '/')}`);
    console.log('\nSingle-Use Recovery Codes (STORE OFFLINE SAFELY):');
    plaintextCodes.forEach((code, idx) => console.log(`  ${idx + 1}. ${code}`));
    console.log('======================================================\n');
    return;
  }
}

main().catch(console.error);
