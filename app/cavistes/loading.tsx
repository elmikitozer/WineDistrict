/**
 * Loading state pour /cavistes
 *
 * Affiche des skeleton loaders pendant le chargement
 */

import CavisteSkeleton from '@/components/skeletons/CavisteSkeleton';

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Titre skeleton */}
      <div className="h-10 bg-gray-200 rounded animate-pulse w-1/2 mx-auto mb-12" />

      {/* Liste de cavistes - 12 skeletons */}
      <div className="space-y-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <CavisteSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}
