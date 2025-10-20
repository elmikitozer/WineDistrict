// Script pour vérifier la structure de la base de données et les IDs
import fs from 'node:fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
} else {
  dotenv.config({ override: true });
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAutoIncrement() {
  console.log('🔍 Vérification des séquences AUTO INCREMENT...\n');

  // Vérifier les séquences pour les IDs auto-increment
  const sequences = await prisma.$queryRaw<
    Array<{
      table_name: string;
      column_name: string;
      column_default: string;
    }>
  >`
    SELECT
      table_name,
      column_name,
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND column_default LIKE 'nextval%'
    ORDER BY table_name, column_name
  `;

  console.log('📋 Tables avec AUTO INCREMENT:');
  for (const seq of sequences) {
    console.log(`   ✓ ${seq.table_name}.${seq.column_name} → ${seq.column_default}`);
  }

  // Vérifier les valeurs actuelles des séquences
  const cavisteSeq = await prisma.$queryRaw<Array<{ last_value: bigint }>>`
    SELECT last_value FROM "Caviste_id_seq"
  `;

  const vinSeq = await prisma.$queryRaw<Array<{ last_value: bigint }>>`
    SELECT last_value FROM "Vin_id_seq"
  `;

  const stockSeq = await prisma.$queryRaw<Array<{ last_value: bigint }>>`
    SELECT last_value FROM "Stock_id_seq"
  `;

  console.log('\n📊 Valeurs actuelles des séquences:');
  console.log(`   Caviste_id_seq: ${cavisteSeq[0].last_value}`);
  console.log(`   Vin_id_seq: ${vinSeq[0].last_value}`);
  console.log(`   Stock_id_seq: ${stockSeq[0].last_value}`);
}

async function checkConstraints() {
  console.log('\n🔍 Vérification des contraintes...\n');

  const constraints = await prisma.$queryRaw<
    Array<{
      table_name: string;
      constraint_name: string;
      constraint_type: string;
    }>
  >`
    SELECT
      tc.table_name,
      tc.constraint_name,
      tc.constraint_type
    FROM information_schema.table_constraints tc
    WHERE tc.table_schema = 'public'
      AND tc.table_name IN ('Vin', 'Caviste', 'Stock', 'Reservation', 'User')
    ORDER BY tc.table_name, tc.constraint_type
  `;

  console.log('📋 Contraintes par table:');
  let currentTable = '';
  for (const c of constraints) {
    if (c.table_name !== currentTable) {
      console.log(`\n   ${c.table_name}:`);
      currentTable = c.table_name;
    }
    console.log(`      ${c.constraint_type}: ${c.constraint_name}`);
  }
}

async function checkIndexes() {
  console.log('\n🔍 Vérification des index...\n');

  const indexes = await prisma.$queryRaw<
    Array<{
      tablename: string;
      indexname: string;
      indexdef: string;
    }>
  >`
    SELECT
      tablename,
      indexname,
      indexdef
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename IN ('Vin', 'Caviste', 'Stock', 'Reservation', 'User')
    ORDER BY tablename, indexname
  `;

  console.log('📋 Index par table:');
  let currentTable = '';
  for (const idx of indexes) {
    if (idx.tablename !== currentTable) {
      console.log(`\n   ${idx.tablename}:`);
      currentTable = idx.tablename;
    }
    console.log(`      ${idx.indexname}`);
  }
}

async function checkStats() {
  console.log('\n📊 Statistiques de la base de données...\n');

  const vinsCount = await prisma.vin.count();
  const cavistesCount = await prisma.caviste.count();
  const stocksCount = await prisma.stock.count();
  const reservationsCount = await prisma.reservation.count();
  const usersCount = await prisma.user.count();

  console.log(`   Vins: ${vinsCount}`);
  console.log(`   Cavistes: ${cavistesCount}`);
  console.log(`   Stocks: ${stocksCount}`);
  console.log(`   Réservations: ${reservationsCount}`);
  console.log(`   Utilisateurs: ${usersCount}`);

  // Vérifier les réservations avec userId
  const reservationsWithUser = await prisma.reservation.count({
    where: { userId: { not: null } },
  });

  console.log(`   Réservations avec userId: ${reservationsWithUser}`);
}

async function checkUniqueConstraints() {
  console.log('\n🔍 Vérification des contraintes UNIQUE...\n');

  // Vérifier la contrainte unique sur Vin
  const vinDuplicates = await prisma.$queryRaw<
    Array<{
      nom: string;
      domaine: string;
      année: number;
      count: bigint;
    }>
  >`
    SELECT nom, domaine, année, COUNT(*) as count
    FROM "Vin"
    GROUP BY nom, domaine, année
    HAVING COUNT(*) > 1
  `;

  if (vinDuplicates.length > 0) {
    console.log('   ⚠️  Doublons trouvés dans la table Vin:');
    for (const dup of vinDuplicates) {
      console.log(`      ${dup.nom} - ${dup.domaine} (${dup.année}): ${dup.count} fois`);
    }
  } else {
    console.log('   ✅ Aucun doublon dans la table Vin');
  }

  // Vérifier la contrainte unique sur Caviste
  const cavisteDuplicates = await prisma.$queryRaw<
    Array<{
      nom: string;
      count: bigint;
    }>
  >`
    SELECT nom, COUNT(*) as count
    FROM "Caviste"
    GROUP BY nom
    HAVING COUNT(*) > 1
  `;

  if (cavisteDuplicates.length > 0) {
    console.log('   ⚠️  Doublons trouvés dans la table Caviste:');
    for (const dup of cavisteDuplicates) {
      console.log(`      ${dup.nom}: ${dup.count} fois`);
    }
  } else {
    console.log('   ✅ Aucun doublon dans la table Caviste');
  }

  // Vérifier la contrainte unique sur Stock
  const stockDuplicates = await prisma.$queryRaw<
    Array<{
      cavisteId: number;
      vinId: number;
      count: bigint;
    }>
  >`
    SELECT "cavisteId", "vinId", COUNT(*) as count
    FROM "Stock"
    GROUP BY "cavisteId", "vinId"
    HAVING COUNT(*) > 1
  `;

  if (stockDuplicates.length > 0) {
    console.log('   ⚠️  Doublons trouvés dans la table Stock:');
    console.log(`      ${stockDuplicates.length} doublons`);
  } else {
    console.log('   ✅ Aucun doublon dans la table Stock');
  }
}

async function main() {
  console.log('🚀 Analyse de la structure de la base de données\n');
  console.log('='.repeat(60));

  await checkStats();
  await checkAutoIncrement();
  await checkConstraints();
  await checkIndexes();
  await checkUniqueConstraints();

  console.log('\n' + '='.repeat(60));
  console.log('✅ Analyse terminée !');
  console.log('\n💡 Recommandations:');
  console.log('   - Les IDs sont AUTO INCREMENT (SERIAL)');
  console.log('   - Vous pouvez ajouter/supprimer des vins sans problème');
  console.log('   - Les contraintes UNIQUE évitent les doublons');
  console.log('   - Pour ajouter des vins: npx tsx scripts/generateWineData.ts');
  console.log('   - Pour peupler la base: npx tsx scripts/seedGeneratedData.ts');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
