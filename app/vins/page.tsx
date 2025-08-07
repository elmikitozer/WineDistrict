// // app/vins/page.tsx
// export const dynamic = "force-dynamic"; // Nécessaire pour lire searchParams

// import { prisma } from "@/lib/prisma";
// import Link from "next/link";

// export default async function PageVins({
//   searchParams,
// }: {
//   searchParams?: { q?: string };
// }) {
//   const q = searchParams?.q?.toLowerCase() || "";

//   const vins = await prisma.vin.findMany({
//     where: q
//       ? {
//           OR: [
//             { nom: { contains: q, mode: "insensitive" } },
//             { domaine: { contains: q, mode: "insensitive" } },
//           ],
//         }
//       : undefined,
//     orderBy: { nom: "asc" },
//   });

//   return (
//     <main className="p-10">
//       <h1 className="text-3xl font-bold mb-6 text-rose-800">
//         {q ? `Résultats pour « ${q} »` : "Nos Vins"}
//       </h1>

//       {vins.length === 0 ? (
//         <p className="text-gray-500">Aucun vin trouvé.</p>
//       ) : (
//         <ul className="grid gap-4">
//           {vins.map((vin) => (
//             <li
//               key={vin.id}
//               className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
//             >
//               <h2 className="text-xl font-semibold">
//                 <Link href={`/vins/${vin.id}`} className="hover:underline">
//                   {vin.nom}
//                 </Link>
//               </h2>
//               <p className="text-gray-600">
//                 {vin.domaine} • {vin.année}
//               </p>
//               <p className="text-rose-600 font-bold mt-2">{vin.prix} €</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
// }


export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Vin {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
}

export default async function PageVins({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const q = searchParams?.q?.toLowerCase() || "";
  const safeQ = q.replace(/[^a-zA-ZÀ-ÿ0-9 '-]/g, ""); // protection basique

  let vins: Vin[] = [];

  if (safeQ.length > 0) {
    vins = await prisma.$queryRawUnsafe<Vin[]>(`
      SELECT id, nom, domaine, année, prix
      FROM "Vin"
      WHERE unaccent(nom) ILIKE unaccent('%${safeQ}%')
         OR unaccent(domaine) ILIKE unaccent('%${safeQ}%')
      ORDER BY nom ASC
    `);
  } else {
    vins = await prisma.vin.findMany({ orderBy: { nom: "asc" } });
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-rose-800">
        {safeQ ? `Résultats pour « ${safeQ} »` : "Nos Vins"}
      </h1>

      {vins.length === 0 ? (
        <p className="text-gray-500">Aucun vin trouvé.</p>
      ) : (
        <ul className="grid gap-4">
          {vins.map((vin) => (
            <li
              key={vin.id}
              className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">
                <Link href={`/vins/${vin.id}`} className="hover:underline">
                  {vin.nom}
                </Link>
              </h2>
              <p className="text-gray-600">
                {vin.domaine} • {vin.année}
              </p>
              <p className="text-rose-600 font-bold mt-2">
                {vin.prix.toFixed(2)} €
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
