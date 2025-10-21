# 🔐 Protéger ta Clé Google Maps API - Guide Complet

## 🎯 Vue d'Ensemble

Google te recommande de protéger ta clé pour éviter :
- ❌ Utilisation non autorisée par d'autres sites
- ❌ Dépassement de quota (facturation inattendue)
- ❌ Abus de ta clé par des robots

**Solution : Ajouter des RESTRICTIONS**

---

## 🔒 Étape 1 : Restreindre par Domaine (APPLICATION)

### A. Aller dans Google Cloud Console

1. **Ouvrir** : https://console.cloud.google.com/apis/credentials
2. **Sélectionner** ton projet (`wine-district`)
3. **Cliquer** sur ta clé API (dans la liste)

### B. Configurer les Restrictions d'Application

1. Scroll jusqu'à **"Restrictions d'application"**
2. Sélectionner **"Référents HTTP (sites web)"**
3. Cliquer sur **"AJOUTER UN ÉLÉMENT DE RÉFÉRENT"**

### C. Ajouter tes Domaines

Ajoute **TOUS** ces domaines un par un :

```
localhost:3000/*
localhost:3000
http://localhost:3000/*
https://*.vercel.app/*
https://wine-district*.vercel.app/*
```

**Si tu as un domaine personnalisé** (ex: `winedistrict.com`) :
```
https://winedistrict.com/*
https://*.winedistrict.com/*
```

### D. Format Exact des Référents

⚠️ **IMPORTANT** : Le format doit être précis !

| ✅ CORRECT | ❌ INCORRECT |
|-----------|-------------|
| `https://*.vercel.app/*` | `*.vercel.app` |
| `localhost:3000/*` | `localhost:3000` (sans `/*`) |
| `https://winedistrict.com/*` | `winedistrict.com` |

### E. Sauvegarder

1. Cliquer sur **"ENREGISTRER"** en bas de la page
2. Attendre 2-5 minutes que les changements prennent effet

---

## 🛡️ Étape 2 : Restreindre par API

### A. Dans la même page

1. Scroll jusqu'à **"Restrictions d'API"**
2. Sélectionner **"Restreindre la clé"** (radio button)

### B. Sélectionner UNIQUEMENT Maps Embed API

Dans le menu déroulant :

**✅ COCHER :**
- Maps Embed API

**❌ NE PAS COCHER :**
- Maps JavaScript API
- Places API
- Directions API
- Geocoding API
- Roads API
- Street View API
- *(Toutes les autres)*

### C. Pourquoi restreindre par API ?

Si quelqu'un vole ta clé, il ne pourra l'utiliser **QUE** pour Maps Embed API (cartes intégrées).

Il **NE POURRA PAS** :
- Faire des recherches de lieux (Places API) = $$$$
- Calculer des itinéraires (Directions API) = $$$$
- Géocoder des adresses (Geocoding API) = $$$$

### D. Sauvegarder

1. Cliquer sur **"ENREGISTRER"**
2. Attendre 2-5 minutes

---

## 📊 Étape 3 : Configurer des Quotas et Alertes

### A. Définir un Quota (Limite d'Utilisation)

1. Aller sur : https://console.cloud.google.com/apis/api/maps-embed-backend.googleapis.com/quotas
2. Cliquer sur **"Maps Embed API"**
3. Cliquer sur **"Quotas"** (onglet)
4. Définir une limite :
   - **Gratuit** : 28 000 requêtes/jour
   - **Recommandé pour MVP** : 1 000 requêtes/jour (largement suffisant)

### B. Créer une Alerte de Facturation

1. Aller sur : https://console.cloud.google.com/billing/budgets
2. Cliquer sur **"CREATE BUDGET"**
3. Configurer :
   ```
   Nom : Wine District Maps Alert
   Montant : $5/mois
   Alert à : 50%, 90%, 100%
   Email : ton-email@example.com
   ```
4. Cliquer sur **"FINISH"**

**Résultat** : Tu recevras un email si tu dépasses $2.50, $4.50, ou $5.

---

## 🧪 Étape 4 : Tester les Restrictions

### A. Tester sur Localhost

1. Ouvrir : http://localhost:3000/cavistes/vinotheque-de-la-vigne-4
2. La carte devrait s'afficher ✅

