'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface FavoriteButtonProps {
  cavisteId: number;
  initialIsFavorite: boolean;
  variant?: 'default' | 'compact';
}

export default function FavoriteButton({
  cavisteId,
  initialIsFavorite,
  variant = 'default',
}: FavoriteButtonProps) {
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
        toast.error('Retiré des favoris');
      } else {
        // Ajouter aux favoris
        const res = await fetch('/api/favoris', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cavisteId }),
        });

        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        setIsFavorite(true);
        toast.success('Ajouté aux favoris !');
      }

      // Rafraîchir la page pour mettre à jour les données
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }

  if (variant === 'compact') {
    // Version compacte pour la sidebar
    return (
      <button
        onClick={toggleFavorite}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
          isFavorite
            ? 'bg-rose-600 text-white hover:bg-rose-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
        {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      </button>
    );
  }

  // Version par défaut (hero)
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
