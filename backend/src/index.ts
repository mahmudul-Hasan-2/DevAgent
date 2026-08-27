import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { Request, Response } from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import aiRoutes from "./routes/ai.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI environment variable is missing.");
}

const client = new MongoClient(mongoUri);
let dbInstance: Db | null = null;

// Lazy Database Connection Helper for Serverless & Express
const getDb = async (): Promise<Db> => {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db(process.env.DB_NAME || "devagent_db");
    console.log("Database Connected!");
  }
  return dbInstance;
};

// ====================== ROUTES ======================

// Health
app.get("/", (req, res) => {
  res.send("DevAgent API is running 🚀");
});

// AI Routes
app.use("/api/ai", aiRoutes);

// ====================== PROJECT CRUD ======================

app.get("/api/projects", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const projects = await db.collection("projects").find({}).toArray();
    res.json(projects);
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
});

app.get("/api/project/:id", async (req: Request, res: Response) => {
  const id = req.params.id as string; // ← Fixed

  try {
    const db = await getDb();
    const project = await db
      .collection("projects")
      .findOne({ _id: new ObjectId(id) });

    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: "Invalid project ID" });
  }
});

app.post("/api/project", async (req: Request, res: Response) => {
  try {
    const db = await getDb();
    const result = await db.collection("projects").insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ error: "Failed to create project." });
  }
});

app.get("/api/projects/user", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const db = await getDb();
    const projects = await db
      .collection("projects")
      .find({ userId: String(userId) })
      .toArray();

    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch User Projects Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/project/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ← Fixed
    const updatedData = { ...req.body, updatedAt: new Date() };

    const db = await getDb();
    const result = await db
      .collection("projects")
      .updateOne({ _id: new ObjectId(id) }, { $set: updatedData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/project/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // ← Fixed

    const db = await getDb();
    const result = await db
      .collection("projects")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Project not found." });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ====================== START SERVER ======================

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
