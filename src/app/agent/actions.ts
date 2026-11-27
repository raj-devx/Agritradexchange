"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  AGENT_COOKIE,
  AGENT_SESSION_MAX_AGE,
  agentExpectedToken,
  agentPasswordMatches,
  isAgentAuthed,
} from "@/lib/agent-auth";
import { QUALITY_GRADES } from "@/lib/status";

export async function agentLogin(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!agentPasswordMatches(password)) {
    redirect("/agent/login?error=1");
  }
  const jar = await cookies();
  jar.set(AGENT_COOKIE, agentExpectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: AGENT_SESSION_MAX_AGE,
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/agent");
}

export async function agentLogout() {
  const jar = await cookies();
  jar.delete(AGENT_COOKIE);
  redirect("/agent/login");
}

const UNITS = ["kg", "quintal", "tonne"];

export async function recordInspection(formData: FormData) {
  if (!(await isAgentAuthed())) throw new Error("Unauthorized");

  const farmerId = String(formData.get("farmerId") ?? "");
  const inspectedBy = String(formData.get("inspectedBy") ?? "").trim();
  const sampleNo = String(formData.get("sampleNo") ?? "").trim();
  const grade = String(formData.get("grade") ?? "");
  const moisture = String(formData.get("moisture") ?? "").trim();
  const assessedQty = Number(formData.get("assessedQty"));
  const unit = String(formData.get("unit") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();
  const visitDate = String(formData.get("visitDate") ?? "").trim();
  const farmerAck = formData.get("farmerAck") === "on";
  const imagesRaw = String(formData.get("images") ?? "[]");
  let images: string | null = null;
  try {
    const arr = JSON.parse(imagesRaw);
    if (Array.isArray(arr) && arr.length > 0) images = JSON.stringify(arr);
  } catch { /* ignore */ }

  if (
    !farmerId ||
    !inspectedBy ||
    !sampleNo ||
    !QUALITY_GRADES.includes(grade as never) ||
    !(assessedQty > 0) ||
    !UNITS.includes(unit)
  ) {
    redirect(`/agent/inspect/${farmerId}?error=1`);
  }

  const data = {
    inspectedBy,
    sampleNo,
    grade,
    moisture: moisture || null,
    assessedQty,
    unit,
    notes: notes || null,
    visitDate: visitDate || new Date().toISOString().slice(0, 10),
    farmerAck,
    images,
  };

  await prisma.inspection.upsert({
    where: { farmerId },
    create: { farmerId, ...data },
    update: data,
  });

  // Advance the lot out of the agent queue.
  await prisma.farmerRegistration.update({
    where: { id: farmerId },
    data: { status: "Quality assessment completed" },
  });

  revalidatePath("/agent");
  revalidatePath("/admin/farmers");
  revalidatePath("/admin");
  redirect("/agent?done=1");
}
