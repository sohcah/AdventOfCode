import fs from "fs";
import chalk from "chalk";

function loadData(): {
  numbers: number[];
  boards: number[][][];
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
            .map(k => Number(k.trim()))
        )
    );
  return { numbers, boards };
}

function displayBoard(called: Set<number>, board: number[][], n: number) {
  console.log(chalk.blue`Board ${n + 1}`);
  for (const row of board) {
    let rowOutput = "";
    for (let col of row) {
      rowOutput += called.has(col)
        ? chalk.green(col.toString().padStart(4, " "))
        : chalk.red(col.toString().padStart(4, " "));
    }
    console.log(rowOutput);
  }
}

function checkBoardWin(called: Set<number>, board: number[][]) {
  for (const row of board) {
    if (!row.some(i => !called.has(i))) return true;
  }
  for (let colIndex = 0; colIndex < board.length; colIndex++) {
    if (!board.map(i => i[colIndex]).some(i => !called.has(i))) return true;
  }
  return false;
}

function processBoard(called: Set<number>, board: number[][], boardNumber: number) {
  displayBoard(called, board, boardNumber);
  return checkBoardWin(called, board);
}

export function Part1() {
  const { numbers, boards } = loadData();
  let winningBoard: number[][] | undefined;
  let winningNumber: number | undefined;
  const called = new Set<number>();
  n: for (const number of numbers) {
    console.log(chalk.gray`----- ${number} Called -----`);
    called.add(number);
    let boardN = 0;
    for (const board of boards) {
      if (processBoard(called, board, boardN)) {
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
      .filter(i => !called.has(i))
      .reduce((a, b) => a + b, 0);
    console.log(chalk.blue.bold`Score: ${winningBoardScore}`);
    console.log(chalk.blue.bold`Number: ${winningNumber}`);
    console.log(chalk.blue.bold`Answer: ${winningBoardScore * winningNumber}`);
  } else {
    console.log(chalk.red.bold`No winning board found.`);
  }
}

export function Part2() {
  const { numbers, boards } = loadData();
  let winningBoard: number[][] | undefined;
  let winningNumber: number | undefined;
  const completedBoards = new Set<number>();
  const called = new Set<number>();
  n: for (const number of numbers) {
    console.log(chalk.gray`----- ${number} Called -----`);
    called.add(number);
    let boardN = 0;
    for (const board of boards) {
      if (completedBoards.has(boardN)) {
        boardN++; continue;
      }
      if (processBoard(called, board, boardN)) {
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
      .filter(i => !called.has(i))
      .reduce((a, b) => a + b, 0);
    console.log(chalk.blue.bold`Score: ${winningBoardScore}`);
    console.log(chalk.blue.bold`Number: ${winningNumber}`);
    console.log(chalk.blue.bold`Answer: ${winningBoardScore * winningNumber}`);
  } else {
    console.log(chalk.red.bold`No winning board found.`);
  }
}
