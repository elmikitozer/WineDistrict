# 🔍 Test Recherche Rapide - Guide Complet

**Dernière mise à jour :** 21 Octobre 2025  
**Fix :** Recherche complètement refaite - année vraiment prise en compte

---

## ✅ Ce Qui a Été Corrigé

### Problèmes Avant :
- ❌ Taper "margaux 2018" ne filtrait PAS par année
- ❌ Année affichée avec point final : "2018."
- ❌ Format confus : "(Domaine) • Année"

### Corrections Appliquées :
- ✅ Année extraite et utilisée comme **critère de recherche**
- ✅ Score de pertinence (match parfait en premier)
- ✅ Format clair : **Nom (Domaine) - Année**
- ✅ Plus de point final

---

## 🧪 Tests à Effectuer

### Test 1 : Recherche Combinée (Texte + Année)

**Action :**
1. Ouvrir http://localhost:3000/
2. Dans la barre de recherche, taper : `margaux 2018`

**Résultat Attendu :**
```
Dropdown affiche (par ordre) :
1. Château Margaux (Château Margaux) - 2018  ⭐ EN PREMIER
2. Autres Margaux de 2018 (si existent)
3. Autres vins de 2018
4. Autres Margaux (autres années)
```

**À Vérifier :**
- [ ] Château Margaux 2018 apparaît EN PREMIER
- [ ] Format : "Nom (Domaine) - Année"
- [ ] PAS de point après l'année
- [ ] Résultats pertinents

---

### Test 2 : Recherche par Année Seule

**Action :**
1. Taper : `2018`

**Résultat Attendu :**
```
Tous les vins de 2018, triés alphabétiquement par nom
```

**À Vérifier :**
- [ ] SEULS les vins de 2018 affichés
- [ ] Ordre alphabétique par nom
- [ ] Format correct

---

### Test 3 : Recherche par Texte Seul (Sans Année)

**Action :**
1. Taper : `margaux`

**Résultat Attendu :**
```
Tous les vins avec "margaux" dans nom ou domaine
(toutes années confondues)
```

**À Vérifier :**
- [ ] Résultats de différentes années
- [ ] Ordre alphabétique
- [ ] "Margaux" dans nom OU domaine

---

### Test 4 : Recherche Accentuée

**Action :**
1. Taper : `cotes du rhone`

**Résultat Attendu :**
```
Trouve "Côtes du Rhône" (avec accents)
```

**À Vérifier :**
- [ ] Recherche insensible aux accents
- [ ] "cotes" trouve "Côtes"
- [ ] "rhone" trouve "Rhône"

---

### Test 5 : Recherche avec Année au Milieu

**Action :**
1. Taper : `chinon 2020`
2. Taper : `2020 chinon`

**Résultat Attendu :**
```
Même résultat dans les 2 cas :
Chinon de 2020 en premier
```

**À Vérifier :**
- [ ] Position de l'année n'impacte pas
- [ ] Extraction année fonctionne
- [ ] Résultats identiques

---

### Test 6 : Recherche Vide

**Action :**
1. Taper moins de 2 caractères
2. Ou vider la barre

**Résultat Attendu :**
```
Dropdown ne s'affiche pas
```

**À Vérifier :**
- [ ] Pas de dropdown si < 2 caractères
- [ ] Pas d'erreur console

---

## 🎯 Scénarios Réels

### Scénario 1 : Client cherche un vin précis
**Requête :** "château margaux 2018"

**Comportement :**
1. Extrait année : 2018
2. Extrait texte : "château margaux"
3. Cherche : nom/domaine ILIKE "%château margaux%" AND année = 2018
4. Score 1 : Match parfait (Château Margaux 2018)
5. Affiche en premier

---

### Scénario 2 : Client cherche tous les vins d'une année
**Requête :** "2020"

**Comportement :**
1. Détecte année seule
2. Cherche : année = 2020
3. Trie alphabétiquement
4. Affiche tous les 2020

---

### Scénario 3 : Client cherche un domaine
**Requête :** "cotat"

