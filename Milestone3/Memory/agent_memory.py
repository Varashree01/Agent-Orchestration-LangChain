class AgentMemory:
    def __init__(self, agent_name):
        self.agent_name = agent_name
        self.history = []

    def save(self, input_text, output_text):
        self.history.append({
            "input": input_text,
            "output": output_text
        })

    def recall(self):
        return self.history
