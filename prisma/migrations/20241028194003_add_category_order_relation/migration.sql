/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `boughtDate` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `boughtPrice` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `favorite` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productNumber` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `share` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "boughtDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "boughtPrice" INTEGER NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "favorite" BOOLEAN NOT NULL,
ADD COLUMN     "productNumber" TEXT NOT NULL,
ADD COLUMN     "share" BOOLEAN NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "lastname" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Session" (
    "expires" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "expires" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CategoryOrder" (
    "id" SERIAL NOT NULL,
    "orderedIds" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CategoryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_token_key" ON "Session"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryOrder_userId_key" ON "CategoryOrder"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOrder" ADD CONSTRAINT "CategoryOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
