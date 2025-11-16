// "use client";

// import { useState, useRef, useEffect } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// interface Message {
//   id: string;
//   content: string;
//   isUser: boolean;
//   timestamp: Date;
// }

// export default function Home() {
//   const [userMessage, setUserMessage] = useState("");
//   const [response, setResponse] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [response, messages]);

//   const handleSend = async () => {
//     if (!userMessage.trim()) return;

//     // Add user message to history
//     const userMessageObj: Message = {
//       id: Date.now().toString(),
//       content: userMessage,
//       isUser: true,
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, userMessageObj]);

//     setIsLoading(true);
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userMessage }),
//       });

//       const data = await res.text();
//       setResponse(data);
      
//       // Add bot response to history
//       const botMessageObj: Message = {
//         id: (Date.now() + 1).toString(),
//         content: data,
//         isUser: false,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, botMessageObj]);
      
//       setUserMessage("");
//     } catch (error) {
//       setResponse("Sorry, I'm having trouble responding right now. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #eff6ff 0%, #f3e8ff 100%)',
//       padding: '1rem',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center'
//     }}>
//       {/* Header */}
//       <div style={{
//         width: '100%',
//         maxWidth: '42rem',
//         marginBottom: '1.5rem',
//         textAlign: 'center'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           gap: '0.75rem',
//           marginBottom: '0.5rem'
//         }}>
//           <div style={{
//             width: '3rem',
//             height: '3rem',
//             background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
//           }}>
//             <span style={{
//               color: 'white',
//               fontWeight: 'bold',
//               fontSize: '1.125rem'
//             }}>K</span>
//           </div>
//           <h1 style={{
//             fontSize: '1.875rem',
//             fontWeight: 'bold',
//             background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text'
//           }}>
//             Kuldeep Assistant
//           </h1>
//         </div>
//         <p style={{
//           color: '#6b7280',
//           fontSize: '0.875rem'
//         }}>How can I help you today?</p>
//       </div>

//       {/* Chat Container */}
//       <div style={{
//         width: '100%',
//         maxWidth: '42rem',
//         background: 'white',
//         borderRadius: '1rem',
//         boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
//         overflow: 'hidden',
//         border: '1px solid #e5e7eb'
//       }}>
//         {/* Chat Messages Area */}
//         <div style={{
//           height: '24rem',
//           overflowY: 'auto',
//           padding: '1rem',
//           background: '#f9fafb'
//         }}>
//           {/* Display all messages from history */}
//           {messages.length > 0 && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//               {messages.map((message) => (
//                 <div key={message.id} style={{ 
//                   display: 'flex', 
//                   justifyContent: message.isUser ? 'flex-end' : 'flex-start' 
//                 }}>
//                   <div style={{
//                     background: message.isUser ? '#2563eb' : 'white',
//                     color: message.isUser ? 'white' : '#1f2937',
//                     border: message.isUser ? 'none' : '1px solid #e5e7eb',
//                     borderRadius: '1rem',
//                     borderBottomRightRadius: message.isUser ? '0' : '1rem',
//                     borderBottomLeftRadius: message.isUser ? '1rem' : '0',
//                     padding: '0.75rem 1rem',
//                     maxWidth: '20rem',
//                     boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
//                   }}>
//                     {!message.isUser && (
//                       <div style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '0.5rem',
//                         marginBottom: '0.5rem'
//                       }}>
//                         <div style={{
//                           width: '1.5rem',
//                           height: '1.5rem',
//                           background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
//                           borderRadius: '50%',
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center'
//                         }}>
//                           <span style={{
//                             color: 'white',
//                             fontSize: '0.75rem',
//                             fontWeight: 'bold'
//                           }}>K</span>
//                         </div>
//                         <strong style={{
//                           color: '#374151',
//                           fontSize: '0.875rem'
//                         }}>Kuldeep</strong>
//                       </div>
//                     )}
//                     <div style={{ fontSize: '0.875rem' }}>
//                       {message.isUser ? (
//                         message.content
//                       ) : (
//                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                           {message.content}
//                         </ReactMarkdown>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {isLoading && (
//             <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
//               <div style={{
//                 background: 'white',
//                 border: '1px solid #e5e7eb',
//                 borderRadius: '1rem',
//                 borderBottomLeftRadius: '0',
//                 padding: '0.75rem 1rem',
//                 boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
//               }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//                   <div style={{ display: 'flex', gap: '0.25rem' }}>
//                     <div style={{
//                       width: '0.5rem',
//                       height: '0.5rem',
//                       backgroundColor: '#9ca3af',
//                       borderRadius: '50%',
//                       animation: 'bounce 1s infinite'
//                     }}></div>
//                     <div style={{
//                       width: '0.5rem',
//                       height: '0.5rem',
//                       backgroundColor: '#9ca3af',
//                       borderRadius: '50%',
//                       animation: 'bounce 1s infinite',
//                       animationDelay: '0.1s'
//                     }}></div>
//                     <div style={{
//                       width: '0.5rem',
//                       height: '0.5rem',
//                       backgroundColor: '#9ca3af',
//                       borderRadius: '50%',
//                       animation: 'bounce 1s infinite',
//                       animationDelay: '0.2s'
//                     }}></div>
//                   </div>
//                   <span style={{
//                     color: '#6b7280',
//                     fontSize: '0.875rem'
//                   }}>Thinking...</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           {messages.length === 0 && !isLoading && (
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: '100%'
//             }}>
//               <div style={{ textAlign: 'center', color: '#6b7280' }}>
//                 <div style={{
//                   width: '4rem',
//                   height: '4rem',
//                   background: 'linear-gradient(135deg, #dbeafe 0%, #f3e8ff 100%)',
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   margin: '0 auto 0.75rem auto'
//                 }}>
//                   <span style={{ fontSize: '1.5rem' }}>💬</span>
//                 </div>
//                 <p style={{ fontSize: '0.875rem' }}>Send a message to start the conversation</p>
//               </div>
//             </div>
//           )}
          
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input Area */}
//         <div style={{
//           borderTop: '1px solid #e5e7eb',
//           padding: '1rem',
//           background: 'white'
//         }}>
//           <div style={{ display: 'flex', gap: '0.5rem' }}>
//             <div style={{ flex: 1, position: 'relative' }}>
//               <textarea
//                 style={{
//                   width: '100%',
//                   padding: '0.75rem',
//                   border: '1px solid #d1d5db',
//                   borderRadius: '0.75rem',
//                   resize: 'none',
//                   paddingRight: '3rem',
//                   outline: 'none'
//                 }}
//                 rows={2}
//                 placeholder="Type your message..."
//                 value={userMessage}
//                 onChange={(e) => setUserMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={isLoading}
//               />
//               <button
//                 onClick={handleSend}
//                 disabled={isLoading || !userMessage.trim()}
//                 style={{
//                   position: 'absolute',
//                   right: '0.5rem',
//                   bottom: '0.5rem',
//                   background: '#2563eb',
//                   color: 'white',
//                   padding: '0.5rem',
//                   borderRadius: '0.5rem',
//                   border: 'none',
//                   cursor: isLoading || !userMessage.trim() ? 'not-allowed' : 'pointer',
//                   opacity: isLoading || !userMessage.trim() ? 0.5 : 1
//                 }}
//               >
//                 <svg 
//                   style={{ width: '1.25rem', height: '1.25rem' }} 
//                   fill="none" 
//                   stroke="currentColor" 
//                   viewBox="0 0 24 24"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" 
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
          
