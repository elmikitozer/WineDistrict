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

  // 🆕 FILTRES AVANCÉS
  const dateFrom = searchParams.get('dateFrom');
  const dateTo = searchParams.get('dateTo');
  const vinId = searchParams.get('vinId');
  const clientSearch = (searchParams.get('clientSearch') || '').trim();

  // 📊 PAGINATION : 20 réservations par page
  const PER_PAGE = 20;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * PER_PAGE;

  const andFilters: Array<Record<string, unknown>> = [{ cavisteId: user.cavisteId }];

  // Filtre statut
  if (['en_attente', 'confirmee', 'annulee'].includes(status)) {
    andFilters.push({ status });
  }

  // Filtre recherche (vin)
  if (q) {
    andFilters.push({
      OR: [
        { vin: { is: { nom: { contains: q, mode: 'insensitive' } } } },
        { vin: { is: { domaine: { contains: q, mode: 'insensitive' } } } },
      ],
    });
  }

  // 🆕 Filtre plage de dates
  if (dateFrom || dateTo) {
    const dateFilter: Record<string, unknown> = {};
    if (dateFrom) dateFilter.gte = new Date(dateFrom);
    if (dateTo) {
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999); // Fin de journée
      dateFilter.lte = endDate;
    }
    andFilters.push({ date: dateFilter });
  }

  // 🆕 Filtre par vin spécifique
  if (vinId) {
    andFilters.push({ vinId: parseInt(vinId, 10) });
  }

  // 🆕 Filtre par client
  if (clientSearch) {
    andFilters.push({
      OR: [
        { user: { is: { nom: { contains: clientSearch, mode: 'insensitive' } } } },
        { user: { is: { prenom: { contains: clientSearch, mode: 'insensitive' } } } },
        { user: { is: { email: { contains: clientSearch, mode: 'insensitive' } } } },
      ],
    });
  }

  const where = andFilters.length > 1 ? { AND: andFilters } : andFilters[0];

  // 🔍 CHARGER les réservations avec pagination + compter le total
  const [reservations, totalReservations] = await Promise.all([
    prisma.reservation.findMany({
      where,
      orderBy: { date: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc' },
      skip,
      take: PER_PAGE,
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
    }),
    prisma.reservation.count({ where }),
  ]);

  const totalPages = Math.ceil(totalReservations / PER_PAGE);

  return NextResponse.json({
    items: reservations,
    pagination: {
      currentPage: page,
      totalPages,
      totalReservations,
      perPage: PER_PAGE,
    },
  });
}
