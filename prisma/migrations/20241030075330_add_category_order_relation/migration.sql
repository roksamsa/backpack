-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "itemsSectionId" INTEGER;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;
