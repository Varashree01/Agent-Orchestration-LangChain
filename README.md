📘 SkillStudy AI :

SkillStudy AI is an intelligent study assistant built using LangChain, LangGraph, and Google Gemini. It provides clear explanations for academic topics, performs personalized greetings, and evaluates study performance using tool-based reasoning and LLM-driven decision-making. Designed as a modular and extensible system, it demonstrates modern agent workflows, tool integration, and conversational memory in a clean and practical implementation.

🚀 What’s Included :

Week 1: Basic LLM setup using Gemini, prompt template, and a simple chain.

Week 2: Zero-Shot style agent using Langchain,LangGraph, custom tools (greet, study_score), conversational memory, and an interactive console (main.py).

🔧 Installation :

Create virtual environment:
python -m venv .venv
.venv\Scripts\activate

Install packages:
pip install -r requirements.txt

Add your API key to .env:
GOOGLE_API_KEY=your_key_here

▶️ Run the Project :
python main.py

💡 Example Commands :
use_tool:greet|Yourname

use_tool:study_score|4

Ask anything like: “Explain recursion.”

📄 License
MIT License.
