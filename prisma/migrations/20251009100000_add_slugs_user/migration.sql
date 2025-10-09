-- Add optional identifiers to Caviste and Vin
ALTER TABLE "Caviste"
  ADD COLUMN IF NOT EXISTS "publicId" text,
  ADD COLUMN IF NOT EXISTS "slug" text;

ALTER TABLE "Vin"
  ADD COLUMN IF NOT EXISTS "publicId" text,
  ADD COLUMN IF NOT EXISTS "slug" text;

-- Unique indexes (allow multiple NULLs by default in Postgres)
DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS caviste_publicid_unique ON "Caviste" ("publicId");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS caviste_slug_unique ON "Caviste" ("slug");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS vin_publicid_unique ON "Vin" ("publicId");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

DO $$ BEGIN
  CREATE UNIQUE INDEX IF NOT EXISTS vin_slug_unique ON "Vin" ("slug");
EXCEPTION WHEN duplicate_table THEN NULL; END $$;

-- Create User table for dashboard auth
CREATE TABLE IF NOT EXISTS "User" (
  "id" text PRIMARY KEY,
  "email" text UNIQUE NOT NULL,
  "passwordHash" text NOT NULL,
  "role" text NOT NULL DEFAULT 'CAVISTE',
  "cavisteId" integer REFERENCES "Caviste"("id") ON DELETE SET NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now()
);

-- Trigger to update updatedAt on User
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER user_set_updated_at
  BEFORE UPDATE ON "User"
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
