-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "properties" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socialId" TEXT;
