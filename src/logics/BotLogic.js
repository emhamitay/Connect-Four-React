const ROWS = 6;
const COLS = 7;
const BOT = "blue";
const HUMAN = "red";
const SEARCH_DEPTH = 7;

// Convert the game board object into a plain 2-D array (faster to work with)
function toGrid(board) {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push(board.rows[r].cells[c].color); // null | "red" | "blue"
    }
    grid.push(row);
  }
  return grid;
}

// Return list of columns that still have room, ordered centre-first for better pruning
const COL_ORDER = [3, 2, 4, 1, 5, 0, 6];
function validColumns(grid) {
  return COL_ORDER.filter((c) => grid[0][c] === null);
}

// Drop a chip into grid[row][col], return the landing row (mutates grid)
function dropChip(grid, col, color) {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (grid[r][col] === null) {
      grid[r][col] = color;
      return r;
    }
  }
  return -1;
}

// Undo a drop
function undoChip(grid, row, col) {
  grid[row][col] = null;
}

// Fast win check centred on the last placed chip — avoids scanning the whole board
function isWinningMove(grid, row, col, color) {
  const directions = [
    [0, 1],  // horizontal
    [1, 0],  // vertical
    [1, 1],  // diagonal ↘
    [1, -1], // diagonal ↙
  ];
  for (const [dr, dc] of directions) {
    let count = 1;
    // positive direction
    for (let i = 1; i < 4; i++) {
      const nr = row + dr * i;
      const nc = col + dc * i;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || grid[nr][nc] !== color) break;
      count++;
    }
    // negative direction
    for (let i = 1; i < 4; i++) {
      const nr = row - dr * i;
      const nc = col - dc * i;
      if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || grid[nr][nc] !== color) break;
      count++;
    }
    if (count >= 4) return true;
  }
  return false;
}

// Score a window of 4 cells from the perspective of the bot
function scoreWindow(window) {
  const botCount = window.filter((c) => c === BOT).length;
  const humanCount = window.filter((c) => c === HUMAN).length;
  const emptyCount = window.filter((c) => c === null).length;

  if (botCount === 4) return 1000;
  if (humanCount === 4) return -1000;
  if (botCount === 3 && emptyCount === 1) return 50;
  if (humanCount === 3 && emptyCount === 1) return -80; // blocking threats is important
  if (botCount === 2 && emptyCount === 2) return 10;
  if (humanCount === 2 && emptyCount === 2) return -10;
  return 0;
}

// Static board evaluation
function evaluate(grid) {
  let score = 0;

  // Prefer centre column
  for (let r = 0; r < ROWS; r++) {
    if (grid[r][3] === BOT) score += 6;
    else if (grid[r][3] === HUMAN) score -= 6;
  }

  // Horizontal windows
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += scoreWindow([grid[r][c], grid[r][c + 1], grid[r][c + 2], grid[r][c + 3]]);
    }
  }
  // Vertical windows
  for (let c = 0; c < COLS; c++) {
    for (let r = 0; r <= ROWS - 4; r++) {
      score += scoreWindow([grid[r][c], grid[r + 1][c], grid[r + 2][c], grid[r + 3][c]]);
    }
  }
  // Diagonal ↘
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 0; c <= COLS - 4; c++) {
      score += scoreWindow([grid[r][c], grid[r + 1][c + 1], grid[r + 2][c + 2], grid[r + 3][c + 3]]);
    }
  }
  // Diagonal ↙
  for (let r = 0; r <= ROWS - 4; r++) {
    for (let c = 3; c < COLS; c++) {
      score += scoreWindow([grid[r][c], grid[r + 1][c - 1], grid[r + 2][c - 2], grid[r + 3][c - 3]]);
    }
  }

  return score;
}

// Minimax with alpha-beta pruning
function minimax(grid, depth, alpha, beta, isMaximising) {
  const cols = validColumns(grid);

  // Terminal: no moves left (draw)
  if (cols.length === 0) return { score: 0, col: -1 };

  // Leaf node
  if (depth === 0) return { score: evaluate(grid), col: -1 };

  if (isMaximising) {
    let best = { score: -Infinity, col: cols[0] };
    for (const c of cols) {
      const r = dropChip(grid, c, BOT);
      if (isWinningMove(grid, r, c, BOT)) {
        undoChip(grid, r, c);
        return { score: 100_000 + depth, col: c }; // win sooner → higher score
      }
      const { score } = minimax(grid, depth - 1, alpha, beta, false);
      undoChip(grid, r, c);
      if (score > best.score) best = { score, col: c };
      alpha = Math.max(alpha, score);
      if (alpha >= beta) break;
    }
    return best;
  } else {
    let best = { score: Infinity, col: cols[0] };
    for (const c of cols) {
      const r = dropChip(grid, c, HUMAN);
      if (isWinningMove(grid, r, c, HUMAN)) {
        undoChip(grid, r, c);
        return { score: -(100_000 + depth), col: c };
      }
      const { score } = minimax(grid, depth - 1, alpha, beta, true);
      undoChip(grid, r, c);
      if (score < best.score) best = { score, col: c };
      beta = Math.min(beta, score);
      if (alpha >= beta) break;
    }
    return best;
  }
}

const BotLogic = {
  chooseColumn(board) {
    const grid = toGrid(board);
    const cols = validColumns(grid);

    if (cols.length === 0) {
      console.log("No valid columns available for the bot.");
      return null;
    }

    // 1) If we can win immediately, take it
    for (const c of cols) {
      const r = dropChip(grid, c, BOT);
      if (isWinningMove(grid, r, c, BOT)) { undoChip(grid, r, c); return c; }
      undoChip(grid, r, c);
    }

    // 2) If the human can win next turn, block it
    for (const c of cols) {
      const r = dropChip(grid, c, HUMAN);
      if (isWinningMove(grid, r, c, HUMAN)) { undoChip(grid, r, c); return c; }
      undoChip(grid, r, c);
    }

    // 3) Run minimax search
    const { col } = minimax(grid, SEARCH_DEPTH, -Infinity, Infinity, true);
    return col;
  },
};

export default BotLogic;