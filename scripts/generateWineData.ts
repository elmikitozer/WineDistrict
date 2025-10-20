// Script pour générer une base de données de vins réalistes pour le MVP
import fs from 'node:fs';
import path from 'node:path';

// Données réalistes de vins français
const regions = [
  {
    nom: 'Bordeaux',
    appellations: ['Margaux', 'Pauillac', 'Saint-Émilion', 'Pomerol', 'Sauternes'],
  },
  {
    nom: 'Bourgogne',
    appellations: ['Chablis', 'Gevrey-Chambertin', 'Meursault', 'Pommard', 'Beaune'],
  },
  {
    nom: 'Rhône',
    appellations: [
      'Châteauneuf-du-Pape',
      'Hermitage',
      'Côte-Rôtie',
      'Crozes-Hermitage',
      'Gigondas',
    ],
  },
  { nom: 'Loire', appellations: ['Sancerre', 'Pouilly-Fumé', 'Chinon', 'Vouvray', 'Muscadet'] },
  { nom: 'Alsace', appellations: ['Riesling', 'Gewurztraminer', 'Pinot Gris', 'Sylvaner'] },
  { nom: 'Champagne', appellations: ['Champagne'] },
];

const domaines = {
  Bordeaux: [
    'Château Lafite',
    'Château Latour',
    'Château Margaux',
    'Château Mouton',
    'Château Haut-Brion',
    'Château Pétrus',
    'Château Ausone',
    'Château Lynch-Bages',
  ],
  Bourgogne: [
    'Domaine de la Romanée-Conti',
    'Domaine Leflaive',
    'Domaine Coche-Dury',
    'Domaine Roumier',
    'Domaine Dujac',
    'Louis Jadot',
    'Joseph Drouhin',
  ],
  Rhône: [
    'Guigal',
    'Chapoutier',
    'Paul Jaboulet',
    'Domaine du Vieux Télégraphe',
    'Château Rayas',
    'Beaucastel',
  ],
  Loire: [
    'Didier Dagueneau',
    'François Cotat',
    'Domaine Huet',
    'Charles Joguet',
    'Domaine Vacheron',
  ],
  Alsace: ['Trimbach', 'Zind-Humbrecht', 'Weinbach', 'Hugel', 'Marcel Deiss'],
  Champagne: [
    'Krug',
    'Dom Pérignon',
    'Bollinger',
    'Pol Roger',
    'Ruinart',
    'Veuve Clicquot',
    'Moët & Chandon',
  ],
};

const cuvees = {
  rouge: ['Cuvée Prestige', 'Grande Réserve', 'Vieilles Vignes', 'Les Terrasses', 'Le Classique'],
  blanc: ['Cuvée Or', 'Les Pierres', 'Terroir Calcaire', 'Cuvée Tradition', 'Élégance'],
  rose: ['Rosé de Saignée', 'Été', 'Cœur de Rosé', 'Plaisir'],
};

function generateVins(count: number = 100) {
  const vins = [];
  const annees = [2018, 2019, 2020, 2021, 2022, 2023];

  for (let i = 0; i < count; i++) {
    // Choisir une région aléatoire
    const region = regions[Math.floor(Math.random() * regions.length)];
    const appellation = region.appellations[Math.floor(Math.random() * region.appellations.length)];
    const domainesList = domaines[region.nom as keyof typeof domaines];
    const domaine = domainesList[Math.floor(Math.random() * domainesList.length)];

    // Déterminer la couleur selon la région
    let couleur: 'rouge' | 'blanc' | 'rose';
    if (region.nom === 'Champagne') {
      couleur = 'blanc';
    } else if (region.nom === 'Alsace' || appellation === 'Chablis' || appellation === 'Sancerre') {
      couleur = 'blanc';
    } else if (Math.random() > 0.8) {
      couleur = 'rose';
    } else if (Math.random() > 0.4) {
      couleur = 'rouge';
    } else {
      couleur = 'blanc';
    }

    // Nom du vin (appellation ou cuvée)
    let nom = appellation;
    if (Math.random() > 0.5) {
      const cuvee = cuvees[couleur][Math.floor(Math.random() * cuvees[couleur].length)];
      nom = `${appellation} ${cuvee}`;
    }

    // Année
    const année = annees[Math.floor(Math.random() * annees.length)];

    // Prix (selon la région et l'appellation)
    let prix;
    if (region.nom === 'Champagne') {
      prix = 30 + Math.random() * 150;
    } else if (
      region.nom === 'Bourgogne' &&
      ['Romanée-Conti', 'Coche-Dury'].some((d) => domaine.includes(d))
    ) {
      prix = 100 + Math.random() * 500;
    } else if (
      region.nom === 'Bordeaux' &&
      ['Lafite', 'Latour', 'Margaux', 'Pétrus'].some((d) => domaine.includes(d))
    ) {
      prix = 150 + Math.random() * 400;
    } else {
      prix = 10 + Math.random() * 80;
    }
    prix = Math.round(prix * 2) / 2; // Arrondir à 0.5 près

    // Créer un slug unique
    const slug = `${nom.toLowerCase()}-${domaine.toLowerCase()}-${année}`
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    vins.push({
      slug,
      nom,
      domaine,
      année,
      prix,
      couleur,
      imageUrl: `/vins/${slug}.jpg`,
    });
  }

  return vins;
}

