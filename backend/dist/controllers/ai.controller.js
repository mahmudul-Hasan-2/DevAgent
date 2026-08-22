var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { chatWithAI, generateProjectBlueprint, } from "../services/gemini.service.js";
export const generateBlueprint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idea } = req.body;
        if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
            return res.status(400).json({
                success: false,
                error: "Please provide a valid project idea (minimum 5 characters)",
            });
        }
        const blueprint = yield generateProjectBlueprint(idea.trim());
        res.status(200).json({
            success: true,
            data: blueprint,
        });
    }
    catch (error) {
        console.error("Generate Blueprint Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to generate project blueprint",
        });
    }
});
export const handleChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { history = [], message, projectContext } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({
                success: false,
                error: "Message is required",
            });
        }
        const reply = yield chatWithAI(history, message, projectContext);
        res.status(200).json({
            success: true,
            reply,
        });
    }
    catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({
            success: false,
            error: "AI Chat failed",
        });
    }
});
// Keep old endpoint for compatibility (optional)
export const generateContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const content = yield generateProjectBlueprint(title);
        res.status(200).json({ content: content.fullDescription });
    }
    catch (e) {
        res.status(500).json({ message: "Error" });
    }
});
