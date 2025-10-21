# ✅ Tests Complets - Wine District

**Date :** 21 Octobre 2025
**Avant améliorations :** Vérification complète de toutes les fonctionnalités

---

## 🎯 Objectif des Tests

Vérifier que **TOUT fonctionne** avant d'appliquer les améliorations de demain :

- Toasts (react-hot-toast)
- Index DB
- Loading states

---

## 📋 Plan de Tests

### ✅ Checklist Globale

- [ ] **Pages Publiques** (sans connexion)
- [ ] **Authentification** (login/signup)
- [ ] **Client** (panier + commandes)
- [ ] **Caviste** (gestion commandes)
- [ ] **Google Maps** (page caviste)
- [ ] **Performance** (temps chargement)

---

## 🌐 PARTIE 1 : Pages Publiques (Sans Connexion)

### Test 1.1 : Page d'Accueil

**URL :** http://localhost:3000/

**À vérifier :**

- [ ] Page se charge en < 2 secondes
- [ ] Navbar visible
- [ ] Barre de recherche présente
- [ ] Liens "Vins" et "Cavistes" fonctionnels
- [ ] Aucune erreur console (F12)

**Résultat :** ✅ / ❌

---

### Test 1.2 : Liste des Vins

**URL :** http://localhost:3000/vins

**À vérifier :**

- [ ] Tous les vins s'affichent (grille)
- [ ] Images placeholders fonctionnent
- [ ] Prix formatés correctement (ex: 45,00 €)
- [ ] Clic sur un vin → redirection vers `/vins/[slug]`
- [ ] Pas d'erreur 404 sur les images

**Résultat :** ✅ / ❌

---

### Test 1.3 : Recherche Rapide (Navbar)

**Actions :**

1. Taper "margaux" dans barre recherche
2. Vérifier dropdown s'affiche
3. Taper "margaux 2018"
4. Vérifier que Château Margaux 2018 apparaît en premier

**À vérifier :**

- [ ] Dropdown apparaît après 300ms
- [ ] Résultats pertinents affichés
- [ ] Année affichée (pas de point ".")
- [ ] Recherche combinée fonctionne (texte + année)
- [ ] Clic sur résultat → redirection correcte

**Résultat :** ✅ / ❌

---

### Test 1.4 : Page Produit Vin

**URL :** http://localhost:3000/vins/chateau-margaux-chateau-margaux-2018-rouge-10

**À vérifier :**

