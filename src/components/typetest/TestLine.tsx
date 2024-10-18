import React from "react";

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
    <div className="test-line">
      {lineChars.map((char, index) => {
        const userChar = userChars[index];

        let charStyle: React.CSSProperties = {
          color: "#999999",
        };

        if (userChar !== undefined) {
          if (userChar === char) {
            charStyle.color = "white";
          } else {
            charStyle.color = "red";
          }
        }

        const isCursor = isCurrentLine && index === currentCharIndex && timer > 0;

        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <span key={index} className="char">
            {isCursor && <span className="cursor">|</span>}
            <span style={charStyle}>{displayChar}</span>
          </span>
        );
      })}
    </div>
  );
};

export default Line;
