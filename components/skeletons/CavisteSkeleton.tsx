/**
 * CavisteSkeleton - Animation de chargement pour les cartes cavistes
 *
 * 🎨 DESIGN : Imite la structure d'une carte caviste avec animation shimmer
 */

export default function CavisteSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex gap-6 mb-6 items-start">
        {/* Infos caviste */}
        <div className="flex-1 space-y-3">
          {/* Nom */}
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />

          {/* Adresse */}
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>

        {/* Image caviste */}
        <div className="flex-shrink-0 w-32 h-32 rounded-lg bg-gray-200 animate-pulse" />
      </div>

      {/* Liste des vins */}
      <div className="space-y-3">
        <div className="flex justify-between py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
        <div className="flex justify-between py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/5" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
        <div className="flex justify-between py-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
}
