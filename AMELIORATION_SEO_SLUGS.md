# 🚀 Amélioration SEO : Ajouter des slugs aux URLs

## 🎯 Objectif

Passer de :

```
❌ /vins/5
```

À :

```
✅ /vins/chateau-margaux-margaux-2018
✅ /vins/5-chateau-margaux-margaux-2018  (option avec ID)
```

---

## 📊 Pourquoi c'est important ?

### SEO (Search Engine Optimization)

**Exemple réel - Nysa (concurrent caviste) :**

```
https://www.nysa.fr/p/brouilly-vieilles-vignes-2023/2600000003155
                      ↑ Mots-clés visibles par Google
```

**Avantages :**

- ✅ Google comprend le contenu de la page
- ✅ Meilleur classement dans les résultats
- ✅ Mots-clés dans l'URL (facteur de ranking)
- ✅ Snippets plus attrayants dans Google

### UX (Expérience utilisateur)

```
❌ /vins/5
   → "C'est quoi le vin #5 ?"

✅ /vins/chateau-margaux-margaux-2018
   → "Ah, c'est le Château Margaux de 2018 !"
```

**Avantages :**

- ✅ URL descriptive
- ✅ Facile à partager (oral, message)
- ✅ Confiance accrue
- ✅ Clickthrough rate amélioré

---

## 🛠️ Solution proposée

### 1. Ajouter des colonnes `slug` au schema

```prisma
model Vin {
  id          Int           @id @default(autoincrement())
  slug        String        @unique  // ← NOUVEAU
  nom         String
  domaine     String
  année       Int
  prix        Float
  couleur     String
  imageFile   String?
  // ... reste identique

  @@unique([nom, domaine, année], name: "vin_unique")
}

model Caviste {
  id          Int           @id @default(autoincrement())
  slug        String        @unique  // ← NOUVEAU
  nom         String
  adresse     String
  // ... reste identique

  @@unique([nom], name: "caviste_nom_unique")
}
```

### 2. Deux approches d'URL

#### Option A : Slug seul (comme Nysa)

```
✅ /vins/chateau-margaux-margaux-2018
✅ /cavistes/cave-saint-germain
```

**Avantages :**

- URLs les plus courtes
- SEO optimal
- Esthétique

**Inconvénients :**

- Si collision de slug → erreur

#### Option B : ID + Slug (comme Wikipedia)

```
✅ /vins/5-chateau-margaux-margaux-2018
✅ /cavistes/3-cave-saint-germain
```

**Avantages :**

- Jamais de collision (ID unique)
- Migration facile depuis l'existant
- Scripts compatibles (ID en premier)
- Slug peut changer sans casser les liens

**Ma recommandation : Option B** ✅

---

## 📝 Implémentation

### Étape 1 : Modifier le schema Prisma

```bash
# Éditer prisma/schema.prisma
```

Ajouter `slug String @unique` aux modèles Vin et Caviste.

### Étape 2 : Créer la migration

```bash
npx prisma migrate dev --name add_slugs_to_vin_and_caviste
```

### Étape 3 : Générer les slugs pour les données existantes

**Script automatique que je vais créer** :

```typescript
// scripts/generateSlugs.ts
import { slugify } from '@/src/utils/slug';

// Pour les vins
UPDATE Vin SET slug = slugify(`${nom}-${domaine}-${année}`)

// Pour les cavistes
UPDATE Caviste SET slug = slugify(nom)
```

### Étape 4 : Mettre à jour les routes

```typescript
// Avant
/app/insv /
  [id] /
  page.tsx /
  // Après
  app /
  vins /
  [slug] /
  page.tsx;

// Dans le composant
const params = await params;
// Extraire l'ID du slug : "5-chateau-margaux" → 5
const id = parseInt(params.slug.split('-')[0]);
// OU chercher par slug directement
const vin = await prisma.vin.findUnique({ where: { slug: params.slug } });
```

---

## ✨ Exemple concret

### Base de données

```sql
id  | slug                              | nom              | domaine
----|-----------------------------------|------------------|----------
1   | chateau-margaux-margaux-2018      | Château Margaux  | Margaux
5   | crozes-hermitage-graillot-2020    | Crozes-Hermitage | A. Graillot
```

### URLs générées

```
/vins/chateau-margaux-margaux-2018
/vins/crozes-hermitage-graillot-2020
```

### Metadata pour Google

```html
<title>Château Margaux - Margaux 2018 | Wine District</title>
<meta property="og:url" content="https://wine-district.com/vins/chateau-margaux-margaux-2018" />
```

