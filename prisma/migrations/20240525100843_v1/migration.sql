/*
  Warnings:

  - Added the required column `id_city` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "id_city" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "id_province" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id_province" SERIAL NOT NULL,
    "iso_code" TEXT NOT NULL,
    "province" TEXT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id_province")
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_iso_code_key" ON "Province"("iso_code");

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_id_province_fkey" FOREIGN KEY ("id_province") REFERENCES "Province"("id_province") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
