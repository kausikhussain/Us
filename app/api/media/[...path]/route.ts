import { NextRequest, NextResponse } from 'next/server';
import { requireAccess } from '@/lib/auth/guard';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export const dynamic = 'force-dynamic';

const MIME_MAP: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.json': 'application/json',
};

const PRIVATE_MEDIA_ROOT = path.resolve(process.cwd(), 'private_media');

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  // 1. Enforce strict server-side authorization (AAL2 verified session)
  const access = await requireAccess(request);
  if (!access.authorized) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Validate and sanitize relative path
  const pathSegments = params.path || [];
  if (pathSegments.length === 0 || pathSegments.some((seg) => seg.includes('..') || seg.includes('/') || seg.includes('\\'))) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const relativePath = path.join(...pathSegments);
  const targetFilePath = path.resolve(PRIVATE_MEDIA_ROOT, relativePath);

  // Prevent directory traversal outside of PRIVATE_MEDIA_ROOT
  if (!targetFilePath.startsWith(PRIVATE_MEDIA_ROOT)) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const stat = fs.statSync(targetFilePath);
  const fileSize = stat.size;
  const ext = path.extname(targetFilePath).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';

  const rangeHeader = request.headers.get('range');

  // Common security headers for private media
  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Cache-Control', 'private, no-store, must-revalidate');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  headers.set('Accept-Ranges', 'bytes');

  // 3. Handle HTTP Range Requests (Critical for Audio Seeking & iOS Safari)
  if (rangeHeader && rangeHeader.startsWith('bytes=')) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (isNaN(start) || start >= fileSize || (parts[1] && isNaN(end)) || start > end) {
      headers.set('Content-Range', `bytes */${fileSize}`);
      return new NextResponse(null, { status: 416, headers });
    }

    const chunkLength = end - start + 1;
    headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
    headers.set('Content-Length', chunkLength.toString());

    const fileStream = fs.createReadStream(targetFilePath, { start, end });
    const webStream = Readable.toWeb(fileStream) as ReadableStream<Uint8Array>;

    return new NextResponse(webStream, {
      status: 206,
      headers,
    });
  }

  // 4. Handle Full File Request
  headers.set('Content-Length', fileSize.toString());
  const fileStream = fs.createReadStream(targetFilePath);
  const webStream = Readable.toWeb(fileStream) as ReadableStream<Uint8Array>;

  return new NextResponse(webStream, {
    status: 200,
    headers,
  });
}

export async function HEAD(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const access = await requireAccess(request);
  if (!access.authorized) {
    return access.errorResponse || NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pathSegments = params.path || [];
  if (pathSegments.length === 0 || pathSegments.some((seg) => seg.includes('..'))) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const relativePath = path.join(...pathSegments);
  const targetFilePath = path.resolve(PRIVATE_MEDIA_ROOT, relativePath);

  if (!targetFilePath.startsWith(PRIVATE_MEDIA_ROOT) || !fs.existsSync(targetFilePath)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const stat = fs.statSync(targetFilePath);
  const ext = path.extname(targetFilePath).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';

  const headers = new Headers();
  headers.set('Content-Type', contentType);
  headers.set('Content-Length', stat.size.toString());
  headers.set('Cache-Control', 'private, no-store, must-revalidate');
  headers.set('Accept-Ranges', 'bytes');

  return new NextResponse(null, { status: 200, headers });
}
