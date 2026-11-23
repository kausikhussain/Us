/**
 * RFC 6238 TOTP Multi-Factor Authentication
 * Utilizes maintained standard `otpauth` library.
 */

import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

export function createTotpInstance(secret: string, email: string) {
  return new OTPAuth.TOTP({
    issuer: 'K & N Anniversary',
    label: email,
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
}

/**
 * Generates a new random base32 TOTP secret and QR code URI
 */
export async function generateTotpSetup(email: string): Promise<{
  secret: string;
  uri: string;
  qrCodeDataUrl: string;
}> {
  const secretObj = new OTPAuth.Secret({ size: 20 });
  const secret = secretObj.base32;

  const totp = createTotpInstance(secret, email);
  const uri = totp.toString();
  const qrCodeDataUrl = await QRCode.toDataURL(uri, {
    margin: 2,
    color: { dark: '#2A0C17', light: '#FFFDFD' },
  });

  return { secret, uri, qrCodeDataUrl };
}

/**
 * Validates a 6-digit TOTP code against the secret (window: +/- 1 step = 30s)
 */
export function verifyTotpToken(secret: string, email: string, token: string): boolean {
  if (!token || !secret) return false;
  const cleanToken = token.trim().replace(/\s/g, '');
  if (!/^\d{6}$/.test(cleanToken)) return false;

  try {
    const totp = createTotpInstance(secret, email);
    // Delta null indicates invalid token, number indicates match window step
    const delta = totp.validate({ token: cleanToken, window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}
