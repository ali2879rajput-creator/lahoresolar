/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, BadgeCheck, CheckCircle, Clock } from "lucide-react";
import { PAKISTANI_CITIES } from "../data";

interface ContactSectionProps {
  lang: "ur" | "en";
  initialMessageText?: string;
}

export default function ContactSection({ lang, initialMessageText = "" }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Lahore (لاہور)");
  const [bill, setBill] = useState("");
  const [msg, setMsg] = useState(initialMessageText);
  const [submitted, setSubmitted] = useState(false);

  // Update msg if initialMessageText changes
  useState(() => {
    if (initialMessageText) {
      setMsg(initialMessageText);
    }
  });

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert(lang === "ur" ? "برائے مہربانی اپنا نام اور موبائل نمبر درج کریں۔" : "Full Name and Mobile Phone are required.");
      return;
    }

    const payload = {
      name,
      phone,
      city,
      averageBill: bill || "Not provided",
      message: msg || "Solar installation interest",
      timestamp: new Date()
    };

    console.log("On-page Lead submitted:", payload);

    // Save in storage
    const currentLeads = JSON.parse(localStorage.getItem("solar_studio_leads") || "[]");
    currentLeads.push(payload);
    localStorage.setItem("solar_studio_leads", JSON.stringify(currentLeads));

    setSubmitted(true);
    // clear input fields
    setName("");
    setPhone("");
    setBill("");
    setMsg("");
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Company contact info column */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#d97706] uppercase bg-amber-100 px-3 py-1 rounded-full w-fit block">
                {lang === "ur" ? "رابطہ کرنے کا پتہ" : "Get In Touch Now"}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
                {lang === "ur" 
                  ? "ہمارے سولر اسٹوڈیو نمائندے سے رابطہ کریں" 
                  : "We're Ready to Power Your Property"}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {lang === "ur"
                  ? "سولر اسٹوڈیو پاکستان کا مرکزی ہیڈ آفس لاہور فیز 5 ڈی ایچ اے میں واقع ہے، اور ہماری ٹیمیں پورے پاکستان میں لائیو فٹنگ اور سروے کرتی ہیں۔"
                  : "Have any questions about Net Metering, monthly payback rates, or customized structure weights? Reach out directly via phone or submit an audit ticket."}
              </p>

              {/* Direct indicators */}
              <div className="space-y-4">
                <a 
                  href="tel:+923009276995" 
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100/80 hover:shadow shadow-sm transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#b45309] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Call or WhatsApp</span>
                    <span className="text-lg font-black text-slate-900 tracking-tight">+92 300 9276995</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Main Head Office</span>
                    <span className="text-sm font-bold text-slate-900 leading-tight">Floor 2, DHA Phase 5, Lahore, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Operational Timing</span>
                    <span className="text-sm font-bold text-slate-900 leading-tight">Mon - Sat: 9:00 AM to 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guaranteed credentials badge */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex items-center gap-3">
              <BadgeCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold">Original AEDB Grade-A Guarantee</p>
                <p className="text-slate-400 mt-0.5">We are safe licensed installers. All solar structural calculations run on certified structural analysis software.</p>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-100 shadow-md">
            {!submitted ? (
              <form onSubmit={handleSend} className="space-y-6">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-bold text-slate-900">
                    {lang === "ur" ? "مفت سائٹ سروے کی درخواست کے لیے لکھیں" : "Get a Free Estimated System Design Plan"}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm">
                    {lang === "ur" 
                      ? "اپنا پیغام بھیجیں، ہماری تکنیکی ٹیم مفت سروے کے لیے آپ سے رابطہ کر کے تفصیلی معلومات فراہم کرے گی۔" 
                      : "Fill the quick parameters. We'll map the structural capacity and quote a tailored cash budget."}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5 urdu-font">
                      {lang === "ur" ? "آپ کا نام" : "Full Name"} *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder={lang === "ur" ? "نام درج کریں" : "e.g. Hammad Malik"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-slate-950 font-semibold text-sm bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5 urdu-font">
                      {lang === "ur" ? "موبائل فون نمبر" : "Mobile Phone No"} *
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 03xx xxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-slate-950 font-bold text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5 urdu-font">
                      {lang === "ur" ? "آپ کا شہر" : "Your City"}
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    >
                      {PAKISTANI_CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5 urdu-font">
                      {lang === "ur" ? "ماہانہ اوسط بل رقم" : "Monthly Avg Bill (PKR)"}
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. 45,000"
                      value={bill}
                      onChange={(e) => setBill(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-slate-950 font-semibold text-sm bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase mb-1.5 urdu-font">
                    {lang === "ur" ? "پیغام / تفصیلات" : "Your Message"}
                  </label>
                  <textarea 
                    rows={4}
                    placeholder={lang === "ur" ? "اپنی چھت کا سائز، پینلز یا بجٹ کے بارے میں لکھیں..." : "Mention roof size, preference of panels (Jinko/Longi) or grid details..."}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-slate-950 font-semibold text-sm bg-slate-50/50 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 px-6 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-extrabold rounded-2xl text-base shadow active:scale-95 transition-all text-center cursor-pointer"
                >
                  <span className="urdu-font">{lang === "ur" ? "درخواست بھیجیں" : "Submit Audit Request"}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 urdu-font">
                    {lang === "ur" ? "انکوائری کامیابی سے موصول ہوگئی!" : "Inquiry Lodged with Solar Studio Engineers"}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
                    {lang === "ur"
                      ? "شکریہ! آپ کی تفصیل لائیو انجینئرز تک پہنچ چکی ہے۔ ہم آپ کے رابطہ نمبر پر کال یا واٹس ایپ کر کے سروے کا وقت فائنل کریں گے۔"
                      : "Thank you for contacting Solar Studio. Our technical lead engineers will compile structural capacity options and reach out on your mobile number shortly."}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs"
                  >
                    {lang === "ur" ? "دوبارہ لکھیں" : "Send Another Inquiry"}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
