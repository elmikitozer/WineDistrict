/**
 * CavistesGrid - Composant CLIENT pour afficher les cavistes avec Load More
 * 
 * 🎯 OBJECTIF : Même logique que VinsGrid mais pour les cavistes
 * 
 * 📊 FONCTIONNEMENT :
 * 1. Affiche les cavistes initiaux
 * 2. Bouton "Afficher plus" charge les cavistes suivants en AJAX
 * 3. Met à jour l'URL pour le SEO
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Vin = {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
};

type Stock = {
  id: number;
  quantite: number;
  vin: Vin;
};

type Caviste = {
  id: number;
  nom: string;
  adresse: string;
  slug: string | null;
  imageUrl: string | null;
  stocks: Stock[];
};

interface CavistesGridProps {
  initialCavistes: Caviste[];
  currentPage: number;
  hasMore: boolean;
  totalCavistes: number;
}

export default function CavistesGrid({
  initialCavistes,
  currentPage,
  hasMore: initialHasMore,
  totalCavistes,
}: CavistesGridProps) {
  const [cavistes, setCavistes] = useState<Caviste[]>(initialCavistes);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  /**
   * 🚀 Charger plus de cavistes en AJAX
   */
  async function loadMore() {
    setLoading(true);

    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/cavistes/load-more?page=${nextPage}`);

      if (!res.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const data = await res.json();

      setCavistes((prev) => [...prev, ...data.cavistes]);
      setPage(nextPage);
      setHasMore(data.hasMore);

      // 🔗 SEO : Mettre à jour l'URL
      window.history.pushState({}, '', `/cavistes?page=${nextPage}`);
    } catch (error) {
      console.error('Erreur chargement cavistes:', error);
      alert('Erreur lors du chargement des cavistes');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 📍 LISTE DES CAVISTES */}
      <div className="space-y-10">
        {cavistes.map((caviste) => {
          const cavisteUrl = caviste.slug ? `/cavistes/${caviste.slug}` : `/cavistes/${caviste.id}`;
          const cavisteImageUrl =
            caviste.imageUrl || `/api/caviste-placeholder?nom=${encodeURIComponent(caviste.nom)}`;

          return (
            <section
              key={caviste.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-6 mb-6 items-start">
                {/* Infos caviste */}
                <div className="flex-1">
                  <Link
                    href={cavisteUrl}
                    className="text-xl font-semibold text-gray-800 hover:text-rose-600 transition"
                  >
                    {caviste.nom}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{caviste.adresse}</p>
                </div>

                {/* Image caviste */}
                <Link href={cavisteUrl} className="flex-shrink-0">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={cavisteImageUrl}
                      alt={caviste.nom}
                      fill
                      sizes="128px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </Link>
              </div>

              {/* Liste des vins en stock */}
              {caviste.stocks.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun vin répertorié pour le moment.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {caviste.stocks.map((stock) => (
                    <li key={stock.id} className="flex items-center justify-between py-3 text-sm">
                      <div className="text-left">
                        <span className="font-medium text-gray-900">{stock.vin.nom}</span>{' '}
                        <span className="text-gray-500 italic">({stock.vin.année})</span>
                      </div>
                      <div className="text-rose-600 font-semibold tabular-nums">
                        {stock.vin.prix.toFixed(2).replace('.', ',')} €
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {/* 📊 INDICATEUR */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          <span className="font-semibold text-rose-700">{cavistes.length}</span> / {totalCavistes} caviste{totalCavistes > 1 ? 's' : ''}
        </p>
      </div>

      {/* 🔽 BOUTON "AFFICHER PLUS" */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Chargement...</span>
              </>
            ) : (
              <span>Afficher plus de cavistes</span>
            )}
          </button>
        </div>
      )}

      {/* ✅ MESSAGE de fin */}
      {!hasMore && cavistes.length > 0 && cavistes.length === totalCavistes && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🍷 Vous avez vu tous nos cavistes partenaires !</p>
        </div>
      )}
    </>
  );
}

