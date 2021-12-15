import fs from "fs";
import chalk from "chalk";
import { adjacentPositionsWithoutDiagonals } from "../utils";

type Data = number[][];

function loadData(): Data {
  const input: number[][] = fs
    .readFileSync("./inputs/15.txt", "utf8")
    .trim()
    .split("\n")
    .map(i =>
      i
        .trim()
        .split("")
        .map(j => Number(j.trim()))
    );
  return input;
}

function renderGrid(grid: Data) {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[y].length; x++) {
      line += chalk["white"](grid[y][x].toString());
    }
    console.log(line);
  }
  console.log(chalk.gray("------"));
}

type Path = [number, string[]];

function nextMove(path: Path, grid: Data): Path | null {
  const [x, y] = path[1][0].split(",").map(i => Number(i));
  console.log(path);
  for (let i = 0; i < 1000000; i++) { }

  const options: Path[] = [];
  for (const [ax, ay] of adjacentPositionsWithoutDiagonals(grid, x, y)) {
    const aKey = `${ax},${ay}`;
    if (!path[1].includes(aKey)) {
      if (aKey === `${grid[0].length - 1},${grid.length - 1}`) {
        return [path[0] + grid[ax][ay], [aKey, ...path[1]]];
      } else {
        const nm = nextMove([path[0] + grid[ax][ay], [aKey, ...path[1]]], grid);
        if (nm) {
          options.push(nm);
        }
      }
    }
  }
  let bestOption: Path = options[0];
  if (options.length === 0) return null;
  for (const option of options) {
    if (option[0] > bestOption[0]) {
      bestOption = option;
    }
  }
  return bestOption;
}


export function Part1() {
  const grid = loadData();
  // const bestPaths = new Map<string, Path>();

  const answer = nextMove([0, ["0,0"]], grid);

  console.log(answer);

  renderGrid(grid);

  console.log(chalk.red.bold`Answer: ${0}`);
}
