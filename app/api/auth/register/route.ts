import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify, JWTPayload } from 'jose';
import { cookies } from 'next/headers';

const ALG = 'HS256';
const SESSION_COOKIE = 'wd.session';

function getSecret(): Uint8Array {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error('APP_JWT_SECRET is missing');
  return new TextEncoder().encode(secret);
}

// POST /api/auth/register?token=...
// Body: { password: string }
type InvitePayload = JWTPayload & { email?: string; cavisteId?: number | string; type?: string };
type RegisterBody = { password?: string };
type UserRow = { id: string; email: string; role: string; passwordHash: string };
type CreateUserArgs = {
  data: { id: string; email: string; passwordHash: string; role: 'CAVISTE'; cavisteId: number };
};

export async function POST(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';
  if (!token) return NextResponse.json({ error: 'Lien invalide' }, { status: 400 });

  const body = (await req.json().catch(() => ({}))) as RegisterBody;
  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || password.length < 8) {
    return NextResponse.json({ error: 'Mot de passe trop court (min 8)' }, { status: 400 });
  }

  // Verify invite token
  let payload: InvitePayload | null = null;
  try {
    const res = await jwtVerify(token, getSecret());
    payload = res.payload as InvitePayload;
  } catch {
    return NextResponse.json({ error: 'Lien invalide ou expiré' }, { status: 400 });
  }

  const email = (payload?.email || '').toString().trim().toLowerCase();
  const cavisteIdRaw = payload?.cavisteId;
  const cavisteId =
    typeof cavisteIdRaw === 'number' ? cavisteIdRaw : parseInt(String(cavisteIdRaw), 10);
  const type = payload?.type;
  if (!email || !cavisteId || type !== 'invite') {
    return NextResponse.json({ error: 'Lien invalide' }, { status: 400 });
  }

  // Check if user already exists
  const userModel = (
    prisma as unknown as {
      user?: {
        findFirst: (args: { where: { email: string } }) => Promise<UserRow | null>;
        create: (args: CreateUserArgs) => Promise<UserRow>;
      };
    }
  ).user;
  if (!userModel)
    return NextResponse.json({ error: 'Modèle utilisateur indisponible' }, { status: 500 });
  const existing = await userModel.findFirst({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Un compte existe déjà pour cet email' }, { status: 409 });
  }

  // Ensure caviste exists
  const caviste = await prisma.caviste.findUnique({ where: { id: cavisteId } });
  if (!caviste) {
    return NextResponse.json({ error: 'Caviste introuvable' }, { status: 400 });
  }

  // Create user
  const passwordHash = await bcrypt.hash(password, 10);
  const id = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const user = await userModel.create({
    data: { id, email, passwordHash, role: 'CAVISTE', cavisteId },
  });

  // Auto-login: issue session cookie
  const jwt = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
  const c = await cookies();
  const oneWeek = 60 * 60 * 24 * 7;
  c.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: oneWeek,
  });

  return NextResponse.json({ ok: true });
}
