import fs from "fs";
import chalk from "chalk";
import { adjacentPositions, gridPositions } from "../utils";

type Data = number[][];

function loadData(): Data {
  const values: Data = fs
    .readFileSync("./inputs/11.txt", "utf8")
    .trim()
    .split("\n")
    .map(i =>
      i
        .trim()
        .split("")
        .map(j => Number(j.trim()))
    );
  return values;
}

// display grid function
function displayGrid(grid: number[][]): void {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      process.stdout.write(grid[i][j] === 0 ? chalk.yellow.bold("0") : chalk.white(grid[i][j].toString()))
    }
    console.log();
  }
  console.log(chalk.gray`--------------------------------`);
}

export function Part1() {
  const grid = loadData();

  let flashes = 0;

  for (let step = 0; step < 100; step++) {
    // Initial Increment
    for (const [i, j] of gridPositions(grid)) {
      grid[i][j]++;
    }

    // Check for Flashes
    const flashed = new Set<string>();
    let flashesInRound = true;
    while (flashesInRound) {
      flashesInRound = false;
      for (const [i, j] of gridPositions(grid)) {
        const key = `${i},${j}`;
        if (grid[i][j] > 9 && !flashed.has(key)) {
          flashes++;
          flashesInRound = true;
          flashed.add(key);
          for (const [i1, j1] of adjacentPositions(grid, i, j)) {
            grid[i1][j1]++;
          }
        }
      }
    }

    for (const [i, j] of gridPositions(grid)) {
      if (grid[i][j] > 9) {
        grid[i][j] = 0;
      }
    }
    displayGrid(grid);
  }

  console.log(chalk.red.bold`Answer: ${flashes}`);
}

export function Part2() {
  const grid = loadData();

  let flashes = 0;
  let answer = -1;

  for (let step = 0; step < 10000; step++) {
    // Initial Increment
    for (const [i, j] of gridPositions(grid)) {
      grid[i][j]++;
    }

    // Check for Flashes
    const flashed = new Set<string>();
    let flashesInRound = true;
    while (flashesInRound) {
      flashesInRound = false;
      for (const [i, j] of gridPositions(grid)) {
        const key = `${i},${j}`;
        if (grid[i][j] > 9 && !flashed.has(key)) {
          flashes++;
          flashesInRound = true;
          flashed.add(key);
          for (const [i1, j1] of adjacentPositions(grid, i, j)) {
            grid[i1][j1]++;
          }
        }
      }
    }

    for (const [i, j] of gridPositions(grid)) {
      if (grid[i][j] > 9) {
        grid[i][j] = 0;
      }
    }
    displayGrid(grid);
    if (flashed.size === grid.length * grid[0].length) {
      answer = step + 1;
      break;
    }
  }

  console.log(chalk.red.bold`Flashes: ${flashes}`);
  console.log(chalk.red.bold`Answer: ${answer}`);
}
