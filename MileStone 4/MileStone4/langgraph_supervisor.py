from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.tools import tool
from typing import Union


def create_supervisor(model, agents, prompt, add_handoff_back_messages=True, output_mode="full_history"):
    """
    Create a smart supervisor that routes to the appropriate agent.
    
    Args:
        model: The LLM model to use
        agents: List of agent graphs
        prompt: System prompt for the supervisor
        add_handoff_back_messages: Whether to add handoff messages
        output_mode: "full_history" or other mode
    
    Returns:
        A compiled supervisor that routes to agents intelligently
    """
    
    class SupervisorWithRouting:
        def __init__(self, model, agents, prompt):
            self.model = model
            self.agents = {agent.name: agent for agent in agents}
            self.prompt = prompt
            self.name = "supervisor"
            
        def compile(self):
            return self
        
        def _determine_agent(self, user_prompt: str) -> str:
            """Use LLM to determine which agent to use"""
            determination_prompt = f"""You are a router. Based on the user request, determine which agent should handle it.

Available agents:
- math_agent: For math, calculations, arithmetic
- poem_agent: For poetry, creative writing, verse
- weather_agent: For weather, temperature, conditions in locations
- launch_vehicle_agent: For space rockets, launches, missions
- todoist_agent: For todo lists, tasks, reminders
- supervisor: For general conversation

User request: {user_prompt}

Respond with ONLY the agent name. If no specific agent fits, use 'supervisor'."""
            
            response = self.model.invoke(determination_prompt)
            agent_response = response.content.strip().lower()
            
            # Extract agent name from response
            for agent_name in self.agents.keys():
                if agent_name.lower() in agent_response:
                    return agent_name
            
            return "supervisor"  # Default to supervisor
            
        def stream(self, state):
            """Stream responses from the appropriate agent"""
            messages = state.get("messages", [])
            
            if isinstance(messages, str):
                user_input = messages
                messages = [HumanMessage(content=messages)]
            else:
                user_input = messages[-1].content if messages else ""
            
            # Determine which agent to use
            chosen_agent = self._determine_agent(user_input)
            
            # If supervisor was chosen, handle directly
            if chosen_agent == "supervisor":
                try:
                    response = self.model.invoke(self.prompt + f"\n\nUser: {user_input}")
                    yield {
                        "supervisor": {
                            "messages": [AIMessage(content=response.content)]
                        }
                    }
                except Exception as e:
                    yield {
                        "supervisor": {
                            "messages": [AIMessage(content=f"Error: {str(e)}")]
                        }
                    }
            else:
                # Route to specific agent
                agent = self.agents.get(chosen_agent)
                if agent:
                    try:
                        result = agent.invoke({"messages": messages})
                        
                        # Extract the actual response from agent result
                        if isinstance(result, dict) and "messages" in result:
                            messages_list = result["messages"]
                            if isinstance(messages_list, list) and messages_list:
                                last_msg = messages_list[-1]
                                content = last_msg.content if hasattr(last_msg, 'content') else str(last_msg)
                            else:
                                content = str(result)
                        else:
                            content = str(result)
                        
                        yield {
                            chosen_agent: {
                                "messages": [AIMessage(content=content)]
                            }
                        }
                    except Exception as e:
                        yield {
                            chosen_agent: {
                                "messages": [AIMessage(content=f"Agent error: {str(e)}")]
                            }
                        }
                else:
                    yield {
                        "supervisor": {
                            "messages": [AIMessage(content=f"Agent {chosen_agent} not found")]
                        }
                    }
    
    return SupervisorWithRouting(model, agents, prompt)

