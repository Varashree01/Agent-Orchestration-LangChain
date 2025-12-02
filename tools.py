# tools.py
"""
SkillStudy AI - Tools Module (LangGraph Compatible)
"""

def greet(name: str):
    return f"Hello {name}! I'm SkillStudy AI, your study companion."

def study_score(hours: str):
    try:
        h = int(hours)
        if h < 2:
            return "You studied less today. Try to improve!"
        elif h < 5:
            return "Nice! You studied a good amount today!"
        return "Excellent! You're doing amazing! 🔥"
    except:
        return "Please enter study hours as a number."
