-- CreateTable
CREATE TABLE "FarmerRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "registrationNo" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "cropCategory" TEXT NOT NULL,
    "cropName" TEXT NOT NULL,
    "expectedQuantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "harvestDate" TEXT,
    "approxLocation" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Registration submitted',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BuyerRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buyerNo" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyType" TEXT NOT NULL,
    "gstin" TEXT,
    "address" TEXT NOT NULL,
    "procurementCategories" TEXT NOT NULL,
    "website" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending verification',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "BuyerRequirement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "requirementNo" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "commodity" TEXT NOT NULL,
    "requiredQuantity" REAL NOT NULL,
    "unit" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "moistureSpec" TEXT,
    "deliveryLocation" TEXT NOT NULL,
    "deliveryDeadline" TEXT,
    "packaging" TEXT NOT NULL,
    "targetPrice" TEXT,
    "sampleRequired" BOOLEAN NOT NULL DEFAULT false,
    "additionalSpecs" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Submitted',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "audience" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmerRegistration_registrationNo_key" ON "FarmerRegistration"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRegistration_buyerNo_key" ON "BuyerRegistration"("buyerNo");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRequirement_requirementNo_key" ON "BuyerRequirement"("requirementNo");
