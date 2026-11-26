import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { farmerSchema } from "@/lib/validation";
import { makeRef } from "@/lib/ref";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = farmerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const d = parsed.data;
  const registrationNo = makeRef("ATX-F");

  try {
    await prisma.farmerRegistration.create({
      data: {
        registrationNo,
        fullName: d.fullName,
        mobile: d.mobile,
        state: d.state,
        district: d.district,
        village: d.village,
        cropCategory: d.cropCategory,
        cropName: d.cropName,
        expectedQuantity: d.expectedQuantity,
        unit: d.unit,
        harvestDate: d.harvestDate || null,
        approxLocation: d.approxLocation,
        preferredLanguage: d.preferredLanguage,
        consent: d.consent,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your registration. Please retry." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, registrationNo });
}