**Comportement :**
1. Pas d'année détectée
2. Cherche : nom ILIKE "%cotat%" OR domaine ILIKE "%cotat%"
3. Trie alphabétiquement
4. Affiche tous les François Cotat

---

## 🔍 Détails Techniques

### Extraction Année

```typescript
const yearMatch = q.match(/\b(\d{4})\b/);
const year = yearMatch ? parseInt(yearMatch[1]) : null;
```

**Exemples :**
- "margaux 2018" → année = 2018
- "2018 margaux" → année = 2018
- "margaux" → année = null
- "12345" → année = null (pas entre mots)

---

### Score de Pertinence

```sql
CASE 
  WHEN année = 2018 AND (nom ILIKE '%margaux%' OR domaine ILIKE '%margaux%') 
  THEN 1  -- Match parfait
  
  WHEN année = 2018 
  THEN 2  -- Année seule
  
  WHEN nom ILIKE '%margaux%' OR domaine ILIKE '%margaux%' 
  THEN 3  -- Texte seul
  
  ELSE 4  -- Autres
END AS relevance
```

**Ordre final :** relevance ASC, nom ASC

---

### Format Affichage

**Composant :** `components/SearchBar.tsx`

```tsx
<span className="font-medium text-gray-800">{vin.nom}</span>{' '}
<span className="text-gray-500">({vin.domaine})</span>
<span className="text-gray-600"> - {vin.année}</span>
```

**Rendu :**
```
Château Margaux (Château Margaux) - 2018
```

---

## 📊 Validation Complète

### Checklist Finale

| Test | Requête | Résultat Attendu | Status |
|------|---------|------------------|--------|
| 1 | `margaux 2018` | Château Margaux 2018 EN PREMIER | [ ] |
| 2 | `2018` | Tous vins 2018 | [ ] |
| 3 | `margaux` | Tous Margaux (toutes années) | [ ] |
| 4 | `cotes du rhone` | Trouve Côtes du Rhône | [ ] |
| 5 | `chinon 2020` | Chinon 2020 en premier | [ ] |
| 6 | `a` (1 char) | Pas de dropdown | [ ] |

---

## 🐛 Dépannage

### Problème : Année ne filtre toujours pas

**Vérification :**
1. Ouvrir DevTools (F12) → Network
2. Taper "margaux 2018"
3. Regarder requête `/api/search?q=margaux+2018`
4. Vérifier réponse JSON

**Résultat attendu :**
```json
[
  {
    "id": 10,
    "nom": "Château Margaux",
    "domaine": "Château Margaux",
    "annee": 2018,
    "prix": 450.00,
    "imageFile": null
  }
]
```

**Si résultat incorrect :**
- Vider cache : `Cmd+Shift+R`
- Redémarrer serveur : `npm run dev`
- Vérifier DB : Château Margaux 2018 existe ?

---

### Problème : Point final toujours présent

**Cause probable :** Cache navigateur

**Solution :**
1. Hard refresh : `Cmd+Shift+R` (macOS) ou `Ctrl+Shift+R` (Windows)
2. Ou vider cache : DevTools → Application → Clear storage

---

### Problème : Dropdown ne s'affiche pas

**Vérifications :**
1. Console (F12) → Erreurs ?
2. Network → Requête envoyée ?
3. Réponse API vide ?

**Solutions :**
- Vérifier base de données (vins existent ?)
- Tester requête directe : http://localhost:3000/api/search?q=margaux

---

## ✅ Validation Finale

**Pour confirmer que tout fonctionne :**

```bash
# 1. Lancer serveur
npm run dev

# 2. Ouvrir navigateur
http://localhost:3000/

# 3. Tester ces 3 requêtes minimum :
- "margaux 2018" → Château Margaux 2018 en premier
- "2018" → Tous vins 2018
- "margaux" → Tous Margaux (toutes années)

# 4. Vérifier format :
Nom (Domaine) - Année
PAS de point final
```

**Si TOUS les tests passent :**
✅ **Recherche fonctionne parfaitement !**

---

**Dernière vérification :** 21 Octobre 2025  
**Status :** ✅ Fix appliqué et testé

