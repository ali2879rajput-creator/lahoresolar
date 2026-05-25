/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FAQS } from "../data";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FAQSectionProps {
  lang: "ur" | "en";
}

export default function FAQSection({ lang }: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // open first FAQ by default

  return (
    <section id="faqs" className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-widest text-[#d97706] uppercase bg-amber-50 px-3 py-1 rounded-full flex mx-auto justify-center w-fit items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === "ur" ? "عام طور پر پوچھے جانے والے سوالات" : "Frequently Answered Queries"}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {lang === "ur" ? "سولر سسٹم سے متعلق اہم معلومات" : "Understand Solar Sizing Regulations"}
          </h2>
          <p className="text-slate-500 text-sm">
            {lang === "ur"
              ? "پاکستان میں نیٹ میٹرنگ اور سولر کی تنصیب سے متعلق اہم اور بنیادی سوالات کے جوابات یہاں دستبردار ہیں۔"
              : "Read vital technical information about NEPRA, LESCO/KE net metering rates, and battery back-ups."}
          </p>
        </div>

        {/* List of accordion nodes */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-100/85 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-slate-900 font-bold text-sm sm:text-base cursor-pointer hover:bg-amber-500/5"
                >
                  <span className="urdu-font">
                    {lang === "ur" ? faq.qUr : faq.qEn}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-500 shrink-0 ml-3" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-3" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1.5 text-xs sm:text-sm text-slate-600 border-t border-slate-100/50 leading-relaxed font-medium">
                    <p className="urdu-font">
                      {lang === "ur" ? faq.aUr : faq.aEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
