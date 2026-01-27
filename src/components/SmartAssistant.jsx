import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoSparklesSharp, IoCloseOutline, IoSendSharp } from 'react-icons/io5';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const SmartAssistant = ({ role = 'student' }) => {
  const { backendUrl } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = role === 'student'
        ? "Hello! I'm your Smart Learning Assistant. I can help you understand course concepts, guide your learning journey, and answer any questions about your studies. What would you like to explore today?"
        : "Hello! I'm your Smart Teaching Assistant. I can help you with course design, teaching strategies, student engagement, and platform best practices. How can I assist you today?";

      setMessages([
        {
          text: welcomeMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, role]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${backendUrl}/api/chat`, {
        message: input,
        role: role,
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Smart Assistant error:', error);
      const errorMessage = {
        text:
          error.response?.data?.error ||
          'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const themeColor = role === 'student' ? 'yellow' : 'purple';

  return (
    <>
      {/* Smart Assistant Modal */}
      {isOpen && (
        <>
          {/* Backdrop with Blur */}
          <div
            className="fixed inset-0 bg-white/40 backdrop-blur-md z-60 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl h-[85vh] max-h-175 bg-white rounded-3xl shadow-2xl flex flex-col z-70 border-4 border-gray-100">
            {/* Header */}
            <div
              className={`bg-linear-to-r ${
                role === 'student'
                  ? 'from-yellow-400 via-yellow-500 to-yellow-600'
                  : 'from-purple-400 via-purple-500 to-purple-600'
              } text-white p-5 rounded-t-3xl flex items-center justify-between shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/30 p-3 rounded-full backdrop-blur-sm">
                  <IoSparklesSharp className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-bold text-2xl tracking-tight">
                    Smart {role === 'student' ? 'Learning' : 'Teaching'} Assistant
                  </h2>
                  <p className="text-sm text-white/90 mt-1">
                    Powered by Gemini AI • Always here to help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2.5 rounded-full transition-all hover:rotate-90 duration-300"
                aria-label="Close assistant"
              >
                <IoCloseOutline className="w-7 h-7" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-linear-to-b from-gray-50 to-white">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-md ${
                      message.sender === 'user'
                        ? role === 'student'
                          ? 'bg-linear-to-br from-yellow-400 to-yellow-500 text-white rounded-br-md'
                          : 'bg-linear-to-br from-purple-400 to-purple-500 text-white rounded-br-md'
                        : message.isError
                        ? 'bg-red-50 text-red-700 border-2 border-red-200 rounded-bl-md'
                        : 'bg-white text-gray-800 border-2 border-gray-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-2.5 ${
                        message.sender === 'user'
                          ? 'text-white/80'
                          : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-5 py-4 shadow-md border-2 border-gray-100">
                    <div className="flex gap-2">
                      <div
                        className={`w-2.5 h-2.5 ${
                          role === 'student' ? 'bg-yellow-500' : 'bg-purple-500'
                        } rounded-full animate-bounce`}
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className={`w-2.5 h-2.5 ${
                          role === 'student' ? 'bg-yellow-500' : 'bg-purple-500'
                        } rounded-full animate-bounce`}
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className={`w-2.5 h-2.5 ${
                          role === 'student' ? 'bg-yellow-500' : 'bg-purple-500'
                        } rounded-full animate-bounce`}
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t-2 border-gray-100 rounded-b-3xl">
              <div className="flex gap-3 items-end">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything... "
                  disabled={isLoading}
                  rows={1}
                  className={`flex-1 px-4 py-3 border-2 ${
                    role === 'student'
                      ? 'border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500'
                      : 'border-purple-300 focus:border-purple-500 focus:ring-purple-500'
                  } rounded-xl focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm resize-none overflow-hidden transition-all`}
                  style={{ minHeight: '48px', maxHeight: '150px' }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height =
                      Math.min(e.target.scrollHeight, 150) + 'px';
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`${
                    role === 'student'
                      ? 'bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
                      : 'bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                  } text-white p-3.5 rounded-xl transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg shrink-0 hover:scale-105`}
                  aria-label="Send message"
                >
                  <IoSendSharp className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center font-medium">
                🤖 AI-powered responses • May not always be 100% accurate
              </p>
            </div>
          </div>
        </>
      )}

      {/* Trigger - Returns just the opener function */}
      <button
        onClick={() => setIsOpen(true)}
        className="contents"
      >
        <IoSparklesSharp className="w-6 h-6" />
      </button>
    </>
  );
};

export default SmartAssistant;
