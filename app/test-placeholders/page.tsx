import Image from 'next/image';
import Link from 'next/link';

export default function TestPlaceholdersPage() {
  const exempleVin = {
    nom: 'Château Margaux',
    domaine: 'Margaux',
    annee: '2018',
    couleur: 'rouge',
  };

  const designs = [
    {
      id: '1',
      nom: 'Elegant Minimal',
      description:
        'Design épuré et moderne, typographie légère, parfait pour une esthétique contemporaine.',
      category: 'Minimaliste',
    },
    {
      id: '2',
      nom: 'Minimalist Modern',
      description: 'Style ultra-minimaliste avec typographie très large et lignes épurées.',
      category: 'Minimaliste',
    },
    {
      id: '3',
      nom: 'Clean Typography',
      description: 'Focus sur la typographie classique avec séparateurs élégants et cercles.',
      category: 'Minimaliste',
    },
    {
      id: '4',
      nom: 'Minimalist Luxury',
      description:
        'Style luxe minimaliste sur fond noir avec lignes verticales et typographie espacée.',
      category: 'Minimaliste',
    },
    {
      id: '5',
      nom: 'Elegant Simple',
      description: 'Design simple et élégant avec cercle décoratif et gradient vertical.',
      category: 'Minimaliste',
    },
    {
      id: '6',
      nom: 'Vintage Rouge',
      description: 'Style vintage spécialement conçu pour les vins rouges avec ornements dorés.',
      category: 'Vintage',
    },
    {
      id: '7',
      nom: 'Vintage Blanc',
      description:
        'Style vintage pour vins blancs avec tons bleus et argentés, ornements en étoiles.',
      category: 'Vintage',
    },
    {
      id: '8',
      nom: 'Vintage Rose',
      description: 'Style vintage pour vins rosés avec tons roses et ornements en cœurs.',
      category: 'Vintage',
    },
    {
      id: '9',
      nom: 'Vintage Classic',
      description: 'Style vintage classique universel avec parchemin et ornements traditionnels.',
      category: 'Vintage',
    },
    {
      id: '10',
      nom: 'Vintage Elegant',
      description: 'Style vintage élégant sur fond sombre avec cercle doré et ornements raffinés.',
      category: 'Vintage',
    },
  ];

  const couleurs = ['rouge', 'blanc', 'rose'];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Aperçu des 10 designs de placeholders
          </h1>
          <p className="text-lg text-gray-600">
            Comparez les designs minimalistes et vintage pour choisir votre préféré
          </p>
        </header>

        {/* Designs Minimalistes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Designs Minimalistes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs
              .filter((d) => d.category === 'Minimaliste')
              .map((design) => {
                const params = new URLSearchParams({
                  nom: exempleVin.nom,
                  domaine: exempleVin.domaine,
                  annee: exempleVin.annee,
                  couleur: exempleVin.couleur,
                  variant: design.id,
                });

                return (
                  <div key={design.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <Image
                        src={`/api/wine-placeholder?${params.toString()}`}
                        alt={design.nom}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Description */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{design.nom}</h3>
                        <span className="text-sm font-mono text-gray-500">#{design.id}</span>
                      </div>
                      <p className="text-sm text-gray-600">{design.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Designs Vintage */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🏛️ Designs Vintage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs
              .filter((d) => d.category === 'Vintage')
              .map((design) => {
                const params = new URLSearchParams({
                  nom: exempleVin.nom,
                  domaine: exempleVin.domaine,
                  annee: exempleVin.annee,
                  couleur: exempleVin.couleur,
                  variant: design.id,
                });

                return (
                  <div key={design.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <Image
                        src={`/api/wine-placeholder?${params.toString()}`}
                        alt={design.nom}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    {/* Description */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{design.nom}</h3>
                        <span className="text-sm font-mono text-gray-500">#{design.id}</span>
                      </div>
                      <p className="text-sm text-gray-600">{design.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>

        {/* Test avec différentes couleurs */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu selon la couleur du vin</h2>

          {couleurs.map((couleur) => (
            <div key={couleur} className="mb-12 last:mb-0">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 capitalize">
                Vins {couleur}s
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {designs.map((design) => {
                  const params = new URLSearchParams({
                    nom: exempleVin.nom,
                    domaine: exempleVin.domaine,
                    annee: exempleVin.annee,
                    couleur,
                    variant: design.id,
                  });

                  return (
                    <div key={design.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={`/api/wine-placeholder?${params.toString()}`}
                          alt={`${design.nom} - ${couleur}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="text-xs text-gray-600">{design.nom}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Comment choisir votre design
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Regardez tous les designs ci-dessus</li>
            <li>Notez le numéro du design que vous préférez (1 à 5)</li>
            <li>
              Pour l&apos;appliquer : modifiez{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">lib/vinImage.ts</code> et
              ajoutez <code className="bg-blue-100 px-2 py-1 rounded text-sm">&variant=X</code> dans
              l&apos;URL du placeholder
            </li>
          </ol>
        </div>

        {/* Retour à l'accueil */}
        <div className="mt-8 text-center">
          <Link
            href="/vins"
            className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition"
          >
            ← Retour aux vins
          </Link>
        </div>
      </div>
    </main>
  );
}
