import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const ALG = "HS256";
const SESSION_COOKIE = "wd.session";

function getSecret(): Uint8Array {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error("APP_JWT_SECRET is missing");
  return new TextEncoder().encode(secret);
}

// POST /api/auth/register-client
// Body: { email, password }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: "Email valide et mot de passe (min 8) requis" }, { status: 400 });
  }

  const exists = await (prisma as any).user?.findFirst({ where: { email } });
  if (exists) {
    return NextResponse.json({ error: "Un compte existe déjà pour cet email" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const id = globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const user = await (prisma as any).user?.create({
    data: { id, email, passwordHash, role: "CLIENT" },
  });
  if (!user) return NextResponse.json({ error: "Création utilisateur impossible" }, { status: 500 });

  // create Client profile
  await (prisma as any).client?.create({ data: { userId: user.id } });

  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  const c = await cookies();
  const oneWeek = 60 * 60 * 24 * 7;
  c.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: oneWeek });

  return NextResponse.json({ ok: true });
}
