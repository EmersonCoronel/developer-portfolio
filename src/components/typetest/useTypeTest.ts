import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import generateRandomLine from './WordGenerator';

const useTypeTest = () => {
  // State to manage the lines of text to be typed
  const [lines, setLines] = useState<string[]>(['', '', '']);
  // State to manage user inputs for each line
  const [userInputs, setUserInputs] = useState<string[]>(['', '', '']);
  // State to track the current line being typed
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  // State to track the current character index within the current line
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  // State to manage the timer
  const [timer, setTimer] = useState<number>(15);
  // State to track if typing has started
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  // State to track the total number of characters typed
  const [totalCharsTyped, setTotalCharsTyped] = useState<number>(0);
  // State to track the number of correct characters typed
  const [correctCharsTyped, setCorrectCharsTyped] = useState<number>(0);
  // State to track which timer the user has selected
  const [selectedTimer, setSelectedTimer] = useState<number>(15);

  // Function to handle changes in the input field
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer === 0) return;
    const input = event.target.value;
    const updatedInputs = [...userInputs];
    updatedInputs[currentLineIndex] = input;
    setUserInputs(updatedInputs);
  };

  // Function to handle key down events
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => { 
    // Start the timer when typing starts
    if (!typingStarted) {
      setTypingStarted(true);
    }

    // Prevent further input if the timer is up
    if (timer === 0) {
      return;
    }

    // Prevent action if the last character in user input is a space or if at the beginning of the line
    if (event.key === ' ' && (userInputs[currentLineIndex].slice(-1) === ' ' || currentCharIndex === 0)) {
      console.log("Here")
      event.preventDefault();
      return;
    }

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
    } else if (event.key === ' ') {
      // Move to the next line when user reaches the end
      if (currentCharIndex >= lines[currentLineIndex].length - 1) {
        moveToNextLine();
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
      } else {
        // Increase the character index by 1
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
        // Increment the total characters typed
        setTotalCharsTyped((prevTotal) => prevTotal + 1);
        if (lines[currentLineIndex][currentCharIndex] === event.key) {
          setCorrectCharsTyped((prevCorrect) => prevCorrect + 1);
        }
      }
    // Handle all other character inputs
    } else if (event.key.length === 1) {
      // Increase the character index by 1
      setCurrentCharIndex((prevIndex) => prevIndex + 1);
      // Increment the total characters typed
      setTotalCharsTyped((prevTotal) => prevTotal + 1);
      if (lines[currentLineIndex][currentCharIndex] === event.key) {
        setCorrectCharsTyped((prevCorrect) => prevCorrect + 1);
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

  // Effect to manage the timer countdown
  useEffect(() => {
    if (typingStarted && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [typingStarted, timer]);

  const handleTimerChange = (time: number) => {
    setSelectedTimer(time);
    setTimer(time);
  };

  // Calculate words per minute and accuracy
  const wordsPerMinute = (totalCharsTyped / 5) / (selectedTimer / 60);
  const accuracy = totalCharsTyped > 0 ? (correctCharsTyped / totalCharsTyped) * 100 : 0;

  // Function to reset the state
  const resetTest = () => {
    setLines(Array(3).fill(null).map(() => generateRandomLine()));
    setUserInputs(['', '', '']);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setTimer(selectedTimer);
    setTypingStarted(false);
    setTotalCharsTyped(0);
    setCorrectCharsTyped(0);
    hiddenInputRef.current?.focus();
  };

  return {
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
  };
};

export default useTypeTest;