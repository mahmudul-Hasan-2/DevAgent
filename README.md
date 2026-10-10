# DevAgent

**Full-stack AI-powered Project Management & Deployment Platform**

An intelligent platform that generates complete project blueprints using AI, offers an interactive AI co-pilot chat, and provides secure workspace management — all in one place.

🔗 **Live Demo:** [frontend-sigma-tawny-82.vercel.app](https://frontend-sigma-tawny-82.vercel.app/)

---

## Features

- **AI Project Blueprint Generator** — Generate complete project descriptions, milestones, risks, and more from a simple idea using Gemini/Groq
- **Interactive AI Co-pilot Chat** — Get real-time assistance and guidance through an intelligent chat interface
- **Secure Authentication** — Google Sign-in powered by Better Auth
- **Project Management Dashboard** — Create, filter, view, and manage projects effortlessly
- **Modern Full-stack Architecture** — Built with Next.js, Express, and MongoDB

---

## Tech Stack

| Layer       | Technologies                              |
|-------------|-------------------------------------------|
| Frontend    | Next.js, React, TypeScript, Tailwind CSS  |
| Backend     | Express.js, TypeScript, MongoDB           |
| AI          | Google Gemini / Groq                      |
| Auth        | Better Auth + Google OAuth                |
| Deployment  | Vercel                                    |

---

## Project Structure

```text
DevAgent/
├── 📁 frontend/          # Next.js frontend application
│   ├── 📁 src/           # Source files (components, pages/app)
│   ├── package.json      # Frontend dependencies & scripts
│   └── README.md
│
└── 📁 backend/           # Express.js REST API backend
    ├── 📁 src/           # Controllers, routes, models, config
    ├── package.json      # Backend dependencies & scripts
    └── README.md

```

---

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

---

### Prerequisites

Ensure you have the following installed on your machine:
* **Node.js** (v18.0.0 or higher)
* **npm** or **yarn** / **pnpm**
* **MongoDB** instance (local or Atlas)

---

### Installation & Setup

#### 1. Backend Setup

Navigate to the `backend` directory, install dependencies, and configure environment variables:

```bash
# Navigate to backend folder
cd backend
```

# Install dependencies
```bash
npm install
```

## 🚀 Quick Start Guide

---

### Step 1: Backend Configuration

1. **Create Environment File**  
   Create a `.env` file in the `backend` root directory and add your credentials:

   ```env
   # Database & Authentication
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

   # AI Service Keys
   GROQ_API_KEY=your_groq_key
   # GEMINI_API_KEY=your_gemini_key

   # OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```
---

### Step 1: Start Backend Server

Run the development server inside your `backend` directory:

```bash
npm run dev
```
---

## 🛠️ Step 2: Frontend Configuration

### 1. Navigate & Install Dependencies
Open a new terminal window and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

### 2. Create Environment File

Create a `.env.local` file in the `frontend` root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Start Frontend Server

Run the frontend development server:

```bash
npm run dev
```

---

## 🌐 Access Points

Once both servers are running successfully:

| Service | Local URL | Description |
| :--- | :--- | :--- |
| **Frontend App** | [http://localhost:3000](http://localhost:3000) | Next.js Web Interface |
| **Backend API** | [http://localhost:5000](http://localhost:5000) | Express Server Endpoint |
