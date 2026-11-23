import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import { createWebAuthnAuthOptions } from '@/lib/auth/webauthn';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Require primary factor (AAL1 session)
  const access = await requireAccess(request, { allowAal1: true });
  if (!access.authorized || !access.user) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { user } = access;
  const host = request.headers.get('host') || undefined;

  try {
    const options = await createWebAuthnAuthOptions({
      reqHost: host,
      credentials: user.webauthnCredentials,
    });

    // In a stateless deployment, challenge can be temporarily signed or stored
    const response = NextResponse.json(options);

    // Set temporary challenge cookie
    response.cookies.set({
      name: 'kn_webauthn_challenge',
      value: options.challenge,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/api/auth/mfa/webauthn',
      maxAge: 5 * 60, // 5 minutes
    });

    return response;
  } catch (err) {
    console.error('WebAuthn options error:', err);
    return NextResponse.json({ error: 'Failed to generate WebAuthn options' }, { status: 500 });
  }
}
