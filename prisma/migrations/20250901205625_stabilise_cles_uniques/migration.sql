/*
  Warnings:

  - A unique constraint covering the columns `[nom]` on the table `Caviste` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cavisteId,vinId]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nom]` on the table `Vin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nom,domaine,année]` on the table `Vin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Caviste_nom_key" ON "public"."Caviste"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_cavisteId_vinId_key" ON "public"."Stock"("cavisteId", "vinId");

-- CreateIndex
CREATE UNIQUE INDEX "Vin_nom_key" ON "public"."Vin"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Vin_nom_domaine_année_key" ON "public"."Vin"("nom", "domaine", "année");
