/**
 * Cryptographic Session Engine using JOSE (RFC 7519)
 * Enforces idle timeouts, absolute lifetimes, token revocation, and AAL assurance.
 */

import { SignJWT, jwtVerify } from 'jose';
import { SessionTokenPayload, AuthAssuranceLevel, UserRole } from './types';
import { getUserById } from './allowlist';
import fs from 'fs';
import path from 'path';

export const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Host-kn_session' : 'kn_session';

export const ABSOLUTE_LIFETIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
export const IDLE_TIMEOUT_MS = 60 * 60 * 1000; // 60 minutes
export const ISSUER = 'kn-auth-engine';
export const AUDIENCE = 'kn-anniversary';

const REVOKED_TOKENS_PATH = path.join(process.cwd(), '.system_generated', 'revoked_tokens.json');

function getSecretKey(): Uint8Array {
  const secret =
    process.env.ANNIVERSARY_SESSION_SECRET ||
    'kn-anniversary-20201123-secret-key-celebrating-six-years-together-ultra-secure-key';
  return new TextEncoder().encode(secret);
}

function loadRevokedTokens(): Set<string> {
  try {
    if (fs.existsSync(REVOKED_TOKENS_PATH)) {
      const data = JSON.parse(fs.readFileSync(REVOKED_TOKENS_PATH, 'utf-8'));
      return new Set(data);
    }
  } catch {
    // Return empty on error
  }
  return new Set();
}

function saveRevokedTokens(set: Set<string>) {
  try {
    const dir = path.dirname(REVOKED_TOKENS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(REVOKED_TOKENS_PATH, JSON.stringify(Array.from(set)), 'utf-8');
  } catch {
    // Handle error
  }
}

/**
 * Revokes a session token by its cryptographic JTI
 */
export async function revokeSessionToken(jti: string): Promise<void> {
  const revoked = loadRevokedTokens();
  revoked.add(jti);
  saveRevokedTokens(revoked);
}

export const revokeTokenJti = revokeSessionToken;

/**
 * Generates a signed session JWT
 */
export async function createSessionToken(params: {
  userId: string;
  email: string;
  role: UserRole;
  aal: AuthAssuranceLevel;
  amr?: string[];
}): Promise<string> {
  const now = Date.now();
  const jti = globalThis.crypto.randomUUID();
  const idleExp = now + IDLE_TIMEOUT_MS;

  const payload: SessionTokenPayload = {
    sub: params.userId,
    email: params.email,
    role: params.role,
    aal: params.aal,
    amr: params.amr || [params.aal],
    jti,
    idleExp,
  };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(Math.floor(now / 1000))
    .setExpirationTime(Math.floor((now + ABSOLUTE_LIFETIME_MS) / 1000))
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .sign(getSecretKey());

  return token;
}

/**
 * Verifies a session token string.
 * Validates cryptographic signature, issuer, audience, expiration, idle timeout,
 * revocation status, and user allowlist status.
 */
export async function verifySession(token: string | undefined | null): Promise<{
  valid: boolean;
  payload?: SessionTokenPayload;
  reason?: string;
}> {
  if (!token || typeof token !== 'string') {
    return { valid: false, reason: 'Missing token' };
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    });

    const sessionPayload = payload as unknown as SessionTokenPayload;

    // Check JTI revocation
    const revokedTokens = loadRevokedTokens();
    if (revokedTokens.has(sessionPayload.jti)) {
      return { valid: false, reason: 'Token revoked' };
    }

    // Check server-enforced idle timeout
    if (sessionPayload.idleExp && Date.now() > sessionPayload.idleExp) {
      return { valid: false, reason: 'Idle timeout exceeded' };
    }

    // Check user status in server allowlist
    const user = await getUserById(sessionPayload.sub);
    if (!user || user.status !== 'active') {
      return { valid: false, reason: 'User not authorized or revoked' };
    }

    return { valid: true, payload: sessionPayload };
  } catch (err: unknown) {
    const error = err as Error;
    return { valid: false, reason: error.message || 'Invalid cryptographic signature' };
  }
}

export const verifySessionToken = verifySession;
