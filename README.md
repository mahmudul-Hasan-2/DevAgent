# DevAgent – AI Workspace
**Full-stack AI-powered workspace** for project management, intelligent assistance, and secure collaboration.

🔗 **Live Demo:** [https://frontend-sigma-tawny-82.vercel.app](https://frontend-sigma-tawny-82.vercel.app)

---

## ✨ Features

- **AI Project Generation** – Generate project blueprints using Google Gemini
- **AI Co-pilot Chat** – Interactive chat powered by Gemini & Groq
- **Secure Authentication** – Better Auth with session management
- **Project Management** – Create, explore, update and manage projects
- **Modern UI** – Clean, responsive interface built with Tailwind CSS
- **Secure Workspaces** – Protected routes and user-based access

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- TanStack React Query
- React Hook Form

### Backend
- Node.js + Express
- TypeScript
- MongoDB
- Google Generative AI (Gemini)
- Groq SDK
- Better Auth / JWT

---

## 📁 Project Structure

```text
DevAgent/
├── frontend/             # Next.js application
│   ├── src/app/          # App Router pages
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utilities & auth config
└── backend/              # Express API
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   └── index.ts
    └── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Gemini API Key
- Groq API Key (optional)

### 1. Clone the repository
```bash
git clone https://github.com/mahmudul-Hasan-2/DevAgent.git
cd DevAgent
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
DB_NAME=devagent_db
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
# Add Better Auth related variables if needed
```

Run the frontend:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📸 Screenshots
*Add screenshots of Homepage, Dashboard, Chat, and Generate pages here.*

---

## 🔗 Links
- **Live Demo:** [https://frontend-sigma-tawny-82.vercel.app](https://frontend-sigma-tawny-82.vercel.app)
- **GitHub:** [https://github.com/mahmudul-Hasan-2/DevAgent](https://github.com/mahmudul-Hasan-2/DevAgent)

---

## 👤 Author
**Mahmudul Hasan Nirab**  
Full-Stack Developer  
- **Portfolio:** [nirab-dev.vercel.app](https://nirab-dev.vercel.app)  
- **LinkedIn:** [linkedin.com/in/mahmudul-hasan-dev](https://linkedin.com)  
- **GitHub:** [github.com/mahmudul-Hasan-2](https://github.com/mahmudul-Hasan-2)  

---

## 📄 License
This project is open source and available under the **MIT License**.
