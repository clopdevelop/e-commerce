-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id_product" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "id_brand" INTEGER,
    "id_provider" INTEGER,
    "id_category" INTEGER,
    "thumbnail" TEXT,
    "price" REAL NOT NULL,
    "discount" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" DATETIME,
    CONSTRAINT "Product_id_brand_fkey" FOREIGN KEY ("id_brand") REFERENCES "Brand" ("id_brand") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_id_provider_fkey" FOREIGN KEY ("id_provider") REFERENCES "Provider" ("id_provider") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("code", "created_at", "description", "discount", "id_brand", "id_category", "id_product", "id_provider", "last_update", "name", "price", "thumbnail") SELECT "code", "created_at", "description", "discount", "id_brand", "id_category", "id_product", "id_provider", "last_update", "name", "price", "thumbnail" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE INDEX "idx_name" ON "Product"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