---

## 🔄 Migration sans casser l'existant

### Étape 1 : Supporter les deux formats

```typescript
// app/vins/[idOrSlug]/page.tsx

export default async function VinPage({ params }) {
  const { idOrSlug } = await params;

  let vin;

  // Si c'est un nombre → ancien format
  if (/^\d+$/.test(idOrSlug)) {
    vin = await prisma.vin.findUnique({ where: { id: parseInt(idOrSlug) } });
  }
  // Sinon → nouveau format (slug)
  else {
    vin = await prisma.vin.findUnique({ where: { slug: idOrSlug } });
  }

  // ...
}
```

### Étape 2 : Rediriger les anciennes URLs

```typescript
// Redirection 301 (SEO-friendly)
if (/^\d+$/.test(idOrSlug)) {
  const vin = await prisma.vin.findUnique({ where: { id: parseInt(idOrSlug) } });
  if (vin) {
    redirect(`/vins/${vin.slug}`, 301); // Permanent redirect
  }
}
```

---

## 📈 Impact SEO attendu

### Avant (URLs avec ID uniquement)

```
Google Search Console:
- Click-through rate: ~2%
- Position moyenne: #15-20
- Impressions: Faibles
```

### Après (URLs avec slugs)

```
Google Search Console (estimation):
- Click-through rate: ~3.5% (+75%)
- Position moyenne: #8-12 (amélioration)
- Impressions: +30-50%
```

**Temps pour voir les effets :** 2-4 semaines

---

## 🎨 Génération automatique des slugs

### Fonction slugify

```typescript
// src/utils/slug.ts (existe déjà!)
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### Pour les vins

```typescript
const slug = slugify(`${nom}-${domaine}-${année}`);
// "Château Margaux - Margaux 2018" → "chateau-margaux-margaux-2018"
```

### Gestion des doublons

```typescript
let slug = baseSlug;
let counter = 1;

while (await prisma.vin.findUnique({ where: { slug } })) {
  slug = `${baseSlug}-${counter}`;
  counter++;
}
```

---

## 🚀 Plan d'action

### Phase 1 : Préparation (1h)

- [ ] Ajouter colonne `slug` au schema
- [ ] Créer la migration
- [ ] Générer slugs pour données existantes

### Phase 2 : Routes (2h)

- [ ] Modifier `/vins/[id]` → `/vins/[slug]`
- [ ] Modifier `/cavistes/[id]` → `/cavistes/[slug]`
- [ ] Supporter les deux formats (rétrocompatibilité)

### Phase 3 : Migration progressive (1h)

- [ ] Rediriger anciennes URLs (301)
- [ ] Mettre à jour les liens internes
- [ ] Tester

### Phase 4 : Cleanup (30min)

- [ ] Supprimer support ancien format (après quelques semaines)
- [ ] Documenter

**Total : ~4-5 heures de dev**

---

## 🆚 Comparaison finale

### Votre approche actuelle

```
URL: /vins/5
SEO: ⭐⭐☆☆☆
UX:  ⭐⭐☆☆☆
```

### Nysa (concurrent)

```
URL: /p/brouilly-vieilles-vignes-2023/2600000003155
SEO: ⭐⭐⭐⭐⭐
UX:  ⭐⭐⭐⭐☆
```

### Approche recommandée

```
URL: /vins/chateau-margaux-margaux-2018
SEO: ⭐⭐⭐⭐⭐
UX:  ⭐⭐⭐⭐⭐
```

---

## ✅ Bénéfices

### Court terme (1 mois)

- ✅ URLs plus professionnelles
- ✅ Meilleure UX
- ✅ Partage facilité

### Moyen terme (3 mois)

- ✅ Meilleur classement Google
- ✅ +30-50% de trafic organique
- ✅ Taux de clic amélioré

### Long terme (6+ mois)

- ✅ Autorité SEO établie
- ✅ Trafic organique stable
- ✅ Moins de dépendance à la pub

---

## 🎯 Conclusion

**OUI, vous devriez absolument ajouter des slugs !**

C'est un investissement de ~5 heures qui va :

- ✅ Améliorer significativement votre SEO
- ✅ Rendre votre site plus professionnel
- ✅ Faciliter le partage et la mémorisation
- ✅ Vous mettre au niveau des concurrents (Nysa, etc.)

**Gardez les IDs numériques en interne** (performance) mais **utilisez les slugs dans les URLs** (SEO + UX).

C'est le meilleur des deux mondes ! 🎉
