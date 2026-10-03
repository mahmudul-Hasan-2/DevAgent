import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Ensure environment variables are defined before initializing
if (!process.env.MONGO_URI || !process.env.DB_NAME) {
  throw new Error("Missing MONGO_URI or DB_NAME environment variables.");
}

// Reuse a single MongoClient instance to prevent connection leaks
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  // 1. Setup the Database Adapter
  database: mongodbAdapter(db, {
    client, // Enables database transactions for atomic operations
  }),

  // 2. Configure Authentication Providers
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
