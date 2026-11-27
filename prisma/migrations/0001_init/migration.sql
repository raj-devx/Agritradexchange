-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "FarmerRegistration" (
    "id" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "cropCategory" TEXT NOT NULL,
    "cropName" TEXT NOT NULL,
    "expectedQuantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "harvestDate" TEXT,
    "approxLocation" TEXT NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'Registration submitted',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FarmerRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "inspectedBy" TEXT NOT NULL,
    "sampleNo" TEXT NOT NULL,
    "moisture" TEXT,
    "grade" TEXT NOT NULL,
    "assessedQty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "notes" TEXT,
    "visitDate" TEXT NOT NULL,
    "farmerAck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerRegistration" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuyerRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerRequirement" (
    "id" TEXT NOT NULL,
    "requirementNo" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "commodity" TEXT NOT NULL,
    "requiredQuantity" DOUBLE PRECISION NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuyerRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplyMatch" (
    "id" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "allocatedQty" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Proposed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplyMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "audience" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmerRegistration_registrationNo_key" ON "FarmerRegistration"("registrationNo");

-- CreateIndex
CREATE UNIQUE INDEX "Inspection_farmerId_key" ON "Inspection"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRegistration_buyerNo_key" ON "BuyerRegistration"("buyerNo");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRequirement_requirementNo_key" ON "BuyerRequirement"("requirementNo");

-- CreateIndex
CREATE UNIQUE INDEX "SupplyMatch_requirementId_farmerId_key" ON "SupplyMatch"("requirementId", "farmerId");

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "FarmerRegistration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyMatch" ADD CONSTRAINT "SupplyMatch_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "BuyerRequirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplyMatch" ADD CONSTRAINT "SupplyMatch_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "FarmerRegistration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

