# SkillStudy AI: Agent Orchestration Framework  
An Intelligent Tool-Enabled Study Assistant

Project Status: Python | LangChain | Google Gemini | Agent Systems



## Abstract

SkillStudy AI is an intelligent, console-based study assistant designed to demonstrate agent orchestration, tool-based reasoning, and modular AI system design using Large Language Models (LLMs). The system integrates Google Gemini with LangChain to build an interactive agent capable of understanding user intent, invoking appropriate tools, and producing meaningful academic assistance outputs.

The project focuses on practical implementation of agent workflows rather than UI complexity. It showcases how an AI agent can move beyond static responses and dynamically perform actions such as calculations, summarization, study planning, and motivational feedback through explicit tool integration.



## Key Capabilities

SkillStudy AI currently supports the following core functionalities:

- **Mathematical Reasoning**  
  Evaluates arithmetic and mathematical expressions accurately through a calculator tool.

- **Text Summarization**  
  Condenses long academic or informational text into concise, easy-to-understand summaries.

- **Study Plan Generation**  
  Produces structured study schedules based on the number of hours provided by the user.

- **Motivational Assistance**  
  Generates personalized motivational messages to encourage consistent learning and focus.

- **Interactive Console Interface**  
  Allows real-time interaction with the agent using simple, command-based inputs.



## System Architecture

SkillStudy AI follows a modular, agent-centric architecture:

- **User Interface**  
  A lightweight command-line interface for user interaction.

- **Agent Core**  
  A LangChain-powered agent that interprets user input and determines the appropriate action.

- **Tool Layer**  
  Independent, reusable tools (calculator, summarizer, study planner, motivator) invoked based on user intent.

- **LLM Backend**  
  Google Gemini model used for language understanding and generation tasks.

This separation ensures clarity, extensibility, and ease of future enhancements.



## Tools Implemented

| Tool Name        | Purpose |
|------------------|---------|
| Calculator Tool  | Evaluates mathematical expressions safely |
| Summarizer Tool  | Generates short summaries from longer text |
| Study Planner    | Creates time-based study schedules |
| Motivation Tool  | Produces personalized motivational messages |



## Tech Stack

### Core Technologies
- Programming Language: Python
- LLM Framework: LangChain
- LLM Provider: Google Gemini
- Environment Management: python-dotenv

### Libraries
- google-generativeai
- langchain
- python-dotenv



## Installation & Setup

### Prerequisites
- Python 3.10 or higher
- pip (Python Package Manager)
- Google Gemini API Key

### Steps

1. Clone the repository:

2. Create and activate a virtual environment:

3. Install dependencies:

4. Configure environment variables:
Create a `.env` file in the root directory and add:




## Running the Application

Navigate to the project directory and run:




## Current Output Summary

At its current stage, SkillStudy AI successfully demonstrates:
- A functioning tool-enabled AI agent
- Correct routing of user commands to specific tools
- Integration of an LLM with deterministic tool logic
- Clean, modular Python code suitable for academic evaluation



## Future Enhancements

- Conversational memory integration
- Natural language intent detection (without command prefixes)
- Web-based or GUI interface
- Persistent user profiles and learning history
- Additional academic tools (quiz generation, concept explanation)



## License

This project is licensed under the MIT License.



## Notes

- The `.env` file is excluded from version control using `.gitignore`.
- Each milestone is maintained separately to preserve development history.
- The project is designed for incremental extension and research-based evaluation.




