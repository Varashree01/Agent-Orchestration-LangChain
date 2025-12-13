# agent_graph.py
"""
SkillStudy AI - LangGraph Zero-Shot Agent
Works on Python 3.13 with Gemini 2.0 Flash
"""

import os
from dotenv import load_dotenv

load_dotenv()

from typing import List
from memory import AgentState
from tools import greet, study_score

# Packages
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI


# -------------------------------
# 1. LLM (Gemini 2.0 Flash)
# -------------------------------
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.0
)


# -------------------------------
# 2. TOOL WRAPPER
# -------------------------------
def call_tool(tool_name: str, argument: str):
    if tool_name == "greet":
        return greet(argument)
    elif tool_name == "study_score":
        return study_score(argument)
    return "Unknown tool."


# -------------------------------
# 3. Agent Node (LLM Reasoning)
# -------------------------------
def agent_node(state: AgentState):
    messages = state["messages"]

    response = llm.invoke(messages)

    output = response.content

    # Tool call format handler
    if "use_tool:" in output.lower():
        # expected format: use_tool:tool_name|argument
        try:
            _, cmd = output.split("use_tool:")
            tool_name, arg = cmd.strip().split("|")
            tool_result = call_tool(tool_name.strip(), arg.strip())

            return {"messages": messages + [
                {"role": "assistant", "content": tool_result}
            ]}
        except:
            return {"messages": messages + [
                {"role": "assistant", "content": "Tool call format error."}
            ]}
    
    # Normal message
    return {"messages": messages + [{"role": "assistant", "content": output}]}


# -------------------------------
# 4. Graph Definition
# -------------------------------
def create_agent_graph():
    graph = StateGraph(AgentState)

    graph.add_node("agent", agent_node)

    graph.set_entry_point("agent")
    graph.add_edge("agent", END)

    return graph.compile()