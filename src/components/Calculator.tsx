/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sliders, HelpCircle, DollarSign, Calculator, ChevronRight, MessageSquareCode } from "lucide-react";

interface CalculatorProps {
  lang: "ur" | "en";
  onConsultSize: (size: string) => void;
}

export default function SolarCalculator({ lang, onConsultSize }: CalculatorProps) {
  const [bill, setBill] = useState(35000); // Default 35,000 PKR monthly bill

  // Constants representing typical pakistani tariff rates and solar outputs
  const AVERAGE_UNIT_RATE = 55; // 55 PKR per unit average inclusive of surcharges and FPA
  const estimatedUnits = Math.floor(bill / AVERAGE_UNIT_RATE);

  // Sizing decision logic based on unit consumption
  let size = "3 kW";
  let panelsCount = 6;
  let systemPrice = "450,000 - 520,000";
  let monthlySavings = Math.floor(bill * 0.9);
  let paybackYears = "3.5";
  let descriptionUrdu = "آپ کے گھر کے لیے ہمارا 3kW اسٹارٹر سولر سسٹم بہترین ہے، جو کہ 1 انورٹر اے سی، فرج اور استری کا لوڈ اٹھا سکتا ہے۔";
  let descriptionEnglish = "A 3kW system is recommended for your capacity; it easily handles 1 Ton Inverter AC, typical fridge, TV & fan loads.";

  if (estimatedUnits >= 250 && estimatedUnits < 450) {
    size = "5 kW";
    panelsCount = 9;
    systemPrice = "680,000 - 750,000";
    monthlySavings = Math.floor(bill * 0.95);
    paybackYears = "3.3";
    descriptionUrdu = "آپ کے لیے 5kW پریمیم نیٹ میٹرنگ سسٹم بہترین ہے، جو کہ 1.5 ٹن اے سی، ہوم موٹر اور ڈیپ فریزر کا پورا لوڈ اٹھائے گا اور فالتو بجلی گرڈ کو بیچے گا۔";
    descriptionEnglish = "A 5kW on-grid system with net metering capability is perfect, fully neutralizing 1.5 Ton AC, motor pumps, and fridge bills.";
  } else if (estimatedUnits >= 450 && estimatedUnits < 800) {
    size = "10 kW";
    panelsCount = 18;
    systemPrice = "1,150,000 - 1,300,000";
    monthlySavings = Math.floor(bill * 1.0); // complete bill neutral
    paybackYears = "3.0";
    descriptionUrdu = "آپ کے لیے 10kW پریمیم سسٹم تجویز کیا جاتا ہے۔ اس سے آپ کا بل مکمل طور پر 0 ہو جائے گا اور نیٹ میٹرنگ کے ذریعے آپ اضافی یونٹس گرڈ کو برآمد کر سکیں گے۔";
    descriptionEnglish = "A 10kW executive option. Gives full bill offset, supports 2 ACs running simultaneously, water motors, and substantial exports.";
  } else if (estimatedUnits >= 800 && estimatedUnits < 1200) {
    size = "15 kW";
    panelsCount = 26;
    systemPrice = "1,550,000 - 1,750,000";
    monthlySavings = Math.floor(bill * 1.05); // pays back, net surplus
    paybackYears = "3.0";
    descriptionUrdu = "آپ کے لیے 15kW کا لگژری تھری فیز سسٹم موزوں ہے۔ یہ 3 سے 4 اے سی، استری اور موٹر چلانے کے ساتھ ساتھ گرین گریڈ کو بھاری بجلی فراہم کرتا ہے۔";
    descriptionEnglish = "A 15kW premium three-phase solution. Easily supports 3-4 running ACs plus exports high electricity quantities back to LESCO/K-Electric.";
  } else if (estimatedUnits >= 1200) {
    size = "20 kW+";
    panelsCount = 34;
    systemPrice = "2,000,000 - 2,300,000+";
    monthlySavings = Math.floor(bill * 1.1); // High production export bonus
    paybackYears = "2.8";
    descriptionUrdu = "آپ کے والہانہ لوڈ کے لیے 20kW یا اس سے بڑا سولر سسٹم ناگزیر ہے۔ یہ دفاتر، سکولوں اور فیکٹریوں کے لیے بہترین انتخاب ہے۔";
    descriptionEnglish = "A 20kW+ commercial scale setup is ideal. Perfect choice to protect commercial complexes, farms or large plazas from tariff hikes.";
  }

  const annualSavings = monthlySavings * 12;

  return (
    <section id="calculator" className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 animate-fade-in">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-100 px-3 py-1 rounded-full flex mx-auto justify-center w-fit items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>{lang === "ur" ? "سولر بچت کیلکولیٹر" : "Smart ROI Calculator"}</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            {lang === "ur" ? "اپنے بجلی کے بل کے مطابق سولر سائز جانیں" : "Estimate Your Solar Size & Savings Instantly"}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {lang === "ur"
              ? "سلائیڈر کی مدد سے اپنا ماہانہ بجلی کا اوسط بل سیٹ کریں۔ ہمارا سسٹم خودکار طریقے سے سائز، قیمت اور منافع بتائے گا۔"
              : "Slide to set your average monthly electricity bill in PKR. See recommended capacity, panel counts, setup costs, and ROI in real-time."}
          </p>
        </div>

        {/* Calculations UI layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Slider Controls Card */}
          <div className="lg:col-span-6 bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl shadow-md flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{lang === "ur" ? "ماہانہ بجلی کا بل" : "Average Monthly Bill"}</span>
                  <span className="text-3xl font-black text-slate-900 mt-1 block">
                    {bill.toLocaleString()} <span className="text-sm font-bold text-slate-500">PKR</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">{lang === "ur" ? "مصرف شدہ یونٹس (اندازہ)" : "Est. Monthly Units"}</span>
                  <span className="text-xl font-bold text-emerald-600 mt-1 block">
                    ~ {estimatedUnits} <span className="text-xs text-slate-500">Units</span>
                  </span>
                </div>
              </div>

              {/* Slider Input */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-xs text-slate-400 font-bold">
                  <span>10,000 PKR</span>
                  <span>50,000</span>
                  <span>100,000</span>
                  <span>150,000</span>
                  <span>200,000 PKR</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="200000" 
                  step="2500"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Sizing description in selected Urdu/English */}
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                <p className="urdu-font">
                  {lang === "ur" ? descriptionUrdu : descriptionEnglish}
                </p>
              </div>
            </div>

            {/* Quick action helper directly links to the Urdu chatbot support */}
            <div className="pt-8 border-t border-slate-100 mt-8">
              <button 
                onClick={() => onConsultSize(size)}
                className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-slate-900 hover:text-white text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow active:scale-95 cursor-pointer"
              >
                <MessageSquareCode className="w-5 h-5 shrink-0" />
                <span className="urdu-font">
                  {lang === "ur" ? `اسسٹنٹ سے ${size} سسٹم کے بارے میں اردو میں تفصیل پوچھیں` : `Ask Advisor in Urdu about ${size} solar system`}
                </span>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </button>
            </div>
          </div>

          {/* Sizing Recommendations Results Display */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between overflow-hidden shadow-xl border border-slate-800">
            {/* Ambient sun glow background */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative space-y-6">
              <h3 className="text-base font-bold text-slate-400 tracking-wider uppercase">
                {lang === "ur" ? "سولر اسٹوڈیو تجویز کردہ سلوشن" : "Solar Studio Recommended Solution"}
              </h3>

              {/* Recommended Size Badge Grid */}
              <div className="grid sm:grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{lang === "ur" ? "تجویز کردہ سائز" : "Recommended Size"}</span>
                  <span className="text-3xl font-extrabold text-amber-500 mt-1">{size}</span>
                  <span className="text-[10px] text-emerald-400 font-bold mt-1">
                    {panelsCount} Panels ({panelsCount * 585}W Total)
                  </span>
                </div>
                
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 flex flex-col justify-center" id="recovery-box">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{lang === "ur" ? "خرچہ واپسی کی مدت" : "Estimated Payback Time"}</span>
                  <span className="text-3xl font-extrabold text-white mt-1">~ {paybackYears} <span className="text-sm font-bold text-slate-400">Years</span></span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1">AEDB Approved System</span>
                </div>
              </div>

              {/* Est. Financial ROI summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-800/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{lang === "ur" ? "ماہانہ اندازاً بچت" : "Est. Monthly Saving"}</span>
                  <p className="text-xl font-bold text-emerald-400 mt-0.5">~ {monthlySavings.toLocaleString()} PKR</p>
                </div>
                <div className="p-3 bg-slate-950/30 rounded-xl border border-slate-800/40">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{lang === "ur" ? "سالانہ اندازاً بچت" : "Est. Annual Saving"}</span>
                  <p className="text-xl font-bold text-emerald-400 mt-0.5">~ {annualSavings.toLocaleString()} PKR</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500">{lang === "ur" ? "سولر اسٹوڈیو اندازاً سیٹ آپ قیمت" : "Solar Studio Est. Cash Setup Price"}</span>
                  <p className="text-lg font-bold text-amber-400 mt-0.5">{systemPrice} <span className="text-xs text-white">PKR</span></p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase space-x-1">
                     <span>Complete Setup</span>
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-medium text-slate-500 leading-tight pt-4 mt-4 border-t border-slate-800/60">
              * Note: Estimated setup costs represent Tier-1 bifacial panels, certified smart inverters, customized GI structural frames, customized bi-directional green meter paperwork & engineering logs inclusive of NEPRA filing fees. Prices can slightly change.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
