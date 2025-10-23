import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  // Vérifier que l'utilisateur est un client
  const user = await (
    prisma as unknown as {
      user?: {
        findUnique: (args: {
          where: { id: string | number };
          select: { role: boolean; id: boolean };
        }) => Promise<{ role: string; id: string } | null>;
      };
    }
  ).user?.findUnique({
    where: { id: session.userId },
    select: { role: true, id: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Récupérer les réservations du client
  const { searchParams } = new URL(req.url);
  const status = (searchParams.get('status') || '').trim();
  const q = (searchParams.get('q') || '').trim();
  const sortOrder = (searchParams.get('sortOrder') || 'desc').trim() as 'asc' | 'desc';

  // 📊 PAGINATION : 20 réservations par page
  const PER_PAGE = 20;
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * PER_PAGE;

  const andFilters: Array<Record<string, unknown>> = [{ userId: user.id }];

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

  // 🔍 CHARGER les réservations avec pagination + compter le total
  const [reservations, totalReservations] = await Promise.all([
    prisma.reservation.findMany({
      where,
      orderBy: { date: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc' },
      skip,
      take: PER_PAGE,
      include: {
        vin: true,
        caviste: {
          select: {
            id: true,
            slug: true,
            nom: true,
            adresse: true,
            telephone: true,
            email: true,
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
