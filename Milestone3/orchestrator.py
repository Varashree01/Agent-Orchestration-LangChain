# orchestrator.py

from agents.research_agent import create_research_agent
from agents.summarizer_agent import create_summarizer_agent
from agents.planner_agent import create_planner_agent

def run_pipeline(topic: str):
    research_agent = create_research_agent()
    summarizer_agent = create_summarizer_agent()
    planner_agent = create_planner_agent()

    research = research_agent.run(topic)
    summary = summarizer_agent.run(research, topic)
    plan = planner_agent.run(topic)

    return research, summary, plan
