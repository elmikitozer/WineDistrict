// app/api/csrf/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";   // pas de cache
export const runtime = "edge";            // Edge = Web Crypto natif

function hexToken(bytes = 32) {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr); // Web Crypto (Edge & Node 18+)
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(req: Request) {
  const token = hexToken(32);

  // astuce fiable: détecter HTTPS à partir de l’URL de la requête
  const isHttps = new URL(req.url).protocol === "https:";

  const res = NextResponse.json({ csrfToken: token });
  res.cookies.set("wd_csrf", token, {
    httpOnly: false,     // double-submit (le client doit lire l’input caché)
    sameSite: "strict",
    secure: isHttps,     // true en Vercel, false en localhost http
    path: "/",
    maxAge: 60 * 60 * 2, // 2h
  });
  return res;
}
