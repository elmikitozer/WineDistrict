import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Clock, Facebook, Instagram } from 'lucide-react';
import { getVinImageUrl } from '@/lib/vinImage';
import { getCurrentUser } from '@/lib/auth';
import FavoriteButton from '@/components/FavoriteButton';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: slugOrId } = await params;

  let cavisteId: number;

  if (/^\d+$/.test(slugOrId)) {
    cavisteId = Number(slugOrId);
  } else {
    const segments = slugOrId.split('-');
    const lastSegment = segments[segments.length - 1];
    cavisteId = Number(lastSegment);

    if (isNaN(cavisteId)) {
      return { title: 'Caviste introuvable | Wine District' };
    }
  }

  const caviste = await prisma.caviste.findUnique({
    where: { id: cavisteId },
    select: { nom: true, adresse: true, description: true },
  });

  if (!caviste) {
    return { title: 'Caviste introuvable | Wine District' };
  }

  const title = `${caviste.nom} — Caviste à Paris | Wine District`;
  const description =
    caviste.description ||
    `Découvrez ${caviste.nom}, caviste situé ${caviste.adresse}. Trouvez vos vins préférés et réservez en ligne.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CavisteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: slugOrId } = await params;

  // Extraire l'ID du paramètre
  let cavisteId: number;
  let shouldRedirect = false;

  if (/^\d+$/.test(slugOrId)) {
    // Ancien format : ID numérique uniquement
    cavisteId = Number(slugOrId);
    shouldRedirect = true;
  } else {
    // Nouveau format : slug-id
    const segments = slugOrId.split('-');
    const lastSegment = segments[segments.length - 1];
    cavisteId = Number(lastSegment);

    if (isNaN(cavisteId)) {
      return notFound();
    }
  }

  // Récupérer le caviste
  const caviste = await prisma.caviste.findUnique({
    where: { id: cavisteId },
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
  });

  if (!caviste) return notFound();

  // Redirection 301 si ancien format
  if (shouldRedirect && caviste.slug) {
    redirect(`/cavistes/${caviste.slug}`);
  }

  // Vérifier si l'utilisateur est connecté et si le caviste est dans ses favoris
  const user = await getCurrentUser();
  const isFavorite = user
    ? await prisma.favorisCaviste.findUnique({
        where: {
          favoris_unique: {
            userId: String(user.id),
            cavisteId: caviste.id,
          },
        },
      })
    : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-600 to-rose-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-4">{caviste.nom}</h1>
              <div className="flex items-center gap-2 text-rose-100 mb-4">
                <MapPin className="w-5 h-5" />
                <p className="text-lg">{caviste.adresse}</p>
              </div>
              {caviste.description && (
                <p className="text-rose-50 text-lg leading-relaxed max-w-2xl">
                  {caviste.description}
                </p>
              )}
            </div>

            {/* Bouton Favori */}
            {user && <FavoriteButton cavisteId={caviste.id} initialIsFavorite={!!isFavorite} />}
          </div>
        </div>
      </div>

      {/* Image principale */}
      {caviste.imageUrl && (
        <div className="max-w-6xl mx-auto px-6 -mt-8">
          <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={caviste.imageUrl} alt={caviste.nom} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vins disponibles */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vins disponibles ({caviste.stocks.length})
              </h2>

              {caviste.stocks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucun vin disponible pour le moment.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {caviste.stocks.map((stock) => {
                    const vin = stock.vin;
                    const vinImage = getVinImageUrl(vin);
                    const vinUrl = vin.slug ? `/vins/${vin.slug}` : `/vins/${vin.id}`;

                    return (
                      <Link
                        key={stock.id}
                        href={vinUrl}
                        className="flex gap-4 p-4 border rounded-lg hover:shadow-md transition group"
                      >
                        <div className="relative w-20 h-28 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image
                            src={vinImage}
                            alt={vin.nom}
                            fill
                            sizes="80px"
                            className="object-contain p-1"
                            unoptimized
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition truncate">
                            {vin.nom}
                          </h3>
                          <p className="text-sm text-gray-600 truncate">{vin.domaine}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {vin.année} • <span className="capitalize">{vin.couleur}</span>
                          </p>
                          <p className="text-lg font-bold text-rose-600 mt-2">
                            {vin.prix.toFixed(2)} €
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informations de contact */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Informations</h3>

              <div className="space-y-4">
                {caviste.telephone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Téléphone</p>
                      <a
                        href={`tel:${caviste.telephone}`}
                        className="text-sm text-gray-900 hover:text-rose-600"
                      >
                        {caviste.telephone}
                      </a>
                    </div>
                  </div>
                )}

                {caviste.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a
                        href={`mailto:${caviste.email}`}
                        className="text-sm text-gray-900 hover:text-rose-600 break-all"
                      >
                        {caviste.email}
                      </a>
                    </div>
                  </div>
                )}

                {caviste.siteWeb && (
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Site web</p>
                      <a
                        href={caviste.siteWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-rose-600 hover:text-rose-800 break-all"
                      >
                        Visiter le site
                      </a>
                    </div>
                  </div>
                )}

                {caviste.horaires && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Horaires</p>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {caviste.horaires}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Réseaux sociaux */}
            {(caviste.facebook || caviste.instagram) && (
              <section className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Réseaux sociaux</h3>

                <div className="space-y-3">
                  {caviste.facebook && (
                    <a
                      href={caviste.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition"
                    >
                      <Facebook className="w-5 h-5" />
                      <span className="text-sm">Facebook</span>
                    </a>
                  )}

                  {caviste.instagram && (
                    <a
                      href={caviste.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
                    >
                      <Instagram className="w-5 h-5" />
                      <span className="text-sm">Instagram</span>
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Adresse */}
            <section className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Adresse</h3>
              <p className="text-sm text-gray-700 mb-4">{caviste.adresse}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  caviste.adresse
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-rose-600 hover:text-rose-800"
              >
                <MapPin className="w-4 h-4" />
                Voir sur Google Maps
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
