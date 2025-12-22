# llm_provider.py

def detect_domain(topic: str) -> str:
    topic = topic.lower().strip()

    tech_keywords = [
        "machine", "learning", "ai", "artificial",
        "intelligence", "data", "algorithm", "computer"
    ]

    math_keywords = [
        "math", "maths", "mathematics",
        "algebra", "calculus", "geometry", "statistics"
    ]

    arts_keywords = [
        "dance", "music", "art",
        "bharatanatyam", "bharathanatyam",
        "classical", "culture"
    ]

    science_keywords = [
        "physics", "chemistry", "biology", "science"
    ]

    if any(word in topic for word in tech_keywords):
        return "technology"

    if any(word in topic for word in math_keywords):
        return "mathematics"

    if any(word in topic for word in arts_keywords):
        return "arts"

    if any(word in topic for word in science_keywords):
        return "science"

    return "general"


def generate_text(prompt: str, topic: str) -> str:
    domain = detect_domain(topic)

    if domain == "technology":
        return f"""
{topic.title()} is an important area of modern technology.

Definition:
{topic.title()} focuses on building systems that can analyze data,
learn patterns, and make intelligent decisions.

Key Concepts:
- Algorithms
- Data-driven models
- Training and evaluation
- Automation

Real-World Applications:
- Healthcare
- Finance
- Autonomous systems
- Recommendation engines

Challenges:
- Bias in data
- Ethical concerns
- Computational cost
""".strip()

    elif domain == "mathematics":
        return f"""
{topic.title()} is a fundamental academic discipline.

Definition:
{topic.title()} deals with numbers, structures, patterns,
and logical reasoning.

Key Concepts:
- Numbers and operations
- Algebraic thinking
- Problem solving
- Proof and logic

Real-World Applications:
- Engineering
- Economics
- Computer science
- Data analysis

Challenges:
- Abstract reasoning
- Conceptual difficulty
""".strip()

    elif domain == "arts":
        return f"""
{topic.title()} is a classical art form.

Definition:
{topic.title()} is a traditional expressive discipline rooted
in culture, rhythm, and storytelling.

Key Concepts:
- Expression (Abhinaya)
- Rhythm and movement
- Cultural narratives
- Performance technique

Applications:
- Stage performances
- Cultural education
- Heritage preservation

Challenges:
- Years of practice
- Physical discipline
""".strip()

    elif domain == "science":
        return f"""
{topic.title()} is a core scientific discipline.

Definition:
{topic.title()} studies natural phenomena using observation
and experimentation.

Key Concepts:
- Scientific method
- Observation
- Hypothesis testing
- Analysis

Applications:
- Research
- Technology development
- Education

Challenges:
- Experimental complexity
- Precision requirements
""".strip()

    else:
        return f"""
{topic.title()} is a general subject of study.

This topic involves understanding key ideas, background,
and real-world relevance through structured learning.
""".strip()
