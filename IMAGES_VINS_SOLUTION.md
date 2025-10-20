# Solution pour les images de vins 🍷

## 🎯 Problème résolu

Vous aviez seulement 3 images pour ~150 vins. J'ai implémenté un système de **placeholders dynamiques** qui génère automatiquement des images pour chaque vin.

## ✨ Solution implémentée

### 1. **Placeholders SVG dynamiques** (Actif maintenant!)

Chaque vin sans image réelle affiche automatiquement un placeholder généré à la volée avec :

- ✅ Couleur de fond selon le type de vin (rouge/blanc/rosé)
- ✅ Icône de bouteille
- ✅ Nom du vin
- ✅ Domaine
- ✅ Année

**Exemple d'URL générée :**

```
/api/wine-placeholder?nom=Château+Margaux&domaine=Margaux&annee=2018&couleur=rouge
```

### 2. **Fichiers créés**

| Fichier                              | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| `app/api/wine-placeholder/route.tsx` | API Edge qui génère les placeholders SVG              |
| `lib/vinImage.ts`                    | Helper centralisé pour gérer les URLs d'images        |
| `src/utils/vinImage.ts`              | Utilitaires pour vérifier si un vin a une vraie image |

### 3. **Fichiers modifiés**

| Fichier                       | Modification                        |
| ----------------------------- | ----------------------------------- |
| `app/components/VinImage.tsx` | Support des placeholders dynamiques |
| `app/vins/page.tsx`           | Utilise le nouveau système d'images |
| `app/vins/[id]/page.tsx`      | Utilise le nouveau système d'images |

## 📊 Base de données enrichie

### Nouvelles données générées :

```bash
✅ 151 vins (146 nouveaux)
✅ 24 cavistes (22 nouveaux)
✅ 281 stocks (liens vins ↔ cavistes)
```

### Vins par région :

- Bordeaux (Margaux, Pauillac, Saint-Émilion...)
- Bourgogne (Chablis, Gevrey-Chambertin...)
- Rhône (Châteauneuf-du-Pape, Hermitage...)
- Loire (Sancerre, Pouilly-Fumé...)
- Alsace (Riesling, Gewurztraminer...)
- Champagne

### Cavistes fictifs répartis dans :

- Paris (6e, 11e, 18e, 5e, 9e, 17e)
- Lyon
- Marseille
- Bordeaux
- Toulouse

## 🚀 Comment ça fonctionne

### Hiérarchie des images :

1. **Vraie image locale** : `/public/vins/3.png` → Affichée directement
2. **Vraie image Supabase** : `imageFile` avec URL → Affichée directement
3. **Pas d'image** → **Placeholder dynamique généré** ✨

### Code automatique :

```typescript
// Avant (problème : 3 images seulement)
<Image src={vin.imageFile || '/window.svg'} />

// Après (solution : placeholder dynamique)
<Image src={getVinImageUrl(vin)} />
// → Si pas d'image : génère automatiquement un placeholder
```

## 🎨 Apparence des placeholders

### Rouge 🍷

