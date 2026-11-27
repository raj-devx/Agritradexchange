import "server-only";
import { sendNotification } from "@/lib/sms";

const BRAND = "AgriTradeXchange";

const FARMER_MESSAGES: Record<string, (ref: string) => string> = {
  "Agent assigned": (ref) =>
    `${BRAND}: Your produce ${ref} has been assigned a field agent. We will contact you to schedule an inspection. Track status: farmer login on our website.`,
  "Inspection scheduled": (ref) =>
    `${BRAND}: Inspection for ${ref} has been scheduled. Our agent will visit your location soon. Please keep the produce ready for sampling.`,
  "Quality assessment completed": (ref) =>
    `${BRAND}: Quality assessment for ${ref} is complete. Login to your farmer dashboard to view the inspection report.`,
  "Offer shared": (ref) =>
    `${BRAND}: A price offer has been shared for ${ref}. Please login to your farmer dashboard to review and respond.`,
  "Quantity confirmed": (ref) =>
    `${BRAND}: Quantity confirmed for ${ref}. Collection will be scheduled soon.`,
  "Collection scheduled": (ref) =>
    `${BRAND}: Collection scheduled for ${ref}. Please have your produce ready at the agreed collection point.`,
  "Payment processed": (ref) =>
    `${BRAND}: Payment processed for ${ref}. Thank you for trading with ${BRAND}!`,
};

const BUYER_MESSAGES: Record<string, (ref: string) => string> = {
  Verified: (ref) =>
    `${BRAND}: Your buyer account ${ref} has been verified. You can now post procurement requirements on our platform.`,
};

const REQUIREMENT_MESSAGES: Record<string, (ref: string) => string> = {
  "Under review": (ref) =>
    `${BRAND}: Your requirement ${ref} is now under review. Our team is evaluating supply availability.`,
  "Matching supply": (ref) =>
    `${BRAND}: We're matching supply for ${ref}. We'll share quotations once suitable lots are identified.`,
  "Quotation shared": (ref) =>
    `${BRAND}: A quotation has been shared for ${ref}. Please login to your buyer dashboard to review.`,
  "Order confirmed": (ref) =>
    `${BRAND}: Order confirmed for ${ref}. Supply allocation and delivery scheduling will follow.`,
};

export async function notifyFarmerStatusChange(
  mobile: string,
  registrationNo: string,
  newStatus: string,
): Promise<void> {
  const msgFn = FARMER_MESSAGES[newStatus];
  if (msgFn) {
    await sendNotification(mobile, msgFn(registrationNo)).catch(() => {});
  }
}

export async function notifyBuyerStatusChange(
  mobile: string,
  buyerNo: string,
  newStatus: string,
): Promise<void> {
  const msgFn = BUYER_MESSAGES[newStatus];
  if (msgFn) {
    await sendNotification(mobile, msgFn(buyerNo)).catch(() => {});
  }
}

export async function notifyRequirementStatusChange(
  mobile: string,
  requirementNo: string,
  newStatus: string,
): Promise<void> {
  const msgFn = REQUIREMENT_MESSAGES[newStatus];
  if (msgFn) {
    await sendNotification(mobile, msgFn(requirementNo)).catch(() => {});
  }
}
