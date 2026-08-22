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
import aiRoutes from "./routes/ai.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
const client = new MongoClient(process.env.MONGO_URI);
let dbInstance;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    dbInstance = client.db(process.env.DB_NAME || "devagent_db");
    console.log("Database Connected!");
});
startServer();
// ====================== ROUTES ======================
// Health
app.get("/", (req, res) => {
    res.send("DevAgent API is running 🚀");
});
// AI Routes (clean mount)
app.use("/api/ai", aiRoutes);
// ====================== PROJECT CRUD ======================
app.get("/api/projects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield dbInstance.collection("projects").find({}).toArray();
    res.json(projects);
}));
app.get("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const project = yield dbInstance
            .collection("projects")
            .findOne({ _id: new ObjectId(id) });
        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }
        res.json(project);
    }
    catch (error) {
        res.status(400).json({ error: "Invalid project ID" });
    }
}));
app.post("/api/project", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield dbInstance.collection("projects").insertOne(Object.assign(Object.assign({}, req.body), { createdAt: new Date(), updatedAt: new Date() }));
    res.status(201).json(result);
}));
app.get("/api/projects/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }
        const projects = yield dbInstance
            .collection("projects")
            .find({ userId: userId })
            .toArray();
        res.status(200).json(projects);
    }
    catch (error) {
        console.error("Fetch User Projects Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.put("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = Object.assign(Object.assign({}, req.body), { updatedAt: new Date() });
        const result = yield dbInstance
            .collection("projects")
            .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res.status(200).json({
            success: true,
            message: "Project updated successfully!",
        });
    }
    catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.delete("/api/project/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield dbInstance
            .collection("projects")
            .deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Project not found." });
        }
        res.status(200).json({
            success: true,
            message: "Project deleted successfully!",
        });
    }
    catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// ====================== START SERVER ======================
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;
