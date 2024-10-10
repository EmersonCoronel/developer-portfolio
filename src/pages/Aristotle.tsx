import React, { useState, useEffect, useRef } from "react";
import Header from "../components/general/Header";
import axios from "axios";

interface Message {
  role: string;
  content: string;
}

interface Option {
  label: string;
  action: () => void;
}

interface Category {
  name: string;
  options: Option[];
}

interface Figure {
  name: string;
  categories: Category[];
}

const getBackgroundImage = (figure: string) => {
  switch (figure) {
    case "Aristotle":
      return "images/backgrounds/aristotle.jpg"; // Path to Aristotle background
    case "Albert Einstein":
      return "/images/backgrounds/einstein.jpg"; // Path to Einstein background
    case "Leonardo da Vinci":
      return "/images/backgrounds/davinci.jpeg"; // Path to da Vinci background
    case "Napoleon Bonaparte":
      return "/images/backgrounds/napoleon.jpg"; // Path to Napoleon background
    case "Cleopatra":
      return "/images/backgrounds/cleopatra.jpg"; // Path to Cleopatra background
    case "Confucius":
      return "/images/backgrounds/confucius.jpg"; // Path to Confucius background
    default:
      return "";
  }
};


const Aristotle: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<string>("Aristotle");
  const [mode, setMode] = useState<string>("normal");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

  // Define the historical figures, their categories, and options
  const figures: Figure[] = [
    {
      name: "Aristotle",
      categories: [
        {
          name: "Socratic Dialogues",
          options: [
            {
              label: "Happiness",
              action: () => startDialogue("socratic", "Happiness"),
            },
            {
              label: "Friendship",
              action: () => startDialogue("socratic", "Friendship"),
            },
            {
              label: "Courage",
              action: () => startDialogue("socratic", "Courage"),
            },
            {
              label: "Justice",
              action: () => startDialogue("socratic", "Justice"),
            },
          ],
        },
        {
          name: "Philosophical Teachings",
          options: [
            {
              label: "Ethics",
              action: () => startDialogue("teaching", "Ethics"),
            },
            {
              label: "Logic",
              action: () => startDialogue("teaching", "Logic"),
            },
            {
              label: "Metaphysics",
              action: () => startDialogue("teaching", "Metaphysics"),
            },
            {
              label: "Politics",
              action: () => startDialogue("teaching", "Politics"),
            },
          ],
        },
      ],
    },
    {
      name: "Albert Einstein",
      categories: [
        {
          name: "Thought Experiments",
          options: [
            {
              label: "Relativity",
              action: () => startDialogue("thought_experiment", "Relativity"),
            },
            {
              label: "Time Dilation",
              action: () => startDialogue("thought_experiment", "Time Dilation"),
            },
            {
              label: "Twin Paradox",
              action: () => startDialogue("thought_experiment", "Twin Paradox"),
            },
          ],
        },
        {
          name: "Physics Lessons",
          options: [
            {
              label: "General Relativity",
              action: () => startDialogue("lesson", "General Relativity"),
            },
            {
              label: "Quantum Mechanics",
              action: () => startDialogue("lesson", "Quantum Mechanics"),
            },
            {
              label: "Photoelectric Effect",
              action: () => startDialogue("lesson", "Photoelectric Effect"),
            },
          ],
        },
      ],
    },
    {
      name: "Leonardo da Vinci",
      categories: [
        {
          name: "Creative Brainstorming",
          options: [
            {
              label: "Inventions",
              action: () => startDialogue("brainstorm", "Inventions"),
            },
            {
              label: "Art Projects",
              action: () => startDialogue("brainstorm", "Art Projects"),
            },
            {
              label: "Flight Machines",
              action: () => startDialogue("brainstorm", "Flight Machines"),
            },
          ],
        },
        {
          name: "Art Lessons",
          options: [
            {
              label: "Painting Techniques",
              action: () => startDialogue("lesson", "Painting Techniques"),
            },
            {
              label: "Anatomy",
              action: () => startDialogue("lesson", "Anatomy"),
            },
            {
              label: "Perspective Drawing",
              action: () => startDialogue("lesson", "Perspective Drawing"),
            },
          ],
        },
      ],
    },
    {
      name: "Napoleon Bonaparte",
      categories: [
        {
          name: "Military Simulations",
          options: [
            {
              label: "Battle Strategies",
              action: () => startDialogue("simulation", "Battle Strategies"),
            },
            {
              label: "Leadership Challenges",
              action: () => startDialogue("simulation", "Leadership Challenges"),
            },
          ],
        },
        {
          name: "Leadership Lessons",
          options: [
            {
              label: "Commanding Armies",
              action: () => startDialogue("lesson", "Commanding Armies"),
            },
            {
              label: "Political Strategy",
              action: () => startDialogue("lesson", "Political Strategy"),
            },
          ],
        },
      ],
    },
    {
      name: "Cleopatra",
      categories: [
        {
          name: "Role-Playing Diplomacy",
          options: [
            {
              label: "Negotiating Alliances",
              action: () => startDialogue("role_play", "Negotiating Alliances"),
            },
            {
              label: "Court Intrigues",
              action: () => startDialogue("role_play", "Court Intrigues"),
            },
          ],
        },
        {
          name: "History Lessons",
          options: [
            {
              label: "Ancient Egyptian Culture",
              action: () => startDialogue("lesson", "Ancient Egyptian Culture"),
            },
            {
              label: "Governance",
              action: () => startDialogue("lesson", "Governance"),
            },
          ],
        },
      ],
    },
    {
      name: "Confucius",
      categories: [
        {
          name: "Philosophical Discussions",
          options: [
            {
              label: "Moral Dilemmas",
              action: () => startDialogue("discussion", "Moral Dilemmas"),
            },
            {
              label: "Social Harmony",
              action: () => startDialogue("discussion", "Social Harmony"),
            },
          ],
        },
        {
          name: "Teachings",
          options: [
            {
              label: "Ethics",
              action: () => startDialogue("lesson", "Ethics"),
            },
            {
              label: "The Five Relationships",
              action: () => startDialogue("lesson", "The Five Relationships"),
            },
          ],
        },
      ],
    },
  ];
