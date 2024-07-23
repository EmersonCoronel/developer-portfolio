import React from 'react';

interface LineProps {
  line: string;
  userInput: string;
  currentLineIndex: number;
  lineIndex: number;
  currentCharIndex: number;
  timer: number;
}

const Line: React.FC<LineProps> = ({ line, userInput, currentLineIndex, lineIndex, currentCharIndex, timer }) => {
  let globalCharIndex = 0;

  return (
    <div className="test-line">
      {line.split(' ').map((word, wordIndex) => {
        const wordChars = word.split('');
        const inputWords = userInput ? userInput.split(' ') : [];
        const inputChars = inputWords[wordIndex]?.split('') || [];

        return (
          <span key={wordIndex} className="word">
            {wordChars.map((char, charIndex) => {
              let charStyle: React.CSSProperties = {
                color: '#999999',
              };
              if (charIndex < inputChars.length) {
                charStyle.color = char === inputChars[charIndex] ? 'white' : 'red';
              }

              return (
                <React.Fragment key={charIndex}>
                  {(lineIndex === currentLineIndex && globalCharIndex === currentCharIndex && timer > 0) && <span className="cursor">|</span>}
                  <span style={charStyle}>{char}</span>
                  {incrementGlobalCharIndex()}
                </React.Fragment>
              );
            })}
            {(lineIndex === currentLineIndex && globalCharIndex === currentCharIndex && timer > 0) && <span className="cursor">|</span>}
            {wordIndex < line.split(' ').length - 1 && ' '}
            {incrementGlobalCharIndex()}
          </span>
        );
      })}
    </div>
  );
  
  function incrementGlobalCharIndex() {
    globalCharIndex++;
    return null;
  }
};

export default Line;
