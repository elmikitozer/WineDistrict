import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import ReservationsTableClient from './ReservationsTableClient';
import StatsCards from './StatsCards';
import Toolbar from './Toolbar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type AllowedStatus = '' | 'en_attente' | 'confirmee' | 'annulee';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Ensure no caching at all for this page render
  noStore();
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const cavisteId = user.cavisteId ?? user.caviste?.id;
  const rawStatus = searchParams?.status;
  const rawQ = searchParams?.q;
  const activeStatusRaw = Array.isArray(rawStatus) ? rawStatus[0] || '' : rawStatus || '';
  const activeStatusLower = activeStatusRaw.trim().toLowerCase();
  const allowed: Array<'en_attente' | 'confirmee' | 'annulee'> = [
    'en_attente',
    'confirmee',
    'annulee',
  ];
  const activeStatus: AllowedStatus = (allowed as string[]).includes(activeStatusLower)
    ? (activeStatusLower as AllowedStatus)
    : '';
  const qParam = Array.isArray(rawQ) ? rawQ[0] || '' : rawQ || '';
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tableau de bord</h1>
          <p className="text-sm text-gray-600">Connecté en tant que {user.email}</p>
          {user.caviste?.nom && (
            <p className="text-sm text-gray-500">Caviste: {user.caviste.nom}</p>
          )}
        </div>
        <form action="/api/auth/logout" method="post">
          <button className="text-sm text-red-600 underline">Se déconnecter</button>
        </form>
      </header>

      {!cavisteId ? (
        <p>Votre compte n&apos;est pas lié à un caviste. Contactez un administrateur.</p>
      ) : (
        <>
          <section className="space-y-4">
            <StatsCards cavisteId={cavisteId} activeStatus={activeStatus} q={qParam} />
            <Toolbar />
            <div className="border rounded-xl overflow-hidden">
              {/* Key on search params so it remounts when filters change */}
              <ReservationsTableClient key={`${activeStatus}|${qParam}`} />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
// Server-only helpers below (reserved for future extensions)
