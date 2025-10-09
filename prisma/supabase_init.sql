-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."Caviste" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,

    CONSTRAINT "Caviste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vin" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "domaine" TEXT NOT NULL,
    "année" INTEGER NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "couleur" TEXT NOT NULL,
    "imageFile" TEXT,

    CONSTRAINT "Vin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stock" (
    "id" SERIAL NOT NULL,
    "vinId" INTEGER NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reservation" (
    "id" TEXT NOT NULL,
    "vinId" INTEGER NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'en_attente',

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caviste_nom_key" ON "public"."Caviste"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Vin_nom_domaine_année_key" ON "public"."Vin"("nom", "domaine", "année");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_cavisteId_vinId_key" ON "public"."Stock"("cavisteId", "vinId");

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

