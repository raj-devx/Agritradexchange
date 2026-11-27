"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE,
  expectedToken,
  isAuthed,
  passwordMatches,
} from "@/lib/admin-auth";
import {
  FARMER_STATUS_PIPELINE,
  BUYER_STATUSES,
  REQUIREMENT_STATUSES,
} from "@/lib/status";
import {
  notifyFarmerStatusChange,
  notifyBuyerStatusChange,
  notifyRequirementStatusChange,
} from "@/lib/notifications";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    redirect("/admin/login?error=1");
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/admin");
}

export async function logout() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

async function assertAuthed() {
  if (!(await isAuthed())) throw new Error("Unauthorized");
}

export async function updateFarmerStatus(id: string, status: string) {
  await assertAuthed();
  if (!FARMER_STATUS_PIPELINE.includes(status as never)) return;
  const farmer = await prisma.farmerRegistration.update({ where: { id }, data: { status } });
  notifyFarmerStatusChange(farmer.mobile, farmer.registrationNo, status);
  revalidatePath("/admin/farmers");
  revalidatePath("/admin");
}

export async function updateBuyerStatus(id: string, status: string) {
  await assertAuthed();
  if (!BUYER_STATUSES.includes(status as never)) return;
  const buyer = await prisma.buyerRegistration.update({ where: { id }, data: { status } });
  notifyBuyerStatusChange(buyer.mobile, buyer.buyerNo, status);
  revalidatePath("/admin/buyers");
  revalidatePath("/admin");
}

export async function updateRequirementStatus(id: string, status: string) {
  await assertAuthed();
  if (!REQUIREMENT_STATUSES.includes(status as never)) return;
  const req = await prisma.buyerRequirement.update({ where: { id }, data: { status } });
  notifyRequirementStatusChange(req.mobile, req.requirementNo, status);
  revalidatePath("/admin/requirements");
  revalidatePath("/admin");
}

const UNITS = ["kg", "quintal", "tonne"];

/** Allocate (or re-allocate) a farmer supply lot to a buyer requirement. */
export async function allocateSupply(formData: FormData) {
  await assertAuthed();
  const requirementId = String(formData.get("requirementId") ?? "");
  const farmerId = String(formData.get("farmerId") ?? "");
  const allocatedQty = Number(formData.get("allocatedQty"));
  const unit = String(formData.get("unit") ?? "");
  if (!requirementId || !farmerId || !(allocatedQty > 0) || !UNITS.includes(unit)) {
    return;
  }

  await prisma.supplyMatch.upsert({
    where: { requirementId_farmerId: { requirementId, farmerId } },
    update: { allocatedQty, unit, status: "Proposed" },
    create: { requirementId, farmerId, allocatedQty, unit, status: "Proposed" },
  });

  // Advance the requirement once sourcing begins.
  await prisma.buyerRequirement.updateMany({
    where: { id: requirementId, status: { in: ["Submitted", "Under review"] } },
    data: { status: "Matching supply" },
  });

  revalidatePath(`/admin/matching/${requirementId}`);
  revalidatePath("/admin/matching");
  revalidatePath("/admin");
}

export async function confirmMatch(formData: FormData) {
  await assertAuthed();
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) return;
  const match = await prisma.supplyMatch.update({
    where: { id: matchId },
    data: { status: "Confirmed" },
  });
  revalidatePath(`/admin/matching/${match.requirementId}`);
  revalidatePath("/admin/matching");
}

export async function removeMatch(formData: FormData) {
  await assertAuthed();
  const matchId = String(formData.get("matchId") ?? "");
  if (!matchId) return;
  const match = await prisma.supplyMatch.delete({ where: { id: matchId } });
  revalidatePath(`/admin/matching/${match.requirementId}`);
  revalidatePath("/admin/matching");
}
