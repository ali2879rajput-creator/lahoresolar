/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, ArrowDown, ShieldAlert, Sparkles, Sliders, MessageSquare, BadgeCheck } from "lucide-react";

interface HeroProps {
  onOpenAssistant: () => void;
  lang: "ur" | "en";
}

export default function Hero({ onOpenAssistant, lang }: HeroProps) {
  return (
    <section id="hero" className="relative bg-slate-950 text-white pt-12 pb-24 overflow-hidden">
      {/* Decorative Radial Sun glow gradient */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Dynamic Background Sun rays or grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex mt-4 items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="urdu-font">
                {lang === "ur" ? "بجلی کے بھاری بلوں سے نجات حاصل کریں!" : "Say Goodbye to Heavy Electricity Bills in Pakistan!"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-100">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                {lang === "ur" ? "آئیے اپنے پیارے گھر کو" : "Let's Bring Solar Into"}
              </span>
              <span className="block text-amber-500 urdu-font py-2">
                {lang === "ur" ? "روشن اور خودمختار بنائیں!" : "Your Lovely House!"}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              {lang === "ur" 
                ? "سولر اسٹوڈیو پاکستان پچھلے 10 سال سے ملک بھر میں 10 میگاواٹ سے زیادہ معیاری سولر نصب کر چکا ہے۔ ہم فراہم کرتے ہیں مستند انجینئرنگ اور محفوظ ترین نیٹ میٹرنگ (مفت سروے اور لائسنس کے ساتھ)!" 
                : "Solar Studio is a premier certified PEC and AEDB solar energy company in Pakistan. We've successfully energized 10+ MW across homes, agricultural farms, and factories with guaranteed Net Metering & Tier-1 premium components."}
            </p>

            {/* CTA Option Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onOpenAssistant}
                className="group relative flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-2xl text-base shadow-xl shadow-amber-500/20 transition-all duration-300 cursor-pointer"
              >
                <div className="absolute -inset-1 rounded-2xl bg-amber-500/20 blur opacity-40 group-hover:opacity-100 transition-opacity"></div>
                <MessageSquare className="w-5 h-5 animate-pulse text-slate-900" />
                <span className="urdu-font">اردو اسسٹنٹ سے گفتگو کریں (وائس چیٹ)</span>
              </button>

              <a 
                href="#calculator"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold px-6 py-4 rounded-2xl text-base transition-all"
              >
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span className="urdu-font">{lang === "ur" ? "بچت کیلکولیٹر چلائیں" : "Solar Calculator"}</span>
              </a>
            </div>

            {/* Quick credentials badges row */}
            <div className="pt-6 border-t border-slate-900 flex flex-wrap gap-4 justify-center lg:justify-start items-center text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Certified by:</span>
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Alternative Energy Board (AEDB)</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Pakistan Engineering Council (PEC)</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
                <BadgeCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>NEPRA Approved</span>
              </div>
            </div>
          </div>

          {/* Right graphics column - Interactive solar stats dashboard */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-3xl backdrop-blur-sm shadow-2xl">
              {/* Green solar visual accent */}
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500/20 rounded-xl border border-emerald-500/30 flex items-center justify-center animate-bounce">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Live Plant Data</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">2026 Live Counter</span>
                </div>

                {/* Stat 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Installed Capacity</span>
                    <p className="text-3xl font-extrabold text-amber-400 mt-1">10 MW+</p>
                    <span className="text-[11px] text-slate-400 urdu-font mt-0.5 block">پاکستان بھر میں نصب</span>
                  </div>
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Years Experience</span>
                    <p className="text-3xl font-extrabold text-white mt-1">10+ Years</p>
                    <span className="text-[11px] text-slate-400 urdu-font mt-0.5 block">قائم شدہ سال 2016</span>
                  </div>
                </div>

                {/* Direct Solar Impact Indicator */}
                <div className="bg-gradient-to-r from-emerald-950/40 to-slate-950/70 p-4 rounded-2xl border border-emerald-900/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider">CO₂ Emmissions Prevented</span>
                      <p className="text-2xl font-black text-white mt-0.5">14,250 Tons</p>
                    </div>
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Carbon Free</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3">
                    <div className="bg-emerald-500 h-1.5 rounded-full w-[85%]"></div>
                  </div>
                </div>

                {/* Standard Pricing Trend Highlight */}
                <div className="flex items-center gap-3 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/50">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-200">
                      {lang === "ur" ? "پینلز کی قیمتوں میں زبردست کمی کا موقع!" : "Alert: Solar Panel Prices in Pakistan are Historic Low!"}
                    </p>
                    <p className="text-slate-400 mt-0.5">
                      {lang === "ur" ? "ابھی سولر لگوائیں اور بلوں سے چھٹکارا پائیں۔" : "Get maximum ROI. Call us now for immediate pricing survey."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background vector element */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs backdrop-blur">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707" />
                </svg>
              </div>
              <div className="text-[11px] leading-tight text-slate-300">
                <p className="font-bold text-amber-400">LESCO & KE approved Net Metering</p>
                <p className="text-slate-400">We complete full licensing files to zero your load.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-55 animate-bounce text-slate-400 text-xs font-semibold cursor-pointer">
        <span>Scroll to Explore</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </div>
    </section>
  );
}
