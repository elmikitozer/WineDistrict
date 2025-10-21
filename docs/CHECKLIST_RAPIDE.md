# ✅ Checklist Rapide - Tests Essentiels

**Durée :** 15 minutes  
**Avant de passer aux améliorations**

---

## 🚀 Tests Critiques (À Faire Absolument)

### 1. Google Maps Fonctionne ✅
**URL :** http://localhost:3000/cavistes/vinotheque-de-la-vigne-4

- [ ] Carte Google Maps visible
- [ ] Pas d'erreur "RefererNotAllowedMapError"
- [ ] Lien "Obtenir l'itinéraire" fonctionne

**Si erreur :**
- Vérifier restrictions Google Cloud Console
- Vérifier clé API dans `.env.local`

---

### 2. Panier & Commande ✅
**URL :** http://localhost:3000/

**Parcours complet :**
1. [ ] Se connecter comme client
2. [ ] Chercher un vin
3. [ ] Ajouter au panier (quantité : 2)
4. [ ] Aller dans panier
5. [ ] Valider commande
6. [ ] Vérifier redirection confirmation
7. [ ] Vérifier dashboard (commande visible)

**Si erreur CSRF :**
- Vider cache navigateur
- Vérifier cookie `_csrf` (DevTools → Application → Cookies)

---

### 3. Recherche Année ✅
**URL :** http://localhost:3000/

**Actions :**
1. [ ] Taper "margaux 2018" dans barre recherche
2. [ ] Vérifier Château Margaux 2018 en premier
3. [ ] Vérifier année affichée : "2018" (PAS "2018.")

**Si point final visible :**
- Problème dans `/api/search/route.ts`
- Devrait être fixé (CTE implémenté)

---

### 4. Dashboard Caviste ✅
**URL :** http://localhost:3000/dashboard (caviste)

**À vérifier :**
1. [ ] Commandes s'affichent
2. [ ] Colonnes "Nom" et "Prénom" séparées
3. [ ] Colonne "Téléphone" visible
4. [ ] Filtres statut fonctionnent

**Si erreur "User.nom does not exist" :**
- Migration `MIGRATION_USER_INFO.sql` pas appliquée
- Appliquer dans Supabase SQL Editor

---

### 5. Favoris ✅
**URL :** http://localhost:3000/cavistes/[slug]

**Actions :**
1. [ ] Se connecter comme client
2. [ ] Cliquer "Ajouter aux favoris"
3. [ ] Vérifier bouton devient "Retirer des favoris" (rose)
4. [ ] Aller sur `/favoris`
5. [ ] Vérifier caviste dans liste

---

### 6. Images Placeholders ✅
**URL :** Toutes les pages

**À vérifier :**
- [ ] Vins : Design #14 (Creative) avec couleurs
- [ ] Rouge : palette rouge/bordeaux
- [ ] Blanc : palette jaune/or
- [ ] Rosé : palette rose (pas trop orange)
- [ ] Cavistes : Dégradé + initiales
- [ ] Aucune "broken image" (404)

---

### 7. Sécurité Basique ✅
**URLs à tester (NON connecté) :**

1. [ ] http://localhost:3000/dashboard → Redirige vers `/login`
2. [ ] http://localhost:3000/favoris → Redirige vers `/login`
3. [ ] http://localhost:3000/cart → Accessible (OK)

---

## 🎯 Résultat

**Si TOUS les tests passent ✅**
→ **Prêt pour les améliorations !**

Passer à :
1. Toasts (react-hot-toast)
2. Loading states
3. Index DB

**Si 1+ test échoue ❌**
→ **Fixer d'abord !**

Voir `docs/TESTS_COMPLETS.md` pour diagnostic détaillé.

---

## 🔧 Commandes Utiles

### Vérifier Logs Serveur
```bash
# Dans le terminal où tourne npm run dev
# Chercher les erreurs
```

### Vider Cache Navigateur
```
Cmd + Shift + R (macOS)
Ctrl + Shift + R (Windows)
```

### Vérifier CSRF Cookie
```
F12 → Application → Cookies → localhost:3000
Chercher: _csrf
```

### Vérifier DB (Supabase)
```sql
-- Vérifier table User a les colonnes
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'User';

-- Devrait inclure: nom, prenom, telephone
```

---

## 📊 Score

Tests réussis : **___ / 7**

- ✅ 7/7 → **Excellent ! Prêt pour amélioration**
- ✅ 5-6/7 → **Bon ! Fixer petits bugs**
- ⚠️ 3-4/7 → **Moyen, corriger bugs critiques**
- ❌ < 3/7 → **Bloquer, debug approfondi requis**

---

**Bon courage ! 🚀**

