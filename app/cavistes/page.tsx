"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Vin = {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
};

type Stock = {
  id: number;
  quantite: number;
  vin: Vin;
};

type Caviste = {
  id: number;
  nom: string;
  adresse: string;
  slug?: string | null;
  stocks: Stock[];
};

export default function CavistesPage() {
  const [cavistes, setCavistes] = useState<Caviste[]>([]);

  useEffect(() => {
    fetch("/api/cavistes")
      .then((res) => res.json())
      .then((data) => setCavistes(data));
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-rose-900 mb-12 text-center tracking-tight">
        Nos cavistes partenaires
      </h1>

      <div className="space-y-10">
        {cavistes.map((caviste) => {
          const cavisteUrl = caviste.slug 
            ? `/cavistes/${caviste.slug}` 
            : `/cavistes/${caviste.id}`;
          
          return (
          <section
            key={caviste.id}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <Link 
                  href={cavisteUrl}
                  className="text-xl font-semibold text-gray-800 hover:text-rose-600 transition"
                >
                  {caviste.nom}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{caviste.adresse}</p>
              </div>
              <Link
                href={cavisteUrl}
                className="text-sm text-rose-600 hover:text-rose-800 transition font-medium"
              >
                Voir la fiche →
              </Link>
            </div>

            {caviste.stocks.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                Aucun vin répertorié pour le moment.
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {caviste.stocks.map((stock) => (
                  <li
                    key={stock.id}
                    className="grid grid-cols-3 items-center py-3 text-sm"
                  >
                    {/* Colonne gauche → nom + millésime */}
                    <div className="text-left">
                      <span className="font-medium text-gray-900">
                        {stock.vin.nom}
                      </span>{" "}
                      <span className="text-gray-500 italic">
                        ({stock.vin.année})
                      </span>
                    </div>

                    {/* Colonne milieu → quantité, centrée */}
                    <div className="text-gray-600 tabular-nums text-center">
                      {stock.quantite} bouteille{stock.quantite > 1 ? "s" : ""}
                    </div>

                    {/* Colonne droite → prix, aligné à droite */}
                    <div className="text-rose-600 font-semibold tabular-nums text-right">
                      {stock.vin.prix.toFixed(2).replace(".", ",")} €
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
          );
        })}
      </div>
    </main>
  );
}
