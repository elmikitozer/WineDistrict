-- Create missing authentication-related tables and constraints (idempotent)
-- Run this in Supabase SQL Editor if Studio shows errors for User/Client.

-- User table
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'CAVISTE',
  "cavisteId" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User" ("email");

-- Add FK to Caviste if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'User_cavisteId_fkey'
  ) THEN
    ALTER TABLE "User"
    ADD CONSTRAINT "User_cavisteId_fkey"
    FOREIGN KEY ("cavisteId") REFERENCES "Caviste"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Client table
CREATE TABLE IF NOT EXISTS "Client" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- Unique index on userId
CREATE UNIQUE INDEX IF NOT EXISTS "Client_userId_key" ON "Client" ("userId");

-- Add FK to User if missing
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Client_userId_fkey'
  ) THEN
    ALTER TABLE "Client"
    ADD CONSTRAINT "Client_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
