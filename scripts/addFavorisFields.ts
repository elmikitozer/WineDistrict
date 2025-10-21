import { PrismaClient } from '@prisma/client';

// Utiliser DATABASE_URL normal (PgBouncer en mode session devrait accepter les DDL)
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Ajout des champs caviste et table FavorisCaviste...\n');

  try {
    // 1. Ajouter les nouveaux champs à Caviste
    console.log('📝 Ajout des champs à la table Caviste...');
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "Caviste"
      ADD COLUMN IF NOT EXISTS "description" TEXT,
      ADD COLUMN IF NOT EXISTS "telephone" VARCHAR(255),
      ADD COLUMN IF NOT EXISTS "email" VARCHAR(255),
      ADD COLUMN IF NOT EXISTS "horaires" TEXT,
      ADD COLUMN IF NOT EXISTS "siteWeb" VARCHAR(500),
      ADD COLUMN IF NOT EXISTS "facebook" VARCHAR(500),
      ADD COLUMN IF NOT EXISTS "instagram" VARCHAR(500),
      ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);
    `);
    console.log('✅ Champs Caviste ajoutés\n');

    // 2. Créer la table FavorisCaviste
    console.log('📝 Création de la table FavorisCaviste...');
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "FavorisCaviste" (
        "id" TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        "cavisteId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

        CONSTRAINT "FavorisCaviste_userId_fkey"
          FOREIGN KEY ("userId")
          REFERENCES "User"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,

        CONSTRAINT "FavorisCaviste_cavisteId_fkey"
          FOREIGN KEY ("cavisteId")
          REFERENCES "Caviste"("id")
          ON DELETE CASCADE
          ON UPDATE CASCADE,

        CONSTRAINT "favoris_unique" UNIQUE ("userId", "cavisteId")
      );
    `);
    console.log('✅ Table FavorisCaviste créée\n');

    // 3. Créer les index
    console.log('📝 Création des index...');
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "FavorisCaviste_userId_idx" ON "FavorisCaviste"("userId");
    `);
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "FavorisCaviste_cavisteId_idx" ON "FavorisCaviste"("cavisteId");
    `);
    console.log('✅ Index créés\n');

    console.log('✅ Migration terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
