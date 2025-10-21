// lib/cavisteImage.ts
type CavisteImageData = {
  imageUrl?: string | null;
  nom: string;
};

/**
 * Génère l'URL de l'image pour un caviste
 * - Si le caviste a un imageUrl (Supabase ou local), retourne le chemin
 * - Sinon, retourne une URL vers le placeholder dynamique
 */
export function getCavisteImageUrl(caviste: CavisteImageData): string {
  const { imageUrl, nom } = caviste;

  // Si on a un fichier image
  if (imageUrl) {
    // URL absolue (Supabase ou autre)
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    // Chemin absolu local
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    // Nom de fichier simple
    if (imageUrl.includes('.')) {
      // Vérifier si Supabase est configuré
      const base = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const bucket = process.env.SUPABASE_BUCKET || 'images';

      if (base) {
        // Image sur Supabase
        return `${base}/storage/v1/object/public/${bucket}/cavistes/${imageUrl}`;
      } else {
        // Fallback : image locale dans /public/cavistes/
        return `/cavistes/${imageUrl}`;
      }
    }
  }

  // Générer un placeholder dynamique
  const params = new URLSearchParams({
    nom,
  });

  return `/api/caviste-placeholder?${params.toString()}`;
}

/**
 * Vérifie si un caviste a une vraie image ou utilise un placeholder
 */
export function hasRealImage(caviste: CavisteImageData): boolean {
  return !!caviste.imageUrl;
}
