import React, { useEffect } from "react";
import styles from "./typetest.module.css";
import Line from "./TestLine";
import useTypeTest from "./useTypeTest";

const TestDisplay: React.FC = () => {
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
    focusTextBox,
    handleTimerChange,
    resetTest,
    setMobile
  } = useTypeTest();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div onClick={focusTextBox}>
      <div className={`text-center ${styles.centeredContainer}`}>
        <div className={styles.timer}>
          {timer}s
          {!typingStarted && (
            <span>
              <span className="mx-5">|</span>
              Set Duration:
              <button className={styles.setTimerButton} onClick={() => handleTimerChange(15)}>
                15
              </button>
              <button className={styles.setTimerButton} onClick={() => handleTimerChange(30)}>
                30
              </button>
              <button className={styles.setTimerButton} onClick={() => handleTimerChange(60)}>
                60
              </button>
              <button className={styles.setTimerButton} onClick={() => handleTimerChange(120)}>
                120
              </button>
            </span>
          )}
        </div>
        {timer === 0 && (
          <div>
            <div className={styles.wpm}>WPM: {Math.round(wordsPerMinute)}</div>
            <div className={styles.accuracy}>Accuracy: {Math.round(accuracy)}%</div>
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
          className={`${styles.typeTextBlock} ${timer === 0 ? styles.typeTextBlockFinished : ""}`}
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
        <button className={styles.resetTest} onClick={resetTest}>
          <img src="https://assets.emersoncoronel.com/images/redo.svg" alt="Reset" />
        </button>
      </div>
    </div>
  );
};

export default TestDisplay;
