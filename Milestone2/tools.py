import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# use the new model
model = genai.GenerativeModel("gemini-2.5-flash")

# ---------------------- TOOLS ----------------------

def calculator(expression: str):
    try:
        return f"Result: {eval(expression)}"
    except:
        return "Invalid expression."

def summarizer(text: str):
    response = model.generate_content(f"Summarize this:\n{text}")
    return response.text

def study_plan(hours: str):
    response = model.generate_content(f"Create a {hours}-hour study plan.")
    return response.text

def motivate(name: str):
    response = model.generate_content(f"Give a short motivational message to {name}.")
    return response.text
