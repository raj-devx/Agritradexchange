export type Lang = "en" | "hi" | "gu";

export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "hi", label: "हिंदी", native: "हिं" },
  { code: "gu", label: "ગુજરાતી", native: "ગુજ" },
];

// English is the source of truth; hi/gu must match its shape (enforced below).
const en = {
  // For Farmers page
  ff_eyebrow: "For Farmers",
  ff_title: "Sell your produce with less hassle and more clarity",
  ff_subtitle:
    "Register the crop you have available. Our field team inspects quality, shares a transparent offer, and connects you to real buyer demand.",
  ff_tradHeading: "Traditional mandi selling",
  ff_trad: [
    "Register and haul produce to the mandi yourself",
    "Queue tractors/trucks 2–3 days (sometimes more) for an auction slot",
    "Diesel, rent and labour costs pile up while you wait",
    "Uncertain auction price and multiple intermediaries",
    "Payment can take 15–30 days",
  ],
  ff_withHeading: "With AgriTradeXchange",
  ff_with: [
    "Free registration — our agent comes to you",
    "On-site quality inspection and sampling",
    "A clear, grade-based price offer you can accept or reject",
    "Deliver to a nearby collection point, not across the state",
    "Payment on agreed terms with a traceable record",
  ],
  ff_pipeHeading: "What happens after you register",
  ff_pipeSub:
    "You can follow your produce through each stage. A registration is not a guaranteed purchase — you always see and approve the offer first.",
  ff_stepWord: "Step",
  ff_registerHeading: "Register your produce",
  ff_registerSub: "Mobile-friendly and free, in your language.",

  // Farmer status pipeline (parallel to FARMER_STATUS_PIPELINE)
  pipeline: [
    "Registration submitted",
    "Agent assigned",
    "Inspection scheduled",
    "Quality assessment completed",
    "Offer shared",
    "Quantity confirmed",
    "Collection scheduled",
    "Payment processed",
  ],

  // Registration form
  f_fullName: "Farmer full name",
  f_fullNamePh: "e.g. Ramesh Patel",
  f_mobile: "Mobile number",
  f_mobileHint: "OTP verification will be added in a later version.",
  f_mobilePh: "10-digit number",
  f_state: "State",
  f_stateSelect: "Select state",
  f_district: "District",
  f_districtPh: "e.g. Rajkot",
  f_village: "Village",
  f_villagePh: "Village name",
  f_category: "Crop category",
  f_categorySelect: "Select a category",
  f_crop: "Crop name",
  f_cropPh: "e.g. Groundnut",
  f_qty: "Expected quantity",
  f_unit: "Unit",
  f_harvest: "Expected harvest date",
  f_harvestHint: "Optional — where applicable.",
  f_location: "Approximate crop location",
  f_locationPh: "Nearest landmark / taluka",
  f_lang: "Preferred language",
  f_consent:
    "I consent to AgriTradeXchange collecting and using my personal and agricultural information to provide this service. My contact and farm details will not be made publicly searchable.",
  f_submit: "Register my produce",
  f_successTitle: "Produce registered successfully",
  f_successBody:
    "Our field agent will contact you to schedule an inspection. Registration does not guarantee a purchase — you will see a clear, quality-based offer and can accept or reject it before any sale.",
  f_statusLabel: "Status",
  f_refLabel: "Registration number",
  f_registerAnother: "Register another crop",
  f_errGeneric: "Something went wrong. Please try again.",
  f_errNetwork: "Network error. Please check your connection and retry.",
};

export type FarmerDict = typeof en;

