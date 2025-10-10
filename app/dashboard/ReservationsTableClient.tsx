"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReservationStatusControl from "./ReservationStatusControl";

type ReservationItem = {
  id: string;
  date: string;
  status: "en_attente" | "confirmee" | "annulee" | (string & {});
  vin: {
    nom: string;
    domaine: string;
    année: number;
  };
};

function statusBadgeClass(s: string) {
  switch (s) {
    case "confirmee":
      return "bg-green-100 text-green-800";
    case "annulee":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

export default function ReservationsTableClient() {
  const [items, setItems] = useState<ReservationItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const status = params.get("status") ?? "";

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (status && ["en_attente", "confirmee", "annulee"].includes(status)) sp.set("status", status);
    if (q && q.trim()) sp.set("q", q.trim());
    return sp.toString();
  }, [q, status]);

  async function fetchData(signal?: AbortSignal) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/reservations${query ? `?${query}` : ""}`, {
        method: "GET",
        cache: "no-store",
        signal,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Erreur ${res.status}`);
      }
      const data = (await res.json()) as { items: ReservationItem[] };
      setItems(data.items);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(e.message || "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
    // re-fetch when filters change
  }, [query]);

  useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener("dashboard:refresh", handler);
    return () => window.removeEventListener("dashboard:refresh", handler);
  }, []);

  if (loading && !items) {
    return <p className="p-4 text-sm text-gray-600">Chargement…</p>;
  }
  if (error) {
    return <p className="p-4 text-sm text-red-600">{error}</p>;
  }
  if (!items || items.length === 0) {
    return <p className="p-4">Aucune réservation.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead className="bg-rose-50 text-rose-800">
        <tr>
          <th className="text-left px-4 py-3">Vin</th>
          <th className="text-left px-4 py-3">Domaine</th>
          <th className="text-left px-4 py-3">Année</th>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">Statut</th>
          <th className="text-left px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.id} className="border-t">
            <td className="px-4 py-3 font-medium">{r.vin.nom}</td>
            <td className="px-4 py-3">{r.vin.domaine}</td>
            <td className="px-4 py-3">{r.vin.année}</td>
            <td className="px-4 py-3">{new Date(r.date).toLocaleString()}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-1 rounded text-xs ${statusBadgeClass(r.status)}`}>{r.status}</span>
            </td>
            <td className="px-4 py-3">
              <ReservationStatusControl id={r.id} initialStatus={r.status as any} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
