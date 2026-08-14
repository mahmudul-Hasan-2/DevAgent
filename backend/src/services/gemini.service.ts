import dotenv from "dotenv";
dotenv.config();
import {
  GoogleGenerativeAI,
  GenerativeModel,
  ChatSession,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing in environment variables!");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Constants for model and configuration
const MODEL_NAME = "gemini-1.5-flash"; // প্রয়োজনে এখানে "gemini-1.5-pro" বা লেটেস্ট মডেল নাম দিতে পারো
const GENERATION_CONFIG = {
  temperature: 0.15,
  topP: 0.8,
  topK: 40,
};
const DEFAULT_TIMEOUT_MS = 15000;

/**
 * Wraps a Promise with a timeout.
 * @param promise The promise to wrap.
 * @param ms The timeout duration in milliseconds.
 * @returns A promise that resolves with the result of the original promise or rejects with a timeout error.
 */
const withTimeout = async <T>(
  promise: Promise<T>,
  ms: number = DEFAULT_TIMEOUT_MS,
): Promise<T> => {
  let timeoutId: NodeJS.Timeout | null = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(
        new Error(
          "AI Request Timed Out. Network might be blocking the request.",
        ),
      );
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    if (timeoutId) clearTimeout(timeoutId);
    return result;
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    throw error;
  }
};

/**
 * Removes Markdown formatting from a string.
 * @param text The input string.
 * @returns The string with Markdown removed.
 */
export function stripMarkdown(text: string): string {
  if (!text) return "";

  return (
    text
      // Normalize line endings
      .replace(/\r\n/g, "\n")

      // Remove entire fenced code blocks
      .replace(/```[\s\S]*?```/g, "")
      .replace(/~~~[\s\S]*?~~~/g, "")

      // Inline code
      .replace(/`([^`]*)`/g, "$1")

      // Images & Links
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")

      // Headings
      .replace(/^#{1,6}\s*/gm, "")

      // Blockquotes
      .replace(/^>\s*/gm, "")

      // Bullet & Numbered lists
      .replace(/^\s*[-*+•]\s*/gm, "")
      .replace(/^\s*\d+[.)]\s*/gm, "")

      // Bold & Italic (order matters for longest match first)
      .replace(/\*\*\*([^*]+)\*\*\*/g, "$1") // ***bold italic***
      .replace(/\*\*([^*]+)\*\*/g, "$1") // **bold**
      .replace(/\*([^*]+)\*/g, "$1") // *italic*
      .replace(/___([^_]+)___/g, "$1") // ___bold italic___
      .replace(/__([^_]+)__/g, "$1") // __bold__
      .replace(/_([^_]+)_/g, "$1") // _italic_

      // Horizontal rules
      .replace(/^---$/gm, "")

      // Extra spaces and newlines cleanup
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim()
  );
}

// Define a type for chat history for better type safety
interface ChatHistoryItem {
  role: "user" | "model" | "assistant";
  parts: { text: string }[];
}

// 1. Project Description with Timeout
export const generateAIContent = async (prompt: string): Promise<string> => {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: GENERATION_CONFIG,
    });

    const fullPrompt = `Write a professional project description for: ${prompt}. Reply in pure plain text only without any markdown.`;

    const result = await withTimeout(model.generateContent(fullPrompt));
    const generatedText = result.response.text() || "";

    return stripMarkdown(generatedText);
  } catch (error) {
    console.error("Gemini API Error during content generation:", error);
    const errorMessage =
      error instanceof Error ? error.message : "AI Content Generation Failed";
    throw new Error(`Failed to generate AI content: ${errorMessage}`);
  }
};

// 2. Chat Service with Timeout
export const chatWithAI = async (
  history: ChatHistoryItem[] = [],
  message: string,
): Promise<string> => {
  try {
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: GENERATION_CONFIG,
      systemInstruction: `
You are a helpful AI assistant.

Rules:
- Reply using plain text only.
- Never use Markdown.
- Never use **bold** or *italic*.
- Never use headings (#).
- Never use bullet lists.
- Never use numbered lists.
- Never use tables.
- Never use code blocks.
- Never use backticks.
`,
    });

    // Map history, ensuring correct role mapping and handling potential undefined parts
    const mappedHistory = (history || []).map((h) => ({
      role: h.role === "assistant" ? "model" : h.role, // Map "assistant" to "model"
      parts: h.parts || [{ text: "" }], // Ensure parts is an array, default to empty text if missing
    }));

    const chat: ChatSession = model.startChat({
      history: mappedHistory,
    });

    const result = await withTimeout(chat.sendMessage(message));
    let responseText = result.response.text() || "";

    return stripMarkdown(responseText);
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "AI Chat Failed";
    throw new Error(`AI chat failed: ${errorMessage}`);
  }
};
