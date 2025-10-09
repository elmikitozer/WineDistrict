import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs/promises';
import path from 'node:path';
import mime from 'mime-types';
import { PrismaClient } from '@prisma/client';

// ENV required: SUPABASE_URL, SUPABASE_SERVICE_ROLE (or anon if bucket is public write), SUPABASE_BUCKET
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_ANON_KEY!;
const BUCKET = process.env.SUPABASE_BUCKET || 'images';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE/ANON key');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const prisma = new PrismaClient();
const PLACEHOLDER_PATH = 'vins/placeholder.png';

// A tiny 1x1 PNG (transparent) as a fallback placeholder
const TRANSPARENT_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

async function main() {
  // Ensure bucket exists (idempotent)
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  // Ensure placeholder exists
  const placeholderBuf = Buffer.from(TRANSPARENT_PNG_BASE64, 'base64');
  await supabase.storage
    .from(BUCKET)
    .upload(PLACEHOLDER_PATH, placeholderBuf, {
      contentType: 'image/png',
      upsert: true,
    })
    .catch(() => {});
  const { data: phData } = supabase.storage.from(BUCKET).getPublicUrl(PLACEHOLDER_PATH);
  const placeholderUrl = phData.publicUrl;

  const imagesDir = path.join(process.cwd(), 'public', 'vins');
  const files = await fs.readdir(imagesDir);

  for (const file of files) {
    const full = path.join(imagesDir, file);
    const stat = await fs.stat(full);
    if (!stat.isFile()) continue;
    const contentType = mime.lookup(file) || 'application/octet-stream';
    const storagePath = `vins/${file}`;

    // Upload (upsert)
    const buf = await fs.readFile(full);
    const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buf, {
      contentType: String(contentType),
      upsert: true,
    });
    if (error) {
      console.warn('Upload error for', file, error.message);
      continue;
    }

    // Public URL
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    const publicUrl = data.publicUrl;

    // Backfill into Vin.imageFile for two cases:
    // 1) value equals bare filename (e.g. "3.png")
    // 2) value equals local path (e.g. "/vins/3.png")
    const updates = await prisma.$transaction([
      prisma.vin.updateMany({ where: { imageFile: file }, data: { imageFile: publicUrl } }),
      prisma.vin.updateMany({ where: { imageFile: `/vins/${file}` }, data: { imageFile: publicUrl } }),
    ]);
    const changed = updates.reduce((a, b) => a + b.count, 0);

    console.log('Uploaded and set URL for', file, '->', publicUrl, `(updated ${changed})`);
  }

  // Report remaining non-remote imageFile values, if any
  let leftovers = await prisma.vin.findMany({
    where: {
      imageFile: { not: null },
      NOT: [{ imageFile: { startsWith: 'http' } }],
    },
    select: { id: true, imageFile: true, nom: true },
    take: 20,
  });
  if (leftovers.length > 0) {
    // Set all remaining local paths to placeholderUrl
    const res = await prisma.vin.updateMany({
      where: {
        imageFile: { not: null },
        NOT: { imageFile: { startsWith: 'http' } },
      },
      data: { imageFile: placeholderUrl },
    });
    leftovers = await prisma.vin.findMany({
      where: {
        imageFile: { not: null },
        NOT: [{ imageFile: { startsWith: 'http' } }],
      },
      select: { id: true, imageFile: true, nom: true },
      take: 5,
    });
    if (leftovers.length === 0) {
      console.log(`✅ Replaced ${res.count} local image paths with placeholder.`);
    } else {
      console.warn('⚠️ Some records still have local paths after replacement:', leftovers);
    }
  } else {
    console.log('✅ All imageFile values now point to remote URLs.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
