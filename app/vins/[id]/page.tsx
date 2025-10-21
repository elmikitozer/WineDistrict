import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CavistesModal from '@/components/CavistesModal';
import Image from 'next/image';
import Link from 'next/link';
import { getVinImageUrl } from '@/lib/vinImage';
import ClientWrapper from '@/components/ClientWrapper';
import ReservationConfirmation from '@/components/ReservationConfirmation';
import { getCurrentUser } from '@/lib/auth';

// 🧠 SEO dynamique par fiche vin
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: idOrSlug } = await params;

  // Extraire l'ID du paramètre
  let vinId: number;

  if (/^\d+$/.test(idOrSlug)) {
    // Ancien format : ID numérique uniquement (ex: "5")
    vinId = Number(idOrSlug);
  } else {
    // Nouveau format : slug-id (ex: "chateau-margaux-margaux-2018-rouge-5")
    // L'ID est le dernier segment après le dernier "-"
    const segments = idOrSlug.split('-');
    const lastSegment = segments[segments.length - 1];
    vinId = Number(lastSegment);

    if (isNaN(vinId)) {
      return { title: 'Vin introuvable | Wine District' };
    }
  }

  const vin = await prisma.vin.findUnique({
    where: { id: vinId },
    select: { nom: true, domaine: true, année: true, couleur: true, imageFile: true, slug: true },
  });

  if (!vin) {
    return { title: 'Vin introuvable | Wine District' };
  }

  const title = `${vin.nom} — ${vin.domaine} (${vin.année}) | Wine District`;
  const description = `Découvrez ${vin.nom} (${vin.couleur}) du domaine ${vin.domaine}. Trouvez un caviste partenaire à Paris.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/vins/${vin.slug}`, // ← URL canonique avec slug complet
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>; // Peut être un ID ou un slug complet (slug-id)
}) {
  const { id: idOrSlug } = await params;

  // Extraire l'ID du paramètre
  let vinId: number;
  let shouldRedirect = false;

  if (/^\d+$/.test(idOrSlug)) {
    // Ancien format : ID numérique uniquement (ex: "5")
    vinId = Number(idOrSlug);
    shouldRedirect = true; // On redirigera vers le slug complet
  } else {
    // Nouveau format : slug-id (ex: "chateau-margaux-margaux-2018-rouge-5")
    // L'ID est le dernier segment après le dernier "-"
    const segments = idOrSlug.split('-');
    const lastSegment = segments[segments.length - 1];
    vinId = Number(lastSegment);

    if (isNaN(vinId)) {
      return notFound();
    }
  }

  // Récupérer le vin avec le slug pour vérifier la redirection
  const vin = await prisma.vin.findUnique({
    where: { id: vinId },
    select: {
      id: true,
      slug: true,
      nom: true,
      domaine: true,
      année: true,
      prix: true,
      couleur: true,
      imageFile: true,
      stocks: {
        include: { caviste: true },
        orderBy: { quantite: 'desc' },
      },
    },
  });

  if (!vin) return notFound();

  // Redirection 301 si ancien format (ID seul) vers le nouveau format (slug complet)
  // Seulement si le vin a un slug valide
  if (shouldRedirect && vin.slug) {
    const { redirect } = await import('next/navigation');
    redirect(`/vins/${vin.slug}`);
  }

  const cavistes = vin.stocks;
  const nbCavistes = cavistes.length;
  // Générer l'URL de l'image (vraie image ou placeholder dynamique)
  const srcImageVin: string = getVinImageUrl(vin);
  
  // Vérifier si l'utilisateur est connecté
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  return (
    <>
      <ClientWrapper>
        <ReservationConfirmation />
      </ClientWrapper>
      <main className="max-w-6xl mx-auto py-16 px-6">
        {/* <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border bg-gray-50 shadow-sm">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={srcImageVin} // tu peux garder .png
                alt={`BIB de ${vin.nom}`}
                fill
                sizes="(max-width: 768px) 100vw, 520px" // ⬅️ critique pour ne pas sur-télécharger
                className="object-contain p-4"
                priority={false} // passe à true si l'image est au-dessus de la ligne de flottaison
                placeholder="empty" // (optionnel: on peut ajouter un blurDataURL plus tard)
              />
            </div>
            <span className="absolute bottom-3 right-3 bg-white/90 text-xs px-3 py-1 rounded-full shadow-sm text-gray-700">
              {vin.année}
            </span>
          </div>

          {/* Infos */}
          <div className="flex flex-col gap-8">
            <header>
              <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-rose-700 to-rose-500 bg-clip-text text-transparent">
                {vin.nom}
              </h1>
              <p className="text-lg italic text-gray-600">{vin.domaine}</p>
            </header>

            <section>
              <ul className="space-y-2 text-gray-700 text-base">
                <li>
                  <span className="font-medium text-gray-900">Millésime :</span> {vin.année}
                </li>
                {vin.couleur && (
                  <li>
                    <span className="font-medium text-gray-900">Couleur :</span>{' '}
                    <span className="capitalize">{vin.couleur}</span>
                  </li>
                )}
                <li>
                  <span className="font-medium text-gray-900">Prix conseillé :</span>{' '}
                  <span className="text-rose-700 font-semibold">
                    {vin.prix.toFixed(2).replace('.', ',')} €
                  </span>
                </li>
              </ul>
            </section>

            <section className="mt-6">
              {nbCavistes > 0 ? (
                <>
                  <p className="text-sm text-gray-500 mb-1">
                    Disponible chez {nbCavistes} caviste{nbCavistes > 1 && 's'} à Paris.
                  </p>
                  {vin.stocks.length > 0 && (
                    <p className="text-sm text-rose-700 font-medium mb-3">
                      Faites vite, il ne reste plus que {vin.stocks.length} caviste
                      {vin.stocks.length >= 2 ? 's' : ''} !
                    </p>
                  )}
                  <CavistesModal cavistes={cavistes} isAuthenticated={isAuthenticated} />
                </>
              ) : (
                <div className="rounded-xl border border-dashed border-gray-200 p-4 bg-gray-50">
                  <p className="text-gray-600">
                    Ce vin n’est actuellement proposé par aucun caviste.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      href="/cavistes"
                      className="inline-flex items-center rounded-md border px-4 py-2 text-sm hover:bg-rose-50 transition"
                    >
                      Voir tous les cavistes
                    </Link>
                    <Link
                      href="/vins"
                      className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-700 transition"
                    >
                      Parcourir d’autres vins
                    </Link>
                  </div>
                </div>
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
    </>
  );
}
