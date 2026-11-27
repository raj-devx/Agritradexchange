import "server-only";
import { prisma } from "@/lib/prisma";
import { sendOtp } from "@/lib/sms";
import { randomInt } from "crypto";

const OTP_LENGTH = 6;
const OTP_EXPIRY_MIN = 5;
const MAX_ATTEMPTS = 5;
const COOLDOWN_SEC = 60;

type Role = "farmer" | "buyer";

function generateCode(): string {
  const min = 10 ** (OTP_LENGTH - 1);
  const max = 10 ** OTP_LENGTH - 1;
  return String(randomInt(min, max + 1));
}

export async function createAndSendOtp(
  mobile: string,
  role: Role,
): Promise<{ ok: boolean; error?: string }> {
  const recent = await prisma.otp.findFirst({
    where: { mobile, role, createdAt: { gte: new Date(Date.now() - COOLDOWN_SEC * 1000) } },
    orderBy: { createdAt: "desc" },
  });
  if (recent) {
    return { ok: false, error: `Please wait ${COOLDOWN_SEC}s before requesting another OTP.` };
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MIN * 60 * 1000);

  await prisma.otp.create({ data: { mobile, code, role, expiresAt } });

  const sent = await sendOtp(mobile, code);
  if (!sent) return { ok: false, error: "Could not send SMS. Please retry." };

  return { ok: true };
}

export async function verifyOtp(
  mobile: string,
  role: Role,
  code: string,
): Promise<{ ok: boolean; error?: string }> {
  const otp = await prisma.otp.findFirst({
    where: { mobile, role, expiresAt: { gte: new Date() } },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) return { ok: false, error: "OTP expired or not found. Request a new one." };

  if (otp.attempts >= MAX_ATTEMPTS) {
    return { ok: false, error: "Too many attempts. Request a new OTP." };
  }

  await prisma.otp.update({ where: { id: otp.id }, data: { attempts: { increment: 1 } } });

  if (otp.code !== code) {
    return { ok: false, error: "Incorrect OTP. Please check and try again." };
  }

  await prisma.otp.deleteMany({ where: { mobile, role } });
  return { ok: true };
}
