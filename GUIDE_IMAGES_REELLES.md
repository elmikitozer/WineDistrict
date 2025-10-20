# 📸 Guide : Gérer les vraies photos de vins

## 🎯 Solution recommandée : Supabase Storage

### Pourquoi Supabase ?

✅ **Gratuit** : 1 GB gratuit (suffisant pour ~1000 photos HD)
✅ **CDN** : Images rapides partout dans le monde
✅ **Pas dans Git** : Images séparées du code source
✅ **Déjà configuré** : Variables d'environnement en place
✅ **Interface web** : Gérer vos images facilement
✅ **Sécurisé** : Accès contrôlé

### ❌ Pourquoi PAS dans GitHub ?

- Limite de taille du repo
- Ralentit git clone/pull
- Mauvaise pratique
- Pas fait pour ça

---

## 🚀 Configuration (déjà fait!)

Vos variables d'environnement sont déjà configurées :

```env
SUPABASE_URL="https://sycxkvsvmmnubsjqszrk.supabase.co"
SUPABASE_SERVICE_ROLE="votre_clé_service"
SUPABASE_BUCKET="images"
```

✅ **Rien à faire, c'est déjà prêt !**

---

## 📤 Uploader des images

### Méthode 1 : Upload image par image (Recommandé pour débuter)

```bash
# Uploader une photo pour le vin #3
npx tsx scripts/uploadWineImage.ts ~/Photos/mon-vin.jpg 3

# Remplacer une image existante
npx tsx scripts/uploadWineImage.ts ./nouvelle-photo.png 5 --overwrite
```

**Étapes détaillées :**

1. **Trouver l'ID du vin** dans Prisma Studio :

   ```bash
   npm run db:studio
   # → http://localhost:5561
   # Cliquer sur "Vin" et noter l'ID
   ```

2. **Uploader la photo** :

   ```bash
   npx tsx scripts/uploadWineImage.ts ~/Downloads/chateau-margaux.jpg 1
   ```

3. **Vérifier** : L'image apparaît immédiatement sur le site !

---

### Méthode 2 : Upload en batch (Pour plusieurs images)

**Préparation :**

1. Créer un dossier pour vos photos :

   ```bash
   mkdir ~/wine-photos
   ```

2. Renommer vos photos selon le format `vin-{id}.{ext}` :

   ```bash
   ~/wine-photos/
   ├── vin-1.jpg      # Photo pour le vin #1
   ├── vin-5.png      # Photo pour le vin #5
   ├── vin-42.webp    # Photo pour le vin #42
   └── ...
   ```

3. Uploader tout d'un coup :
   ```bash
   npx tsx scripts/uploadWineImagesBatch.ts ~/wine-photos
   ```

**Résultat :**

```
📦 3 fichiers trouvés

📤 vin-1.jpg (Vin #1)...
   📝 Château Margaux - Margaux
   ✅ Uploadé et enregistré

📤 vin-5.png (Vin #5)...
   📝 Crozes-Hermitage - Alain Graillot
   ✅ Uploadé et enregistré

📊 Résumé:
   ✅ Uploadés: 3
   ⚠️  Ignorés: 0
   ❌ Erreurs: 0
```

---

### Méthode 3 : Migrer les images locales existantes

Vous avez déjà 3 images dans `public/vins/` ? Migrez-les vers Supabase :

```bash
npx tsx scripts/migrateLocalImagesToSupabase.ts
```

Cela va :

1. ✅ Uploader les 3 images vers Supabase
2. ✅ Renommer en `vin-{id}.png`
3. ✅ Mettre à jour la base de données
4. ✅ Vous donner les URLs

**Ensuite, supprimez les images locales :**

```bash
# Backup d'abord !
cp -r public/vins ~/backup-vins

# Puis supprimer
rm public/vins/*.png
```

---

## 🖼️ Gérer les images via l'interface Supabase

### Accéder à Supabase Storage :

1. Allez sur : https://supabase.com/dashboard/project/sycxkvsvmmnubsjqszrk/storage/buckets
2. Cliquez sur le bucket **`images`**
3. Naviguez vers le dossier **`vins/`**

### Actions possibles :

- 📤 **Upload** : Glisser-déposer des images
- 🗑️ **Supprimer** : Clic droit → Delete
- 👁️ **Voir** : Clic pour prévisualiser
- 🔗 **Copier l'URL** : Pour partager

---

## 📏 Recommandations pour les photos

### Format idéal :

```
📐 Dimensions : 600x800px (format portrait 3:4)
📦 Format : JPG ou WebP (meilleur que PNG)
💾 Poids : < 200 KB par image
```

### Comment optimiser vos photos ?

