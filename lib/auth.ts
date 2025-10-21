import { cookies } from 'next/headers';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { prisma } from './prisma';

const ALG = 'HS256';
export const SESSION_COOKIE = 'wd.session';

function getSecret(): Uint8Array {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error('APP_JWT_SECRET is missing');
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: number, role: string) {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
  const c = await cookies();
  const oneWeek = 60 * 60 * 24 * 7;
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: true,
    path: '/',
    maxAge: oneWeek,
  });
}

export async function clearSession() {
  const c = await cookies();
  c.set(SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
}

export type SessionPayload = JWTPayload & { userId?: string | number; role?: string };

export async function getSession(): Promise<SessionPayload | null> {
  const c = await cookies();
  const token = c.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

type CavisteLite = { id: number; nom?: string | null };
type UserLite = {
  id: string | number;
  email: string;
  role: string;
  cavisteId?: number | null;
  caviste?: CavisteLite | null;
};

export async function getCurrentUser(): Promise<UserLite | null> {
  const payload = await getSession();
  if (!payload?.userId) return null;
  
  // Sélectionner uniquement les champs dont on a besoin
  const user = await prisma.user.findUnique({
    where: { id: String(payload.userId) },
    select: {
      id: true,
      email: true,
      role: true,
      cavisteId: true,
      caviste: {
        select: {
          id: true,
          nom: true,
        },
      },
    },
  });
  
  return user;
}
