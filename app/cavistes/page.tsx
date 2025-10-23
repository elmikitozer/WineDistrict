/**
 * Page Cavistes - Server Component avec pagination hybrid
 * 
 * 🎯 OBJECTIF : Afficher les cavistes avec pagination SEO-friendly + UX moderne
 * 
 * 📊 FONCTIONNEMENT :
 * 1. Charge les 12 premiers cavistes (Server Component)
 * 2. Passe au composant client CavistesGrid
 * 3. Le client peut charger plus de cavistes en AJAX
 */

import { prisma } from '@/lib/prisma';
import CavistesGrid from './CavistesGrid';

export const dynamic = 'force-dynamic';

type Vin = {
  id: number;
  nom: string;
  domaine: string;
  année: number;
  prix: number;
};

type Stock = {
  id: number;
  quantite: number;
  vin: Vin;
};

export type Caviste = {
  id: number;
  nom: string;
  adresse: string;
  slug: string | null;
  imageUrl: string | null;
  stocks: Stock[];
};

export default async function CavistesPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  
  // 📊 PAGINATION : 12 cavistes par page (taille idéale pour cavistes)
  const PER_PAGE = 12;
  const page = parseInt(sp.page ?? '1', 10);
  const skip = (page - 1) * PER_PAGE;

  // 🔍 CHARGER les cavistes avec leurs stocks
  const [cavistes, totalCavistes] = await Promise.all([
    prisma.caviste.findMany({
      skip,
      take: PER_PAGE,
      orderBy: { nom: 'asc' },
      include: {
        stocks: {
          include: {
            vin: true,
          },
          orderBy: {
            vin: {
              nom: 'asc',
            },
          },
        },
      },
    }),
    // Compter le total pour savoir s'il y a d'autres pages
    prisma.caviste.count(),
  ]);

  const hasMore = page * PER_PAGE < totalCavistes;

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-rose-900 mb-12 text-center tracking-tight">
        Nos cavistes partenaires
      </h1>

      {cavistes.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>Aucun caviste trouvé.</p>
        </div>
      ) : (
        <CavistesGrid
          initialCavistes={cavistes}
          currentPage={page}
          hasMore={hasMore}
          totalCavistes={totalCavistes}
        />
      )}
    </main>
  );
}
