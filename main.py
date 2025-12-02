# main.py
"""
SkillStudy AI - Interactive Console using LangGraph Agent
"""

from agent_graph import create_agent_graph

app = create_agent_graph()

print("\n===== SkillStudy AI (LangGraph Agent) =====\n")
print("Type 'exit' to stop.\n")

state = {"messages": []}

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye! Keep learning!")
        break

    # Add user message to state
    state["messages"].append({"role": "user", "content": user_input})

    # Run agent
    result = app.invoke(state)

    # Extract latest assistant response
    final_message = result["messages"][-1]["content"]
    
    print("SkillStudy AI:", final_message)
    print()
