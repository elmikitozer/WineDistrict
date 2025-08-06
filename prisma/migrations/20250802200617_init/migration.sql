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

    CONSTRAINT "Vin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stock" (
    "id" SERIAL NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "vinId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
