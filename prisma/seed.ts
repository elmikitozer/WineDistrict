// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const VINS = [
  {
    nom: 'Château Margaux',
    domaine: 'Margaux',
    année: 2018,
    prix: 320.0,
    couleur: 'rouge',
    imageFile: null,
  },
  {
    nom: 'Bourgogne Aligoté',
    domaine: 'Domaine de la Soufrandière',
    année: 2021,
    prix: 18.5,
    couleur: 'blanc',
    imageFile: null,
  },
  {
    nom: 'Côtes du Rhône',
    domaine: 'E. Guigal',
    année: 2020,
    prix: 12.0,
    couleur: 'rouge',
    imageFile: '3.png',
  },
  {
    nom: 'Chablis Grand Cru',
    domaine: 'Domaine William Fèvre',
    année: 2022,
    prix: 58.0,
    couleur: 'blanc',
    imageFile: null,
  },
  {
    nom: 'Crozes-Hermitage',
    domaine: 'Alain Graillot',
    année: 2020,
    prix: 28.5,
    couleur: 'rouge',
    imageFile: '5.png',
  },
  {
    nom: 'Tavel Rosé',
    domaine: "Château d'Aqueria",
    année: 2023,
    prix: 16.0,
    couleur: 'rose',
    imageFile: '60.png',
  },
] as const;

const CAVISTES = [
  {
    nom: 'Cave Saint-Germain',
    adresse: '14 Rue de Seine, 75006 Paris',
    stocks: [
      { vin: { nom: 'Château Margaux', domaine: 'Margaux', année: 2018 }, quantite: 2 },
      {
        vin: { nom: 'Bourgogne Aligoté', domaine: 'Domaine de la Soufrandière', année: 2021 },
        quantite: 12,
      },
      {
        vin: { nom: 'Chablis Grand Cru', domaine: 'Domaine William Fèvre', année: 2022 },
        quantite: 6,
      },
    ],
  },
  {
    nom: 'Le Vin qui Parle',
    adresse: '42 Rue Faidherbe, 75011 Paris',
    stocks: [
      { vin: { nom: 'Côtes du Rhône', domaine: 'E. Guigal', année: 2020 }, quantite: 20 },
      {
        vin: { nom: 'Bourgogne Aligoté', domaine: 'Domaine de la Soufrandière', année: 2021 },
        quantite: 5,
      },
      { vin: { nom: 'Crozes-Hermitage', domaine: 'Alain Graillot', année: 2020 }, quantite: 8 },
    ],
  },
] as const;

async function upsertVins() {
  for (const v of VINS) {
    await prisma.vin.upsert({
      where: { vin_unique: { nom: v.nom, domaine: v.domaine, année: v.année } },
      update: { prix: v.prix, couleur: v.couleur, imageFile: v.imageFile },
      create: {
        nom: v.nom,
        domaine: v.domaine,
        année: v.année,
        prix: v.prix,
        couleur: v.couleur,
        imageFile: v.imageFile,
      },
    });
  }
}

// prisma/seed.ts (remplace entièrement upsertCavistesEtStocks)

async function upsertCavistesEtStocks() {
  for (const c of CAVISTES) {
    // 1) Trouver le caviste par nom (peu importe la forme de la contrainte unique)
    let cav = await prisma.caviste.findFirst({ where: { nom: c.nom } });

    // 2) Créer s'il n'existe pas, sinon mettre à jour (upsert manuel)
    if (!cav) {
      cav = await prisma.caviste.create({
        data: { nom: c.nom, adresse: c.adresse },
      });
    } else {
      cav = await prisma.caviste.update({
        where: { id: cav.id },
        data: { adresse: c.adresse },
      });
    }

    // 3) Remplacer les stocks de CE caviste uniquement (deterministe)
    await prisma.stock.deleteMany({ where: { cavisteId: cav.id } });

    // 4) Recréer les lignes de stock en connectant les vins de façon robuste
    for (const s of c.stocks) {
      // d’abord on tente la clé composite vin_unique si elle existe…
      let vin = await prisma.vin.findUnique({
        where: {
          vin_unique: { nom: s.vin.nom, domaine: s.vin.domaine, année: s.vin.année },
        } as any,
        select: { id: true },
      });
      // …sinon on retombe sur un findFirst équivalent
      if (!vin) {
        vin = await prisma.vin.findFirst({
          where: { nom: s.vin.nom, domaine: s.vin.domaine, année: s.vin.année },
          select: { id: true },
        });
      }
      if (!vin) {
        // si le vin n'existe pas encore, on le crée (idempotent avec les mêmes valeurs)
        const created = await prisma.vin.create({
          data: {
            nom: s.vin.nom,
            domaine: s.vin.domaine,
            année: s.vin.année,
            // valeurs par défaut si absentes dans ta liste VINS
            prix: 0,
            couleur: 'rouge',
            imageFile: null,
          },
          select: { id: true },
        });
        vin = created;
      }

      await prisma.stock.create({
        data: { cavisteId: cav.id, vinId: vin.id, quantite: s.quantite },
      });
    }
  }
}

async function main() {
  await upsertVins();
  await upsertCavistesEtStocks();
  console.log("✅ Seed idempotent terminé — plus d'IDs qui bougent");
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
