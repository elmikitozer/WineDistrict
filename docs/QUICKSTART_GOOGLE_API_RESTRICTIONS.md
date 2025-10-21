# ⚡ Quick Start - Ajouter Plusieurs Ports Localhost

**Problème :** Ton serveur Next.js tourne sur `localhost:3001` au lieu de `3000` ?
**Solution :** Ajoute **tous les ports** dans les restrictions Google API !

---

## 🚀 Étapes (5 minutes)

### 1️⃣ Ouvrir Google Cloud Console

```
https://console.cloud.google.com/apis/credentials
```

### 2️⃣ Cliquer sur ta Clé API

Dans la liste des identifiants, clique sur ta clé (ex: `wine-district-maps-key`)

### 3️⃣ Trouver "Restrictions d'application"

Scroll jusqu'à la section **"Restrictions d'application"**

### 4️⃣ Vérifier que "Référents HTTP (sites web)" est sélectionné

- ● **Référents HTTP (sites web)** ← Doit être coché
- ○ Aucune restriction

### 5️⃣ Ajouter les Ports Localhost

Clique sur **"AJOUTER UN ÉLÉMENT DE RÉFÉRENT"** et ajoute UN PAR UN :

```
localhost:3000/*
```

Cliquer sur **"AJOUTER UN ÉLÉMENT DE RÉFÉRENT"** à nouveau :

```
localhost:3001/*
```

Cliquer sur **"AJOUTER UN ÉLÉMENT DE RÉFÉRENT"** à nouveau :

```
localhost:3002/*
```

### 6️⃣ Ajouter les Variantes avec `http://`

Certaines configurations requièrent le protocole explicite. Ajoute aussi :

```
http://localhost:3000/*
http://localhost:3001/*
http://localhost:3002/*
```

### 7️⃣ Ajouter Vercel (Obligatoire pour Production)

```
https://*.vercel.app/*
```

### 8️⃣ Sauvegarder

Clique sur **"ENREGISTRER"** en bas de la page.

⏳ **Attendre 2-5 minutes** pour que les changements prennent effet.

---

## 📋 Liste Complète des Référents à Ajouter

Copie-colle cette checklist :

```
☐ localhost:3000/*
☐ localhost:3001/*
☐ localhost:3002/*
☐ http://localhost:3000/*
☐ http://localhost:3001/*
☐ http://localhost:3002/*
☐ https://*.vercel.app/*
```

**Optionnel (si domaine personnalisé) :**

```
☐ https://tondomaine.com/*
☐ https://*.tondomaine.com/*
```

---

## 🧪 Tester

### A. Trouver ton Port Actuel

Regarde dans ton terminal où `npm run dev` tourne :

```bash
$ npm run dev

> wine-district@0.1.0 dev
> next dev

  ▲ Next.js 15.0.3
  - Local:        http://localhost:3001  ← TON PORT ICI
  - Network:      http://192.168.1.X:3001

 ✓ Starting...
 ✓ Ready in 2.3s
```

**Exemple ici :** Port `3001`

### B. Vérifier que ta Clé Fonctionne

1. Ouvrir ton navigateur
2. Aller sur `http://localhost:3001/cavistes/vinotheque-de-la-vigne-4`
3. **Vérifier** : La carte Google Maps s'affiche-t-elle ?

**✅ OUI** → Tout fonctionne !
**❌ NON** → Voir dépannage ci-dessous.

---

## 🐛 Dépannage

### Problème : "This page can't load Google Maps correctly"

**Erreur Console (F12) :**

```
Google Maps JavaScript API error: RefererNotAllowedMapError
```

**Cause :** Ton port localhost n'est pas dans les référents autorisés.

**Solution :**

1. Regarde quel port tu utilises : `http://localhost:3001`
2. Va dans Google Cloud Console → Ta clé API
3. Ajoute `localhost:3001/*` dans les référents
4. Clique **ENREGISTRER**
5. **Attends 3-5 minutes**
6. Vide le cache : `Cmd+Shift+R` (macOS) ou `Ctrl+Shift+R` (Windows)
7. Recharge la page

