// app/merci/page.tsx
import Link from "next/link";

export default async function Merci({
  searchParams,
}: {
  searchParams?: Promise<{ vin?: string; caviste?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const vin = sp.vin;
  const caviste = sp.caviste;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-rose-50 to-white">
      {/* Remplace 'animate-bounce' par notre animation custom, voir §2 */}
      <div className="animate-wine-bounce-twice text-5xl mb-6">🍷</div>

      <h1 className="text-3xl font-bold text-rose-800 mb-4">
        Merci pour votre réservation !
      </h1>

      {vin && caviste ? (
        <>
          <p className="text-gray-600 text-lg">
            Vous avez réservé le vin <span className="font-semibold">{vin}</span> chez{" "}
            <span className="font-semibold">{caviste}</span>.
          </p>
          <p className="text-sm mt-6 text-gray-400">
            Le caviste vous contactera dès que possible.
          </p>
        </>
      ) : (
        <p className="text-gray-600 text-lg">Votre demande a bien été prise en compte.</p>
      )}

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link href="/vins" className="btn bg-rose-600 text-white hover:bg-rose-700">
          Parcourir les vins
        </Link>
        <Link href="/cavistes" className="btn">Voir les cavistes</Link>
      </div>
    </main>
  );
}
