// Script pour générer les slugs pour tous les vins et cavistes existants
import fs from 'node:fs';
import dotenv from 'dotenv';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
} else {
  dotenv.config({ override: true });
}

import { PrismaClient } from '@prisma/client';
import { slugify } from '@/src/utils/slug';

const prisma = new PrismaClient();

async function generateVinSlugs() {
  console.log('📦 Génération des slugs pour les vins...\n');

  const vins = await prisma.vin.findMany({
    select: { id: true, nom: true, domaine: true, année: true, couleur: true, slug: true },
  });

  let generated = 0;
  let skipped = 0;

  for (const vin of vins) {
    // Générer le slug au bon format : nom-domaine-année-couleur-id
    // Exemple : chateau-margaux-margaux-2018-rouge-5
    const baseSlug = slugify(`${vin.nom}-${vin.domaine}-${vin.année}-${vin.couleur}`);
    const expectedSlug = `${baseSlug}-${vin.id}`;

    // Si le vin a déjà le bon slug, on le garde
    if (vin.slug === expectedSlug) {
      console.log(`   ⏭️  Vin #${vin.id} a déjà le bon slug: ${vin.slug}`);
      skipped++;
      continue;
    }

    // Mettre à jour le slug (soit il n'existe pas, soit il est dans l'ancien format)
    await prisma.vin.update({
      where: { id: vin.id },
      data: { slug: expectedSlug },
    });

    if (vin.slug) {
      console.log(`   🔄 Vin #${vin.id}: ${vin.slug} → ${expectedSlug}`);
    } else {
      console.log(`   ✅ Vin #${vin.id}: ${vin.nom} → ${expectedSlug}`);
    }
    generated++;
  }

  console.log(`\n📊 Vins: ${generated} slugs générés, ${skipped} existants`);
}

async function generateCavisteSlugs() {
  console.log('\n📦 Génération des slugs pour les cavistes...\n');

  const cavistes = await prisma.caviste.findMany({
    select: { id: true, nom: true, slug: true },
  });

  let generated = 0;
  let skipped = 0;

  for (const caviste of cavistes) {
    // Générer le slug au bon format : nom-id
    // Exemple : cave-saint-germain-1
    const baseSlug = slugify(caviste.nom);
    const expectedSlug = `${baseSlug}-${caviste.id}`;

    // Si le caviste a déjà le bon slug, on le garde
    if (caviste.slug === expectedSlug) {
      console.log(`   ⏭️  Caviste #${caviste.id} a déjà le bon slug: ${caviste.slug}`);
      skipped++;
      continue;
    }

    // Mettre à jour le slug (soit il n'existe pas, soit il est dans l'ancien format)
    await prisma.caviste.update({
      where: { id: caviste.id },
      data: { slug: expectedSlug },
    });

    if (caviste.slug) {
      console.log(`   🔄 Caviste #${caviste.id}: ${caviste.slug} → ${expectedSlug}`);
    } else {
      console.log(`   ✅ Caviste #${caviste.id}: ${caviste.nom} → ${expectedSlug}`);
    }
    generated++;
  }

  console.log(`\n📊 Cavistes: ${generated} slugs générés, ${skipped} existants`);
}

async function addUniqueConstraints() {
  console.log('\n🔒 Ajout des contraintes UNIQUE...\n');

  try {
    // Avec l'ID dans le slug, pas de doublons possibles, mais vérifions quand même
    const vinDuplicates = await prisma.$queryRaw<Array<{ slug: string; count: bigint }>>`
      SELECT slug, COUNT(*) as count
      FROM "Vin"
      WHERE slug IS NOT NULL
      GROUP BY slug
      HAVING COUNT(*) > 1
    `;

    const cavisteDuplicates = await prisma.$queryRaw<Array<{ slug: string; count: bigint }>>`
      SELECT slug, COUNT(*) as count
      FROM "Caviste"
      WHERE slug IS NOT NULL
      GROUP BY slug
      HAVING COUNT(*) > 1
    `;

    if (vinDuplicates.length > 0) {
      console.log('   ⚠️  Doublons détectés dans les slugs de vins (ne devrait pas arriver):');
      vinDuplicates.forEach((d) => console.log(`      - ${d.slug}: ${d.count} fois`));
      throw new Error("Corrigez les doublons avant d'ajouter les contraintes");
    }

    if (cavisteDuplicates.length > 0) {
      console.log('   ⚠️  Doublons détectés dans les slugs de cavistes (ne devrait pas arriver):');
      cavisteDuplicates.forEach((d) => console.log(`      - ${d.slug}: ${d.count} fois`));
      throw new Error("Corrigez les doublons avant d'ajouter les contraintes");
    }

    // Ajouter les contraintes UNIQUE via SQL
    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'Vin_slug_key'
        ) THEN
          ALTER TABLE "Vin" ADD CONSTRAINT "Vin_slug_key" UNIQUE (slug);
        END IF;
      END $$;
    `);

    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'Caviste_slug_key'
        ) THEN
          ALTER TABLE "Caviste" ADD CONSTRAINT "Caviste_slug_key" UNIQUE (slug);
        END IF;
      END $$;
    `);

    console.log('   ✅ Contraintes UNIQUE ajoutées');
  } catch (err: any) {
    console.error('   ❌ Erreur:', err.message);
    throw err;
  }
}

async function main() {
  console.log('🚀 Génération des slugs pour Vins et Cavistes\n');
  console.log('='.repeat(60));

  await generateVinSlugs();
  await generateCavisteSlugs();
  await addUniqueConstraints();

  console.log('\n' + '='.repeat(60));
  console.log('✅ Slugs générés avec succès !');
  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifier les slugs dans Prisma Studio');
  console.log('   2. Tester les nouvelles URLs');
  console.log('   3. Régénérer le client Prisma: npx prisma generate');
}

main()
  .catch((err) => {
    console.error('\n❌ Erreur:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
