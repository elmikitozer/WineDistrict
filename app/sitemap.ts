/**
 * Sitemap dynamique pour Wine District
 * 
 * Génère automatiquement le sitemap.xml avec :
 * - Pages statiques (accueil, vins, cavistes)
 * - Pages dynamiques (vins/[slug], cavistes/[slug])
 * 
 * Next.js génère automatiquement le sitemap à /sitemap.xml
 */

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://wine-district.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/vins`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cavistes`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // 2. Pages vins dynamiques
  const vins = await prisma.vin.findMany({
    select: {
      slug: true,
      id: true,
    },
    where: {
      slug: { not: null },
    },
  });

  const vinPages: MetadataRoute.Sitemap = vins.map((vin) => ({
    url: `${BASE_URL}/vins/${vin.slug || vin.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Pages cavistes dynamiques
  const cavistes = await prisma.caviste.findMany({
    select: {
      slug: true,
      id: true,
    },
    where: {
      slug: { not: null },
    },
  });

  const cavistePages: MetadataRoute.Sitemap = cavistes.map((caviste) => ({
    url: `${BASE_URL}/cavistes/${caviste.slug || caviste.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 4. Combiner tout
  return [...staticPages, ...vinPages, ...cavistePages];
}

