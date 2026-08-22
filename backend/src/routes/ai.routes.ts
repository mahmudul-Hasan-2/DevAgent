import { Router } from "express";
import {
  generateBlueprint,
  handleChat,
  generateContent,
} from "../controllers/ai.controller.js";

const router = Router();

// New structured endpoint
router.post("/generate-blueprint", generateBlueprint);

// Chat
router.post("/chat", handleChat);

// Old endpoint (keep for backward compatibility)
router.post("/generate", generateContent);

export default router;
