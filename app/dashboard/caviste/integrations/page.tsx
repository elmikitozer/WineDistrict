/**
 * Page Intégrations - Dashboard Caviste
 *
 * Permet au caviste de :
 * - Connecter SumUp ou POS Pro
 * - Voir le statut de la connexion
 * - Synchroniser manuellement le stock
 * - Mapper les produits externes aux vins
 */

import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function IntegrationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const cavisteId = user.cavisteId ?? user.caviste?.id;
  if (!cavisteId) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-2">Intégrations</h1>
        <p>Votre compte n&apos;est pas lié à un caviste.</p>
      </div>
    );
  }

  // Récupérer les intégrations existantes
  const integrations = await prisma.integrationConnection.findMany({
    where: { cavisteId },
    orderBy: { createdAt: 'desc' },
  });

  const sumupIntegration = integrations.find((i) => i.provider === 'sumup');
  const posproIntegration = integrations.find((i) => i.provider === 'pospro');

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <header>
        <h1 className="text-2xl font-semibold">Intégrations</h1>
        <p className="text-gray-600 mt-1">
          Connectez votre système de caisse pour synchroniser automatiquement vos stocks.
        </p>
      </header>

      {/* SumUp */}
      <section className="border rounded-lg p-6 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">💳</span>
              SumUp
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Synchronisez vos produits et stocks depuis votre caisse SumUp
            </p>
          </div>

          {sumupIntegration ? (
            <div className="flex items-center gap-2">
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                ✓ Connecté
              </span>
            </div>
          ) : (
            <Link
              href={`/api/integrations/sumup/connect?cavisteId=${cavisteId}`}
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 font-medium text-sm"
            >
              Connecter SumUp
            </Link>
          )}
        </div>

        {sumupIntegration && (
          <div className="mt-4 space-y-3">
            <div className="text-sm">
              <span className="text-gray-500">Merchant ID :</span>{' '}
              <span className="font-mono">{sumupIntegration.merchantId || 'N/A'}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Dernière mise à jour :</span>{' '}
              {new Date(sumupIntegration.updatedAt).toLocaleString('fr-FR')}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                onClick={async () => {
                  // TODO: Implémenter la synchro côté client avec fetch
                  alert('Synchronisation manuelle à implémenter (voir INTEGRATION_GUIDE.md)');
                }}
              >
                🔄 Synchroniser maintenant
              </button>
              <Link
                href="/dashboard/caviste/integrations/sumup/mapping"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium"
              >
                🔗 Mapper les produits
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* POS Pro */}
      <section className="border rounded-lg p-6 bg-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-2xl">🛒</span>
              POS Pro
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Synchronisez vos produits et stocks depuis votre caisse POS Pro
            </p>
          </div>

          {posproIntegration ? (
            <div className="flex items-center gap-2">
              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                ✓ Connecté
              </span>
            </div>
          ) : (
            <button
              className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 font-medium text-sm"
              onClick={() => {
                // TODO: Ouvrir une modal pour saisir API Key + Store ID
                alert('Configuration POS Pro à implémenter (voir INTEGRATION_GUIDE.md)');
              }}
            >
              Connecter POS Pro
            </button>
          )}
        </div>

        {posproIntegration && (
          <div className="mt-4 space-y-3">
            <div className="text-sm">
              <span className="text-gray-500">Store ID :</span>{' '}
              <span className="font-mono">{posproIntegration.merchantId || 'N/A'}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-500">Dernière mise à jour :</span>{' '}
              {new Date(posproIntegration.updatedAt).toLocaleString('fr-FR')}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
                onClick={() => {
                  alert('Synchronisation manuelle à implémenter (voir INTEGRATION_GUIDE.md)');
                }}
              >
                🔄 Synchroniser maintenant
              </button>
              <Link
                href="/dashboard/caviste/integrations/pospro/mapping"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 text-sm font-medium"
              >
                🔗 Mapper les produits
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Documentation */}
      <section className="border border-blue-200 rounded-lg p-6 bg-blue-50">
        <h3 className="font-semibold text-blue-900 flex items-center gap-2">
          <span>📘</span>
          Documentation
        </h3>
        <p className="text-sm text-blue-800 mt-2">
          Consultez le guide d&apos;intégration complet pour configurer les webhooks et mapper vos
          produits.
        </p>
        <div className="mt-3">
          <Link
            href="/docs/integration-guide"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Voir le guide complet →
          </Link>
        </div>
      </section>
    </div>
  );
}
