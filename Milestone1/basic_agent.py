# basic_agent.py
"""
SkillStudy AI - Milestone 1 - Week 1
Using Gemini 2.0 Flash + LangChain v0.3+ (Correct Model + Imports)
"""

import os
from dotenv import load_dotenv

# Load API key
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# LangChain imports (new version)
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableSequence

# Correct & supported Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",      # <-- FIXED MODEL NAME
    google_api_key=GOOGLE_API_KEY,
    temperature=0.2
)

# Prompt Template
prompt = PromptTemplate(
    input_variables=["topic"],
    template="""
Explain the topic in simple terms:

Topic: {topic}
"""
)

# Build chain
chain = RunnableSequence(prompt | llm | StrOutputParser())

if __name__ == "__main__":
    print("\n===== SkillStudy AI - Week 1 Output =====\n")
    result = chain.invoke({"topic": "Explain Data Structures in simple terms."})
    print(result)