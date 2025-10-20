// Script pour uploader une photo de vin vers Supabase Storage
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
  console.error('❌ Variables SUPABASE_URL et SUPABASE_SERVICE_ROLE requises dans .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);
const prisma = new PrismaClient();

async function uploadWineImage(
  imagePath: string,
  vinId: number,
  options?: { overwrite?: boolean }
) {
  // Vérifier que le fichier existe
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Fichier introuvable: ${imagePath}`);
  }

  // Vérifier que le vin existe
  const vin = await prisma.vin.findUnique({
    where: { id: vinId },
    select: { id: true, nom: true, domaine: true, année: true, imageFile: true },
  });

  if (!vin) {
    throw new Error(`Vin #${vinId} introuvable`);
  }

  console.log(`📤 Upload pour: ${vin.nom} - ${vin.domaine} (${vin.année})`);

  // Lire le fichier
  const fileBuffer = fs.readFileSync(imagePath);
  const ext = path.extname(imagePath);
  const fileName = `vin-${vinId}${ext}`;
  const filePath = `vins/${fileName}`;

  // Supprimer l'ancienne image si elle existe et overwrite = true
  if (vin.imageFile && options?.overwrite) {
    console.log(`🗑️  Suppression de l'ancienne image: ${vin.imageFile}`);
    await supabase.storage.from(bucket).remove([`vins/${vin.imageFile}`]);
  }

  // Upload vers Supabase
  console.log(`⬆️  Upload vers Supabase: ${filePath}`);
  const { data, error } = await supabase.storage.from(bucket).upload(filePath, fileBuffer, {
    contentType: `image/${ext.replace('.', '')}`,
    upsert: true,
  });

  if (error) {
    throw new Error(`Erreur upload: ${error.message}`);
  }

  console.log(`✅ Upload réussi: ${data.path}`);

  // Mettre à jour la base de données
  await prisma.vin.update({
    where: { id: vinId },
    data: { imageFile: fileName },
  });

  console.log(`✅ Base de données mise à jour`);

  // Générer l'URL publique
  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

  console.log(`\n🔗 URL publique:`);
  console.log(publicUrlData.publicUrl);
  console.log(`\n✨ Terminé !`);

  return publicUrlData.publicUrl;
}

// CLI
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
📸 Upload d'une image de vin vers Supabase Storage

Usage:
  npx tsx scripts/uploadWineImage.ts <chemin-image> <vinId> [--overwrite]

Exemples:
  npx tsx scripts/uploadWineImage.ts ~/Photos/chateau-margaux.jpg 1
  npx tsx scripts/uploadWineImage.ts ./mon-vin.png 5 --overwrite

Options:
  --overwrite    Remplace l'image existante si elle existe

💡 Pour trouver l'ID d'un vin:
  npm run db:studio
  ou: npx prisma studio
  `);
  process.exit(0);
}

const imagePath = path.resolve(args[0]);
const vinId = parseInt(args[1]);
const overwrite = args.includes('--overwrite');

if (isNaN(vinId)) {
  console.error('❌ vinId doit être un nombre');
  process.exit(1);
}

uploadWineImage(imagePath, vinId, { overwrite })
  .then(() => {
    console.log('\n🎉 Image uploadée avec succès !');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Erreur:', err.message);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
