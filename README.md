# Varix Intelligence: AI Agent Orchestration Framework

**An Intelligent Multi-Agent System for Specialized Task Execution.**

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Description / Overview](#description--overview)
3. [Agent Workflow & Architecture](#agent-workflow--architecture)
4. [Features](#features)
5. [Project Evolution](#project-evolution)
6. [Installation & Setup](#installation--setup)
7. [Visual Proof](#visual-proof)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgments](#acknowledgments)

---

## Technologies Used

![LangChain](https://img.shields.io/badge/LangChain-121212?style=for-the-badge&logo=chainlink&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-0F172A?style=for-the-badge&logo=graphql&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-111827?style=for-the-badge&logo=lightning&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-FFB300?style=for-the-badge&logo=cloudflare&logoColor=black)
![Todoist](https://img.shields.io/badge/Todoist-E44332?style=for-the-badge&logo=todoist&logoColor=white)

- **AI Core**: LangGraph, LangChain, Llama 3.3 (via Groq)
- **Backend**: Flask API, Python 3.11+
- **Frontend**: React.js, Tailwind CSS, Vite
- **Integrations**: OpenWeatherMap API, Todoist API

---

## Description / Overview

Varix Intelligence is a cutting-edge orchestration framework designed to manage complex AI workflows. Moving beyond linear chatbots, Varix implements a **Directed Acyclic Graph (DAG)** via LangGraph to coordinate a distributed team of expert agents.

The system utilizes a centralized **Supervisor Agent** that dynamically routes user intent to specialized workers—Math, Weather, Research, and Productivity agents—using the **ReAct (Reasoning and Acting)** pattern. This ensures that technical tasks are handled with deterministic precision rather than probabilistic guessing.

---

## Agent Workflow & Architecture

Varix Intelligence operates on a **Hierarchical Supervisor-Worker** topology. Below is the technical breakdown of how a single request travels through the system:

### 1. Intent Analysis & Routing (The Supervisor)

When a user submits a query, it first hits the **Supervisor Node**.

- **Logic**: The Supervisor acts as a router. It analyzes the prompt and compares it against the capability metadata of each worker.
- **Decision**: If the user asks for a calculation, the Supervisor transitions the graph state to the Math Agent. If the user asks for multiple things, the Supervisor sequences them.

### 2. The Worker Execution Loop (ReAct)

Each specialized worker follows a strict internal workflow:

- **Reasoning**: The agent determines which specific tool is required (for example, `add_numbers` or `get_current_weather`).
- **Acting**: The agent invokes a Python tool or external API.
- **Observation**: The result of the tool is fed back into the agent context.

### 3. State Management & Review

- **Shared State**: All agents write to a global `GraphState`. This allows a Weather Agent to find a temperature and a Math Agent to use that number in the next step.
- **Review Loop**: Once a worker finishes, control returns to the Supervisor. The Supervisor reviews the output. If incomplete, it routes to another agent; if complete, it routes to the `__end__` node.

---

## Features

- **Stateful Orchestration**: Maintains consistent memory across agent handoffs.
- **Deterministic Tools**: Offloads critical logic to Python scripts to reduce LLM math errors.
- **Multi-Domain Support**: Integrated support for Academic Research, Math, Weather, and Task Management.
- **Full-Stack Dashboard**: React UI that streams agent workflow and responses in real time.

---

## Project Evolution

- **Milestone 1**: Foundational single-agent graph and basic state
- **Milestone 2**: Implementation of Python-based tool-calling
- **Milestone 3**: Multi-agent collaboration and Supervisor routing logic
- **Milestone 4 (Varix Intelligence)**: Full-stack integration with React UI and Flask

---

## Installation & Setup

### Backend

```powershell
cd "MileStone 4\MileStone4"
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```powershell
cd frontend
npm install
npm run dev
```

---

## Visual Proof

Added  screenshots of:

- Supervisor routing decisions
- Agent handoff sequence
- Live streaming response in UI
- Light/Dark mode interface

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

---

## License

Distributed under the **MIT License**.

---

## Acknowledgments

A special thank you to my mentor Saadhana, for her guidance and support in building this orchestration framework.

---

## Author Information 

Name : Varashree H A, 
Email : varashree710@gmail.com

