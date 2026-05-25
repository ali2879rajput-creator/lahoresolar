/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Phone, MessageSquareCode, Award, ShieldCheck, Languages, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenAssistant: () => void;
  lang: "ur" | "en";
  setLang: (l: "ur" | "en") => void;
}

export default function Header({ onOpenAssistant, lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top Warning/Certification Bar */}
      <div className="bg-amber-500 text-slate-950 py-1.5 px-4 text-xs font-semibold sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1.5 justify-center">
            <Award className="w-4 h-4 animate-bounce" />
            <span className="urdu-font">
              {lang === "ur" 
                ? "PEC اور AEDB گریڈ-اے (Grade-A) تصدیق شدہ سولر کمپنی" 
                : "PEC & AEDB Certified Grade-A Solar Solutions Provider"}
            </span>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1">
               <ShieldCheck className="w-4 h-4 text-emerald-800" />
               <span>100% Net Metering Guarantee</span>
             </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo element with interactive sun vector */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-10 h-10 bg-amber-500 rounded-xl transition-transform group-hover:rotate-12 duration-300">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-6 h-6 text-slate-950" 
                stroke="currentColor" 
                strokeWidth="2.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="M4.93 4.93l1.41 1.41" />
                <path d="M17.66 17.66l1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="M6.34 17.66l-1.41 1.41" />
                <path d="M19.07 4.93l-1.41 1.41" />
              </svg>
              <div className="absolute -inset-1 rounded-xl bg-amber-500/20 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                SOLAR STUDIO
              </span>
              <span className="text-[10px] tracking-widest text-emerald-400 font-bold uppercase -mt-0.5">
                Pakistan
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-amber-400 transition-colors urdu-font">
              {lang === "ur" ? "ہوم" : "Home"}
            </a>
            <a href="#about" className="hover:text-amber-400 transition-colors urdu-font">
              {lang === "ur" ? "کیوں سولر اسٹوڈیو؟" : "Why Choose Us"}
            </a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors urdu-font text-emerald-400">
              {lang === "ur" ? "بچت کیلکولیٹر" : "Savings Calculator"}
            </a>
            <a href="#packages" className="hover:text-amber-400 transition-colors urdu-font">
              {lang === "ur" ? "سولر پیکجز" : "Solar Packages"}
            </a>
            <a href="#net-metering" className="hover:text-amber-400 transition-colors urdu-font">
              {lang === "ur" ? "نیٹ میٹرنگ" : "Net Metering"}
            </a>
            <a href="#faqs" className="hover:text-amber-400 transition-colors urdu-font">
              {lang === "ur" ? "سوالات" : "FAQs"}
            </a>
          </nav>

          {/* CTA Group Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language switch */}
            <button 
              onClick={() => setLang(lang === "ur" ? "en" : "ur")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === "ur" ? "English" : "اردو زبان"}</span>
            </button>

            {/* Calling button */}
            <a 
              href="tel:+923009276995" 
              className="flex items-center gap-2 text-slate-300 hover:text-amber-400 text-sm font-bold transition-all px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              <Phone className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>+92 300 9276995</span>
            </a>

            {/* Urdu AI support */}
            <button 
              onClick={onOpenAssistant}
              className="relative overflow-hidden flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-4.5 py-2.5 rounded-xl text-sm shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <MessageSquareCode className="w-4 h-4 animate-bounce" />
              <span className="urdu-font">اردو وائس چیٹ</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine"></div>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setLang(lang === "ur" ? "en" : "ur")}
              className="p-2 rounded-lg bg-slate-800 text-amber-500"
            >
              <Languages className="w-5 h-5" />
            </button>
            <button 
              onClick={onOpenAssistant}
              className="p-2 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center"
            >
              <MessageSquareCode className="w-5 h-5 animate-pulse" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-900 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-slate-300">
            <a href="#hero" className="py-2 hover:text-amber-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "ہوم" : "Home"}
            </a>
            <a href="#about" className="py-2 hover:text-amber-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "کیوں سولر اسٹوڈیو؟" : "Why Choose Us"}
            </a>
            <a href="#calculator" className="py-2 hover:text-amber-400 text-emerald-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "بچت کیلکولیٹر" : "Savings Calculator"}
            </a>
            <a href="#packages" className="py-2 hover:text-amber-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "سولر پیکجز" : "Solar Packages"}
            </a>
            <a href="#net-metering" className="py-2 hover:text-amber-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "نیٹ میٹرنگ" : "Net Metering"}
            </a>
            <a href="#faqs" className="py-2 hover:text-amber-400 transition-colors urdu-font border-b border-slate-800" onClick={() => setMobileMenuOpen(false)}>
              {lang === "ur" ? "سوالات" : "FAQs"}
            </a>
          </nav>
          <div className="pt-3 flex flex-col sm:flex-row gap-3">
            <a 
              href="tel:+923009276995" 
              className="flex items-center justify-center gap-2 bg-slate-800 text-slate-200 py-3 rounded-lg text-sm font-bold"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+92 300 9276995</span>
            </a>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="flex items-center justify-center gap-2 bg-amber-500 text-slate-950 py-3 rounded-lg text-sm font-bold"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span className="urdu-font">اردو میں بات کریں</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
