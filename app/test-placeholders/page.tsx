'use client';
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
    // Inspirés du Design #1 (Elegant Minimal)
    {
      id: '1',
      nom: 'Elegant Minimal',
      description:
        'Design épuré et moderne, typographie légère, parfait pour une esthétique contemporaine.',
      category: 'Inspiré du #1',
    },
    {
      id: '2',
      nom: 'Minimalist Clean',
      description: 'Style ultra-clean avec typographie très large et lignes épurées.',
      category: 'Inspiré du #1',
    },
    {
      id: '3',
      nom: 'Minimalist Bold',
      description: 'Approche minimaliste audacieuse avec cercle décoratif et typographie forte.',
      category: 'Inspiré du #1',
    },
    {
      id: '4',
      nom: 'Minimalist Geometric',
      description: "Formes géométriques minimalistes avec carré pour l'année.",
      category: 'Inspiré du #1',
    },
    {
      id: '5',
      nom: 'Minimalist Serif',
      description: 'Style minimaliste avec typographie serif et ornements classiques.',
      category: 'Inspiré du #1',
    },
    // Inspirés du Design #4 (Vintage)
    {
      id: '6',
      nom: 'Vintage Classic',
      description: 'Style vintage classique avec parchemin et ornements traditionnels.',
      category: 'Inspiré du #4',
    },
    {
      id: '7',
      nom: 'Vintage Elegant',
      description: 'Style vintage élégant sur fond sombre avec cercle doré.',
      category: 'Inspiré du #4',
    },
    {
      id: '8',
      nom: 'Vintage Rustic',
      description: 'Style vintage rustique avec tons terre et ornements médiévaux.',
      category: 'Inspiré du #4',
    },
    {
      id: '9',
      nom: 'Vintage Ornate',
      description: 'Style vintage orné avec fond parcheminé et ornements sophistiqués.',
      category: 'Inspiré du #4',
    },
    {
      id: '10',
      nom: 'Vintage Noble',
      description: 'Style vintage noble avec couronne et tons royaux.',
      category: 'Inspiré du #4',
    },
    // Designs complètement différents
    {
      id: '11',
      nom: 'Artistic',
      description: 'Design artistique avec formes organiques et rotation créative.',
      category: 'Créatif',
    },
    {
      id: '12',
      nom: 'Modern',
      description: 'Style moderne avec formes géométriques et mise en page asymétrique.',
      category: 'Créatif',
    },
    {
      id: '13',
      nom: 'Luxury',
      description: 'Design luxueux sur fond noir avec typographie ultra-élégante.',
      category: 'Créatif',
    },
    {
      id: '14',
      nom: 'Creative',
      description: 'Approche créative avec formes uniques et composition dynamique.',
      category: 'Créatif',
    },
    {
      id: '15',
      nom: 'Unique',
      description: 'Design unique avec gradient conique et formes asymétriques.',
      category: 'Créatif',
    },
  ];

  const couleurs = ['rouge', 'blanc', 'rose'];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Aperçu des 15 nouveaux designs de placeholders
          </h1>
          <p className="text-lg text-gray-600">
            Comparez les designs inspirés du #1, du #4 et les créations originales
          </p>
        </header>

        {/* Designs Inspirés du #1 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            ✨ Inspirés du Design #1 (Elegant Minimal)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs
              .filter((d) => d.category === 'Inspiré du #1')
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

        {/* Designs Inspirés du #4 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🏛️ Inspirés du Design #4 (Vintage)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs
              .filter((d) => d.category === 'Inspiré du #4')
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

        {/* Designs Créatifs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎨 Designs Créatifs Originaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designs
              .filter((d) => d.category === 'Créatif')
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

        {/* Aperçu par couleur */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu selon la couleur du vin</h2>

          {couleurs.map((couleur) => (
            <div key={couleur} className="mb-12 last:mb-0">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 capitalize">{couleur}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {designs.map((design) => {
                  const params = new URLSearchParams({
                    nom: exempleVin.nom,
                    domaine: exempleVin.domaine,
                    annee: exempleVin.annee,
                    couleur: couleur, // Utilise la couleur actuelle
                    variant: design.id,
                  });
                  return (
                    <div key={design.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="relative aspect-[3/4] bg-gray-100">
                        <Image
                          src={`/api/wine-placeholder?${params.toString()}`}
                          alt={`${design.nom} (${couleur})`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-800">{design.nom}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Instructions */}
        <section className="mt-12 p-8 bg-blue-50 rounded-2xl border border-blue-200">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Comment choisir et appliquer ?</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>
              Ouvrez cette page dans votre navigateur :{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                http://localhost:3000/test-placeholders
              </code>
            </li>
            <li>
              Comparez les designs et choisissez votre numéro préféré (ex: `1`, `6`, `11`, etc.)
            </li>
            <li>
              Pour l&apos;appliquer : modifiez{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">lib/vinImage.ts</code> et
              ajoutez <code className="bg-blue-100 px-2 py-1 rounded text-sm">&variant=X</code> dans
              l&apos;URL du placeholder
            </li>
            <li>
              Exemple pour le design 11 (Artistic) :
              <pre className="bg-blue-100 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>{`return \`/api/wine-placeholder?$\{params.toString()}&variant=11\`;`}</code>
              </pre>
            </li>
            <li>Redémarrez votre serveur de développement pour voir les changements appliqués.</li>
          </ol>
        </section>

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
