# main.py

from orchestrator import run_pipeline

topic = input("Enter a topic: ")
research, summary, plan = run_pipeline(topic)

print("\n=== FINAL OUTPUT ===\n")

print("[Research Agent]")
print(research)

print("\n--------------------------")
print("[Summarizer Agent]")
print(summary)

print("\n--------------------------")
print("[Planner Agent]")
print(plan)
