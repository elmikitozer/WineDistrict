# 🗺️ Setup Google Maps API - Guide Pas à Pas

## Étape 1 : Créer un Projet Google Cloud

1. Aller sur **Google Cloud Console** : https://console.cloud.google.com/
2. Cliquer sur le **sélecteur de projet** (en haut à côté de "Google Cloud")
3. Cliquer sur **"NOUVEAU PROJET"**
4. Nom du projet : `wine-district` (ou autre)
5. Cliquer sur **"CRÉER"**
6. Attendre quelques secondes que le projet soit créé

---

## Étape 2 : Activer Maps Embed API

### A. Aller dans la bibliothèque d'APIs

1. Dans le menu de gauche ☰, aller dans **"APIs et services"** → **"Bibliothèque"**

   OU directement : https://console.cloud.google.com/apis/library

### B. Chercher et activer Maps Embed API

1. Dans la barre de recherche, taper : **"Maps Embed API"**
2. Cliquer sur le résultat **"Maps Embed API"**
3. Cliquer sur le bouton bleu **"ACTIVER"** (ou "ENABLE")
4. Attendre quelques secondes ⏳

✅ **Maps Embed API est maintenant activée !**

---

## Étape 3 : Créer une Clé API

### A. Aller dans Identifiants

1. Dans le menu de gauche, cliquer sur **"Identifiants"** (ou "Credentials")

   OU directement : https://console.cloud.google.com/apis/credentials

### B. Créer une nouvelle clé

1. Cliquer sur **"+ CRÉER DES IDENTIFIANTS"** (en haut)
2. Sélectionner **"Clé API"**
3. Une popup s'affiche avec votre clé :
   ```
   AIzaSyA_xxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxx
   ```
4. **COPIER** cette clé (icône 📋)

---

## Étape 4 : Sécuriser la Clé API (IMPORTANT !)

### A. Restreindre la clé

Dans la popup qui vient de s'afficher :

1. Cliquer sur **"RESTREINDRE LA CLÉ"**

### B. Restrictions d'application

1. Cocher **"Sites web (HTTP referrers)"**
2. Dans **"Restrictions de site web"**, ajouter :
   ```
   localhost:3000/*
   *.vercel.app/*
   yourdomain.com/*
   ```
3. Cliquer sur **"+ Ajouter"** après chaque entrée

### C. Restrictions d'API

1. Cocher **"Restreindre la clé"**
2. Dans le menu déroulant, sélectionner **UNIQUEMENT** :
   - ✅ **Maps Embed API**
3. Cliquer sur **"ENREGISTRER"**

✅ **Clé API sécurisée !**

---

## Étape 5 : Configurer dans le Projet

### A. Créer le fichier `.env.local`

À la racine du projet, créer ou modifier `.env.local` :

```bash
# .env.local

# Database (déjà présent)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase (déjà présent)
NEXT_PUBLIC_SUPABASE_URL="https://..."
SUPABASE_BUCKET="wine-images"

# JWT (déjà présent)
JWT_SECRET="..."

# Google Maps API (NOUVEAU - remplacer par votre clé)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyA_xxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxx"
```

### B. Redémarrer le serveur

```bash
# Arrêter le serveur (Ctrl+C)
# Relancer
npm run dev
```

---

## Étape 6 : Vérifier que ça Fonctionne

1. Aller sur une page caviste : http://localhost:3000/cavistes/vinotheque-de-la-vigne-4
2. La carte Google Maps devrait s'afficher ✅
3. Si vous voyez "For development purposes only" → Normal, c'est OK !

### ❌ Si la carte ne s'affiche pas :

Ouvrir la **Console du navigateur** (F12) et regarder les erreurs :

- **"Google Maps JavaScript API error: RefererNotAllowedMapError"**
  → Vérifier les restrictions de site web (Étape 4B)

- **"Google Maps JavaScript API has not been authorized"**
  → Vérifier que Maps Embed API est bien activée (Étape 2)

- **"InvalidKeyMapError"**
  → Vérifier que la clé est correcte dans `.env.local`

---

## 💰 Tarification Google Maps

### Gratuit

- **28 000 chargements/mois** GRATUIT
- Pas de carte bancaire requise pour commencer

### Payant (si dépassement)

- **$7 pour 1000 chargements** supplémentaires
- **Estimation MVP** : 1000-5000 chargements/mois = **GRATUIT**

### Activer la facturation (Optionnel)

Si vous dépassez la limite gratuite, Google vous demandera d'activer la facturation.

1. Aller dans **"Facturation"** dans le menu
2. Ajouter une carte bancaire
3. Google offre **$300 de crédit** pour 90 jours aux nouveaux comptes !

---

## 🔒 Sécurité - Best Practices

### ✅ À FAIRE :

1. **Utiliser `NEXT_PUBLIC_`** : La clé est publique, c'est normal pour Maps Embed
2. **Restreindre par domaine** : localhost + votre domaine de production
3. **Restreindre par API** : Uniquement Maps Embed API
4. **Monitorer l'usage** : Vérifier régulièrement dans Google Cloud Console

### ❌ À NE PAS FAIRE :

1. Ne pas partager la clé dans le code (elle est déjà dans `.env.local` qui est ignoré par git)
2. Ne pas activer toutes les APIs Google (coûteux)
3. Ne pas laisser la clé sans restriction

---

## 🆘 Dépannage

### Problème 1 : "For development purposes only"

**Solution** : C'est normal ! Cela signifie que :

- La clé fonctionne ✅
- Vous n'avez pas encore activé la facturation
- La carte reste fonctionnelle

Pour enlever le watermark :

1. Activer la facturation dans Google Cloud
2. Ajouter une carte bancaire (vous restez dans la limite gratuite)

### Problème 2 : Carte grise avec erreur

**Solution** :

1. Vérifier que Maps Embed API est activée
2. Vérifier que la clé est correcte dans `.env.local`
3. Redémarrer `npm run dev`
4. Vider le cache du navigateur (Cmd+Shift+R)

### Problème 3 : "This page can't load Google Maps correctly"

**Solution** :

1. Vérifier les restrictions de domaine (Étape 4B)
2. Ajouter `localhost:3000/*` dans les restrictions
3. Attendre 2-3 minutes que la restriction prenne effet

---

## 📊 Monitoring de l'Usage

### Vérifier combien de chargements vous avez :

1. Aller sur : https://console.cloud.google.com/apis/dashboard
2. Cliquer sur **"Maps Embed API"**
3. Voir les graphiques d'utilisation
4. Vérifier que vous êtes sous 28k/mois

---

## 🎯 Résumé Rapide

```bash
1. console.cloud.google.com → Nouveau Projet
2. Bibliothèque → Maps Embed API → ACTIVER
3. Identifiants → + CRÉER → Clé API → COPIER
4. Restreindre la clé (domaines + API)
5. .env.local → NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
6. npm run dev → Tester
```

---

**C'est tout ! 🎉 La carte Google Maps devrait maintenant fonctionner sur vos pages cavistes.**
