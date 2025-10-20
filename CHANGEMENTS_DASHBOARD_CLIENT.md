# Changements : Dashboard Client pour voir les commandes

## Résumé

Ajout d'une fonctionnalité permettant aux clients de voir leurs commandes (réservations) dans leur dashboard, similaire à l'interface des cavistes.

## Fichiers modifiés

### 1. Schéma de base de données

- **`prisma/schema.prisma`** : Ajout du champ `userId` dans le modèle `Reservation` et relation avec `User`

### 2. API

- **`app/api/reservation/route.ts`** : Capture automatique de l'userId lors de la création d'une réservation
- **`app/api/client/reservations/route.ts`** _(nouveau)_ : API pour récupérer les réservations d'un client spécifique

### 3. Composants dashboard

- **`app/dashboard/page.tsx`** : Modification pour afficher soit l'interface caviste, soit l'interface client selon le type d'utilisateur
- **`app/dashboard/ClientReservationsTable.tsx`** _(nouveau)_ : Tableau des réservations pour les clients
- **`app/dashboard/ClientStatsCards.tsx`** _(nouveau)_ : Cartes de statistiques pour les clients (total, en attente, confirmées, annulées)

## Migration de base de données requise

⚠️ **ACTION REQUISE** : Vous devez appliquer la migration SQL suivante.

### Option 1 : Via l'interface Supabase (Recommandé)

1. Allez sur https://supabase.com/dashboard/project/sycxkvsvmmnubsjqszrk/sql/new
2. Exécutez le SQL suivant :

```sql
-- Ajouter la colonne userId à la table Reservation
ALTER TABLE "Reservation" ADD COLUMN "userId" TEXT;

-- Ajouter la contrainte de clé étrangère
ALTER TABLE "Reservation"
ADD CONSTRAINT "Reservation_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
```

3. Vérifiez que la migration a fonctionné :

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'Reservation' AND column_name = 'userId';
```

### Option 2 : Utiliser le fichier SQL

Exécutez le fichier `prisma/manual_migration_add_userId.sql` via l'interface Supabase.

### Vérification

Après l'application, lancez :

```bash
npx tsx scripts/addUserIdColumn.ts
```

Vous devriez voir :

```
✓ La colonne userId existe déjà dans la table Reservation
✓ La contrainte de clé étrangère existe
```

## Fonctionnalités ajoutées

### Pour les clients

- **Dashboard personnalisé** : Affichage de "Mes commandes" au lieu des réservations du caviste
- **Statistiques** :
  - Total des commandes
  - Commandes en attente
  - Commandes confirmées
  - Commandes annulées
- **Tableau des réservations** avec :
  - Nom du vin
  - Domaine et année
  - Informations du caviste (nom et adresse)
  - Date de réservation
  - Statut (avec badges colorés)
- **Filtrage** : Même barre de recherche et filtres que pour les cavistes

### Pour les cavistes

- Aucun changement : l'interface reste identique
- Continuent de voir toutes les réservations de leur caviste

## Logique de détection

L'utilisateur est considéré comme **client** si :

- `user.cavisteId` est `null` OU `undefined`
- ET `user.role !== 'CAVISTE'`

Sinon, il est considéré comme **caviste**.

## Notes techniques

- Le champ `userId` est **optionnel** (nullable) pour maintenir la compatibilité avec les réservations existantes
- Les réservations sans userId (anciennes) ne seront pas affichées dans le dashboard client
- Les nouvelles réservations capturent automatiquement l'userId si l'utilisateur est connecté
- Utilisation de `as any` temporaire dans `app/api/reservation/route.ts` en attendant la régénération du client Prisma après la migration

## Prochaines étapes

1. ✅ Appliquer la migration SQL via Supabase
2. ✅ Vérifier avec `npx tsx scripts/addUserIdColumn.ts`
3. ✅ Régénérer le client Prisma : `npx prisma generate`
4. ✅ Tester en local
5. ✅ Déployer

## Test

Pour tester la fonctionnalité :

1. Créez un utilisateur client (via `/register-client` ou l'API)
2. Connectez-vous avec cet utilisateur
3. Créez une réservation
4. Allez sur `/dashboard`
5. Vous devriez voir votre commande dans "Mes commandes"
