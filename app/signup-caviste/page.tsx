'use client';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupCavistePage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cavisteId, setCavisteId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const disabled = useMemo(() => {
    return (
      process.env.NODE_ENV === 'production' ||
      !email ||
      !email.includes('@') ||
      !password ||
      password.length < 8 ||
      !cavisteId
    );
  }, [email, password, cavisteId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/register-caviste-dev`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          cavisteId: Number(cavisteId),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Inscription caviste impossible');
      setSuccess(true);
      setTimeout(() => router.replace('/dashboard'), 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Créer un compte caviste (dev)</h1>
      <p className="text-sm text-gray-600">
        Cette page est ouverte seulement en développement. En production, l&apos;inscription caviste
        est sur invitation.
      </p>

      {error && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      {success && (
        <div className="p-3 rounded bg-green-50 text-green-700 text-sm">
          Compte caviste créé. Redirection…
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-rose-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Mot de passe</label>
          <input
            type="password"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-rose-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Caviste ID</label>
          <input
            type="number"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-rose-300"
            value={cavisteId}
            onChange={(e) => setCavisteId(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={disabled || submitting}
          className="bg-rose-600 text-white rounded-lg px-4 py-2 disabled:opacity-50"
        >
          {submitting ? 'Création…' : 'Créer mon compte caviste (dev)'}
        </button>
      </form>
    </div>
  );
}
