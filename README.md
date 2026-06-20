# ⚡ VERTEX — Multi-Agent Developer Team Dashboard & Control Portal

![Python](https://img.shields.io/badge/Python-Backend-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Async_API-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Security](https://img.shields.io/badge/Security-JWT%20%2B%20PassLib-red?style=for-the-badge)
![Architecture](https://img.shields.io/badge/Architecture-Multi--Agent-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Completed-success?style=for-the-badge)

> An enterprise-grade full-stack developer workspace featuring a secured asynchronous engine, a real-time reactive interface, and advanced client-side cryptographic credential reinforcement. Built to demonstrate high-performance asynchronous workflows and rigid data security boundaries.

---

## 🚀 Key Architectural Features

- **Asynchronous Execution Router** — Powered by FastAPI using non-blocking async loops (`asyncio`) to simulate concurrent multi-agent data compilations without thread jamming.
- **Hardened JWT Gateway Security** — Implements JSON Web Tokens (JWT) for secure session handshakes alongside robust password hashing techniques.
- **Dynamic Password Complexity Engine** — Features a client-side reactive validation matrix that cross-verifies security baselines (length, numeric parameters, special signatures) in real-time.
- **Live STDOUT Runtime Monitor** — A terminal-styled visual logger embedded in the frontend to stream granular micro-stage status updates and immediate feedback loops from the backend.
- **Cyberpunk Responsive Matrix UI** — Styled with pixel-perfect modular Tailwind CSS variables, leveraging modern dark-mode ergonomics and zero-dependency custom SVGs.

---

## 🛠️ System Architecture & Stack

| Layer | Technology |
|---|---|
| **Backend** | Python 3.12, FastAPI, Uvicorn (ASGI), PyJWT, PassLib |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Database** | Volatile In-Memory Key-Value Store (RAM Optimized) |

---

## 💿 Installation & Setup

### 🐍 1. Backend Setup

Navigate to the backend directory, initialize a virtual environment, and install dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows
pip install fastapi uvicorn pyjwt passlib[bcrypt] pydantic
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

## 👤 Author

**Aqsa Jamali**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
