// Utilitaires pour gérer les images de vin

type VinImageData = {
  imageFile?: string | null;
  nom: string;
  domaine: string;
  année: number;
  couleur: string;
};

/**
 * Génère l'URL de l'image pour un vin
 * - Si le vin a un imageFile (Supabase ou local), retourne le chemin
 * - Sinon, retourne une URL vers le placeholder dynamique
 */
export function getVinImageUrl(vin: VinImageData): string {
  const { imageFile, nom, domaine, année, couleur } = vin;

  // Si on a un fichier image
  if (imageFile) {
    // URL absolue (Supabase ou autre)
    if (imageFile.startsWith('http://') || imageFile.startsWith('https://')) {
      return imageFile;
    }
    // Chemin absolu local
    if (imageFile.startsWith('/')) {
      return imageFile;
    }
    // Nom de fichier simple (ex: "vin-54.webp" ou "3.png")
    // → On construit l'URL Supabase ou le chemin local
    if (imageFile.includes('.')) {
      // Vérifier si Supabase est configuré
      const base = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
      const bucket = process.env.SUPABASE_BUCKET || 'images';

      if (base) {
        // Image sur Supabase
        return `${base}/storage/v1/object/public/${bucket}/vins/${imageFile}`;
      } else {
        // Fallback : image locale dans /public/vins/
        return `/vins/${imageFile}`;
      }
    }
  }

  // Générer un placeholder dynamique
  const params = new URLSearchParams({
    nom,
    domaine,
    annee: String(année),
    couleur,
    variant: '14', // Design Creative avec formes géométriques
  });

  return `/api/wine-placeholder?${params.toString()}`;
}

/**
 * Vérifie si un vin a une vraie image ou utilise un placeholder
 */
export function hasRealImage(vin: VinImageData): boolean {
  return !!vin.imageFile;
}
