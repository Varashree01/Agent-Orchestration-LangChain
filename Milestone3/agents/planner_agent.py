# agents/planner_agent.py

from llm_provider import generate_text

class PlannerAgent:
    def run(self, topic: str) -> str:
        prompt = f"""
Create a 4-step study plan for learning:
{topic}
"""
        return generate_text(prompt, topic)


def create_planner_agent():
    return PlannerAgent()
