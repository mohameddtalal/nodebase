/*
  Warnings:

  - You are about to drop the column `password` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "account" DROP COLUMN "password",
DROP COLUMN "scope";

-- CreateTable
CREATE TABLE "workflow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "workflow_pkey" PRIMARY KEY ("id")
);
