/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Vin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Vin" DROP COLUMN "imageUrl",
ADD COLUMN     "imageFile" TEXT;
