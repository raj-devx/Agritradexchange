-- GPS capture on agent inspections
ALTER TABLE "Inspection" ADD COLUMN IF NOT EXISTS "latitude" DOUBLE PRECISION;
ALTER TABLE "Inspection" ADD COLUMN IF NOT EXISTS "longitude" DOUBLE PRECISION;
