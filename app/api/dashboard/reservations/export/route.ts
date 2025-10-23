/**
 * API Export CSV - Réservations Dashboard Caviste
 *
 * GET /api/dashboard/reservations/export?format=csv&status=...&q=...&sortOrder=...
 *
 * Exporte les réservations au format CSV avec les mêmes filtres que le dashboard
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  // get user cavisteId
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
    return NextResponse.json({ error: 'Aucun caviste associé' }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const status = (searchParams.get('status') || '').trim();
  const q = (searchParams.get('q') || '').trim();
  const sortOrder = (searchParams.get('sortOrder') || 'desc').trim() as 'asc' | 'desc';

  // Construire les filtres (même logique que l'API principale)
  const andFilters: Array<Record<string, unknown>> = [{ cavisteId: user.cavisteId }];
  if (['en_attente', 'confirmee', 'annulee'].includes(status)) {
    andFilters.push({ status });
  }
  if (q) {
    andFilters.push({
      OR: [
        { vin: { is: { nom: { contains: q, mode: 'insensitive' } } } },
        { vin: { is: { domaine: { contains: q, mode: 'insensitive' } } } },
      ],
    });
  }
  const where = andFilters.length > 1 ? { AND: andFilters } : andFilters[0];

  // Récupérer les réservations
  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc' },
    include: {
      vin: true,
      user: {
        select: {
          email: true,
          nom: true,
          prenom: true,
          telephone: true,
        },
      },
    },
  });

  // Générer le CSV
  const csvHeaders = [
    'ID',
    'Date',
    'Statut',
    'Vin',
    'Domaine',
    'Année',
    'Couleur',
    'Client Email',
    'Client Nom',
    'Client Prénom',
    'Client Téléphone',
  ].join(',');

  const csvRows = reservations.map((r) => {
    return [
      r.id,
      new Date(r.date).toLocaleString('fr-FR'),
      r.status,
      `"${r.vin.nom.replace(/"/g, '""')}"`, // Échapper les guillemets
      `"${r.vin.domaine.replace(/"/g, '""')}"`,
      r.vin.année,
      r.vin.couleur,
      r.user?.email || '',
      r.user?.nom || '',
      r.user?.prenom || '',
      r.user?.telephone || '',
    ].join(',');
  });

  const csv = [csvHeaders, ...csvRows].join('\n');

  // Ajouter le BOM UTF-8 pour Excel
  const bom = '\uFEFF';
  const csvWithBom = bom + csv;

  return new NextResponse(csvWithBom, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="reservations-${
        new Date().toISOString().split('T')[0]
      }.csv"`,
    },
  });
}
