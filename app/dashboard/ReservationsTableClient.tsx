'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ReservationStatusControl from './ReservationStatusControl';

type ReservationItem = {
  id: string;
  date: string;
  status: 'en_attente' | 'confirmee' | 'annulee';
  vin: {
    nom: string;
    domaine: string;
    année: number;
  };
  user?: {
    email: string;
    nom?: string | null;
    prenom?: string | null;
    telephone?: string | null;
  } | null;
};

function statusBadgeClass(s: string) {
  switch (s) {
    case 'confirmee':
      return 'bg-green-100 text-green-800';
    case 'annulee':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-amber-100 text-amber-800';
  }
}

export default function ReservationsTableClient() {
  const [items, setItems] = useState<ReservationItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const status = params.get('status') ?? '';

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (status && ['en_attente', 'confirmee', 'annulee'].includes(status)) sp.set('status', status);
    if (q && q.trim()) sp.set('q', q.trim());
    return sp.toString();
  }, [q, status]);

  const fetchData = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/dashboard/reservations${query ? `?${query}` : ''}`, {
          method: 'GET',
          cache: 'no-store',
          signal,
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(data.error || `Erreur ${res.status}`);
        }
        const data = (await res.json()) as { items: ReservationItem[] };
        setItems(data.items);
      } catch (e: unknown) {
        if (
          e &&
          typeof e === 'object' &&
          'name' in e &&
          (e as { name?: string }).name === 'AbortError'
        )
          return;
        const msg = e instanceof Error ? e.message : 'Erreur inattendue';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  useEffect(() => {
    const ctrl = new AbortController();
    fetchData(ctrl.signal);
    return () => ctrl.abort();
  }, [fetchData]);

  useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener('dashboard:refresh', handler);
    return () => window.removeEventListener('dashboard:refresh', handler);
  }, [fetchData]);

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
          <th className="text-left px-4 py-3">Nom</th>
          <th className="text-left px-4 py-3">Prénom</th>
          <th className="text-left px-4 py-3">Téléphone</th>
          <th className="text-left px-4 py-3">Date</th>
          <th className="text-left px-4 py-3">Statut</th>
          <th className="text-left px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => {
          return (
            <tr key={r.id} className="border-t">
              <td className="px-4 py-3 font-medium">{r.vin.nom}</td>
              <td className="px-4 py-3">{r.vin.domaine}</td>
              <td className="px-4 py-3">{r.vin.année}</td>
              <td className="px-4 py-3">
                {r.user?.nom || <span className="text-gray-400 italic">-</span>}
              </td>
              <td className="px-4 py-3">
                {r.user?.prenom || <span className="text-gray-400 italic">-</span>}
              </td>
              <td className="px-4 py-3">
                {r.user?.telephone ? (
                  <a
                    href={`tel:${r.user.telephone}`}
                    className="text-rose-600 hover:text-rose-800"
                  >
                    {r.user.telephone}
                  </a>
                ) : (
                  <span className="text-gray-400 italic">-</span>
                )}
              </td>
              <td className="px-4 py-3">{new Date(r.date).toLocaleString()}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-xs ${statusBadgeClass(r.status)}`}>
                  {r.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <ReservationStatusControl id={r.id} initialStatus={r.status} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
