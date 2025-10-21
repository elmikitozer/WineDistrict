'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

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

interface Vin {
  nom: string;
  domaine: string;
  année: number;
}

export default function CavistesModal({
  cavistes,
  isAuthenticated,
  vin,
}: {
  cavistes: Stock[];
  isAuthenticated?: boolean;
  vin: Vin;
}) {
  const [open, setOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showAddedPopup, setShowAddedPopup] = useState(false);
  const router = useRouter();
  const cart = useCart();

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

            <ul className="space-y-4">
              {cavistes
                .filter((s) => s.caviste)
                .map((stock) => (
                  <li key={stock.id} className="border p-4 rounded-md">
                    <p className="font-medium text-gray-800">{stock.caviste!.nom}</p>
                    <p className="text-sm text-gray-500">{stock.caviste!.adresse}</p>

                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          cart.addItem({
                            vinId: stock.vinId,
                            cavisteId: stock.caviste!.id,
                            vinNom: vin.nom,
                            vinDomaine: vin.domaine,
                            vinAnnee: vin.année,
                            cavisteNom: stock.caviste!.nom,
                            cavisteAdresse: stock.caviste!.adresse,
                          });
                          setShowAddedPopup(true);
                          setTimeout(() => setShowAddedPopup(false), 2000);
                        }}
                        disabled={cart.isInCart(stock.vinId, stock.caviste!.id)}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                      >
                        {cart.isInCart(stock.vinId, stock.caviste!.id)
                          ? 'Déjà dans le panier'
                          : 'Ajouter au panier'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowLoginPopup(true)}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 mt-2"
                      >
                        Ajouter au panier
                      </button>
                    )}
                  </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => setOpen(false)} className="text-sm text-gray-500 underline">
                Fermer
              </button>
              {cart.itemCount > 0 && (
                <button
                  onClick={() => router.push('/cart')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm font-medium"
                >
                  Voir mon panier ({cart.itemCount})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Popup "Ajouté au panier" */}
      {showAddedPopup && (
        <div className="fixed bottom-4 right-4 z-[70] bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Ajouté au panier !</span>
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
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">Connexion requise</h3>

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
                  // Passer l'URL actuelle comme paramètre de redirection
                  const currentPath = window.location.pathname;
                  router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
                }}
                className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium"
              >
                Se connecter
              </button>
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  setOpen(false);
                  // Passer l'URL actuelle comme paramètre de redirection
                  const currentPath = window.location.pathname;
                  router.push(`/signup?redirect=${encodeURIComponent(currentPath)}`);
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
