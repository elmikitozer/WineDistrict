import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function resetIdsOneShot() {
  // Nettoyage dans l'ordre des FK
  await prisma.reservation.deleteMany({})
  await prisma.stock.deleteMany({})
  await prisma.caviste.deleteMany({})
  await prisma.vin.deleteMany({})

  // Réinsertion avec ID explicite
  const vins = [
    { id: 1, nom: "Château Margaux", domaine: "Margaux", année: 2018, prix: 320.0, couleur: "rouge" },
    { id: 2, nom: "Bourgogne Aligoté", domaine: "Domaine de la Soufrandière", année: 2021, prix: 18.5, couleur:"blanc" },
    { id: 3, nom: "Côtes du Rhône", domaine: "E. Guigal", année: 2020, prix: 12.0, couleur: "rouge" },
    { id: 4, nom: "Chablis Grand Cru", domaine: "Domaine William Fèvre", année: 2022, prix: 58.0, couleur: "blanc" },
    { id: 5, nom: "Crozes-Hermitage", domaine: "Alain Graillot", année: 2020, prix: 28.5, couleur: "rouge" },
    { id: 6, nom: "Tavel Rosé", domaine: "Château d'Aqueria", année: 2023, prix: 16.0, couleur: "rose" },
  ]

  for (const v of vins) {
    await prisma.vin.create({ data: v })
  }

  // Cavistes + stocks (on référence les IDs explicites)
  await prisma.caviste.create({
    data: {
      nom: "Cave Saint-Germain",
      adresse: "14 Rue de Seine, 75006 Paris",
      stocks: { create: [
        { vinId: 1, quantite: 2 },
        { vinId: 2, quantite: 12 },
        { vinId: 4, quantite: 6 },
      ] }
    }
  })

  await prisma.caviste.create({
    data: {
      nom: "Le Vin qui Parle",
      adresse: "42 Rue Faidherbe, 75011 Paris",
      stocks: { create: [
        { vinId: 3, quantite: 20 },
        { vinId: 2, quantite: 5 },
        { vinId: 5, quantite: 8 },
      ] }
    }
  })

  // (PostgreSQL/MySQL) — Réinitialise la séquence d'auto-incrément
  try {
    // PostgreSQL
    await prisma.$executeRawUnsafe(`
      SELECT setval(pg_get_serial_sequence('"Vin"', 'id'), (SELECT COALESCE(MAX(id),0) FROM "Vin"));
    `)
  } catch {}
  try {
    // MySQL/MariaDB
    await prisma.$executeRawUnsafe(`
      SET @next_id = (SELECT IFNULL(MAX(id),0) + 1 FROM Vin);
      SET @sql = CONCAT('ALTER TABLE Vin AUTO_INCREMENT = ', @next_id);
      PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
    `)
  } catch {}

  console.log("✅ IDs réinitialisés 1..6 (one-shot). Repasse ensuite au seed idempotent.")
}

resetIdsOneShot().finally(() => prisma.$disconnect())
