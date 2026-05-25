/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  X, Mic, MicOff, Send, Volume2, VolumeX, Sparkles, AlertCircle, 
  HelpCircle, MessageSquareQuote, CheckCircle2, Languages, RefreshCw, AudioLines 
} from "lucide-react";
import { ChatMessage } from "../types";

interface UrduAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ur" | "en";
  prefilledPrompt?: string; // e.g. from recommended calculators
  setPrefilledPrompt?: (v: string) => void;
}

export default function UrduAssistant({ 
  isOpen, 
  onClose, 
  lang, 
  prefilledPrompt = "",
  setPrefilledPrompt
}: UrduAssistantProps) {
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "السلام علیکم! Welcome to Solar Studio's smart Solar Support Assistant. I am an expert Solar Sales & Support Consultant based here in Lahore. To calculate how much you can save and help you zero your bills, could you please tell me what your average monthly electricity bill (in PKR) or the number of units consumed is?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioMode, setAudioMode] = useState<"browser" | "ai">("browser"); // Browser utility vs Gemini TTS
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(true); // Automatically play incoming AI text
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  // Quick query lists
  const quickFaqs = [
    { label: "5kW سولر قیمت", text: "5kW سولر سسٹم کی قیمت اور لوڈ کی تفصیلات کیا ہیں؟" },
    { label: "بل بچت حساب کنندہ", text: "ہمارا اوسط بل 35,000 روپے ہے، ہمیں کون سا سسٹم لگوانا چاہیے؟" },
    { label: "نیٹ میٹرنگ کیا ہے؟", text: "گرین میٹر یا نیٹ میٹرنگ کا کیا طریقہ کار ہے اور اس سے بل کیسے 0 ہوتا ہے؟" },
    { label: "مفت سائٹ سروے", text: "سولر اسٹوڈیو سے مفت سائٹ سروے اور بل معائنہ کیسے بک کیا جا سکتا ہے؟" }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle prefilled prompts (e.g., from Calculator or Package clicks)
  useEffect(() => {
    if (isOpen && prefilledPrompt) {
      handleSendMessage(prefilledPrompt);
      if (setPrefilledPrompt) {
        setPrefilledPrompt(""); // Reset to avoid retriggering
      }
    }
  }, [isOpen, prefilledPrompt]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "ur-PK"; // Urdu Pakistan locale!
      
      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          // Automatically submit vocal transcript as next message!
          handleSendMessage(transcript, true);
        }
      };

      rec.onerror = (err: any) => {
        console.error("Speech Recognition Error:", err);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  // Stop current vocal output
  const stopExistingSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current = null;
    }
    setCurrentlySpeakingId(null);
  };

  // Convert Urdu Text-to-Speech
  const handleSpeakText = async (text: string, messageId: string) => {
    stopExistingSpeech();
    setCurrentlySpeakingId(messageId);

    // Strip visual markdown indicators to speak beautifully
    const plainText = text.replace(/[*#_`~]/g, "");

    if (audioMode === "browser") {
      // Free built-in Speech Synthesis
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = "ur-PK"; // Urdu
        
        // Find best local Urdu voice
        const voices = window.speechSynthesis.getVoices();
        const urduVoice = voices.find(v => v.lang.includes("ur") || v.lang.includes("ur-PK"));
        if (urduVoice) {
          utterance.voice = urduVoice;
        }

        utterance.onend = () => {
          setCurrentlySpeakingId(null);
        };
        utterance.onerror = () => {
          setCurrentlySpeakingId(null);
        };
        
        window.speechSynthesis.speak(utterance);
      } else {
        alert("Your browser does not support Speech Synthesis. Swap to 'AI Advanced' above.");
        setCurrentlySpeakingId(null);
      }
    } else {
      // Advanced Gemini AI Local Core Voice (remote synthesis via API)
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: plainText })
        });

        if (!res.ok) throw new Error("TTS generation failed");
        
        const data = await res.json();
        if (data.audio) {
          const audioUrl = `data:audio/mp3;base64,${data.audio}`;
          const audio = new Audio(audioUrl);
          activeAudioRef.current = audio;
          
          audio.onended = () => {
            setCurrentlySpeakingId(null);
          };
          audio.play();
        } else {
          throw new Error("Empty audio bytes");
        }
      } catch (e) {
        console.error("Advanced AI speech fail:", e);
        // Instant browser callback fallback
        alert("AI Voice stream failed. Falling back to Browser Voice engine.");
        setAudioMode("browser");
        setCurrentlySpeakingId(null);
      }
    }
  };

  // Trigger speech recording
  const handleToggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support speech recognition. We highly recommend Google Chrome for Urdu speech-to-text.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      stopExistingSpeech();
      recognitionRef.current.start();
    }
  };

  // POST chat prompt to backend API
  const handleSendMessage = async (textToSend: string, isFromVoice = false) => {
    const text = textToSend.trim();
    if (!text) return;

    stopExistingSpeech();
    setInputText("");

    const userMessage: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      text: text,
      timestamp: new Date(),
      isVoiceTranscribed: isFromVoice
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Package query history
      const historyPayload = messages.slice(-10).map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error("Failed to receive a response from Solar Studio client.");
      }

      const data = await res.json();
      
      const aiResponseText = data.text || "معذرت، میں آپ کی بات نہیں سمجھ سکا، برائے مہربانی اپنا سوال دوبارہ لکھیے۔";
      const aiMessageId = "ai-" + Date.now();
      
      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: "model",
        text: aiResponseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);

      // Speak back if auto-reading is checked
      if (autoSpeakEnabled) {
        // slight timeout to allow smooth UI rendering
        setTimeout(() => {
          handleSpeakText(aiResponseText, aiMessageId);
        }, 300);
      }

    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: "err-" + Date.now(),
        role: "model",
        text: "معذرت، سرور پر کچھ عارضی خرابی پیش آئی ہے۔ برائے مہربانی اپنا سوال دوبارہ پوچھیے یا پبلک سیکنڈز بعد کوشش کریں۔",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 flex flex-col justify-between shadow-2xl animate-slide-in duration-300">
      
      {/* Header Panel */}
      <div className="bg-slate-900 text-white px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center font-bold text-slate-950 select-none">
              س
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm urdu-font text-amber-400">سولر اسٹوڈیو اسسٹنٹ</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <span className="text-[10px] text-slate-400 block tracking-wide">اردو وائس اور ٹیکسٹ سپورٹ</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Close Action */}
          <button 
            onClick={() => {
              stopExistingSpeech();
              onClose();
            }}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Voice Mode Selector controls */}
      <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 urdu-font">آواز کا انتخاب:</span>
          <select 
            value={audioMode}
            onChange={(e) => {
              stopExistingSpeech();
              setAudioMode(e.target.value as "browser" | "ai");
            }}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="browser">Browser Voice (مفت اور تیز)</option>
            <option value="ai">AI Advanced Voice (فصیح و جدید)</option>
          </select>
        </div>

        {/* Speakback checkbox */}
        <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={autoSpeakEnabled}
            onChange={(e) => {
              if (!e.target.checked) stopExistingSpeech();
              setAutoSpeakEnabled(e.target.checked);
            }}
            className="rounded text-amber-500 focus:ring-amber-500 w-3.5 h-3.5"
          />
          <span className="urdu-font font-medium">آواز خودکار چلائیں</span>
        </label>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-slate-50/50">
        
        {/* Support Alert badge */}
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl flex gap-2.5 items-start text-xs text-amber-800 leading-normal mb-2">
          <AlertCircle className="w-4.5 h-4.5 shrink-0 text-amber-600 mt-0.5" />
          <p className="urdu-font">
            سولر اسٹوڈیو اسسٹنٹ لائیو ہے! بہترین تجربے کے لیے آپ اردو بولیں یا چیٹ میں لکھ کر معلومات حاصل کریں۔ ہینڈز فری تجربے کے لیے <b>آواز خودکار چلائیں</b> کی آپشن کو آن رکھیں۔
          </p>
        </div>

        {/* Message Loop mapping */}
        {messages.map((m) => {
          const isModel = m.role === "model";
          const isSpeaking = currentlySpeakingId === m.id;
          return (
            <div 
              key={m.id}
              className={`flex flex-col gap-1 ${isModel ? "items-start" : "items-end"}`}
            >
              {/* Message bubble */}
              <div 
                dir="rtl"
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm relative group text-sm font-medium ${
                  isModel 
                    ? "bg-white text-slate-950 border border-slate-100 rounded-tl-none font-urdu" 
                    : "bg-amber-500 text-slate-950 rounded-tr-none"
                }`}
              >
                {/* Voice transcription indicator */}
                {!isModel && m.isVoiceTranscribed && (
                  <span className="text-[9px] block text-amber-950/70 font-bold mb-1 flex items-center gap-1">
                    <AudioLines className="w-3.5 h-3.5" />
                    <span>آواز سے ٹرانسکرائب کیا گیا</span>
                  </span>
                )}

                <p className="leading-relaxed whitespace-pre-line text-right">
                  {m.text}
                </p>

                {/* Speaker play option button */}
                {isModel && (
                  <div className="absolute left-2 bottom-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleSpeakText(m.text, m.id)}
                      className={`p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                        isSpeaking ? "text-amber-500 bg-amber-50 animate-pulse" : "text-slate-400"
                      }`}
                      title="Speak Urdu Voice"
                    >
                      {isSpeaking ? (
                        <AudioLines className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Timestamp footer node */}
              <span className="text-[9px] text-slate-400 px-1 font-mono">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex flex-col gap-1 items-start">
            <div className="bg-white text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-slate-100 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-400 urdu-font font-bold ml-1.5">سولر اسٹوڈیو جواب لکھ رہا ہے...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {/* Predefined Urdu Helper Badges */}
      <div className="bg-white px-3 py-2 border-t border-slate-100">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5 urdu-font">فوری مدد کے لیے منتخب کریں:</span>
        <div className="flex flex-wrap gap-1.5">
          {quickFaqs.map((faq, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(faq.text)}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-700 rounded-xl text-xs font-semibold select-none transition-colors duration-150 text-right urdu-font text-[10px] sm:text-xs cursor-pointer"
            >
              # {faq.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Panel Controls */}
      <div className="p-4 bg-white border-t border-slate-200 space-y-3">
        {/* Real-time wave indicators when recording */}
        {isRecording && (
          <div className="py-2.5 px-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl flex items-center gap-3 animate-pulse">
            <div className="flex gap-1">
              <span className="w-1 bg-emerald-500 h-4 rounded animate-bounce"></span>
              <span className="w-1 bg-emerald-500 h-6 rounded animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-1 bg-emerald-500 h-3 rounded animate-bounce [animation-delay:0.3s]"></span>
              <span className="w-1 bg-emerald-500 h-5 rounded animate-bounce [animation-delay:0.45s]"></span>
            </div>
            <span className="text-xs font-bold urdu-font">میں سن رہا ہوں... براہ کرم واضح اردو میں بولیں!</span>
            <button 
              onClick={handleToggleRecording}
              className="ml-auto text-xs font-bold text-emerald-700 underline"
            >
              کنسل کریں
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Micro Recording activator */}
          <button 
            onClick={handleToggleRecording}
            className={`p-3.5 rounded-2xl flex items-center justify-center shadow-md transition-all shrink-0 active:scale-90 cursor-pointer ${
              isRecording 
                ? "bg-red-500 text-white animate-bounce" 
                : "bg-amber-500 text-slate-950 hover:bg-slate-900 hover:text-white"
            }`}
            title="Press to Speak in Urdu"
          >
            {isRecording ? (
              <MicOff className="w-5 h-5 shrink-0" />
            ) : (
              <Mic className="w-5 h-5 shrink-0" />
            )}
          </button>

          {/* Text Input placeholder */}
          <input 
            type="text"
            dir="rtl"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage(inputText);
            }}
            placeholder="اردو میں کچھ لکھیے..."
            className="flex-1 px-4 py-3.5 border border-slate-200 rounded-2xl text-slate-950 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-right font-medium"
          />

          {/* Submit Action */}
          <button 
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="p-3.5 rounded-2xl bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 transition-colors disabled:opacity-40 disabled:hover:bg-slate-900 disabled:hover:text-white flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 -rotate-90 text-right transform" />
          </button>
        </div>
      </div>

    </div>
  );
}
