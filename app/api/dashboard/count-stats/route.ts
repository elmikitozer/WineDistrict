/**
 * API Route : /api/dashboard/count-stats
 *
 * 🎯 RETOURNE les compteurs de réservations par statut
 *
 * Utilisé par StatsCardsClient
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cavisteId = parseInt(searchParams.get('cavisteId') || '0', 10);

  if (!cavisteId) {
    return NextResponse.json({ error: 'cavisteId requis' }, { status: 400 });
  }

  try {
    // Aggregate counts per status and total
    const [total, enAttente, confirmee, annulee] = await Promise.all([
      prisma.reservation.count({ where: { cavisteId } }),
      prisma.reservation.count({ where: { cavisteId, status: 'en_attente' } }),
      prisma.reservation.count({ where: { cavisteId, status: 'confirmee' } }),
      prisma.reservation.count({ where: { cavisteId, status: 'annulee' } }),
    ]);

    return NextResponse.json({
      total,
      enAttente,
      confirmee,
      annulee,
    });
  } catch (error) {
    console.error('Erreur count-stats:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
