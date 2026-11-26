-- CreateTable
CREATE TABLE "SupplyMatch" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requirementId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "allocatedQty" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Proposed',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SupplyMatch_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "BuyerRequirement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SupplyMatch_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "FarmerRegistration" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SupplyMatch_requirementId_farmerId_key" ON "SupplyMatch"("requirementId", "farmerId");
