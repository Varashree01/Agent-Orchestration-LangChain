from tools import calculator, summarizer, study_plan, motivate

print("\n✨ SkillStudy AI — Tools Enabled")
print("Type 'exit' to quit.\n")

while True:
    user = input("You: ")

    if user.lower() == "exit":
        print("Goodbye! 👋")
        break

    if user.startswith("calc:"):
        expr = user.split("calc:")[1]
        print(calculator(expr))

    elif user.startswith("sum:"):
        text = user.split("sum:")[1]
        print("\n" + summarizer(text) + "\n")

    elif user.startswith("study:"):
        hours = user.split("study:")[1]
        print("\n" + study_plan(hours) + "\n")

    elif user.startswith("motivate:"):
        name = user.split("motivate:")[1]
        print("\n" + motivate(name) + "\n")

    else:
        print("Unknown command. Use calc:, sum:, study:, motivate:")
