/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { X, CheckCircle, Calendar, Phone, MapPin, BadgePercent } from "lucide-react";
import { PAKISTANI_CITIES } from "../data";
import { AuditBooking } from "../types";

interface LeadModalProps {
  onClose: () => void;
  lang: "ur" | "en";
  initialSystemSize?: string;
}

export default function LeadModal({ onClose, lang, initialSystemSize = "5 kW" }: LeadModalProps) {
  const [formData, setFormData] = useState<Partial<AuditBooking>>({
    name: "",
    phone: "",
    city: "Lahore (لاہور)",
    averageBill: "",
    message: "",
    systemSizeInterest: initialSystemSize
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(lang === "ur" ? "برائے مہربانی اپنا نام اور فون نمبر لکھیں۔" : "Please fill in your name and phone number.");
      return;
    }
    
    // Log real lead object in mockup local logs
    const lead: AuditBooking = {
      name: formData.name!,
      phone: formData.phone!,
      city: formData.city!,
      averageBill: formData.averageBill || "N/A",
      message: formData.message || "Site Survey Request",
      systemSizeInterest: formData.systemSizeInterest!,
      timestamp: new Date()
    };

    console.log("New Solar Studio Lead Recieved:", lead);
    
    // Store in localStorage so user can see they booked successfully
    const currentLeads = JSON.parse(localStorage.getItem("solar_studio_leads") || "[]");
    currentLeads.push(lead);
    localStorage.setItem("solar_studio_leads", JSON.stringify(currentLeads));

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-slate-100 animate-fade-in">
        
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-[#d97706] uppercase bg-amber-50 px-2 rounded-full">
                {lang === "ur" ? "فری سائیٹ سروے اور بل معائنہ" : "Schedule Free Site Audit"}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {lang === "ur" ? "مفت انجینئرنگ معائنے کے لیے تفاصیل درج کریں" : "Let's Zero Your Monthly Electricity Bill"}
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm">
                {lang === "ur" 
                  ? "ہمارے پی ای سی مجاز انجینئرز آپ کے شیڈول کے مطابق پینلز کی موزوں سمت اور فیزیبلٹی چیک کریں گے۔" 
                  : "Inputs will register with Solar Studio surveyors in Pakistan. We will call you within 12 hours."}
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 urdu-font">
                  {lang === "ur" ? "آپ کا پورا نام" : "Full Name"} *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder={lang === "ur" ? "نام درج کریں" : "e.g. Ali Rajput"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 urdu-font">
                  {lang === "ur" ? "فون نمبر / واٹس ایپ" : "Phone / WhatsApp Number"} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 0300 9276995"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold"
                  />
                </div>
              </div>

              {/* City & Bill info columns */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 urdu-font">
                    {lang === "ur" ? "آپ کا شہر" : "Your City"}
                  </label>
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-950 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {PAKISTANI_CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 urdu-font">
                    {lang === "ur" ? "اوسط بل (PKR)" : "Monthly Bill (PKR)"}
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 35,000"
                    value={formData.averageBill}
                    onChange={(e) => setFormData({ ...formData, averageBill: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  />
                </div>
              </div>

              {/* System size */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 urdu-font">
                  {lang === "ur" ? "مطلوبہ سولر سسٹم سائز" : "Solar System Sizing Interest"}
                </label>
                <select 
                  value={formData.systemSizeInterest}
                  onChange={(e) => setFormData({ ...formData, systemSizeInterest: e.target.value })}
                  className="w-full px-3 py-3 border border-slate-200 rounded-xl text-sm text-slate-950 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="3 kW">3 kW System (No Net Metering)</option>
                  <option value="5 kW">5 kW System (Net Metering)</option>
                  <option value="10 kW">10 kW System (Net Metering)</option>
                  <option value="15 kW">15 kW System (Net Metering)</option>
                  <option value="20 kW">20 kW System + (Mega Solution)</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 px-6 bg-amber-500 hover:bg-slate-950 hover:text-white text-slate-950 font-extrabold rounded-2xl text-sm sm:text-base cursor-pointer shadow-lg active:scale-95 transition-all text-center"
            >
              <span className="urdu-font">{lang === "ur" ? "مفت معائنہ بک کریں" : "Book Survey Appointment"}</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900 urdu-font">
                {lang === "ur" ? "تفصیل کامیابی کے ساتھ موصول ہوئی!" : "Audit Request Submitted Successfully!"}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {lang === "ur"
                  ? `${formData.name} صاحب، آپ کی درخواست درج کر لی گئی ہے۔ سولر اسٹوڈیو کے نمائندے جلد ہی آپ کے نمبر ${formData.phone} پر رابطہ کریں گے۔`
                  : `Dear ${formData.name}, your request has been logged. Our AEDB-certified surveyor will contact you on ${formData.phone} within 12 hours.`}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button 
                onClick={onClose}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm cursor-pointer"
              >
                {lang === "ur" ? "بند کریں" : "Return to Website"}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
