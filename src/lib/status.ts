// Farmer produce moves through this pipeline. IMPORTANT: a registration is
// NOT a guaranteed purchase — the farmer accepts/rejects an offer before any
// sale is confirmed.
export const FARMER_STATUS_PIPELINE = [
  "Registration submitted",
  "Agent assigned",
  "Inspection scheduled",
  "Quality assessment completed",
  "Offer shared",
  "Quantity confirmed",
  "Collection scheduled",
  "Payment processed",
] as const;

export const BUYER_STATUSES = [
  "Pending verification",
  "Verified",
  "On hold",
] as const;

export const REQUIREMENT_STATUSES = [
  "Submitted",
  "Under review",
  "Matching supply",
  "Quotation shared",
  "Order confirmed",
  "Closed",
] as const;

// Preliminary quality grade a field agent assigns during inspection.
export const QUALITY_GRADES = [
  "Grade A",
  "Grade B",
  "Grade C",
  "Below grade",
] as const;

// Farmer statuses that still need a field agent (the agent work queue).
export const AGENT_QUEUE_STATUSES = [
  "Registration submitted",
  "Agent assigned",
  "Inspection scheduled",
] as const;
