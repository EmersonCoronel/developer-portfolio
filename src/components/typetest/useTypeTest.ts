import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import generateRandomLine from "./WordGenerator";

const useTypeTest = () => {
  const [lines, setLines] = useState<string[]>(["", "", ""]);
  const [userInputs, setUserInputs] = useState<string[]>(["", "", ""]);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(15);
  const [typingStarted, setTypingStarted] = useState<boolean>(false);
  const [totalCharsTyped, setTotalCharsTyped] = useState<number>(0);
  const [correctCharsTyped, setCorrectCharsTyped] = useState<number>(0);
  const [selectedTimer, setSelectedTimer] = useState<number>(15);
  const [mobile, setMobile] = useState<boolean>(false);

  // Handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (timer === 0) return;
    const input = event.target.value;
    const updatedInputs = [...userInputs];
    updatedInputs[currentLineIndex] = input;
    setUserInputs(updatedInputs);

    // Update currentCharIndex based on the new input length
    setCurrentCharIndex(input.length);

    // Recalculate totalCharsTyped and correctCharsTyped
    let totalChars = 0;
    let correctChars = 0;

    for (let lineIdx = 0; lineIdx <= currentLineIndex; lineIdx++) {
      const userLine = updatedInputs[lineIdx];
      const targetLine = lines[lineIdx];
      const length = userLine.length;
      totalChars += length;
      for (let i = 0; i < length; i++) {
        if (userLine[i] === targetLine[i]) {
          correctChars++;
        }
      }
    }

    setTotalCharsTyped(totalChars);
    setCorrectCharsTyped(correctChars);

    // Check if user has completed the current line
    if (input.length >= lines[currentLineIndex].length) {
      moveToNextLine();
    }
  };

  // Handle key down events
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Start the timer when typing starts
    if (!typingStarted) {
      setTypingStarted(true);
    }

    // Prevent further input if the timer is up
    if (timer === 0) {
      event.preventDefault();
      return;
    }

    const input = userInputs[currentLineIndex];

    // Prevent multiple spaces in a row or space at the beginning
    if (event.key === " " && (input.endsWith(" ") || input.length === 0)) {
      event.preventDefault();
      return;
    }
  };

  // Function to move to the next line
  const moveToNextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      setCurrentCharIndex(0);
    } else {
      // Shift the lines and generate a new one
      let newLines = [...lines];
      newLines.shift(); // Remove the first line
      newLines.push(generateRandomLine(mobile)); // Add a new line at the end
      setLines(newLines);

      // Shift the userInputs as well
      let newUserInputs = [...userInputs];
      newUserInputs.shift();
      newUserInputs.push("");
      setUserInputs(newUserInputs);

      setCurrentLineIndex(lines.length - 1);
      setCurrentCharIndex(0);
    }
  };

  // Reference to the hidden input field
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const focusTextBox = () => {
    hiddenInputRef.current?.focus();
  };

  // Initialize lines and focus input
  useEffect(() => {
    const newLines = Array(3)
      .fill(null)
      .map(() => generateRandomLine(mobile));
    setLines(newLines);
    hiddenInputRef.current?.focus();
  }, []);

  // Timer countdown
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

  useEffect(() => {
    resetTest();
  }, [mobile]);

  // Calculate words per minute and accuracy
  const wordsPerMinute = totalCharsTyped / 5 / (selectedTimer / 60);
  const accuracy = totalCharsTyped > 0 ? (correctCharsTyped / totalCharsTyped) * 100 : 0;

  // Reset test
  const resetTest = () => {
    setLines(
      Array(3)
        .fill(null)
        .map(() => generateRandomLine(mobile)),
    );
    setUserInputs(["", "", ""]);
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
    focusTextBox,
    handleTimerChange,
    resetTest,
    setMobile
  };
};

export default useTypeTest;
