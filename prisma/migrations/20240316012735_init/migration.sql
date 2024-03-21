-- CreateTable
CREATE TABLE "Address" (
    "id_address" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "id_city" INTEGER NOT NULL,
    "last_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "City" (
    "id_city" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "id_province" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Province" (
    "id_province" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iso_code" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "id_country" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Country" (
    "id_country" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iso_code" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id_user" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "id_address" INTEGER,
    "postcode" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id_user" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,

    PRIMARY KEY ("id_user", "id_product"),
    CONSTRAINT "Favorite_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorite_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id_product" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "id_brand" INTEGER NOT NULL,
    "id_country" INTEGER NOT NULL,
    "id_provider" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "price" REAL NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" DATETIME,
    "categoryId_category" INTEGER,
    "brandId_brand" INTEGER,
    CONSTRAINT "Product_categoryId_category_fkey" FOREIGN KEY ("categoryId_category") REFERENCES "Category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_brandId_brand_fkey" FOREIGN KEY ("brandId_brand") REFERENCES "Brand" ("id_brand") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cart" (
    "id_cart" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "last_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Cart_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id_user") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CartDetail" (
    "id_cart" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    PRIMARY KEY ("id_cart", "id_product"),
    CONSTRAINT "CartDetail_id_cart_fkey" FOREIGN KEY ("id_cart") REFERENCES "Cart" ("id_cart") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CartDetail_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id_brand" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brand" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Provider" (
    "id_provider" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cuit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_address" INTEGER NOT NULL,
    "postcode" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Stock" (
    "id_product" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "last_update" DATETIME NOT NULL,
    CONSTRAINT "Stock_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id_product") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_user" INTEGER NOT NULL,
    "id_delivery" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "id_order" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "DeliveryType" (
    "id_delivery" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "delivery_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id_invoice" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoice_n" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_date" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    "id_p_method" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id_p_method" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payment_method" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Date" (
    "id_date" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "d_number" INTEGER NOT NULL,
    "d_name" TEXT NOT NULL,
    "m_number" INTEGER NOT NULL,
    "m_name" TEXT NOT NULL,
    "trimester" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "holiday" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_iso_code_key" ON "Province"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso_code_key" ON "Country"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_email" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_name" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_n_key" ON "Invoice"("invoice_n");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_id_order_key" ON "Invoice"("id_order");

-- CreateIndex
CREATE UNIQUE INDEX "Date_date_key" ON "Date"("date");
