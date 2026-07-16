# ⚡ VERTEX — Multi-Agent Developer Team Dashboard & Control Portal

![Python](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-🦜-000000)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3-orange)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-success)

> An enterprise-grade full-stack developer workspace featuring an asynchronous AI agent orchestration engine, a real-time reactive interface, and advanced client-side cryptographic credential reinforcement. Powered by LangChain and Groq (Llama 3.3) to coordinate a dynamic software development lifecycle simulation.

---

## 🚀 Key Architectural Features

- **Dynamic Multi-Agent AI Pipeline** — Integrates real-time, template-driven LLM coordination using **Llama-3.3-70b-versatile** via Groq Cloud APIs to dynamically generate blueprints, write source code, execute tests, and document features based on live user inputs.
- **Asynchronous Execution Router** — Powered by FastAPI using Python's asyncio thread executor pattern (`loop.run_in_executor`) to coordinate complex agent state trees asynchronously without blocking the primary ASGI server runtime.
- **Hardened JWT Gateway Security** — Implements secure, stateful JSON Web Tokens (JWT) for authentication alongside cryptographic hashing techniques to reinforce authorization headers.
- **Dynamic Password Complexity Engine** — Features a client-side reactive validation matrix that cross-verifies security baselines (length, numeric parameters, special signatures) in real-time.
- **Live STDOUT Runtime Monitor** — A terminal-styled visual logger embedded in the frontend to stream dynamic logs directly from backend execution loops, mapping agent progress visually.

---

## 🛠️ System Architecture & Stack

| Layer | Technology |
|---|---|
| **Core AI Engine** | Groq Cloud API, Llama-3.3-70b-versatile, LangChain |
| **Backend** | Python 3.12, FastAPI, Uvicorn (ASGI), PyJWT, PassLib, Pydantic |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Database** | Volatile In-Memory Key-Value Store (RAM Optimized) |

---

## 🤖 Dynamic Multi-Agent Workflow

Instead of mock scripts, VERTEX triggers an active orchestration pipeline that executes sequentially:

[ User Input ] ──> [ Project Manager Agent ] ──> [ Developer Agent ]

│

[ Documentation Agent ] <── [ QA Tester Agent ] <──────┘


1. **Project Manager Agent:** Analyzes raw ideas to output formal, structured Technical Requirements.
2. **Developer Agent:** Consumes requirements to code clean, functional software blueprints in real-time.
3. **QA Tester Agent:** Audits the generated codebase, simulating security edge cases, verification feedback, and log files.
4. **Technical Writer Agent:** Parses the final code block to construct a professional, deployment-ready README markdown manifest.

---

## 📁 Environment Setup

To secure credential signatures and interface with the dynamic AI engine, create a `.env` file in your root `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_local_jwt_signing_secret
ALGORITHM=HS256

---

## 💿 Installation & Setup

### 🐍 1. Backend Setup

Navigate to the backend directory, initialize a virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows
pip install fastapi uvicorn pyjwt passlib[bcrypt] pydantic langchain-openai python-dotenv
```

Start the ASGI server:

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

---

### ⚛️ 2. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd frontend
npm install
npm run dev
```

---

## 🛡️ Password Requirements

All credentials must satisfy the following rules to pass backend validation:

| Rule | Requirement |
|---|---|
| **Minimum Length** | At least **8 characters** |
| **Numeric Integration** | At least **1 digit** (`0–9`) |
| **Special Character** | At least **1 special character** (`!@#$%^&*`) |

---

## 📁 Project Structure

```
multi-agent-dev-team/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── agents.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── graph.py
│   │   └── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── index.css
│   │   ├── Login.tsx
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
├── .hintrc
└── README.md
```

---

## 👩‍💻 Author

**Aqsa Jamali**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
