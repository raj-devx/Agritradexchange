import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buyerSchema } from "@/lib/validation";
import { makeRef } from "@/lib/ref";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = buyerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const d = parsed.data;
  const buyerNo = makeRef("ATX-B");

  try {
    await prisma.buyerRegistration.create({
      data: {
        buyerNo,
        companyName: d.companyName,
        contactPerson: d.contactPerson,
        mobile: d.mobile,
        email: d.email,
        companyType: d.companyType,
        gstin: d.gstin || null,
        address: d.address,
        procurementCategories: d.procurementCategories.join(","),
        website: d.website || null,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your account. Please retry." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, buyerNo });
}