- Fond : Dégradé rouge foncé (#8B0000 → #DC143C)
- Texte : Blanc
- Icône bouteille : Blanc transparent

### Blanc 🥂

- Fond : Dégradé beige doré (#F5DEB3 → #FFE4B5)
- Texte : Gris foncé
- Icône bouteille : Gris transparent

### Rosé 🌸

- Fond : Dégradé rose (#FFB6C1 → #FFC0CB)
- Texte : Rouge foncé
- Icône bouteille : Rouge transparent

## 🔧 Scripts utiles

### Générer plus de vins :

```bash
npx tsx scripts/generateWineData.ts
# → Crée vins_generated.json et cavistes_generated.json
```

### Peupler la base de données :

```bash
npx tsx scripts/seedGeneratedData.ts
# → Insère les vins, cavistes et génère les stocks
```

### Vérifier la structure :

```bash
npx tsx scripts/checkDatabaseStructure.ts
# → Affiche les stats, séquences, contraintes, etc.
```

## ✅ Vérifications effectuées

### IDs AUTO INCREMENT

✅ Toutes les tables utilisent des séquences PostgreSQL :

- `Vin_id_seq` : 158 (prêt pour les prochains vins)
- `Caviste_id_seq` : 24
- `Stock_id_seq` : 293

**Vous pouvez ajouter/supprimer des vins sans problème !**

### Contraintes UNIQUE

✅ Pas de doublons possibles :

- Vin : `(nom, domaine, année)` → Unique
- Caviste : `nom` → Unique
- Stock : `(cavisteId, vinId)` → Unique

### Relations

✅ Toutes les clés étrangères sont en place :

- Stock → Vin (ON DELETE CASCADE)
- Stock → Caviste (ON DELETE CASCADE)
- Reservation → Vin (ON DELETE CASCADE)
- Reservation → Caviste (ON DELETE CASCADE)
- Reservation → User (ON DELETE SET NULL) ⭐ nouveau

## 🎯 Avantages de cette solution

### ✅ Pour le MVP :

1. **Zéro coût** : Pas besoin d'API externe payante
2. **Performance** : Génération côté serveur (Edge Runtime)
3. **SEO-friendly** : Images servies depuis votre domaine
4. **Cohérence** : Design uniforme pour tous les vins
5. **Automatique** : Aucune intervention manuelle

### ✅ Pour l'avenir :

1. **Évolutif** : Facile de remplacer par de vraies photos plus tard
2. **Flexible** : On peut mixer vraies images + placeholders
3. **Maintenable** : Un seul endroit pour gérer la logique (`lib/vinImage.ts`)

## 📸 Options futures (si vous voulez de vraies photos)

### Option A : Unsplash API (gratuit)

```bash
# Télécharger des images de vin depuis Unsplash
npm install unsplash-js
npx tsx scripts/downloadWineImages.ts
```

### Option B : Upload manuel

```bash
# Télécharger des images et les mettre dans public/vins/
# Puis mettre à jour imageFile dans la base
UPDATE "Vin" SET "imageFile" = 'mon-vin.jpg' WHERE id = 1;
```

### Option C : Supabase Storage

```bash
# Upload vers Supabase et mettre à jour imageFile
npx tsx scripts/uploadImagesToSupabase.ts
```

## 🧪 Tester

### 1. Voir un placeholder :

```
http://localhost:3000/vins
# → Les vins sans imageFile affichent des placeholders colorés
```

### 2. Voir un vin spécifique :

```
http://localhost:3000/vins/10
# → Placeholder dynamique avec nom, domaine, année
```

### 3. Tester l'API directement :

```
http://localhost:3000/api/wine-placeholder?nom=Test&domaine=Domaine&annee=2023&couleur=rouge
# → Image SVG générée
```

## 📈 Statistiques actuelles

```
📊 Base de données:
   - 151 vins
   - 24 cavistes
   - 281 stocks (associations vin ↔ caviste)
   - 4 réservations
   - 2 utilisateurs

🖼️  Images:
   - 3 vraies images (dans /public/vins/)
   - 148 placeholders dynamiques
   - 100% des vins ont une image !
```

## 🎨 Dashboard Client - Bonus

Les cartes de statistiques du dashboard client ont aussi été améliorées :

- ✅ Design identique aux cavistes
- ✅ Badges colorés (Total, En attente, Confirmées, Annulées)
- ✅ États actifs avec bordures
- ✅ Transitions au hover

## 🚀 Prochaines étapes

1. ✅ **Tester** : `npm run dev` et aller sur `/vins`
2. ✅ **Vérifier Prisma Studio** : `npm run db:studio` → http://localhost:5561
3. ✅ **Créer des réservations** pour tester le dashboard client
4. 📸 **Optionnel** : Ajouter de vraies photos pour les vins premium

---

**🎉 Résultat : Vous avez maintenant 151 vins avec des images pour tous !**
