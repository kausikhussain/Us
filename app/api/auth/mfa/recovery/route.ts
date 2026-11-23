import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import { redeemRecoveryCode } from '@/lib/auth/recovery';
import { upsertUser } from '@/lib/auth/allowlist';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { checkRateLimit, recordAttempt, resetRateLimit } from '@/lib/auth/rate-limiter';
import { logSecurityEvent, hashIp } from '@/lib/auth/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ipHash = hashIp(ip);

  // Require primary factor (AAL1 session)
  const access = await requireAccess(request, { allowAal1: true });
  if (!access.authorized || !access.user) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { user } = access;

  // Rate Limiting (max 3 attempts per 15 min)
  const rateKey = `mfa:recovery:${user.userId}`;
  const rate = checkRateLimit(rateKey, {
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000,
    lockoutMs: 30 * 60 * 1000,
  });

  if (!rate.allowed) {
    logSecurityEvent({ event: 'RATE_LIMIT_EXCEEDED', userId: user.userId, ipHash, reason: 'Recovery rate limit exceeded' });
    return NextResponse.json(
      { error: 'Too many recovery attempts. Please wait 30 minutes.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { recoveryCode } = body;

    if (!recoveryCode || typeof recoveryCode !== 'string') {
      return NextResponse.json({ error: 'Invalid recovery code.' }, { status: 400 });
    }

    const { valid, updatedCodes } = redeemRecoveryCode(recoveryCode, user.recoveryCodes || []);

    if (!valid) {
      recordAttempt(rateKey, { maxAttempts: 3, windowMs: 15 * 60 * 1000, lockoutMs: 30 * 60 * 1000 });
      logSecurityEvent({ event: 'MFA_FAILED', userId: user.userId, ipHash, reason: 'Invalid or already used recovery code' });
      return NextResponse.json(
        { error: 'Invalid or already used recovery code.' },
        { status: 401 }
      );
    }

    // Burn the code by updating user record
    user.recoveryCodes = updatedCodes;
    await upsertUser(user);
    resetRateLimit(rateKey);

    // Upgrade session to AAL2
    const aal2Token = await createSessionToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
      aal: 'aal2',
      amr: ['password', 'recovery_code'],
    });

    logSecurityEvent({
      event: 'RECOVERY_CODE_USED',
      userId: user.userId,
      ipHash,
      reason: 'Single-use recovery code redeemed. AAL2 session established.',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Recovery verified. Please register a new passkey or TOTP factor.',
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
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    console.error('Recovery error:', err);
    return NextResponse.json({ error: 'Recovery failed.' }, { status: 500 });
  }
}
