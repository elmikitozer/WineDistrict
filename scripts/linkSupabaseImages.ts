import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE || process.env.SUPABASE_ANON_KEY!;
const BUCKET = process.env.SUPABASE_BUCKET || 'images';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE/ANON key');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const prisma = new PrismaClient();

function stem(name: string) {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(0, i) : name;
}

async function main() {
  // List files under vins/ in bucket (first 1000)
  const { data: files, error } = await supabase.storage.from(BUCKET).list('vins', { limit: 1000 });
  if (error) throw error;
  const entries = (files || []).filter(f => f.name.endsWith('.webp') || f.name.endsWith('.png') || f.name.endsWith('.jpg'));

  // Build map by stem
  const map = new Map<string, string>();
  for (const f of entries) {
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(`vins/${f.name}`);
    map.set(stem(f.name).toLowerCase(), data.publicUrl);
  }

  // Fetch vins to update
  const vins = await prisma.vin.findMany({ select: { id: true, imageFile: true, nom: true } });

  let updated = 0;
  for (const v of vins) {
    // Try id match first: <id>.webp/png/jpg
    const byId = map.get(String(v.id).toLowerCase());
    // Then try existing imageFile stem if present
    const fromExisting = v.imageFile ? map.get(stem(v.imageFile).replace('/vins/', '').toLowerCase()) : undefined;
    const target = byId || fromExisting;
    if (target && v.imageFile !== target) {
      await prisma.vin.update({ where: { id: v.id }, data: { imageFile: target } });
      updated++;
      console.log(`Linked #${v.id} (${v.nom}) -> ${target}`);
    }
  }

  console.log(`✅ Linked ${updated} image(s) from Supabase to Vin.imageFile.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
