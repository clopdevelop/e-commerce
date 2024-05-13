-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentMethod" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "cardHolderName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expirationMonth" INTEGER NOT NULL,
    "expirationYear" INTEGER NOT NULL,
    "cvc" TEXT NOT NULL,
    "saveBillingInfo" BOOLEAN NOT NULL,
    "id_user" INTEGER,
    CONSTRAINT "PaymentMethod_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PaymentMethod" ("cardHolderName", "cardNumber", "cvc", "expirationMonth", "expirationYear", "id", "name", "saveBillingInfo") SELECT "cardHolderName", "cardNumber", "cvc", "expirationMonth", "expirationYear", "id", "name", "saveBillingInfo" FROM "PaymentMethod";
DROP TABLE "PaymentMethod";
ALTER TABLE "new_PaymentMethod" RENAME TO "PaymentMethod";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
