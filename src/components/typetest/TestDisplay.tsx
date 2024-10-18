import React from "react";
import Line from "./TestLine";
import useTypeTest from "./useTypeTest";

const TestDisplay: React.FC = () => {
  // Logic defined in useTypeTest
  const {
    lines,
    userInputs,
    currentLineIndex,
    currentCharIndex,
    timer,
    typingStarted,
    wordsPerMinute,
    accuracy,
    hiddenInputRef,
    handleInputChange,
    handleKeyDown,
    handleTextBlockClick,
    handleTimerChange,
    resetTest,
  } = useTypeTest();

  // The TypeTest component to be placed inside the page
  return (
    <div>
      <div className="text-center centered-container">
        <div id="timer">
          {timer}
          {!typingStarted && (
            <span>
              <span style={{ margin: "0 20px" }}>|</span>
              Set Duration:
              <button
                className="set-timer-button"
                onClick={() => handleTimerChange(15)}
              >
                15
              </button>
              <button
                className="set-timer-button"
                onClick={() => handleTimerChange(30)}
              >
                30
              </button>
              <button
                className="set-timer-button"
                onClick={() => handleTimerChange(60)}
              >
                60
              </button>
              <button
                className="set-timer-button"
                onClick={() => handleTimerChange(120)}
              >
                120
              </button>
            </span>
          )}
        </div>
        {timer === 0 && (
          <div>
            <div id="wpm">WPM: {Math.round(wordsPerMinute)}</div>
            <div id="accuracy">Accuracy: {Math.round(accuracy)}%</div>
          </div>
        )}
        <input
          ref={hiddenInputRef}
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={userInputs[currentLineIndex]}
          className="hidden-input"
          autoComplete="off"
          spellCheck="false"
          style={{
            opacity: 0,
            position: "absolute",
            zIndex: -1,
            caretColor: "red",
          }}
        />
        <div
          id="type-text-block"
          className={timer === 0 ? "finished" : ""}
          onClick={handleTextBlockClick}
        >
          {lines.map((line, index) => (
            <Line
              key={index}
              line={line}
              userInput={userInputs[index]}
              currentLineIndex={currentLineIndex}
              lineIndex={index}
              currentCharIndex={currentCharIndex}
              timer={timer}
            />
          ))}
        </div>
        <button id="reset-test" onClick={resetTest}>
          <img
            src="https://assets.emersoncoronel.com/images/redo.svg"
            alt="Reset"
          />
        </button>
      </div>
    </div>
  );
};

export default TestDisplay;
