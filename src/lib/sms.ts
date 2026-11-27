import "server-only";

const PROVIDER = process.env.SMS_PROVIDER ?? "console";
const MSG91_KEY = process.env.MSG91_AUTH_KEY ?? "";
const MSG91_TEMPLATE = process.env.MSG91_TEMPLATE_ID ?? "";
const FAST2SMS_KEY = process.env.FAST2SMS_API_KEY ?? "";

export async function sendOtp(mobile: string, code: string): Promise<boolean> {
  if (PROVIDER === "msg91" && MSG91_KEY) return sendViaMSG91(mobile, code);
  if (PROVIDER === "fast2sms" && FAST2SMS_KEY) return sendViaFast2SMS(mobile, code);
  console.log(`[OTP] ${mobile} → ${code}`);
  return true;
}

async function sendViaMSG91(mobile: string, code: string): Promise<boolean> {
  const res = await fetch("https://control.msg91.com/api/v5/otp", {
    method: "POST",
    headers: { "Content-Type": "application/json", authkey: MSG91_KEY },
    body: JSON.stringify({
      template_id: MSG91_TEMPLATE,
      mobile: `91${mobile}`,
      otp: code,
    }),
  });
  return res.ok;
}

async function sendViaFast2SMS(mobile: string, code: string): Promise<boolean> {
  const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: FAST2SMS_KEY },
    body: JSON.stringify({
      route: "otp",
      variables_values: code,
      numbers: mobile,
    }),
  });
  return res.ok;
}

export async function sendNotification(mobile: string, message: string): Promise<boolean> {
  if (PROVIDER === "msg91" && MSG91_KEY) return sendNotifMSG91(mobile, message);
  if (PROVIDER === "fast2sms" && FAST2SMS_KEY) return sendNotifFast2SMS(mobile, message);
  console.log(`[SMS] ${mobile} → ${message}`);
  return true;
}

async function sendNotifMSG91(mobile: string, message: string): Promise<boolean> {
  const res = await fetch("https://control.msg91.com/api/v5/flow/", {
    method: "POST",
    headers: { "Content-Type": "application/json", authkey: MSG91_KEY },
    body: JSON.stringify({
      flow_id: process.env.MSG91_NOTIF_FLOW_ID ?? MSG91_TEMPLATE,
      mobiles: `91${mobile}`,
      message,
    }),
  });
  return res.ok;
}

async function sendNotifFast2SMS(mobile: string, message: string): Promise<boolean> {
  const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: FAST2SMS_KEY },
    body: JSON.stringify({
      route: "q",
      message,
      language: "english",
      numbers: mobile,
    }),
  });
  return res.ok;
}

export function smsConfigured(): boolean {
  if (PROVIDER === "msg91") return !!MSG91_KEY && !!MSG91_TEMPLATE;
  if (PROVIDER === "fast2sms") return !!FAST2SMS_KEY;
  return true;
}
