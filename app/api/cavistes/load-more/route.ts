/**
 * API Route : /api/cavistes/load-more
 * 
 * 🎯 OBJECTIF : Charger plus de cavistes pour la pagination hybrid
 * 
 * 📡 REQUÊTE :
 * GET /api/cavistes/load-more?page=2
 * 
 * 📦 RÉPONSE :
 * {
 *   cavistes: [...],
 *   hasMore: true,
 *   totalCavistes: 50,
 *   currentPage: 2
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const PER_PAGE = 12; // Doit correspondre à CavistesGrid

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const skip = (page - 1) * PER_PAGE;

    // 🔍 CHARGER les cavistes de la page demandée
    const [cavistes, totalCavistes] = await Promise.all([
      prisma.caviste.findMany({
        skip,
        take: PER_PAGE,
        orderBy: { nom: 'asc' },
        include: {
          stocks: {
            include: {
              vin: true,
            },
            orderBy: {
              vin: {
                nom: 'asc',
              },
            },
          },
        },
      }),
      prisma.caviste.count(),
    ]);

    const hasMore = page * PER_PAGE < totalCavistes;

    return NextResponse.json({
      cavistes,
      hasMore,
      totalCavistes,
      currentPage: page,
    });
  } catch (error) {
    console.error('Erreur API load-more cavistes:', error);
    return NextResponse.json(
      { error: 'Erreur lors du chargement des cavistes' },
      { status: 500 }
    );
  }
}

