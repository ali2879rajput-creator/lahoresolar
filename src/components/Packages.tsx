/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SOLAR_PACKAGES } from "../data";
import { SolarPackage } from "../types";
import { Zap, CircleCheck, Compass, HelpCircle, BadgePercent, ChevronRight, MessageSquareMore } from "lucide-react";

interface PackagesProps {
  lang: "ur" | "en";
  onConsultPackage: (pkg: SolarPackage) => void;
}

export default function SolarPackages({ lang, onConsultPackage }: PackagesProps) {
  return (
    <section id="packages" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full">
            {lang === "ur" ? "ہمارے سولر پینل پیکجز اور رینج" : "Premium Solar Sizing Packages"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {lang === "ur" 
              ? "اپنی مرضی کے مطابق الٹرا مونو پینلز اور سمارٹ انورٹرز سسٹمز" 
              : "Certified AEDB Solars Tailored to Your Family Needs"}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            {lang === "ur"
              ? "سولر اسٹوڈیو پیش کرتا ہے پاکستان کے سب سے مستند اور پائیدار پیکیجز۔ تمام قیمتیں لیسکو، کے-الیکٹرک کے قوانین اور گرین میٹر کی شمولیت کے مطابق ڈیزائن کی گئی ہیں۔"
              : "All packages utilize premium Tier-1 hardware (Longi double-glass or Jinko N-Type), custom heavy-duty structure mounts, and include complete grid approvals."}
          </p>
        </div>

        {/* Card list */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {SOLAR_PACKAGES.map((pkg) => {
            const isFeatured = pkg.id === "5kw" || pkg.id === "10kw";
            return (
              <div 
                key={pkg.id}
                className={`relative flex flex-col justify-between bg-white border rounded-3xl transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200 ${
                  isFeatured 
                    ? "border-amber-500 shadow-lg shadow-amber-500/5 ring-2 ring-amber-500/10 scale-100 md:scale-[1.02]" 
                    : "border-slate-100"
                }`}
              >
                {/* Popular recommendation badge */}
                {isFeatured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular Solutions
                  </span>
                )}

                <div className="p-6 sm:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-sm font-bold text-slate-400 block uppercase tracking-wide">Solar Studio</span>
                      {pkg.eligibleForNetMetering && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-tight">
                          Net Metering Enabled
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">{pkg.size}</span>
                      <span className="text-sm font-medium text-slate-500">System</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 mt-2 urdu-font">
                      {lang === "ur" ? pkg.titleUrdu : pkg.titleEnglish}
                    </h3>
                  </div>

                  {/* Price range */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">{lang === "ur" ? "اندازاً قیمت (مکمل فٹنگ)" : "Est. Setup Cost"}</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#d97706] mt-0.5 block">{pkg.priceRange}</span>
                  </div>

                  {/* Appliance power list */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      {lang === "ur" ? "چلنے والا لوڈ (تفصیل)" : "Load Capacity Example"}
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {lang === "ur" ? (
                        pkg.appliancesUrdu.map((app, idx) => (
                          <li key={idx} className="flex gap-2 items-start text-right">
                            <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span className="urdu-font">{app}</span>
                          </li>
                        ))
                      ) : (
                        pkg.appliances.map((app, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{app}</span>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  {/* Tech specs list */}
                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500 leading-normal">
                    <div className="flex justify-between">
                      <span>Panels:</span>
                      <span className="font-semibold text-slate-700">{pkg.panelsCount} x 580W+ Tier-1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inverter:</span>
                      <span className="font-semibold text-slate-700">{pkg.inverterCapacity.split(" ").slice(0, 3).join(" ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Warranty:</span>
                      <span className="font-semibold text-slate-700">25 Years Solar Panel / 10 Yr Inverter</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Payback:</span>
                      <span className="font-semibold text-emerald-600">{pkg.recoveryPeriod}</span>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="p-6 bg-slate-50 rounded-b-3xl border-t border-slate-100 flex items-center justify-between">
                  {/* Button linked directly to the Urdu Chat Assistant overlay */}
                  <button 
                    onClick={() => onConsultPackage(pkg)}
                    className="w-full flex items-center justify-center gap-1.5 bg-slate-900 group-hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer hover:bg-amber-500 hover:text-slate-950 transition-all active:scale-95"
                  >
                    <MessageSquareMore className="w-4 h-4" />
                    <span className="urdu-font">
                      {lang === "ur" ? "اردو اسسٹنٹ سے تفصیل لیں" : "Inquire in Urdu"}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
