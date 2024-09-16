import React, { useState, useEffect, useRef } from "react";
import Header from "../components/general/Header";
import axios from "axios";

const EtzAI: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const res = await axios.post(
        "https://etz-ai-d44ad13dc91b.herokuapp.com/api/chat",
        { message },
      );
      const aiResponse = res.data.response;
      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      <Header />
      <div className="chat-container">
        <div className="chat-box">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="input-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message EtzAi"
            rows={3}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default EtzAI;
