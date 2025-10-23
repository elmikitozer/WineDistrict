# 🔌 Guide d'Intégration - SumUp & POS Pro

Ce guide explique comment connecter les systèmes de caisse SumUp et POS Pro pour synchroniser automatiquement les stocks.

---

## 📋 Vue d'ensemble

L'architecture d'intégration permet de :
- ✅ **Connecter** SumUp ou POS Pro via OAuth
- ✅ **Mapper** les produits externes vers les vins de la base de données
- ✅ **Synchroniser** le stock automatiquement (manuel ou temps réel)
- ✅ **Recevoir** les webhooks pour les updates en temps réel

---

## 🗄️ Architecture Base de Données

### Table `IntegrationConnection`
Stocke les connexions OAuth aux services externes.

```sql
CREATE TABLE "IntegrationConnection" (
  id           TEXT PRIMARY KEY,
  cavisteId    INT NOT NULL,
  provider     TEXT NOT NULL,  -- 'sumup' ou 'pospro'
  accessToken  TEXT NOT NULL,
  refreshToken TEXT,
  merchantId   TEXT,           -- ID externe du marchand/magasin
  expiresAt    TIMESTAMP,
  createdAt    TIMESTAMP DEFAULT NOW(),
  updatedAt    TIMESTAMP DEFAULT NOW()
);
```

### Table `ExternalProductMapping`
Associe les produits externes (SumUp/POS Pro) aux vins de la DB.

```sql
CREATE TABLE "ExternalProductMapping" (
  id                TEXT PRIMARY KEY,
  cavisteId         INT NOT NULL,
  vinId             INT NOT NULL,
  provider          TEXT NOT NULL,      -- 'sumup' ou 'pospro'
  externalProductId TEXT NOT NULL,      -- ID du produit dans le système externe
  externalSku       TEXT,
  lastSeenAt        TIMESTAMP,
  createdAt         TIMESTAMP DEFAULT NOW(),
  updatedAt         TIMESTAMP DEFAULT NOW(),

  UNIQUE(provider, cavisteId, externalProductId)
);
```

---

## 🔐 1. Connexion OAuth

### SumUp

**Étape 1 : Obtenir les credentials**
1. Créer une app sur https://developer.sumup.com
2. Noter `client_id` et `client_secret`
3. Configurer `redirect_uri` : `https://votre-domaine.com/api/integrations/sumup/callback`

**Étape 2 : Configurer les variables d'environnement**
```env
SUMUP_CLIENT_ID=your_client_id
SUMUP_CLIENT_SECRET=your_client_secret
SUMUP_REDIRECT_URI=https://votre-domaine.com/api/integrations/sumup/callback
SUMUP_WEBHOOK_SECRET=your_webhook_secret
```

**Étape 3 : Connecter depuis le dashboard caviste**
```typescript
// L'utilisateur clique sur "Connecter SumUp"
// → Redirige vers /api/integrations/sumup/connect?cavisteId=1
// → SumUp OAuth flow
// → Callback enregistre les tokens dans IntegrationConnection
```

### POS Pro

**Étape 1 : Obtenir la clé API**
1. Se connecter à POS Pro
2. Aller dans Settings → API
3. Générer une clé API

**Étape 2 : Configurer**
```env
POSPRO_WEBHOOK_SECRET=your_webhook_secret
```

**Étape 3 : Enregistrer manuellement**
Via le dashboard caviste, saisir :
- API Key
- Store ID

---

## 🔄 2. Synchronisation du Stock

### Synchronisation Manuelle

**Déclencher une sync complète :**
```bash
POST /api/integrations/sync
Content-Type: application/json

{
  "cavisteId": 1,
  "provider": "sumup"  // ou "pospro"
}
```

**Réponse :**
```json
{
  "success": true,
  "productsUpdated": 42,
  "errors": [],
  "timestamp": "2025-10-23T10:30:00Z"
}
```

### Synchronisation Automatique (Webhooks)

**Configurer les webhooks :**

**SumUp :**
- URL : `https://votre-domaine.com/api/webhooks/sumup`
- Events : `transaction.created`, `product.updated`

**POS Pro :**
- URL : `https://votre-domaine.com/api/webhooks/pospro`
- Events : `sale.completed`, `inventory.updated`

---

## 🔗 3. Mapping Produits

### Mapper un produit externe → Vin

Avant de pouvoir synchroniser, il faut associer les produits externes aux vins :

```typescript
import { mapSumUpProductToVin } from '@/lib/integrations/sumup-sync';

await mapSumUpProductToVin(
  1,                    // cavisteId
  42,                   // vinId dans notre DB
  'sumup_product_123',  // ID produit dans SumUp
  'SKU-12345'           // Optionnel: SKU/code-barres
);
```

### Interface UI (à implémenter)

Dans le dashboard caviste, afficher :
1. **Liste des produits non mappés** depuis SumUp/POS Pro
2. **Recherche** pour trouver le vin correspondant
3. **Bouton "Associer"** pour créer le mapping

---

## 📊 4. Flux de Données

### Flux Complet

```
┌─────────────────┐
│   SumUp / POS   │
│      Pro        │
└────────┬────────┘
         │
         │ 1. Vente effectuée
         │
         ↓
┌─────────────────┐
│    Webhook      │ ← POST /api/webhooks/sumup
│  (temps réel)   │
└────────┬────────┘
         │
         │ 2. Déclenche sync
         │
         ↓
┌─────────────────┐
│  Service Sync   │ ← lib/integrations/sumup-sync.ts
│                 │
└────────┬────────┘
         │
         │ 3. Récupère produits
         │ 4. Trouve mappings
         │ 5. Met à jour stocks
         │
         ↓
┌─────────────────┐
│  Base Données   │
│   (Stock DB)    │
└─────────────────┘
```

---

## 🧪 5. Tests

### Tester la connexion

```bash
# Vérifier que l'intégration est connectée
GET /api/integrations/status?cavisteId=1&provider=sumup
```

### Tester la synchronisation

```bash
# Sync manuelle
POST /api/integrations/sync
{
  "cavisteId": 1,
  "provider": "sumup"
}
```

### Tester les webhooks (en local)

Utiliser ngrok ou localtunnel :
```bash
ngrok http 3000
# Utiliser l'URL ngrok comme webhook URL
```

---

## 🔧 6. TODO pour Mise en Production

### SumUp
- [ ] Implémenter l'API produits (si disponible via partenariat)
- [ ] Implémenter la vérification de signature webhook (HMAC-SHA256)
- [ ] Gérer le refresh automatique des tokens OAuth
- [ ] Logger les syncs dans une table d'audit

### POS Pro
- [ ] Confirmer les endpoints API réels
- [ ] Implémenter la vérification de signature webhook
- [ ] Tester avec un compte POS Pro réel
- [ ] Gérer les erreurs API (retry, backoff)

### Général
- [ ] Ajouter UI dashboard caviste pour :
  - [ ] Voir le statut de la connexion
  - [ ] Déclencher une sync manuelle
  - [ ] Mapper les produits
  - [ ] Voir l'historique des syncs
- [ ] Ajouter monitoring (Sentry pour erreurs)
- [ ] Ajouter rate limiting sur les APIs
- [ ] Documenter les API endpoints (Swagger/OpenAPI)

---

## 📞 Support

En cas de problème :
1. Vérifier les logs serveur
2. Vérifier que les tokens ne sont pas expirés
3. Vérifier que les webhooks sont bien configurés
4. Contacter le support SumUp/POS Pro si problème API

---

**Dernière mise à jour :** 23 Octobre 2025

