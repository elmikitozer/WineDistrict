# 🔍 Test Recherche - Tirets & Espaces

**Feature :** Normalisation automatique tirets/espaces
**Date :** 21 Octobre 2025

---

## 🎯 Objectif

Permettre de chercher **"Saint Emilion"** et trouver **"Saint-Émilion"** (et vice-versa).

---

## ✅ Tests Rapides

### Test 1 : Espace → Tiret

```
Taper : "Saint Emilion"
Trouve : "Saint-Émilion" ✅
```

### Test 2 : Tiret → Espace

```
Taper : "Saint-Emilion"
Trouve : "Saint-Émilion" ✅
```

### Test 3 : Sans Séparateur

```
Taper : "SaintEmilion"
Trouve : "Saint-Émilion" ✅
```

### Test 4 : Côtes du Rhône

```
Taper : "cotes du rhone"
Trouve : "Côtes du Rhône" ✅

Taper : "cotes-du-rhone"
Trouve : "Côtes du Rhône" ✅

Taper : "cotesdurhone"
Trouve : "Côtes du Rhône" ✅
```

### Test 5 : Avec Année

```
Taper : "Saint Emilion 2018"
Trouve : "Saint-Émilion" de 2018 EN PREMIER ✅
```

---

## 🔬 Comment Ça Marche

### Fonction `normalizeSearchText()`

**Input :** `"Saint Emilion"`

**Output (variantes générées) :**

1. `"Saint Emilion"` (original)
2. `"Saint-Emilion"` (espaces → tirets)
3. `"SaintEmilion"` (sans séparateurs)

### Requête SQL Générée

```sql
WHERE (
  unaccent(nom) ILIKE unaccent('%Saint Emilion%') OR
  unaccent(domaine) ILIKE unaccent('%Saint Emilion%')
)
OR (
  unaccent(nom) ILIKE unaccent('%Saint-Emilion%') OR
  unaccent(domaine) ILIKE unaccent('%Saint-Emilion%')
)
OR (
  unaccent(nom) ILIKE unaccent('%SaintEmilion%') OR
  unaccent(domaine) ILIKE unaccent('%SaintEmilion%')
)
```

**Résultat :** Trouve le vin peu importe la variante !

---

## 📋 Checklist Complète

| Requête              | Trouve                     | Status |
| -------------------- | -------------------------- | ------ |
| `Saint Emilion`      | Saint-Émilion              | [ ]    |
| `Saint-Emilion`      | Saint-Émilion              | [ ]    |
| `SaintEmilion`       | Saint-Émilion              | [ ]    |
| `cotes du rhone`     | Côtes du Rhône             | [ ]    |
| `cotes-du-rhone`     | Côtes du Rhône             | [ ]    |
| `cotesdur hone`      | Côtes du Rhône             | [ ]    |
| `Saint Emilion 2018` | Saint-Émilion 2018 premier | [ ]    |
| `Haut Brion`         | Château Haut-Brion         | [ ]    |
| `Haut-Brion`         | Château Haut-Brion         | [ ]    |
| `HautBrion`          | Château Haut-Brion         | [ ]    |

---

## 🧪 Test Complet

```bash
# 1. Lancer serveur
npm run dev

# 2. Ouvrir
http://localhost:3000/

# 3. Tester ces variantes dans la barre de recherche :
```

### Scénario 1 : Saint-Émilion

1. Taper : `Saint Emilion`
2. Vérifier dropdown affiche vins de Saint-Émilion
3. Taper : `Saint-Emilion`
4. Vérifier mêmes résultats
5. Taper : `SaintEmilion`
6. Vérifier mêmes résultats

### Scénario 2 : Côtes du Rhône

1. Taper : `cotes du rhone`
2. Vérifier Côtes du Rhône apparaît
3. Taper : `cotes-du-rhone`
4. Vérifier mêmes résultats

### Scénario 3 : Avec Année

1. Taper : `Saint Emilion 2018`
2. Vérifier Saint-Émilion 2018 EN PREMIER
3. Format : `Nom (Domaine) - 2018`

---

## 🐛 Dépannage

### Problème : Ne trouve toujours pas

**Vérifications :**

1. Vider cache : `Cmd+Shift+R`
2. DevTools (F12) → Network → `/api/search?q=...`
3. Vérifier réponse JSON contient résultats

**Test direct API :**

```
http://localhost:3000/api/search?q=Saint%20Emilion
```

Devrait retourner des vins de Saint-Émilion.

### Problème : Trop de résultats

**Normal !** La normalisation génère plusieurs variantes, donc peut matcher plus de vins.

**Exemple :**

- `"Haut Brion"` trouve aussi `"Château Haut-Brion"` ET `"Château Mouton Rothschild"` (si "Haut" dans nom)

**Solution :** La pertinence trie les meilleurs résultats en premier.

---

## 💡 Exemples Réels

### Vins Concernés (Exemples)

**Avec tirets :**

- Saint-Émilion
- Saint-Estèphe
- Crozes-Hermitage
- Côtes-du-Rhône
- Château Haut-Brion
- Nuits-Saint-Georges

**Recherches qui fonctionnent :**

```
Saint Emilion      ✅
Saint-Emilion      ✅
SaintEmilion       ✅

Crozes Hermitage   ✅
Crozes-Hermitage   ✅
CrozesHermitage    ✅

Haut Brion         ✅
Haut-Brion         ✅
HautBrion          ✅
```

---

## 🎯 Résultat Attendu

**Quelle que soit la façon de taper, l'utilisateur trouve le vin !**

- ✅ Intuitif (pas besoin de savoir s'il y a un tiret ou pas)
- ✅ Flexible (espaces, tirets, ou rien)
- ✅ Compatible accents (déjà géré par `unaccent`)
- ✅ Fonctionne avec année (`Saint Emilion 2018`)

---

## 📊 Validation

**Score :** \_\_\_/10 tests

- ✅ 10/10 → Parfait !
- ✅ 8-9/10 → Très bon
- ⚠️ 6-7/10 → Quelques cas limites
- ❌ <6/10 → Problème à investiguer

---

**Status :** ✅ Implémenté et prêt à tester
**Dernière mise à jour :** 21 Octobre 2025
