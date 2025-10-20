import { prisma } from '@/lib/prisma';
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

  const cards: Array<{
    key: 'total' | 'en_attente' | 'confirmee' | 'annulee';
    title: string;
    value: number;
  }> = [
    { key: 'total', title: 'Total', value: totalCount },
    { key: 'en_attente', title: 'En attente', value: enAttenteCount },
    { key: 'confirmee', title: 'Confirmées', value: confirmeeCount },
    { key: 'annulee', title: 'Annulées', value: annuleeCount },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const isActive =
          (c.key === 'total' && !activeStatus) || (c.key !== 'total' && activeStatus === c.key);
        const sp = new URLSearchParams();
        if (c.key !== 'total') sp.set('status', String(c.key));
        if (q && q.trim()) sp.set('q', q.trim());
        const href = sp.toString() ? `/dashboard?${sp.toString()}` : '/dashboard';
        return (
          <StatsCardLinkClient
            key={c.title}
            k={c.key}
            title={c.title}
            value={c.value}
            href={href}
            ssrActive={isActive}
          />
        );
      })}
    </div>
  );
}
