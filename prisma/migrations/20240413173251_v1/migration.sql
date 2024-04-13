-- CreateTable
CREATE TABLE "Address" (
    "id_address" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "id_city" INTEGER NOT NULL,
    "last_update" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Address_id_city_fkey" FOREIGN KEY ("id_city") REFERENCES "City" ("id_city") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "City" (
    "id_city" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "id_province" INTEGER NOT NULL,
    CONSTRAINT "City_id_province_fkey" FOREIGN KEY ("id_province") REFERENCES "Province" ("id_province") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Province" (
    "id_province" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iso_code" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "id_country" INTEGER NOT NULL,
    CONSTRAINT "Province_id_country_fkey" FOREIGN KEY ("id_country") REFERENCES "Country" ("id_country") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "id_country" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iso_code" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "id_address" INTEGER,
    "postcode" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "User_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address" ("id_address") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "state" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "discount" INTEGER DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_update" DATETIME,
    "stock" INTEGER NOT NULL,
    "id_provider" INTEGER,
    "id_category" INTEGER,
    CONSTRAINT "Product_id_provider_fkey" FOREIGN KEY ("id_provider") REFERENCES "Provider" ("id_provider") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Product_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "Category" ("id_category") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Category" (
    "id_category" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "state" TEXT
);

-- CreateTable
CREATE TABLE "Provider" (
    "id_provider" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cuit" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "id_address" INTEGER,
    "postcode" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Provider_id_address_fkey" FOREIGN KEY ("id_address") REFERENCES "Address" ("id_address") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "discount" REAL NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,
    "delivery_type" TEXT NOT NULL,
    CONSTRAINT "Order_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_delivery_type_fkey" FOREIGN KEY ("delivery_type") REFERENCES "DeliveryType" ("delivery_type") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeliveryType" (
    "id_delivery" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "delivery_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "unit_price" REAL NOT NULL,
    "id_order" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id_invoice" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "invoice_n" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "id_order" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" REAL NOT NULL,
    "state" TEXT NOT NULL,
    "id_p_method" INTEGER NOT NULL,
    CONSTRAINT "Invoice_id_order_fkey" FOREIGN KEY ("id_order") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Invoice_id_p_method_fkey" FOREIGN KEY ("id_p_method") REFERENCES "PaymentMethod" ("id_p_method") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentMethod" (
    "id_p_method" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payment_method" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Province_iso_code_key" ON "Province"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_iso_code_key" ON "Country"("iso_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryType_delivery_type_key" ON "DeliveryType"("delivery_type");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoice_n_key" ON "Invoice"("invoice_n");
