class SharedMemory:
    def __init__(self):
        self.knowledge_base = []

    def store(self, source, content):
        self.knowledge_base.append({
            "source": source,
            "content": content
        })

    def retrieve_all(self):
        return self.knowledge_base
