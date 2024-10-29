import React from "react";
import styles from "./typetest.module.css";

interface LineProps {
  line: string;
  userInput: string;
  currentLineIndex: number;
  lineIndex: number;
  currentCharIndex: number;
  timer: number;
}

const Line: React.FC<LineProps> = ({ line, userInput, currentLineIndex, lineIndex, currentCharIndex, timer }) => {
  const lineChars = line.split("");
  const userChars = userInput.split("");
  const isCurrentLine = lineIndex === currentLineIndex;

  return (
    <div className={styles.testLine}>
      {lineChars.map((char, index) => {
        const userChar = userChars[index];

        let charStyle: React.CSSProperties = {
          color: "#999999",
        };

        if (userChar !== undefined) {
          charStyle.color = userChar === char ? "white" : "red";
        }

        const isCursor = isCurrentLine && index === currentCharIndex && timer > 0;
        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <span key={index} className={styles.char}>
            {isCursor && <span className={styles.cursor}>|</span>}
            <span style={charStyle}>{displayChar}</span>
          </span>
        );
      })}
    </div>
  );
};

export default Line;
