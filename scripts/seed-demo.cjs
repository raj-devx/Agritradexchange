const { PrismaClient } = require("@prisma/client");
const p = new PrismaClient();
(async () => {
  await p.supplyMatch.deleteMany();
  await p.buyerRequirement.deleteMany();
  await p.farmerRegistration.deleteMany();

  const req = await p.buyerRequirement.create({
    data: {
      requirementNo: "ATX-R-TEST-0001", companyName: "Gokul Oil Mills",
      contactPerson: "A Shah", mobile: "9876500000", email: "buy@gokul.com",
      commodity: "Groundnut (Peanut)", requiredQuantity: 100, unit: "tonne",
      grade: "Bold 40/50", deliveryLocation: "Ahmedabad", packaging: "Bags",
      sampleRequired: true, status: "Submitted",
    },
  });
  await p.farmerRegistration.create({ data: { registrationNo: "ATX-F-TEST-0001", fullName: "Ramesh Patel", mobile: "9810000001", state: "Gujarat", district: "Rajkot", village: "Jasdan", cropCategory: "oilseeds", cropName: "Groundnut", expectedQuantity: 300, unit: "quintal", approxLocation: "Jasdan", preferredLanguage: "Gujarati", consent: true } });
  const f2 = await p.farmerRegistration.create({ data: { registrationNo: "ATX-F-TEST-0002", fullName: "Suresh Bhai", mobile: "9810000002", state: "Gujarat", district: "Ahmedabad", village: "Sanand", cropCategory: "oilseeds", cropName: "Groundnut", expectedQuantity: 25, unit: "tonne", approxLocation: "Sanand", preferredLanguage: "Gujarati", consent: true } });
  await p.farmerRegistration.create({ data: { registrationNo: "ATX-F-TEST-0003", fullName: "Kiran Patel", mobile: "9810000003", state: "Gujarat", district: "Junagadh", village: "Keshod", cropCategory: "oilseeds", cropName: "Groundnut", expectedQuantity: 40, unit: "quintal", approxLocation: "Keshod", preferredLanguage: "Gujarati", consent: true } });
  await p.farmerRegistration.create({ data: { registrationNo: "ATX-F-TEST-0004", fullName: "Wheat Guy", mobile: "9810000004", state: "Gujarat", district: "Mehsana", village: "Visnagar", cropCategory: "grains", cropName: "Wheat", expectedQuantity: 50, unit: "quintal", approxLocation: "Visnagar", preferredLanguage: "Gujarati", consent: true } });

  console.log("REQ_ID=" + req.id);
  console.log("F2_ID=" + f2.id);
  await p.$disconnect();
})();