const hi: FarmerDict = {
  ff_eyebrow: "किसानों के लिए",
  ff_title: "अपनी उपज कम झंझट और ज़्यादा स्पष्टता के साथ बेचें",
  ff_subtitle:
    "अपनी उपलब्ध फसल पंजीकृत करें। हमारी टीम गुणवत्ता जाँचती है, पारदर्शी प्रस्ताव देती है और आपको असली खरीदार मांग से जोड़ती है।",
  ff_tradHeading: "पारंपरिक मंडी बिक्री",
  ff_trad: [
    "खुद पंजीकरण कर उपज मंडी तक ले जाना",
    "नीलामी नंबर के लिए ट्रैक्टर/ट्रक की 2–3 दिन (कभी ज़्यादा) कतार",
    "इंतज़ार में डीज़ल, किराया और मज़दूरी का खर्च बढ़ता है",
    "अनिश्चित नीलामी भाव और कई बिचौलिए",
    "भुगतान में 15–30 दिन लग सकते हैं",
  ],
  ff_withHeading: "AgriTradeXchange के साथ",
  ff_with: [
    "मुफ़्त पंजीकरण — हमारा एजेंट आपके पास आता है",
    "मौके पर गुणवत्ता जाँच और नमूना",
    "स्पष्ट, ग्रेड आधारित मूल्य प्रस्ताव जिसे आप स्वीकार या अस्वीकार कर सकते हैं",
    "पास के संग्रह केंद्र पर पहुँचाएँ, पूरे राज्य में नहीं",
    "तय शर्तों पर भुगतान, पूरे रिकॉर्ड के साथ",
  ],
  ff_pipeHeading: "पंजीकरण के बाद क्या होता है",
  ff_pipeSub:
    "आप हर चरण पर अपनी उपज को ट्रैक कर सकते हैं। पंजीकरण खरीद की गारंटी नहीं है — आप पहले प्रस्ताव देखते और स्वीकृत करते हैं।",
  ff_stepWord: "चरण",
  ff_registerHeading: "अपनी उपज पंजीकृत करें",
  ff_registerSub: "मोबाइल-अनुकूल और मुफ़्त, आपकी भाषा में।",

  pipeline: [
    "पंजीकरण जमा किया गया",
    "एजेंट नियुक्त",
    "निरीक्षण निर्धारित",
    "गुणवत्ता मूल्यांकन पूर्ण",
    "प्रस्ताव साझा",
    "मात्रा पुष्टि",
    "संग्रह निर्धारित",
    "भुगतान संसाधित",
  ],

  f_fullName: "किसान का पूरा नाम",
  f_fullNamePh: "उदा. रमेश पटेल",
  f_mobile: "मोबाइल नंबर",
  f_mobileHint: "OTP सत्यापन अगले संस्करण में जोड़ा जाएगा।",
  f_mobilePh: "10 अंकों का नंबर",
  f_state: "राज्य",
  f_stateSelect: "राज्य चुनें",
  f_district: "ज़िला",
  f_districtPh: "उदा. राजकोट",
  f_village: "गाँव",
  f_villagePh: "गाँव का नाम",
  f_category: "फसल श्रेणी",
  f_categorySelect: "श्रेणी चुनें",
  f_crop: "फसल का नाम",
  f_cropPh: "उदा. मूँगफली",
  f_qty: "अनुमानित मात्रा",
  f_unit: "इकाई",
  f_harvest: "अनुमानित कटाई तिथि",
  f_harvestHint: "वैकल्पिक — जहाँ लागू हो।",
  f_location: "फसल का अनुमानित स्थान",
  f_locationPh: "निकटतम लैंडमार्क / तालुका",
  f_lang: "पसंदीदा भाषा",
  f_consent:
    "मैं AgriTradeXchange को यह सेवा देने हेतु मेरी व्यक्तिगत एवं कृषि जानकारी एकत्र व उपयोग करने की सहमति देता/देती हूँ। मेरे संपर्क व खेत की जानकारी सार्वजनिक रूप से खोजी नहीं जाएगी।",
  f_submit: "मेरी उपज पंजीकृत करें",
  f_successTitle: "उपज सफलतापूर्वक पंजीकृत",
  f_successBody:
    "हमारा एजेंट निरीक्षण तय करने के लिए आपसे संपर्क करेगा। पंजीकरण खरीद की गारंटी नहीं है — बिक्री से पहले आपको स्पष्ट, गुणवत्ता आधारित प्रस्ताव मिलेगा जिसे आप स्वीकार या अस्वीकार कर सकते हैं।",
  f_statusLabel: "स्थिति",
  f_refLabel: "पंजीकरण संख्या",
  f_registerAnother: "दूसरी फसल पंजीकृत करें",
  f_errGeneric: "कुछ गलत हुआ। कृपया पुनः प्रयास करें।",
  f_errNetwork: "नेटवर्क त्रुटि। कृपया कनेक्शन जाँचें और पुनः प्रयास करें।",
};

