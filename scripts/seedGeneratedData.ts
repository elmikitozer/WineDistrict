// Script pour insérer les vins et cavistes générés dans la base de données
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Charger les variables d'environnement
if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
} else {
  dotenv.config({ override: true });
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Vin = {
  slug: string;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
  couleur: string;
  imageUrl: string;
};

type Caviste = {
  slug: string;
  nom: string;
  adresse: string;
};

async function seedVins() {
  const fixturesPath = path.join(process.cwd(), 'prisma', 'fixtures', 'vins_generated.json');

  if (!fs.existsSync(fixturesPath)) {
    console.log('⚠️  Fichier vins_generated.json non trouvé.');
    console.log("   Lancez d'abord: npx tsx scripts/generateWineData.ts");
    return 0;
  }

  const vins: Vin[] = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));

  console.log(`📦 Insertion de ${vins.length} vins...`);

  let inserted = 0;
  let updated = 0;

  for (const v of vins) {
    const existing = await prisma.vin.findUnique({
      where: {
        vin_unique: {
          nom: v.nom,
          domaine: v.domaine,
          année: v.année,
        },
      },
    });

    if (existing) {
      await prisma.vin.update({
        where: { id: existing.id },
        data: {
          prix: v.prix,
          couleur: v.couleur,
        },
      });
      updated++;
    } else {
      await prisma.vin.create({
        data: {
          nom: v.nom,
          domaine: v.domaine,
          année: v.année,
          prix: v.prix,
          couleur: v.couleur,
          imageFile: null, // Pas d'image pour les vins générés
        },
      });
      inserted++;
    }
  }

  console.log(`✅ Vins: ${inserted} insérés, ${updated} mis à jour`);
  return inserted + updated;
}

async function seedCavistes() {
  const fixturesPath = path.join(process.cwd(), 'prisma', 'fixtures', 'cavistes_generated.json');

  if (!fs.existsSync(fixturesPath)) {
    console.log('⚠️  Fichier cavistes_generated.json non trouvé.');
    return 0;
  }

  const cavistes: Caviste[] = JSON.parse(fs.readFileSync(fixturesPath, 'utf-8'));

  console.log(`📦 Insertion de ${cavistes.length} cavistes...`);

  let inserted = 0;
  let updated = 0;

  for (const c of cavistes) {
    const existing = await prisma.caviste.findFirst({
      where: { nom: c.nom },
    });

    if (existing) {
      await prisma.caviste.update({
        where: { id: existing.id },
        data: { adresse: c.adresse },
      });
      updated++;
    } else {
      await prisma.caviste.create({
        data: {
          nom: c.nom,
          adresse: c.adresse,
        },
      });
      inserted++;
    }
  }

  console.log(`✅ Cavistes: ${inserted} insérés, ${updated} mis à jour`);
  return inserted + updated;
}

async function generateStocks() {
  console.log('📦 Génération des stocks aléatoires...');

  const cavistes = await prisma.caviste.findMany();
  const vins = await prisma.vin.findMany();

  if (cavistes.length === 0 || vins.length === 0) {
    console.log('⚠️  Pas de cavistes ou de vins à associer');
    return 0;
  }

  let created = 0;

  for (const caviste of cavistes) {
    // Supprimer les anciens stocks
    await prisma.stock.deleteMany({ where: { cavisteId: caviste.id } });

    // Nombre aléatoire de vins en stock (entre 5 et 25)
    const nbVins = Math.floor(Math.random() * 20) + 5;

    // Sélectionner des vins aléatoires
    const selectedVins = [...vins].sort(() => Math.random() - 0.5).slice(0, nbVins);

    for (const vin of selectedVins) {
      // Quantité aléatoire (entre 1 et 30)
      const quantite = Math.floor(Math.random() * 29) + 1;

      await prisma.stock.create({
        data: {
          cavisteId: caviste.id,
          vinId: vin.id,
          quantite,
        },
      });
      created++;
    }
  }

  console.log(`✅ Stocks: ${created} lignes créées`);
  return created;
}

async function main() {
  console.log('🚀 Démarrage du seeding...\n');

  const vinsCount = await seedVins();
  const cavistesCount = await seedCavistes();
  const stocksCount = await generateStocks();

  console.log('\n🎉 Seeding terminé !');
  console.log(`   - ${vinsCount} vins`);
  console.log(`   - ${cavistesCount} cavistes`);
  console.log(`   - ${stocksCount} stocks`);

  // Statistiques
  const stats = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count FROM "Vin"
  `;
  const totalVins = Number(stats[0].count);

  const statsCavistes = await prisma.$queryRaw<Array<{ count: bigint }>>`
    SELECT COUNT(*) as count FROM "Caviste"
  `;
  const totalCavistes = Number(statsCavistes[0].count);

  console.log(`\n📊 Total en base:`);
  console.log(`   - ${totalVins} vins`);
  console.log(`   - ${totalCavistes} cavistes`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