const changePrimaryColor = (figure: string) => {
  if (figure === "Aristotle") {
    document.documentElement.style.setProperty("--primary-color", "#ffffff"); // Switch to white for Aristotle
    document.documentElement.style.setProperty("--primary-color-r", "255");
    document.documentElement.style.setProperty("--primary-color-g", "255");
    document.documentElement.style.setProperty("--primary-color-b", "255");
  } else if (figure === "Cleopatra") {
    document.documentElement.style.setProperty("--primary-color", "#C2B280"); // Sandy color for Cleopatra
    document.documentElement.style.setProperty("--primary-color-r", "194");
    document.documentElement.style.setProperty("--primary-color-g", "178");
    document.documentElement.style.setProperty("--primary-color-b", "128");
  } else if (figure === "Napoleon Bonaparte") {
    document.documentElement.style.setProperty("--primary-color", "#FFC0CB"); // Pink for Napoleon
    document.documentElement.style.setProperty("--primary-color-r", "255");
    document.documentElement.style.setProperty("--primary-color-g", "192");
    document.documentElement.style.setProperty("--primary-color-b", "203");
  } else if (figure === "Albert Einstein") {
    document.documentElement.style.setProperty("--primary-color", "#ADD8E6"); // Lighter blue for Einstein
    document.documentElement.style.setProperty("--primary-color-r", "173");
    document.documentElement.style.setProperty("--primary-color-g", "216");
    document.documentElement.style.setProperty("--primary-color-b", "230");
  } else if (figure === "Leonardo da Vinci") {
    document.documentElement.style.setProperty("--primary-color", "#C8A2C8"); // Lavender for Da Vinci
    document.documentElement.style.setProperty("--primary-color-r", "200");
    document.documentElement.style.setProperty("--primary-color-g", "162");
    document.documentElement.style.setProperty("--primary-color-b", "200");
  } else if (figure === "Confucius") {
    document.documentElement.style.setProperty("--primary-color", "#F0E68C"); // Mellowed yellow for Confucius
    document.documentElement.style.setProperty("--primary-color-r", "240");
    document.documentElement.style.setProperty("--primary-color-g", "230");
    document.documentElement.style.setProperty("--primary-color-b", "140");
  } else {
    document.documentElement.style.setProperty("--primary-color", "#87ceeb"); // Default back to the original color
    document.documentElement.style.setProperty("--primary-color-r", "135");
    document.documentElement.style.setProperty("--primary-color-g", "206");
    document.documentElement.style.setProperty("--primary-color-b", "235");
  }
};
  
  // Call this function when the figure is changed
  useEffect(() => {
    changePrimaryColor(selectedFigure);
    setMessages([]);
  }, [selectedFigure]);

  const selectedFigureObj = figures.find((f) => f.name === selectedFigure);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to start a dialogue based on mode and topic
  const startDialogue = async (selectedMode: string, topic: string) => {
    // Clear previous messages and set the selected mode and topic
    setMessages([]);
    setMode(selectedMode);
    setSelectedTopic(topic);

    try {
      const res = await axios.post(`${API_URL}/start-dialogue`, {
        figure: selectedFigure,
        mode: selectedMode,
        topic,
      });
      const aiResponse = res.data.response;

      // Add the figure's initial message to the chat
      setMessages([{ role: "assistant", content: aiResponse }]);
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
      const res = await axios.post(`${API_URL}/chat`, {
        message,
        messages: newMessages,
        mode,
        selectedFigure,
        selectedTopic,
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
      <div id="image-display" style={{
        backgroundImage: `url(${getBackgroundImage(selectedFigure)})`,
      }} />
      <Header />
        <div className="chat-container">
        {/* Dropdown Menu for Mobile */}
        <div className="dropdown-container">
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedFigure}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {/* Figure Selection */}
              <h3>Select Figure</h3>
              <select
                value={selectedFigure}
                onChange={(e) => setSelectedFigure(e.target.value)}
                style={{ whiteSpace: "normal" }}
              >
                {figures.map((figure) => (
                  <option key={figure.name} value={figure.name}>
                    {figure.name}
                  </option>
                ))}
              </select>
            
              {/* Figure-specific options */}
              {selectedFigureObj &&
                selectedFigureObj.categories.map((category, catIndex) => (
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
            value={selectedFigure}
            onChange={(e) => setSelectedFigure(e.target.value)}
            style={{ whiteSpace: "normal" }} // Ensure names wrap
          >
            {figures.map((figure) => (
              <option key={figure.name} value={figure.name}>
                {figure.name}
              </option>
            ))}
          </select>

          {selectedFigureObj &&
            selectedFigureObj.categories.map((category, catIndex) => (
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
