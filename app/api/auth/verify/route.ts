import { NextRequest, NextResponse } from 'next/server';
import {
  validatePasscode,
  generateSessionToken,
  SESSION_COOKIE_NAME,
} from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { code } = body;

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: "That isn't our special date. Try once more." },
        { status: 400 }
      );
    }

    const isValid = validatePasscode(code);

    if (!isValid) {
      return NextResponse.json(
        { error: "That isn't our special date. Try once more." },
        { status: 401 }
      );
    }

    // Generate authenticated session token
    const token = await generateSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Welcome to Our Little World.',
    });

    // Set HTTP-only secure cookie valid for 7 days
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error('Auth verification error:', error);
    return NextResponse.json(
      { error: 'An unexpected verification error occurred.' },
      { status: 500 }
    );
  }
}
