-- CreateTable
CREATE TABLE "public"."Reservation" (
    "id" TEXT NOT NULL,
    "vinId" INTEGER NOT NULL,
    "cavisteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'en_attente',

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
