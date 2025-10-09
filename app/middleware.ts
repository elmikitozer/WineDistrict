// middleware.ts (à la racine du projet)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, host } = request.nextUrl;

  // On ne vérifie que le POST sur /api/reservation
  if (request.method === "POST" && pathname.startsWith("/api/reservation")) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");

    const sameHost = (urlStr?: string | null) => {
      if (!urlStr) return false;
      try {
        const u = new URL(urlStr);
        return u.host === host; // autorise prod, previews Vercel et localhost automatiquement
      } catch {
        return false;
      }
    };

    // Au moins Origin OU Referer doit matcher notre host
    const ok =
      (origin && sameHost(origin)) ||
      (!origin && referer && sameHost(referer));

    if (!ok) {
      return new NextResponse("Forbidden (bad origin)", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // n’exécute le middleware que sur les routes API
};