**Option 1 : En ligne (gratuit)**

1. Allez sur https://squoosh.app
2. Upload votre photo
3. Réglez la qualité à 75%
4. Téléchargez

**Option 2 : Commande (si ImageMagick installé)**

```bash
# Redimensionner et compresser
convert input.jpg -resize 600x800 -quality 75 output.jpg

# Batch pour tout un dossier
for img in *.jpg; do
  convert "$img" -resize 600x800 -quality 75 "optimized-$img"
done
```

---

## 🔄 Workflow recommandé

### Pour ajouter un nouveau vin :

1. **Créer le vin** dans la base :

   ```bash
   npm run db:studio
   # Ajouter un vin, noter son ID
   ```

2. **Uploader la photo** :

   ```bash
   npx tsx scripts/uploadWineImage.ts ~/Photos/mon-vin.jpg 123
   ```

3. **Vérifier** sur le site :
   ```
   http://localhost:3000/vins/123
   ```

### Pour mettre à jour plusieurs vins :

1. **Préparer les photos** :

   ```bash
   mkdir ~/wine-batch
   # Renommer: vin-1.jpg, vin-2.jpg, etc.
   ```

2. **Upload batch** :

   ```bash
   npx tsx scripts/uploadWineImagesBatch.ts ~/wine-batch
   ```

3. **Vérifier** :
   ```
   http://localhost:3000/vins
   ```

---

## 🐛 Problèmes courants

### "Variables SUPABASE_URL et SUPABASE_SERVICE_ROLE requises"

**Solution :**

```bash
# Vérifier que .env existe
cat .env | grep SUPABASE

# Si vide, copier depuis .env.example
cp .env.example .env.local
# Puis remplir les variables
```

### "Vin #X introuvable"

**Solution :**

```bash
# Vérifier les IDs disponibles
npm run db:studio
# Ou via script
npx tsx scripts/checkDatabaseStructure.ts
```

### "Upload Error: Row level security"

**Solution :** Aller sur Supabase Dashboard → Storage → images → Policies
Vérifier que le bucket a une policy qui autorise les uploads.

---

## 💾 Backup des images

### Télécharger toutes vos images Supabase :

```bash
# Créer un script de backup
npx tsx scripts/backupSupabaseImages.ts
```

### Ou manuellement :

1. Aller sur Supabase Dashboard
2. Storage → images → vins
3. Sélectionner tout → Download

---

## 🎯 Checklist avant production

- [ ] Toutes les images uploadées sur Supabase
- [ ] Images locales supprimées de `public/vins/`
- [ ] Variables d'environnement configurées
- [ ] Images optimisées (< 200 KB)
- [ ] Test sur quelques vins
- [ ] Vérifier sur mobile

---

## 📊 Coûts Supabase

```
Plan Gratuit (actuel):
├── Storage : 1 GB      → ~1000 photos HD
├── Bande passante : 2 GB/mois
└── Prix : 0€

Plan Pro (si besoin futur):
├── Storage : 100 GB    → ~100,000 photos
├── Bande passante : 200 GB/mois
└── Prix : 25$/mois
```

**Pour votre MVP : Le plan gratuit est largement suffisant !**

---

## 🆘 Support

### Tester votre configuration :

```bash
npx tsx scripts/uploadWineImage.ts
# → Affiche l'aide et vérifie la config
```

### Voir les images uploadées :

```bash
# Via Supabase Dashboard
https://supabase.com/dashboard/project/sycxkvsvmmnubsjqszrk/storage/buckets/images

# Via Prisma Studio
npm run db:studio
# Onglet "Vin" → Colonne "imageFile"
```

---

## ✨ Exemple complet

```bash
# 1. Corriger les 3 images actuelles
npm run db:seed

# 2. Migrer vers Supabase
npx tsx scripts/migrateLocalImagesToSupabase.ts

# 3. Ajouter de nouvelles photos
npx tsx scripts/uploadWineImage.ts ~/Photos/bordeaux-2020.jpg 25

# 4. Uploader un batch
mkdir ~/wine-photos
# ... renommer vos photos en vin-X.jpg
npx tsx scripts/uploadWineImagesBatch.ts ~/wine-photos

# 5. Vérifier
npm run dev
# → http://localhost:3000/vins
```

---

## 🎉 Résultat final

✅ **Images professionnelles** pour vos vins
✅ **Chargement rapide** grâce au CDN Supabase
✅ **Facile à gérer** avec les scripts fournis
✅ **Évolutif** jusqu'à des milliers de vins
✅ **Gratuit** pour votre MVP

**Vous êtes prêt à gérer des vraies photos de manière professionnelle !** 🍷
