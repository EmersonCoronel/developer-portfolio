import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import Header from '../components/general/Header';
import Line from '../components/typetest/TestLine';
import generateRandomLine from '../components/typetest/WordGenerator';

const TypeTest: React.FC = () => {
  // State to manage the lines of text to be typed
  const [lines, setLines] = useState<string[]>(['', '', '']);
  // State to manage user inputs for each line
  const [userInputs, setUserInputs] = useState<string[]>(['', '', '']);
  // State to track the current line being typed
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  // State to track the current character index within the current line
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);

  // Function to handle changes in the input field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    const updatedInputs = [...userInputs];
    updatedInputs[currentLineIndex] = input;
    setUserInputs(updatedInputs);
  };

  // Function to handle key down events
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace key
    if (event.key === 'Backspace') {
      // Check if the character being deleted is a space
      if (userInputs[currentLineIndex][userInputs[currentLineIndex].length - 1] === ' ') {
        // Set the character index to the last character before the space
        setCurrentCharIndex(userInputs[currentLineIndex].length - 1);
      } else {
        // Decrease the character index by 1, ensuring it doesn't go below 0
        setCurrentCharIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      }
    } else if (event.key.length === 1) {
      // Handle other character inputs
      if (event.key !== ' ' || currentCharIndex !== 0) {
        // Increase the character index by 1
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
      }
    }

    // Handle space key
    if (event.key === ' ') {
      // Move to the next line when the user hits space at the end of the line
      if (currentCharIndex >= lines[currentLineIndex].length - 1) {
        moveToNextLine();
        event.preventDefault();
      // Ignore spacebar if at the beginning of the line
      } else if (currentCharIndex === 0) {
        event.preventDefault();
      // Move to the next word when space is pressed in the middle of a word
      } else if (lines[currentLineIndex][currentCharIndex] !== ' ') {
        const nextSpaceIndex = lines[currentLineIndex].indexOf(' ', currentCharIndex);
        if (nextSpaceIndex !== -1) {
          // Insert a space in the user input at the current character index
          const updatedInputs = [...userInputs];
          updatedInputs[currentLineIndex] = 
            event.currentTarget.value.slice(0, currentCharIndex) + ' ' + 
            event.currentTarget.value.slice(currentCharIndex);
          setUserInputs(updatedInputs);
          // Move the character index to the character after the next space
          setCurrentCharIndex(nextSpaceIndex + 1);
        } else {
          // If no space is found, move to the end of the line
          setCurrentCharIndex(lines[currentLineIndex].length);
        }
        event.preventDefault();
      }
    }
  };

  // Function to move to the next line
  const moveToNextLine = () => {
    if (currentLineIndex === 0) {
      // Move to the next line
      setCurrentLineIndex(currentLineIndex + 1);
      setCurrentCharIndex(0);
    } else {
      // Shift the lines and generate a new one
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

  // Reference to the hidden input field
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  // Function to handle clicks on the text block
  const handleTextBlockClick = () => {
    hiddenInputRef.current?.focus();
  };

  // Effect to initialize the lines and focus the input field on mount
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
