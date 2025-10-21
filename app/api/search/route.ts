// app/api/search/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

/**
 * Normalise le texte pour la recherche :
 * - "Saint Emilion" → recherche "Saint-Emilion" et "Saint Emilion"
 * - "SaintEmilion" → recherche "Saint-Emilion" et "Saint Emilion"
 */
function normalizeSearchText(text: string): string[] {
  const normalized = text.trim();
  
  // Générer des variantes avec tirets et espaces
  const variants: string[] = [];
  
  // Variante originale
  variants.push(normalized);
  
  // Variante avec espaces remplacés par tirets
  if (normalized.includes(' ')) {
    variants.push(normalized.replace(/\s+/g, '-'));
  }
  
  // Variante avec tirets remplacés par espaces
  if (normalized.includes('-')) {
    variants.push(normalized.replace(/-/g, ' '));
  }
  
  // Variante sans espaces ni tirets (pour "SaintEmilion")
  const withoutSeparators = normalized.replace(/[\s-]/g, '');
  if (withoutSeparators !== normalized) {
    variants.push(withoutSeparators);
  }
  
  return [...new Set(variants)]; // Dédupliquer
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const qRaw = url.searchParams.get('q') ?? '';
  const q = qRaw.trim();

  if (q.length > 64) return NextResponse.json([]);

  let rows: unknown[];

  if (q.length === 0) {
    const sql = Prisma.sql`
      SELECT v.id, v.nom, v.domaine, v."année" AS annee, v.prix, v."imageFile"
      FROM "Vin" AS v
      ORDER BY v.nom ASC
      LIMIT 10
    `;
    rows = await prisma.$queryRaw(sql);
  } else {
    // Extraire l'année si présente (4 chiffres consécutifs)
    const yearMatch = q.match(/\b(\d{4})\b/);
    const year = yearMatch ? parseInt(yearMatch[1]) : null;

    // Texte sans l'année
    const textWithoutYear = year
      ? q
          .replace(/\b\d{4}\b/, '')
          .trim()
          .replace(/\s+/g, ' ')
      : q.trim();

    if (year && textWithoutYear.length > 0) {
      // Recherche COMBINÉE : texte + année (priorité absolue)
      const variants = normalizeSearchText(textWithoutYear);
      const likes = variants.map(v => `%${v}%`);
      
      // Construire les conditions OR pour toutes les variantes
      const textConditions = likes.map((like) => 
        Prisma.sql`(unaccent(v.nom) ILIKE unaccent(${like}) OR unaccent(v.domaine) ILIKE unaccent(${like}))`
      );
      
      const sql = Prisma.sql`
        SELECT
          v.id,
          v.nom,
          v.domaine,
          v."année" AS annee,
          v.prix,
          v."imageFile",
          -- Score de pertinence
          CASE
            -- Match parfait : nom/domaine + année (n'importe quelle variante)
            WHEN v."année" = ${year} AND (
              ${Prisma.join(textConditions, ' OR ')}
            ) THEN 1
            -- Année seule
            WHEN v."année" = ${year} THEN 2
            -- Texte seul (sans année, n'importe quelle variante)
            WHEN ${Prisma.join(textConditions, ' OR ')} THEN 3
            ELSE 4
          END AS relevance
        FROM "Vin" AS v
        WHERE
          v."année" = ${year} OR
          ${Prisma.join(textConditions, ' OR ')}
        ORDER BY relevance ASC, v.nom ASC
        LIMIT 10
      `;
      rows = await prisma.$queryRaw(sql);
    } else if (year && textWithoutYear.length === 0) {
      // Recherche ANNÉE SEULE
      const sql = Prisma.sql`
        SELECT v.id, v.nom, v.domaine, v."année" AS annee, v.prix, v."imageFile"
        FROM "Vin" AS v
        WHERE v."année" = ${year}
        ORDER BY v.nom ASC
        LIMIT 10
      `;
      rows = await prisma.$queryRaw(sql);
    } else {
      // Recherche TEXTE SEUL (sans année)
      const variants = normalizeSearchText(textWithoutYear);
      const likes = variants.map(v => `%${v}%`);
      
      // Construire les conditions OR pour toutes les variantes
      const textConditions = likes.map((like) => 
        Prisma.sql`(unaccent(v.nom) ILIKE unaccent(${like}) OR unaccent(v.domaine) ILIKE unaccent(${like}))`
      );
      
      const sql = Prisma.sql`
        SELECT v.id, v.nom, v.domaine, v."année" AS annee, v.prix, v."imageFile"
        FROM "Vin" AS v
        WHERE
          ${Prisma.join(textConditions, ' OR ')}
        ORDER BY v.nom ASC
        LIMIT 10
      `;
      rows = await prisma.$queryRaw(sql);
    }
  }

  // Nettoyer les résultats (enlever le champ relevance si présent)
  const cleanRows = (rows as Array<Record<string, unknown>>).map((item) => {
    const { relevance: _, ...row } = item;
    return row;
  });

  return NextResponse.json(cleanRows, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
