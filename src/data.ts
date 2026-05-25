/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SolarPackage } from "./types";

export const SOLAR_PACKAGES: SolarPackage[] = [
  {
    id: "3kw",
    size: "3 kW",
    titleEnglish: "Residential Starter Solar",
    titleUrdu: "رہائشی اسٹارٹر سولر سسٹم",
    priceRange: "450,000 - 520,000 PKR",
    panelsCount: 6,
    panelsWattage: "580W+ Tier-1 Bifacial Mono PERC",
    inverterCapacity: "3.2 kW Smart Hybrid Inverter",
    bestForEnglish: "Small homes & offices with moderate electricity bills (150-250 units)",
    bestForUrdu: "چھوٹے گھروں اور دفاتر کے لیے جن کا ماہانہ بل 150 سے 250 یونٹ ہے",
    appliances: [
      "1 Inverter AC (1 Ton)",
      "1 Refrigerator",
      "4 Fans & 8 LED Lights",
      "Washing Machine (Daytime)",
      "LED TV"
    ],
    appliancesUrdu: [
      "1 عدد انورٹر اے سی (1 ٹن)",
      "1 عدد ریفریجریٹر",
      "4 عدد پنکھے اور 8 ایل ای ڈی لائٹس",
      "واشنگ مشین (صرف دن کے وقت)",
      "ایل ای ڈی ٹی وی"
    ],
    eligibleForNetMetering: false,
    recoveryPeriod: "3.5 - 4 Years"
  },
  {
    id: "5kw",
    size: "5 kW",
    titleEnglish: "Residential Smart Budget",
    titleUrdu: "سمارٹ بجٹ سولر سسٹم (نیٹ میٹرنگ)",
    priceRange: "680,000 - 750,000 PKR",
    panelsCount: 9,
    panelsWattage: "585W+ Tier-1 Double-Glass N-Type",
    inverterCapacity: "5 kW Dual-MPPT Smart On-Grid/Hybrid",
    bestForEnglish: "Medium families wanting grid synchronization & net metering (300-450 units)",
    bestForUrdu: "درمیانے خاندانوں کے لیے جو نیٹ میٹرنگ اور بل صفر کرنا چاہتے ہیں (300-450 یونٹ)",
    appliances: [
      "1 Inverter AC (1.5 Ton)",
      "1 Refrigerator & Deep Freezer",
      "Water Pump (1 HP)",
      "6 Fans & 12 LED Lights",
      "Iron, Laptop, WiFi & TV"
    ],
    appliancesUrdu: [
      "1 عدد انورٹر اے سی (1.5 ٹن)",
      "1 عدد ریفریجریٹر اور ڈیپ فریزر",
      "پانی کی موٹر (1 ہارس پاور)",
      "6 عدد پنکھے اور 12 ایل ای ڈی لائٹس",
      "استری، لیپ ٹاپ، وائی فائی اور ٹی وی"
    ],
    eligibleForNetMetering: true,
    recoveryPeriod: "3.2 - 3.8 Years"
  },
  {
    id: "10kw",
    size: "10 kW",
    titleEnglish: "Premium Home Solution",
    titleUrdu: "پریمیم ہوم سولر سلوشن (نیٹ میٹرنگ)",
    priceRange: "1,150,000 - 1,300,000 PKR",
    panelsCount: 18,
    panelsWattage: "585W+ High Efficiency Multi-Busbar",
    inverterCapacity: "10 kW High Voltage On-Grid Inverter",
    bestForEnglish: "Double-story homes with heavy AC usage & electronics (500-800 units)",
    bestForUrdu: "دو منزلہ گھر جن میں اے سی کا زیادہ استعمال ہے (500 سے 800 یونٹ)",
    appliances: [
      "2 Inverter ACs (1.5 Ton) simultaneously",
      "Refrigerator, Water Pump, & Microwave",
      "Iron & Washing Machine",
      "8 Fans & 20 LED Lights",
      "Complete home load during active sunshine"
    ],
    appliancesUrdu: [
      "2 عدد انورٹر اے سی (1.5 ٹن) ایک ساتھ",
      "ریفریجریٹر، پانی کا پمپ، اور مائکروویو",
      "استری اور واشنگ مشین",
      "8 عدد پنکھے اور 20 ایل ای ڈی لائٹس",
      "تیز دھوپ کے دوران گھر کا مکمل لوڈ"
    ],
    eligibleForNetMetering: true,
    recoveryPeriod: "3.0 - 3.5 Years"
  },
  {
    id: "15kw",
    size: "15 kW",
    titleEnglish: "Luxury Residential / Executive",
    titleUrdu: "لگری ہومز / ایگزیکٹو سولر سسٹم",
    priceRange: "1,550,000 - 1,750,000 PKR",
    panelsCount: 26,
    panelsWattage: "590W+ Ultra Power Bifacial Dual Glass",
    inverterCapacity: "15 kW Three-Phase Smart Inverter",
    bestForEnglish: "Large estates, luxury villas & commercial shops (800-1200 units)",
    bestForUrdu: "بڑی کوٹھیوں، لگژری ولاز اور تجارتی دکانوں کے لیے (800 سے 1200 یونٹ)",
    appliances: [
      "3-4 Inverter ACs (1.5 Ton) simultaneously",
      "Multiple Fridges & Deep Freezer",
      "Agricultural / High-load Water Pumps",
      "Complete household appliances & lightning",
      "Substantial export of excess power to Green Grid"
    ],
    appliancesUrdu: [
      "3 سے 4 عدد انورٹر اے سی (1.5 ٹن) ایک ساتھ",
      "متعدد ریفریجریٹرز اور ڈیپ فریزر",
      "پانی کی بڑی موٹر بار بار چلانے کے لیے",
      "گھر کی تمام برقی اشیاء اور لائٹنگ",
      "گرین گریڈ کو فالتو بجلی برآمد کر کے زبردست بچت"
    ],
    eligibleForNetMetering: true,
    recoveryPeriod: "3.0 Years"
  },
  {
    id: "20kw",
    size: "20 kW",
    titleEnglish: "Commercial & Mega Farm",
    titleUrdu: "کمرشل اور صنعتی میگا سولر سسٹم",
    priceRange: "2,000,000 - 2,300,000 PKR",
    panelsCount: 34,
    panelsWattage: "590W+ Tier-1 Premium Panels",
    inverterCapacity: "20 kW Three-Phase Grid-Tied Solution",
    bestForEnglish: "Industrial units, executive offices, schools, & heavy solar farms (1200+ units)",
    bestForUrdu: "صنعتی یونٹوں، دفاتر، سکولوں اور فیکٹریوں کے لیے (1200 سے زائد یونٹ)",
    appliances: [
      "5-7 Inverter ACs or commercial chiller units",
      "Corporate Servers & Heavy computing setups",
      "Three-phase industrial machinery & water motors",
      "Virtually zero grid dependence with substantial income export"
    ],
    appliancesUrdu: [
      "5 سے 7 عدد انورٹر اے سی یا کمرشل چیلر یونٹس",
      "کارپوریٹ سرورز اور کمپیوٹر لیبز",
      "تھری فیز صنعتی مشینری اور پانی کی بڑی موٹرز",
      "سرکاری بجلی پر انحصار ختم اور ماہانہ معقول کمائی"
    ],
    eligibleForNetMetering: true,
    recoveryPeriod: "2.8 - 3.2 Years"
  }
];

