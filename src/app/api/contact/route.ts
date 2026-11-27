import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

const limiter = rateLimit({ name: "contact", max: 10 });

export async function POST(req: Request) {
  const limited = await limiter();
  if (limited) return limited;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const d = parsed.data;
  try {
    await prisma.contactMessage.create({
      data: {
        name: d.name,
        email: d.email,
        phone: d.phone || null,
        audience: d.audience || null,
        message: d.message,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please retry." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
