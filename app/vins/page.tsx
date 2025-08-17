export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
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
  searchParams?: Promise<{
    q?: string;
    couleur?: string;
  }>;
}) {
  const sp = (await searchParams) ?? {};
  const q = sp.q?.toLowerCase() || "";
  const couleur = sp.couleur?.toLowerCase() || "tous";
  const safeQ = q.replace(/[^a-zA-ZÀ-ÿ0-9 '-]/g, "");

  let vins: Vin[] = [];

  if (safeQ.length > 0) {
    vins = await prisma.$queryRawUnsafe<Vin[]>(`
      SELECT id, nom, domaine, année, prix
      FROM "Vin"
      WHERE (unaccent(nom) ILIKE unaccent('%${safeQ}%')
        OR unaccent(domaine) ILIKE unaccent('%${safeQ}%'))
      ${couleur !== "tous" ? `AND LOWER(couleur) = '${couleur}'` : ""}
      ORDER BY nom ASC
    `);
  } else {
    vins = await prisma.vin.findMany({
      where: couleur !== "tous" ? { couleur } : undefined,
      orderBy: { nom: "asc" },
    });
  }

  return (
    <main className="p-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-rose-900 mb-6 tracking-tight text-center">
        {safeQ ? `Résultats pour « ${safeQ} »` : "Notre sélection de vins"}
      </h1>

      {/* Filtres */}
      <div className="flex justify-center gap-4 mb-12">
        {["Tous", "Rouge", "Blanc", "Rosé"].map((c) => {
          const cLower = c.toLowerCase();
          const isActive = couleur === cLower || (!sp.couleur && cLower === "tous");

          const href = new URLSearchParams();
          if (q) href.set("q", q);
          if (cLower !== "tous") href.set("couleur", cLower);

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
