import React, { useState, useEffect, useRef } from "react";
import Header from "../components/general/Header";
import axios from "axios";

const Aristotle: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [mode, setMode] = useState<string>("normal"); // New state to track the mode
  const [selectedPhilosopher, setSelectedPhilosopher] =
    useState<string>("Aristotle"); // For Philosophy Battle
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.REACT_APP_API_URL;

  // Existing topics for Socratic Dialogues
  const topics = ["Virtue", "Justice", "Happiness", "Courage", "Friendship"];

  // New topics for Contextual and Thematic Conversations
  const thematicTopics = ["Ethics", "Logic", "Politics", "Metaphysics"];

  // List of philosophers for Philosophy Battle
  const philosophers = ["Aristotle", "Plato", "Socrates", "Descartes", "Kant"];

  // Function to start a Socratic Dialogue
  const startSocraticDialogue = async (topic: string) => {
    // Clear previous messages and set the selected topic and mode
    setMessages([]);
    setSelectedTopic(topic);
    setMode("socratic");

    try {
      const res = await axios.post(`${API_URL}/start-dialogue`, { topic });
      const aiResponse = res.data.response;

      // Add Aristotle's initial message to the chat
      setMessages([{ role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error starting Socratic Dialogue:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to start a Thematic Conversation
  const startThematicConversation = async (topic: string) => {
    // Clear previous messages and set the selected topic and mode
    setMessages([]);
    setSelectedTopic(topic);
    setMode("thematic");

    try {
      const res = await axios.post(`${API_URL}/start-thematic`, { topic });
      const aiResponse = res.data.response;

      // Add Aristotle's initial message to the chat
      setMessages([{ role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error starting Thematic Conversation:", error);
    }
  };

  // Function to start a Philosophy Battle
  const startPhilosophyBattle = async (philosopher: string) => {
    // Clear previous messages and set the selected philosopher and mode
    setMessages([]);
    setSelectedPhilosopher(philosopher);
    setMode("battle");

    try {
      const res = await axios.post(`${API_URL}/start-battle`, { philosopher });
      const aiResponse = res.data.response;

      // Add the philosopher's initial message to the chat
      setMessages([{ role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("Error starting Philosophy Battle:", error);
    }
  };

  // Function to start Scenario-Based Advice
  const startScenarioAdvice = () => {
    // Clear previous messages and set mode
    setMessages([]);
    setMode("scenario");

    // You can optionally send an initial message from Aristotle
    setMessages([
      {
        role: "assistant",
        content:
          "Please describe your moral dilemma or life question, and I will offer advice based on my philosophical teachings.",
      },
    ]);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message,
        messages: newMessages,
        mode,
        selectedTopic,
        selectedPhilosopher,
      });
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
        {/* Dropdown Menu for Mobile */}
        <div className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            Select Mode
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <h3>Socratic Dialogues</h3>
              <ul>
                {topics.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => {
                        startSocraticDialogue(topic);
                        toggleDropdown();
                      }}
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
              <h3>Thematic Conversations</h3>
              <ul>
                {thematicTopics.map((topic) => (
                  <li key={topic}>
                    <button
                      onClick={() => {
                        startThematicConversation(topic);
                        toggleDropdown();
                      }}
                    >
                      {topic}
                    </button>
                  </li>
                ))}
              </ul>
              <h3>Philosophy Battle</h3>
              <ul>
                {philosophers.map((philosopher) => (
                  <li key={philosopher}>
                    <button
                      onClick={() => {
                        startPhilosophyBattle(philosopher);
                        toggleDropdown();
                      }}
                    >
                      {philosopher}
                    </button>
                  </li>
                ))}
              </ul>
              <h3>Scenario-Based Advice</h3>
              <button
                onClick={() => {
                  startScenarioAdvice();
                  toggleDropdown();
                }}
              >
                Start Scenario Advice
              </button>
            </div>
          )}
        </div>
        <div className="chat-box">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              rows={3}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Socratic Dialogues</h3>
          <ul>
            {topics.map((topic) => (
              <li key={topic}>
                <button onClick={() => startSocraticDialogue(topic)}>
                  {topic}
                </button>
              </li>
            ))}
          </ul>
          <h3>Thematic Conversations</h3>
          <ul>
            {thematicTopics.map((topic) => (
              <li key={topic}>
                <button onClick={() => startThematicConversation(topic)}>
                  {topic}
                </button>
              </li>
            ))}
          </ul>
          <h3>Philosophy Battle</h3>
          <ul>
            {philosophers.map((philosopher) => (
              <li key={philosopher}>
                <button onClick={() => startPhilosophyBattle(philosopher)}>
                  {philosopher}
                </button>
              </li>
            ))}
          </ul>
          <h3>Scenario-Based Advice</h3>
          <button onClick={startScenarioAdvice}>Start Scenario Advice</button>
        </div>
      </div>
    </div>
  );
};

export default Aristotle;
