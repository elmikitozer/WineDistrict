# ⚡ Google Maps API - Quickstart (5 min)

## 🎯 Résumé Ultra-Rapide

```bash
# 1. Aller sur Google Cloud Console
https://console.cloud.google.com/

# 2. Activer Maps Embed API (PAS JavaScript API !)
https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com

# 3. Créer une clé API
https://console.cloud.google.com/apis/credentials
→ + CRÉER DES IDENTIFIANTS → Clé API → COPIER

# 4. Restreindre la clé
- Sites web : localhost:3000/*, *.vercel.app/*
- API : Maps Embed API uniquement

# 5. Ajouter dans .env.local
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyA_xxxxxxxxxxxxx"

# 6. Redémarrer
npm run dev
```

---

## ❓ FAQ Rapide

### Q: Quelle API activer ?

**R:** **Maps Embed API** (PAS Maps JavaScript API)

### Q: Ça coûte combien ?

**R:** **GRATUIT** jusqu'à 28 000 chargements/mois (largement suffisant pour MVP)

### Q: "For development purposes only" ?

**R:** Normal ! La carte fonctionne. Pour enlever : activer facturation (reste gratuit).

### Q: Carte ne s'affiche pas ?

**R:** Vérifier :

1. Maps Embed API activée
2. Clé correcte dans `.env.local`
3. `npm run dev` redémarré
4. F12 → Console pour voir l'erreur

### Q: RefererNotAllowedMapError ?

**R:** Ajouter `localhost:3000/*` dans restrictions de site web

---

## 📖 Guide Complet

Voir `SETUP_GOOGLE_MAPS.md` pour le guide détaillé avec explications.

---

**C'est tout ! 🎉**
