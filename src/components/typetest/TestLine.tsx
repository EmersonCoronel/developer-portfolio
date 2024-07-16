import React from 'react';

interface LineProps {
  line: string;
  userInput: string;
  currentLineIndex: number;
  lineIndex: number;
  currentCharIndex: number;
}

const Line: React.FC<LineProps> = ({ line, userInput, currentLineIndex, lineIndex, currentCharIndex }) => {
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
                color: 'gray',
              };
              if (charIndex < inputChars.length) {
                charStyle.color = char === inputChars[charIndex] ? 'white' : 'red';
              }

              // Determine if the cursor should be shown here
              const showCursor = lineIndex === currentLineIndex && globalCharIndex === currentCharIndex;

              globalCharIndex++; // Increment the global character index

              return (
                <React.Fragment key={charIndex}>
                  {showCursor && <span className="cursor">|</span>}
                  <span style={charStyle}>{char}</span>
                </React.Fragment>
              );
            })}
            {lineIndex === currentLineIndex && globalCharIndex === currentCharIndex && <span className="cursor">|</span>}
            {wordIndex < line.split(' ').length - 1 && ' '}
            {incrementGlobalCharIndex()} {/* Increment for the space between words */}
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
