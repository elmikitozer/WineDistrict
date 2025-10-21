# 🍷 Wine District

Plateforme de mise en relation entre clients et cavistes pour la réservation de vins.

## 🚀 Quick Start

```bash
# Installation
npm install

# Configuration
cp .env.example .env.local
# Remplir DATABASE_URL, JWT_SECRET, etc.

# Développement
npm run dev
```

Ouvrir http://localhost:3000

## 📚 Documentation

Toute la documentation est dans le dossier `docs/` :

- **[docs/README.md](docs/README.md)** - Index complet de la documentation
- **[docs/CHECKLIST_RAPIDE.md](docs/CHECKLIST_RAPIDE.md)** - Tests essentiels (15 min)
- **[docs/TODO_DEMAIN.md](docs/TODO_DEMAIN.md)** - Plan session suivante
- **[docs/AMELIORATIONS_CODE.md](docs/AMELIORATIONS_CODE.md)** - Optimisations suggérées

## 🎯 Features

- ✅ Authentification (client + caviste)
- ✅ Catalogue vins avec SEO (slugs)
- ✅ Recherche combinée (texte + année)
- ✅ Panier avec validation stock
- ✅ Dashboard client (commandes + favoris)
- ✅ Dashboard caviste (gestion commandes)
- ✅ Pages cavistes avec Google Maps
- ✅ Placeholders dynamiques
- ✅ CSRF protection
- ✅ Scroll restoration

## 🛠️ Tech Stack

- **Framework :** Next.js 15 (App Router)
- **Database :** PostgreSQL (Supabase)
- **ORM :** Prisma
- **Styling :** Tailwind CSS
- **Auth :** JWT (jose)
- **Storage :** Supabase Storage
- **Maps :** Google Maps Embed API

## 📦 Scripts

```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # ESLint
```

## 🗄️ Database

### Migrations

Fichiers SQL dans la racine :
- `MIGRATION_FAVORIS.sql` - Cavistes favoris
- `MIGRATION_USER_INFO.sql` - Nom/Prénom/Téléphone user

Appliquer dans Supabase SQL Editor.

### Seed

```bash
npx tsx prisma/seed.ts
```

## 🔐 Variables d'Environnement

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://...supabase.co"
SUPABASE_BUCKET="wine-images"
JWT_SECRET="your-secret-32-chars-min"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIza..." # Optionnel
```

## 🧪 Tests

```bash
# Tests complets (45-60 min)
# Voir docs/TESTS_COMPLETS.md

# Tests rapides (15 min)
# Voir docs/CHECKLIST_RAPIDE.md
```

## 📖 Guides

- **Google Maps :** `docs/SETUP_GOOGLE_MAPS.md`
- **Images :** `docs/GUIDE_IMAGES_REELLES.md`
- **SEO :** `docs/AMELIORATION_SEO_SLUGS.md`
- **Déploiement :** `docs/VERCEL_GOOGLE_MAPS_DEPLOY.md`

## 🤝 Contributing

Ce projet est en développement actif. Voir `docs/TODO_DEMAIN.md` pour les prochaines étapes.

## 📝 License

Propriétaire

---

**Développé avec ❤️ par Wine District Team**

