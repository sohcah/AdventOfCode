import chalk from "chalk";
import fs from "fs";
import { gridPositions } from "../utils";

type Data = SeaCucumberType[][];
enum SeaCucumberType {
  Empty = ".",
  East = ">",
  South = "v",
}

function loadData(): Data {
  const lines: string[] = fs.readFileSync("./inputs/25.txt", "utf8").trim().split("\n");
  return lines.map(i => i.split("") as SeaCucumberType[]);
}

// function renderGrid(grid: SeaCucumberType[][]) {
//   for (let y = 0; y < grid.length; y++) {
//     let line = ""
//     for (let x = 0; x < grid[y].length; x++) {
//       line +=grid[y][x] === SeaCucumberType.Empty ? "." : chalk.green(grid[y][x]);
//     }
//     console.log(line);
//   }
//   console.log(chalk.gray`----`);
// }

export function Part1() {
  let grid = loadData();

  // console.log(grid);

  // renderGrid(grid);

  let answer = -1;

  const height = grid.length;
  const width = grid[0].length;

  for (let step = 0; step < 1000; step++) {
    let moved = false;
    let newGrid = grid.map(i => i.slice());
    for (const [i, j] of gridPositions(grid)) {
      if (grid[i][j] === SeaCucumberType.East && grid[i][(j + 1) % width] === SeaCucumberType.Empty) {
        newGrid[i][(j + 1) % width] = SeaCucumberType.East;
        newGrid[i][j] = SeaCucumberType.Empty;
        moved = true;
      }
    }
    grid = newGrid;
    newGrid = grid.map(i => i.slice());
    for (const [i, j] of gridPositions(grid)) {
      if (grid[i][j] === SeaCucumberType.South && grid[(i + 1) % height]?.[j] === SeaCucumberType.Empty) {
        newGrid[(i + 1) % height][j] = SeaCucumberType.South;
        newGrid[i][j] = SeaCucumberType.Empty;
        moved = true;
      }
    }
    grid = newGrid;
    if (!moved) {
      answer = step + 1;
      break;
    }
    // renderGrid(grid);
  }
  
  console.log(chalk.green`Answer: ${answer}`);
}

export function Part2() {
  console.log("Hopefully there is no part 2... ");
}
