import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiLoader } from 'react-icons/fi';
import { VarixLogo, UserAvatar, AgentIcon } from './Logos';
import { conversationStorage } from '../utils/conversationStorage';
import { useTheme } from '../ThemeProvider';
import './ChatInterface.css';

export default function ChatInterface({ user, conversationId, selectedAgent, onMessageAdded }) {
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentStep, setAgentStep] = useState('');
  const messagesEndRef = useRef(null);

  // Load conversation messages on mount
  useEffect(() => {
    const conversation = conversationStorage.getConversation(user, conversationId);
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversationId, user]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      agent: 'user',
    };

    setMessages([...messages, userMessage]);
    onMessageAdded(userMessage);
    setInput('');
    setLoading(true);
    setAgentStep('');

    try {
      const payload = { prompt: input };
      if (selectedAgent && selectedAgent !== 'auto') {
        payload.agent = selectedAgent;
      }

      const response = await fetch('http://localhost:11000/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';
      let agentName = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const response = data.response || {};

              // Get agent name and message
              for (const [key, value] of Object.entries(response)) {
                if (key !== 'supervisor' && value && value.content) {
                  agentName = key.toUpperCase().replace(/_/g, ' ');
                  fullResponse = value.content;
                  setAgentStep(`${agentName} is processing...`);
                } else if (key === 'supervisor' && value && value.content) {
                  fullResponse = value.content;
                  setAgentStep('');
                }
              }
            } catch (e) {
              // Ignore JSON parse errors
            }
          }
        }
      }

      if (fullResponse) {
        const assistantMessage = {
          role: 'assistant',
          content: fullResponse,
          agent: agentName || 'VARIX',
        };

        setMessages(prev => [...prev, assistantMessage]);
        onMessageAdded(assistantMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        agent: 'VARIX',
      };
      setMessages(prev => [...prev, errorMessage]);
      onMessageAdded(errorMessage);
    } finally {
      setLoading(false);
      setAgentStep('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`chat-interface ${isDark ? 'dark' : 'light'}`}>
      <div className="messages-container">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              className="welcome-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="welcome-icon">
                <VarixLogo size={64} />
              </div>
              <h2>Welcome to VARIX</h2>
              <p>Your intelligent multi-agent assistant</p>
              <div className="agent-grid">
                <div className="agent-card">
                  <AgentIcon agent="math_agent" size={32} />
                  <span>Math</span>
                </div>
                <div className="agent-card">
                  <AgentIcon agent="poem_agent" size={32} />
                  <span>Poem</span>
                </div>
                <div className="agent-card">
                  <AgentIcon agent="weather_agent" size={32} />
                  <span>Weather</span>
                </div>
                <div className="agent-card">
                  <AgentIcon agent="launch_vehicle_agent" size={32} />
                  <span>Rockets</span>
                </div>
                <div className="agent-card">
                  <AgentIcon agent="todoist_agent" size={32} />
                  <span>Tasks</span>
                </div>
              </div>
            </motion.div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                className={`message ${msg.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="message-avatar">
                  {msg.role === 'user' ? (
                    <UserAvatar username={user} size={32} />
                  ) : (
                    <div className="varix-avatar">
                      <VarixLogo size={20} />
                    </div>
                  )}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-sender">
                      {msg.role === 'user' ? user : msg.agent || 'VARIX'}
                    </span>
                  </div>
                  <p className="message-text">{msg.content}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {loading && (
          <motion.div
            className="message assistant"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-avatar">
              <div className="varix-avatar">
                <VarixLogo size={20} />
              </div>
            </div>
            <div className="message-content">
              <div className="loading-indicator">
                <FiLoader className="spinner" />
                <span>{agentStep || 'Processing your request...'}</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <div className="active-agent">
          <span className="active-agent-label">Agent:</span>
          <span className="active-agent-value">
            {selectedAgent && selectedAgent !== 'auto'
              ? selectedAgent.replace(/_/g, ' ')
              : 'Auto (Supervisor)'}
          </span>
        </div>
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              selectedAgent && selectedAgent !== 'auto'
                ? `Ask the ${selectedAgent.replace(/_/g, ' ')}... (Shift+Enter for new line)`
                : 'Ask me anything... (Shift+Enter for new line)'
            }
            disabled={loading}
            rows={1}
            className="message-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="send-btn"
          >
            <FiSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
