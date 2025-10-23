/**
 * TableSkeleton - Animation de chargement pour les tableaux
 *
 * 🎨 DESIGN : Imite un tableau avec lignes animées
 *
 * @param rows - Nombre de lignes à afficher (défaut: 5)
 * @param cols - Nombre de colonnes à afficher (défaut: 6)
 */

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function TableSkeleton({ rows = 5, cols = 6 }: TableSkeletonProps) {
  return (
    <div className="w-full">
      <table className="w-full text-sm">
        <thead className="bg-rose-50">
          <tr>
            {Array.from({ length: cols }).map((_, i) => (
              <th key={i} className="text-left px-4 py-3">
                <div className="h-4 bg-rose-200 rounded animate-pulse w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-t">
              {Array.from({ length: cols }).map((_, colIdx) => (
                <td key={colIdx} className="px-4 py-3">
                  <div
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{
                      width: `${Math.random() * 40 + 40}%`, // Largeur aléatoire 40-80%
                      animationDelay: `${rowIdx * 0.1}s`, // Décalage pour effet cascade
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
