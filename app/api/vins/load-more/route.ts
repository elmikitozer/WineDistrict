/**
 * API Route : /api/vins/load-more
 * 
 * 🎯 OBJECTIF : Charger plus de vins pour la pagination hybrid
 * 
 * 📡 REQUÊTE :
 * GET /api/vins/load-more?page=2&q=margaux&couleur=rouge
 * 
 * 📦 RÉPONSE :
 * {
 *   vins: [...],        // Liste des vins de la page demandée
 *   hasMore: true,      // Y a-t-il encore d'autres pages ?
 *   totalVins: 200,     // Nombre total de vins (avec filtres)
 *   currentPage: 2      // Page actuelle
 * }
 * 
 * 🔧 LOGIQUE :
 * 1. Récupère les paramètres (page, q, couleur)
 * 2. Construit la requête SQL avec LIMIT/OFFSET
 * 3. Compte le total de vins (pour savoir s'il y a d'autres pages)
 * 4. Retourne les vins + métadonnées
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// 📊 CONFIGURATION
const PER_PAGE = 24; // Nombre de vins par page (doit correspondre à VinsGrid)

interface Vin {
  id: number;
  slug: string;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
  couleur: string;
  imageFile: string | null;
}

export async function GET(req: NextRequest) {
  try {
    // 🔍 RÉCUPÉRATION DES PARAMÈTRES
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const q = (searchParams.get('q') ?? '').trim();
    const couleur = (searchParams.get('couleur') ?? 'tous').toLowerCase();

    // 📊 CALCUL OFFSET (pour savoir à partir de quel vin charger)
    // Page 1 : offset = 0 (vins 0-23)
    // Page 2 : offset = 24 (vins 24-47)
    // Page 3 : offset = 48 (vins 48-71)
    const offset = (page - 1) * PER_PAGE;

    // 🔍 CONSTRUCTION DE LA CLAUSE WHERE (identique à /vins/page.tsx)
    const whereParts = [
      q
        ? Prisma.sql`(
            unaccent(nom) ILIKE unaccent(${`%${q}%`})
            OR unaccent(domaine) ILIKE unaccent(${`%${q}%`})
            OR nom ILIKE ${`%${q}%`}
            OR domaine ILIKE ${`%${q}%`}
            OR unaccent(REPLACE(nom, '-', ' ')) ILIKE unaccent(${`%${q.replace(/-/g, ' ')}%`})
            OR unaccent(REPLACE(domaine, '-', ' ')) ILIKE unaccent(${`%${q.replace(/-/g, ' ')}%`})
            OR unaccent(REPLACE(nom, ' ', '-')) ILIKE unaccent(${`%${q.replace(/ /g, '-')}%`})
            OR unaccent(REPLACE(domaine, ' ', '-')) ILIKE unaccent(${`%${q.replace(/ /g, '-')}%`})
          )`
        : undefined,
      couleur !== 'tous'
        ? Prisma.sql`(unaccent(couleur) ILIKE unaccent(${couleur}) OR couleur ILIKE ${couleur})`
        : undefined,
    ].filter(Boolean) as Prisma.Sql[];

    const whereClause =
      whereParts.length > 0 ? Prisma.sql`WHERE ${Prisma.join(whereParts, ' AND ')}` : Prisma.empty;

    // 📊 REQUÊTE SQL : Charger les vins de la page demandée
    const query = Prisma.sql`
      SELECT id, slug, nom, domaine, année, prix, couleur, "imageFile"
      FROM "Vin"
      ${whereClause}
      ORDER BY nom ASC
      LIMIT ${PER_PAGE} OFFSET ${offset}
    `;

    // 📊 COMPTER le nombre total de vins (avec les filtres appliqués)
    const countQuery = Prisma.sql`
      SELECT COUNT(*)::int as count
      FROM "Vin"
      ${whereClause}
    `;

    // 🚀 EXÉCUTION PARALLÈLE (plus rapide)
    const [vins, countResult] = await Promise.all([
      prisma.$queryRaw<Vin[]>(query),
      prisma.$queryRaw<{ count: number }[]>(countQuery),
    ]);

    const totalVins = countResult[0]?.count ?? 0;
    
    // 📊 CALCUL : Y a-t-il d'autres pages après celle-ci ?
    // Exemple : page 2 (24 vins chargés), total 200 vins
    // 2 * 24 = 48 < 200 → hasMore = true
    const hasMore = page * PER_PAGE < totalVins;

    // ✅ RÉPONSE JSON
    return NextResponse.json({
      vins,
      hasMore,
      totalVins,
      currentPage: page,
    });
  } catch (error) {
    console.error('Erreur API load-more:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement des vins' },
      { status: 500 }
    );
  }
}

