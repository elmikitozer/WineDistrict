# 🚨 Instructions de Migration - IMPORTANT

## ⚠️ Actions OBLIGATOIRES avant que l'app fonctionne complètement

Votre code est prêt et committé, mais **2 migrations SQL** doivent être exécutées dans **Supabase SQL Editor**.

---

## 📋 **Migration 1 : Favoris + Champs Caviste**

### Fichier : `MIGRATION_FAVORIS.sql`

Cette migration ajoute :

- ✅ Table `FavorisCaviste` (relation many-to-many User ↔ Caviste)
- ✅ 8 nouveaux champs au modèle `Caviste` :
  - `description` (TEXT)
  - `telephone` (VARCHAR 255)
  - `email` (VARCHAR 255)
  - `horaires` (TEXT)
  - `siteWeb` (VARCHAR 255)
  - `facebook` (VARCHAR 255)
  - `instagram` (VARCHAR 255)
  - `imageUrl` (TEXT)

### 🔧 Comment l'appliquer :

1. Ouvrir **Supabase Dashboard** → Votre projet
2. Aller dans **SQL Editor**
3. Copier tout le contenu de `MIGRATION_FAVORIS.sql`
4. Coller dans l'éditeur
5. Cliquer sur **Run** ou **Execute**
6. Vérifier qu'il n'y a pas d'erreurs

---

## 📋 **Migration 2 : Champs User (nom, prénom, téléphone)**

### Fichier : `MIGRATION_USER_INFO.sql`

Cette migration ajoute :

- ✅ Champ `nom` (VARCHAR 255) au modèle `User`
- ✅ Champ `prenom` (VARCHAR 255) au modèle `User`
- ✅ Champ `telephone` (VARCHAR 255) au modèle `User`

### 🔧 Comment l'appliquer :

1. Ouvrir **Supabase Dashboard** → Votre projet
2. Aller dans **SQL Editor**
3. Copier tout le contenu de `MIGRATION_USER_INFO.sql`
4. Coller dans l'éditeur
5. Cliquer sur **Run** ou **Execute**
6. Vérifier qu'il n'y a pas d'erreurs

### ⚠️ **CRITIQUE** :

Sans cette migration, le **Dashboard** plantera avec l'erreur :

```
PrismaClientKnownRequestError: The column `User.nom` does not exist in the current database.
```

---

## ✅ **Vérification post-migration**

Après avoir exécuté les 2 migrations, vérifiez que tout fonctionne :

### 1. **Dashboard**

- Aller sur `/dashboard`
- Vérifier qu'il n'y a plus d'erreur `User.nom does not exist`
- Le dashboard doit s'afficher normalement

### 2. **Page Favoris**

- Aller sur `/favoris`
- Tester l'ajout/suppression de cavistes favoris
- Vérifier que les données persistent

### 3. **Page Caviste**

- Aller sur `/cavistes/[slug]`
- Tester le bouton "Ajouter aux favoris"
- Vérifier que l'icône cœur se remplit

### 4. **Panier**

- Ajouter des vins de différents cavistes
- Vérifier que le panier groupe par caviste
- Vérifier que les noms cavistes sont cliquables
- Tester la validation du panier (CSRF doit fonctionner)

---

## 🎯 **Ordre recommandé**

1. ✅ Commit (FAIT ✅)
2. 🔄 Exécuter `MIGRATION_FAVORIS.sql` dans Supabase
3. 🔄 Exécuter `MIGRATION_USER_INFO.sql` dans Supabase
4. ✅ Redémarrer le serveur de dev : `npm run dev`
5. 🧪 Tester toutes les fonctionnalités ci-dessus
6. 🚀 Push vers GitHub : `git push`
7. 🌐 Redéployer sur Vercel (si applicable)

---

## 🐛 **En cas de problème**

### Erreur : "column already exists"

- ✅ C'est normal si vous avez déjà exécuté une partie de la migration
- Les migrations utilisent `IF NOT EXISTS` pour éviter les doublons
- Vérifiez juste qu'il n'y a pas d'erreur rouge

### Erreur : "table already exists"

- ✅ Idem, pas de problème grâce à `IF NOT EXISTS`

### Erreur : "User.nom does not exist" persiste

- ❌ La migration `MIGRATION_USER_INFO.sql` n'a pas été appliquée
- Vérifiez dans Supabase : **Table Editor** → Table `User` → Vérifier que les colonnes `nom`, `prenom`, `telephone` existent

---

## 📊 **État actuel du code**

### ✅ Ce qui fonctionne SANS migration :

- Toutes les pages sauf le Dashboard
- Panier (avec groupe par caviste)
- Liens cavistes sur `/cavistes`
- Placeholders dynamiques (vins + cavistes)

### ⚠️ Ce qui nécessite la migration :

- Dashboard (erreur `User.nom`)
- Favoris cavistes (table manquante)
- Page détail caviste (champs manquants)

---

## 🎉 **Après les migrations**

Tout sera fonctionnel ! Vous pourrez :

- ✅ Voir votre dashboard sans erreur
- ✅ Ajouter des cavistes en favoris
- ✅ Voir les infos complètes des cavistes (téléphone, email, etc.)
- ✅ Valider votre panier sans erreur CSRF
- ✅ Profiter du nouveau design groupé par caviste

---

## 📞 **Besoin d'aide ?**

Si vous rencontrez des problèmes, vérifiez :

1. Les migrations ont bien été exécutées dans Supabase
2. Le serveur de dev a été redémarré
3. Le Prisma client a été régénéré : `npx prisma generate`

Bon courage ! 🚀🍷
