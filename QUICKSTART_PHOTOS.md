# 📸 Quickstart : Ajouter des photos de vins

## ⚡ 3 commandes pour commencer

### 1️⃣ Upload une photo

```bash
npm run img:wine ~/Photos/mon-vin.jpg 5
```

Remplace `5` par l'ID du vin (voir dans Prisma Studio)

---

### 2️⃣ Upload plusieurs photos

```bash
# 1. Renommer vos photos: vin-1.jpg, vin-2.jpg, vin-10.jpg, etc.
# 2. Mettre dans un dossier
# 3. Lancer:

npm run img:wine-batch ~/mon-dossier
```

---

### 3️⃣ Migrer les 3 photos existantes vers Supabase

```bash
npm run img:migrate
```

---

## 🔍 Trouver l'ID d'un vin

```bash
npm run db:studio
# → http://localhost:5561
# Cliquer sur "Vin", noter l'ID
```

---

## ✅ C'est tout !

Les photos apparaissent automatiquement sur le site.

**Plus d'infos :** Lire `GUIDE_IMAGES_REELLES.md`
