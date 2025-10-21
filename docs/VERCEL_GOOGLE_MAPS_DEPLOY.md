# 🚀 Déployer Google Maps sur Vercel

## ⚠️ Message d'Avertissement Vercel

Quand tu ajoutes `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` dans Vercel, tu vois :

```
⚠️ This key, which is prefixed with NEXT_PUBLIC_ and includes the term KEY,
   might expose sensitive information to the browser.
   Verify it is safe to share publicly.
```

---

## ✅ **C'EST NORMAL ET SAFE !**

### Pourquoi cet avertissement ?

Vercel te prévient parce que **TOUT** ce qui commence par `NEXT_PUBLIC_` est **visible côté client** (dans le navigateur).

### Pourquoi c'est OK pour Google Maps ?

**Google Maps Embed API est CONÇU pour être public !**

- ✅ La clé est **censée** être dans le code client (HTML/JavaScript)
- ✅ Elle est **protégée** par les restrictions (domaine + API)
- ✅ C'est comme ça que Google Maps fonctionne sur **tous** les sites web

---

## 🔒 Sécurité : Comment Google Protège Ta Clé

### 1. **Restriction par Domaine**

Dans Google Cloud Console, tu as configuré :

```
localhost:3000/*
*.vercel.app/*
tondomaine.com/*
```

**Résultat** : La clé ne fonctionne **QUE** sur ces domaines.

Si quelqu'un copie ta clé et l'utilise sur `pirate.com` → ❌ **REFUSÉ**

### 2. **Restriction par API**

Tu as coché **uniquement** "Maps Embed API".

**Résultat** : La clé ne peut **PAS** être utilisée pour d'autres services Google (comme Places, Directions, etc.)

### 3. **Limite Gratuite**

- 28 000 chargements/mois gratuits
- Si quelqu'un abuse → Google bloque automatiquement

### 4. **Monitoring**

Tu peux voir l'usage en temps réel dans Google Cloud Console et configurer des alertes.

---

## 📝 Étapes pour Vercel (avec l'avertissement)

### 1. Aller dans les Settings du Projet

1. Dashboard Vercel → Ton projet
2. **Settings** (en haut)
3. **Environment Variables** (menu gauche)

### 2. Ajouter la Variable

| Champ           | Valeur                                  |
| --------------- | --------------------------------------- |
| **Name**        | `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`       |
| **Value**       | `AIzaSyA_xxxxxxxxxxxxxxxxxxxxx`         |
| **Environment** | ✅ Production ✅ Preview ✅ Development |

### 3. Vercel Affiche l'Avertissement

```
⚠️ This key, which is prefixed with NEXT_PUBLIC_...
```

### 4. **CLIQUE SUR "ADD" ou "SAVE"** ✅

**OUI, clique malgré l'avertissement !**

C'est juste un avertissement générique. Pour Google Maps, c'est totalement OK.

---

## 🛡️ Vérifications de Sécurité

Avant de déployer, vérifie dans **Google Cloud Console** :

### A. Restrictions de Domaine

1. Aller sur https://console.cloud.google.com/apis/credentials
2. Cliquer sur ta clé API
3. Vérifier **"Restrictions de site web"** :

```
*.vercel.app/*
tondomaine.com/*
localhost:3000/*  (optionnel en prod)
```

⚠️ **IMPORTANT** : Ajoute `*.vercel.app/*` pour que ça marche sur les déploiements Preview !

### B. Restrictions d'API

Vérifier que **SEULE** "Maps Embed API" est cochée.

❌ Ne pas cocher :

- Maps JavaScript API
- Places API
- Directions API
- Geocoding API

---

## 🔧 Ajouter le Domaine Vercel

### Domaine Automatique Vercel

Quand tu déploies, Vercel te donne une URL comme :

```
https://wine-district-xyz123.vercel.app
```

### Mettre à Jour Google Cloud

1. Aller dans **Google Cloud Console** → **Identifiants**
2. Cliquer sur ta clé API
3. Dans **"Restrictions de site web"**, ajouter :
   ```
   *.vercel.app/*
   ```

✅ Le wildcard `*` couvre tous tes déploiements Vercel (prod + previews)

### Si tu as un Domaine Personnalisé

Exemple : `winedistrict.com`

Ajouter aussi :

```
winedistrict.com/*
*.winedistrict.com/*
```

---

## 🧪 Tester Après Déploiement

### 1. Déployer sur Vercel

```bash
git push
```

Vercel déploie automatiquement.

### 2. Vérifier la Carte

1. Aller sur `https://ton-projet.vercel.app/cavistes/vinotheque-de-la-vigne-4`
2. La carte Google Maps devrait s'afficher ✅

### 3. Si Erreur "RefererNotAllowedMapError"

**Cause** : Le domaine Vercel n'est pas dans les restrictions

**Solution** :

