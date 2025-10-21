# 📋 TODO pour Demain - Wine District

**Date :** Mercredi 22 Octobre 2025  
**Session précédente :** Redesign page caviste + Google Maps + Protection clé API

---

## 🔥 PRIORITÉ 1 : Configuration Google Maps (15 min)

### ✅ Checklist Configuration

- [ ] **Aller sur Google Cloud Console** : https://console.cloud.google.com/apis/credentials
- [ ] **Cliquer sur ta clé "Clé Maps"**
- [ ] **Restrictions d'application** :
  - [ ] Sélectionner **"Sites Web"**
  - [ ] Ajouter `localhost:3000/*`
  - [ ] Ajouter `https://*.vercel.app/*`
- [ ] **Restrictions d'API** :
  - [ ] Sélectionner **"Restreindre la clé"**
  - [ ] Cocher **UNIQUEMENT** "Maps Embed API"
- [ ] **ENREGISTRER**
- [ ] **Attendre 2-3 minutes**
- [ ] **Tester** : http://localhost:3000/cavistes/vinotheque-de-la-vigne-4

### 📚 Docs de Référence
- Guide complet : `docs/SETUP_GOOGLE_MAPS.md`
- Guide rapide : `docs/QUICKSTART_GOOGLE_MAPS.md`
- Sécurité : `docs/PROTEGER_CLE_GOOGLE_MAPS.md`

---

## 🎨 PRIORITÉ 2 : Améliorations UX Rapides (30 min)

### 1. Remplacer `alert()` par des Toasts (15 min)

```bash
npm install react-hot-toast
```

**Fichiers à modifier :**
1. `app/layout.tsx` - Ajouter `<Toaster />`
2. `components/FavoriteButton.tsx` - Remplacer `alert()` par `toast`
3. `components/CavistesModal.tsx` - Idem

**Exemple :**
```typescript
import toast from 'react-hot-toast';

// Au lieu de
alert('Ajouté aux favoris !');

// Utiliser
toast.success('Ajouté aux favoris !');
```

### 2. Créer un Composant Loading (15 min)

**Nouveau fichier :** `components/LoadingSpinner.tsx`

```typescript
export default function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-gray-200 border-t-rose-600`} 
      />
    </div>
  );
}
```

**Utiliser dans :**
- `app/dashboard/page.tsx`
- `app/cavistes/page.tsx`
- `app/vins/page.tsx`

---

## 🗄️ PRIORITÉ 3 : Optimisation Base de Données (20 min)

### Ajouter des Index pour Performance

**Fichier :** `prisma/schema.prisma`

```prisma
model Reservation {
  // ... champs existants

  @@index([cavisteId])
  @@index([userId])
  @@index([status])
  @@index([date])
}

model Stock {
  // ... champs existants

  @@index([vinId])
  @@index([cavisteId])
}

