/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Cpu, AppWindow, PiggyBank, RefreshCw, Zap } from "lucide-react";

interface AboutSectionProps {
  lang: "ur" | "en";
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const highlights = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-500" />,
      titleEn: "Certified Engineers",
      titleUr: "سرٹیفائیڈ انجینئرز",
      descEn: "AEDB & PEC Grade-A licensed constructors delivering precise solar designs and safe structures.",
      descUr: "ہم وفاقی حکومت (AEDB) اور پاکستان انجینئرنگ کونسل سے رجسٹرڈ اور تسلیم شدہ فرسٹ کلاس انجینئرز ہیں۔"
    },
    {
      icon: <Cpu className="w-8 h-8 text-emerald-500" />,
      titleEn: "Tier-1 Heavy Hardware",
      titleUr: "ٹائر-1 اوریجنل ہارڈ ویئر",
      descEn: "Longi Hi-MO 6 double-glass, Jinko Tiger Neo N-Type panels and premium brand Huawei/Growatt inverters.",
      descUr: "ہم صرف ٹاپ ورلڈ ریٹیڈ پینلز (Longi or Jinko) اور بہترین انورٹرز نصب کرتے ہیں جن کی 25 سال وارنٹی ہے۔"
    },
    {
      icon: <AppWindow className="w-8 h-8 text-blue-500" />,
      titleEn: "Continuous App Monitoring",
      titleUr: "موبائل ایپ لائیو مانیٹرنگ",
      descEn: "Track daily units generation, export stats, and device temperature live on your smartphone app.",
      descUr: "اپنے موبائل پر لائیو یونٹ جنریشن اور گرڈ کو برآمد ہونے والی بجلی کی مقدار پل پل مانیٹر کریں۔"
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-amber-500" />,
      titleEn: "Unbeatable ROI (3 Years)",
      titleUr: "شاندار کاروباری بچت",
      descEn: "Fastest payback period of under 3.5 years. Free your assets from spiraling NEPRA tariffs instantly.",
      descUr: "صرف 3 سے 3.5 سال کے عرصے میں سولر کا کل خرچہ پورا، اس کے بعد اگلے 22 سال بجلی بالکل فری!"
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-emerald-500" />,
      titleEn: "Done-for-you Net Metering",
      titleUr: "نیٹ میٹرنگ کی مکمل کارروائی",
      descEn: "Complete LESCO, K-Electric, FESCO application filing, licensing, testing and bi-directional meter setup.",
      descUr: "ہم لوڈ تبدیل کروانے سے لے کر گرین میٹر کے حصول تک تمام کاغذی کام خود انجام دیتے ہیں۔"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      titleEn: "Dual Backup Smart Mode",
      titleUr: "لوڈ شیڈنگ سے مکمل آزادی",
      descEn: "Auto changeover to lithium-ion batteries during load shedding. Keeps vital cooling running uninterrupted.",
      descUr: "دھوپ نہ ہونے یا رات کے وقت لوڈ شیڈنگ کی صورت میں جدید بیٹریاں خودکار بیک اپ مہیا کرتی ہیں۔"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
            {lang === "ur" ? "ہمارا تعارف اور خوبیاں" : "Why Choose Solar Studio Pakistan"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {lang === "ur" 
              ? "پچھلے 10 سال سے پاکستان بھر میں ہزاروں پیارے گھروں کو روشن کرنے کا عزم" 
              : "Decade of Delivering Clean Solar Autonomy Across the Nation"}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {lang === "ur"
              ? "سولر اسٹوڈیو محض پینل نہیں بیچتا، بلکہ ہم ایک محفوظ سرمایہ کاری مہیا کرتے ہیں جس سے آپ کے پیسے محفوظ رہتے ہیں اور مہنگی بجلی سے ہمیشہ کے لیے جان چھوٹتی ہے۔"
              : "We don't just put panels on roofs. We engineer long-term, high-yield solar financial investments that lock your energy costs at absolute zero."}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-100/50 p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm mb-5">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 urdu-font mb-2">
                {lang === "ur" ? item.titleUr : item.titleEn}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed urdu-font">
                {lang === "ur" ? item.descUr : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Brand Promise Section Banner */}
        <div className="mt-16 bg-slate-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h4 className="text-xl sm:text-2xl font-black urdu-font text-amber-400">
                {lang === "ur" 
                  ? "کیا آپ اپنے موجودہ بجلی بل سے پریشان ہیں اور مشورہ چاہتے ہیں؟" 
                  : "Frustrated with Fuel Surcharges & High Taxes in Bill?"}
              </h4>
              <p className="text-slate-300 text-sm">
                {lang === "ur"
                  ? "ہمارے سولر انجینئرز پورے پاکستان میں مفت سائیٹ سروے اور بل بچت کا معائنہ کرتے ہیں۔ سولر لگوانا کوئی معمہ نہیں، اب آپ کے لیے آسان سلیقہ پیش ہے۔"
                  : "We offer zero-cost expert structural site surveys and historic bill analysis. Our Urdu Voice customer support agent can calculate your perfect sizes right now!"}
              </p>
            </div>
            <div className="md:col-span-4 text-center md:text-right">
              <a 
                href="#calculator"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-lg active:scale-95"
              >
                <span>{lang === "ur" ? "بچت کیلکولیٹر چلائیں" : "Open Sizing Calculator"}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
