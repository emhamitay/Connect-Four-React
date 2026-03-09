
export const WINNER = {
  RED: "red",
  BLUE: "blue",
  NONE: null
};

// This function checks for a winner in the game 
export function GetWinner(board) {
  // return a cell in the board gets row number and cell number
  function getCell(row,cell){
      return board.rows[row].cells[cell];
  }

  //checks for a winner
  // Possible directions to check for a winning line:
  // right, down, diagonal right-down, diagonal left-down
  const directions = [
    { dr: 0, dc: 1 }, // right
    { dr: 1, dc: 0 }, // down
    { dr: 1, dc: 1 }, // diagonal right-down
    { dr: 1, dc: -1 }, // diagonal left-down
  ];

  // Iterate over every cell in the board
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      const startCell = getCell(r, c);
      const startColor = startCell.color;

      // Only check from non-empty cells
      if (startColor === null) continue;

      // Check all directions from the current cell
      for (let { dr, dc } of directions) {
        let count = 1;

        // Check next 3 cells in the current direction
        for (let i = 1; i < 4; i++) {
          const newRow = r + dr * i;
          const newCol = c + dc * i;

          // Make sure we're within board bounds
          if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;

          const nextCell = getCell(newRow, newCol);

          // Stop if any cell doesn't match the starting color
          if (nextCell.color !== startColor) break;

          count++;
        }

        // if there was a winner set the status to match
        if (count === 4) {
          if (startColor === "red") {
            return WINNER.RED;
          } else {
            return WINNER.BLUE;
          }
        }
      }
    }
  }
  return WINNER.NONE; // No winner found
}
