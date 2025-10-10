// app/vins/error.tsx
'use client';
import Link from 'next/link';

export default function Error() {
  return (
    <main className="mx-auto max-w-6xl p-10 text-center text-gray-600">
      Une erreur est survenue.{' '}
      <Link href="/vins" className="text-rose-700 underline">
        Réessayer
      </Link>
    </main>
  );
}
