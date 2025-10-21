# 📸 Exemple concret : Uploader une photo de vin

## Scénario : Vous avez une belle photo de Château Margaux

### Étape 1 : Trouver l'ID du vin

```bash
npm run db:studio
```

Dans Prisma Studio, cherchez "Château Margaux" :

```
Vin
┌────┬──────────────────┬─────────┬──────┬───────┐
│ id │ nom              │ domaine │ année│ prix  │
├────┼──────────────────┼─────────┼──────┼───────┤
│ 1  │ Château Margaux  │ Margaux │ 2018 │ 320.0 │ ← Voilà l'ID !
│ 2  │ Bourgogne Aligoté│ ...     │ ...  │ ...   │
│ 3  │ Côtes du Rhône   │ ...     │ ...  │ ...   │
└────┴──────────────────┴─────────┴──────┴───────┘
```

**L'ID est `1`** ✅

---

### Étape 2 : Upload la photo

Vous avez la photo sur votre bureau : `~/Desktop/chateau-margaux-photo.jpg`

**Commande :**

```bash
npm run img:wine ~/Desktop/chateau-margaux-photo.jpg 1
                 ↑                                  ↑
              chemin vers la photo                 ID du vin
```

**Résultat :**

```
📤 Upload pour: Château Margaux - Margaux (2018)
⬆️  Upload vers Supabase: vins/vin-1.jpg
✅ Upload réussi: vins/vin-1.jpg
✅ Base de données mise à jour

🔗 URL publique:
https://sycxkvsvmmnubsjqszrk.supabase.co/storage/v1/object/public/images/vins/vin-1.jpg

✨ Terminé !
```

---

### Étape 3 : Vérifier

```bash
npm run dev
# → http://localhost:3000/vins/1
```

✨ **Votre photo apparaît !**

---

## 🔄 Pour plusieurs vins

### Situation : Vous avez 10 photos

**Méthode 1 : Une par une (si noms différents)**

```bash
npm run img:wine ~/Photos/margaux.jpg 1
npm run img:wine ~/Photos/bordeaux.jpg 5
npm run img:wine ~/Photos/bourgogne.jpg 8
# ... etc
```

**Méthode 2 : Batch (plus rapide)**

1. **Renommer vos photos :**

   ```
   ~/Photos/
   margaux.jpg     → vin-1.jpg
   bordeaux.jpg    → vin-5.jpg
   bourgogne.jpg   → vin-8.jpg
   ```

2. **Upload tout :**

   ```bash
   npm run img:wine-batch ~/Photos
   ```

   Résultat :

   ```
   📦 3 fichiers trouvés

   📤 vin-1.jpg (Vin #1)...
      📝 Château Margaux - Margaux
      ✅ Uploadé et enregistré

   📤 vin-5.jpg (Vin #5)...
      📝 Crozes-Hermitage - Alain Graillot
      ✅ Uploadé et enregistré

   📤 vin-8.jpg (Vin #8)...
      📝 Chablis Grand Cru - Domaine William Fèvre
      ✅ Uploadé et enregistré

   📊 Résumé:
      ✅ Uploadés: 3
      ⚠️  Ignorés: 0
      ❌ Erreurs: 0
   ```

---

## ❓ FAQ

### Q: Je ne connais pas l'ID de mes vins

**R:** Utilisez Prisma Studio :

```bash
npm run db:studio
# → Tableau avec tous vos vins et leurs IDs
```

### Q: L'ID change si j'ajoute/supprime des vins ?

**R:** Non ! Les IDs sont permanents (auto-increment). Le vin #5 restera toujours #5.

### Q: Je peux uploader n'importe quel format ?

**R:** Oui ! JPG, PNG, WebP sont tous acceptés.

### Q: Et si je me trompe d'ID ?

**R:** Le script vérifie que le vin existe. S'il n'existe pas, il affiche une erreur.

```bash
npm run img:wine photo.jpg 999
# Erreur: Vin #999 introuvable
```

### Q: Je peux remplacer une photo ?

**R:** Oui, avec `--overwrite` :

```bash
npm run img:wine nouvelle-photo.jpg 1 --overwrite
```

---

## ✅ En résumé

```
┌─────────────────────┐
│ Votre photo locale  │
│ (n'importe quel nom)│
└──────────┬──────────┘
           │
           │ npm run img:wine photo.jpg {ID}
           ▼
┌─────────────────────┐
│ Script automatique  │
│ - Renomme           │
│ - Upload Supabase   │
│ - Met à jour DB     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Supabase Storage    │
│ vins/vin-{ID}.jpg   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Site web            │
│ Photo affichée ! ✨ │
└─────────────────────┘
```

**Vous n'avez pas à vous soucier du renommage !**
Le script fait tout automatiquement. 🎉
