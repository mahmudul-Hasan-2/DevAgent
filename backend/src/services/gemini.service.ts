import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY || "";

if (!apiKey) {
  console.warn("WARNING: GEMINI_API_KEY is missing in environment variables!");
}

const genAI = new GoogleGenerativeAI(apiKey);

// ====================== TYPES ======================
export interface ProjectBlueprint {
  title: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  targetAudience: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
    other: string[];
  };
  keyFeatures: string[];
  userStories: string[];
  architectureOverview: string;
  milestones: {
    phase: string;
    tasks: string[];
    estimatedDays: number;
  }[];
  risks: string[];
  successMetrics: string[];
}

// ====================== STRUCTURED GENERATION ======================
export const generateProjectBlueprint = async (
  idea: string
): Promise<ProjectBlueprint> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash", // change to gemini-1.5-flash or gemini-2.5-flash if needed
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `
You are an elite software architect and senior product manager with 15+ years of experience.

Generate a complete, production-ready project blueprint from this idea:

"${idea}"

Return ONLY valid JSON. Do not include any markdown, code blocks, or extra text.
The JSON must exactly match this structure:

{
  "title": "string",
  "shortDescription": "string (max 2 sentences)",
  "fullDescription": "string (detailed paragraph)",
  "problemStatement": "string",
  "targetAudience": ["string"],
  "techStack": {
    "frontend": ["string"],
    "backend": ["string"],
    "database": ["string"],
    "devops": ["string"],
    "other": ["string"]
  },
  "keyFeatures": ["string"],
  "userStories": ["As a user, I want..."],
  "architectureOverview": "string",
  "milestones": [
    {
      "phase": "string",
      "tasks": ["string"],
      "estimatedDays": number
    }
  ],
  "risks": ["string"],
  "successMetrics": ["string"]
}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const parsed = JSON.parse(text) as ProjectBlueprint;
    return parsed;
  } catch (error) {
    console.error("Gemini Blueprint Generation Error:", error);
    throw new Error("Failed to generate project blueprint");
  }
};

// ====================== CHAT ======================
export const chatWithAI = async (
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  message: string,
  projectContext?: string
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const systemPrompt = projectContext
      ? `You are an expert AI co-pilot and senior developer helping with this specific project:\n\n${projectContext}\n\nAlways answer in the context of this project. Be concise, practical, and helpful.`
      : `You are an expert AI developer co-pilot. Be helpful, practical, and concise.`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I'm ready to help." }],
        },
        ...history,
      ],
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw new Error("AI Chat Failed");
  }
};

// Keep old function for backward compatibility (optional)
export const generateAIContent = async (prompt: string) => {
  const blueprint = await generateProjectBlueprint(prompt);
  return blueprint.fullDescription;
};
