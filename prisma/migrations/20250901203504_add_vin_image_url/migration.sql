-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_cavisteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reservation" DROP CONSTRAINT "Reservation_vinId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stock" DROP CONSTRAINT "Stock_cavisteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Stock" DROP CONSTRAINT "Stock_vinId_fkey";

-- AlterTable
ALTER TABLE "public"."Vin" ADD COLUMN     "imageUrl" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Stock" ADD CONSTRAINT "Stock_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_vinId_fkey" FOREIGN KEY ("vinId") REFERENCES "public"."Vin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reservation" ADD CONSTRAINT "Reservation_cavisteId_fkey" FOREIGN KEY ("cavisteId") REFERENCES "public"."Caviste"("id") ON DELETE CASCADE ON UPDATE CASCADE;
