'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReservationStatusControl from './ReservationStatusControl';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

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

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalReservations: number;
  perPage: number;
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
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get('q') ?? '';
  const status = params.get('status') ?? '';
  const sortOrder = params.get('sortOrder') ?? 'desc';
  const page = parseInt(params.get('page') ?? '1', 10);

  const query = useMemo(() => {
    const sp = new URLSearchParams();
    if (status && ['en_attente', 'confirmee', 'annulee'].includes(status)) sp.set('status', status);
    if (q && q.trim()) sp.set('q', q.trim());
    if (sortOrder) sp.set('sortOrder', sortOrder);
    if (page > 1) sp.set('page', String(page));
    return sp.toString();
  }, [q, status, sortOrder, page]);

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
        const data = (await res.json()) as { items: ReservationItem[]; pagination: PaginationInfo };
        setItems(data.items);
        setPagination(data.pagination);
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

  // 📍 NAVIGATION PAGINATION
  const goToPage = (newPage: number) => {
    const sp = new URLSearchParams();
    if (status && ['en_attente', 'confirmee', 'annulee'].includes(status)) sp.set('status', status);
    if (q && q.trim()) sp.set('q', q.trim());
    if (sortOrder) sp.set('sortOrder', sortOrder);
    if (newPage > 1) sp.set('page', String(newPage));
    router.push(`/dashboard?${sp.toString()}`);
  };

  useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener('dashboard:refresh', handler);
    return () => window.removeEventListener('dashboard:refresh', handler);
  }, [fetchData]);

  if (loading && !items) {
    return <TableSkeleton rows={10} cols={9} />;
  }
  if (error) {
    return <p className="p-4 text-sm text-red-600">{error}</p>;
  }
  if (!items || items.length === 0) {
    return <p className="p-4">Aucune réservation.</p>;
  }

  return (
    <div>
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

      {/* 📍 CONTRÔLES DE PAGINATION */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between border-t pt-4">
          {/* Info */}
          <div className="text-sm text-gray-600">
            Page <span className="font-semibold">{pagination.currentPage}</span> sur{' '}
            <span className="font-semibold">{pagination.totalPages}</span> •{' '}
            <span className="font-semibold">{pagination.totalReservations}</span> réservation
            {pagination.totalReservations > 1 ? 's' : ''} au total
          </div>

          {/* Boutons */}
          <div className="flex items-center gap-2">
            {/* Précédent */}
            <button
              onClick={() => goToPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              ← Précédent
            </button>

            {/* Numéros de pages */}
            <div className="flex gap-1">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                // Afficher toutes les pages si < 7, sinon afficher intelligemment
                const showPage =
                  pagination.totalPages <= 7 ||
                  pageNum === 1 ||
                  pageNum === pagination.totalPages ||
                  Math.abs(pageNum - pagination.currentPage) <= 1;

                if (!showPage) {
                  // Afficher "..." une seule fois
                  if (
                    (pageNum === 2 && pagination.currentPage > 3) ||
                    (pageNum === pagination.totalPages - 1 &&
                      pagination.currentPage < pagination.totalPages - 2)
                  ) {
                    return (
                      <span key={pageNum} className="px-3 py-2 text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-2 rounded text-sm font-medium transition ${
                      pageNum === pagination.currentPage
                        ? 'bg-rose-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Suivant */}
            <button
              onClick={() => goToPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 border rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Suivant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
