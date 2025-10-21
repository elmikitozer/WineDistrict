'use client';
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignupContent() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Validation de l'email
  const emailError = useMemo(() => {
    if (!attemptedSubmit) return null;
    if (!email) return "L'email est requis";
    if (!email.includes('@')) return "L'email doit contenir un @";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Format d'email invalide";
    return null;
  }, [email, attemptedSubmit]);

  // Validation du mot de passe
  const passwordError = useMemo(() => {
    if (!attemptedSubmit) return null;
    if (!password) return 'Le mot de passe est requis';
    if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères';
    return null;
  }, [password, attemptedSubmit]);

  // Validation de la confirmation
  const confirmError = useMemo(() => {
    if (!attemptedSubmit) return null;
    if (!confirm) return 'La confirmation est requise';
    if (password !== confirm) return 'Les mots de passe ne correspondent pas';
    return null;
  }, [password, confirm, attemptedSubmit]);

  const disabled = useMemo(() => {
    return (
      !email || !email.includes('@') || !password || password.length < 8 || password !== confirm
    );
  }, [email, password, confirm]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttemptedSubmit(true);

    if (disabled) {
      // Afficher le premier message d'erreur trouvé (priorité : email > password > confirm)
      if (emailError) {
        setError(emailError);
      } else if (passwordError) {
        setError(passwordError);
      } else if (confirmError) {
        setError(confirmError);
      }
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/auth/register-client`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Inscription impossible');
      setSuccess(true);

      // Rediriger vers la page d'origine ou le dashboard
      const redirectTo = params?.get('redirect') || '/dashboard';
      setTimeout(() => {
        router.replace(redirectTo);
        router.refresh(); // Force le rafraîchissement pour mettre à jour la navbar
      }, 800);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      setSubmitting(false);
    }
  }

  function handleButtonClick() {
    setAttemptedSubmit(true);
    if (emailError) {
      setError(emailError);
    } else if (passwordError) {
      setError(passwordError);
    } else if (confirmError) {
      setError(confirmError);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Créer un compte</h1>
      <p className="text-sm text-gray-600">
        Inscription ouverte aux clients. Les cavistes doivent utiliser un lien d&apos;invitation.
      </p>

      {error && <div className="p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>}
      {success && (
        <div className="p-3 rounded bg-green-50 text-green-700 text-sm">
          Compte créé. Redirection…
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${
              emailError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-rose-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="text-xs text-red-600 mt-1">{emailError}</p>}
        </div>
        <div className="space-y-1">
          <label className="block text-sm">
            Mot de passe <span className="text-xs text-gray-500">(min. 8 caractères)</span>
          </label>
          <input
            type="password"
            className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${
              passwordError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-rose-300'
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
          {passwordError && <p className="text-xs text-red-600 mt-1">{passwordError}</p>}
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Confirmer le mot de passe</label>
          <input
            type="password"
            className={`border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 ${
              confirmError ? 'border-red-500 focus:ring-red-300' : 'focus:ring-rose-300'
            }`}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            minLength={8}
            required
          />
          {confirmError && <p className="text-xs text-red-600 mt-1">{confirmError}</p>}
        </div>
        <button
          type="submit"
          disabled={submitting}
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              handleButtonClick();
            }
          }}
          className="bg-rose-600 text-white rounded-lg px-4 py-2 disabled:opacity-50 hover:bg-rose-700 transition w-full"
        >
          {submitting ? 'Création…' : 'Créer mon compte'}
        </button>
        {disabled && attemptedSubmit && (
          <p className="text-xs text-gray-500 text-center">
            Veuillez corriger les erreurs ci-dessus pour continuer
          </p>
        )}
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-6">Chargement…</div>}>
      <SignupContent />
    </Suspense>
  );
}
