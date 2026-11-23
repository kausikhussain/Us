import { jwtVerify } from 'jose';
import type { SessionTokenPayload } from './types';

export const SESSION_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? '__Host-kn_session' : 'kn_session';

export const ISSUER = 'kn-auth-engine';
export const AUDIENCE = 'kn-anniversary';

function getSecretKey(): Uint8Array {
  const secret =
    process.env.ANNIVERSARY_SESSION_SECRET ||
    'kn-anniversary-20201123-secret-key-celebrating-six-years-together-ultra-secure-key';
  return new TextEncoder().encode(secret);
}

/**
 * Lightweight Edge-safe session validator for Next.js Middleware.
 * Zero Node.js filesystem or crypto dependencies; runs purely on Web Standards.
 */
export async function verifyEdgeSession(token?: string | null): Promise<{
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

    // Check server-enforced idle timeout if present
    if (sessionPayload.idleExp && Date.now() > sessionPayload.idleExp) {
      return { valid: false, reason: 'Idle timeout exceeded' };
    }

    return { valid: true, payload: sessionPayload };
  } catch (err: unknown) {
    const error = err as Error;
    return { valid: false, reason: error.message || 'Invalid cryptographic signature' };
  }
}
