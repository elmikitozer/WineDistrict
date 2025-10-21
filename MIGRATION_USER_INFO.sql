-- ============================================================
-- MIGRATION: Ajouter nom, prénom, téléphone à User
-- À exécuter dans Supabase SQL Editor
-- ============================================================

ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "nom" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "prenom" VARCHAR(255),
  ADD COLUMN IF NOT EXISTS "telephone" VARCHAR(255);

-- Vérification
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'User'
ORDER BY ordinal_position;

