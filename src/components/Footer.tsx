/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, ArrowUp } from "lucide-react";

interface FooterProps {
  lang: "ur" | "en";
}

export default function Footer({ lang }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-900/60">
          
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-amber-500 rounded-lg">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-950" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight text-white">SOLAR STUDIO</span>
              <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest -mt-1">Pakistan</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 md:text-right urdu-font max-w-md">
            {lang === "ur"
              ? "سولر اسٹوڈیو پاکستان ایک اے ای ڈی بی اور پی ای سی منظور شدہ گریڈ-اے الیکٹریکل اور سولر انجینئرز فراہم کار کمپنی ہے۔"
              : "Solar Studio is AEDB Grade-A, PEC & NEPRA approved engineering design and construction constructor since 2016."}
          </p>

          <button 
            onClick={handleScrollTop}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-400 font-bold transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-slate-600">
          <div>
            <p>© {new Date().getFullYear()} Solar Studio Pakistan. Powered by AI Studio in Urdu & English.</p>
          </div>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized NEPRA Grid-Tied EPC Installer</span>
          </div>
          <div className="flex gap-4">
            <a href="#about" className="hover:underline">About</a>
            <a href="#calculator" className="hover:underline">Calculator</a>
            <a href="#packages" className="hover:underline">Packages</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
