import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import { verifyTotpToken } from '@/lib/auth/totp';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { checkRateLimit, recordAttempt, resetRateLimit } from '@/lib/auth/rate-limiter';
import { logSecurityEvent, hashIp } from '@/lib/auth/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ipHash = hashIp(ip);

  // 1. Verify caller has completed primary factor (AAL1 session)
  const access = await requireAccess(request, { allowAal1: true });
  if (!access.authorized || !access.user) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { user } = access;

  // 2. MFA Rate Limiting (max 5 attempts per 10 min)
  const rateKey = `mfa:totp:${user.userId}`;
  const rate = checkRateLimit(rateKey, {
    maxAttempts: 5,
    windowMs: 10 * 60 * 1000,
    lockoutMs: 15 * 60 * 1000,
  });

  if (!rate.allowed) {
    logSecurityEvent({ event: 'RATE_LIMIT_EXCEEDED', userId: user.userId, ipHash, reason: 'TOTP rate limit exceeded' });
    return NextResponse.json(
      { error: 'Too many incorrect verification attempts. Please wait 15 minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid verification code.' },
        { status: 400 }
      );
    }

    if (!user.totpSecret) {
      return NextResponse.json(
        { error: 'TOTP factor is not enrolled for this account.' },
        { status: 400 }
      );
    }

    // 3. Verify TOTP Code
    const isValid = verifyTotpToken(user.totpSecret, user.email, code);

    if (!isValid) {
      recordAttempt(rateKey, { maxAttempts: 5, windowMs: 10 * 60 * 1000, lockoutMs: 15 * 60 * 1000 });
      logSecurityEvent({ event: 'MFA_FAILED', userId: user.userId, ipHash, reason: 'Invalid TOTP code' });
      return NextResponse.json(
        { error: 'Invalid verification code. Try once more.' },
        { status: 401 }
      );
    }

    // Reset rate limiter on success
    resetRateLimit(rateKey);

    // 4. Upgrade Session to AAL2 (Full Authenticated Access for 7 Days)
    const aal2Token = await createSessionToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
      aal: 'aal2',
      amr: ['password', 'totp'],
    });

    logSecurityEvent({
      event: 'MFA_VERIFIED',
      userId: user.userId,
      ipHash,
      reason: 'TOTP factor verified successfully. AAL2 session established.',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Authentication successful. Welcome to Our Little World.',
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        aal: 'aal2',
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: aal2Token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (err) {
    console.error('TOTP verification error:', err);
    return NextResponse.json({ error: 'Verification failed.' }, { status: 500 });
  }
}
