import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

// ====================== CLIENT ======================
const groqApiKey = process.env.GROQ_API_KEY || "";
const groq = groqApiKey ? new Groq({ apiKey: groqApiKey }) : null;

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

// ====================== MARKDOWN CLEANER ======================
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/```[\w]*\n([\s\S]*?)```/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*\*(.*?)\*\*\*/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/^(-{3,}|_{3,}|\*{3,})$/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// ====================== PROMPT ======================
const getBlueprintPrompt = (idea: string) => `
You are an elite software architect and senior product manager.

Generate a complete, production-ready project blueprint for this idea:

"${idea}"

Return ONLY valid JSON. No markdown, no code blocks, no extra text.
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

// ====================== GROQ GENERATION ======================
export const generateProjectBlueprint = async (
  idea: string,
): Promise<ProjectBlueprint> => {
  if (!groq) {
    throw new Error(
      "GROQ_API_KEY is missing. Please add it to your .env file.",
    );
  }

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an elite software architect. Return ONLY valid JSON. No markdown.",
      },
      {
        role: "user",
        content: getBlueprintPrompt(idea),
      },
    ],
    model: "llama-3.3-70b-versatile", // চাইলে "llama-3.1-8b-instant" বা "mixtral-8x7b-32768"ও ব্যবহার করতে পারো
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const text = completion.choices[0]?.message?.content || "{}";
  return JSON.parse(text) as ProjectBlueprint;
};

// ====================== CHAT ======================
export const chatWithAI = async (
  history: { role: "user" | "model"; parts: { text: string }[] }[],
  message: string,
  projectContext?: string,
): Promise<string> => {
  if (!groq) {
    throw new Error(
      "GROQ_API_KEY is missing. Please add it to your .env file.",
    );
  }

  const systemPrompt = projectContext
    ? `You are a senior software engineer helping with this project:

${projectContext}

Rules:
- Be concise and practical
- Give direct answers and code when needed
- Do NOT use markdown headers, bold, or heavy formatting
- Use plain text only
- Talk like a helpful senior developer`
    : `You are a senior software engineer and AI co-pilot.

Rules:
- Be concise and practical
- Give direct answers and code when needed
- Do NOT use markdown headers, bold, or heavy formatting
- Use plain text only
- Talk like a helpful senior developer`;

  const messages: any[] = [
    { role: "system", content: systemPrompt },
    ...history.map((h) => ({
      role: h.role === "model" ? "assistant" : "user",
      content: h.parts[0]?.text || "",
    })),
    { role: "user", content: message },
  ];

  const completion = await groq.chat.completions.create({
    messages,
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    max_tokens: 1024,
  });

  const reply = completion.choices[0]?.message?.content || "No response";
  return cleanMarkdown(reply);
};

// ====================== BACKWARD COMPATIBILITY ======================
export const generateAIContent = async (prompt: string) => {
  const blueprint = await generateProjectBlueprint(prompt);
  return blueprint.fullDescription;
};
