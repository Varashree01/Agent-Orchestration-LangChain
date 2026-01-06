import os
import operator
from typing import Dict, List, TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, SystemMessage
from dotenv import load_dotenv

# Import your tools
from tools.math_tool import add, multiply, divide
from tools.weather_tool import get_weather
from tools.todolist_tool import add_task, get_task

load_dotenv()

# 1. State Definition
class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    next_agent: str

# 2. Initialize Groq Llama-3.3-70b
llm = ChatGroq(
    temperature=0,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# 3. Create specialized Worker Agents
math_agent = create_react_agent(llm, tools=[add, multiply, divide])
weather_agent = create_react_agent(llm, tools=[get_weather])
todoist_agent = create_react_agent(llm, tools=[add_task, get_task])

# 4. Supervisor Logic
members = ["math", "weather", "todoist"]

def supervisor_node(state: AgentState):
    options = ["FINISH"] + members
    system_msg = (
        f"You are Varix Supervisor. Route the user request to: {members}. "
        "Choose 'math' for calculations, 'weather' for temperature/forecast, "
        "and 'todoist' to manage tasks. "
        f"Respond ONLY with one of these words: {options}. If done, respond FINISH."
    )
    messages = [SystemMessage(content=system_msg)] + state["messages"]
    response = llm.invoke(messages)
    
    predicted_name = response.content.strip().lower()
    next_agent = "FINISH"
    for m in members:
        if m in predicted_name:
            next_agent = m
            break
    return {"next_agent": next_agent}

# 5. Build Graph
def create_varix_graph():
    workflow = StateGraph(AgentState)
    
    workflow.add_node("supervisor", supervisor_node)
    workflow.add_node("math", math_agent)
    workflow.add_node("weather", weather_agent)
    workflow.add_node("todoist", todoist_agent)

    workflow.set_entry_point("supervisor")

    workflow.add_conditional_edges(
        "supervisor",
        lambda x: x["next_agent"],
        {**{m: m for m in members}, "FINISH": END}
    )

    for m in members:
        workflow.add_edge(m, "supervisor")

    return workflow.compile()

graph = create_varix_graph()