/*
  Warnings:

  - You are about to drop the column `paymentMethods` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "paymentMethods";

-- DropEnum
DROP TYPE "PaymentMethod";