model FavorisCaviste {
  // ... champs existants

  @@index([userId])
  @@index([cavisteId])
}
```

**Migration :**
```bash
npx prisma migrate dev --name add_indexes
```

**Appliquer sur Supabase :**
- Copier le SQL généré
- Aller dans Supabase SQL Editor
- Exécuter la migration

---

## 🚀 PRIORITÉ 4 : Déploiement Vercel (10 min)

### Étapes

1. **Ajouter la clé Google Maps dans Vercel**
   - Dashboard Vercel → Settings → Environment Variables
   - Name : `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value : Ta clé API
   - Environments : ✅ Production ✅ Preview ✅ Development
   - **CLIQUER "ADD"** (malgré l'avertissement)

2. **Push vers GitHub**
```bash
git push
```

3. **Vérifier le déploiement**
   - Attendre 2-3 minutes
   - Ouvrir l'URL Vercel
   - Tester une page caviste
   - Vérifier que la carte Google Maps s'affiche

### 📚 Doc : `docs/VERCEL_GOOGLE_MAPS_DEPLOY.md`

---

## 🎯 PRIORITÉ 5 : Tests Fonctionnels (15 min)

### Scénarios à Tester

#### En tant que Client :
- [ ] Créer un compte
- [ ] Chercher un vin
- [ ] Ajouter au panier
- [ ] Modifier quantité
- [ ] Valider commande
- [ ] Voir mes commandes (dashboard)
- [ ] Ajouter un caviste aux favoris
- [ ] Voir mes favoris

#### En tant que Caviste :
- [ ] Se connecter
- [ ] Voir les commandes
- [ ] Filtrer par statut
- [ ] Valider/Annuler une commande

#### Pages Publiques :
- [ ] Page d'accueil
- [ ] Liste des vins
- [ ] Page produit vin
- [ ] Liste des cavistes
- [ ] Page caviste (avec Google Maps)

---

## 🐛 BUGS CONNUS À VÉRIFIER

### 1. Scroll Restoration
- [ ] Tester navigation `/cavistes` → `/cavistes/[slug]` → Retour
- [ ] Vérifier que le scroll est restauré

### 2. Recherche par Année
- [ ] Chercher "margaux 2018"
- [ ] Vérifier que Château Margaux 2018 apparaît en premier
- [ ] Vérifier qu'il n'y a pas de point "." à la fin

### 3. Stock Validation
- [ ] Essayer d'ajouter plus que le stock disponible
- [ ] Vérifier le message d'erreur

---

## 💡 IDÉES POUR PLUS TARD (Optionnel)

### Features à Implémenter
1. **Notifications Email** (SendGrid/Resend)
   - Confirmation de commande
   - Notification caviste
   
2. **Page Profil Utilisateur**
   - Modifier nom, prénom, téléphone
   - Changer mot de passe
   
3. **Filtres Avancés**
   - Prix min/max
   - Couleur
   - Région
   - Note/Évaluation
   
4. **Système de Notation**
   - Noter les vins
   - Noter les cavistes
   - Afficher moyenne
   
5. **Historique des Commandes**
   - Voir détails commande
   - Télécharger facture PDF
   - Récommander en un clic

6. **Dashboard Caviste Avancé**
   - Statistiques ventes
   - Graphiques
   - Export Excel/CSV
   - Gestion stock (ajout/retrait)

---

## 🔧 AMÉLIORATIONS TECHNIQUES (Optionnel)

Voir le fichier `AMELIORATIONS_CODE.md` pour :
- Système de logging
- Gestion d'erreur globale
- Tests E2E avec Playwright
- Optimisation images
- Validation variables d'env

---

## 📚 DOCUMENTATION À JOUR

Tous les guides sont dans `docs/` :
- ✅ Google Maps : Setup, Quickstart, Protection, Vercel
- ✅ Images : Solutions, Upload, Placeholders
- ✅ SEO : Slugs, Migration
- ✅ Base de données : Migrations, UUID vs SERIAL

---

## ⏱️ TEMPS ESTIMÉ TOTAL : ~90 min

| Priorité | Tâche | Temps |
|----------|-------|-------|
| 1 | Google Maps Config | 15 min |
| 2 | Toasts + Loading | 30 min |
| 3 | Index DB | 20 min |
| 4 | Déploiement Vercel | 10 min |
| 5 | Tests Fonctionnels | 15 min |

**Pause recommandée après chaque priorité ! ☕**

---

## 🎯 OBJECTIF DE LA SESSION

À la fin de demain, tu devrais avoir :
- ✅ Google Maps fonctionnel (local + Vercel)
- ✅ UX améliorée (toasts + loading)
- ✅ DB optimisée (index)
- ✅ Site déployé en production
- ✅ Tests complets effectués

**Le MVP sera alors prêt à montrer ! 🚀**

---

## 📞 AIDE

Si blocage :
1. Vérifier `docs/README.md` pour trouver le bon guide
2. Chercher dans `AMELIORATIONS_CODE.md`
3. Vérifier les commits récents : `git log --oneline -10`

**Bon courage pour demain ! 💪✨**

