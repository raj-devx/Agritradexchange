-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "farmerId" TEXT NOT NULL,
    "inspectedBy" TEXT NOT NULL,
    "sampleNo" TEXT NOT NULL,
    "moisture" TEXT,
    "grade" TEXT NOT NULL,
    "assessedQty" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "notes" TEXT,
    "visitDate" TEXT NOT NULL,
    "farmerAck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inspection_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "FarmerRegistration" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_farmerId_key" ON "Inspection"("farmerId");
