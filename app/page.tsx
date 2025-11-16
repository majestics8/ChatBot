"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [response, messages]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    // Add user message to history
    const userMessageObj: Message = {
      id: Date.now().toString(),
      content: userMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessageObj]);

    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.text();
      setResponse(data);
      
      // Add bot response to history
      const botMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        content: data,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessageObj]);
      
      setUserMessage("");
    } catch (error) {
      setResponse("Sorry, I'm having trouble responding right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header */}
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.125rem'
            }}>K</span>
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Kuldeep Assistant
          </h1>
        </div>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>How can I help you today?</p>
      </div>

      {/* Chat Container */}
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}>
        {/* Chat Messages Area */}
        <div style={{
          height: '24rem',
          overflowY: 'auto',
          padding: '1rem',
          background: '#f9fafb'
        }}>
          {/* Display all messages from history */}
          {messages.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((message) => (
                <div key={message.id} style={{ 
                  display: 'flex', 
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start' 
                }}>
                  <div style={{
                    background: message.isUser ? '#2563eb' : 'white',
                    color: message.isUser ? 'white' : '#1f2937',
                    border: message.isUser ? 'none' : '1px solid #e5e7eb',
                    borderRadius: '1rem',
                    borderBottomRightRadius: message.isUser ? '0' : '1rem',
                    borderBottomLeftRadius: message.isUser ? '1rem' : '0',
                    padding: '0.75rem 1rem',
                    maxWidth: '20rem',
                    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
                  }}>
                    {!message.isUser && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{
                          width: '1.5rem',
                          height: '1.5rem',
                          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <span style={{
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>K</span>
                        </div>
                        <strong style={{
                          color: '#374151',
                          fontSize: '0.875rem'
                        }}>Kuldeep</strong>
                      </div>
                    )}
                    <div style={{ fontSize: '0.875rem' }}>
                      {message.isUser ? (
                        message.content
                      ) : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '1rem',
                borderBottomLeftRadius: '0',
                padding: '0.75rem 1rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    <div style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite'
                    }}></div>
                    <div style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite',
                      animationDelay: '0.1s'
                    }}></div>
                    <div style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      backgroundColor: '#9ca3af',
                      borderRadius: '50%',
                      animation: 'bounce 1s infinite',
                      animationDelay: '0.2s'
                    }}></div>
                  </div>
                  <span style={{
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {messages.length === 0 && !isLoading && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <div style={{ textAlign: 'center', color: '#6b7280' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  background: 'linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 0.75rem auto'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>💬</span>
                </div>
                <p style={{ fontSize: '0.875rem' }}>Send a message to start the conversation</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          padding: '1rem',
          background: 'white'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <textarea
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.75rem',
                  resize: 'none',
                  paddingRight: '3rem',
                  outline: 'none'
                }}
                rows={2}
                placeholder="Type your message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !userMessage.trim()}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  bottom: '0.5rem',
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: isLoading || !userMessage.trim() ? 'not-allowed' : 'pointer',
                  opacity: isLoading || !userMessage.trim() ? 0.5 : 1
                }}
              >
                <svg 
                  style={{ width: '1.25rem', height: '1.25rem' }} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Helper Text */}
          <div style={{
            fontSize: '0.75rem',
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '0.5rem'
          }}>
            Press Enter to send • Shift+Enter for new line
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '1.5rem',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: '0.875rem'
      }}>
        <p>Powered by Kuldeep Assistant • Professional AI Chat</p>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}