class ProgressTracker:
    def __init__(self):
        self.tasks = []

    def log(self, stage, description):
        self.tasks.append({
            "stage": stage,
            "description": description
        })

    def show_progress(self):
        return self.tasks
