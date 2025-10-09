"use client";

import { useEffect, useState } from "react";

interface Caviste {
  id: number;
  nom: string;
  adresse: string;
}

interface Stock {
  id: number;
  vinId: number;
  caviste?: Caviste;
}

export default function CavistesModal({ cavistes }: { cavistes: Stock[] }) {
  const [open, setOpen] = useState(false);
  const [csrf, setCsrf] = useState<string | null>(null);
  const [csrfError, setCsrfError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // Récupère le token et pose le cookie wd_csrf
    (async () => {
      try {
        const res = await fetch("/api/csrf", { cache: "no-store" });
        if (!res.ok) throw new Error("CSRF fetch failed");
        const { csrfToken } = await res.json();
        setCsrf(csrfToken);
      } catch (e: any) {
        setCsrfError("Sécurisation indisponible, réessaie dans un instant.");
      }
    })();
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700"
      >
        Voir les cavistes
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-auto shadow-xl">
            <h2 className="text-xl font-bold mb-4">Cavistes disponibles</h2>

            {csrfError && (
              <p className="mb-3 text-sm text-red-600">{csrfError}</p>
            )}

            <ul className="space-y-4">
              {cavistes
                .filter((s) => s.caviste)
                .map((stock) => (
                  <li key={stock.id} className="border p-4 rounded-md">
                    <p className="font-medium text-gray-800">
                      {stock.caviste!.nom}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stock.caviste!.adresse}
                    </p>

                    <form action="/api/reservation" method="POST" className="mt-2">
                      <input type="hidden" name="vinId" value={stock.vinId} />
                      <input type="hidden" name="cavisteId" value={stock.caviste!.id} />
                      {/* 🔐 CSRF double-submit */}
                      <input type="hidden" name="_csrf" value={csrf ?? ""} />
                      <button
                        type="submit"
                        disabled={!csrf}
                        aria-disabled={!csrf}
                        className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-rose-700 disabled:opacity-50"
                        title={!csrf ? "Sécurisation en cours..." : "Réserver"}
                      >
                        {csrf ? "Réserver" : "Sécurisation…"}
                      </button>
                    </form>
                  </li>
                ))}
            </ul>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 text-sm text-gray-500 underline"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
