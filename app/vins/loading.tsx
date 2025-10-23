/**
 * Loading state pour /vins
 *
 * Affiche une grille de skeleton loaders pendant le chargement initial
 */

import VinCardSkeleton from '@/components/skeletons/VinCardSkeleton';

export default function Loading() {
  return (
    <main className="p-10 max-w-6xl mx-auto">
      {/* Titre skeleton */}
      <div className="h-10 bg-gray-200 rounded animate-pulse w-1/3 mx-auto mb-6" />

      {/* Filtres skeleton */}
      <div className="flex justify-center gap-4 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Grille de vins - 24 cartes (grille 4x6) */}
      <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 24 }).map((_, i) => (
          <li key={i}>
            <VinCardSkeleton />
          </li>
        ))}
      </ul>
    </main>
  );
}
