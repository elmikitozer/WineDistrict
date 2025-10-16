import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function CavisteDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ sumup?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  // Load reservations and stocks for this caviste
  const cavisteId = user.cavisteId ?? user.caviste?.id;
  if (!cavisteId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Tableau de bord</h1>
        <p>Votre compte n&apos;est pas lié à un caviste.</p>
      </div>
    );
  }

  const params = await searchParams;
  const sumupStatus = params.sumup;

  const [reservations, stocks, sumupIntegration] = await Promise.all([
    prisma.reservation.findMany({
      where: { cavisteId },
      orderBy: { date: 'desc' },
      include: { vin: true },
    }),
    prisma.stock.findMany({ where: { cavisteId }, include: { vin: true } }),
    prisma.integrationConnection.findUnique({
      where: {
        provider_cavisteId: {
          provider: 'sumup',
          cavisteId,
        },
      },
    }),
  ]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Bonjour {user.email}</h1>
        {user.caviste?.nom && <p className="text-sm text-gray-500">Caviste: {user.caviste.nom}</p>}
        <form action="/api/auth/logout" method="post" className="mt-3">
          <button className="text-sm text-red-600 underline">Se déconnecter</button>
        </form>
      </div>

      {/* SumUp Integration Section */}
      <section className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Intégration SumUp</h2>
        
        {sumupStatus === 'connected' && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-green-800 text-sm">
            ✓ Connexion SumUp réussie !
          </div>
        )}
        
        {sumupStatus === 'error' && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
            ✗ Erreur lors de la connexion à SumUp. Veuillez réessayer.
          </div>
        )}

        {sumupIntegration ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-sm font-medium">Connecté à SumUp</span>
            </div>
            <div className="text-xs text-gray-600">
              <p>Connecté le: {new Date(sumupIntegration.createdAt).toLocaleDateString('fr-FR')}</p>
              {sumupIntegration.expiresAt && (
                <p>Expire le: {new Date(sumupIntegration.expiresAt).toLocaleDateString('fr-FR')}</p>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Votre compte SumUp est connecté. Vous pourrez bientôt importer votre stock depuis SumUp.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Connectez votre compte SumUp pour synchroniser automatiquement votre stock de vins.
            </p>
            <a
              href="/api/integrations/sumup/connect"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Connecter SumUp
            </a>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Réservations récentes</h2>
        <div className="space-y-2">
          {reservations.length === 0 && <p>Aucune réservation.</p>}
          {reservations.map((r) => (
            <div key={r.id} className="border rounded p-2 flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {r.vin.nom} — {r.vin.domaine} ({r.vin.année})
                </div>
                <div className="text-sm text-gray-600">{new Date(r.date).toLocaleString()}</div>
              </div>
              <span className="text-xs uppercase tracking-wide bg-gray-100 px-2 py-1 rounded">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Stocks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stocks.map((s) => (
            <div key={s.id} className="border rounded p-3">
              <div className="font-medium">
                {s.vin.nom} — {s.vin.domaine} ({s.vin.année})
              </div>
              <div className="text-sm text-gray-600">Quantité: {s.quantite}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
