import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CavistesModal from "@/components/CavistesModal";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params?.id);
  if (isNaN(id)) return notFound();

  const vin = await prisma.vin.findUnique({
    where: { id },
    include: {
      stocks: { include: { caviste: true } },
    },
  });

  if (!vin) return notFound();

  const cavistes = vin.stocks;
  const nbCavistes = cavistes.length;

  return (
    <main className="max-w-6xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Photo */}
        <div className="relative group">
          <Image
            src={`/vins/${vin.id}.png`}
            alt={`Bouteille de vin ${vin.nom}`}
            width={600}
            height={800}
            className="rounded-2xl shadow-lg object-cover w-full h-auto border border-gray-100 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 bg-white/90 text-xs px-3 py-1 rounded-full shadow-sm text-gray-700">
            {vin.année}
          </span>
        </div>

        {/* Infos */}
        <div className="flex flex-col gap-8">
          <header>
            <h1 className="text-4xl font-bold text-rose-800 tracking-tight mb-2">
              {vin.nom}
            </h1>
            <p className="text-lg italic text-gray-600">{vin.domaine}</p>
          </header>

          <section>
            <ul className="space-y-2 text-gray-700 text-base">
              <li>
                <span className="font-medium text-gray-900">Millésime :</span>{" "}
                {vin.année}
              </li>
              {vin.couleur && (
                <li>
                  <span className="font-medium text-gray-900">Couleur :</span>{" "}
                  <span className="capitalize">{vin.couleur}</span>
                </li>
              )}
              <li>
                <span className="font-medium text-gray-900">
                  Prix conseillé :
                </span>{" "}
                <span className="text-rose-700 font-semibold">
                  {vin.prix.toFixed(2).replace(".", ",")} €
                </span>
              </li>
            </ul>
          </section>

          <section className="mt-6">
            {nbCavistes > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-1">
                  Disponible chez {nbCavistes} caviste{nbCavistes > 1 && "s"} à
                  Paris.
                </p>
                {vin.stocks.length > 0 && (
                  <p className="text-sm text-rose-700 font-medium mb-3">
                    Faites vite, il ne reste plus que {vin.stocks.length}{" "}
                    caviste{vin.stocks.length >= 2 ? "s" : ""} !
                  </p>
                )}
                <CavistesModal cavistes={cavistes} />
              </>
            ) : (
              <p className="text-gray-400 italic">
                Ce vin n'est actuellement proposé par aucun caviste.
              </p>
            )}
          </section>

          <footer className="pt-4 border-t border-gray-100">
            <Link
              href="/vins"
              className="inline-flex items-center text-sm text-rose-600 hover:text-rose-800 transition"
            >
              <span className="mr-1">←</span> Retour à la sélection
            </Link>
          </footer>
        </div>
      </div>
    </main>
  );
}
