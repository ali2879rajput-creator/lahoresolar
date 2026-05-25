/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import SolarCalculator from "./components/Calculator";
import SolarPackages from "./components/Packages";
import ProcessFlow from "./components/ProcessFlow";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import UrduAssistant from "./components/UrduAssistant";
import LeadModal from "./components/LeadModal";
import Footer from "./components/Footer";
import { SolarPackage } from "./types";
import { Bot, PhoneCall, Sparkles, MessageSquare, ShieldCheck, Mail } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"ur" | "en">("en"); // Default English website view with dynamic Urdu toggles
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [prefilledPrompt, setPrefilledPrompt] = useState("");
  const [selectedSystemSize, setSelectedSystemSize] = useState("5 kW");

  // Hook for Sizing Calculator to link directly to chat
  const handleConsultSize = (size: string) => {
    setPrefilledPrompt(`مجھے ${size} سولر سسٹم کے خرچے اور فوائد کے بارے میں تفصیل جاننی ہے۔`);
    setAssistantOpen(true);
  };

  // Hook for Pricing card to link directly to chat
  const handleConsultPackage = (pkg: SolarPackage) => {
    setPrefilledPrompt(`مجھے آپ کے ${pkg.size} ${lang === "ur" ? pkg.titleUrdu : pkg.titleEnglish} پیکیج کے لوڈ کی گنجائش اور انورٹر کی وارنٹی کے بارے میں بتائیں۔`);
    setAssistantOpen(true);
  };

  const handleOpenLeadModal = (size: string = "5 kW") => {
    setSelectedSystemSize(size);
    setLeadModalOpen(true);
  };

  return (
    <div className="relative min-h-screen font-sans bg-slate-50 text-slate-900 overflow-x-hidden antialiased select-none selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Nav Navigation Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onOpenAssistant={() => setAssistantOpen(true)} 
      />

      {/* 2. Hero Presentation Fold */}
      <Hero 
        lang={lang} 
        onOpenAssistant={() => setAssistantOpen(true)} 
      />

      {/* 3. About Company / Trust Section */}
      <AboutSection 
        lang={lang} 
      />

      {/* 4. Interactive ROIs/Bills Calculator */}
      <SolarCalculator 
        lang={lang} 
        onConsultSize={handleConsultSize} 
      />

      {/* 5. Grid Packages */}
      <SolarPackages 
        lang={lang} 
        onConsultPackage={handleConsultPackage} 
      />

      {/* 6. NEPRA Green Meter Process Timeline */}
      <ProcessFlow 
        lang={lang} 
      />

      {/* 7. FAQs Segment */}
      <FAQSection 
        lang={lang} 
      />

      {/* 8. On-page lead submissions */}
      <ContactSection 
        lang={lang} 
      />

      {/* Floating Solar AI Button (At the bottom-right for instant Urdu advisor help) */}
      <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-2">
        {/* Floating Quick Call Button for Pakistan */}
        <a
          href="tel:+923009276995"
          className="flex items-center justify-center p-3.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-full shadow-2xl transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-95 cursor-pointer border border-[#059669]/50"
          title="Call Solar Studio Pakistan"
        >
          <PhoneCall className="w-5.5 h-5.5" />
        </a>

        {/* Urdu assistant floating launcher */}
        <button
          onClick={() => setAssistantOpen(!assistantOpen)}
          className="group relative flex items-center justify-center p-4 bg-amber-500 hover:bg-slate-900 border-2 border-amber-400 group-hover:border-slate-800 text-slate-950 hover:text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          style={{ width: "60px", height: "60px" }}
        >
          {/* Pulsing glow surround ring */}
          <div className="absolute -inset-1.5 rounded-full bg-amber-500/20 pulse-ring"></div>
          
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 shrink-0 animate-pulse text-slate-950 group-hover:text-white" />
            
            {/* Pop message hover */}
            <span className="absolute right-14 bg-slate-900 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity uppercase tracking-wider whitespace-nowrap hidden sm:block">
              اردو وائس چیٹ اسسٹنٹ
            </span>
          </div>
        </button>
      </div>

      {/* Floating Audit Button Booking (Fixed bottom-right corner) */}
      <button 
        onClick={() => handleOpenLeadModal()}
        className="fixed bottom-6 right-6 z-35 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-5 py-3 rounded-full text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer tracking-wider flex items-center gap-1.5 border border-amber-300/40"
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0 animate-bounce" />
        <span className="urdu-font">{lang === "ur" ? "مفت سائیٹ سروے" : "Book Free Audit"}</span>
      </button>

      {/* 9. Urdu Assistant conversation drawer overlay */}
      <UrduAssistant 
        isOpen={assistantOpen} 
        onClose={() => setAssistantOpen(false)} 
        lang={lang}
        prefilledPrompt={prefilledPrompt}
        setPrefilledPrompt={setPrefilledPrompt}
      />

      {/* 10. Audit Booking lead model popup */}
      {leadModalOpen && (
        <LeadModal 
          onClose={() => setLeadModalOpen(false)} 
          lang={lang} 
          initialSystemSize={selectedSystemSize}
        />
      )}

      {/* 11. Footer details */}
      <Footer 
        lang={lang} 
      />

    </div>
  );
}
