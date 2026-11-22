/**
 * Server-Side Authentication & Session Verification for K & N
 * Validates the anniversary passcode and issues secure HMAC-SHA256 session tokens.
 */

export const SESSION_COOKIE_NAME = 'kn_session';
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
export const DEFAULT_ACCESS_CODE = '23112020'; // 23 November 2020

function getSecretKey(): string {
  return (
    process.env.ANNIVERSARY_SESSION_SECRET ||
    'kn-anniversary-20201123-secret-key-celebrating-six-years-together'
  );
}

/**
 * Normalizes input passcode by trimming whitespace and removing slashes, dashes, spaces, and dots.
 * E.g., "23 / 11 / 2020" -> "23112020", "23-11-2020" -> "23112020"
 */
export function normalizePasscode(input: string): string {
  if (!input) return '';
  return input.trim().replace(/[\/\-\s\.]/g, '');
}

/**
 * Validates the submitted passcode against the server-side environment variable.
 */
export function validatePasscode(input: string): boolean {
  const normalizedInput = normalizePasscode(input);
  const serverCode = normalizePasscode(process.env.ANNIVERSARY_ACCESS_CODE || DEFAULT_ACCESS_CODE);
  return normalizedInput === serverCode && normalizedInput.length > 0;
}

/**
 * Creates an HMAC-SHA256 signature using the Web Crypto API.
 * 100% compatible with Edge runtime, Node.js, and browser runtimes.
 */
async function createHmacSignature(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a signed session token: `${expiresAt}.${signature}`
 */
export async function generateSessionToken(): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const signature = await createHmacSignature(expiresAt.toString(), getSecretKey());
  return `${expiresAt}.${signature}`;
}

/**
 * Verifies a session token string.
 * Returns true if the token is valid, unexpired, and authentic.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [expiresAtStr, providedSignature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || expiresAt <= Date.now()) {
    return false; // Expired or malformed timestamp
  }

  try {
    const expectedSignature = await createHmacSignature(expiresAtStr, getSecretKey());
    // Constant time string comparison
    if (expectedSignature.length !== providedSignature.length) {
      return false;
    }
    let match = true;
    for (let i = 0; i < expectedSignature.length; i++) {
      if (expectedSignature[i] !== providedSignature[i]) {
        match = false;
      }
    }
    return match;
  } catch {
    return false;
  }
}
