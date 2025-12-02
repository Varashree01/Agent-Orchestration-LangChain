# memory.py
"""
SkillStudy AI - Simple Memory for LangGraph Agent
"""

from typing import TypedDict, List

# Graph state memory
class AgentState(TypedDict):
    messages: List[dict]  # list of {"role": "", "content": ""}
