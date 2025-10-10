import { prisma } from '@/lib/prisma';
import StatsCardLinkClient from './StatsCardLinkClient';

export default async function StatsCards({
  cavisteId,
  activeStatus,
  q,
}: {
  cavisteId: number;
  activeStatus?: '' | 'en_attente' | 'confirmee' | 'annulee';
  q?: string;
}) {
  // Aggregate counts per status and total
  const [total, enAttente, confirmee, annulee] = await Promise.all([
    prisma.reservation.count({ where: { cavisteId } }),
    prisma.reservation.count({ where: { cavisteId, status: 'en_attente' } }),
    prisma.reservation.count({ where: { cavisteId, status: 'confirmee' } }),
    prisma.reservation.count({ where: { cavisteId, status: 'annulee' } }),
  ]);

  const cards: Array<{
    key: 'en_attente' | 'confirmee' | 'annulee' | 'total';
    title: string;
    value: number;
  }> = [
    { key: 'total', title: 'Total', value: total },
    { key: 'en_attente', title: 'En attente', value: enAttente },
    { key: 'confirmee', title: 'Confirmées', value: confirmee },
    { key: 'annulee', title: 'Annulées', value: annulee },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const isActive =
          (c.key === 'total' && !activeStatus) || (c.key !== 'total' && activeStatus === c.key);
        // Build URL with explicit status handling and q preservation
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
