import React from "react";
import styles from "./aristotle.module.css";

interface Message {
  role: string;
  content: string;
}

interface ChatBoxProps {
  messages: Message[];
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isDropdownOpen: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  message,
  setMessage,
  sendMessage,
  handleKeyDown,
  messagesEndRef,
  isDropdownOpen,
}) => {
  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.chatBox}>
      <div
        className={styles.messagesContainer}
        style={{
          opacity: isDropdownOpen ? 0 : 1,
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[`message${capitalizeFirstLetter(msg.role)}`]}`}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          rows={3}
          className={styles.inputTextarea}
        />
        <button onClick={sendMessage} className={styles.inputButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