function generateCavistes(count: number = 20) {
  const villes = [
    { nom: 'Paris', arrondissements: ['6e', '11e', '18e', '5e', '9e', '17e'] },
    { nom: 'Lyon', quartiers: ['Vieux Lyon', "Presqu'île", 'Croix-Rousse', 'Part-Dieu'] },
    { nom: 'Marseille', quartiers: ['Vieux-Port', 'Cours Julien', 'Endoume', 'Prado'] },
    { nom: 'Bordeaux', quartiers: ['Saint-Pierre', 'Chartrons', 'Victoire', 'Bastide'] },
    { nom: 'Toulouse', quartiers: ['Capitole', 'Saint-Cyprien', 'Carmes', 'Jean-Jaurès'] },
  ];

  const nomsType = [
    'Cave',
    'Cellier',
    'Vin',
    'Vinothèque',
    'Chai',
    'Comptoir',
    'Tonneau',
    'Caveau',
    'Domaine',
    'Maison',
    'Cuvée',
  ];

  const suffixes = [
    'des Amis',
    'du Terroir',
    'de la Vigne',
    'Saint-Germain',
    'des Vignerons',
    'du Sommelier',
    'Noble',
    'Authentique',
    'du Coin',
    'de Bacchus',
    'des Saveurs',
    'Exquis',
  ];

  const cavistes = [];

  for (let i = 0; i < count; i++) {
    const ville = villes[Math.floor(Math.random() * villes.length)];
    const type = nomsType[Math.floor(Math.random() * nomsType.length)];
    const suffixe = suffixes[Math.floor(Math.random() * suffixes.length)];

    const nom = `${type} ${suffixe}`;
    const numero = Math.floor(Math.random() * 150) + 1;
    const rues = [
      'Rue de la Paix',
      'Avenue Victor Hugo',
      'Boulevard Haussmann',
      'Rue du Commerce',
      'Place de la République',
    ];
    const rue = rues[Math.floor(Math.random() * rues.length)];

    let adresse;
    if (ville.nom === 'Paris') {
      const arr = ville.arrondissements![Math.floor(Math.random() * ville.arrondissements!.length)];
      adresse = `${numero} ${rue}, ${arr} arrondissement, ${ville.nom}`;
    } else {
      const quartier = ville.quartiers![Math.floor(Math.random() * ville.quartiers!.length)];
      adresse = `${numero} ${rue}, ${quartier}, ${ville.nom}`;
    }

    const slug = nom
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    cavistes.push({
      slug,
      nom,
      adresse,
    });
  }

  return cavistes;
}

// Générer et sauvegarder
const vins = generateVins(150);
const cavistes = generateCavistes(25);

// Sauvegarder dans les fixtures
const fixturesDir = path.join(process.cwd(), 'prisma', 'fixtures');
fs.writeFileSync(path.join(fixturesDir, 'vins_generated.json'), JSON.stringify(vins, null, 2));
fs.writeFileSync(
  path.join(fixturesDir, 'cavistes_generated.json'),
  JSON.stringify(cavistes, null, 2)
);

console.log(`✅ Généré ${vins.length} vins`);
console.log(`✅ Généré ${cavistes.length} cavistes`);
console.log('\nFichiers créés:');
console.log('  - prisma/fixtures/vins_generated.json');
console.log('  - prisma/fixtures/cavistes_generated.json');
console.log('\nProchaines étapes:');
console.log('  1. Vérifier les données générées');
console.log('  2. Lancer: npx tsx scripts/seedGeneratedData.ts');