const gu: FarmerDict = {
  ff_eyebrow: "ખેડૂતો માટે",
  ff_title: "તમારી ઉપજ ઓછી ઝંઝટ અને વધુ સ્પષ્ટતા સાથે વેચો",
  ff_subtitle:
    "તમારી ઉપલબ્ધ પાક નોંધાવો. અમારી ટીમ ગુણવત્તા તપાસે છે, પારદર્શક ઓફર આપે છે અને તમને સાચી ખરીદદાર માંગ સાથે જોડે છે.",
  ff_tradHeading: "પરંપરાગત મંડી વેચાણ",
  ff_trad: [
    "જાતે નોંધણી કરી ઉપજ મંડી સુધી લઈ જવી",
    "હરાજી નંબર માટે ટ્રેક્ટર/ટ્રકની 2–3 દિવસ (ક્યારેક વધુ) કતાર",
    "રાહ જોવામાં ડીઝલ, ભાડું અને મજૂરીનો ખર્ચ વધે છે",
    "અનિશ્ચિત હરાજી ભાવ અને અનેક વચેટિયા",
    "ચુકવણીમાં 15–30 દિવસ લાગી શકે છે",
  ],
  ff_withHeading: "AgriTradeXchange સાથે",
  ff_with: [
    "મફત નોંધણી — અમારો એજન્ટ તમારી પાસે આવે છે",
    "સ્થળ પર ગુણવત્તા તપાસ અને નમૂના",
    "સ્પષ્ટ, ગ્રેડ આધારિત ભાવ ઓફર જે તમે સ્વીકારી કે નકારી શકો",
    "નજીકના સંગ્રહ કેન્દ્ર પર પહોંચાડો, આખા રાજ્યમાં નહીં",
    "નક્કી શરતો પર ચુકવણી, પૂરા રેકોર્ડ સાથે",
  ],
  ff_pipeHeading: "નોંધણી પછી શું થાય છે",
  ff_pipeSub:
    "તમે દરેક તબક્કે તમારી ઉપજ ટ્રૅક કરી શકો છો. નોંધણી એ ખરીદીની ગેરંટી નથી — તમે પહેલા ઓફર જુઓ અને મંજૂર કરો.",
  ff_stepWord: "તબક્કો",
  ff_registerHeading: "તમારી ઉપજ નોંધાવો",
  ff_registerSub: "મોબાઇલ-ફ્રેન્ડલી અને મફત, તમારી ભાષામાં.",

  pipeline: [
    "નોંધણી સબમિટ થઈ",
    "એજન્ટ સોંપાયો",
    "નિરીક્ષણ નક્કી થયું",
    "ગુણવત્તા મૂલ્યાંકન પૂર્ણ",
    "ઓફર શેર કરી",
    "જથ્થો પુષ્ટિ",
    "સંગ્રહ નક્કી થયું",
    "ચુકવણી થઈ",
  ],

  f_fullName: "ખેડૂતનું પૂરું નામ",
  f_fullNamePh: "દા.ત. રમેશ પટેલ",
  f_mobile: "મોબાઇલ નંબર",
  f_mobileHint: "OTP ચકાસણી પછીના વર્ઝનમાં ઉમેરાશે.",
  f_mobilePh: "10 અંકનો નંબર",
  f_state: "રાજ્ય",
  f_stateSelect: "રાજ્ય પસંદ કરો",
  f_district: "જિલ્લો",
  f_districtPh: "દા.ત. રાજકોટ",
  f_village: "ગામ",
  f_villagePh: "ગામનું નામ",
  f_category: "પાક શ્રેણી",
  f_categorySelect: "શ્રેણી પસંદ કરો",
  f_crop: "પાકનું નામ",
  f_cropPh: "દા.ત. મગફળી",
  f_qty: "અંદાજિત જથ્થો",
  f_unit: "એકમ",
  f_harvest: "અંદાજિત કાપણી તારીખ",
  f_harvestHint: "વૈકલ્પિક — જ્યાં લાગુ પડે.",
  f_location: "પાકનું અંદાજિત સ્થળ",
  f_locationPh: "નજીકનું સ્થળ / તાલુકો",
  f_lang: "પસંદગીની ભાષા",
  f_consent:
    "હું AgriTradeXchange ને આ સેવા આપવા માટે મારી વ્યક્તિગત અને કૃષિ માહિતી એકત્ર અને ઉપયોગ કરવાની સંમતિ આપું છું. મારી સંપર્ક અને ખેતરની વિગતો જાહેરમાં શોધી શકાશે નહીં.",
  f_submit: "મારી ઉપજ નોંધાવો",
  f_successTitle: "ઉપજ સફળતાપૂર્વક નોંધાઈ",
  f_successBody:
    "અમારો એજન્ટ નિરીક્ષણ નક્કી કરવા તમારો સંપર્ક કરશે. નોંધણી ખરીદીની ગેરંટી નથી — વેચાણ પહેલાં તમને સ્પષ્ટ, ગુણવત્તા આધારિત ઓફર મળશે જે તમે સ્વીકારી કે નકારી શકો.",
  f_statusLabel: "સ્થિતિ",
  f_refLabel: "નોંધણી નંબર",
  f_registerAnother: "બીજો પાક નોંધાવો",
  f_errGeneric: "કંઈક ખોટું થયું. કૃપા કરી ફરી પ્રયાસ કરો.",
  f_errNetwork: "નેટવર્ક ભૂલ. કૃપા કરી કનેક્શન તપાસો અને ફરી પ્રયાસ કરો.",
};

export const FARMER_T: Record<Lang, FarmerDict> = { en, hi, gu };
