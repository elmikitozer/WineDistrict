/**
 * API Route : /api/dashboard/stats
 *
 * 🎯 FOURNIT les données pour les graphiques du dashboard
 *
 * Retourne :
 * - evolutionData : Évolution des réservations dans le temps
 * - topVinsData : Top 5 des vins les plus réservés
 * - statusData : Répartition par statut
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cavisteId = parseInt(searchParams.get('cavisteId') || '0', 10);
  const period = searchParams.get('period') || '30days';

  if (!cavisteId) {
    return NextResponse.json({ error: 'cavisteId requis' }, { status: 400 });
  }

  // 📅 Calculer la date de début selon la période
  const now = new Date();
  const startDate = new Date();

  switch (period) {
    case '7days':
      startDate.setDate(now.getDate() - 7);
      break;
    case '30days':
      startDate.setDate(now.getDate() - 30);
      break;
    case '90days':
      startDate.setDate(now.getDate() - 90);
      break;
    default:
      startDate.setDate(now.getDate() - 30);
  }

  try {
    // 📊 1. ÉVOLUTION DES RÉSERVATIONS
    const reservations = await prisma.reservation.findMany({
      where: {
        cavisteId,
        date: {
          gte: startDate,
        },
      },
      select: {
        date: true,
        status: true,
        vinId: true,
      },
    });

    // Grouper par jour
    const evolutionMap = new Map<string, number>();
    reservations.forEach((r) => {
      const dateKey = new Date(r.date).toISOString().split('T')[0];
      evolutionMap.set(dateKey, (evolutionMap.get(dateKey) || 0) + 1);
    });

    const evolutionData = Array.from(evolutionMap.entries())
      .map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // 📊 2. TOP 5 DES VINS
    const vinCounts = new Map<number, number>();
    reservations.forEach((r) => {
      vinCounts.set(r.vinId, (vinCounts.get(r.vinId) || 0) + 1);
    });

    const topVinIds = Array.from(vinCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([vinId]) => vinId);

    const topVins = await prisma.vin.findMany({
      where: { id: { in: topVinIds } },
      select: { id: true, nom: true, domaine: true },
    });

    const topVinsData = topVinIds.map((vinId) => {
      const vin = topVins.find((v) => v.id === vinId);
      return {
        nom: vin ? `${vin.nom} (${vin.domaine})` : 'Inconnu',
        count: vinCounts.get(vinId) || 0,
      };
    });

    // 📊 3. RÉPARTITION PAR STATUT
    const statusCounts = {
      en_attente: 0,
      confirmee: 0,
      annulee: 0,
    };

    reservations.forEach((r) => {
      if (r.status in statusCounts) {
        statusCounts[r.status as keyof typeof statusCounts]++;
      }
    });

    const statusData = [
      { name: 'En attente', value: statusCounts.en_attente },
      { name: 'Confirmée', value: statusCounts.confirmee },
      { name: 'Annulée', value: statusCounts.annulee },
    ].filter((s) => s.value > 0); // Retirer les statuts à 0

    return NextResponse.json({
      evolutionData,
      topVinsData,
      statusData,
    });
  } catch (error) {
    console.error('Erreur stats:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
