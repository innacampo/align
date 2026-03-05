import "dotenv/config";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { GoogleGenAI, Type } from "@google/genai";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Environment validation ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error(
    "FATAL: GEMINI_API_KEY is not set. Create a .env file or set the environment variable."
  );
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || "8080", 10);
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";

// --- Express app ---
const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Parse JSON with strict size limit to prevent abuse
app.use(express.json({ limit: "10kb" }));

// Disable X-Powered-By
app.disable("x-powered-by");

// Rate limiting for API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 requests per 15-minute window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

app.use("/api", apiLimiter);

// --- Gemini AI setup ---
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    reframe: {
      type: Type.STRING,
      description:
        "A professional validation of the situation using the 'Elegant Silver-Blue' spirit. Cool, calm, collected.",
    },
    science: {
      type: Type.STRING,
      description:
        "A one-sentence, evidence-based explanation for the symptom grounded in neurobiology.",
    },
    scripts: {
      type: Type.ARRAY,
      description: "2-3 professional script options (Email, Slack, or In-Person).",
      items: {
        type: Type.OBJECT,
        properties: {
          type: {
            type: Type.STRING,
            description: "The context of the script (e.g., Email, Slack, In-Person).",
          },
          tone: {
            type: Type.STRING,
            description:
              "A short label describing the utility or tone (e.g., 'Concise', 'Slack-safe', 'Formal', 'Softened').",
          },
          content: {
            type: Type.STRING,
            description: "The actual script text. Poised, direct, non-apologetic.",
          },
        },
        required: ["type", "tone", "content"],
      },
    },
  },
  required: ["reframe", "science", "scripts"],
};

const systemInstruction = `
Persona: You are the "ALIGN" advocate.
Objective: Help women navigate professional environments while experiencing neuroendocrine transitions (menopause, perimenopause, etc.). Your goal is to reduce workplace attrition and the "shame spiral" with cool, calm, and collected wisdom.

Framework:
1. The Reframe (Cool Logic): Acknowledge the situation with professional grace. Validate their experience with a sense of calm authority.
2. The Science: Provide a one-sentence, evidence-based explanation for the symptom, grounded in neurobiology.
3. The Professional Script: Provide 2-3 script options (Email, Slack, or In-Person) that are poised, direct, and non-apologetic. Include a short 'tone' label for each (e.g., "Concise", "More Formal", "Slack-safe").

Tone & Style: Sophisticated, professional, and cerebral. Address the user as a respected colleague. Be concise and empowering.
`;

// --- Input validation ---
const MAX_SITUATION_LENGTH = 2000;
const MIN_SITUATION_LENGTH = 10;

function sanitizeInput(input) {
  if (typeof input !== "string") return "";
  // Strip control characters, keep printable unicode
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();
}

// --- API route ---
app.post("/api/generate", async (req, res) => {
  try {
    const rawSituation = req.body?.situation;

    if (!rawSituation || typeof rawSituation !== "string") {
      return res.status(400).json({ error: "A situation description is required." });
    }

    const situation = sanitizeInput(rawSituation);

    if (situation.length < MIN_SITUATION_LENGTH) {
      return res
        .status(400)
        .json({ error: `Please provide at least ${MIN_SITUATION_LENGTH} characters.` });
    }

    if (situation.length > MAX_SITUATION_LENGTH) {
      return res
        .status(400)
        .json({ error: `Input must be under ${MAX_SITUATION_LENGTH} characters.` });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [
        {
          role: "user",
          parts: [{ text: `Workplace situation: ${situation}` }],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      return res.status(502).json({ error: "No response from AI service." });
    }

    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (err) {
    // Never expose internal error details to the client
    console.error("API /generate error:", err.message || err);
    return res.status(500).json({ error: "An internal error occurred. Please try again." });
  }
});

// --- Serve static files in production ---
if (isProduction) {
  const distPath = path.join(__dirname, "dist");
  app.use(express.static(distPath, { maxAge: "1y", immutable: true }));
  app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// --- Start server ---
app.listen(PORT, "0.0.0.0", () => {
  console.log(`ALIGN server running in ${NODE_ENV} mode on port ${PORT}`);
});
