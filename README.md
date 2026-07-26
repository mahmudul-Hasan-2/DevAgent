<div align="center">

# 🤖 DevAgent

### **Elite Agentic AI Workspace — Autonomous Project Management & AI Co-Pilot Platform**

<p align="center">
  <a href="https://frontend-sigma-tawny-82.vercel.app/"><strong>🌐 Live Demo</strong></a> •
  <a href="https://github.com/mahmudul-Hasan-2/DevAgent/issues"><strong>🐞 Report Bug</strong></a> •
  <a href="https://github.com/mahmudul-Hasan-2/DevAgent/issues"><strong>💡 Request Feature</strong></a>
</p>

<p align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-000000?style=for-the-badge&logo=auth0&logoColor=white)

</p>

</div>

---

# 📸 Overview

**DevAgent** is a next-generation **Agentic AI Workspace** that bridges the gap between high-level project ideas and production-ready execution.

Powered by **Google Gemini**, autonomous AI agents intelligently analyze project briefs, generate comprehensive project descriptions, and assist developers through an interactive AI Co-Pilot chat interface.

The platform combines secure authentication, modern workspace management, and a beautiful developer experience into one unified AI-powered productivity platform.

---

# ✨ Key Features

### 🤖 Autonomous AI Agents
- Generate detailed project descriptions from simple prompts
- AI-powered reasoning and planning
- Structured project documentation

### 💬 Interactive AI Co-Pilot
- Real-time conversational AI assistant
- Context-aware conversations
- Developer productivity companion

### 📁 Workspace Management
- Create unlimited workspaces
- Organize projects efficiently
- Clean dashboard interface

### 🔐 Enterprise Authentication
- Better Auth integration
- Secure session management
- MongoDB adapter support

### 🎨 Modern UI/UX
- Beautiful responsive interface
- Dark mode support
- Smooth animations
- Mobile-friendly design

### ⚡ Type-Safe Development
- End-to-end TypeScript
- Shared interfaces
- Better developer experience

### 🌐 REST API
- Express.js backend
- Scalable architecture
- Clean API structure

---

# 🛠 Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | App Router + React 19 |
| **TypeScript** | Type Safety |
| **Tailwind CSS 4** | Styling |
| **Better Auth** | Authentication |
| **TanStack Query** | Data Fetching & Caching |
| **Axios** | HTTP Client |
| **React Hook Form** | Forms |
| **Lucide React** | Icons |
| **React Icons** | Icons |
| **Sonner** | Toast Notifications |

---

## Backend

| Technology | Purpose |
|------------|---------|
| **Express.js 5** | Server Framework |
| **TypeScript** | Type Safety |
| **MongoDB** | Database |
| **Google Gemini AI** | AI Integration |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **CORS** | Cross-Origin Requests |
| **dotenv** | Environment Variables |

---

# 📁 Project Structure

```bash
DevAgent/
│
├── frontend/
│   ├── src/
│   │   ├── app/                # Next.js App Router
│   │   ├── components/         # Reusable UI Components
│   │   ├── hooks/              # Custom React Hooks
│   │   ├── lib/                # Utilities & Auth Config
│   │   ├── services/           # API Services
│   │   ├── types/              # TypeScript Types
│   │   └── utils/              # Helper Functions
│   │
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/        # Route Controllers
│   │   ├── routes/             # API Routes
│   │   ├── middleware/         # Express Middleware
│   │   ├── models/             # MongoDB Models
│   │   ├── services/           # Business Logic
│   │   ├── interfaces/         # TypeScript Interfaces
│   │   ├── utils/              # Utilities
│   │   └── index.ts            # Entry Point
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
└── LICENSE
```

---

# 🚀 Quick Start

## Prerequisites

Make sure you have installed:

- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- Google Gemini API Key
- Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mahmudul-Hasan-2/DevAgent.git

cd DevAgent
```

---

## 2️⃣ Backend Setup

```bash
cd backend

npm install
```

Create your environment file.

```bash
cp .env.example .env
```

Update the environment variables.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

### Development

Run TypeScript compiler.

```bash
npm run dev:tsc
```

Open another terminal and start the server.

```bash
npm run dev:node
```

### Production

```bash
npm run build

npm start
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install
```

Create

```text
.env.local
```

Add

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Run

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🌐 Live Deployment

| Resource | Link |
|----------|------|
| 🚀 Live Demo | https://frontend-sigma-tawny-82.vercel.app/ |
| 💻 GitHub Repository | https://github.com/mahmudul-Hasan-2/DevAgent |
| 🎨 Frontend | /frontend |
| 🛡 Backend | /backend |

---

# 📡 API Integration

The frontend communicates with the backend using a RESTful API.

Main integrations include:

- Better Auth Session Management
- Google Gemini AI
- Workspace CRUD Operations
- AI Chat
- Authentication
- Project Generation
- Secure API Communication

---

# 🔐 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_key

GEMINI_API_KEY=your_google_gemini_api_key
```

---

## Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# 🎯 Features Overview

- ✅ AI Project Generator
- ✅ AI Co-Pilot Chat
- ✅ Better Auth Authentication
- ✅ JWT Security
- ✅ MongoDB Database
- ✅ Modern Dashboard
- ✅ Workspace Management
- ✅ Responsive Design
- ✅ TypeScript
- ✅ REST API
- ✅ Gemini AI Integration
- ✅ Production Ready

---

# 📸 Screenshots

> Add screenshots here.

```text
📷 Dashboard

📷 AI Chat

📷 Workspace

📷 Authentication
```

---

# 🛣 Roadmap

- [x] Authentication
- [x] Workspace Management
- [x] Gemini AI Integration
- [x] AI Project Generator
- [x] AI Chat
- [ ] Team Collaboration
- [ ] File Uploads
- [ ] Notifications
- [ ] Real-Time Collaboration
- [ ] Docker Support
- [ ] Kubernetes Deployment

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create your feature branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

# 📝 License

Distributed under the **MIT License**.

See the `LICENSE` file for more information.

---

# 👨‍💻 Author

### Mahmudul Hasan Nirab

- GitHub: https://github.com/mahmudul-Hasan-2

---

<div align="center">

## ⭐ If you found this project helpful, please consider giving it a star!

**Built with ❤️ using Next.js, Express.js, MongoDB, TypeScript, Better Auth, and Google Gemini AI.**

</div>
