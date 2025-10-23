/**
 * API Route : /api/dashboard/notifications
 *
 * 🎯 RETOURNE le nombre de réservations en attente
 *
 * Utilisé par le badge de notifications dans la navbar
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
    // Compter les réservations en attente
    const pendingCount = await prisma.reservation.count({
      where: {
        cavisteId,
        status: 'en_attente',
      },
    });

    return NextResponse.json({
      pendingCount,
    });
  } catch (error) {
    console.error('Erreur notifications:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
