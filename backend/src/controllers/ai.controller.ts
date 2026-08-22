import { Request, Response } from "express";
import {
  chatWithAI,
  generateProjectBlueprint,
} from "../services/gemini.service.js";

export const generateBlueprint = async (req: Request, res: Response) => {
  try {
    const { idea } = req.body;

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid project idea (minimum 5 characters)",
      });
    }

    const blueprint = await generateProjectBlueprint(idea.trim());

    res.status(200).json({
      success: true,
      data: blueprint,
    });
  } catch (error) {
    console.error("Generate Blueprint Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate project blueprint",
    });
  }
};

export const handleChat = async (req: Request, res: Response) => {
  try {
    const { history = [], message, projectContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Message is required",
      });
    }

    const reply = await chatWithAI(history, message, projectContext);

    res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({
      success: false,
      error: "AI Chat failed",
    });
  }
};

// Keep old endpoint for compatibility (optional)
export const generateContent = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const content = await generateProjectBlueprint(title);
    res.status(200).json({ content: content.fullDescription });
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
};
