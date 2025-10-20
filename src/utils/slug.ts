/**
 * Génère un slug SEO-friendly à partir d'une chaîne de caractères
 *
 * @param text - Le texte à convertir en slug
 * @returns Le slug généré (minuscules, sans accents, avec tirets)
 *
 * @example
 * slugify('Château Margaux')  // → 'chateau-margaux'
 * slugify('Côtes du Rhône')   // → 'cotes-du-rhone'
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères non-alphanumériques par des tirets
    .replace(/^-+/, '') // Supprime les tirets au début
    .replace(/-+$/, '') // Supprime les tirets à la fin
    .replace(/-+/g, '-'); // Remplace les tirets multiples par un seul
}
