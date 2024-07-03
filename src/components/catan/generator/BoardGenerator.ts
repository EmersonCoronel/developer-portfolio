// Define possible tile types
type Tile = 'Wood' | 'Brick' | 'Wheat' | 'Sheep' | 'Ore' | 'Desert';

// Define the structure of a board tile
export interface BoardTile {
  resource: Tile | undefined; // The type of resource
  number: number | undefined; // The number assigned to the tile
}


// Mapping of each tile to its neighbors based on their indices
const neighbors: { [key: number]: number[] } = {
  // Each key is a tile index, and its value is an array of indices of neighboring tiles
  0: [1, 10, 11],
  1: [0, 2, 11, 12],
  2: [1, 12, 13],
  10: [0, 11, 20, 21],
  11: [0, 1, 10, 12, 21, 22],
  12: [1, 2, 11, 13, 22, 23],
  13: [2, 12, 23, 24],
  20: [10, 21, 30],
  21: [10, 11, 20, 22, 30, 31],
  22: [11, 12, 21, 23, 31, 32],
  23: [12, 13, 22, 24, 32, 33],
  24: [13, 23, 33],
  30: [20, 21, 31, 40],
  31: [21, 22, 30, 32, 40, 41],
  32: [22, 23, 31, 33, 41, 42],
  33: [23, 24, 32, 42],
  40: [30, 31, 41],
  41: [31, 32, 40, 42],
  42: [32, 33, 41],
};

// Function to shuffle an array in place
function shuffleArray(array: any) {
  // Loop backwards through the array
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index before the current one
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to determine the next index, with special cases
function incrementCounter(num: number): number {
  // Map of special cases where the next index jumps ahead
  const nextIndexMap: { [key: number]: number } = { 2: 10, 13: 20, 24: 30, 33: 40 };
  // Return the mapped value if it exists, otherwise increment by 1
  return nextIndexMap[num] !== undefined ? nextIndexMap[num] : num + 1;
}


// Function to fill the board with resources
function fillResources(board: BoardTile[][]) {
  // Array of tiles to be distributed on the board
  let tiles: Tile[] = ['Wood', 'Wood', 'Wood', 'Wood', 'Brick', 'Brick', 'Brick', 'Wheat', 'Wheat', 'Wheat', 'Wheat', 'Sheep', 'Sheep', 'Sheep', 'Sheep', 'Ore', 'Ore', 'Ore', 'Desert'];
  // Shuffle the tiles to randomize their distribution
  shuffleArray(tiles);
  // Iterator for placing tiles on the board
  let itr = 0;
  // Loop until all tiles are placed
  while (tiles.length > 0) {
    // Place the tile on the board and set its number to 0 initially
    board[Math.floor(itr / 10)][itr % 10] = { resource: tiles.pop(), number: 0 }
    // Move to the next index, with special cases handled by incrementCounter
    itr = incrementCounter(itr);
  }
}

// Helper function for fillNumbers to check if the board's number distribution follows the game's rules
function checkNeighbors(board: BoardTile[][]) {
  // Iterator for checking each tile
  let itr = 0;
  // Loop through all possible tile positions
  while (itr < 43) {
    // Get the current tile
    const tile = board[Math.floor(itr / 10)][itr % 10];
    // Check all neighbors for rule violations
    for (const neighborNum of neighbors[itr]) {
      const neighbor = board[Math.floor(neighborNum / 10)][neighborNum % 10];
      // Return false if a rule is violated
      if (neighbor.number === tile.number ||
       ((tile.number == 6 || tile.number == 8) && (neighbor.number == 6 || neighbor.number == 8)) ||
       ((tile.number == 2 || (tile.number == 12)) && (neighbor.number == 2 || neighbor.number == 12))) {
        return false;
      }
    }
    // Move to the next tile
    itr = incrementCounter(itr);
  }
  // Return true if all tiles pass the checks
  return true;
}

// Function to fill the board with numbers, ensuring no rule violations
function fillNumbers(board: BoardTile[][]) {
  // Flag to indicate a valid configuration has been found
  let valid = false;
  // Loop until a valid configuration is found
  while (!valid) {
    // Array of numbers to be distributed on the board
    const numbers: number[] = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];
    // Shuffle the numbers to randomize their distribution
    shuffleArray(numbers);
    // Iterator for placing numbers on the board
    let itr = 0;
    // Loop until all numbers are placed
    while (numbers.length > 0) {
      // Calculate row and index within the row for the current number
      const row = Math.floor(itr / 10);
      const index = itr % 10;
      // Skip desert tiles when assigning numbers
      if (board[row][index].resource !== "Desert") {
        board[row][index].number = numbers.pop();
      }
      // Move to the next index
      itr = incrementCounter(itr);
    }
    // Check if the current configuration is valid
    valid = checkNeighbors(board);
  }
}
  
// Main function to generate a Catan board
export function generateCatanBoard() {
  // Initialize the board with empty rows of varying lengths
  let board: BoardTile[][] = [
    new Array(3).fill(null),
    new Array(4).fill(null),
    new Array(5).fill(null),
    new Array(4).fill(null),
    new Array(3).fill(null)
  ];
  // Fill the board with resources and then numbers
  fillResources(board);
  fillNumbers(board);
  // Return the completed board
  return board;
}

const board = generateCatanBoard()
console.log(board);