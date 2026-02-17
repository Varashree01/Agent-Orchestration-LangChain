import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPlus, FiTrash2, FiMoon, FiSun, FiLogOut, FiEdit2 } from 'react-icons/fi';
import LoginPage from './components/LoginPage';
import ChatInterface from './components/ChatInterface';
import { VarixLogo, AgentIcon } from './components/Logos';
import { conversationStorage } from './utils/conversationStorage';
import { useTheme } from './ThemeProvider';
import './App.css';

export default function App() {
  const { isDark, setIsDark } = useTheme();
  const [user, setUser] = useState(() => {
    return localStorage.getItem('varix_user') || null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('auto');

  const agents = [
    { id: 'auto', label: 'Auto (Supervisor)' },
    { id: 'math_agent', label: 'Math' },
    { id: 'poem_agent', label: 'Poem' },
    { id: 'weather_agent', label: 'Weather' },
    { id: 'launch_vehicle_agent', label: 'Rockets' },
    { id: 'todoist_agent', label: 'Tasks' },
  ];

  // Load conversations when user logs in
  useEffect(() => {
    if (user) {
      const userConversations = conversationStorage.getConversations(user);
      setConversations(userConversations);
      if (userConversations.length === 0) {
        // Create first conversation
        const newConv = conversationStorage.createConversation(user);
        setConversations([newConv]);
        setActiveConversation(newConv.id);
      } else {
        setActiveConversation(userConversations[0].id);
      }
    }
  }, [user]);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('varix_user', username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('varix_user');
    setActiveConversation(null);
    setConversations([]);
  };

  const handleNewConversation = () => {
    const newConv = conversationStorage.createConversation(user);
    setConversations([newConv, ...conversations]);
    setActiveConversation(newConv.id);
  };

  const handleDeleteConversation = (e, convId) => {
    e.stopPropagation();
    conversationStorage.deleteConversation(user, convId);
    setConversations(conversations.filter(c => c.id !== convId));
    if (activeConversation === convId) {
      setActiveConversation(conversations.find(c => c.id !== convId)?.id || null);
    }
  };

  const handleRenameConversation = (convId, newTitle) => {
    conversationStorage.renameConversation(user, convId, newTitle);
    setConversations(conversations.map(c => 
      c.id === convId ? { ...c, title: newTitle } : c
    ));
    setEditingId(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container ${isDark ? 'dark' : 'light'} ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            className="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="sidebar-header">
              <div className="sidebar-logo">
                <VarixLogo size={28} />
                <h1>VARIX</h1>
              </div>
              <button
                className="icon-btn sidebar-close"
                onClick={() => setSidebarOpen(false)}
              >
                <FiX size={20} />
              </button>
            </div>

            <button className="new-chat-btn" onClick={handleNewConversation}>
              <FiPlus size={18} />
              New Chat
            </button>

            <div className="agents-section">
              <p className="list-label">Agents</p>
              <div className="agents-list">
                {agents.map((agent) => (
                  <button
                    key={agent.id}
                    className={`agent-item ${selectedAgent === agent.id ? 'active' : ''}`}
                    onClick={() => setSelectedAgent(agent.id)}
                    type="button"
                  >
                    {agent.id === 'auto' ? (
                      <span className="agent-auto">AUTO</span>
                    ) : (
                      <AgentIcon agent={agent.id} size={18} />
                    )}
                    <span>{agent.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="conversations-list">
              <p className="list-label">Conversations</p>
              <AnimatePresence>
                {conversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`conversation-item ${activeConversation === conv.id ? 'active' : ''}`}
                    onClick={() => setActiveConversation(conv.id)}
                  >
                    {editingId === conv.id ? (
                      <input
                        type="text"
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={() => handleRenameConversation(conv.id, editTitle)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleRenameConversation(conv.id, editTitle);
                          }
                        }}
                        className="edit-input"
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <>
                        <span className="conv-title">{conv.title}</span>
                        <div className="conv-actions">
                          <button
                            className="icon-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingId(conv.id);
                              setEditTitle(conv.title);
                            }}
                          >
                            <FiEdit2 size={14} />
                          </button>
                          <button
                            className="icon-btn delete"
                            onClick={(e) => handleDeleteConversation(e, conv.id)}
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="sidebar-footer">
              <div className="user-info">
                <div className="user-avatar">
                  {user.charAt(0).toUpperCase()}
                </div>
                <span>{user}</span>
              </div>
              <button className="icon-btn" onClick={() => setIsDark(!isDark)}>
                {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
              </button>
              <button className="icon-btn logout" onClick={handleLogout}>
                <FiLogOut size={18} />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="main-content">
        <div className="header-bar">
          {!sidebarOpen && (
            <button
              className="icon-btn menu-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          )}
          <div className="header-title">
            <VarixLogo size={24} />
            <h1>VARIX Intelligence</h1>
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => setIsDark(!isDark)}>
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          </div>
        </div>

        <div className="chat-container">
          {activeConversation && (
            <ChatInterface
              user={user}
              conversationId={activeConversation}
              selectedAgent={selectedAgent}
              onMessageAdded={(message) => {
                const updatedConv = conversationStorage.addMessage(user, activeConversation, message);
                setConversations(conversations.map(c => 
                  c.id === activeConversation ? updatedConv : c
                ));
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}