### Problème : "API key not valid"

**Cause :** Restrictions d'API trop strictes ou clé incorrecte.

**Solution :**

1. Vérifie que `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` est correcte dans `.env.local`
2. Google Cloud Console → Ta clé → Restrictions d'API
3. Vérifie que **"Maps Embed API"** est cochée
4. Enregistre et attends 3 minutes

### Problème : Carte fonctionne sur 3000 mais pas sur 3001

**Cause :** Tu as ajouté `localhost:3000/*` mais pas `localhost:3001/*`

**Solution :**

1. Ajoute **TOUS** les ports : `3000`, `3001`, `3002`
2. Avec ET sans `http://` devant
3. Enregistre et attends

---

## 💡 Pourquoi Plusieurs Ports ?

### Next.js Auto-Sélectionne le Port

Quand tu lances `npm run dev` :

```bash
# Port 3000 LIBRE
$ npm run dev
→ Utilise localhost:3000 ✅

# Port 3000 OCCUPÉ (autre app)
$ npm run dev
⚠ Port 3000 is in use, trying 3001 instead.
→ Utilise localhost:3001 ✅

# Ports 3000 ET 3001 OCCUPÉS
$ npm run dev
⚠ Port 3001 is in use, trying 3002 instead.
→ Utilise localhost:3002 ✅
```

**Conséquence :** Si tu n'as que `3000` dans les restrictions et que Next.js utilise `3001`, la carte ne s'affichera pas !

**Solution :** Ajoute les 3 premiers ports pour couvrir tous les cas.

---

## 🔒 Sécurité

### Est-ce Dangereux d'Ajouter Plusieurs Ports ?

**NON ✅**

- `localhost` n'est accessible que **depuis ton ordinateur**
- Personne sur internet ne peut accéder à `localhost:3001`
- C'est 100% sécurisé pour le développement local

### Que se Passe-t-il en Production ?

En production (Vercel), l'URL sera :

```
https://wine-district-abc123.vercel.app
```

Cette URL est couverte par `https://*.vercel.app/*` dans tes restrictions.

---

## 🎯 Résumé

### ✅ Ce Que Tu Dois Avoir dans les Référents

```
localhost:3000/*          (Next.js port par défaut)
localhost:3001/*          (Next.js port alternatif 1)
localhost:3002/*          (Next.js port alternatif 2)
http://localhost:3000/*   (variante avec protocole)
http://localhost:3001/*   (variante avec protocole)
http://localhost:3002/*   (variante avec protocole)
https://*.vercel.app/*    (production Vercel)
```

### ✅ Ce Que Tu NE DOIS PAS Faire

❌ **N'ajoute PAS :**

```
localhost:*/*             (wildcard port = DANGEREUX)
*                         (wildcard complet = DANGEREUX)
http://*                  (wildcard domaine = DANGEREUX)
```

**Pourquoi ?**
Ces wildcards permettraient à N'IMPORTE QUI d'utiliser ta clé depuis n'importe quel site !

---

## 🔗 Liens Utiles

- **Identifiants API** : https://console.cloud.google.com/apis/credentials
- **Monitoring** : https://console.cloud.google.com/apis/dashboard
- **Guide complet** : Voir `docs/PROTEGER_CLE_GOOGLE_MAPS.md`

---

## ✅ Checklist Finale

- [ ] J'ai ajouté `localhost:3000/*`, `3001/*`, `3002/*`
- [ ] J'ai ajouté `http://localhost:3000/*`, `3001/*`, `3002/*`
- [ ] J'ai ajouté `https://*.vercel.app/*`
- [ ] J'ai cliqué **ENREGISTRER**
- [ ] J'ai attendu 3-5 minutes
- [ ] J'ai vidé le cache (`Cmd+Shift+R`)
- [ ] La carte s'affiche sur mon port actuel ✅

---

**C'est tout ! Ton serveur peut maintenant tourner sur n'importe quel port entre 3000 et 3002. 🚀**
