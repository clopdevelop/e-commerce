/*
  Warnings:

  - A unique constraint covering the columns `[name,id_province]` on the table `City` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "City_name_id_province_key" ON "City"("name", "id_province");