//           {/* Helper Text */}
//           <div style={{
//             fontSize: '0.75rem',
//             color: '#6b7280',
//             textAlign: 'center',
//             marginTop: '0.5rem'
//           }}>
//             Press Enter to send • Shift+Enter for new line
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={{
//         marginTop: '1.5rem',
//         textAlign: 'center',
//         color: '#6b7280',
//         fontSize: '0.875rem'
//       }}>
//         <p>Powered by Kuldeep Assistant • Professional AI Chat</p>
//       </div>

//       {/* Add CSS for animations */}
//       <style jsx>{`
//         @keyframes bounce {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-5px); }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string; // ISO
};

export default function Home() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState<"friendly" | "professional" | "casual">("friendly");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessageToServer = async (text: string) => {
    // Build history for server (role: user|assistant)
    const history = messages.map((m) => ({
      role: m.isUser ? "user" : "assistant",
      content: m.content,
    }));

    const controller = new AbortController();
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history, tone }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `Server responded ${res.status}`);
    }

    // Read response stream progressively
    const reader = res.body?.getReader();
    if (!reader) {
      // fallback: text response
      const txt = await res.text();
      return txt;
    }

    const decoder = new TextDecoder();
    let done = false;
    let accumulated = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = !!doneReading;
      if (value) {
        const chunk = decoder.decode(value);
        accumulated += chunk;
        // update last bot message progressively
        setMessages((prev) => {
          // If last message is bot draft, replace it; else append new bot draft
          const last = prev[prev.length - 1];
          if (last && !last.isUser) {
            return [...prev.slice(0, prev.length - 1), { ...last, content: accumulated }];
          } else {
            const botMsg: Message = {
              id: Date.now().toString(),
              content: accumulated,
              isUser: false,
              timestamp: new Date().toISOString(),
            };
            return [...prev, botMsg];
          }
        });
      }
    }

    return accumulated;
  };

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    // append user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: userMessage,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setUserMessage("");
    setIsLoading(true);

    try {
      await sendMessageToServer(userMsg.content);
    } catch (err) {
      // append error message as assistant reply
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry — I couldn't reach the server. Please try again later.",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
      console.error(err);
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
      minHeight: "100vh", 
      padding: "24px", 
      display: "flex", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{ 
        width: "100%", 
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        maxHeight: "900px"
      }}>
        {/* header + tone selector */}
        <div style={{ 
          marginBottom: "24px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "20px 24px",
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #e1e5e9"
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: "28px", 
              fontWeight: "700", 
              color: "#1a365d",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Customer Support Assistant
            </h1>
            <p style={{ 
              margin: "4px 0 0 0", 
              fontSize: "14px", 
              color: "#64748b",
              fontWeight: "500"
            }}>
              How can I help you today?
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ 
              fontSize: "14px", 
              color: "#475569", 
              fontWeight: "600" 
            }}>
              Tone:
            </span>
            <select 
              value={tone} 
              onChange={(e) => setTone(e.target.value as any)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                background: "white",
                fontSize: "14px",
                fontWeight: "500",
                color: "#374151",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="friendly">Friendly</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
            </select>
          </div>
        </div>

        {/* chat box */}
        <div style={{ 
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px", 
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", 
          overflow: "hidden",
          background: "white",
          border: "1px solid #e1e5e9"
        }}>
          <div style={{ 
            flex: 1,
            overflowY: "auto", 
            padding: "24px", 
            background: "#fafbfc"
          }}>
            {messages.length === 0 && !isLoading && (
              <div style={{ 
                display: "flex", 
                flexDirection: "column",
                alignItems: "center", 
                justifyContent: "center",
                height: "100%",
                color: "#64748b",
                textAlign: "center"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  color: "white",
                  fontSize: "32px"
                }}>
                  💬
                </div>
                <h3 style={{ 
                  margin: "0 0 8px 0", 
                  fontSize: "20px", 
                  fontWeight: "600",
                  color: "#1e293b"
                }}>
                  Welcome to Customer Support
                </h3>
                <p style={{ 
                  margin: 0, 
                  fontSize: "14px",
                  maxWidth: "400px",
                  lineHeight: "1.5"
                }}>
                  I'm here to help you with any questions or issues you might have. Send me a message to get started.
                </p>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {messages.map((m) => (
                <div key={m.id} style={{ 
                  display: "flex", 
                  justifyContent: m.isUser ? "flex-end" : "flex-start",
                  alignItems: "flex-start",
                  gap: "8px"
                }}>
                  {!m.isUser && (
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "white",
                      fontWeight: "600",
                      flexShrink: 0
                    }}>
                      AI
                    </div>
                  )}
                  <div
                    style={{
                      background: m.isUser ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)" : "#ffffff",
                      color: m.isUser ? "#fff" : "#1f2937",
                      padding: "16px 20px",
                      borderRadius: "18px",
                      maxWidth: "75%",
                      border: m.isUser ? "none" : "1px solid #e5e7eb",
                      boxShadow: m.isUser ? "0 2px 8px rgba(59, 130, 246, 0.3)" : "0 2px 8px rgba(0,0,0,0.04)",
                      lineHeight: "1.5",
                      position: "relative"
                    }}
                  >
                    {!m.isUser ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                    ) : (
                      <div style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
                    )}
                  </div>
                  {m.isUser && (
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      color: "white",
                      fontWeight: "600",
                      flexShrink: 0
                    }}>
                      You
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", gap: "8px" }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    color: "white",
                    fontWeight: "600",
                    flexShrink: 0
                  }}>
                    AI
                  </div>
                  <div style={{ 
                    background: "#fff", 
                    padding: "16px 20px", 
                    borderRadius: "18px", 
                    border: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#64748b",
                    fontWeight: "500"
                  }}>
                    <div style={{
                      display: "flex",
                      gap: "4px"
                    }}>
                      <div style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#94a3b8",
                        animation: "bounce 1.4s infinite ease-in-out both"
                      }}></div>
                      <div style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#94a3b8",
                        animation: "bounce 1.4s infinite ease-in-out both 0.2s"
                      }}></div>
                      <div style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#94a3b8",
                        animation: "bounce 1.4s infinite ease-in-out both 0.4s"
                      }}></div>
                    </div>
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div ref={messagesEndRef} />
          </div>

          {/* input area */}
          <div style={{ 
            display: "flex", 
            gap: "12px", 
            padding: "20px", 
            borderTop: "1px solid #e5e7eb",
            background: "white"
          }}>
            <textarea
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message here..."
              rows={2}
              style={{ 
                flex: 1, 
                padding: "16px", 
                borderRadius: "12px",
                border: "1px solid #d1d5db",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "none",
                outline: "none",
                transition: "all 0.2s ease",
                lineHeight: "1.5"
              }}
              disabled={isLoading}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
                e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#d1d5db";
                e.target.style.boxShadow = "none";
              }}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !userMessage.trim()} 
              style={{ 
                padding: "16px 24px",
                borderRadius: "12px",
                border: "none",
                background: isLoading || !userMessage.trim() 
                  ? "#9ca3af" 
                  : "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isLoading || !userMessage.trim() ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
                opacity: isLoading || !userMessage.trim() ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoading && userMessage.trim()) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && userMessage.trim()) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.3)";
                }
              }}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    </div>
  );
}