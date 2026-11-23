import { NextRequest, NextResponse } from 'next/server';
import { verifySession, revokeSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { logSecurityEvent, hashIp } from '@/lib/auth/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ipHash = hashIp(ip);

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    const verification = await verifySession(token);
    if (verification.valid && verification.payload) {
      await revokeSessionToken(verification.payload.jti);
      logSecurityEvent({
        event: 'SESSION_REVOKED',
        userId: verification.payload.sub,
        ipHash,
        reason: 'User logged out and session revoked',
      });
    }
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });

  // Clear session cookie across all variations
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  response.cookies.set({
    name: 'kn_session',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
