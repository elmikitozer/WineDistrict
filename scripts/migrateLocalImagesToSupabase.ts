// Script pour migrer les images locales (public/vins/) vers Supabase Storage
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

async function migrateLocalImages() {
  const localDir = path.join(process.cwd(), 'public', 'vins');

  if (!fs.existsSync(localDir)) {
    console.log('⚠️  Dossier public/vins/ introuvable');
    return;
  }

  // Lister les images locales
  const localImages = fs.readdirSync(localDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  if (localImages.length === 0) {
    console.log('⚠️  Aucune image dans public/vins/');
    return;
  }

  console.log(`📦 ${localImages.length} images locales trouvées\n`);

  // Trouver les vins qui utilisent ces images
  const vins = await prisma.vin.findMany({
    where: {
      imageFile: {
        in: localImages,
      },
    },
    select: {
      id: true,
      nom: true,
      domaine: true,
      imageFile: true,
    },
  });

  console.log(`🍷 ${vins.length} vins utilisent ces images\n`);

  let uploaded = 0;
  let errors = 0;

  for (const vin of vins) {
    if (!vin.imageFile) continue;

    const localPath = path.join(localDir, vin.imageFile);
    const ext = path.extname(vin.imageFile);
    const newFileName = `vin-${vin.id}${ext}`;
    const storagePath = `vins/${newFileName}`;

    try {
      console.log(`\n📤 ${vin.nom} - ${vin.domaine}`);
      console.log(`   📁 ${vin.imageFile} → ${newFileName}`);

      // Lire le fichier
      const fileBuffer = fs.readFileSync(localPath);

      // Upload vers Supabase
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(storagePath, fileBuffer, {
          contentType: `image/${ext.replace('.', '')}`,
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Mettre à jour la DB avec le nouveau nom
      await prisma.vin.update({
        where: { id: vin.id },
        data: { imageFile: newFileName },
      });

      // Générer l'URL
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(storagePath);

      console.log(`   ✅ Uploadé`);
      console.log(`   🔗 ${urlData.publicUrl}`);

      uploaded++;
    } catch (err: any) {
      console.error(`   ❌ Erreur: ${err.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Résumé:`);
  console.log(`   ✅ Migrées: ${uploaded}`);
  console.log(`   ❌ Erreurs: ${errors}`);

  if (uploaded > 0) {
    console.log(`\n💡 Vous pouvez maintenant supprimer les images locales:`);
    console.log(`   rm public/vins/*.png`);
    console.log(`\n   (Gardez une copie de backup avant !)`);
  }
}

migrateLocalImages()
  .then(() => {
    console.log('\n🎉 Migration terminée !');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Erreur:', err.message);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
