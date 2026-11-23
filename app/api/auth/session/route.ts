import { NextRequest, NextResponse } from 'next/server';
import { verifySession, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value || request.cookies.get('kn_session')?.value;
    if (!token) {
      return NextResponse.json({ authenticated: false, aal: null });
    }

    const verification = await verifySession(token);
    if (!verification.valid || !verification.payload) {
      return NextResponse.json({ authenticated: false, aal: null });
    }

    return NextResponse.json({
      authenticated: verification.payload.aal === 'aal2',
      aal: verification.payload.aal,
      role: verification.payload.role,
      userId: verification.payload.sub,
    });
  } catch {
    return NextResponse.json({ authenticated: false, aal: null });
  }
}
