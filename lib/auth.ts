import 'server-only';
import { cookies, headers } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';

const ALG = 'HS256';
const SESSION_COOKIE = 'wd.session';

function getSecret(): Uint8Array {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error('APP_JWT_SECRET is missing');
  return new TextEncoder().encode(secret);
}

export async function createSession(payload: { userId: string; role: string }) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
  return jwt;
}

export async function verifySession(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as { userId: string; role: string; exp: number; iat: number };
}

export async function getSessionCookie() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value || null;
}

export function setSessionCookie(res: Response, token: string) {
  const h = new Headers(res.headers);
  const oneWeek = 60 * 60 * 24 * 7;
  h.append('Set-Cookie', `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${oneWeek}`);
  return new Response(res.body, { status: res.status, headers: h });
}

export function clearSessionCookie(res: Response) {
  const h = new Headers(res.headers);
  h.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
  return new Response(res.body, { status: res.status, headers: h });
}

export async function getCurrentUser() {
  const token = await getSessionCookie();
  if (!token) return null;
  try {
    const payload = await verifySession(token);
  // If User model does not exist yet (pre-migration), short-circuit
  const client: any = prisma as unknown as any;
  if (!client.user) return null;
  const user = await client.user.findUnique({ where: { id: payload.userId }, include: { caviste: true } });
  return user;
  } catch {
    return null;
  }
}
