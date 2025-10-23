/**
 * VinsGrid - Composant CLIENT pour afficher les vins avec pagination hybrid
 *
 * 🎯 OBJECTIF : Combiner SEO (URLs paginées) + UX moderne (Load More AJAX)
 *
 * 📊 FONCTIONNEMENT :
 * 1. Reçoit les vins initiaux du Server Component
 * 2. Affiche un bouton "Afficher plus" si hasMore = true
 * 3. Au clic : charge les vins suivants via API (AJAX)
 * 4. Ajoute les nouveaux vins à la liste existante
 * 5. Met à jour l'URL pour le SEO (/vins?page=2)
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getVinImageUrl } from '@/lib/vinImage';

interface Vin {
  id: number;
  slug: string;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
  couleur: string;
  imageFile: string | null;
}

interface VinsGridProps {
  initialVins: Vin[]; // Vins chargés par le Server Component
  currentPage: number; // Page actuelle (1, 2, 3...)
  hasMore: boolean; // Y a-t-il d'autres pages ?
  totalVins: number; // Nombre total de vins (pour afficher "24/200 vins")
  filters: {
    q: string; // Recherche
    couleur: string; // Filtre couleur
  };
}

export default function VinsGrid({
  initialVins,
  currentPage,
  hasMore: initialHasMore,
  totalVins,
  filters,
}: VinsGridProps) {
  // 🔄 STATE : Liste des vins (commence avec initialVins)
  const [vins, setVins] = useState<Vin[]>(initialVins);

  // 🔄 STATE : Page actuelle (pour savoir quelle page charger ensuite)
  const [page, setPage] = useState(currentPage);

  // 🔄 STATE : Y a-t-il encore des vins à charger ?
  const [hasMore, setHasMore] = useState(initialHasMore);

  // 🔄 STATE : Chargement en cours
  const [loading, setLoading] = useState(false);

  /**
   * 🚀 FONCTION : Charger plus de vins (AJAX)
   *
   * 1. Appelle l'API /api/vins/load-more?page=2&q=...&couleur=...
   * 2. Récupère les vins de la page suivante
   * 3. Les ajoute à la liste existante
   * 4. Met à jour l'URL (pour le SEO)
   */
  async function loadMore() {
    setLoading(true);

    try {
      const nextPage = page + 1;

      // 📡 APPEL API : Charger les vins de la page suivante
      const params = new URLSearchParams({
        page: String(nextPage),
        q: filters.q,
        couleur: filters.couleur,
      });

      const res = await fetch(`/api/vins/load-more?${params.toString()}`);

      if (!res.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const data = await res.json();

      // ✅ MISE À JOUR : Ajouter les nouveaux vins à la liste
      setVins((prev) => [...prev, ...data.vins]);
      setPage(nextPage);
      setHasMore(data.hasMore);

      // 🔗 SEO : Mettre à jour l'URL sans recharger la page
      // Google verra /vins?page=2 dans l'historique
      const url = new URLSearchParams();
      if (filters.q) url.set('q', filters.q);
      if (filters.couleur !== 'tous') url.set('couleur', filters.couleur);
      url.set('page', String(nextPage));

      window.history.pushState({}, '', `/vins?${url.toString()}`);
    } catch (error) {
      console.error('Erreur chargement vins:', error);
      alert('Erreur lors du chargement des vins');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* 🎨 GRILLE DE VINS : Affichage responsive (2 cols mobile, 4 cols desktop) */}
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {vins.map((vin) => {
          const img = getVinImageUrl(vin);
          return (
            <li key={vin.id}>
              <Link
                href={`/vins/${vin.slug}`}
                className="block rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition bg-white group focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {/* 📷 IMAGE du vin */}
                <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl ">
                  <Image
                    src={img}
                    alt={`BIB de ${vin.nom}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-3"
                    priority={false}
                    unoptimized
                  />
                </div>

                {/* ℹ️ INFOS du vin */}
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-rose-700 transition">
                    {vin.nom}
                  </h2>
                  <p className="text-xs text-gray-500 mb-2 italic">
                    {vin.domaine} • {vin.année}
                  </p>
                  <p className="text-rose-700 font-semibold text-sm">{vin.prix.toFixed(2)} €</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 📊 INDICATEUR : "24 / 200 vins affichés" */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          <span className="font-semibold text-rose-700">{vins.length}</span> / {totalVins} vins affichés
        </p>
      </div>

      {/* 🔽 BOUTON "AFFICHER PLUS" (seulement s'il reste des vins) */}
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
              <>
                <span>📦</span>
                <span>Afficher plus de vins</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ✅ MESSAGE de fin (quand tous les vins sont affichés) */}
      {!hasMore && vins.length > 0 && vins.length === totalVins && (
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>🍷 Vous avez vu tous nos vins !</p>
        </div>
      )}
    </>
  );
}

