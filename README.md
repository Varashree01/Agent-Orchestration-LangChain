# Varix Intelligence: AI Agent Orchestration Framework

**An Intelligent Multi-Agent System for Specialized Task Execution.**

---

## Table of Contents

1. [Description / Overview](https://www.google.com/search?q=%23description--overview)
2. [Agent Workflow & Architecture](https://www.google.com/search?q=%23agent-workflow--architecture)
3. [Features](https://www.google.com/search?q=%23features)
4. [Technologies Used](https://www.google.com/search?q=%23technologies-used)
5. [Project Evolution](https://www.google.com/search?q=%23project-evolution)
6. [Installation & Setup](https://www.google.com/search?q=%23installation--setup)
7. [Visual Proof](https://www.google.com/search?q=%23visual-proof)
8. [Contributing](https://www.google.com/search?q=%23contributing)
9. [License](https://www.google.com/search?q=%23license)
10. [Acknowledgments](https://www.google.com/search?q=%23acknowledgments)

---

## Description / Overview

**Varix Intelligence** is a cutting-edge orchestration framework designed to manage complex AI workflows. Moving beyond linear chatbots, Varix implements a **Directed Acyclic Graph (DAG)** via LangGraph to coordinate a distributed team of expert agents.

The system utilizes a centralized **Supervisor Agent** that dynamically routes user intent to specialized workers—Math, Weather, Research, and Productivity agents—using the **ReAct (Reasoning and Acting)** pattern. This ensures that technical tasks are handled with deterministic precision rather than probabilistic guessing.

---

## Agent Workflow & Architecture

Varix Intelligence operates on a **Hierarchical Supervisor-Worker** topology. Below is the technical breakdown of how a single request travels through the system:

### 1. Intent Analysis & Routing (The Supervisor)

When a user submits a query, it first hits the **Supervisor Node**.

* **Logic**: The Supervisor acts as a router. It analyzes the prompt and compares it against the "capability metadata" of each worker.
* **Decision**: If the user asks for a calculation, the Supervisor transitions the graph state to the `Math Agent`. If the user asks for multiple things, the Supervisor sequences them.

### 2. The Worker Execution Loop (ReAct)

Each specialized worker follows a strict internal workflow:

* **Reasoning**: The agent determines which specific tool is required (e.g., `add_numbers` or `get_current_weather`).
* **Acting**: The agent invokes a Python tool or external API.
* **Observation**: The result of the tool is fed back into the agent's context.

### 3. State Management & Review

* **Shared State**: All agents write to a global `GraphState`. This allows a `Weather Agent` to find a temperature, and a `Math Agent` to then use that number for a calculation in the next step.
* **Review Loop**: Once a worker finishes, control returns to the **Supervisor**. The Supervisor reviews the output. If the task is incomplete, it routes to another agent; if complete, it routes to the `__end__` node.

---

## Features

* **Stateful Orchestration**: Maintains a consistent memory of the conversation across multiple agent handoffs.
* **Deterministic Tools**: Offloads logic to Python scripts to eliminate LLM mathematical errors.
* **Multi-Domain Support**: Integrated support for Academic Research, Math, Weather, and Task Management.
* **Full-Stack Dashboard**: A React UI that displays the "Thought Stream" of the agents in real-time.

---

## Technologies Used

* **AI Core**: LangGraph, LangChain, Llama 3.3 (via Groq).
* **Backend**: Flask API, Python 3.11.
* **Frontend**: React.js, Tailwind CSS, Vite.
* **Integrations**: OpenWeatherMap API, Todoist API.

---

## Project Evolution

* **Milestone 1**: Foundational single-agent graph and basic state.
* **Milestone 2**: Implementation of Python-based tool-calling.
* **Milestone 3**: Multi-agent collaboration and Supervisor routing logic.
* **Milestone 4 (Varix Intelligence)**: Full-stack integration with React UI and Flask.

---

## Installation & Setup

### Backend

```powershell
cd MileStone4
python -m venv .venv
.\.venv\Scripts\activate
pip install flask flask-cors langgraph langchain-groq python-dotenv requests
python app.py

```

### Frontend

```bash
cd frontend
npm install
npm run dev

```

---

## Visual Proof

The screenshot below shows the **Varix Intelligence** system executing a multi-step task, demonstrating the Supervisor's ability to coordinate between different workers.
[./Demo_Dashboard.png]


## License

Distributed under the **MIT License**.

---

## Acknowledgments

A special thank you to my mentor, **Saadhana**, for her exceptional guidance and for pushing the boundaries of what this orchestration framework could achieve. Her expertise in AI system design was crucial to the success of Varix Intelligence.

