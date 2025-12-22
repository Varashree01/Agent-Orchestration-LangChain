# agents/summarizer_agent.py

from llm_provider import generate_text

class SummarizerAgent:
    def run(self, research_text: str, topic: str) -> str:
        prompt = f"""
Summarize clearly and concisely:

{research_text}
"""
        return generate_text(prompt, topic)


def create_summarizer_agent():
    return SummarizerAgent()
