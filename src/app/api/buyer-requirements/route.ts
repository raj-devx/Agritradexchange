import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requirementSchema } from "@/lib/validation";
import { makeRef } from "@/lib/ref";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ name: "buyer-req", max: 5 });

export async function POST(req: Request) {
  const limited = await limiter();
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = requirementSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const d = parsed.data;
  const requirementNo = makeRef("ATX-R");

  try {
    await prisma.buyerRequirement.create({
      data: {
        requirementNo,
        companyName: d.companyName,
        contactPerson: d.contactPerson,
        mobile: d.mobile,
        email: d.email,
        commodity: d.commodity,
        requiredQuantity: d.requiredQuantity,
        unit: d.unit,
        grade: d.grade,
        moistureSpec: d.moistureSpec || null,
        deliveryLocation: d.deliveryLocation,
        deliveryDeadline: d.deliveryDeadline || null,
        packaging: d.packaging,
        targetPrice: d.targetPrice || null,
        sampleRequired: d.sampleRequired,
        additionalSpecs: d.additionalSpecs || null,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your requirement. Please retry." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, requirementNo });
}
