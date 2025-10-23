'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const statusOptions = [
  { value: '', label: 'Tous' },
  { value: 'en_attente', label: 'En attente' },
  { value: 'confirmee', label: 'Confirmée' },
  { value: 'annulee', label: 'Annulée' },
];

const sortOptions = [
  { value: 'desc', label: '🔽 Plus récentes' },
  { value: 'asc', label: '🔼 Plus anciennes' },
];

export default function Toolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const q = params.get('q') ?? '';
  const status = params.get('status') ?? '';
  const sortOrder = params.get('sortOrder') ?? 'desc';

  const update = useDebouncedCallback((key: string, value: string) => {
    const sp = new URLSearchParams(params.toString());
    if (value) {
      sp.set(key, value);
    } else {
      sp.delete(key);
    }
    const url = sp.toString() ? `${pathname}?${sp.toString()}` : pathname;
    router.replace(url);
    // Force a server refresh to ensure RSC data updates immediately
    router.refresh();
  }, 250);

  const handleExportCSV = async () => {
    try {
      const sp = new URLSearchParams(params.toString());
      sp.set('format', 'csv');
      const res = await fetch(`/api/dashboard/reservations/export?${sp.toString()}`);

      if (!res.ok) throw new Error("Erreur lors de l'export");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reservations-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erreur export CSV:', error);
      alert("Erreur lors de l'export CSV");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <div className="flex items-center gap-2 flex-wrap">
        <input
          value={q}
          onChange={(e) => update('q', e.target.value)}
          placeholder="Rechercher (vin, domaine)…"
          className="border rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <select
          value={status}
          onChange={(e) => update('status', e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {statusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => update('sortOrder', e.target.value)}
          className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleExportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center gap-2"
      >
        <span>📥</span>
        <span>Exporter CSV</span>
      </button>
    </div>
  );
}
