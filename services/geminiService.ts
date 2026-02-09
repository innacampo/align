import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AlignResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    reframe: {
      type: Type.STRING,
      description: "A professional validation of the situation using the 'Elegant Silver-Blue' spirit. Cool, calm, collected.",
    },
    science: {
      type: Type.STRING,
      description: "A one-sentence, evidence-based explanation for the symptom grounded in neurobiology.",
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
            description: "A short label describing the utility or tone (e.g., 'Concise', 'Slack-safe', 'Formal', 'Softened').",
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

export const generateAlignContent = async (situation: string): Promise<AlignResponse> => {
  const systemInstruction = `
    Persona: You are the "ALIGN" advocate.
    Objective: Help women navigate professional environments while experiencing neuroendocrine transitions (menopause, perimenopause, etc.). Your goal is to reduce workplace attrition and the "shame spiral" with cool, calm, and collected wisdom.
    
    Framework:
    1. The Reframe (Cool Logic): Acknowledge the situation with professional grace. Validate their experience with a sense of calm authority.
    2. The Science: Provide a one-sentence, evidence-based explanation for the symptom, grounded in neurobiology.
    3. The Professional Script: Provide 2-3 script options (Email, Slack, or In-Person) that are poised, direct, and non-apologetic. Include a short 'tone' label for each (e.g., "Concise", "More Formal", "Slack-safe").

    Tone & Style: Sophisticated, professional, and cerebral. Address the user as a respected colleague. Be concise and empowering.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Workplace situation: ${situation}` }],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response content generated");
    }

    return JSON.parse(text) as AlignResponse;
  } catch (error) {
    console.error("Error generating ALIGN content:", error);
    throw error;
  }
};