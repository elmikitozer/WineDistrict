import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { slugify } from '../src/utils/slug';
import crypto from 'node:crypto';

const prisma = new PrismaClient();

function genId() {
  return crypto.randomUUID();
}

async function backfillCavistes() {
  const cavistes = await prisma.caviste.findMany({ select: { id: true, nom: true, slug: true, publicId: true } as const });
  const usedSlugs = new Set<string>(cavistes.filter(c => c.slug).map(c => c.slug as string));
  let updated = 0;
  for (const c of cavistes) {
    let slug = c.slug || slugify(c.nom);
    if (!slug) slug = `caviste-${c.id}`;
    let base = slug;
    let i = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${i++}`;
    }
    usedSlugs.add(slug);
    const publicId = c.publicId || genId();
    if (c.slug !== slug || c.publicId !== publicId) {
      await prisma.caviste.update({ where: { id: c.id }, data: { slug, publicId } });
      updated++;
    }
  }
  return updated;
}

async function backfillVins() {
  const vins = await prisma.vin.findMany({ select: { id: true, nom: true, domaine: true, année: true, slug: true, publicId: true } as const });
  const usedSlugs = new Set<string>(vins.filter(v => v.slug).map(v => v.slug as string));
  let updated = 0;
  for (const v of vins) {
    let slug = v.slug || slugify(`${v.nom}-${v.domaine}-${v.année}`);
    if (!slug) slug = `vin-${v.id}`;
    let base = slug;
    let i = 2;
    while (usedSlugs.has(slug)) {
      slug = `${base}-${i++}`;
    }
    usedSlugs.add(slug);
    const publicId = v.publicId || genId();
    if (v.slug !== slug || v.publicId !== publicId) {
      await prisma.vin.update({ where: { id: v.id }, data: { slug, publicId } });
      updated++;
    }
  }
  return updated;
}

async function main() {
  const cav = await backfillCavistes();
  const vins = await backfillVins();
  console.log(`✅ Backfill done. Cavistes updated: ${cav}, Vins updated: ${vins}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
