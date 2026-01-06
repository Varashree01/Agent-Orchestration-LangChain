# **SkillStudy AI: Advanced Agent Orchestration Framework**

### **An Intelligent Multi-Agent System for Specialized Task Execution**

**Project Status:** Python | LangGraph | Flask | React | Multi-Agent Orchestration | System Design

---

## **Abstract**

SkillStudy AI is an advanced research and development framework designed to demonstrate the evolution of agent orchestration. The project explores the transition from single-agent systems to complex, multi-agent directed acyclic graphs (DAGs). By decomposing complex user requests into specialized tasks, the system coordinates multiple AI personalities—Research, Math, Weather, and Planning agents—through a centralized orchestration layer.

The focus remains on **architectural clarity** and **stateful reasoning**. While earlier milestones focused on modular console interactions, Milestone 4 introduces **Varix Intelligence**, a full-stack implementation utilizing **LangGraph** for supervisor-led routing, a **Flask** backend, and a modern **React** interface.

---

## **Key Capabilities**

* **Stateful Agent Orchestration:** Utilizes LangGraph to maintain conversation state and manage complex hand-offs between agents.
* **Supervisor-Worker Pattern:** A central "Supervisor" agent (Llama 3.3) analyzes intent and dynamically routes tasks to specialized workers.
* **ReAct-Based Tool Execution:** Agents utilize the "Reasoning and Acting" pattern to invoke deterministic Python tools for calculations, weather data, and task management.
* **Full-Stack Architecture:** A decoupled system featuring a high-performance React frontend and a robust Flask REST API.
* **Multi-Domain Intelligence:** Integrated support for academic research, mathematical solving, environmental data, and productivity management.

---

## **Agent Workflow**

1. **Intent Analysis:** The Supervisor node receives user input and determines which specialized worker is required.
2. **Delegation:** The Supervisor routes the state to the chosen worker (e.g., Math Agent).
3. **Tool Invocation:** The worker agent executes the necessary Python tool and observes the result.
4. **Review Loop:** The worker returns its finding to the Supervisor. The Supervisor decides if the task is complete (`FINISH`) or if another agent is required.
5. **Response:** The final consolidated answer is delivered to the user interface.

---

## **Project Structure**

```text
SkillStudy_AI/
│
├── Milestone1/                     # Foundational Agent System
│   ├── main.py                     # Initial agent logic
│   ├── agent_graph.py              # Basic reasoning graph
│   ├── memory.py                   # Context handling
│   └── tools.py                    # Initial tool definitions
│
├── Milestone2/                     # Tool-Based Reasoning
│   ├── main.py                     # Orchestration logic
│   └── tools.py                    # Custom tool implementations
│
├── Milestone3/                     # Multi-Agent Collaboration
│   ├── agents/                     # Specialized agent modules
│   │   ├── research_agent.py
│   │   ├── summarizer_agent.py
│   │   └── planner_agent.py
│   ├── orchestrator.py             # Agent communication layer
│   ├── llm_provider.py             # API abstraction
│   └── main.py                     # Console entry point
│
├── Milestone4/                     # Full-Stack Graph System (Varix Intelligence)
│   ├── app.py                      # Flask API Server
│   ├── langgraph_supervisor.py      # Core Graph Orchestrator (The Brain)
│   ├── .env                        # Secret configurations
│   ├── .gitignore                  # Version control exclusions
│   ├── tools/                      # Tool Package Directory
│   │   ├── __init__.py             # Package marker
│   │   ├── math_tool.py            # Mathematical logic
│   │   ├── weather_tool.py         # Weather API integration
│   │   └── todolist_tool.py        # Task management logic
│   └── frontend/                   # React Web Application
│       ├── src/                    # Frontend source code
│       └── package.json            # Node dependencies
│
├── README.md                       # Project Documentation
└── .gitignore                      # Root ignore file

```

---

## **Agents & Tools Implemented**

| Agent | Responsibility | Associated Tooling |
| --- | --- | --- |
| **Supervisor** | Orchestration & Routing | Logic-based intent detection |
| **Research Agent** | Academic explanation | Summarization Tool |
| **Math Agent** | Numerical computation | Calculator Tool (Add, Multiply, Divide) |
| **Weather Agent** | Real-time atmospheric data | OpenWeatherMap API Tool |
| **Todoist Agent** | Productivity management | Task List Tool |
| **Planner Agent** | Learning path generation | Study Planner Tool |

---

## **Installation & Setup**

### **1. Prerequisites**

* Python 3.11+
* Node.js & npm
* Groq API Key (for LLM reasoning)
* OpenWeather API Key (for weather updates)

### **2. Backend Setup**

Navigate to the `Milestone4` directory and execute:

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install flask flask-cors langgraph langchain-groq python-dotenv requests
python app.py

```

### **3. Frontend Setup**

Navigate to the `frontend` directory and execute:

```bash
npm install
npm run dev

```

---

## **Memory and State Management**

SkillStudy AI incorporates memory at three distinct levels:

* **Short-term Message History:** Maintained within the LangGraph state for immediate context.
* **Shared Context:** Intermediate outputs from tools are accessible to subsequent agent calls.
* **System Prompt Persistence:** Hard-coded personas ensure agents maintain professional boundaries and specific reasoning styles.

---

## **Current Output Summary**

The system successfully demonstrates:

* **Deterministic Reasoning:** Mathematics and API calls are handled by tools, not LLM hallucinations.
* **Scalable Design:** New agents and tools can be added to the `tools/` directory and registered in the graph with minimal overhead.
* **Professional UX:** The Varix Intelligence UI provides a modern, responsive environment for agent interaction.

---

## **License**

This project is licensed under the MIT License.

