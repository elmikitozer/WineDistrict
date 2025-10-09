import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// JWT settings
const ALG = "HS256";
const SESSION_COOKIE = "wd.session";

function getSecret(): Uint8Array {
  // IMPORTANT: add APP_JWT_SECRET to .env.local and on Vercel
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error("APP_JWT_SECRET is missing");
  return new TextEncoder().encode(secret);
}

// Contract: expects JSON { email, password }
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
  }

  // 1) Fetch user by email
  const user = await (prisma as any).user?.findFirst({ where: { email }, include: { caviste: true } });
  // NOTE: if model User didn't exist we'd get undefined; we guard with (prisma as any).user above
  if (!user) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  // 2) Verify password
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });

  // 3) Issue JWT - contains minimal info (userId, role)
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  // 4) Set HttpOnly cookie
  const c = await cookies();
  const oneWeek = 60 * 60 * 24 * 7;
  c.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: oneWeek });

  return NextResponse.json({ ok: true });
}
