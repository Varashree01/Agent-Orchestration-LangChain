import os
import operator
# Change these lines:
from tools.math_tool import add, multiply, divide
from tools.weather_tool import get_weather
from tools.todolist_tool import add_task, get_task
from typing import Dict, List, TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import create_react_agent
from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, SystemMessage
from dotenv import load_dotenv

# Import your tools
from math_tool import add, multiply, divide
from weather_tool import get_weather
from todolist_tool import add_task, get_task

load_dotenv()

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], operator.add]
    next_agent: str

# Initialize Groq (Stable for Python 3.11/3.12)
llm = ChatGroq(
    model_name="llama-3.3-70b-versatile", 
    temperature=0, 
    groq_api_key=os.getenv("GROQ_API_KEY")
)

# Create Agents
math_agent = create_react_agent(llm, tools=[add, multiply, divide])
weather_agent = create_react_agent(llm, tools=[get_weather])
todoist_agent = create_react_agent(llm, tools=[add_task, get_task])

members = ["math", "weather", "todoist"]

def supervisor_node(state: AgentState):
    system_msg = (
        f"You are Varix Intelligence Supervisor. Route to: {members}. "
        "Respond ONLY with the name of the agent. If task is done, respond FINISH."
    )
    messages = [SystemMessage(content=system_msg)] + state["messages"]
    response = llm.invoke(messages)
    content = response.content.strip().lower()
    
    next_agent = "FINISH"
    for m in members:
        if m in content:
            next_agent = m
            break
    return {"next_agent": next_agent}

workflow = StateGraph(AgentState)
workflow.add_node("supervisor", supervisor_node)
workflow.add_node("math", math_agent)
workflow.add_node("weather", weather_agent)
workflow.add_node("todoist", todoist_agent)

workflow.set_entry_point("supervisor")

workflow.add_conditional_edges(
    "supervisor",
    lambda x: x["next_agent"],
    {"math": "math", "weather": "weather", "todoist": "todoist", "FINISH": END}
)

for m in members:
    workflow.add_edge(m, "supervisor")

graph = workflow.compile()