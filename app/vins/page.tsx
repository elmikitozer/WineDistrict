// app/vins/page.tsx
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import type { Metadata } from 'next';
import VinsGrid from './VinsGrid';

export const metadata: Metadata = {
  title: 'Nos Vins | Wine District',
  description:
    'Découvrez notre sélection de vins rouges, blancs et rosés disponibles chez nos cavistes partenaires à Paris. Trouvez votre vin préféré près de chez vous.',
  openGraph: {
    title: 'Nos Vins | Wine District',
    description:
      'Découvrez notre sélection de vins disponibles chez nos cavistes partenaires à Paris.',
    type: 'website',
  },
};

interface Vin {
  id: number;
  slug: string;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
  couleur: string;
  imageFile: string | null;
}

export default async function PageVins({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; couleur?: string; page?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? '').trim();
  const couleur = (sp.couleur ?? 'tous').toLowerCase(); // "rouge" | "blanc" | "rose" | "tous"
  
  // 📊 PAGINATION : Nombre de vins par page
  const PER_PAGE = 24; // Grille 4x6 sur desktop, 2x12 sur mobile
  const page = parseInt(sp.page ?? '1', 10);
  const offset = (page - 1) * PER_PAGE;

  // WHERE parts (accent-insensitive + tiret/space normalization)
  const whereParts = [
    q
      ? Prisma.sql`(
          unaccent(nom) ILIKE unaccent(${`%${q}%`})
          OR unaccent(domaine) ILIKE unaccent(${`%${q}%`})
          OR nom ILIKE ${`%${q}%`}
          OR domaine ILIKE ${`%${q}%`}
          OR unaccent(REPLACE(nom, '-', ' ')) ILIKE unaccent(${`%${q.replace(/-/g, ' ')}%`})
          OR unaccent(REPLACE(domaine, '-', ' ')) ILIKE unaccent(${`%${q.replace(/-/g, ' ')}%`})
          OR unaccent(REPLACE(nom, ' ', '-')) ILIKE unaccent(${`%${q.replace(/ /g, '-')}%`})
          OR unaccent(REPLACE(domaine, ' ', '-')) ILIKE unaccent(${`%${q.replace(/ /g, '-')}%`})
        )`
      : undefined,
    couleur !== 'tous'
      ? Prisma.sql`(unaccent(couleur) ILIKE unaccent(${couleur}) OR couleur ILIKE ${couleur})`
      : undefined,
  ].filter(Boolean) as Prisma.Sql[];

  // IMPORTANT: le séparateur de Prisma.join doit être une string dans Prisma v6
  const whereClause =
    whereParts.length > 0 ? Prisma.sql`WHERE ${Prisma.join(whereParts, ' AND ')}` : Prisma.empty;

  // 📊 QUERY AVEC LIMIT/OFFSET pour la pagination
  const query = Prisma.sql`
    SELECT id, slug, nom, domaine, année, prix, couleur, "imageFile"
    FROM "Vin"
    ${whereClause}
    ORDER BY nom ASC
    LIMIT ${PER_PAGE} OFFSET ${offset}
  `;

  // 📊 COMPTER le nombre total de vins (pour savoir s'il y a d'autres pages)
  const countQuery = Prisma.sql`
    SELECT COUNT(*)::int as count
    FROM "Vin"
    ${whereClause}
  `;

  const [vins, countResult] = await Promise.all([
    prisma.$queryRaw<Vin[]>(query),
    prisma.$queryRaw<{ count: number }[]>(countQuery),
  ]);

  const totalVins = countResult[0]?.count ?? 0;
  const hasMore = page * PER_PAGE < totalVins; // Y a-t-il d'autres pages ?

  return (
    <>
      <main className="p-10 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-rose-900 mb-6 tracking-tight text-center">
          {q ? `Résultats pour « ${q} »` : 'Notre sélection de vins'}
        </h1>

        {/* Filtres */}
        <div className="flex justify-center gap-4 mb-12">
          {['Tous', 'Rouge', 'Blanc', 'Rosé'].map((c) => {
            const slug = c.toLowerCase().replace('é', 'e'); // "rosé" -> "rose"
            const isActive = (sp.couleur ?? 'tous').toLowerCase() === slug;

            const href = new URLSearchParams();
            if (q) href.set('q', q);
            if (slug !== 'tous') href.set('couleur', slug);

            return (
              <Link
                key={c}
                href={`/vins?${href.toString()}`}
                className={`relative px-4 py-2 rounded-full text-sm transition
                ${
                  isActive
                    ? 'bg-rose-100 text-rose-900 font-semibold'
                    : 'text-gray-600 hover:text-rose-800 hover:bg-rose-50'
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        {/* Résultats */}
        {vins.length === 0 ? (
          <div className="mt-10 text-center text-rose-900 mb-6">
            <p className="font-semibold">Aucun vin trouvé.</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="/vins"
                className="rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 transition"
              >
                Réinitialiser
              </Link>
              <Link
                href="/cavistes"
                className="rounded-md border px-4 py-2 hover:bg-rose-50 transition"
              >
                Voir les cavistes
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 🎨 VinsGrid : Composant client qui gère l'affichage et le "Load More" */}
            <VinsGrid
              initialVins={vins}
              currentPage={page}
              hasMore={hasMore}
              totalVins={totalVins}
              filters={{ q, couleur }}
            />
          </>
        )}
      </main>
    </>
  );
}
