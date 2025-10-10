-- CreateTable
CREATE TABLE "Caviste" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,

    CONSTRAINT "Caviste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vin" (
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
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "vinId" INTEGER NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "vinId" INTEGER NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'en_attente',

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'CAVISTE',
    "cavisteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Caviste_nom_key" ON "Caviste"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "Vin_nom_domaine_année_key" ON "Vin"("nom", "domaine", "année");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_cavisteId_vinId_key" ON "Stock"("cavisteId", "vinId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "Caviste"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

