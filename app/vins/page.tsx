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
  searchParams?: {
    q?: string;
    couleur?: string;
    prix?: string;
    année?: string;
  };
}) {
  const q = searchParams?.q?.toLowerCase() || "";
  const couleur = searchParams?.couleur?.toLowerCase() || "tous";

  const safeQ = q.replace(/[^a-zA-ZÀ-ÿ0-9 '-]/g, ""); // protection basique

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
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-rose-800">
        {safeQ ? `Résultats pour « ${safeQ} »` : "Nos Vins"}
      </h1>

      {/* Filtres par couleur */}
      <div className="flex gap-2 mb-6">
        {["Tous", "Rouge", "Blanc", "Rosé"].map((c) => {
          const cLower = c.toLowerCase();
          const isActive =
            searchParams?.couleur === cLower ||
            (!searchParams?.couleur && cLower === "tous");

          const href = new URLSearchParams();
          if (searchParams?.q) href.set("q", searchParams.q);
          if (cLower !== "tous") href.set("couleur", cLower);

          return (
            <Link
              key={c}
              href={`/vins?${href.toString()}`}
              className={`btn-filter ${isActive ? "btn-filter-active" : ""}`}
            >
              {c}
            </Link>
          );
        })}
      </div>

      {/* Affichage des résultats ou message vide */}
      {vins.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p>Aucun vin trouvé.</p>
          <Link href="/vins">
            <button className="btn mt-4">
              Réinitialiser la recherche
            </button>
          </Link>
        </div>
      ) : (
        <ul className="grid gap-4">
          {vins.map((vin) => (
            <li
              key={vin.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">
                <Link href={`/vins/${vin.id}`} className="hover:underline">
                  {vin.nom}
                </Link>
              </h2>
              <p className="text-gray-600">
                {vin.domaine} • {vin.année}
              </p>
              <p className="text-rose-600 font-bold mt-2">
                {vin.prix.toFixed(2)} €
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
