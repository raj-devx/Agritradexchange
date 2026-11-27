import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BRAND = "#1B5E20";
const GOLD = "#D4A017";

function layout(title: string, refNo: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${title} — ${refNo}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;background:#f8f8f6;padding:24px}
.page{max-width:680px;margin:0 auto;background:#fff;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden}
.header{background:${BRAND};color:#fff;padding:28px 32px;display:flex;align-items:center;justify-content:space-between}
.logo{font-size:22px;font-weight:800;letter-spacing:-0.5px}
.logo span{color:${GOLD}}
.ref{font-size:13px;opacity:.8;font-family:monospace}
.badge{display:inline-block;background:${GOLD};color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;margin-top:4px}
.body{padding:28px 32px}
.section-title{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND};font-weight:700;margin-bottom:12px;padding-bottom:6px;border-bottom:2px solid ${GOLD}}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;margin-bottom:28px}
.field .label{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:.5px}
.field .value{font-size:15px;font-weight:500;margin-top:2px}
.full{grid-column:1/-1}
.inspection{background:#f5f9f5;border:1px solid #c8e6c9;border-radius:8px;padding:20px;margin-bottom:28px}
.footer{text-align:center;padding:20px 32px;border-top:1px solid #eee;font-size:11px;color:#999}
.footer strong{color:${BRAND}}
.actions{text-align:center;padding:20px;background:#f8f8f6}
.btn{display:inline-block;background:${BRAND};color:#fff;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;margin:0 6px}
.btn-outline{background:transparent;border:2px solid ${BRAND};color:${BRAND}}
.hint{margin-top:8px;font-size:12px;color:#999}
@media print{
  body{padding:0;background:#fff}
  .page{border:none;border-radius:0;box-shadow:none}
  .actions{display:none!important}
  .header{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .inspection{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  .badge{-webkit-print-color-adjust:exact;print-color-adjust:exact}
}
</style>
</head>
<body>
<div class="page">
${body}
</div>
<div class="actions">
<button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
<button class="btn btn-outline" onclick="window.close()">Close</button>
<p class="hint">To save as PDF: Click Print → choose "Save as PDF" as the destination</p>
</div>
</body>
</html>`;
}

function field(label: string, value: string | number | null | undefined, cls = "") {
  if (!value && value !== 0) return "";
  return `<div class="field ${cls}"><div class="label">${label}</div><div class="value">${value}</div></div>`;
}

function fmtDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

async function farmerReceipt(id: string) {
  const f = await prisma.farmerRegistration.findUnique({
    where: { id },
    include: { inspection: true },
  });
  if (!f) return null;

  let inspectionHtml = "";
  if (f.inspection) {
    const i = f.inspection;
    inspectionHtml = `
    <div class="inspection">
      <div class="section-title">Inspection Report</div>
      <div class="grid">
        ${field("Grade", i.grade)}
        ${field("Assessed Quantity", `${i.assessedQty} ${i.unit}`)}
        ${field("Moisture", i.moisture)}
        ${field("Sample No.", i.sampleNo)}
        ${field("Inspected By", i.inspectedBy)}
        ${field("Visit Date", i.visitDate)}
        ${field("Farmer Acknowledged", i.farmerAck ? "Yes" : "No")}
        ${field("Notes", i.notes, "full")}
      </div>
    </div>`;
  }

  const body = `
  <div class="header">
    <div>
      <div class="logo">AgriTrade<span>Xchange</span></div>
      <div style="font-size:12px;opacity:.7;margin-top:4px">Farmer Produce Registration Receipt</div>
    </div>
    <div style="text-align:right">
      <div class="ref">${f.registrationNo}</div>
      <div class="badge">${f.status}</div>
    </div>
  </div>
  <div class="body">
    <div class="section-title">Farmer Details</div>
    <div class="grid">
      ${field("Full Name", f.fullName)}
      ${field("Mobile", "+91 " + f.mobile)}
      ${field("Village", f.village)}
      ${field("District", f.district)}
      ${field("State", f.state)}
      ${field("Preferred Language", f.preferredLanguage)}
    </div>
    <div class="section-title">Produce Details</div>
    <div class="grid">
      ${field("Crop Category", f.cropCategory)}
      ${field("Crop Name", f.cropName)}
      ${field("Expected Quantity", `${f.expectedQuantity} ${f.unit}`)}
      ${field("Harvest Date", f.harvestDate)}
      ${field("Approximate Location", f.approxLocation, "full")}
    </div>
    ${inspectionHtml}
  </div>
  <div class="footer">
    Registered on <strong>${fmtDate(f.createdAt)}</strong> &middot;
    <strong>AgriTradeXchange</strong> &middot; Ahmedabad, Gujarat, India &middot;
    hello@agritradexchange.com
  </div>`;

  return layout("Farmer Receipt", f.registrationNo, body);
}

async function buyerReceipt(id: string) {
  const b = await prisma.buyerRegistration.findUnique({ where: { id } });
  if (!b) return null;

  const body = `
  <div class="header">
    <div>
      <div class="logo">AgriTrade<span>Xchange</span></div>
      <div style="font-size:12px;opacity:.7;margin-top:4px">Buyer Registration Receipt</div>
    </div>
    <div style="text-align:right">
      <div class="ref">${b.buyerNo}</div>
      <div class="badge">${b.status}</div>
    </div>
  </div>
  <div class="body">
    <div class="section-title">Company Details</div>
    <div class="grid">
      ${field("Company Name", b.companyName)}
      ${field("Contact Person", b.contactPerson)}
      ${field("Mobile", "+91 " + b.mobile)}
      ${field("Email", b.email)}
      ${field("Company Type", b.companyType)}
      ${field("GSTIN", b.gstin)}
      ${field("Address", b.address, "full")}
    </div>
    <div class="section-title">Procurement</div>
    <div class="grid">
      ${field("Categories", b.procurementCategories.split(",").join(", "), "full")}
      ${field("Website", b.website)}
    </div>
  </div>
  <div class="footer">
    Registered on <strong>${fmtDate(b.createdAt)}</strong> &middot;
    <strong>AgriTradeXchange</strong> &middot; Ahmedabad, Gujarat, India &middot;
    hello@agritradexchange.com
  </div>`;

  return layout("Buyer Receipt", b.buyerNo, body);
}

async function requirementReceipt(id: string) {
  const r = await prisma.buyerRequirement.findUnique({ where: { id } });
  if (!r) return null;

  const body = `
  <div class="header">
    <div>
      <div class="logo">AgriTrade<span>Xchange</span></div>
      <div style="font-size:12px;opacity:.7;margin-top:4px">Procurement Requirement Receipt</div>
    </div>
    <div style="text-align:right">
      <div class="ref">${r.requirementNo}</div>
      <div class="badge">${r.status}</div>
    </div>
  </div>
  <div class="body">
    <div class="section-title">Company</div>
    <div class="grid">
      ${field("Company Name", r.companyName)}
      ${field("Contact Person", r.contactPerson)}
      ${field("Mobile", "+91 " + r.mobile)}
      ${field("Email", r.email)}
    </div>
    <div class="section-title">Requirement Details</div>
    <div class="grid">
      ${field("Commodity", r.commodity)}
      ${field("Required Quantity", `${r.requiredQuantity} ${r.unit}`)}
      ${field("Grade", r.grade)}
      ${field("Moisture Spec", r.moistureSpec)}
      ${field("Delivery Location", r.deliveryLocation)}
      ${field("Delivery Deadline", r.deliveryDeadline)}
      ${field("Packaging", r.packaging)}
      ${field("Target Price", r.targetPrice)}
      ${field("Sample Required", r.sampleRequired ? "Yes" : "No")}
      ${field("Additional Specs", r.additionalSpecs, "full")}
    </div>
  </div>
  <div class="footer">
    Submitted on <strong>${fmtDate(r.createdAt)}</strong> &middot;
    <strong>AgriTradeXchange</strong> &middot; Ahmedabad, Gujarat, India &middot;
    hello@agritradexchange.com
  </div>`;

  return layout("Requirement Receipt", r.requirementNo, body);
}

const HANDLERS: Record<string, (id: string) => Promise<string | null>> = {
  farmer: farmerReceipt,
  buyer: buyerReceipt,
  requirement: requirementReceipt,
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ type: string; id: string }> },
) {
  const { type, id } = await params;
  const handler = HANDLERS[type];
  if (!handler) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const html = await handler(id);
  if (!html) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
