'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Caviste {
  id: number;
  nom: string;
  adresse: string;
}

interface Stock {
  id: number;
  vinId: number;
  caviste?: Caviste;
}

export default function CavistesModal({ cavistes, isAuthenticated }: { cavistes: Stock[], isAuthenticated?: boolean }) {
  const [open, setOpen] = useState(false);
  const [csrf, setCsrf] = useState<string | null>(null);
  const [csrfError, setCsrfError] = useState<string | null>(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    // Récupère le token et pose le cookie wd_csrf
    (async () => {
      try {
        const res = await fetch('/api/csrf', { cache: 'no-store' });
        if (!res.ok) throw new Error('CSRF fetch failed');
        const { csrfToken } = await res.json();
        setCsrf(csrfToken);
      } catch {
        setCsrfError('Sécurisation indisponible, réessaie dans un instant.');
      }
    })();
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
      >
        Voir les cavistes
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-auto shadow-xl">
            <h2 className="text-xl font-bold mb-4">Cavistes disponibles</h2>

            {csrfError && <p className="mb-3 text-sm text-red-600">{csrfError}</p>}

            <ul className="space-y-4">
              {cavistes
                .filter((s) => s.caviste)
                .map((stock) => (
                  <li key={stock.id} className="border p-4 rounded-md">
                    <p className="font-medium text-gray-800">{stock.caviste!.nom}</p>
                    <p className="text-sm text-gray-500">{stock.caviste!.adresse}</p>

                    {isAuthenticated ? (
                      <form action="/api/reservation" method="POST" className="mt-2">
                        <input type="hidden" name="vinId" value={stock.vinId} />
                        <input type="hidden" name="cavisteId" value={stock.caviste!.id} />
                        {/* 🔐 CSRF double-submit */}
                        <input type="hidden" name="_csrf" value={csrf ?? ''} />
                        <button
                          type="submit"
                          disabled={!csrf}
                          aria-disabled={!csrf}
                          className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 disabled:opacity-50"
                          title={!csrf ? 'Sécurisation en cours...' : 'Réserver'}
                        >
                          {csrf ? 'Réserver' : 'Sécurisation…'}
                        </button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setShowLoginPopup(true)}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 mt-2"
                      >
                        Réserver
                      </button>
                    )}
                  </li>
                ))}
            </ul>

            <button onClick={() => setOpen(false)} className="mt-6 text-sm text-gray-500 underline">
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Popup de connexion requise */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            {/* Icône d'alerte */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            {/* Titre */}
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Connexion requise
            </h3>

            {/* Message */}
            <p className="text-gray-600 text-center mb-6">
              Vous devez être connecté en tant que client pour effectuer une réservation.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  setOpen(false);
                  router.push('/login');
                }}
                className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  setOpen(false);
                  router.push('/signup');
                }}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Créer un compte
              </button>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