1. Copier l'URL exacte depuis Vercel (ex: `wine-district-abc123.vercel.app`)
2. Aller dans Google Cloud Console
3. Ajouter `*.vercel.app/*` dans les restrictions
4. Attendre 2-3 minutes
5. Recharger la page (Cmd+Shift+R)

---

## 💡 Pourquoi `NEXT_PUBLIC_` ?

### Variables avec `NEXT_PUBLIC_`

- ✅ Accessibles côté client (navigateur)
- ✅ Nécessaire pour Google Maps (s'affiche dans le navigateur)
- ✅ Incluses dans le bundle JavaScript

### Variables SANS `NEXT_PUBLIC_`

- ❌ Accessibles UNIQUEMENT côté serveur
- ❌ Ne fonctionneraient PAS pour Google Maps
- ✅ Pour JWT_SECRET, DATABASE_URL, etc.

---

## 📊 Comparaison : Public vs Privé

| Variable        | Préfixe           | Exposition     | Exemple           |
| --------------- | ----------------- | -------------- | ----------------- |
| Google Maps API | `NEXT_PUBLIC_`    | ✅ Public (OK) | Maps dans iframe  |
| Supabase URL    | `NEXT_PUBLIC_`    | ✅ Public (OK) | Client-side fetch |
| JWT Secret      | ❌ Pas de préfixe | 🔒 Privé       | Signature tokens  |
| Database URL    | ❌ Pas de préfixe | 🔒 Privé       | Connexion DB      |

---

## 🎯 Checklist Déploiement

Avant de déployer :

- [ ] Google Maps Embed API activée
- [ ] Clé API créée
- [ ] Restrictions de domaine : `*.vercel.app/*` ajouté
- [ ] Restrictions d'API : SEULE Maps Embed API cochée
- [ ] Variable ajoutée dans Vercel (malgré l'avertissement)
- [ ] Environnement : Production ✅ Preview ✅ Development ✅

Après le déploiement :

- [ ] Page caviste ouverte sur Vercel
- [ ] Carte Google Maps visible
- [ ] Pas d'erreur dans la console (F12)
- [ ] Monitorer l'usage dans Google Cloud Console

---

## 🆘 Dépannage Vercel

### Problème 1 : "Environment variable not found"

**Cause** : Variable pas ajoutée ou mal nommée

**Solution** :

1. Vercel Dashboard → Settings → Environment Variables
2. Vérifier le nom exact : `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
3. Redéployer : Deployments → ... → Redeploy

### Problème 2 : Carte ne s'affiche qu'en local

**Cause** : Restrictions de domaine

**Solution** :

1. Google Cloud Console → Identifiants
2. Ajouter `*.vercel.app/*`
3. Attendre 2-3 minutes

### Problème 3 : "For development purposes only"

**Cause** : Facturation pas activée (normal)

**Solution** : Rien à faire, la carte fonctionne !

Pour enlever le watermark :

1. Google Cloud Console → Facturation
2. Ajouter une carte bancaire
3. Tu restes dans la limite gratuite

---

## 📸 Capture d'Écran Vercel (Format Texte)

```
┌─────────────────────────────────────────────────┐
│ Vercel > wine-district > Settings               │
├─────────────────────────────────────────────────┤
│                                                  │
│ Environment Variables                            │
│                                                  │
│ ┌──────────────────────────────────────────┐   │
│ │ Name                                      │   │
│ │ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY          │   │
│ ├──────────────────────────────────────────┤   │
│ │ Value                                     │   │
│ │ AIzaSyA_xxxxxxxxxxxxxxxxxxxxx            │   │
│ ├──────────────────────────────────────────┤   │
│ │ Environment                               │   │
│ │ ☑ Production  ☑ Preview  ☑ Development   │   │
│ └──────────────────────────────────────────┘   │
│                                                  │
│ ⚠️ This key, which is prefixed with             │
│    NEXT_PUBLIC_ and includes the term KEY,      │
│    might expose sensitive information...        │
│                                                  │
│    [Cancel]  [Add] ← CLIQUE ICI                │
│                                                  │
└─────────────────────────────────────────────────┘
```

---

## ✅ Résumé Rapide

1. **Vercel affiche un avertissement** → Normal
2. **Clique sur "Add"** malgré l'avertissement → Safe
3. **Google Cloud : Ajoute `*.vercel.app/*`** dans restrictions
4. **Déploie** → `git push`
5. **Teste** sur Vercel

**La clé Google Maps DOIT être publique pour fonctionner !**

---

## 🔗 Liens Utiles

- **Vercel Env Vars** : https://vercel.com/docs/environment-variables
- **Google Cloud Console** : https://console.cloud.google.com/apis/credentials
- **Next.js Public Vars** : https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

---

**C'est tout ! Clique sur "Add" et déploie en toute confiance ! 🚀**
