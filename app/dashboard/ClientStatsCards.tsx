import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import StatsCardLinkClient from './StatsCardLinkClient';

type Props = {
  userId: string;
  activeStatus: '' | 'en_attente' | 'confirmee' | 'annulee';
  q: string;
};

export default async function ClientStatsCards({ userId, activeStatus, q }: Props) {
  const [totalCount, enAttenteCount, confirmeeCount, annuleeCount] = await Promise.all([
    prisma.reservation.count({ where: { userId } }),
    prisma.reservation.count({ where: { userId, status: 'en_attente' } }),
    prisma.reservation.count({ where: { userId, status: 'confirmee' } }),
    prisma.reservation.count({ where: { userId, status: 'annulee' } }),
  ]);

  const isActive = (st: string) => activeStatus === st;
  const href = (st: string) => {
    const params = new URLSearchParams();
    if (st) params.set('status', st);
    if (q) params.set('q', q);
    return `/dashboard?${params.toString()}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <Link
        href={href('')}
        className={`block border rounded-lg p-4 hover:shadow-md transition ${
          !activeStatus ? 'ring-2 ring-rose-500 bg-rose-50' : 'bg-white'
        }`}
      >
        <div className="text-sm text-gray-600">Total</div>
        <div className="text-3xl font-bold text-gray-800">{totalCount}</div>
      </Link>

      <StatsCardLinkClient
        label="En attente"
        count={enAttenteCount}
        href={href('en_attente')}
        active={isActive('en_attente')}
        color="amber"
      />

      <StatsCardLinkClient
        label="Confirmées"
        count={confirmeeCount}
        href={href('confirmee')}
        active={isActive('confirmee')}
        color="green"
      />

      <StatsCardLinkClient
        label="Annulées"
        count={annuleeCount}
        href={href('annulee')}
        active={isActive('annulee')}
        color="gray"
      />
    </div>
  );
}
