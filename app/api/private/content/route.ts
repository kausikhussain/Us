import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import { getPrivateAnniversaryContent } from '@/lib/content/server-content';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Enforce AAL2 multi-factor authorization on every request
  const access = await requireAccess(request);
  if (!access.authorized) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const content = getPrivateAnniversaryContent();

  const headers = new Headers();
  headers.set('Cache-Control', 'private, no-store, must-revalidate');
  headers.set('X-Content-Type-Options', 'nosniff');

  return NextResponse.json({ success: true, content }, { headers });
}
