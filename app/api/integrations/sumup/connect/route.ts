import { NextRequest, NextResponse } from 'next/server';
import { getSumUpAuthorizeUrl } from '@/lib/sumup';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  // Optional: ensure authenticated caviste
  // For now, accept cavisteId in query (must secure later with session)
  const { searchParams } = new URL(req.url);
  const cavisteId = searchParams.get('cavisteId');
  if (!cavisteId) {
    return NextResponse.json({ error: 'Missing cavisteId' }, { status: 400 });
  }
  const state = crypto.randomBytes(16).toString('hex') + ':' + cavisteId;
  const url = getSumUpAuthorizeUrl(state);
  const res = NextResponse.redirect(url);
  res.cookies.set('sumup_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60, // 10 minutes
  });
  return res;
}
