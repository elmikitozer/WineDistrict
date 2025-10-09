"use client";

import { useEffect, useState } from "react";

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
  stocks: Stock[];
};

export default function CavistesPage() {
  const [cavistes, setCavistes] = useState<Caviste[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/cavistes", { cache: "no-store" });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (!cancelled) setError(body?.error || "Impossible de charger les cavistes.");
          return;
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          if (!cancelled) setError("Données inattendues renvoyées par le serveur.");
          return;
        }
        if (!cancelled) setCavistes(data);
      } catch (e) {
        if (!cancelled) setError("Impossible de charger les cavistes.");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-rose-900 mb-12 text-center tracking-tight">
        Nos cavistes partenaires
      </h1>

      {error && (
        <div className="mb-8 rounded-lg border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error} <span className="ml-2 text-gray-500">Réessayez plus tard.</span>
        </div>
      )}

      <div className="space-y-10">
        {cavistes.map((caviste) => (
          <section
            key={caviste.id}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {caviste.nom}
              </h2>
              <p className="text-sm text-gray-500">{caviste.adresse}</p>
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
        ))}
      </div>
    </main>
  );
}
