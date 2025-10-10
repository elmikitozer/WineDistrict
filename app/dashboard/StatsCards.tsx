import { prisma } from '@/lib/prisma';
import Link from 'next/link';

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
    bg: string;
    border: string;
    text: string;
  }> = [
    {
      key: 'total',
      title: 'Total',
      value: total,
      bg: 'bg-rose-50',
      border: 'border-gray-200',
      text: 'text-gray-800',
    },
    {
      key: 'en_attente',
      title: 'En attente',
      value: enAttente,
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
    },
    {
      key: 'confirmee',
      title: 'Confirmées',
      value: confirmee,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
    },
    {
      key: 'annulee',
      title: 'Annulées',
      value: annulee,
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const isActive =
          (c.key === 'total' && !activeStatus) || (c.key !== 'total' && activeStatus === c.key);
        // Color-matched active styles per card
        const activeRing =
          c.key === 'en_attente'
            ? 'ring-amber-500'
            : c.key === 'confirmee'
            ? 'ring-green-500'
            : c.key === 'annulee'
            ? 'ring-gray-500'
            : 'ring-rose-500'; // total
        const activeBorder =
          c.key === 'en_attente'
            ? 'border-2 border-amber-400'
            : c.key === 'confirmee'
            ? 'border-2 border-green-400'
            : c.key === 'annulee'
            ? 'border-2 border-gray-400'
            : 'border-2 border-rose-400';
        const activeCls = isActive ? `ring-2 ${activeRing} ${activeBorder} shadow-md` : '';
        // Build URL with explicit status handling and q preservation
        const sp = new URLSearchParams();
        if (c.key !== 'total') sp.set('status', String(c.key));
        if (q && q.trim()) sp.set('q', q.trim());
        const href = sp.toString() ? `/dashboard?${sp.toString()}` : '/dashboard';
        return (
          <Link
            key={c.title}
            href={href}
            prefetch={false}
            aria-current={isActive ? 'page' : undefined}
            className={`${c.bg} ${c.border} ${c.text} border rounded-xl p-4 shadow-sm transition
              hover:shadow-md hover:-translate-y-0.5 hover:ring-2 hover:ring-rose-200
              ${activeCls}
            `}
          >
            <div className="text-sm opacity-80 flex items-center justify-between">
              <span>{c.title}</span>
              <span className="text-rose-400 group-hover:text-rose-500"></span>
            </div>
            <div className="text-2xl font-semibold mt-1">{c.value}</div>
          </Link>
        );
      })}
    </div>
  );
}
