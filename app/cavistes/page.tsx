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

  useEffect(() => {
    fetch("/api/cavistes")
      .then((res) => res.json())
      .then((data) => setCavistes(data));
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Cavistes et leurs vins
      </h1>
      {cavistes.map((caviste) => (
        <div key={caviste.id} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {caviste.nom}
          </h2>
          <p>{caviste.adresse}</p>
          <ul>
            {caviste.stocks?.map((stock) => (
              <li key={stock.id}>
                {stock.vin.nom} ({stock.vin.année}) – {stock.quantite}{" "}
                bouteilles – {stock.vin.prix} €
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
