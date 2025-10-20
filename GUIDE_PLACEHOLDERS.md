# 🎨 Guide des Placeholders de Vins

## 📋 Les 5 Designs Disponibles

### Design 1️⃣ : Elegant Minimal

**Style** : Épuré, moderne, sophistiqué
**Avantages** :

- Très professionnel
- Met en valeur le nom du vin
- Fonctionne bien sur tous les écrans
- Typographie élégante

**Idéal pour** : Un site moderne et minimaliste

---

### Design 2️⃣ : Classic Label

**Style** : Étiquette de vin traditionnelle
**Avantages** :

- Rappelle les vraies étiquettes de vin
- Bordure dorée élégante
- Ornements classiques
- Très authentique

**Idéal pour** : Un caviste traditionnel, une cave à vins

---

### Design 3️⃣ : Modern Gradient

**Style** : Bold, contemporain, audacieux
**Avantages** :

- Très moderne
- Attire l'œil
- Dynamique et énergique
- Typographie audacieuse

**Idéal pour** : Un public jeune, une startup wine-tech

---

### Design 4️⃣ : Vintage

**Style** : Rétro, ancien, patrimonial
**Avantages** :

- Aspect parchemin
- Ornements vintage
- Authenticité
- Chaleureux

**Idéal pour** : Vins anciens, grands crus, patrimoine

---

### Design 5️⃣ : Luxury Premium

**Style** : Haut de gamme, minimaliste, sophistiqué
**Avantages** :

- Très luxueux
- Fond noir élégant
- Ultra-minimaliste
- Lettres espacées

**Idéal pour** : Grands crus, vins de prestige

---

## 🚀 Tester les Designs

### Étape 1 : Voir la démo

```bash
# Démarrez votre serveur
npm run dev

# Ouvrez votre navigateur
http://localhost:3000/test-placeholders
```

Vous verrez tous les designs côte à côte !

### Étape 2 : Comparer

La page de démo montre :

- ✅ Les 5 designs en grand format
- ✅ Chaque design dans les 3 couleurs (rouge, blanc, rosé)
- ✅ Les descriptions de chaque style

### Étape 3 : Choisir

Notez le numéro du design que vous préférez (1 à 5).

---

## ⚙️ Appliquer Votre Design

### Option A : Un seul design pour tous les vins (Recommandé)

Modifiez `lib/vinImage.ts` ligne 42-49 :

```typescript
// Avant
return `/api/wine-placeholder?${params.toString()}`;

// Après (par exemple pour le design 3)
return `/api/wine-placeholder?${params.toString()}&variant=3`;
```

**Changez `variant=3` par le numéro de votre design préféré !**

### Option B : Design différent selon la couleur

```typescript
// Dans lib/vinImage.ts, ligne 42-49
const variant = couleur === 'rouge' ? '2' : couleur === 'blanc' ? '1' : '4';
const params = new URLSearchParams({
  nom,
  domaine,
  annee: String(année),
  couleur,
});

return `/api/wine-placeholder?${params.toString()}&variant=${variant}`;
```

### Option C : Design aléatoire

```typescript
// Dans lib/vinImage.ts, ligne 42-49
const variant = String(Math.floor(Math.random() * 5) + 1);
return `/api/wine-placeholder?${params.toString()}&variant=${variant}`;
```

---

## 🎯 Exemple Complet

Voici comment modifier `lib/vinImage.ts` pour utiliser le **Design 2 (Classic Label)** :

```typescript
export function getVinImageUrl(vin: VinImageData): string {
  const { imageFile, nom, domaine, année, couleur } = vin;

  // Si on a un fichier image
  if (imageFile) {
    // ... (code existant)
  }

  // Générer un placeholder dynamique avec le Design 2
  const params = new URLSearchParams({
    nom,
    domaine,
    annee: String(année),
    couleur,
  });

  return `/api/wine-placeholder?${params.toString()}&variant=2`; // ← Design 2
}
```

---

## 🔄 Tester Vos Changements

Après avoir modifié le code :

```bash
# Le serveur redémarre automatiquement
# Rafraîchissez votre navigateur
http://localhost:3000/vins
```

Tous vos vins sans photo utiliseront maintenant le nouveau design ! 🎉

---

## 💡 Astuces

### Mélanger les designs

Vous pouvez utiliser différents designs selon le prix :

```typescript
// Vins de luxe → Design 5
// Vins classiques → Design 2
// Vins modernes → Design 3

const variant = vin.prix > 100 ? '5' : vin.prix > 50 ? '2' : '3';
```

### Design selon l'appellation

```typescript
const variant = nom.includes('Château') ? '2' : nom.includes('Champagne') ? '5' : '1';
```

---

## 📊 Récapitulatif

| Design | Style    | Couleurs  | Meilleur pour        |
| ------ | -------- | --------- | -------------------- |
| 1      | Minimal  | Subtiles  | Site moderne         |
| 2      | Classic  | Dorées    | Caviste traditionnel |
| 3      | Gradient | Vibrantes | Public jeune         |
| 4      | Vintage  | Chaudes   | Vins anciens         |
| 5      | Luxury   | Noir/Or   | Grands crus          |

---

## ✅ Recommandation

Pour votre projet **Wine District**, je recommande :

**Design 2 (Classic Label)** ou **Design 1 (Elegant Minimal)**

**Pourquoi ?**

- Professionnel et polyvalent
- Fonctionne pour tous types de vins
- Ne lasse pas après plusieurs visites
- Excellent SEO (texte bien lisible)

---

Besoin d'aide ? Testez d'abord sur `/test-placeholders` ! 🎨
