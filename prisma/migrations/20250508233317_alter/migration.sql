/*
  Warnings:

  - You are about to drop the column `photo_url` on the `Pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pets" DROP COLUMN "photo_url",
ADD COLUMN     "photoUrl" TEXT;
