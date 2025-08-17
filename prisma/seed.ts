import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Nettoyage avant de re-créer
  await prisma.reservation.deleteMany({});
  await prisma.stock.deleteMany({});
  await prisma.caviste.deleteMany({});
  await prisma.vin.deleteMany({});

  // Création des vins
  const vins = await prisma.vin.createMany({
    data: [
      { nom: "Château Margaux", domaine: "Margaux", année: 2018, prix: 320.0, couleur: "rouge" },
      { nom: "Bourgogne Aligoté", domaine: "Domaine de la Soufrandière", année: 2021, prix: 18.5, couleur:"blanc" },
      { nom: "Côtes du Rhône", domaine: "E. Guigal", année: 2020, prix: 12.0, couleur: "rouge" },
      { nom: "Chablis Grand Cru", domaine: "Domaine William Fèvre", année: 2022, prix: 58.0, couleur: "blanc" },
      { nom: "Crozes-Hermitage", domaine: "Alain Graillot", année: 2020, prix: 28.5, couleur: "rouge" },
      { nom: "Tavel Rosé", domaine: "Château d'Aqueria", année: 2023, prix: 16.0, couleur: "rose" }
    ],
  });

  // Récupération des vins avec leurs IDs (nécessaire après createMany)
  const allVins = await prisma.vin.findMany();

  // Création des cavistes + stocks
  await prisma.caviste.create({
    data: {
      nom: "Cave Saint-Germain",
      adresse: "14 Rue de Seine, 75006 Paris",
      stocks: {
        create: [
          { vinId: allVins[0].id, quantite: 2 },
          { vinId: allVins[1].id, quantite: 12 },
          { vinId: allVins[3].id, quantite: 6 }
        ]
      }
    }
  });

  await prisma.caviste.create({
    data: {
      nom: "Le Vin qui Parle",
      adresse: "42 Rue Faidherbe, 75011 Paris",
      stocks: {
        create: [
          { vinId: allVins[2].id, quantite: 20 },
          { vinId: allVins[1].id, quantite: 5 },
          { vinId: allVins[4].id, quantite: 8 }
        ]
      }
    }
  });

  console.log("✅ Base de données remplie avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur dans le seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
