# 🔌 PHASE 2 : Intégrations API - Explication Détaillée

**Important** : Cette intégration concerne **uniquement la synchronisation du stock** depuis SumUp/POS Pro vers Wine District. Les paiements ne sont PAS concernés.

---

## 📖 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Comment ça fonctionne](#comment-ça-fonctionne)
3. [Les composants créés](#les-composants-créés)
4. [Flux de données détaillé](#flux-de-données-détaillé)
5. [Configuration étape par étape](#configuration-étape-par-étape)
6. [Questions fréquentes](#questions-fréquentes)

---

## 🎯 Vue d'ensemble

### Problème résolu

**Avant** :

- Le caviste doit **manuellement** entrer le stock de chaque vin dans Wine District
- Quand il vend un vin via SumUp/POS Pro, il doit **manuellement** mettre à jour le stock sur Wine District
- **Risque** : stock affiché incorrectement → clients réservent des vins qui ne sont plus disponibles

**Après** :

- Le stock se **synchronise automatiquement** de SumUp/POS Pro → Wine District
- Quand le caviste vend un vin, le stock se **met à jour tout seul** sur Wine District
- **Résultat** : stock toujours à jour, pas de double saisie

---

## 🔄 Comment ça fonctionne

### Étape 1 : Connexion initiale

```
Caviste (Dashboard)
    |
    | 1. Clique "Connecter SumUp"
    |
    ↓
SumUp OAuth
    |
    | 2. Caviste autorise Wine District
    |
    ↓
Wine District récupère un ACCESS_TOKEN
    |
    | 3. Token stocké dans DB (table IntegrationConnection)
    |
    ✅ Connexion établie
```

**Code concerné** :

- `/api/integrations/sumup/connect` : Démarre OAuth
- `/api/integrations/sumup/callback` : Reçoit le token
- Table `IntegrationConnection` : Stocke le token

---

### Étape 2 : Mapping des produits

**Pourquoi ?**

- Dans SumUp/POS Pro, un vin s'appelle peut-être "Margaux 2018" avec l'ID `sumup_abc123`
- Dans Wine District, le même vin a l'ID `42`
- Il faut **associer** `sumup_abc123` ↔️ `vin_42`

**Comment ?**

Via le dashboard caviste (`/dashboard/caviste/integrations`) :

```
Le caviste voit :

┌────────────────────────────────────────┐
│  Produits SumUp non mappés :          │
│                                        │
│  • Margaux 2018 (ID: sumup_abc123)    │
│    [Rechercher le vin...]  [Associer] │
│                                        │
│  • Pomerol 2020 (ID: sumup_def456)    │
│    [Rechercher le vin...]  [Associer] │
└────────────────────────────────────────┘
```

1. Le caviste cherche "Margaux 2018" dans la liste des vins Wine District
2. Clique sur "Associer"
3. Le système enregistre dans `ExternalProductMapping` :
   ```sql
   provider: 'sumup'
   externalProductId: 'sumup_abc123'
   vinId: 42
   ```

**Code concerné** :

- `lib/integrations/sumup-sync.ts` : Fonction `mapSumUpProductToVin()`
- Table `ExternalProductMapping` : Stocke les associations

---

### Étape 3 : Synchronisation du stock

#### Option A : Manuelle (bouton)

```
Caviste (Dashboard)
    |
    | 1. Clique "🔄 Synchroniser maintenant"
    |
    ↓
POST /api/integrations/sync
    |
    | 2. Récupère ACCESS_TOKEN depuis DB
    |
    ↓
Appel API SumUp
    |
    | 3. GET https://api.sumup.com/v1/me/products
    |    (liste de TOUS les produits + stocks)
    |
    ↓
Pour chaque produit :
    |
    | 4. Cherche mapping dans ExternalProductMapping
    |
    ↓
Si mappé :
    |
    | 5. Met à jour stock dans table Stock
    |    vinId: 42
    |    quantité: 10 (depuis SumUp)
    |
    ✅ Stock synchronisé
```

**Code concerné** :

- `/api/integrations/sync` : Route pour déclencher la sync
- `lib/integrations/sumup-sync.ts` : Fonction `syncSumUpStock()`

---

#### Option B : Automatique (webhook)

**Qu'est-ce qu'un webhook ?**

Un webhook, c'est comme une notification que SumUp envoie à Wine District quand quelque chose change.

```

Vente dans SumUp
    |
    | 1. Client achète Margaux 2018
    |    Stock: 10 → 9
    |
    ↓
SumUp envoie un webhook
    |
    | 2. POST https://wine-district.vercel.app/api/webhooks/sumup
    |    Body: {
    |      event: "transaction.created",
    |      product_id: "sumup_abc123"
    |    }
    |
    ↓
Wine District reçoit le webhook
    |
    | 3. Trouve mapping: sumup_abc123 → vin_42
    |
    ↓
Wine District met à jour le stock
    |
    | 4. UPDATE Stock
    |    SET quantité = 9
    |    WHERE vinId = 42
    |
    ✅ Stock mis à jour en temps réel
```

**Code concerné** :

- `/api/webhooks/sumup` : Reçoit les notifications SumUp
- `/api/webhooks/pospro` : Reçoit les notifications POS Pro

---

## 🧩 Les composants créés

### 1. Base de Données

#### Table `IntegrationConnection`

Stocke les connexions OAuth aux services externes.

```sql
id              UUID PRIMARY KEY
cavisteId       INT (caviste concerné)
provider        TEXT ('sumup' ou 'pospro')
accessToken     TEXT (clé secrète pour appeler l'API)
refreshToken    TEXT (pour renouveler le accessToken)
merchantId      TEXT (ID du compte SumUp/POS Pro)
expiresAt       TIMESTAMP (quand le token expire)
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

**Exemple** :

```sql
INSERT INTO "IntegrationConnection" VALUES (
  'uuid-123',
  1,                    -- Caviste #1
  'sumup',
  'sumup_access_token_abc123xyz',
  'sumup_refresh_token_xyz789',
  'merchant_code_FR123',
  '2025-11-23 10:00:00',
  '2025-10-23 10:00:00',
  '2025-10-23 10:00:00'
);
```

---

#### Table `ExternalProductMapping`

Associe les produits externes (SumUp/POS Pro) aux vins de la DB.

```sql
id                UUID PRIMARY KEY
cavisteId         INT
vinId             INT (vin dans Wine District)
provider          TEXT ('sumup' ou 'pospro')
externalProductId TEXT (ID du produit dans SumUp/POS Pro)
externalSku       TEXT (code-barres optionnel)
lastSeenAt        TIMESTAMP (dernière fois vu dans une sync)
createdAt         TIMESTAMP
updatedAt         TIMESTAMP
```

**Exemple** :

```sql
INSERT INTO "ExternalProductMapping" VALUES (
  'uuid-456',
  1,                    -- Caviste #1
  42,                   -- Château Margaux 2018
  'sumup',
  'sumup_abc123',       -- ID produit SumUp
  '3760123456789',      -- Code-barres EAN13
  '2025-10-23 12:00:00',
  '2025-10-23 10:00:00',
  '2025-10-23 12:00:00'
);
```

---

### 2. Services de Synchronisation

#### `lib/integrations/sumup-sync.ts`

**Fonctions principales** :

```typescript
// 1. Synchroniser tout le stock
async function syncSumUpStock(
  cavisteId: number,
  accessToken: string,
  merchantId: string
): Promise<SumUpSyncResult>;

// 2. Créer un mapping manuel
async function mapSumUpProductToVin(cavisteId: number, vinId: number, externalProductId: string);
```

**Algorithme de synchronisation** :

```
1. Récupérer produits depuis SumUp API
2. Pour chaque produit SumUp :
   a. Chercher mapping dans ExternalProductMapping
   b. Si mappé :
      - Mettre à jour stock dans table Stock
      - Mettre à jour lastSeenAt
   c. Si non mappé :
      - Logger erreur (produit non associé)
3. Retourner résultat (nb produits sync, erreurs)
```

---

#### `lib/integrations/pospro-sync.ts`

Même logique que SumUp, mais pour POS Pro.

---

### 3. Routes API

#### `POST /api/integrations/sync`

Déclenche une synchronisation manuelle.

**Requête** :

```json
{
  "cavisteId": 1,
  "provider": "sumup"
}
```

**Réponse** :

```json
{
  "success": true,
  "productsUpdated": 42,
  "errors": [],
  "timestamp": "2025-10-23T12:00:00Z"
}
```

---

#### `POST /api/webhooks/sumup`

Reçoit les webhooks SumUp en temps réel.

**Événements gérés** :

- `transaction.created` : Une vente → Re-synchroniser le stock
- `product.updated` : Un produit modifié → Re-synchroniser

**Sécurité** : Vérifie la signature HMAC-SHA256 du webhook.

---

### 4. Interface Dashboard Caviste

#### `/dashboard/caviste/integrations`

Page pour gérer les intégrations.

**Fonctionnalités** :

- ✅ Voir le statut de connexion (connecté ou non)
- ✅ Bouton "Connecter SumUp" (démarre OAuth)
- ✅ Bouton "Synchroniser maintenant" (sync manuelle)
- ✅ Lien "Mapper les produits" (associer produits externes → vins)

---

## 🔀 Flux de Données Détaillé

### Scénario complet : Vente d'un vin

```
┌──────────────────────────────────────────────────────┐
│  1. VENTE DANS SUMUP                                 │
└──────────────────────────────────────────────────────┘
   Client achète Château Margaux 2018
   Prix : 50€
   Stock SumUp : 10 → 9

                ↓

┌──────────────────────────────────────────────────────┐
│  2. SUMUP ENVOIE UN WEBHOOK                          │
└──────────────────────────────────────────────────────┘
   POST https://wine-district.vercel.app/api/webhooks/sumup
   Headers:
     x-sumup-signature: abc123...
   Body:
     {
       "event_type": "transaction.created",
       "merchant_code": "FR123",
       "data": {
         "product_id": "sumup_abc123",
         "amount": 50.00
       }
     }

                ↓

┌──────────────────────────────────────────────────────┐
│  3. WINE DISTRICT VÉRIFIE LA SIGNATURE               │
└──────────────────────────────────────────────────────┘
   Calcule HMAC-SHA256(body, secret)
   Compare avec x-sumup-signature
   ✅ Signature valide

                ↓

┌──────────────────────────────────────────────────────┐
│  4. WINE DISTRICT TROUVE L'INTÉGRATION               │
└──────────────────────────────────────────────────────┘
   SELECT * FROM IntegrationConnection
   WHERE provider = 'sumup'
     AND merchantId = 'FR123'

   Résultat:
     cavisteId: 1
     accessToken: sumup_access_token_abc123xyz

                ↓

┌──────────────────────────────────────────────────────┐
│  5. WINE DISTRICT DÉCLENCHE UNE SYNC                 │
└──────────────────────────────────────────────────────┘
   syncSumUpStock(
     cavisteId: 1,
     accessToken: 'sumup_access_token_abc123xyz',
     merchantId: 'FR123'
   )

                ↓

┌──────────────────────────────────────────────────────┐
│  6. APPEL API SUMUP                                  │
└──────────────────────────────────────────────────────┘
   GET https://api.sumup.com/v1/me/products
   Headers:
     Authorization: Bearer sumup_access_token_abc123xyz

   Réponse:
     [
       {
         "id": "sumup_abc123",
         "name": "Château Margaux 2018",
         "price": 50.00,
         "stock_quantity": 9    ← Stock mis à jour
       },
       ...
     ]

                ↓

┌──────────────────────────────────────────────────────┐
│  7. WINE DISTRICT TROUVE LE MAPPING                  │
└──────────────────────────────────────────────────────┘
   SELECT * FROM ExternalProductMapping
   WHERE provider = 'sumup'
     AND externalProductId = 'sumup_abc123'

   Résultat:
     vinId: 42   ← Château Margaux 2018 dans Wine District

                ↓

┌──────────────────────────────────────────────────────┐
│  8. WINE DISTRICT MET À JOUR LE STOCK                │
└──────────────────────────────────────────────────────┘
   UPDATE Stock
   SET quantite = 9
   WHERE cavisteId = 1 AND vinId = 42

   ✅ Stock synchronisé : 10 → 9

                ↓

┌──────────────────────────────────────────────────────┐
│  9. CLIENT SUR WINE DISTRICT VOIT LE BON STOCK       │
└──────────────────────────────────────────────────────┘
   Page /vins/chateau-margaux-2018

   Affiche:
     "9 bouteilles disponibles chez Caviste #1"
```

**Temps total** : < 2 secondes

---

## ⚙️ Configuration Étape par Étape

### Pour SumUp

#### Étape 1 : Créer une app SumUp

1. Aller sur https://developer.sumup.com
2. Se connecter avec compte SumUp
3. Créer une nouvelle application
4. Noter `CLIENT_ID` et `CLIENT_SECRET`

#### Étape 2 : Configurer les variables d'environnement

`.env.local` (local) :

```bash
SUMUP_CLIENT_ID=your_client_id_here
SUMUP_CLIENT_SECRET=your_client_secret_here
SUMUP_REDIRECT_URI=http://localhost:3000/api/integrations/sumup/callback
SUMUP_WEBHOOK_SECRET=your_webhook_secret_here
```

Vercel (production) :

```
SUMUP_CLIENT_ID=your_client_id_here
SUMUP_CLIENT_SECRET=your_client_secret_here
SUMUP_REDIRECT_URI=https://wine-district.vercel.app/api/integrations/sumup/callback
SUMUP_WEBHOOK_SECRET=your_webhook_secret_here
```

#### Étape 3 : Connecter depuis le dashboard

1. Aller sur `/dashboard/caviste/integrations`
2. Cliquer sur "Connecter SumUp"
3. Autoriser Wine District sur SumUp
4. Redirection automatique → Token enregistré

#### Étape 4 : Mapper les produits

1. Voir la liste des produits SumUp non mappés
2. Pour chaque produit :
   - Chercher le vin correspondant dans Wine District
   - Cliquer "Associer"

#### Étape 5 : Configurer les webhooks

1. Dans SumUp dashboard, aller dans "Webhooks"
2. Ajouter une URL :
   ```
   https://wine-district.vercel.app/api/webhooks/sumup
   ```
3. Événements à cocher :
   - `transaction.created`
   - `product.updated`
4. Secret webhook : utiliser `SUMUP_WEBHOOK_SECRET`

#### Étape 6 : Tester

1. Vendre un vin via SumUp
2. Attendre 2-3 secondes
3. Vérifier sur Wine District que le stock a diminué

---

### Pour POS Pro

Même process, mais avec :

- URLs différentes
- Possiblement une clé API au lieu d'OAuth (selon leur système)

---

## ❓ Questions Fréquentes

### Q1 : Dois-je synchroniser manuellement régulièrement ?

**Non, si les webhooks sont configurés.**

Les webhooks envoient une notification à chaque vente → stock mis à jour automatiquement en temps réel.

Vous pouvez quand même faire une sync manuelle de temps en temps pour "vérifier" que tout est à jour.

---

### Q2 : Que se passe-t-il si un produit SumUp n'est pas mappé ?

Il sera **ignoré** lors de la synchronisation et une erreur sera loggée.

Vous devez **manuellement mapper** tous vos produits pour que le stock se synchronise.

---

### Q3 : Le stock se synchronise dans les deux sens ?

**Non, uniquement SumUp → Wine District.**

Wine District est un système de **réservation**, pas de vente. Les ventes se font via SumUp/POS Pro.

Le flux est :

- Vente SumUp → Stock diminue dans SumUp
- Webhook → Stock diminue dans Wine District
- Client réserve sur Wine District → Stock **réservé temporairement**
- Caviste valide → Stock diminue définitivement

---

### Q4 : Que se passe-t-il si le token expire ?

Le `refreshToken` permet de renouveler automatiquement le `accessToken`.

Si ça échoue, le caviste devra **se reconnecter** via le dashboard.

---

### Q5 : C'est sécurisé ?

**Oui** :

- Tokens stockés chiffrés dans la DB
- Webhooks vérifiés par signature HMAC
- HTTPS uniquement
- Pas de données de paiement stockées

---

### Q6 : Combien de temps prend une synchronisation ?

- **Manuelle** : 5-15 secondes (selon nb de produits)
- **Webhook** : < 2 secondes (temps réel)

---

### Q7 : Puis-je synchroniser plusieurs cavistes ?

**Oui**, chaque caviste peut avoir sa propre connexion SumUp/POS Pro.

Chaque connexion est indépendante (table `IntegrationConnection` a un `cavisteId`).

---

**Dernière mise à jour :** 23 Octobre 2025