- [ ] Titre correct (Château Margaux)
- [ ] Image placeholder affichée
- [ ] Prix affiché
- [ ] Bouton "Voir les cavistes" visible
- [ ] Slug dans URL (pas juste l'ID)

**Résultat :** ✅ / ❌

---

### Test 1.5 : Liste des Cavistes

**URL :** http://localhost:3000/cavistes

**À vérifier :**

- [ ] Tous les cavistes s'affichent
- [ ] Image placeholder caviste à droite
- [ ] Adresse visible
- [ ] Liste des vins par caviste
- [ ] Prix affichés
- [ ] Pas de quantité stock affichée (retiré)

**Résultat :** ✅ / ❌

---

### Test 1.6 : Page Caviste (Google Maps)

**URL :** http://localhost:3000/cavistes/vinotheque-de-la-vigne-4

**À vérifier :**

- [ ] Image caviste (192x192) à droite du titre
- [ ] Google Maps visible (carte interactive)
- [ ] Lien "Obtenir l'itinéraire" fonctionne
- [ ] Box "Favoris" visible (si connecté)
- [ ] Box "Informations" avec téléphone, email, etc.
- [ ] Liste vins disponibles sous la carte
- [ ] Scroll restoration fonctionne (retour arrière)

**Résultat :** ✅ / ❌

**Note Google Maps :**

- Si "For development purposes only" → Normal (pas de facturation)
- Si erreur RefererNotAllowedMapError → Vérifier restrictions domaine

---

## 🔐 PARTIE 2 : Authentification

### Test 2.1 : Création Compte Client

**URL :** http://localhost:3000/signup

**Actions :**

1. Email : `test-client@example.com`
2. Mot de passe court (ex: "12345") → Vérifier bouton grisé
3. Mot de passe valide : "password123"
4. Confirmer mot de passe
5. Nom : "Test"
6. Prénom : "Client"
7. Téléphone : "0612345678"
8. Soumettre

**À vérifier :**

- [ ] Bouton grisé si MDP invalide
- [ ] Message d'erreur explicite si erreur
- [ ] Redirection après signup
- [ ] Session créée (navbar affiche "Mon compte")

**Résultat :** ✅ / ❌

---

### Test 2.2 : Connexion Client

**URL :** http://localhost:3000/login

**Actions :**

1. Email : compte existant
2. Mot de passe : correct
3. Se connecter

**À vérifier :**

- [ ] Redirection vers page précédente (ou dashboard)
- [ ] Navbar affiche "Mon compte" + panier
- [ ] Session persistante (F5 → toujours connecté)

**Résultat :** ✅ / ❌

---

### Test 2.3 : Connexion Caviste

**URL :** http://localhost:3000/login

**Actions :**

1. Email : caviste existant
2. Mot de passe : correct
3. Se connecter

**À vérifier :**

- [ ] Redirection vers dashboard caviste
- [ ] "Mes cavistes favoris" CACHÉ dans dropdown
- [ ] Dashboard affiche commandes

**Résultat :** ✅ / ❌

---

## 🛒 PARTIE 3 : Client - Panier & Commandes

### Test 3.1 : Ajouter au Panier (Non Connecté)

**URL :** http://localhost:3000/vins/[slug]

**Actions :**

1. Cliquer "Voir les cavistes"
2. Cliquer "Ajouter au panier" (sans être connecté)

**À vérifier :**

- [ ] Popup "Connexion requise" s'affiche
- [ ] Bouton "Se connecter"
- [ ] Bouton "Créer un compte"
- [ ] Croix (X) pour fermer

**Résultat :** ✅ / ❌

---

### Test 3.2 : Ajouter au Panier (Connecté)

**URL :** http://localhost:3000/vins/[slug]

**Actions :**

1. Se connecter comme client
2. Cliquer "Voir les cavistes"
3. Sélectionner un caviste
4. Modifier quantité (ex: 3)
5. Cliquer "Ajouter au panier"

**À vérifier :**

- [ ] Sélecteur quantité fonctionne (-/+)
- [ ] Stock disponible affiché (ex: "12 disponibles")
- [ ] Message "Ajouté au panier !" (popup verte en bas à droite)
- [ ] Compteur panier navbar s'incrémente
- [ ] Lien "Voir mon panier" apparaît

**Résultat :** ✅ / ❌

---

### Test 3.3 : Validation Stock (Dépassement)

**URL :** http://localhost:3000/vins/[slug]

**Actions :**

1. Trouver un vin avec stock limité (ex: 2 disponibles)
2. Essayer d'ajouter quantité > stock (ex: 5)
3. Cliquer "Ajouter au panier"

**À vérifier :**

- [ ] Message erreur s'affiche
- [ ] Format : "Stock insuffisant. Seulement X bouteille(s) disponible(s)."
- [ ] Panier non modifié
- [ ] Sélecteur limité au stock max

**Résultat :** ✅ / ❌

---

### Test 3.4 : Panier - Modification Quantité

**URL :** http://localhost:3000/cart

**À vérifier :**

- [ ] Articles groupés par caviste
- [ ] Image placeholder vin (à gauche)
- [ ] Image placeholder caviste (à droite du nom caviste)
- [ ] Sélecteur quantité fonctionne
- [ ] "X bouteille(s)" (pas "vin(s)")
- [ ] Bouton supprimer (poubelle) fonctionne
- [ ] Total affiché

**Résultat :** ✅ / ❌

---

### Test 3.5 : Validation Commande

**URL :** http://localhost:3000/cart

**Actions :**

1. Cliquer "Valider ma commande"
2. Attendre traitement

**À vérifier :**

- [ ] Loading affiché pendant traitement
- [ ] CSRF token valide (pas d'erreur 403)
- [ ] Redirection vers `/order-confirmation`
- [ ] Panier vidé
- [ ] Message confirmation affiché

**Résultat :** ✅ / ❌

**Note :** Si erreur CSRF → Vérifier que le cookie est envoyé (`credentials: 'include'`)

---

### Test 3.6 : Dashboard Client - Mes Commandes

**URL :** http://localhost:3000/dashboard

**À vérifier :**

- [ ] Cartes statut (en attente, validée, annulée)
- [ ] Liste commandes affichée
- [ ] Tri par statut fonctionne
- [ ] Recherche vin fonctionne
- [ ] Nom caviste cliquable (lien vers page caviste)

**Résultat :** ✅ / ❌

---

### Test 3.7 : Favoris - Ajouter Caviste

**URL :** http://localhost:3000/cavistes/[slug]

**Actions :**

1. Cliquer sur bouton "Ajouter aux favoris"
2. Attendre

**À vérifier :**

- [ ] Bouton change en "Retirer des favoris"
- [ ] Couleur passe de gris à rose
- [ ] Cœur se remplit
- [ ] Page se rafraîchit
- [ ] État persiste (F5 → toujours en favoris)

**Résultat :** ✅ / ❌

---

### Test 3.8 : Mes Cavistes Favoris

**URL :** http://localhost:3000/favoris

**À vérifier :**

- [ ] Liste favoris affichée
- [ ] Toutes infos caviste visibles
- [ ] Bouton "Retirer" fonctionne
- [ ] Lien vers page caviste fonctionne
- [ ] Image placeholder caviste

**Résultat :** ✅ / ❌

---

## 👔 PARTIE 4 : Caviste - Gestion Commandes

### Test 4.1 : Dashboard Caviste - Vue d'Ensemble

**URL :** http://localhost:3000/dashboard (connecté caviste)

**À vérifier :**

- [ ] Cartes statut (en attente, validée, annulée)
- [ ] Compteurs corrects
- [ ] Liste commandes son caviste uniquement
- [ ] Filtres statut fonctionnent
- [ ] Recherche vin fonctionne

**Résultat :** ✅ / ❌

---

### Test 4.2 : Détails Commande Client

**Tableau commandes**

**À vérifier :**

- [ ] Nom client (colonne séparée)
- [ ] Prénom client (colonne séparée)
- [ ] Email client
- [ ] Téléphone client (colonne dédiée)
- [ ] Vin commandé
- [ ] Date commande
- [ ] Statut (badge coloré)

**Résultat :** ✅ / ❌

---

### Test 4.3 : Changer Statut Commande

**Actions :**

1. Sélectionner une commande "en attente"
2. Cliquer bouton "Valider"

**À vérifier :**

- [ ] Statut change en "confirmée"
- [ ] Badge devient vert
- [ ] Compteurs mis à jour
- [ ] Persistance (F5)

**Actions :**

1. Sélectionner une commande
2. Cliquer "Annuler"

**À vérifier :**

- [ ] Statut change en "annulée"
- [ ] Badge devient gris
- [ ] Compteurs mis à jour

**Résultat :** ✅ / ❌

---

### Test 4.4 : Caviste Ne Peut PAS Commander

**URL :** http://localhost:3000/vins/[slug] (connecté caviste)

**À vérifier :**

- [ ] Bouton "Voir les cavistes" visible
- [ ] Clic → Modal s'ouvre
- [ ] **AUCUN** bouton "Ajouter au panier"
- [ ] Caviste peut voir mais pas commander

**Résultat :** ✅ / ❌

---

## 🔍 PARTIE 5 : SEO & Performance

### Test 5.1 : URLs SEO-Friendly

**À vérifier :**

- [ ] Vins : `/vins/nom-domaine-annee-couleur-id`
- [ ] Cavistes : `/cavistes/nom-caviste-id`
- [ ] Pas de URLs avec uniquement `/vins/123`
- [ ] Redirections 301 si ancien format

**Exemples à tester :**

```
✅ /vins/chateau-margaux-chateau-margaux-2018-rouge-10
❌ /vins/10 (devrait rediriger vers slug)
✅ /cavistes/vinotheque-de-la-vigne-4
❌ /cavistes/4 (devrait rediriger vers slug)
```

**Résultat :** ✅ / ❌

---

### Test 5.2 : Images Placeholders

**À vérifier :**

- [ ] Vins : Design #14 (Creative) avec couleurs adaptées
- [ ] Rouge : palette rouge/bordeaux
- [ ] Blanc : palette jaune/or
- [ ] Rosé : palette rose (pas trop orange)
- [ ] Cavistes : Placeholder dégradé + initiales
- [ ] Pas de "broken image" (404)

**Résultat :** ✅ / ❌

---

### Test 5.3 : Scroll Restoration

**Actions :**

1. Aller sur `/cavistes`
2. Scroller vers le bas (caviste 10+)
3. Cliquer sur un caviste
4. Cliquer "Retour arrière"

**À vérifier :**

- [ ] Position scroll restaurée
- [ ] Caviste cliqué toujours visible
- [ ] Pas de scroll vers le haut

**Note :** Ne fonctionne PAS sur homepage (exclu)

**Résultat :** ✅ / ❌

---

### Test 5.4 : Performance (Chrome DevTools)

**URL :** Tester plusieurs pages

**Lighthouse Audit (F12 → Lighthouse) :**

- [ ] Performance > 70
- [ ] Accessibility > 90
- [ ] Best Practices > 80
- [ ] SEO > 90

**Network Tab :**

- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Total page size < 2MB

**Résultat :** ✅ / ❌

---

## 🔒 PARTIE 6 : Sécurité

### Test 6.1 : CSRF Protection

**À tester :**

1. Ouvrir DevTools (F12) → Network
2. Ajouter un article au panier
3. Valider commande
4. Vérifier requête POST `/api/reservation`

**À vérifier :**

- [ ] Cookie `_csrf` envoyé
- [ ] Header ou body contient token CSRF
- [ ] Pas d'erreur 403 "Invalid CSRF token"

**Résultat :** ✅ / ❌

---

### Test 6.2 : Protection Routes

**URLs à tester (sans connexion) :**

```
/dashboard → Devrait rediriger vers /login
/cart → Accessible (même non connecté)
/favoris → Devrait rediriger vers /login
```

**À vérifier :**

- [ ] Routes protégées redirigent
- [ ] Routes publiques accessibles
- [ ] Redirect après login fonctionne

**Résultat :** ✅ / ❌

---

### Test 6.3 : Validation Stock Serveur

**Actions :**

1. Ajouter 2 bouteilles au panier (stock = 5)
2. **DANS SUPABASE** : Modifier stock → 1
3. Valider commande

**À vérifier :**

- [ ] Erreur retournée
- [ ] Message : "Stock insuffisant. Seulement 1 bouteille disponible."
- [ ] Commande non créée
- [ ] Panier non vidé

**Résultat :** ✅ / ❌

---

## 🐛 PARTIE 7 : Bugs Connus

### Bug 7.1 : Point Final Recherche

**URL :** Navbar recherche

**Action :**

- Chercher "margaux 2018"

**À vérifier :**

- [ ] Année affichée : "2018" (pas "2018.")
- [ ] Format : "(Domaine) • 2018"

**Résultat :** ✅ / ❌
**Fix :** CTE dans `/api/search/route.ts`

---

### Bug 7.2 : Scroll Cavistes

**À vérifier :**

- [ ] `/cavistes` → `/cavistes/[slug]` → Retour : scroll OK
- [ ] Autres pages : scroll normal (pas de restoration)

**Résultat :** ✅ / ❌

---

### Bug 7.3 : Dashboard Nom/Prénom

**URL :** http://localhost:3000/dashboard (caviste)

**À vérifier :**

- [ ] Colonnes "Nom" et "Prénom" séparées
- [ ] Colonne "Téléphone" visible
- [ ] Pas d'erreur "User.nom does not exist"

**Résultat :** ✅ / ❌
**Note :** Migration `MIGRATION_USER_INFO.sql` doit être appliquée

---

## 📊 RAPPORT FINAL

### Résumé par Catégorie

| Catégorie           | Tests  | Réussis | Échoués | Taux    |
| ------------------- | ------ | ------- | ------- | ------- |
| Pages Publiques     | 6      | \_      | \_      | \_%     |
| Authentification    | 3      | \_      | \_      | \_%     |
| Client (Panier)     | 8      | \_      | \_      | \_%     |
| Caviste (Dashboard) | 4      | \_      | \_      | \_%     |
| SEO & Performance   | 4      | \_      | \_      | \_%     |
| Sécurité            | 3      | \_      | \_      | \_%     |
| Bugs Connus         | 3      | \_      | \_      | \_%     |
| **TOTAL**           | **31** | **\_**  | **\_**  | **\_%** |

---

### 🔴 Problèmes Critiques (Bloquants)

_À compléter après tests_

---

### 🟡 Problèmes Mineurs (Non Bloquants)

_À compléter après tests_

---

### ✅ Points Forts

_À compléter après tests_

---

## 🎯 Actions Prioritaires

Selon résultats tests :

### Si tout fonctionne (> 90% réussis) :

✅ **Passer aux améliorations** (toasts, loading, index DB)

### Si bugs critiques (< 70% réussis) :

❌ **Fixer bugs d'abord** avant d'ajouter features

### Liste des Bugs à Fixer

1. _À compléter_
2. _À compléter_
3. _À compléter_

---

## 📝 Notes de Test

### Environnement

- OS : macOS
- Navigateur : Chrome (version)
- Node : v20+
- Base de données : Supabase (Postgres)

### Données de Test

- Client : `test-client@example.com`
- Caviste : Compte existant
- Vins : Catalogue complet (133 vins)
- Cavistes : 24 cavistes

---

**Commencer les tests maintenant ! ⏱️**

**Temps estimé : 45-60 minutes**
