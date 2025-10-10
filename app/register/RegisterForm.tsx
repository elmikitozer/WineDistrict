"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const disabled = useMemo(() => {
    return !password || password.length < 8 || password !== confirm || !token;
  }, [password, confirm, token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/register?token=${encodeURIComponent(token)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Inscriptison impossible");
      setSuccess(true);
      setTimeout(() => router.replace("/dashboard"), 800);
    } catch (err: any) {
      setError(err.message || "Erreur inattendue");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Création de compte caviste</h1>
      <p className="text-sm text-gray-600">Ce lien d'inscription est réservé aux cavistes et a été envoyé par email.</p>

      {error && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      {success && <div className="p-3 rounded bg-green-50 text-green-700 text-sm">Compte créé. Redirection…</div>}

      <form onSubmit={onSubmit} className="space-y-3">
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
          <label className="block text-sm">Confirmer le mot de passe</label>
          <input
            type="password"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-rose-300"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          disabled={disabled || submitting}
          className="bg-rose-600 text-white rounded-lg px-4 py-2 disabled:opacity-50"
        >
          {submitting ? "Création…" : "Créer mon compte"}
        </button>
      </form>
    </div>
  );
}
