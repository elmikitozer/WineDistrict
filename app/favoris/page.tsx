'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, Phone, Mail, Globe, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Caviste {
  id: number;
  slug: string | null;
  nom: string;
  adresse: string;
  description: string | null;
  telephone: string | null;
  email: string | null;
  siteWeb: string | null;
  imageUrl: string | null;
  stocks: Array<{
    vin: {
      nom: string;
      domaine: string;
      couleur: string;
    };
  }>;
}

interface Favori {
  id: string;
  cavisteId: number;
  createdAt: string;
  caviste: Caviste;
}

export default function FavorisPage() {
  const [favoris, setFavoris] = useState<Favori[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchFavoris();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchFavoris() {
    try {
      const res = await fetch('/api/favoris');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Erreur lors du chargement');
      }
      const data = await res.json();
      setFavoris(data.favoris || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setLoading(false);
    }
  }

  async function retirerDesFavoris(cavisteId: number) {
    if (!confirm('Retirer ce caviste de vos favoris ?')) return;

    try {
      const res = await fetch('/api/favoris', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cavisteId }),
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression');

      // Retirer de la liste locale
      setFavoris(favoris.filter((f) => f.cavisteId !== cavisteId));
      toast.success('Caviste retiré des favoris');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur inattendue');
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Chargement de vos favoris...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (favoris.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center">
        <Heart className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Aucun favori</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Parcourez notre sélection de cavistes et ajoutez vos préférés à vos favoris !
        </p>
        <Link
          href="/cavistes"
          className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition font-medium"
        >
          Découvrir les cavistes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">⭐ Mes cavistes favoris</h1>
        <p className="text-gray-600">
          {favoris.length} caviste{favoris.length > 1 ? 's' : ''} dans vos favoris
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favoris.map((favori) => {
          const { caviste } = favori;
          const cavisteUrl = caviste.slug ? `/cavistes/${caviste.slug}` : `/cavistes/${caviste.id}`;

          return (
            <div
              key={favori.id}
              className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              {caviste.imageUrl && (
                <div className="h-48 bg-gray-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caviste.imageUrl}
                    alt={caviste.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{caviste.nom}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {caviste.adresse}
                    </p>
                  </div>
                  <button
                    onClick={() => retirerDesFavoris(caviste.id)}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition"
                    aria-label="Retirer des favoris"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Description */}
                {caviste.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{caviste.description}</p>
                )}

                {/* Contact */}
                <div className="space-y-2 mb-4">
                  {caviste.telephone && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {caviste.telephone}
                    </p>
                  )}
                  {caviste.email && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {caviste.email}
                    </p>
                  )}
                  {caviste.siteWeb && (
                    <a
                      href={caviste.siteWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-rose-600 hover:text-rose-800 flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Site web
                    </a>
                  )}
                </div>

                {/* Vins disponibles */}
                {caviste.stocks.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                      Vins disponibles
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {caviste.stocks.slice(0, 3).map((stock, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {stock.vin.nom}
                        </span>
                      ))}
                      {caviste.stocks.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{caviste.stocks.length - 3} autres
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <Link
                  href={cavisteUrl}
                  className="block text-center bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 transition font-medium"
                >
                  Voir la fiche complète
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
