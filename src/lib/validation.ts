import { z } from "zod";
import { CATEGORY_KEYS } from "./commodities";

export const UNITS = ["kg", "quintal", "tonne"] as const;
export const LANGUAGES = ["Gujarati", "Hindi", "English"] as const;
export const PACKAGING = ["Loose", "Bags", "Other"] as const;
export const COMPANY_TYPES = [
  "Food processing factory",
  "Flour mill",
  "Oil mill",
  "Rice mill",
  "Spice manufacturer",
  "Textile business",
  "Commodity trader",
  "Exporter",
  "Wholesale distributor",
  "Institutional / Government buyer",
  "Other",
] as const;

const mobile = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

export const farmerSchema = z.object({
  fullName: z.string().trim().min(2, "Enter the farmer's full name"),
  mobile,
  state: z.string().trim().min(1, "State is required"),
  district: z.string().trim().min(1, "District is required"),
  village: z.string().trim().min(1, "Village is required"),
  cropCategory: z.enum(CATEGORY_KEYS as [string, ...string[]], {
    message: "Select a crop category",
  }),
  cropName: z.string().trim().min(1, "Crop name is required"),
  expectedQuantity: z.coerce
    .number({ message: "Enter the expected quantity" })
    .positive("Quantity must be greater than 0"),
  unit: z.enum(UNITS),
  harvestDate: z.string().trim().optional().or(z.literal("")),
  approxLocation: z.string().trim().min(1, "Approximate crop location is required"),
  preferredLanguage: z.enum(LANGUAGES),
  consent: z
    .boolean()
    .refine((v) => v === true, "You must agree to the information-use consent"),
});
export type FarmerInput = z.input<typeof farmerSchema>;
export type FarmerValues = z.output<typeof farmerSchema>;

export const buyerSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  contactPerson: z.string().trim().min(2, "Contact person is required"),
  mobile,
  email: z.string().trim().email("Enter a valid email address"),
  companyType: z.enum(COMPANY_TYPES, { message: "Select a company type" }),
  gstin: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().min(1, "Registered address is required"),
  procurementCategories: z
    .array(z.enum(CATEGORY_KEYS as [string, ...string[]]))
    .min(1, "Select at least one procurement category"),
  website: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .optional()
    .or(z.literal("")),
});
export type BuyerInput = z.infer<typeof buyerSchema>;

export const requirementSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  contactPerson: z.string().trim().min(2, "Contact person is required"),
  mobile,
  email: z.string().trim().email("Enter a valid email address"),
  commodity: z.string().trim().min(1, "Select a commodity"),
  requiredQuantity: z.coerce
    .number({ message: "Enter the required quantity" })
    .positive("Quantity must be greater than 0"),
  unit: z.enum(UNITS),
  grade: z.string().trim().min(1, "Specify the required grade / quality"),
  moistureSpec: z.string().trim().optional().or(z.literal("")),
  deliveryLocation: z.string().trim().min(1, "Delivery location is required"),
  deliveryDeadline: z.string().trim().optional().or(z.literal("")),
  packaging: z.enum(PACKAGING),
  targetPrice: z.string().trim().optional().or(z.literal("")),
  sampleRequired: z.boolean().default(false),
  additionalSpecs: z.string().trim().optional().or(z.literal("")),
});
export type RequirementInput = z.input<typeof requirementSchema>;
export type RequirementValues = z.output<typeof requirementSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Your name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional().or(z.literal("")),
  audience: z.enum(["Farmer", "Buyer", "Other"]).optional(),
  message: z.string().trim().min(5, "Please write a short message"),
});
export type ContactInput = z.infer<typeof contactSchema>;
