// components/aristotle/AristotleDisplay.tsx
import React from "react";
import useAristotle from "./useAristotle";
import ChatBox from "./ChatBox";
import Sidebar from "./Sidebar";
import DropdownMenu from "./DropdownMenu";
import styles from "./aristotle.module.css";

const AristotleDisplay: React.FC = () => {
  const {
    message,
    setMessage,
    messages,
    selectedFigure,
    setSelectedFigure,
    isDropdownOpen,
    setIsDropdownOpen,
    messagesEndRef,
    categoriesWithActions,
    startScenarioAdvice,
    sendMessage,
    handleKeyDown,
    figures,
  } = useAristotle();

  return (
    <div>
      <div
        className={styles.imageDisplay}
        style={{
          backgroundImage: `url(${selectedFigure.image})`,
        }}
      />
      {/* Dropdown Menu for Mobile */}
      <DropdownMenu
        isOpen={isDropdownOpen}
        toggleOpen={() => setIsDropdownOpen(!isDropdownOpen)}
        selectedFigure={selectedFigure}
        setSelectedFigure={setSelectedFigure}
        figures={figures}
        categoriesWithActions={categoriesWithActions}
        startScenarioAdvice={startScenarioAdvice}
      />

      {/* Main Chat Container */}
      <div className={styles.chatContainer}>
        <ChatBox
          messages={messages}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleKeyDown={handleKeyDown}
          messagesEndRef={messagesEndRef}
          isDropdownOpen={isDropdownOpen}
        />

        {/* Sidebar for Desktop */}
        <Sidebar
          selectedFigure={selectedFigure}
          setSelectedFigure={setSelectedFigure}
          figures={figures}
          categoriesWithActions={categoriesWithActions}
          startScenarioAdvice={startScenarioAdvice}
        />
      </div>
    </div>
  );
};

export default AristotleDisplay;
