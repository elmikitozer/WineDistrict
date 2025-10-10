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

export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Inscription caviste désactivée" }, { status: 403 });
  }
  const body = await req.json().catch(() => ({} as any));
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const cavisteId = Number(body.cavisteId);
  if (!email || !email.includes("@") || !password || password.length < 8 || !cavisteId) {
    return NextResponse.json({ error: "Champs requis invalides" }, { status: 400 });
  }

  const caviste = await prisma.caviste.findUnique({ where: { id: cavisteId } });
  if (!caviste) return NextResponse.json({ error: "Caviste introuvable" }, { status: 400 });

  const exists = await (prisma as any).user?.findFirst({ where: { email } });
  if (exists) return NextResponse.json({ error: "Un compte existe déjà pour cet email" }, { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);
  const id = typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.randomUUID === "function"
    ? globalThis.crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(36).slice(2)}`;

  const user = await (prisma as any).user?.create({
    data: { id, email, passwordHash, role: "CAVISTE", cavisteId },
  });
  if (!user) return NextResponse.json({ error: "Création utilisateur impossible" }, { status: 500 });

  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
  const c = await cookies();
  const oneWeek = 60 * 60 * 24 * 7;
  const isProd = (process.env.NODE_ENV as unknown as string) === "production";
  c.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: "lax", secure: isProd, path: "/", maxAge: oneWeek });

  return NextResponse.json({ ok: true });
}
