import { NextRequest, NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/auth/allowlist';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';
import { checkRateLimit, recordAttempt, resetRateLimit } from '@/lib/auth/rate-limiter';
import { logSecurityEvent, hashIp } from '@/lib/auth/audit-logger';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  const ipHash = hashIp(ip);

  // 1. IP-level rate limiting (max 10 attempts per 15 min, 15 min lockout)
  const ipRate = checkRateLimit(`login:ip:${ipHash}`, {
    maxAttempts: 10,
    windowMs: 15 * 60 * 1000,
    lockoutMs: 15 * 60 * 1000,
  });

  if (!ipRate.allowed) {
    logSecurityEvent({ event: 'RATE_LIMIT_EXCEEDED', ipHash, reason: 'IP rate limit exceeded' });
    return NextResponse.json(
      { error: 'Too many failed login attempts. Please wait 15 minutes before retrying.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Invalid credentials or account not authorized.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 2. Identifier-level rate limiting
    const idRate = checkRateLimit(`login:id:${normalizedEmail}`, {
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000,
      lockoutMs: 15 * 60 * 1000,
    });

    if (!idRate.allowed) {
      logSecurityEvent({ event: 'RATE_LIMIT_EXCEEDED', ipHash, reason: 'Identifier rate limit exceeded' });
      return NextResponse.json(
        { error: 'Too many failed login attempts. Please wait 15 minutes before retrying.' },
        { status: 429 }
      );
    }

    logSecurityEvent({ event: 'LOGIN_ATTEMPT', ipHash, reason: 'Authenticating primary factor' });

    // 3. User Allowlist Lookup
    const user = await getUserByEmail(normalizedEmail);

    // Uniform response policy: do not reveal if email exists or is allowlisted
    if (!user || user.status !== 'active' || !user.emailVerified) {
      recordAttempt(`login:ip:${ipHash}`, { maxAttempts: 10, windowMs: 15 * 60 * 1000, lockoutMs: 15 * 60 * 1000 });
      recordAttempt(`login:id:${normalizedEmail}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000, lockoutMs: 15 * 60 * 1000 });
      logSecurityEvent({ event: 'LOGIN_FAILURE', ipHash, reason: 'User not found or unverified' });
      return NextResponse.json(
        { error: 'Invalid credentials or account not authorized.' },
        { status: 401 }
      );
    }

    // 4. Password Verification
    // Uses crypto.timingSafeEqual on SHA-256 / scrypt hash
    const inputHash = crypto.createHash('sha256').update(password.trim()).digest('hex');
    const isPasswordValid = user.passwordHash && crypto.timingSafeEqual(
      Buffer.from(inputHash),
      Buffer.from(user.passwordHash)
    );

    if (!isPasswordValid) {
      recordAttempt(`login:ip:${ipHash}`, { maxAttempts: 10, windowMs: 15 * 60 * 1000, lockoutMs: 15 * 60 * 1000 });
      recordAttempt(`login:id:${normalizedEmail}`, { maxAttempts: 5, windowMs: 15 * 60 * 1000, lockoutMs: 15 * 60 * 1000 });
      logSecurityEvent({ event: 'LOGIN_FAILURE', userId: user.userId, ipHash, reason: 'Incorrect password' });
      return NextResponse.json(
        { error: 'Invalid credentials or account not authorized.' },
        { status: 401 }
      );
    }

    // Reset rate limits upon successful primary factor
    resetRateLimit(`login:ip:${ipHash}`);
    resetRateLimit(`login:id:${normalizedEmail}`);

    // 5. Issue Step-1 (AAL1) Temporary Session Token
    // This token ALONE grants zero access to private media or content.
    // It only allows calling `/api/auth/mfa/*` to complete factor 2.
    const aal1Token = await createSessionToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
      aal: 'aal1',
      amr: ['password'],
    });

    logSecurityEvent({
      event: 'LOGIN_SUCCESS',
      userId: user.userId,
      ipHash,
      reason: 'Primary factor validated. MFA required.',
    });

    const response = NextResponse.json({
      success: true,
      mfaRequired: true,
      enrolledFactors: user.enrolledFactors,
      hasWebAuthn: user.webauthnCredentials && user.webauthnCredentials.length > 0,
      hasTotp: !!user.totpSecret,
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: aal1Token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10 * 60, // 10 minutes temporary window to complete factor 2
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'Invalid credentials or account not authorized.' },
      { status: 500 }
    );
  }
}
