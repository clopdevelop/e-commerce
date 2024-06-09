/*
  Warnings:

  - Changed the type of `order_type` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "order_type",
ADD COLUMN     "order_type" TEXT NOT NULL;
