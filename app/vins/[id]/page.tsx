import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const vin = await prisma.vin.findUnique({
    where: { id: Number(params.id) },
    include: {
      stocks: {
        include: {
          caviste: true,
        },
      },
    },
  });

  if (!vin) return notFound();

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <Image
            src={`/vins/${vin.id}.png`}
            alt={`Photo de ${vin.nom}`}
            width={600}
            height={800}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-rose-800 mb-2">{vin.nom}</h1>
            <h2 className="text-xl text-gray-600 mb-4 italic">{vin.domaine}</h2>
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">{vin.année}</span>
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Prix conseillé :{" "}
              <span className="font-bold text-rose-600">{vin.prix.toFixed(2).replace(".", ",")} €</span>
            </p>
            {vin.couleur && (
              <p className="text-gray-700 text-lg mt-2">
                Couleur :{" "}
                <span className="font-semibold capitalize">{vin.couleur}</span>
              </p>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Disponible chez :</h3>
            {vin.stocks.length === 0 ? (
              <p className="text-gray-500 italic">
                Aucun caviste ne propose actuellement ce vin.
              </p>
            ) : (
              <ul className="space-y-2">
                {vin.stocks.map((stock) => (
                  <li
                    key={stock.id}
                    className="bg-rose-50 border border-rose-200 rounded-md px-4 py-2"
                  >
                    <p className="font-semibold">{stock.caviste.nom}</p>
                    <p className="text-sm text-gray-600">
                      {stock.caviste.adresse}
                    </p>
                    <p className="text-sm text-gray-800 mt-1">
                      Quantité :{" "}
                      <span className="font-medium">{stock.quantite}</span>
                    </p>
                    {/* <Button onClick={() => handleReserve(cavisteId)}>Réserver chez ce caviste</Button> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Link
          href="/vins"
          className="text-sm text-rose-600 underline hover:text-rose-800 transition"
        >
          ← Retour à la liste des vins
        </Link>
      </div>
    </main>
  );
}
