import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Send, Moon, Sun, Plus, Zap, Calculator, Cloud, Scroll, Rocket, ListTodo } from 'lucide-react';
import './App.css';

function VarixApp() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [activeAgent, setActiveAgent] = useState("supervisor");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:11000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, requested_agent: activeAgent }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      if (data.agent_name) setActiveAgent(data.agent_name.toLowerCase());
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Connectivity error." }]);
    }
  };

  return (
    <div className={`varix-interface ${isDarkMode ? 'dark' : 'light'}`}>
      <aside className="varix-sidebar">
        <div className="brand">
          <Zap size={24} fill="#00f2ff" color="#00f2ff" />
          <span>VARIX AI</span>
        </div>
        <button className="btn-new-chat" onClick={() => setMessages([])}>
          <Plus size={18} /> New Session
        </button>
        <div className="agent-menu">
          <p className="menu-label">Active Agents</p>
          <div className={`menu-item ${activeAgent === 'math' ? 'active' : ''}`} onClick={() => setActiveAgent('math')}><Calculator size={18} /> Math Solver</div>
          <div className={`menu-item ${activeAgent === 'weather' ? 'active' : ''}`} onClick={() => setActiveAgent('weather')}><Cloud size={18} /> Weather Sync</div>
          <div className={`menu-item ${activeAgent === 'poem' ? 'active' : ''}`} onClick={() => setActiveAgent('poem')}><Scroll size={18} /> Poem Creator</div>
          <div className={`menu-item ${activeAgent === 'launch' ? 'active' : ''}`} onClick={() => setActiveAgent('launch')}><Rocket size={18} /> Launch Tracker</div>
          <div className={`menu-item ${activeAgent === 'todoist' ? 'active' : ''}`} onClick={() => setActiveAgent('todoist')}><ListTodo size={18} /> Todoist</div>
        </div>
      </aside>

      <main className="varix-main">
        <header className="varix-top-nav">
          <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="user-profile">
            <div className="avatar">V</div>
          </div>
        </header>

        <div className="chat-viewport">
          {messages.length === 0 ? (
            <div className="welcome-hero">
              <h1 className="hero-gradient">Varix Intelligence</h1>
              <p>How can I help you today?</p>
            </div>
          ) : (
            <div className="msg-container">
              {messages.map((m, i) => (
                <div key={i} className={`msg-row ${m.role}`}>
                  <div className="msg-bubble">{m.content}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        <footer className="varix-input-zone">
          <div className="input-capsule">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Send a command to ${activeAgent}...`}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-send" onClick={handleSend}><Send size={20} /></button>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default VarixApp;