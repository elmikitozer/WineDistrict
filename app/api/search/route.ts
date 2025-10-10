// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic'; // pas de cache côté route

export async function GET(req: Request) {
  const url = new URL(req.url);
  const qRaw = url.searchParams.get('q') ?? '';
  const q = qRaw.trim();

  // borne de longueur pour éviter l'abus, mais on garde la recherche vide
  if (q.length > 64) return NextResponse.json([]);

  let rows: unknown[];

  if (q.length === 0) {
    // 🔎 Fallback pour la live search quand q est vide
    const sql = Prisma.sql`
      SELECT v.id, v.nom, v.domaine, v."année" AS "annee", v.prix, v."imageFile"
      FROM "Vin" AS v
      ORDER BY v.nom ASC
      LIMIT 10
    `;
    rows = await prisma.$queryRaw(sql);
  } else {
    const like = `%${q}%`; // contient (préfixe/suffixe conservés)
    const sql = Prisma.sql`
      SELECT v.id, v.nom, v.domaine, v."année" AS "annee", v.prix, v."imageFile"
      FROM "Vin" AS v
      WHERE unaccent(v.nom) ILIKE unaccent(${like})
         OR unaccent(v.domaine) ILIKE unaccent(${like})
      ORDER BY v.nom ASC
      LIMIT 10
    `;
    rows = await prisma.$queryRaw(sql);
  }

  // Désactive le cache côté client/CDN pour la live search
  return NextResponse.json(rows, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
