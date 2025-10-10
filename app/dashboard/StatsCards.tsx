import { prisma } from '@/lib/prisma';
import Link from 'next/link';
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
    key: '' | 'en_attente' | 'confirmee' | 'annulee' | 'total';
    title: string;
    value: number;
  }> = [
    { key: 'total', title: 'Total', value: total },
    { key: 'en_attente', title: 'En attente', value: enAttente },
    { key: 'confirmee', title: 'Confirmées', value: confirmee },
    { key: 'annulee', title: 'Annulées', value: annulee },
  ];

  function cardClasses(k: 'total' | 'en_attente' | 'confirmee' | 'annulee' | '', active: boolean) {
    // Base container (group enables group-hover on children)
    const base = 'group rounded-xl p-4 transition shadow-sm hover:shadow-md hover:-translate-y-0.5';
    if (active) {
      switch (k) {
        case 'en_attente':
          return `${base} bg-amber-50 border-2 border-amber-500 ring-2 ring-amber-500 text-amber-900`;
        case 'confirmee':
          return `${base} bg-green-50 border-2 border-green-500 ring-2 ring-green-500 text-green-900`;
        case 'annulee':
          return `${base} bg-gray-50 border-2 border-gray-500 ring-2 ring-gray-500 text-gray-900`;
        default: // total
          return `${base} bg-rose-50 border-2 border-rose-500 ring-2 ring-rose-500 text-rose-900`;
      }
    }
    // Inactive
    switch (k) {
      case 'en_attente':
        return `${base} bg-amber-50 border border-amber-200 text-amber-800`;
      case 'confirmee':
        return `${base} bg-green-50 border border-green-200 text-green-800`;
      case 'annulee':
        return `${base} bg-gray-50 border border-gray-200 text-gray-800`;
      default: // total inactive stays neutral
        return `${base} bg-white border border-gray-200 text-gray-800`;
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const isActive =
          (c.key === 'total' && !activeStatus) || (c.key !== 'total' && activeStatus === c.key);
        const classes = cardClasses(c.key, isActive);
        // Build URL with explicit status handling and q preservation
        const sp = new URLSearchParams();
        if (c.key !== 'total') sp.set('status', String(c.key));
        if (q && q.trim()) sp.set('q', q.trim());
        const href = sp.toString() ? `/dashboard?${sp.toString()}` : '/dashboard';
        return (
          <StatsCardLinkClient
            key={c.title}
            k={c.key as any}
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
