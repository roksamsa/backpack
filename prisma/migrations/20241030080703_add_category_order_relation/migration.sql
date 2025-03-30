/*
  Warnings:

  - You are about to drop the column `itemsSectionId` on the `Category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "itemsSectionId";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "itemsSectionId" INTEGER;
