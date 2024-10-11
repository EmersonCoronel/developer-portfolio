import React, { useState, useEffect, useRef } from "react";
import Header from "../components/general/Header";
import { figures, Figure, changePrimaryColor } from "../components/figures";

interface Message {
  role: string;
  content: string;
}

const Aristotle: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<Figure>(figures.find((f) => f.name === "Aristotle") || figures[0]);
  const [mode, setMode] = useState<string>("normal");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
  console.log("Using api url: ", API_URL)

  useEffect(() => {
    if (selectedFigure) {
      changePrimaryColor(selectedFigure);
      setMessages([]);
    }
  }, [selectedFigure]);

  // Function to start a dialogue based on mode and topic
  const startDialogue = async (selectedMode: string, topic: string) => {
    // Clear previous messages and set the selected mode and topic
    setMessages([]);
    setMode(selectedMode);
    setSelectedTopic(topic);

    try {
      const response = await fetch(`${API_URL}/start-dialogue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          figure: selectedFigure.name,
          mode: selectedMode,
          topic,
        }),
      });

      if (!response.body) {
        throw new Error('ReadableStream not yet supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let assistantMessage = '';
      let done = false;

      // Add an initial assistant message to update incrementally
      setMessages([{ role: 'assistant', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((line) => line.trim() !== '');
          for (const line of lines) {
            const messagePart = line.replace(/^data: /, '');
            if (messagePart === '[DONE]') {
              done = true;
              break;
            }
            try {
              const content = JSON.parse(messagePart);
              assistantMessage += content;

              setMessages((prevMessages) => {
                const lastMessageIndex = prevMessages.length - 1;
                const updatedMessages = [...prevMessages];
                const lastMessage = updatedMessages[lastMessageIndex];
                if (lastMessage.role === 'assistant') {
                  updatedMessages[lastMessageIndex] = {
                    ...lastMessage,
                    content: assistantMessage,
                  };
                  return updatedMessages;
                } else {
                  return prevMessages;
                }
              });
            } catch (e) {
              console.error('Error parsing message part:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error starting dialogue:", error);
    }
  };

  // Function to start Scenario-Based Advice
  const startScenarioAdvice = () => {
    // Clear previous messages and set mode
    setMessages([]);
    setMode("scenario");

    // Add the initial message
    setMessages([
      {
        role: "assistant",
        content: `Please describe your situation or question, and I will offer advice based on my expertise.`,
      },
    ]);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          messages: newMessages,
          mode,
          selectedFigure: selectedFigure.name,
          selectedTopic,
        }),
      });

      if (!response.body) {
        throw new Error('ReadableStream not yet supported in this browser.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let assistantMessage = '';
      let done = false;

      // Add an initial assistant message to update incrementally
      setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter((line) => line.trim() !== '');
          for (const line of lines) {
            const messagePart = line.replace(/^data: /, '');
            if (messagePart === '[DONE]') {
              done = true;
              break;
            }
            try {
              const content = JSON.parse(messagePart);
              assistantMessage += content;

              setMessages((prevMessages) => {
                const lastMessageIndex = prevMessages.length - 1;
                const updatedMessages = [...prevMessages];
                const lastMessage = updatedMessages[lastMessageIndex];
                if (lastMessage.role === 'assistant') {
                  updatedMessages[lastMessageIndex] = {
                    ...lastMessage,
                    content: assistantMessage,
                  };
                  return updatedMessages;
                } else {
                  return prevMessages;
                }
              });
            } catch (e) {
              console.error('Error parsing message part:', e);
            }
          }
        }
      }
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

  // Function to attach action handlers to options
  const attachActionsToOptions = (figure: Figure) => {
    return figure.categories.map((category) => ({
      ...category,
      options: category.options.map((option) => ({
        ...option,
        action: () => {
          const mode = getModeForOption(figure.name, category.name);
          startDialogue(mode, option.label);
        },
      })),
    }));
  };

  // Function to determine the mode based on figure and category
  const getModeForOption = (figureName: string, categoryName: string): string => {
    // Define modes based on figure and category
    const modeMapping: { [key: string]: { [key: string]: string } } = {
      Aristotle: {
        "Socratic Dialogues": "socratic",
        "Philosophical Teachings": "teaching",
      },
      "Albert Einstein": {
        "Thought Experiments": "thought_experiment",
        "Physics Lessons": "lesson",
      },
      "Leonardo da Vinci": {
        "Creative Brainstorming": "brainstorm",
        "Art Lessons": "lesson",
      },
      "Napoleon Bonaparte": {
        "Military Simulations": "simulation",
        "Leadership Lessons": "lesson",
      },
      Cleopatra: {
        "Role-Playing Diplomacy": "role_play",
        "History Lessons": "lesson",
      },
      Confucius: {
        "Philosophical Discussions": "discussion",
        "Teachings": "lesson",
      },
    };

    return modeMapping[figureName]?.[categoryName] || "normal";
  };

  // Get the categories with actions attached
  const categoriesWithActions = attachActionsToOptions(selectedFigure);

  return (
    <div>
      <div
        id="image-display"
        style={{
          backgroundImage: `url(${selectedFigure.image})`,
        }}
      />
      <Header />
      <div className="chat-container">
        {/* Dropdown Menu for Mobile */}
        <div className="dropdown-container">
          <button className="dropdown-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {selectedFigure.name}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {/* Figure Selection */}
              <h3>Select Figure</h3>
              <select
                value={selectedFigure.name}
                onChange={(e) => setSelectedFigure(figures.find((f) => f.name === e.target.value) || figures[0])}
                style={{ whiteSpace: "normal" }}
              >
                {figures.map((figure) => (
                  <option key={figure.name} value={figure.name}>
                    {figure.name}
                  </option>
                ))}
              </select>

              {/* Figure-specific options */}
              {categoriesWithActions.map((category, catIndex) => (
                <div key={catIndex}>
                  <h3>{category.name}</h3>
                  <ul>
                    {category.options.map((option, optIndex) => (
                      <li key={optIndex}>
                        <button onClick={option.action}>{option.label}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Scenario-Based Advice */}
              <h3>Scenario-Based Advice</h3>
              <button onClick={startScenarioAdvice}>Start Scenario Advice</button>
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
          <h3>Select Figure</h3>
          <select
            value={selectedFigure.name}
            onChange={(e) => setSelectedFigure(figures.find((f) => f.name === e.target.value) || figures[0])}
            style={{ whiteSpace: "normal" }}
          >
            {figures.map((figure) => (
              <option key={figure.name} value={figure.name}>
                {figure.name}
              </option>
            ))}
          </select>

          {categoriesWithActions.map((category, catIndex) => (
            <div key={catIndex}>
              <h3>{category.name}</h3>
              <ul>
                {category.options.map((option, optIndex) => (
                  <li key={optIndex}>
                    <button onClick={option.action}>{option.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <h3>Scenario-Based Advice</h3>
          <button onClick={startScenarioAdvice}>Start Scenario Advice</button>
        </div>
      </div>
    </div>
  );
};

export default Aristotle;
