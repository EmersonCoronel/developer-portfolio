import { words } from "./words";

/**
 * Get a line of random words where the total number of characters
 * falls within the specified range.
 * @param {number} minChars - The minimum number of characters for the line.
 * @param {number} maxChars - The maximum number of characters for the line.
 * @returns {string} A line of random words.
 */
const generateRandomLine = (minChars: number = 90, maxChars: number = 100): string => {
  let line = "";
  let lineLength = 0;

  while (lineLength < minChars || lineLength > maxChars) {
    line = "";
    lineLength = 0;

    const shuffledWords = [...words].sort(() => 0.5 - Math.random());

    for (const word of shuffledWords) {
      if (lineLength + word.length + (line ? 1 : 0) > maxChars) break;
      line += (line ? " " : "") + word;
      lineLength = line.length;
    }
  }
  return line;
};

export default generateRandomLine;
