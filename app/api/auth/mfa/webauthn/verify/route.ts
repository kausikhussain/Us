import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import { verifyWebAuthnAuth } from '@/lib/auth/webauthn';
import { upsertUser } from '@/lib/auth/allowlist';
import { createSessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';
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
  const host = request.headers.get('host') || undefined;
  const expectedChallenge = request.cookies.get('kn_webauthn_challenge')?.value;

  if (!expectedChallenge) {
    return NextResponse.json({ error: 'Missing or expired challenge.' }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const credentialId = body.id;

    const registeredCred = (user.webauthnCredentials || []).find((c) => c.id === credentialId);
    if (!registeredCred) {
      logSecurityEvent({
        event: 'MFA_FAILED',
        userId: user.userId,
        ipHash,
        reason: 'Unregistered WebAuthn credential presented',
      });
      return NextResponse.json({ error: 'Unrecognized passkey.' }, { status: 401 });
    }

    const verification = await verifyWebAuthnAuth({
      response: body,
      expectedChallenge,
      credential: registeredCred,
      reqHost: host,
    });

    if (!verification.verified || !verification.authenticationInfo) {
      logSecurityEvent({
        event: 'MFA_FAILED',
        userId: user.userId,
        ipHash,
        reason: 'WebAuthn signature verification failed',
      });
      return NextResponse.json({ error: 'Passkey verification failed.' }, { status: 401 });
    }

    // Update credential counter to protect against replay clones
    registeredCred.counter = verification.authenticationInfo.newCounter;
    await upsertUser(user);

    // Issue AAL2 Session Token
    const aal2Token = await createSessionToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
      aal: 'aal2',
      amr: ['password', 'webauthn'],
    });

    logSecurityEvent({
      event: 'MFA_VERIFIED',
      userId: user.userId,
      ipHash,
      reason: 'Passkey authentication successful. AAL2 session established.',
    });

    const response = NextResponse.json({
      success: true,
      message: 'Passkey verified. Welcome to Our Little World.',
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

    // Clear challenge cookie
    response.cookies.delete('kn_webauthn_challenge');

    return response;
  } catch (err) {
    console.error('WebAuthn verification error:', err);
    return NextResponse.json({ error: 'Passkey verification failed.' }, { status: 500 });
  }
}
