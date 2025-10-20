-- Migration manuelle : Ajouter les colonnes slug
-- À exécuter via Supabase SQL Editor ou psql

-- Ajouter la colonne slug à Caviste
ALTER TABLE "Caviste" ADD COLUMN IF NOT EXISTS "slug" TEXT;

-- Ajouter la colonne slug à Vin
ALTER TABLE "Vin" ADD COLUMN IF NOT EXISTS "slug" TEXT;

-- Note: Les contraintes UNIQUE seront ajoutées après génération des slugs
-- via le script generateSlugs.ts

