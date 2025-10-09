'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto max-w-6xl p-10 text-center text-gray-600">
      Une erreur est survenue sur cette fiche vin.
      <div className="mt-4 flex items-center justify-center gap-3">
        <button onClick={reset} className="rounded-md bg-rose-600 px-4 py-2 text-white hover:bg-rose-700 transition">
          Réessayer
        </button>
        <a href="/vins" className="rounded-md border px-4 py-2 hover:bg-rose-50 transition">Retour aux vins</a>
      </div>
    </main>
  );
}
