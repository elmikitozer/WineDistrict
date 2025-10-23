/**
 * API Route : /api/dashboard/bulk-actions
 *
 * 🎯 PERMET les actions en masse sur les réservations
 *
 * Actions supportées :
 * - confirm : Confirmer plusieurs réservations
 * - cancel : Annuler plusieurs réservations
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, reservationIds } = body as {
      action: 'confirm' | 'cancel';
      reservationIds: string[];
    };

    if (!action || !reservationIds || !Array.isArray(reservationIds)) {
      return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
    }

    // Vérifier que l'utilisateur est caviste
    const user = await (
      prisma as unknown as {
        user?: {
          findUnique: (args: {
            where: { id: string | number };
            select: { cavisteId: boolean };
          }) => Promise<{ cavisteId: number | null } | null>;
        };
      }
    ).user?.findUnique({
      where: { id: session.userId },
      select: { cavisteId: true },
    });

    if (!user?.cavisteId) {
      return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
    }

    // Déterminer le nouveau statut
    const newStatus = action === 'confirm' ? 'confirmee' : 'annulee';

    // Mettre à jour en masse
    const result = await prisma.reservation.updateMany({
      where: {
        id: { in: reservationIds },
        cavisteId: user.cavisteId, // Sécurité : seulement les réservations du caviste
      },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json({
      success: true,
      updated: result.count,
    });
  } catch (error) {
    console.error('Erreur bulk-actions:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
