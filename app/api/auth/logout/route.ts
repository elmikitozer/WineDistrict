import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "wd.session";

export async function POST() {
  const c = await cookies();
  // Clear cookie by setting empty value and maxAge 0
  c.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
