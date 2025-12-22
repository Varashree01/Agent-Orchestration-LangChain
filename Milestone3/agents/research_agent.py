# agents/research_agent.py

from llm_provider import generate_text

class ResearchAgent:
    def run(self, topic: str) -> str:
        prompt = f"""
Research the topic and explain:
- Definition
- Key concepts
- Real-world applications
- Challenges

Topic: {topic}
"""
        return generate_text(prompt, topic)


def create_research_agent():
    return ResearchAgent()
