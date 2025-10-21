-- Migration: Ajouter les champs caviste et la table FavorisCaviste
-- À exécuter avec : psql $DIRECT_URL -f prisma/add_favoris_and_caviste_fields.sql

-- 1. Ajouter les nouveaux champs à la table Caviste
ALTER TABLE "Caviste" 
ADD COLUMN IF NOT EXISTS "description" TEXT,
ADD COLUMN IF NOT EXISTS "telephone" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "email" VARCHAR(255),
ADD COLUMN IF NOT EXISTS "horaires" TEXT,
ADD COLUMN IF NOT EXISTS "siteWeb" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "facebook" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "instagram" VARCHAR(500),
ADD COLUMN IF NOT EXISTS "imageUrl" VARCHAR(500);

-- 2. Créer la table FavorisCaviste
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

-- 3. Créer les index
CREATE INDEX IF NOT EXISTS "FavorisCaviste_userId_idx" ON "FavorisCaviste"("userId");
CREATE INDEX IF NOT EXISTS "FavorisCaviste_cavisteId_idx" ON "FavorisCaviste"("cavisteId");

-- 4. Vérification
SELECT 'Migration terminée avec succès' AS status;

