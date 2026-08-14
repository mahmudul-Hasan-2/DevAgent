var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";
import { generateContent, handleChat } from "./controllers/ai.controller.js";
import aiRoutes from "./routes/ai.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.MONGO_URI || "");
let dbInstance = null;
let dbInitPromise = null;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    if (dbInstance)
        return;
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not configured.");
    }
    if (!dbInitPromise) {
        dbInitPromise = (() => __awaiter(void 0, void 0, void 0, function* () {
            yield client.connect();
            dbInstance = client.db(process.env.DB_NAME || "devagent_db");
            console.log("Database Connected!");
        }))();
    }
    yield dbInitPromise;
});
const getDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectToDatabase();
    if (!dbInstance) {
        throw new Error("Database not initialized.");
    }
    return dbInstance;
});
void connectToDatabase().catch((error) => {
    console.error("Database connection failed:", error);
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
// AI Routes
app.post("/api/ai/generate", generateContent);
app.post("/api/ai/chat", handleChat);
app.post("/api/ai", aiRoutes);
// CRUD Routes
app.get("/api/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const { search, category, minBudget, maxBudget, sortBy } = req.query;
        let query = {};
        // ১. সার্চ ফিল্টার (যদি থাকে তবেই এপ্লাই হবে)
        if (search && typeof search === "string" && search.trim() !== "") {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { shortDescription: { $regex: search, $options: "i" } },
                { fullDescription: { $regex: search, $options: "i" } },
            ];
        }
        // ২. ক্যাটাগরি ফিল্টার (যদি ক্যাটাগরি থাকে এবং তা "All" বা খালি না হয়)
        if (category &&
            typeof category === "string" &&
            category.trim() !== "" &&
            category !== "All Categories") {
            query.category = category;
        }
        // ৩. বাজেট ফিল্টার (ভ্যালিড নাম্বার হলে তবেই কুয়েরিতে যোগ হবে)
        if (minBudget && !isNaN(Number(minBudget))) {
            query["estimatedBudgetRange.min"] = { $gte: Number(minBudget) };
        }
        if (maxBudget && !isNaN(Number(maxBudget))) {
            query["estimatedBudgetRange.max"] = { $lte: Number(maxBudget) };
        }
        let cursor = db.collection("projects").find(query);
        // ৪. সর্টিং হ্যান্ডলিং
        if (sortBy === "latest") {
            cursor = cursor.sort({ createdAt: -1 });
        }
        else if (sortBy === "budget_low") {
            cursor = cursor.sort({ "estimatedBudgetRange.min": 1 });
        }
        else if (sortBy === "budget_high") {
            cursor = cursor.sort({ "estimatedBudgetRange.max": -1 });
        }
        const projects = yield cursor.toArray();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Fetch Projects Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
app.get("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const { id } = req.params;
        const project = yield db
            .collection("projects")
            .findOne({ _id: new ObjectId(id) });
        if (!project) {
            res.status(404).json({ error: "Project not found." });
            return;
        }
        res.json(project);
    }
    catch (error) {
        console.error("Fetch Project Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
app.post("/api/project", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const result = yield db
            .collection("projects")
            .insertOne(Object.assign(Object.assign({}, req.body), { createdAt: new Date() }));
        res.status(201).json(result);
    }
    catch (error) {
        console.error("Create Project Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
// GET: /api/projects/user?userId=xyz
app.get("/api/projects/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        // ডাটাবেজ থেকে নির্দিষ্ট ইউজারের প্রজেক্টগুলো ফিল্টার করা
        const projects = yield db
            .collection("projects")
            .find({ userId: userId }) // প্রোজেক্টে userId সেভ থাকতে হবে
            .toArray();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Fetch User Projects Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
// PUT: /api/project/:id (প্রজেক্ট এডিট বা আপডেট করার জন্য)
app.put("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const { id } = req.params;
        const updatedData = req.body;
        const result = yield db
            .collection("projects")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res
            .status(200)
            .json({ success: true, message: "Project updated successfully!" });
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
// DELETE: /api/project/:id (প্রজেক্ট ডিলিট করার জন্য)
app.delete("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield getDb();
        const { id } = req.params;
        const result = yield db
            .collection("projects")
            .deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res
            .status(200)
            .json({ success: true, message: "Project deleted successfully!" });
    }
    catch (error) {
        console.error("Delete Error:", error);
        res.status(503).json({ error: "Database unavailable" });
    }
}));
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}
export default app;
