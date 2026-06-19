from typing import Dict, TypedDict, List, Any
from langgraph.graph import StateGraph, END
from app.agents import project_manager_agent, developer_agent, tester_agent, documentation_agent

# Shared memory schema across the agents
class AgentState(TypedDict):
    idea: str
    requirements: str
    code: str
    tester_feedback: str
    test_reports: str
    documentation: str
    logs: List[str]
    iterations: int
    current_stage: str

workflow = StateGraph(AgentState)

# Nodes Deployment
workflow.add_node("ProjectManager", project_manager_agent)
workflow.add_node("Developer", developer_agent)
workflow.add_node("Tester", tester_agent)
workflow.add_node("DocumentationAgent", documentation_agent)

# Entry Point Setup
workflow.set_entry_point("ProjectManager")

# Core Sequential Graph Connections
workflow.add_edge("ProjectManager", "Developer")
workflow.add_edge("Developer", "Tester")

# Router conditional logic function for Tester loop
def router_condition(state: AgentState):
    if state.get("iterations", 0) >= 2 or "PASSED" in state.get("tester_feedback", "").upper():
        return "approved"
    return "rework"

workflow.add_conditional_edges(
    "Tester",
    router_condition,
    {
        "rework": "Developer",
        "approved": "DocumentationAgent"
    }
)

workflow.add_edge("DocumentationAgent", END)

agent_team_graph = workflow.compile()