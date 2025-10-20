// Script pour uploader plusieurs photos de vins en batch
import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local', override: true });
} else {
  dotenv.config({ override: true });
}

import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE!;
const bucket = process.env.SUPABASE_BUCKET || 'images';

if (!supabaseUrl || !supabaseServiceRole) {
  console.error('❌ Variables SUPABASE_URL et SUPABASE_SERVICE_ROLE requises');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);
const prisma = new PrismaClient();

/**
 * Upload un dossier d'images
 * Les fichiers doivent être nommés: vin-{id}.{ext}
 * Exemple: vin-1.jpg, vin-5.png, vin-42.webp
 */
async function uploadBatch(folderPath: string) {
  const folder = path.resolve(folderPath);

  if (!fs.existsSync(folder)) {
    throw new Error(`Dossier introuvable: ${folder}`);
  }

  // Lister les fichiers
  const files = fs
    .readdirSync(folder)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .filter((f) => /^vin-\d+\./i.test(f)); // Seulement vin-{id}.ext

  if (files.length === 0) {
    console.log('⚠️  Aucun fichier trouvé au format vin-{id}.{ext}');
    console.log('\n💡 Exemples de noms valides:');
    console.log('   - vin-1.jpg');
    console.log('   - vin-25.png');
    console.log('   - vin-142.webp');
    return;
  }

  console.log(`📦 ${files.length} fichiers trouvés\n`);

  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const match = file.match(/^vin-(\d+)\.(jpg|jpeg|png|webp)$/i);
    if (!match) continue;

    const vinId = parseInt(match[1]);
    const ext = match[2].toLowerCase();
    const filePath = path.join(folder, file);

    try {
      console.log(`\n📤 ${file} (Vin #${vinId})...`);

      // Vérifier que le vin existe
      const vin = await prisma.vin.findUnique({
        where: { id: vinId },
        select: { nom: true, domaine: true },
      });

      if (!vin) {
        console.log(`   ⚠️  Vin #${vinId} introuvable - Ignoré`);
        skipped++;
        continue;
      }

      console.log(`   📝 ${vin.nom} - ${vin.domaine}`);

      // Upload
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = `vin-${vinId}.${ext}`;
      const storagePath = `vins/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
          contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Mettre à jour la DB
      await prisma.vin.update({
        where: { id: vinId },
        data: { imageFile: fileName },
      });

      console.log(`   ✅ Uploadé et enregistré`);
      uploaded++;
    } catch (err: any) {
      console.error(`   ❌ Erreur: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ Uploadés: ${uploaded}`);
  console.log(`   ⚠️  Ignorés: ${skipped}`);
  console.log(`   ❌ Erreurs: ${errors}`);
  console.log(`   📦 Total: ${files.length}`);
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
📸 Upload batch d'images de vins vers Supabase Storage

Usage:
  npx tsx scripts/uploadWineImagesBatch.ts <dossier>

Le dossier doit contenir des fichiers nommés: vin-{id}.{ext}

Exemples de fichiers valides:
  vin-1.jpg       → Upload pour le vin #1
  vin-25.png      → Upload pour le vin #25
  vin-142.webp    → Upload pour le vin #142

Exemple:
  # 1. Créer un dossier avec vos photos
  mkdir ~/wine-photos

  # 2. Renommer vos photos (vin-1.jpg, vin-2.jpg, etc.)

  # 3. Uploader
  npx tsx scripts/uploadWineImagesBatch.ts ~/wine-photos

💡 Pour trouver les IDs des vins:
  npm run db:studio
  `);
  process.exit(0);
}

const folderPath = args[0];

uploadBatch(folderPath)
  .then(() => {
    console.log('\n🎉 Terminé !');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Erreur:', err.message);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
