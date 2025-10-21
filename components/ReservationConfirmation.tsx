'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReservationConfirmation() {
  const [show, setShow] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Vérifier si on vient d'une réservation réussie
    const success = searchParams.get('reservation') === 'success';
    if (success) {
      setShow(true);
      // Masquer après 5 secondes
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
        {/* Icône de succès */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Réservation confirmée ! 🍷
        </h3>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          Votre demande de réservation a été envoyée avec succès. Le caviste vous contactera bientôt
          pour confirmer votre commande.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setShow(false)}
            className="flex-1 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium"
          >
            Parfait !
          </button>
          <a
            href="/dashboard"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium text-center"
          >
            Voir mes commandes
          </a>
        </div>
      </div>
    </div>
  );
}
