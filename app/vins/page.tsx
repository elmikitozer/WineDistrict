// app/vins/page.tsx
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client"; // ⬅️ IMPORTANT
import Link from "next/link";

interface Vin {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
}

export default async function PageVins({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; couleur?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").trim();
  // on garde "rose" (sans accent) pour l’URL ; l’unaccent() tolère tout côté DB
  const couleur = (sp.couleur ?? "tous").toLowerCase();

  // Construit les conditions WHERE de façon sûre
  const whereParts: (Prisma.Sql | undefined)[] = [
    q
      ? Prisma.sql`(unaccent(nom) ILIKE unaccent(${`%${q}%`}) OR unaccent(domaine) ILIKE unaccent(${`%${q}%`}))`
      : undefined,
    couleur !== "tous"
      ? Prisma.sql`unaccent(couleur) ILIKE unaccent(${couleur})`
      : undefined,
  ].filter(Boolean);

  const query = Prisma.sql`
    SELECT id, nom, domaine, année, prix
    FROM "Vin"
    ${whereParts.length ? Prisma.sql`WHERE ${Prisma.join(whereParts, Prisma.sql` AND `)}` : Prisma.empty}
    ORDER BY nom ASC
  `;

  const vins = await prisma.$queryRaw<Vin[]>(query);

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-rose-900 mb-6 tracking-tight text-center">
        {q ? `Résultats pour « ${q} »` : "Notre sélection de vins"}
      </h1>

      {/* Filtres */}
      <div className="flex justify-center gap-4 mb-12">
        {["Tous", "Rouge", "Blanc", "Rosé"].map((c) => {
          const slug = c.toLowerCase().replace("é", "e"); // "rosé" -> "rose"
          const isActive = (sp.couleur ?? "tous").toLowerCase() === slug;

          const href = new URLSearchParams();
          if (q) href.set("q", q);
          if (slug !== "tous") href.set("couleur", slug);

          return (
            <Link
              key={c}
              href={`/vins?${href.toString()}`}
              className={`relative px-4 py-2 rounded-full text-sm transition 
                ${
                  isActive
                    ? "bg-rose-100 text-rose-900 font-semibold"
                    : "text-gray-600 hover:text-rose-800 hover:bg-rose-50"
                }`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {/* Résultats */}
      {vins.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p>Aucun vin trouvé.</p>
          <Link href="/vins">
            <button className="mt-4 px-6 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 transition">
              Réinitialiser la recherche
            </button>
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {vins.map((vin) => (
            <li
              key={vin.id}
              className="rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition bg-white group"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-rose-700 transition">
                <Link href={`/vins/${vin.id}`}>{vin.nom}</Link>
              </h2>
              <p className="text-sm text-gray-500 mb-2 italic">
                {vin.domaine} • {vin.année}
              </p>
              <p className="text-rose-600 font-bold">{vin.prix.toFixed(2)} €</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
