import { NextResponse } from "next/server";
import { isAgentAuthed } from "@/lib/agent-auth";
import { isAuthed } from "@/lib/admin-auth";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  if (!(await isAgentAuthed()) && !(await isAuthed())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let file: File | null = null;
  try {
    const formData = await req.formData();
    file = formData.get("file") as File | null;
  } catch {
    return NextResponse.json({ ok: false, error: "Expected a multipart file upload." }, { status: 400 });
  }

  if (!file || !ALLOWED.includes(file.type)) {
    return NextResponse.json({ ok: false, error: "Only JPEG, PNG or WebP images allowed." }, { status: 422 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ ok: false, error: "Image must be under 5 MB." }, { status: 422 });
  }

  const bytes = await file.arrayBuffer();
  const base64 = Buffer.from(bytes).toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  return NextResponse.json({ ok: true, url: dataUrl });
}
