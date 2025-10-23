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

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: { date: ['asc', 'desc'].includes(sortOrder) ? sortOrder : 'desc' },
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
  });

  return NextResponse.json({ items: reservations });
}
