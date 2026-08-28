import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", aiAvailable: !!process.env.GEMINI_API_KEY });
  });

  // AI Smart Tutor Explanation
  app.post("/api/tutor/explain", async (req, res) => {
    try {
      const { question, userAnswer, correctAnswer, subject, topic, grade = "الصف السادس الابتدائي" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          explanation: `أحسنت المحاولة يا بطل! الإجابة الصحيحة هي: (${correctAnswer}). تذكر دائماً مراجعة القاعدة جيداً والتدرب عليها لتحصل على الدرع الذهبي في المرة القادمة! ⭐`,
          isFallback: true
        });
      }

      const prompt = `أنت معلم ودود ومحفز وخبير في مناهج ${grade} (عمر الطالب حوالي 11-12 سنة).
المادة: ${subject}
الموضوع: ${topic || subject}
السؤال: ${question}
إجابة الطالب: ${userAnswer || "لم يجب"}
الإجابة الصحيحة: ${correctAnswer}

المطلوب:
1. شجع الطالب بأسلوب حماسي ومحبب بدون توبيخ.
2. اشرح له ببساطة خطوة بخطوة لماذا الإجابة الصحيحة هي (${correctAnswer}) بطريقة سهلة وممتعة تناسب عمره.
3. قدم له نصيحة أو خدعة ذكية لتذكر القاعدة مستقبلاً.
اجعل الشرح باللغة العربية الواضحة المشكولة جزئياً ومختصراً (في حدود 3 إلى 5 أسطر).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({
        explanation: response.text || "الإجابة الصحيحة موضحة أعلاه، واصل التدريب يا بطل!",
        isFallback: false
      });
    } catch (error) {
      console.error("AI Explain error:", error);
      res.json({
        explanation: `الإجابة الصحيحة هي (${req.body.correctAnswer}). استمر في المحاولة وستصبح بطلاً خارقاً!`,
        isFallback: true
      });
    }
  });

  // AI Dynamic Custom Question Generator
  app.post("/api/tutor/generate-question", async (req, res) => {
    try {
      const { subject, topic, difficulty = "medium" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.status(200).json({ error: "AI offline", fallbackAvailable: true });
      }

      const prompt = `أنشئ سؤالاً تفاعلياً واحداً جديداً مع خيارات متعددة لتلميذ في الصف السادس الابتدائي.
المادة: ${subject} (${subject === "math" ? "رياضيات" : subject === "arabic" ? "لغة عربية" : "لغة إنجليزية"})
الموضوع المحدد: ${topic || "شامل للمنهج"}
مستوى الصعوبة: ${difficulty}

أجب فقط بكائن JSON بالصيغة التالية تماماً بدون نصوص إضافية:
{
  "id": "gen_${Date.now()}",
  "question": "نص السؤال هنا واضح وممتع",
  "options": ["الخيار 1", "الخيار 2", "الخيار 3", "الخيار 4"],
  "correctAnswer": "الخيار الصحيح المطابق تماماً لأحد الخيارات",
  "explanation": "شرح مبسط ومختصر جداً للإجابة الصحيحة",
  "subject": "${subject}",
  "points": 20
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsed = JSON.parse(response.text || "{}");
      res.json({ question: parsed });
    } catch (err) {
      console.error("AI Question gen error:", err);
      res.status(500).json({ error: "Failed to generate question" });
    }
  });

  // AI Parent Advisor Report
  app.post("/api/tutor/parent-report", async (req, res) => {
    try {
      const { studentName, stats } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          report: `مرحباً بك! الطالب ${studentName || "البطل"} يسير بخطى رائعة في التعلم. ننصح بالاستمرار في حل التحديات اليومية وتخصيص 15 دقيقة يومياً للرياضيات واللغة الإنجليزية.`,
        });
      }

      const prompt = `أنت مستشار تربوي وتعليمي متخصص في المرحلة الابتدائية (الصف السادس).
اسم الطالب: ${studentName || "الطالب"}
إحصائيات الأداء:
- نقاط الرياضيات: ${stats.mathScore || 0}%
- نقاط اللغة العربية: ${stats.arabicScore || 0}%
- نقاط اللغة الإنجليزية: ${stats.englishScore || 0}%
- إجمالي الأسئلة المحلولة: ${stats.totalQuestions || 0}
- الإجابات الصحيحة: ${stats.correctCount || 0}
- عدد التحديات المكتملة: ${stats.completedChallenges || 0}

اكتب تقريراً موجزاً وملهماً وموجهاً لولي الأمر:
1. تقييم عام لمستوى الطالب وتقدير جهده.
2. نقاط القوة التي أبدع فيها.
3. توصيات تربوية منزلية عملية ولطيفة لتقوية الجوانب التي تحتاج تركيزاً.
اجعل النص دافئاً ومنظماً في نقاط واضحة.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      res.json({ report: response.text });
    } catch (err) {
      console.error("AI Report error:", err);
      res.json({
        report: `أداء ممتاز ومجهود رائع! استمروا في تشجيع البطل وإعطائه فترات تدريب ممتعة يومياً.`,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
