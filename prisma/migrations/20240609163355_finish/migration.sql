/*
  Warnings:

  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "discount",
DROP COLUMN "material",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "price" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- DropEnum
DROP TYPE "Material";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
