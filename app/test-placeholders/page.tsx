'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function TestPlaceholdersPage() {
  const exempleVin = {
    nom: 'Château Margaux',
    domaine: 'Margaux',
    annee: '2018',
  };

  const couleurs = [
    { nom: 'Rouge', value: 'rouge', description: 'Vins rouges - Palette bordeaux et or' },
    { nom: 'Blanc', value: 'blanc', description: 'Vins blancs - Palette grise et or' },
    { nom: 'Rosé', value: 'rose', description: 'Vins rosés - Palette rose et corail' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Design #14 - Creative
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Aperçu de votre placeholder selon la couleur du vin
          </p>
          <p className="text-sm text-gray-500">
            Design avec formes géométriques (cercle, ligne, carré) et typographie moderne
          </p>
        </header>

        {/* Grille des 3 couleurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {couleurs.map((couleur) => {
            const params = new URLSearchParams({
              nom: exempleVin.nom,
              domaine: exempleVin.domaine,
              annee: exempleVin.annee,
              couleur: couleur.value,
              variant: '14', // Design Creative
            });

            return (
              <div key={couleur.value} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[3/4] bg-gray-100">
                  <Image
                    src={`/api/wine-placeholder?${params.toString()}`}
                    alt={`${couleur.nom} - ${exempleVin.nom}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Description */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{couleur.nom}</h3>
                  <p className="text-sm text-gray-600">{couleur.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Détails du design */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Caractéristiques du design</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Éléments visuels</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">●</span>
                  <span>Cercle, ligne horizontale et carré en rotation (45°)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">●</span>
                  <span>Nom du vin en typographie moderne (46px, uppercase)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">●</span>
                  <span>Domaine en italique (22px)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">●</span>
                  <span>Année dans forme organique asymétrique (140x140px)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Couleurs par type</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-red-900 mr-2 mt-0.5" />
                  <span><strong>Rouge :</strong> Fond bordeaux foncé, accent or (#D4AF37)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-gray-200 mr-2 mt-0.5" />
                  <span><strong>Blanc :</strong> Fond gris clair, accent or (#D4AF37)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-4 h-4 rounded-full bg-pink-200 mr-2 mt-0.5" />
                  <span><strong>Rosé :</strong> Fond rose pâle, accent corail (#FB7185)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-blue-50 rounded-2xl border border-blue-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Comment l'appliquer ?</h2>
          <ol className="list-decimal list-inside space-y-3 text-blue-800">
            <li>
              Le design #14 est déjà configuré dans votre code
            </li>
            <li>
              Pour l'activer, modifiez{' '}
              <code className="bg-blue-100 px-2 py-1 rounded text-sm">lib/vinImage.ts</code> ligne 54 :
              <pre className="bg-blue-100 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>{`return \`/api/wine-placeholder?$\{params.toString()}&variant=14\`;`}</code>
              </pre>
            </li>
            <li>
              Redémarrez votre serveur de développement : <code className="bg-blue-100 px-2 py-1 rounded text-sm">npm run dev</code>
            </li>
            <li>
              Les placeholders s'afficheront automatiquement pour tous les vins sans image
            </li>
          </ol>
        </section>

        {/* Exemples avec différents noms */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Exemples avec différents vins</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { nom: 'Pomerol', domaine: 'Château Pétrus', annee: '2015', couleur: 'rouge' },
              { nom: 'Chablis', domaine: 'William Fèvre', annee: '2022', couleur: 'blanc' },
              { nom: 'Tavel', domaine: "Château d'Aqueria", annee: '2023', couleur: 'rose' },
            ].map((vin, idx) => {
              const params = new URLSearchParams({
                nom: vin.nom,
                domaine: vin.domaine,
                annee: vin.annee,
                couleur: vin.couleur,
                variant: '14',
              });

              return (
                <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={`/api/wine-placeholder?${params.toString()}`}
                      alt={`${vin.nom} - ${vin.domaine}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-gray-800">{vin.nom}</p>
                    <p className="text-sm text-gray-600">{vin.domaine} - {vin.annee}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/vins"
            className="inline-block bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition font-medium shadow-lg"
          >
            ← Retour aux vins
          </Link>
        </div>
      </div>
    </main>
  );
}
