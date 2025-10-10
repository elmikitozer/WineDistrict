// app/vins/page.tsx
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

interface Vin {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
  imageFile: string | null;
}

function toImageSrc(name: string | null): string {
  if (!name) return '/window.svg';
  if (name.startsWith('http://') || name.startsWith('https://')) return name;
  if (name.startsWith('/')) return name; // already a public path
  const base = process.env.SUPABASE_URL;
  const bucket = process.env.SUPABASE_BUCKET || 'images';
  // Try Supabase public bucket path first
  if (base) return `${base}/storage/v1/object/public/${bucket}/vins/${name}`;
  // Fallback to /public/vins when no Supabase URL is configured
  return `/vins/${name}`;
}

export default async function PageVins({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; couleur?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? '').trim();
  const couleur = (sp.couleur ?? 'tous').toLowerCase(); // "rouge" | "blanc" | "rose" | "tous"

  // WHERE parts (accent-insensitive via unaccent)
  const whereParts = [
    q
      ? Prisma.sql`(unaccent(nom) ILIKE unaccent(${`%${q}%`})
                    OR unaccent(domaine) ILIKE unaccent(${`%${q}%`}))`
      : undefined,
    couleur !== 'tous' ? Prisma.sql`unaccent(couleur) ILIKE unaccent(${couleur})` : undefined,
  ].filter(Boolean) as Prisma.Sql[];

  // IMPORTANT: le séparateur de Prisma.join doit être une string dans Prisma v6
  const whereClause =
    whereParts.length > 0 ? Prisma.sql`WHERE ${Prisma.join(whereParts, ' AND ')}` : Prisma.empty;

  const query = Prisma.sql`
    SELECT id, nom, domaine, année, prix, "imageFile"
    FROM "Vin"
    ${whereClause}
    ORDER BY nom ASC
  `;

  const vins = await prisma.$queryRaw<Vin[]>(query);

  return (
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
        <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {vins.map((vin) => {
            const img = toImageSrc(vin.imageFile);
            return (
              <li key={vin.id}>
                <Link
                  href={`/vins/${vin.id}`}
                  className="block rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition bg-white group focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  {/* Image en tête */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-t-2xl ">
                    <Image
                      src={img}
                      alt={`BIB de ${vin.nom}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-3"
                      priority={false}
                      unoptimized
                    />
                  </div>

                  {/* Infos */}
                  <div className="p-4">
                    <h2 className="text-sm font-semibold text-gray-900 mb-0.5 group-hover:text-rose-700 transition">
                      {vin.nom}
                    </h2>
                    <p className="text-xs text-gray-500 mb-2 italic">
                      {vin.domaine} • {vin.année}
                    </p>
                    <p className="text-rose-700 font-semibold text-sm">{vin.prix.toFixed(2)} €</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
