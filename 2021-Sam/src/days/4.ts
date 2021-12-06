import fs from "fs";
import chalk from "chalk";

function loadData(): {
  numbers: number[];
  boards: [number, boolean][][][];
} {
  const lines: string = fs.readFileSync("./inputs/4.txt", "utf8").trim();
  const numbers = lines
    .split("\n")[0]
    .split(",")
    .map(i => Number(i));
  const boards = lines
    .split("\n\n")
    .slice(1)
    .map(i =>
      i
        .trim()
        .split("\n")
        .map(j =>
          j
            .trim()
            .split(/\s+/g)
            .map(k => [Number(k.trim()), false] as [number, boolean])
        )
    );
  return { numbers, boards };
}

function displayBoard(board: [number, boolean][][], n: number) {
  console.log(chalk.blue`Board ${n + 1}`);
  for (const row of board) {
    let rowOutput = "";
    for (let col of row) {
      rowOutput += col[1]
        ? chalk.green(col[0].toString().padStart(4, " "))
        : chalk.red(col[0].toString().padStart(4, " "));
    }
    console.log(rowOutput);
  }
}

// function checkDiagonal(board: [number, boolean][][], addX: number, addY: number, startX: number, startY: number) {
//   let x = startX;
//   let y = startY;
//   for (let i = 0; i < board.length; i++) {
//     console.log(x, y);
//     if (!board[x][y][1]) return false;
//     x += addX;
//     y += addY;
//   }
//   console.log(chalk.green`Diagonal Found`);
//   return true;
// }

function checkBoardWin(board: [number, boolean][][]) {
  for (const row of board) {
    if (!row.some(i => !i[1])) return true;
  }
  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    if (!board.map(i => i[colIndex]).some(i => !i[1])) return true;
  }
  // if (checkDiagonal(board, 1, 1, 0, 0)) return true;
  // if (checkDiagonal(board, -1, 1, board.length - 1, 0)) return true;
  // if (checkDiagonal(board, -1, -1, board.length - 1, board.length - 1)) return true;
  // if (checkDiagonal(board, 1, -1, 0, board.length - 1)) return true;
  return false;
}

function processBoard(board: [number, boolean][][], number: number, boardNumber: number) {
  for (const row of board) {
    for (const colInd in row) {
      if (row[colInd][0] === number) {
        row[colInd][1] = true;
      }
    }
  }
  displayBoard(board, boardNumber);
  return checkBoardWin(board);
}

export function Part1() {
  const { numbers, boards } = loadData();
  let winningBoard: [number, boolean][][] | undefined;
  let winningNumber: number | undefined;
  n: for (const number of numbers) {
    console.log(chalk.gray`-----`);
    let boardN = 0;
    for (const board of boards) {
      if (processBoard(board, number, boardN)) {
        console.log(chalk.green`Board ${boardN + 1} wins!`);
        winningBoard = board;
        winningNumber = number;
        break n;
      }
      boardN++;
    }
  }
  if (winningBoard && winningNumber) {
    let winningBoardScore = winningBoard
      .flat()
      .filter(i => !i[1])
      .reduce((a, b) => a + b[0], 0);
    console.log(chalk.blue.bold`Score: ${winningBoardScore}`);
    console.log(chalk.blue.bold`Number: ${winningNumber}`);
    console.log(chalk.blue.bold`Answer: ${winningBoardScore * winningNumber}`);
  } else {
    console.log(chalk.red.bold`No winning board found.`);
  }
}

export function Part2() {
  const { numbers, boards } = loadData();
  let winningBoard: [number, boolean][][] | undefined;
  let winningNumber: number | undefined;
  const completedBoards = new Set<number>();
  n: for (const number of numbers) {
    console.log(chalk.gray`-----`);
    let boardN = 0;
    for (const board of boards) {
      if (completedBoards.has(boardN)) {
        boardN++; continue;
      }
      if (processBoard(board, number, boardN)) {
        if (boards.filter((_, i) => !completedBoards.has(i)).length === 1) {
          winningNumber = number;
          winningBoard = board;
          break n;
        }
        completedBoards.add(boardN);
      }
      boardN++;
    }
  }
  if (winningBoard && winningNumber) {
    let winningBoardScore = winningBoard
      .flat()
      .filter(i => !i[1])
      .reduce((a, b) => a + b[0], 0);
    console.log(chalk.blue.bold`Score: ${winningBoardScore}`);
    console.log(chalk.blue.bold`Number: ${winningNumber}`);
    console.log(chalk.blue.bold`Answer: ${winningBoardScore * winningNumber}`);
  } else {
    console.log(chalk.red.bold`No winning board found.`);
  }
}
