'use client';

import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart, itemCount } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleValidateCart() {
    if (items.length === 0) return;

    setSubmitting(true);
    setError(null);

    try {
      // Créer toutes les réservations en parallèle
      const promises = items.map(async (item) => {
        // Récupérer le token CSRF
        const csrfRes = await fetch('/api/csrf', { cache: 'no-store' });
        if (!csrfRes.ok) throw new Error('Erreur CSRF');
        const { csrfToken } = await csrfRes.json();

        // Créer la réservation
        const res = await fetch('/api/reservation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vinId: item.vinId,
            cavisteId: item.cavisteId,
            csrfToken,
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Erreur pour ${item.vinNom}`);
        }

        return res.json();
      });

      await Promise.all(promises);

      // Vider le panier
      clearCart();

      // Rediriger vers la page de confirmation
      router.push('/order-confirmation');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la validation');
    } finally {
      setSubmitting(false);
    }
  }

  if (itemCount === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">
            Parcourez notre sélection de vins pour ajouter des articles à votre panier.
          </p>
          <Link
            href="/vins"
            className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium"
          >
            Découvrir nos vins
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon panier</h1>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={`${item.vinId}-${item.cavisteId}`}
            className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.vinNom}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {item.vinDomaine} • {item.vinAnnee}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-700">Caviste :</p>
                  <p className="text-sm text-gray-600">{item.cavisteNom}</p>
                  <p className="text-xs text-gray-500">{item.cavisteAdresse}</p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.vinId, item.cavisteId)}
                className="text-red-600 hover:text-red-800 transition p-2 hover:bg-red-50 rounded"
                aria-label="Retirer du panier"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Récapitulatif</h2>
          <p className="text-lg font-medium text-gray-700">
            {itemCount} article{itemCount > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => clearCart()}
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Vider le panier
          </button>
          <button
            onClick={handleValidateCart}
            disabled={submitting}
            className="flex-1 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Validation en cours...' : 'Valider ma commande'}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          En validant, vous confirmez votre réservation auprès des cavistes sélectionnés.
        </p>
      </div>
    </div>
  );
}