### B. Tester sur Vercel (après déploiement)

1. Déployer : `git push`
2. Ouvrir ton URL Vercel : `https://wine-district-xyz.vercel.app/cavistes/...`
3. La carte devrait s'afficher ✅

### C. Tester qu'un Site Externe NE PEUT PAS Utiliser ta Clé

Créer un fichier HTML test :

```html
<!-- test-steal-key.html -->
<!DOCTYPE html>
<html>
<head>
  <title>Test Vol de Clé</title>
</head>
<body>
  <h1>Test : Cette carte ne devrait PAS s'afficher</h1>
  <iframe
    width="600"
    height="450"
    style="border:0"
    loading="lazy"
    allowfullscreen
    src="https://www.google.com/maps/embed/v1/place?key=TA_CLE_ICI&q=Paris"
  ></iframe>
</body>
</html>
```

1. Ouvrir ce fichier localement (`file:///...`)
2. **Résultat attendu** : ❌ Carte NE s'affiche PAS (erreur RefererNotAllowedMapError)

**Si la carte s'affiche** → Tes restrictions ne sont pas configurées correctement.

---

## 🔍 Étape 5 : Monitoring et Sécurité Continue

### A. Vérifier l'Usage Régulièrement

1. Aller sur : https://console.cloud.google.com/apis/dashboard
2. Cliquer sur **"Maps Embed API"**
3. Vérifier les graphiques :
   - Requêtes par jour
   - Erreurs
   - Latence

### B. Alertes de Sécurité

Google te notifiera automatiquement si :
- ❌ Ta clé est utilisée depuis un domaine non autorisé
- ❌ Pic inhabituel de requêtes
- ❌ Erreurs répétées

### C. Rotation de la Clé (Optionnel)

**Quand ?**
- Si tu suspectes que ta clé a été compromise
- Tous les 6-12 mois (bonne pratique)

**Comment ?**
1. Google Cloud Console → Identifiants
2. Créer une **nouvelle** clé API
3. Ajouter les mêmes restrictions
4. Mettre à jour `.env.local` et Vercel
5. Attendre 24h
6. Supprimer l'ancienne clé

---

## 📋 Checklist Sécurité Complète

### ✅ Restrictions d'Application (Domaines)

- [ ] `localhost:3000/*` (développement local)
- [ ] `https://*.vercel.app/*` (déploiements Vercel)
- [ ] `https://tondomaine.com/*` (production, si applicable)
- [ ] **PAS** de wildcard `*` seul (dangereux)

### ✅ Restrictions d'API

- [ ] **UNIQUEMENT** "Maps Embed API" cochée
- [ ] Toutes les autres APIs décochées

### ✅ Quotas et Alertes

- [ ] Quota quotidien défini (ex: 1000 req/jour)
- [ ] Alerte de facturation configurée (ex: $5/mois)
- [ ] Email de notification ajouté

### ✅ Bonnes Pratiques

- [ ] Clé dans `.env.local` (jamais hardcodée)
- [ ] `.env.local` dans `.gitignore`
- [ ] Variables Vercel configurées
- [ ] Monitoring régulier de l'usage

---

## 🎨 Exemple Visuel de Configuration

