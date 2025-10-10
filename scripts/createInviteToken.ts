#!/usr/bin/env tsx
import { SignJWT } from "jose";

function getSecret(): Uint8Array {
  const secret = process.env.APP_JWT_SECRET;
  if (!secret) throw new Error("APP_JWT_SECRET is missing");
  return new TextEncoder().encode(secret);
}

async function main() {
  const email = (process.argv[2] || "").trim().toLowerCase();
  const cavisteId = parseInt(process.argv[3] || "", 10);
  if (!email || !cavisteId) {
    console.error("Usage: tsx scripts/createInviteToken.ts <email> <cavisteId>");
    process.exit(1);
  }
  const token = await new SignJWT({ type: "invite", email, cavisteId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(getSecret());
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/register?token=${encodeURIComponent(token)}`;
  console.log(url);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
