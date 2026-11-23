import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyEdgeSession, SESSION_COOKIE_NAME } from './lib/auth/edge-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Bypass Next.js internal static assets and public system files
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/site.webmanifest'
  ) {
    return NextResponse.next();
  }

  // 2. Allow public authentication endpoints
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 3. Extract and verify session token at the Edge
  const token =
    request.cookies.get(SESSION_COOKIE_NAME)?.value ||
    request.cookies.get('kn_session')?.value;

  const verification = await verifyEdgeSession(token);
  const isAal2Authenticated = verification.valid && verification.payload?.aal === 'aal2';

  // 4. Edge Gate for Private APIs and Media (Fail Closed)
  if (pathname.startsWith('/api/private') || pathname.startsWith('/api/media')) {
    if (!isAal2Authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized. Authentication and multi-factor verification required.' },
        { status: 401 }
      );
    }
  }

  // 5. Attach verification status header for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-kn-authenticated', isAal2Authenticated ? '1' : '0');
  if (verification.payload) {
    requestHeaders.set('x-kn-user-id', verification.payload.sub);
    requestHeaders.set('x-kn-user-role', verification.payload.role);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
