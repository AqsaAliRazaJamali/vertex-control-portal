import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

# Load parameters from environment
load_dotenv()

# Initialize OpenAI-compatible Client redirected to Groq
llm = ChatOpenAI(
    openai_api_key=os.getenv("GROQ_API_KEY"),
    openai_api_base="https://api.groq.com/openai/v1",
    model_name="llama-3.3-70b-versatile",
    temperature=0.3
)

# =====================================================================
# MULTI-AGENT PIPELINE GRAPH NODES (DYNAMIC LLM WORKFLOW)
# =====================================================================

def project_manager_agent(state: dict) -> dict:
    print("\n--- [1] PROJECT MANAGER AGENT ACTIVATED ---")
    user_idea = state.get("idea", "No prompt provided")
    
    # Dynamic LLM Prompt to outline requirements
    prompt = f"Act as an expert Project Manager. For the project idea: '{user_idea}', generate clean, professional Technical System Requirements. Include Core Architecture and Integration APIs."
    response = llm.invoke(prompt)
    
    state["requirements"] = response.content
    state["current_stage"] = "Project Management complete"
    print("-> Project Manager successfully saved dynamic requirements.")
    return state

def developer_agent(state: dict) -> dict:
    print("\n--- [2] DEVELOPER AGENT ACTIVATED ---")
    user_idea = state.get("idea", "No prompt provided")
    requirements = state.get("requirements", "")
    
    # Dynamic LLM Prompt to build code based on requirements
    prompt = f"Act as a Lead Software Engineer. Based on the requirements: '{requirements}', write complete, clean, production-ready backend framework/code code for the feature: '{user_idea}'. Return only the raw executable file code."
    response = llm.invoke(prompt)
    
    state["code"] = response.content
    state["current_stage"] = "Development complete"
    state["iterations"] = state.get("iterations", 0) + 1
    print(f"-> Developer generated dynamic code blueprint (Iteration: {state['iterations']}).")
    return state

def tester_agent(state: dict) -> dict:
    print("\n--- [3] QA TESTER AGENT ACTIVATED ---")
    code_to_test = state.get("code", "")
    
    # Dynamic LLM Prompt to test the generated code
    prompt = f"Act as a Senior QA Automation Engineer. Analyze the following code and write rigorous test cases, feedback, and execution logs:\n\n{code_to_test}"
    response = llm.invoke(prompt)
    
    state["tester_feedback"] = response.content
    state["current_stage"] = "Testing complete"
    print("-> Tester finalized feedback logs dynamically.")
    return state

def documentation_agent(state: dict) -> dict:
    print("\n--- [4] DOCUMENTATION AGENT ACTIVATED ---")
    user_idea = state.get("idea", "No prompt provided")
    code_to_doc = state.get("code", "")
    
    # Dynamic LLM Prompt to build technical guide
    prompt = f"Act as a Technical Writer. Write a detailed professional Markdown README.md for the following module execution context: '{user_idea}'. Use the following code as reference:\n\n{code_to_doc}"
    response = llm.invoke(prompt)
    
    state["documentation"] = response.content
    state["current_stage"] = "Documentation finalized"
    print("-> Documentation Agent successfully created dynamic project materials.")
    return state
