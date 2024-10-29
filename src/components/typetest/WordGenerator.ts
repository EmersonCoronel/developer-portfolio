import { words } from "./words";

/**
 * Get a line of random words where the total number of characters
 * falls within the specified range.
 * @param {number} mobile - Is the screen mobile or desktop.
 * @returns {string} A line of random words.
 */
const generateRandomLine = (mobile: boolean): string => {
  console.log(mobile);
  const minChars = mobile ? 85 : 100;
  const maxChars = mobile ? 89 : 102;
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
