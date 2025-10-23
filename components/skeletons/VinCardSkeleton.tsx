/**
 * VinCardSkeleton - Animation de chargement pour les cartes de vins
 *
 * 🎨 DESIGN : Imite la structure d'une carte de vin avec animation pulse
 *
 * Utilise animate-pulse de Tailwind qui fait automatiquement une animation
 * d'opacité de 100% à 50% en boucle
 */

export default function VinCardSkeleton() {
  return (
    <div className="block rounded-2xl border border-gray-100 shadow-sm bg-white overflow-hidden">
      {/* Image placeholder avec animation */}
      <div className="relative w-full aspect-square bg-gray-200 animate-pulse" />

      {/* Infos placeholder */}
      <div className="p-4 space-y-3">
        {/* Nom du vin */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />

        {/* Domaine + année */}
        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />

        {/* Prix */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
      </div>
    </div>
  );
}
