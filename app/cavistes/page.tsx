'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
  imageUrl?: string | null;
  stocks: Stock[];
};

export default function CavistesPage() {
  const [cavistes, setCavistes] = useState<Caviste[]>([]);

  useEffect(() => {
    fetch('/api/cavistes')
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
          const cavisteUrl = caviste.slug ? `/cavistes/${caviste.slug}` : `/cavistes/${caviste.id}`;

          const cavisteImageUrl =
            caviste.imageUrl || `/api/caviste-placeholder?nom=${encodeURIComponent(caviste.nom)}`;

          return (
            <section
              key={caviste.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
            <div className="flex gap-6 mb-6 items-start">
              {/* Infos caviste */}
              <div className="flex-1">
                <Link
                  href={cavisteUrl}
                  className="text-xl font-semibold text-gray-800 hover:text-rose-600 transition"
                >
                  {caviste.nom}
                </Link>
                <p className="text-sm text-gray-500 mt-1">{caviste.adresse}</p>
              </div>
              
              {/* Image caviste à droite */}
              <Link href={cavisteUrl} className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={cavisteImageUrl}
                    alt={caviste.nom}
                    fill
                    sizes="128px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </Link>
            </div>

              {caviste.stocks.length === 0 ? (
                <p className="text-sm text-gray-400 italic">Aucun vin répertorié pour le moment.</p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {caviste.stocks.map((stock) => (
                    <li key={stock.id} className="flex items-center justify-between py-3 text-sm">
                      {/* Nom + millésime */}
                      <div className="text-left">
                        <span className="font-medium text-gray-900">{stock.vin.nom}</span>{' '}
                        <span className="text-gray-500 italic">({stock.vin.année})</span>
                      </div>

                      {/* Prix */}
                      <div className="text-rose-600 font-semibold tabular-nums">
                        {stock.vin.prix.toFixed(2).replace('.', ',')} €
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