export const PAKISTANI_CITIES = [
  "Lahore (لاہور)",
  "Karachi (کراچی)",
  "Islamabad (اسلام آباد)",
  "Rawalpindi (راولپنڈی)",
  "Faisalabad (فیصل آباد)",
  "Multan (ملتان)",
  "Peshawar (پشاور)",
  "Gujranwala (گوجرانوالہ)",
  "Sialkot (سیالکوٹ)",
  "Quetta (کوئٹہ)",
  "Sargodha (سرگودھا)",
  "Bahawalpur (بہاولپور)"
];

export const FAQS = [
  {
    qEn: "What is AEDB & PEC certification and why does it matter?",
    qUr: "اے ای ڈی بی (AEDB) اور پی ای سی (PEC) سرٹیفیکیشن کیا ہے اور یہ کیوں ضروری ہے؟",
    aEn: "AEDB certification proves a solar company has top-tier engineers authorized to execute Net Metering safely. PEC (Pakistan Engineering Council) registers standard constructors. This guarantees that your green grid conversion complies with all NEPRA laws and utility standards.",
    aUr: "اے ای ڈی بی اور پی ای سی سرٹیفیکیشن اس بات کی ضمانت ہے کہ کمپنی کے پاس انتہائی ماہر انجینئرز ہیں جو نیٹ میٹرنگ کا کام قانونی طریقے سے انجام دے سکتے ہیں۔ یہ بلاتعطل بجلی، گرین میٹر کے حصول اور نیپرا قوانین کی پاسداری کی ضمانت دیتا ہے۔"
  },
  {
    qEn: "How long does the Net Metering process take in Pakistan?",
    qUr: "پاکستان میں نیٹ میٹرنگ (گرین میٹر) لگنے میں کتنا وقت لگتا ہے؟",
    aEn: "Typically, the Net Metering process takes 30 to 45 days. This includes document preparation, LESCO/KE inspection, NEPRA license generation, and bi-directional green meter installation. Solar Studio manages 100% of this tedious paperwork.",
    aUr: "عام طور پر اس کارروائی میں 30 سے 45 دن لگتے ہیں۔ اس میں تمام کاغذی کارروائی، ڈسٹری بیوشن کمپنی (LESCO/KE) کا معائنہ، نیپرا لائسنس اور گرین میٹر کی تنصیب شامل ہے۔ سولر اسٹوڈیو یہ سب کام مکمل طور پر خود کر کے دیتا ہے۔"
  },
  {
    qEn: "Which brands of solar panels and inverters do you install?",
    qUr: "آپ کس برانڈ کے سولر پینلز اور انورٹرز نصب کرتے ہیں؟",
    aEn: "We install only original Tier-1 solar panels: Longi (Hi-MO 6), Jinko (Tiger Neo), and Canadian Solar. For inverters, we trust premium leaders: Huawei, Growatt, Solis, and Knox, backed by extended official warranties.",
    aUr: "ہم صرف اوریجنل ٹائر-1 پینلز جیسے Longi (Hi-MO 6)، Jinko (Tiger Neo)، اور Canadian Solar استعمال کرتے ہیں۔ انورٹرز کے لیے ہم ٹاپ برانڈز جیسے Huawei، Growatt، Solis اور Knox نصب کرتے ہیں جن کی باقاعدہ آفیشل وارنٹی ہوتی ہے۔"
  },
  {
    qEn: "Does solar power work during load shedding?",
    qUr: "کیا لوڈ شیڈنگ کے دوران سولر سسٹم کام کرتا ہے؟",
    aEn: "On On-Grid systems, solar turns off during grid failure for grid safety. However, with our Smart Hybrid solutions containing premium Lithium-ion or Tubular batteries, your home continues to run smoothly on solar/battery backup during load shedding.",
    aUr: "آن گریڈ سسٹم لوڈ شیڈنگ کے وقت لائن مین کی حفاظت کے لیے بند ہوجاتا ہے۔ لیکن اگر آپ ہمارے ہائبرڈ سولر سلوشنز کا انتخاب کرتے ہیں جس میں بیٹریاں شامل ہوتی ہیں، تو لوڈ شیڈنگ کے دوران بھی آپ کے گھر کی بجلی بالکل بند نہیں ہوگی اور سسٹم آسانی سے کام کرتا رہے گا۔"
  }
];
