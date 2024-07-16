import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Header from '../components/general/Header';
import generateRandomLine from '../components/typetest/WordGenerator';
import Line from '../components/typetest/TestLine';

const TypeTest: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['', '', '']);
  const [userInputs, setUserInputs] = useState<string[]>(['', '', '']);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const updatedInputs = [...userInputs];
    updatedInputs[currentLineIndex] = input;
    setUserInputs(updatedInputs);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      setCurrentCharIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key.length === 1) {
      if (event.key !== ' ' || currentCharIndex !== 0) {
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
      }
    }

    // Move to the next line when the user hits space at the end of the line
    if (event.key === ' ' && currentCharIndex >= lines[currentLineIndex].length - 1) {
      moveToNextLine();
      event.preventDefault(); // Prevent the default space behavior
    }

    // Ignore spacebar if at the beginning of the line
    if (event.key === ' ' && currentCharIndex === 0) {
      event.preventDefault();
    }
  };

  const moveToNextLine = () => {
    if (currentLineIndex === 0) {
      setCurrentLineIndex(currentLineIndex + 1);
      setCurrentCharIndex(0);
    } else {
      let newLines = [...lines];
      let newInputs = ['', '', ''];
      newLines[0] = newLines[1];
      newLines[1] = newLines[2];
      newLines[2] = generateRandomLine();
      newInputs[0] = userInputs[1];
      setLines(newLines);
      setUserInputs(newInputs);
      setCurrentLineIndex(1);
      setCurrentCharIndex(0);
    }
  };

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const handleTextBlockClick = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    const newLines = Array(3).fill(null).map(() => generateRandomLine());
    setLines(newLines);
    hiddenInputRef.current?.focus();
  }, []);

  return (
    <div>
      <Header />
      <div className="text-center centered-container">
        <input
          ref={hiddenInputRef}
          type="text"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={userInputs[currentLineIndex]}
          className='hidden-input'
          style={{ opacity: 0, position: 'absolute', zIndex: -1, caretColor: 'red' }}
        />
        <div id="type-text-block" onClick={handleTextBlockClick}>
          {lines.map((line, index) => (
            <Line
              key={index}
              line={line}
              userInput={userInputs[index]}
              currentLineIndex={currentLineIndex}
              lineIndex={index}
              currentCharIndex={currentCharIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypeTest;
