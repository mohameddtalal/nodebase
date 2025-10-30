/*
  Warnings:

  - A unique constraint covering the columns `[accountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."account_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "account" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_accountId_key" ON "account"("accountId");
