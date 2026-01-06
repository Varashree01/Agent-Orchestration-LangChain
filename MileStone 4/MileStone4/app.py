from flask import Flask, request, jsonify
from flask_cors import CORS
from langgraph_supervisor import graph
from langchain_core.messages import HumanMessage
import os

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_input = data.get('message')
        
        # Invoke the graph
        result = graph.invoke({
            "messages": [HumanMessage(content=user_input)]
        })
        
        # Get the final AI message
        final_response = result["messages"][-1].content
        active_agent = result.get("next_agent", "Supervisor")

        return jsonify({
            "response": final_response,
            "agent_name": active_agent
        })
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "I encountered an error processing that request.", "agent_name": "Error"}), 500

if __name__ == '__main__':
    app.run(port=11000, debug=True)