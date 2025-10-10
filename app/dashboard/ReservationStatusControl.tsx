'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  id: string;
  initialStatus: 'en_attente' | 'confirmee' | 'annulee';
};

const statuses = [
  { value: 'en_attente', label: 'En attente' },
  { value: 'confirmee', label: 'Confirmée' },
  { value: 'annulee', label: 'Annulée' },
] as const;

export default function ReservationStatusControl({ id, initialStatus }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Props['initialStatus'];
    setStatus(next);
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Échec de la mise à jour');
      }
      // Refresh server-rendered data (stats) and notify client table to re-fetch immediately
      router.refresh();
      try {
        window.dispatchEvent(new Event('dashboard:refresh'));
      } catch {}
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <select
        className="border rounded px-2 py-1 text-sm"
        value={status}
        onChange={onChange}
        disabled={saving}
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      {saving && <span className="text-xs text-gray-500">Enregistrement…</span>}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
