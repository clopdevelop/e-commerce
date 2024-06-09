-- CreateEnum
CREATE TYPE "Material" AS ENUM ('LEATHER', 'SUEDE', 'CANVAS', 'RUBBER', 'SYNTHETIC', 'TEXTILE', 'FOAM', 'MESH', 'NEOPRENE');
-- DropTable
DROP TABLE "DeliveryType" CASCADE;

-- DropTable
DROP TABLE "PaymentMethod" CASCADE; 

-- CreateEnum
CREATE TYPE "order_type" AS ENUM ('compra', 'cambio', 'subscripcion', 'devolucion');

-- CreateEnum
CREATE TYPE "order_state" AS ENUM ('entregado', 'devuelto', 'pendiente', 'cancelado');

-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('STANDAR', 'EXPRESS', 'PREMIUM');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'CASH');

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_id_order_fkey";

-- DropForeignKey
-- ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_id_payment_method_fkey";

-- DropForeignKey
-- ALTER TABLE "Order" DROP CONSTRAINT "Order_id_delivery_type_fkey";

-- DropForeignKey
-- ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_id_user_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_colorId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_address_fkey";

-- AlterTable
ALTER TABLE "City" DROP COLUMN "city",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "type",
ADD COLUMN     "deliveryType" "DeliveryType" NOT NULL,
ADD COLUMN     "id_address" INTEGER NOT NULL,
ADD COLUMN     "order_type" "order_type" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "material",
ADD COLUMN     "material" "Material";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "colorId",
DROP COLUMN "sizeId";

-- AlterTable
ALTER TABLE "Province" DROP COLUMN "province",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "id_address",
ADD COLUMN     "paymentMethods" "PaymentMethod"[];

-- DropTable
DROP TABLE "Color";



-- DropTable
DROP TABLE "Invoice";


-- DropTable
DROP TABLE "Size";

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('DEFAULT', 'BLUE', 'GREEN', 'RED', 'YELLOW');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SIZE_35', 'SIZE_36', 'SIZE_37', 'SIZE_38', 'SIZE_39', 'SIZE_40', 'SIZE_41', 'SIZE_42', 'SIZE_43', 'SIZE_44', 'SIZE_45', 'SIZE_46');

ALTER TABLE "ProductVariant"
ADD COLUMN     "color" "Color" NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;

-- CreateTable
CREATE TABLE "_AddressToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToUser_AB_unique" ON "_AddressToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToUser_B_index" ON "_AddressToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Province_name_key" ON "Province"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToUser" ADD CONSTRAINT "_AddressToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
