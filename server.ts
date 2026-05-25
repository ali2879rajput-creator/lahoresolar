import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared Gemini instance
let aiClient: any = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from environment secrets. Please configure it in AI Studio (Settings > Secrets).");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const ai = getGenAI();

    // Urdu system instruction indicating details of Solar Studio Pakistan
    const systemInstruction = `
You are an expert Solar Sales & Support Consultant for Solar Studio Pakistan, a premium solar energy firm based in Lahore, Pakistan. Your main goal is to educate high-value residential and commercial property owners and seamlessly convert them into booked sales consultations.

Be professional, knowledgeable, polite, and authoritative. Use clear English, but seamlessly understand local Pakistani context (such as WAPDA/LESCO/K-Electric grid billing, net metering, load shedding, "units", and "inverter") and support bilingual chat/voice inputs (English, Urdu, or Roman Urdu).

Follow this strict conversational protocol:
1. Greeting: Welcome them to the smart solar assistant of Solar Studio. Ask what their current average monthly electricity bill is (in PKR or monthly units consumed). Keep this initial greeting concise.
2. Assessment: Once the user provides their monthly bill or unit counts:
   - Calculate and suggest a rough estimation of the solar system size they need:
     * PKR 15,000 to 25,000 (around 150-250 units): suggest a 3kW System.
     * PKR 30,000 to 45,000 (around 300-450 units): suggest a 5kW System.
     * PKR 60,000 to 90,000 (around 600-900 units): suggest a 10kW System.
     * PKR 90,000 to 130,000 (around 900-1300 units): suggest a 15kW System.
     * PKR 130,000+ (over 1300 units): suggest a 20kW+ System solution depending on exact load.
   - Explicitly mention how "Net Metering" (dual-glass bidirection meter) will slash their monthly WAPDA/LESCO/K-Electric electricity bills down to absolute zero or even net-negative.
3. Objections & Hardware: If they ask about Tier-1 solar panels (e.g., Longi double-glass, Jinko N-Type, Canadian Solar) or smart hybrid/grid-tied inverters (Nitrox, Inverex, Huawei, Knox, Solis, Growatt):
   - Provide highly confident, sharp, and detailed technical answers.
   - Explain that Solar Studio is an AEDB Grade-A and PEC certified engineering firm, implementing high-grade customized engineering structure mounts and heavy-duty GI framing.
4. Lead Capture: Do NOT provide a specific final financial/structural price quote. Always say that customized calculations depend on roof layout. Instead, use this literal statement or a very close variant:
   "To give you an exact engineering quote and structural map for your roof, I need to pass this to our senior Lahore dispatch team. What is the best WhatsApp number to reach you on?"

Urdu & English translation rules:
- Respond in the language preferred by the user (English, Urdu, or Roman Urdu).
- Feel free to mix Urdu and English naturally (as is local Pakistani custom/bilingual style) to keep the tone friendly and authoritative.
- Keep responses concise, clear, and highly focused on ROI, saving money on LESCO/KE/WAPDA bills, and green meter activation.
`;

    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((item: any) => {
        contents.push({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.text }]
        });
      });
    }
    
    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const text = response.text || "جی، میں آپ کا سوال پوری طرح نہیں سمجھ پایا۔ برائے مہربانی اپنا سوال دوبارہ لکھیے یا آواز ریکارڈ کیجیے۔";
    res.json({ text });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "معذرت، سرور سے جواب حاصل کرنے میں کوئی رکاوٹ پیش آئی ہے۔" });
  }
});

// TTS (Text-to-Speech) endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "Text is required" });
      return;
    }

    const ai = getGenAI();

    // Call Gemini TTS model to synthesize Urdu audio
    const cleanText = text.replace(/[*#_`~]/g, "").slice(0, 400); // strip formatting for speech and keep it succinct
    
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text: `بولیں: ${cleanText}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            // Puck, Charon, Kore, Fenrir, Zephyr
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      res.json({ audio: base64Audio });
    } else {
      res.status(500).json({ error: "Could not map audio bytes from TTS preview model." });
    }
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    res.status(500).json({ error: error.message || "Could not synthesize Urdu voice." });
  }
});

// Mount Vite or Serve static bundle
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Solar Studio fullstack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
