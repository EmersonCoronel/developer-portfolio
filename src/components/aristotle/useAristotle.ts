import { useState, useEffect, useRef } from "react";
import { figures, Figure, changePrimaryColor, getModeForOption, resetPrimaryColor } from "./figures";

interface Message {
  role: string;
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const useAristotle = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedFigure, setSelectedFigure] = useState<Figure>(
    figures.find((f) => f.name === "Aristotle") || figures[0],
  );
  const [mode, setMode] = useState<string>("normal");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedFigure) {
      changePrimaryColor(selectedFigure);
      setMessages([]);
    }

    return () => {
      resetPrimaryColor();
    };
  }, [selectedFigure]);

  const startDialogue = async (selectedMode: string, topic: string) => {
    setMessages([]);
    setMode(selectedMode);
    setSelectedTopic(topic);
    setIsDropdownOpen(false);

    try {
      const response = await fetch(`${API_URL}/start-dialogue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figure: selectedFigure.name,
          mode: selectedMode,
          topic,
        }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not yet supported in this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let assistantMessage = "";
      let done = false;

      const processChunk = (messagePart: string) => {
        const content = JSON.parse(messagePart);
        assistantMessage += content;

        setMessages((prevMessages) => {
          if (prevMessages.length === 0) {
            // Add the initial assistant message only after the first chunk is processed
            return [{ role: "assistant", content: assistantMessage }];
          } else {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;
            const lastMessage = updatedMessages[lastMessageIndex];

            // Update the assistant message with incremental content
            updatedMessages[lastMessageIndex] = {
              ...lastMessage,
              content: assistantMessage,
            };

            return updatedMessages;
          }
        });
      };

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading; // Separate logic from chunk processing

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");
          for (const line of lines) {
            const messagePart = line.replace(/^data: /, "");
            if (messagePart === "[DONE]") {
              done = true;
            } else {
              try {
                processChunk(messagePart);
              } catch (e) {
                console.error("Error parsing message part:", e);
              }
            }
            if (done) break; // Exit the loop if done
          }
        }
      }
    } catch (error) {
      console.error("Error starting dialogue:", error);
    }
  };

  const startScenarioAdvice = () => {
    setMessages([]);
    setIsDropdownOpen(false);
    setMode("scenario");

    setMessages([
      {
        role: "assistant",
        content: `Please describe your situation or question, and I will offer advice based on my expertise.`,
      },
    ]);
  };

  const sendMessage = async () => {
    if (message.trim() === "") return;
    setIsDropdownOpen(false);

    const newMessages = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          messages: newMessages,
          mode,
          selectedFigure: selectedFigure.name,
          selectedTopic,
        }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not yet supported in this browser.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let assistantMessage = "";

      const processChunk = (messagePart: string) => {
        const content = JSON.parse(messagePart);
        assistantMessage += content;

        setMessages((prevMessages) => {
          if (prevMessages.length === 0 || prevMessages[prevMessages.length - 1].role !== "assistant") {
            // Add the initial assistant message only after the first chunk is processed
            return [...prevMessages, { role: "assistant", content: assistantMessage }];
          } else {
            const updatedMessages = [...prevMessages];
            const lastMessageIndex = updatedMessages.length - 1;
            const lastMessage = updatedMessages[lastMessageIndex];

            // Update the assistant message with incremental content
            updatedMessages[lastMessageIndex] = {
              ...lastMessage,
              content: assistantMessage,
            };

            return updatedMessages;
          }
        });
      };

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading; // Separate logic from chunk processing

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");
          for (const line of lines) {
            const messagePart = line.replace(/^data: /, "");
            if (messagePart === "[DONE]") {
              done = true;
            } else {
              try {
                processChunk(messagePart);
              } catch (e) {
                console.error("Error parsing message part:", e);
              }
            }
            if (done) break; // Exit the loop if done
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

  const categoriesWithActions = attachActionsToOptions(selectedFigure);

  return {
    message,
    setMessage,
    messages,
    selectedFigure,
    setSelectedFigure,
    mode,
    selectedTopic,
    isDropdownOpen,
    setIsDropdownOpen,
    messagesEndRef,
    categoriesWithActions,
    startScenarioAdvice,
    sendMessage,
    handleKeyDown,
    figures,
  };
};

export default useAristotle;
