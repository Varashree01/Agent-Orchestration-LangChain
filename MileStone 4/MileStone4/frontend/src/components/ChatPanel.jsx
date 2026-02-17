import { useState } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatPanel.css";

export default function ChatPanel({ setAgentSteps, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setAgentSteps([]);
    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:11000/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let aiReply = "";
      let steps = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n").filter(Boolean);

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace("data: ", "");
            try {
              const parsed = JSON.parse(jsonStr);
              console.log("SSE chunk:", parsed);

              // Supervisor reply
              if (parsed?.response?.supervisor?.content) {
                aiReply = parsed.response.supervisor.content;
              }

              // Capture agent execution
              const agentLike = Object.entries(parsed.response || {})
                .filter(([key]) => key !== "supervisor")
                .map(([role, obj]) => ({
                  type: role.toUpperCase(),
                  content: obj?.content || JSON.stringify(obj),
                }));

              if (agentLike.length) {
                steps = agentLike;
                setAgentSteps(steps);
              }
            } catch (err) {
              console.error("Bad SSE chunk", err);
            }
          }
        }
      }

      if (aiReply) {
        setMessages((prev) => [...prev, { role: "ai", content: aiReply }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { role: "ai", content: "Error: Could not reach the server. Make sure the backend is running on port 11000." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-panel">
      {/* Messages Container */}
      <div className="messages-container">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>Welcome to VARIX, {user}!</h2>
            <p>Ask me anything - math problems, weather, poems, tasks, or space launches.</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <div className="loader"></div>
            <span>Processing your request...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-wrapper">
          <input
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => !isLoading && e.key === "Enter" && sendMessage()}
            placeholder="Ask anything..."
            disabled={isLoading}
          />
          <button
            className="send-button"
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? "..." : "→"}
          </button>
        </div>
      </div>
    </div>
  );
}
