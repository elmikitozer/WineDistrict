// import { prisma } from "@/lib/prisma";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const q = searchParams.get("q")?.toLowerCase() || "";

//   const results = await prisma.vin.findMany({
//     where: {
//       OR: [
//         { nom: { contains: q, mode: "insensitive" } },
//         { domaine: { contains: q, mode: "insensitive" } },
//       ],
//     },
//     select: {
//       id: true,
//       nom: true,
//       domaine: true,
//       année: true,
//     },
//     orderBy: { nom: "asc" },
//     take: 10,
//   });

//   return new Response(JSON.stringify(results), {
//     headers: { "Content-Type": "application/json" },
//   });
// }

// File: app/api/search/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  if (!q || q.length < 1) {
    return NextResponse.json([]); // Retourne un tableau vide si la requête est vide
  }

  try {
    const vins = await prisma.$queryRawUnsafe(`
      SELECT id, nom, domaine, année, prix
      FROM "Vin"
      WHERE unaccent(nom) ILIKE unaccent('%${q}%')
         OR unaccent(domaine) ILIKE unaccent('%${q}%')
      ORDER BY nom ASC
      LIMIT 10
    `);

    return NextResponse.json(vins);
  } catch (error) {
    console.error("Erreur API /api/search :", error);
    return new Response(JSON.stringify({ error: "Erreur serveur" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
