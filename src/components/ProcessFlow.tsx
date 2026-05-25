/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search, Flame, PenTool, ClipboardCheck, ToggleLeft, ArrowRight } from "lucide-react";

interface ProcessFlowProps {
  lang: "ur" | "en";
}

export default function ProcessFlow({ lang }: ProcessFlowProps) {
  const steps = [
    {
      num: "01",
      icon: <Search className="w-5 h-5 text-amber-500" />,
      titleEn: "Free Survey",
      titleUr: "مفت سائیٹ سروے",
      descEn: "Engineers inspect structure strength and shadow-free direction coordinates.",
      descUr: "سولر اسٹوڈیو کے انجینئرز چھت کی پیمائش اور دھوپ کی بہترین سمت کا تعین کرتے ہیں۔"
    },
    {
      num: "02",
      icon: <PenTool className="w-5 h-5 text-emerald-500" />,
      titleEn: "Custom Engineering",
      titleUr: "ماہرانہ ڈیزائننگ",
      descEn: "We draft structural loading calculations & dynamic electrical diagram maps.",
      descUr: "آپ کے لوڈ اور ضرورت کے مطابق تھری-ڈی پینل نقشہ اور وائرنگ ڈرافٹ تیار کیا جاتا ہے۔"
    },
    {
      num: "03",
      icon: <Flame className="w-5 h-5 text-blue-500" />,
      titleEn: "Certified Setup",
      titleUr: "تنصیب و فٹنگ",
      descEn: "Mounting Tier-1 bifacial panels using heavy-duty Rust-proof GI frames.",
      descUr: "تیز ترین اور محفوظ ترین طریقے سے درآمد شدہ پینلز اور انورٹرز کی فٹنگ کی جاتی ہے۔"
    },
    {
      num: "04",
      icon: <ClipboardCheck className="w-5 h-5 text-amber-500" />,
      titleEn: "NEPRA approvals",
      titleUr: "نیٹ میٹرنگ کارروائی",
      descEn: "We file full paper cases to LESCO, KE, etc. and manage testing licenses.",
      descUr: "نیپرا کو مکمل فائل جمع کروا کر ٹیسٹنگ رپورٹ اور گرین میٹر منظور کروایا جاتا ہے۔"
    },
    {
      num: "05",
      icon: <ToggleLeft className="w-5 h-5 text-emerald-500" />,
      titleEn: "Green Meter Activate",
      titleUr: "گرین میٹر چالو",
      descEn: "Utility replaces meter. Grid buys back your solar electricity at guaranteed rates.",
      descUr: "نیا دو طرفہ میٹر چالو ہونے کے بعد بجلی سرکاری گرڈ کو برآمد ہونا شروع ہوجاتی ہے!"
    }
  ];

  return (
    <section id="net-metering" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Intro heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 animate-fade-in">
          <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            {lang === "ur" ? "ہمارا طریقہ کار" : "Our Step-by-Step Methodology"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#f8fafc] leading-tight">
            {lang === "ur" 
              ? "مفت سروے سے لے کر گرین میٹر (بل زیرو) تک کا سفر" 
              : "The Flawless Road back to Zero Electricity Load"}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {lang === "ur"
              ? "سولر اسٹوڈیو آپ کو پریشان کن دفتر کارروائی سے دور رکھتا ہے۔ ہم ہر ایک چیز کی کاغذی کارروائی خود چلاتے ہیں۔"
              : "Our verified process shields you from bureaucratic hassle. We engineer, load-test, license, and deliver your bidirectional flow."}
          </p>
        </div>

        {/* Steps mapping horizontal grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="relative p-6 bg-slate-950/80 border border-slate-800/80 rounded-2xl flex flex-col justify-between transition-all hover:bg-slate-950 hover:shadow-xl hover:shadow-amber-500/5 group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-800 tracking-wider font-mono select-none group-hover:text-amber-500 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-100 urdu-font group-hover:text-amber-400 transition-colors">
                    {lang === "ur" ? step.titleUr : step.titleEn}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed urdu-font">
                    {lang === "ur" ? step.descUr : step.descEn}
                  </p>
                </div>
              </div>

              {/* Little timeline link line for larger screens */}
              {idx < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-10 text-slate-800">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
