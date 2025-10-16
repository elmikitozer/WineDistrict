import { NextResponse } from 'next/server';
import { getSumUpAuthorizeUrl } from '@/lib/sumup';
import { getCurrentUser } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  // Ensure authenticated caviste
  const user = await getCurrentUser();
  if (!user || !user.cavisteId) {
    return NextResponse.json({ error: 'Unauthorized or no caviste linked' }, { status: 401 });
  }

  const cavisteId = user.cavisteId;
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
