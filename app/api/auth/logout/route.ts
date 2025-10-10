import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'wd.session';

export async function POST(req: Request) {
  const c = await cookies();
  // Clear cookie by setting empty value and maxAge 0
  c.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  // Redirect to login with a small flag to show a message
  const url = new URL('/login?logout=1', req.url);
  return NextResponse.redirect(url);
}