```
┌─────────────────────────────────────────────────┐
│ Google Cloud Console > APIs > Identifiants      │
├─────────────────────────────────────────────────┤
│                                                  │
│ Clé API : wine-district-maps-key                │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ RESTRICTIONS D'APPLICATION                  │ │
│ │                                             │ │
│ │ ○ Aucune restriction (NON RECOMMANDÉ)      │ │
│ │ ● Référents HTTP (sites web)               │ │
│ │                                             │ │
│ │ Référents autorisés :                       │ │
│ │ ┌─────────────────────────────────────────┐ │ │
│ │ │ localhost:3000/*                        │ │ │
│ │ │ https://*.vercel.app/*                  │ │ │
│ │ │ https://winedistrict.com/*              │ │ │
│ │ └─────────────────────────────────────────┘ │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│ ┌─────────────────────────────────────────────┐ │
│ │ RESTRICTIONS D'API                          │ │
│ │                                             │ │
│ │ ○ Ne pas restreindre la clé               │ │
│ │ ● Restreindre la clé                       │ │
│ │                                             │ │
│ │ Sélectionner les APIs :                     │ │
│ │ ┌─────────────────────────────────────────┐ │ │
│ │ │ ☑ Maps Embed API                        │ │ │
│ │ │ ☐ Maps JavaScript API                   │ │ │
│ │ │ ☐ Places API                            │ │ │
│ │ │ ☐ Directions API                        │ │ │
│ │ │ ☐ Geocoding API                         │ │ │
│ │ └─────────────────────────────────────────┘ │ │
│ │                                             │ │
│ └─────────────────────────────────────────────┘ │
│                                                  │
│           [ANNULER]  [ENREGISTRER] ← CLIQUER    │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## 🆘 Dépannage Après Restrictions

### Problème 1 : Carte ne s'affiche plus sur localhost

**Erreur** : `Google Maps JavaScript API error: RefererNotAllowedMapError`

**Cause** : `localhost:3000/*` pas dans les référents

**Solution** :
1. Google Cloud Console → Ta clé API
2. Restrictions d'application → Ajouter `localhost:3000/*`
3. Enregistrer
4. Attendre 2-3 minutes
5. Vider le cache (Cmd+Shift+R)

### Problème 2 : Carte ne s'affiche plus sur Vercel

**Erreur** : `RefererNotAllowedMapError`

**Cause** : Domaine Vercel pas dans les référents

**Solution** :
1. Copier l'URL exacte Vercel : `wine-district-abc123.vercel.app`
2. Google Cloud Console → Ta clé API
3. Ajouter `https://*.vercel.app/*`
4. Enregistrer et attendre 2-3 minutes

### Problème 3 : "This API project is not authorized..."

**Erreur** : `Google Maps JavaScript API has not been authorized for the used API key`

**Cause** : Maps Embed API pas dans les restrictions d'API

**Solution** :
1. Google Cloud Console → Ta clé API
2. Restrictions d'API → Cocher "Maps Embed API"
3. Enregistrer

### Problème 4 : Restrictions trop strictes

**Symptôme** : Carte ne s'affiche nulle part

**Solution** : Temporairement désactiver les restrictions pour tester
1. Restrictions d'application → Sélectionner "Aucune restriction"
2. Tester si la carte s'affiche
3. Si oui → Problème de configuration des référents
4. Reconfigurer correctement puis réactiver les restrictions

---

## 💰 Estimation des Coûts avec Protections

### Scénario MVP (1000 visiteurs/mois)

- **Pages vues** : ~1000 pages cavistes/mois
- **Chargements Maps** : ~500/mois (50% visitent une page caviste)
- **Coût** : **$0** (bien en-dessous de 28 000/mois)

### Scénario Croissance (10 000 visiteurs/mois)

- **Pages vues** : ~10 000 pages cavistes/mois
- **Chargements Maps** : ~5 000/mois
- **Coût** : **$0** (toujours gratuit)

### Scénario Production (100 000 visiteurs/mois)

- **Pages vues** : ~100 000 pages cavistes/mois
- **Chargements Maps** : ~50 000/mois
- **Dépassement** : 50 000 - 28 000 = 22 000
- **Coût** : 22 000 / 1 000 × $7 = **~$154/mois**

**Protection** : Quota à 1 000/jour = ~30 000/mois → Reste gratuit

---

## 🎯 Résumé en 3 Points

### 1. Restreindre par Domaine ✅

```
localhost:3000/*
https://*.vercel.app/*
https://tondomaine.com/*
```

### 2. Restreindre par API ✅

```
UNIQUEMENT Maps Embed API
```

### 3. Configurer des Alertes ✅

```
Quota : 1000 req/jour
Budget : $5/mois avec alertes
```

---

## 🔗 Liens Rapides

- **Identifiants** : https://console.cloud.google.com/apis/credentials
- **Dashboard** : https://console.cloud.google.com/apis/dashboard
- **Facturation** : https://console.cloud.google.com/billing
- **Quotas** : https://console.cloud.google.com/apis/api/maps-embed-backend.googleapis.com/quotas

---

**Ta clé est maintenant protégée ! 🔐✨**

## 📱 Prochaine Étape

1. ✅ Configurer les restrictions (ci-dessus)
2. ✅ Tester sur localhost et Vercel
3. ✅ Vérifier le monitoring dans 24h
4. 🚀 Déployer en production avec confiance !

