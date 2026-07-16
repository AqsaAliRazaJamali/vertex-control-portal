import asyncio
import re
import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Internal Relative Modules Security Imports
from app.database import USER_DB
from app.auth import hash_password, create_access_token, SECRET_KEY, ALGORITHM

# Importing dynamic agents from our agents module
from app.agents import (
    project_manager_agent,
    developer_agent,
    tester_agent,
    documentation_agent
)

app = FastAPI(title="Vertex Workspace Matrix Engine")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AuthPayload(BaseModel):
    username: str
    password: str

class IdeaPayload(BaseModel):
    idea: str

# 🔐 ROUTE: USER REGISTRATION WITH RIGID COMPLEXITY CHECKS
@app.post("/api/auth/register")
async def register(payload: AuthPayload):
    if payload.username in USER_DB:
        raise HTTPException(status_code=400, detail="Username already completely occupied.")
    
    # 🛡️ Hardened Password Integrity Checkpoints
    if len(payload.password) < 8:
        raise HTTPException(status_code=400, detail="Password structure breach: Minimum 8 characters required.")
    if not re.search(r"\d", payload.password):
        raise HTTPException(status_code=400, detail="Password structure breach: Must contain at least one numeric digit.")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>_]", payload.password):
        raise HTTPException(status_code=400, detail="Password structure breach: Must contain at least one special character.")

    # Saving Hashed Secure Signatures to Internal Node Dictionary
    USER_DB[payload.username] = {
        "username": payload.username,
        "password": hash_password(payload.password)
    }
    return {"status": "SUCCESS", "message": "Secure credentials profile initialized."}

# 🔐 ROUTE: USER LOGIN GATEWAY
@app.post("/api/auth/login")
async def login(payload: AuthPayload):
    user = USER_DB.get(payload.username)
    if not user or user["password"] != hash_password(payload.password):
        raise HTTPException(status_code=401, detail="Invalid credentials. Handshake refused.")
    
    # Token creation routine triggers
    token = create_access_token(data={"sub": payload.username})
    return {"status": "SUCCESS", "access_token": token}

# ASYNC PIPELINE COORDINATOR (Calling agents sequentially)
async def run_agents_pipeline_async(user_idea: str) -> dict:
    # We initialize the pipeline state dictionary
    state = {"idea": user_idea}
    
    # Executing the agents in a concurrent-friendly non-blocking system thread pool
    # Is se dynamic asyncio runtime freeze nahi hoga aur prompt base dynamic updates chalengi!
    loop = asyncio.get_running_loop()
    
    # Step 1: PM
    state = await loop.run_in_executor(None, project_manager_agent, state)
    await asyncio.sleep(0.2) # Chota gap logs read karne ke liye
    
    # Step 2: Developer
    state = await loop.run_in_executor(None, developer_agent, state)
    await asyncio.sleep(0.2)
    
    # Step 3: QA Tester
    state = await loop.run_in_executor(None, tester_agent, state)
    await asyncio.sleep(0.2)
    
    # Step 4: Documentation Writer
    state = await loop.run_in_executor(None, documentation_agent, state)
    
    # Frontend payload configuration match design return
    return {
        "requirements": state.get("requirements", ""),
        "code": state.get("code", ""),
        "tester_feedback": state.get("tester_feedback", ""),
        "documentation": state.get("documentation", "")
    }

# 🚧 SECURED PIPELINE COMPILATION EXECUTION ROUTE
@app.post("/api/develop")
async def develop_async(payload: IdeaPayload, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Access token authentication signature missing.")
    
    token = authorization.split(" ")[1]
    try:
        # Cryptographic Verification Handshake
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        raise HTTPException(status_code=401, detail="Access token validation signature expired or corrupted.")

    if not payload.idea.strip():
        raise HTTPException(status_code=400, detail="Target processing string payload is completely empty.")
    
    # Call our dynamic multi-agent framework
    return await run_agents_pipeline_async(payload.idea)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
