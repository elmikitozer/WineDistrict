import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/sumup';
import { prisma } from '@/lib/prisma';

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
    
    if (!cavisteId) {
      return NextResponse.json({ error: 'Invalid cavisteId' }, { status: 400 });
    }

    // Calculate expiration time if provided
    const expiresAt = tokens.expires_in 
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : undefined;

    // Store or update the integration connection
    await prisma.integrationConnection.upsert({
      where: {
        provider_cavisteId: {
          provider: 'sumup',
          cavisteId,
        },
      },
      create: {
        cavisteId,
        provider: 'sumup',
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        expiresAt,
      },
      update: {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        scope: tokens.scope,
        expiresAt,
        updatedAt: new Date(),
      },
    });

    // Clear the OAuth state cookie
    const res = NextResponse.redirect(new URL('/dashboard/caviste?sumup=connected', url.origin));
    res.cookies.set('sumup_oauth_state', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });
    return res;
  } catch {
    const errorUrl = new URL('/dashboard/caviste?sumup=error', url.origin);
    return NextResponse.redirect(errorUrl);
  }
}
