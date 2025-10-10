'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Key = 'total' | 'en_attente' | 'confirmee' | 'annulee';

function cardClasses(k: Key, active: boolean) {
  const base = 'group rounded-xl p-4 transition shadow-sm hover:shadow-md hover:-translate-y-0.5';
  if (active) {
    switch (k) {
      case 'en_attente':
        return `${base} bg-amber-50 border-2 border-amber-500 ring-2 ring-amber-500 text-amber-900`;
      case 'confirmee':
        return `${base} bg-green-50 border-2 border-green-500 ring-2 ring-green-500 text-green-900`;
      case 'annulee':
        return `${base} bg-gray-50 border-2 border-gray-500 ring-2 ring-gray-500 text-gray-900`;
      default:
        return `${base} bg-rose-50 border-2 border-rose-500 ring-2 ring-rose-500 text-rose-900`;
    }
  }
  switch (k) {
    case 'en_attente':
      return `${base} bg-amber-50 border border-amber-200 text-amber-800`;
    case 'confirmee':
      return `${base} bg-green-50 border border-green-200 text-green-800`;
    case 'annulee':
      return `${base} bg-gray-50 border border-gray-200 text-gray-800`;
    default:
      // Total (inactive) should keep rose background
      return `${base} bg-rose-50 border border-gray-200 text-gray-800`;
  }
}

export default function StatsCardLinkClient({
  k,
  title,
  value,
  href,
  ssrActive,
}: {
  k: Key;
  title: string;
  value: number;
  href: string;
  ssrActive: boolean;
}) {
  const params = useSearchParams();
  const status = params.get('status') || '';
  const isActive = k === 'total' ? !status : status === k;
  const classes = cardClasses(k, isActive);

  return (
    <Link
      href={href}
      prefetch={false}
      aria-current={isActive ? 'page' : undefined}
      className={classes}
      data-status={k}
      data-active={isActive ? 'true' : 'false'}
      data-ssr-active={ssrActive ? 'true' : 'false'}
    >
      <div className="text-sm opacity-80 flex items-center justify-between">
        <span>{title}</span>
        <span className="text-rose-400 group-hover:text-rose-500"></span>
      </div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </Link>
  );
}
