'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FavoriteButtonProps {
  cavisteId: number;
  initialIsFavorite: boolean;
}

export default function FavoriteButton({ cavisteId, initialIsFavorite }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggleFavorite() {
    setLoading(true);

    try {
      if (isFavorite) {
        // Retirer des favoris
        const res = await fetch('/api/favoris', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cavisteId }),
        });

        if (!res.ok) throw new Error('Erreur lors de la suppression');
        setIsFavorite(false);
      } else {
        // Ajouter aux favoris
        const res = await fetch('/api/favoris', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cavisteId }),
        });

        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        setIsFavorite(true);
      }

      // Rafraîchir la page pour mettre à jour les données
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      alert(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
        isFavorite
          ? 'bg-white text-rose-600 hover:bg-rose-50'
          : 'bg-white/20 text-white hover:bg-white/30'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
      {isFavorite ? 'Dans mes favoris' : 'Ajouter aux favoris'}
    </button>
  );
}
