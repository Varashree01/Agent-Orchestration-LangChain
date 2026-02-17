// Store and retrieve conversations from localStorage

const STORAGE_KEY = 'varix_conversations';

export const conversationStorage = {
  // Get all conversations for a user
  getConversations: (userId) => {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return allConversations[userId] || [];
  },

  // Get a specific conversation
  getConversation: (userId, conversationId) => {
    const conversations = conversationStorage.getConversations(userId);
    return conversations.find(c => c.id === conversationId);
  },

  // Create new conversation
  createConversation: (userId, title = 'New Conversation') => {
    const id = Date.now().toString();
    const conversation = {
      id,
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!allConversations[userId]) {
      allConversations[userId] = [];
    }

    allConversations[userId].unshift(conversation);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));

    return conversation;
  },

  // Add message to conversation
  addMessage: (userId, conversationId, message) => {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const conversations = allConversations[userId] || [];
    const conversation = conversations.find(c => c.id === conversationId);

    if (conversation) {
      conversation.messages.push({
        ...message,
        timestamp: new Date().toISOString(),
      });
      conversation.updatedAt = new Date().toISOString();
      
      // Update title based on first message
      if (conversation.messages.length === 1 && message.role === 'user') {
        conversation.title = message.content.substring(0, 50);
      }

      allConversations[userId] = conversations;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
    }

    return conversation;
  },

  // Delete conversation
  deleteConversation: (userId, conversationId) => {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allConversations[userId] = (allConversations[userId] || []).filter(c => c.id !== conversationId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
  },

  // Rename conversation
  renameConversation: (userId, conversationId, newTitle) => {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const conversation = (allConversations[userId] || []).find(c => c.id === conversationId);
    if (conversation) {
      conversation.title = newTitle;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
    }
    return conversation;
  },

  // Clear all conversations for a user
  clearAll: (userId) => {
    const allConversations = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    allConversations[userId] = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allConversations));
  },
};
