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
    // Vérifier si la requête contient un nombre (année potentielle)
    const yearMatch = q.match(/\d{4}/);
    const hasYear = yearMatch !== null;

    if (hasYear) {
      // Extraire l'année et le reste de la requête
      const year = parseInt(yearMatch[0]);
      const textWithoutYear = q.replace(/\d{4}/, '').trim();

      if (textWithoutYear.length > 0) {
        // Recherche combinée: texte ET année (priorité aux résultats qui matchent les deux)
        const like = `%${textWithoutYear}%`;
        const sql = Prisma.sql`
          WITH ranked AS (
            SELECT v.id, v.nom, v.domaine, v."année", v.prix, v."imageFile",
              CASE 
                WHEN v."année" = ${year} AND 
                     (unaccent(v.nom) ILIKE unaccent(${like}) OR unaccent(v.domaine) ILIKE unaccent(${like}))
                THEN 1
                WHEN v."année" = ${year} THEN 2
                ELSE 3
              END AS priority
            FROM "Vin" AS v
            WHERE v."année" = ${year}
               OR unaccent(v.nom) ILIKE unaccent(${like})
               OR unaccent(v.domaine) ILIKE unaccent(${like})
          )
          SELECT id, nom, domaine, "année" AS "annee", prix, "imageFile"
          FROM ranked
          ORDER BY priority ASC, nom ASC
          LIMIT 10
        `;
        rows = await prisma.$queryRaw(sql);
      } else {
        // Recherche uniquement par année
        const sql = Prisma.sql`
          SELECT v.id, v.nom, v.domaine, v."année" AS "annee", v.prix, v."imageFile"
          FROM "Vin" AS v
          WHERE v."année" = ${year}
          ORDER BY v.nom ASC
          LIMIT 10
        `;
        rows = await prisma.$queryRaw(sql);
      }
    } else {
      // Recherche sans année (texte uniquement)
      const like = `%${q}%`;
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
  }

  // Désactive le cache côté client/CDN pour la live search
  return NextResponse.json(rows, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
