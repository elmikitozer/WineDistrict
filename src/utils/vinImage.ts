// Utilitaires pour gérer les images de vin

type Vin = {
  nom: string;
  domaine: string;
  année: number;
  couleur: string;
  imageFile?: string | null;
};

/**
 * Génère l'URL de l'image pour un vin
 * - Si le vin a un imageFile, retourne le chemin vers l'image locale
 * - Sinon, retourne une URL vers le placeholder dynamique
 */
export function getVinImageUrl(vin: Vin): string {
  if (vin.imageFile) {
    return `/vins/${vin.imageFile}`;
  }

  // Générer un placeholder dynamique
  const params = new URLSearchParams({
    nom: vin.nom,
    domaine: vin.domaine,
    annee: String(vin.année),
    couleur: vin.couleur,
  });

  return `/api/wine-placeholder?${params.toString()}`;
}

/**
 * Vérifie si un vin a une vraie image ou utilise un placeholder
 */
export function hasRealImage(vin: Vin): boolean {
  return !!vin.imageFile;
}
