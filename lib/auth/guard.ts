/**
 * Central Server-Side Authorization Guard (`requireAccess`)
 * Defence in depth: must be called by every route handler, server component,
 * server action, and media streaming endpoint.
 *
 * Enforces:
 * 1. Cryptographic token validity
 * 2. Unrevoked session status
 * 3. Verified email identity
 * 4. Immutable allowlist authorization
 * 5. Multi-factor authentication assurance level (AAL2)
 *
 * Fails closed on any discrepancy or network/infrastructure failure.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE_NAME } from './session';
import { getUserById } from './allowlist';
import { AuthorizedUser, SessionTokenPayload } from './types';
import { logSecurityEvent, hashIp } from './audit-logger';

export interface AccessResult {
  authorized: boolean;
  user?: AuthorizedUser;
  payload?: SessionTokenPayload;
  errorResponse?: NextResponse;
}

export async function requireAccess(
  request: NextRequest,
  options?: { requiredRole?: 'owner' | 'viewer'; allowAal1?: boolean }
): Promise<AccessResult> {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ipHash = hashIp(ip);

  // 1. Extract session cookie
  const cookie =
    request.cookies.get(SESSION_COOKIE_NAME)?.value ||
    request.cookies.get('__Host-kn_session')?.value ||
    request.cookies.get('kn_session')?.value;
  if (!cookie) {
    logSecurityEvent({ event: 'ACCESS_DENIED', ipHash, reason: 'Missing session cookie' });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized. Authentication required.' },
        { status: 401 }
      ),
    };
  }

  // 2. Cryptographic signature and expiration check
  const verification = await verifySession(cookie);
  if (!verification.valid || !verification.payload) {
    logSecurityEvent({
      event: 'ACCESS_DENIED',
      ipHash,
      reason: verification.reason || 'Invalid cryptographic token',
    });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Unauthorized. Invalid or expired session.' },
        { status: 401 }
      ),
    };
  }

  const { payload } = verification;

  // 3. User allowlist check
  const user = await getUserById(payload.sub);
  if (!user || user.status !== 'active') {
    logSecurityEvent({
      event: 'ACCESS_DENIED',
      userId: payload.sub,
      ipHash,
      reason: 'User not active on allowlist',
    });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Forbidden. Access restricted.' },
        { status: 403 }
      ),
    };
  }

  // 4. Email verification check
  if (!user.emailVerified) {
    logSecurityEvent({
      event: 'ACCESS_DENIED',
      userId: payload.sub,
      ipHash,
      reason: 'Email not verified',
    });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Forbidden. Verified email identity required.' },
        { status: 403 }
      ),
    };
  }

  // 5. Strict MFA Assurance Level (AAL2) Check
  // AAL1 represents primary factor only (password/email challenge).
  // AAL2 represents MFA verified (Passkey or TOTP or Recovery code).
  if (!options?.allowAal1 && payload.aal !== 'aal2') {
    logSecurityEvent({
      event: 'ACCESS_DENIED',
      userId: payload.sub,
      ipHash,
      reason: 'MFA assurance level AAL2 not satisfied',
    });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Forbidden. Multi-factor authentication required.' },
        { status: 403 }
      ),
    };
  }

  // 6. Role check if specified
  if (options?.requiredRole && user.role !== options.requiredRole && user.role !== 'owner') {
    logSecurityEvent({
      event: 'ACCESS_DENIED',
      userId: payload.sub,
      ipHash,
      reason: `Insufficient role: requires ${options.requiredRole}`,
    });
    return {
      authorized: false,
      errorResponse: NextResponse.json(
        { error: 'Forbidden. Insufficient permissions.' },
        { status: 403 }
      ),
    };
  }

  // Access Granted
  return { authorized: true, user, payload };
}
