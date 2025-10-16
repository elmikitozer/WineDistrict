import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/sumup';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  if (!code || !returnedState) {
    return NextResponse.json({ error: 'Missing code/state' }, { status: 400 });
  }
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/sumup_oauth_state=([^;]+)/);
  const storedState = match ? decodeURIComponent(match[1]) : null;
  if (!storedState || storedState !== returnedState) {
    return NextResponse.json({ error: 'Invalid state' }, { status: 400 });
  }
  try {
    const tokens = await exchangeCodeForTokens(code);
    // state format: random:cavisteId
    const parts = returnedState.split(':');
    const cavisteId = parts[1] ? parseInt(parts[1], 10) : undefined;
    return NextResponse.json({ ok: true, cavisteId, tokens });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
