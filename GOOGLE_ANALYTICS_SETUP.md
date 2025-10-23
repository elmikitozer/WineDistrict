# 📊 Configuration Google Analytics 4 (GA4)

Guide rapide pour activer Google Analytics sur Wine District.

---

## 🚀 Étape 1 : Créer un compte Google Analytics

1. Aller sur https://analytics.google.com/
2. Cliquer sur **"Commencer la mesure"**
3. Créer un compte Google Analytics :
   - Nom du compte : `Wine District`
   - Paramètres de partage de données : au choix

4. Créer une propriété :
   - Nom de la propriété : `Wine District - Production`
   - Fuseau horaire : **France (GMT+1)**
   - Devise : **EUR (€)**

5. Informations sur l'entreprise :
   - Secteur : **Commerce de détail**
   - Taille : selon votre cas
   - Utilisation : **Mesurer l'engagement des utilisateurs**

6. Cliquer sur **"Créer"** et accepter les conditions

---

## 🔑 Étape 2 : Obtenir l'ID de mesure

1. Dans GA4, aller dans **Admin** (roue crantée en bas à gauche)
2. Dans la colonne **Propriété**, cliquer sur **Flux de données**
3. Cliquer sur **Ajouter un flux** → **Web**
4. Configurer le flux :
   - URL du site web : `https://wine-district.vercel.app`
   - Nom du flux : `Wine District Web`
5. Cliquer sur **Créer un flux**

6. **Copier l'ID de mesure** (format : `G-XXXXXXXXXX`)

---

## ⚙️ Étape 3 : Configurer dans le projet

### En local (.env.local)

Créer ou modifier `.env.local` :

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Sur Vercel (Production)

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet Wine District
3. Aller dans **Settings** → **Environment Variables**
4. Ajouter :
   - **Name** : `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value** : `G-XXXXXXXXXX` (votre ID de mesure)
   - **Environments** : ✅ Production ✅ Preview ✅ Development
5. Cliquer sur **Save**
6. **Redéployer** le projet pour appliquer la variable

---

## ✅ Étape 4 : Vérifier que ça fonctionne

### Test en local

1. Lancer le serveur :
   ```bash
   npm run dev
   ```

2. Ouvrir le site : http://localhost:3000

3. Ouvrir les DevTools (F12) → **Console**

4. Vérifier qu'il n'y a pas d'erreur liée à `gtag`

5. Aller dans **Network** → Filtrer par `google-analytics`
   - Vous devriez voir des requêtes vers `www.google-analytics.com`

### Test en production

1. Après déploiement, aller sur le site en production

2. Dans Google Analytics :
   - Aller dans **Rapports** → **Temps réel**
   - Vous devriez voir votre visite en direct

3. Si ça marche, vous verrez :
   - **1 utilisateur actif** (vous)
   - La page que vous visitez
   - Votre localisation

---

## 📈 Événements trackés automatiquement

Google Analytics 4 track automatiquement :

- ✅ **Page views** (vues de pages)
- ✅ **Session starts** (début de sessions)
- ✅ **First visit** (première visite)
- ✅ **Scroll** (défilement de page)
- ✅ **Outbound clicks** (clics externes)
- ✅ **File downloads** (téléchargements)
- ✅ **Video engagement** (si vous ajoutez des vidéos)

---

## 🎯 Événements personnalisés (optionnel)

Vous pouvez tracker des événements spécifiques comme :

### Exemple 1 : Track ajout au panier

```typescript
// Dans components/CavistesModal.tsx
import { useEffect } from 'react';

function trackAddToCart(vinNom: string, price: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: 'EUR',
      value: price,
      items: [
        {
          item_name: vinNom,
          quantity: 1,
        },
      ],
    });
  }
}

// Utiliser dans le onClick :
onClick={() => {
  cart.addItem({...});
  trackAddToCart(vin.nom, vin.prix);
}}
```

### Exemple 2 : Track réservation

```typescript
function trackPurchase(orderId: string, total: number, items: any[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      currency: 'EUR',
      value: total,
      items: items.map((item) => ({
        item_name: item.vinNom,
        price: item.prix,
        quantity: item.quantity,
      })),
    });
  }
}
```

---

## 🔧 Debugging

### Si GA ne fonctionne pas :

1. **Vérifier la variable d'environnement** :
   ```bash
   echo $NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

2. **Vérifier dans le HTML** :
   - View Source de la page
   - Chercher `gtag` ou votre ID `G-XXXXXXXXXX`

3. **Vérifier dans la console** :
   ```javascript
   window.dataLayer
   // Doit afficher un array
   ```

4. **Extensions bloquantes** :
   - uBlock Origin, AdBlock, Ghostery peuvent bloquer GA
   - Tester en navigation privée

5. **Cache** :
   - Vider le cache du navigateur
   - Hard reload (Ctrl+Shift+R)

---

## 📊 Rapports utiles dans GA4

Une fois configuré, voici les rapports les plus utiles :

1. **Temps réel** : Voir les visiteurs en ce moment
2. **Acquisition** : D'où viennent vos visiteurs (Google, direct, social, etc.)
3. **Engagement** : Quelles pages sont les plus visitées
4. **Conversions** : Combien de réservations (si configuré)

---

## 🎁 Bonus : Google Tag Manager (optionnel)

Pour une gestion plus avancée, vous pouvez utiliser **Google Tag Manager** :

1. Créer un compte GTM
2. Installer le snippet GTM au lieu de GA
3. Gérer tous vos tags (GA, Facebook Pixel, etc.) depuis GTM

---

## ✅ Checklist finale

- [ ] Compte GA4 créé
- [ ] ID de mesure copié
- [ ] Variable d'environnement ajoutée (local + Vercel)
- [ ] Site redéployé
- [ ] Visite test en temps réel visible dans GA4
- [ ] Aucune erreur dans la console

---

**Configuration terminée ! 🎉**

Vous pouvez maintenant analyser le trafic de Wine District et optimiser l'expérience utilisateur.

---

**Dernière mise à jour :** 23 Octobre 2025

