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

export function Part1() {
  const grid = loadData();
  const bestPaths = new Map<string, Path>();

  const queue: string[] = [];

  for (let x = grid[0].length - 1; x >= 0; x--) {
    for (let y = grid.length - 1; y >= 0; y--) {
      const key = `${x},${y}`;
      queue.unshift(key);
    }
  }

  while (queue.length > 0) {
    const key = queue.pop()!;
    console.log(key);
    const [x, y] = key.split("__")[0].split(",").map(i => Number(i));

    let bestPathOptions: Path[] | null = [];
    for (const [ax, ay] of adjacentPositionsWithoutDiagonals(grid, x, y, false)) {
      const aKey = `${ax},${ay}`;
      if (key.split("__").slice(1).join("__").includes(aKey)) continue;
      if (aKey === `${grid[0].length - 1},${grid.length - 1}`) {
        bestPathOptions.push([grid[x][y] + grid[ax][ay], [key, aKey]]);
      } else if (bestPaths.has(aKey) || bestPaths.has(`${aKey}__${x},${y}`)) {
        const path = bestPaths.get(aKey) ?? bestPaths.get(`${aKey}__${x},${y}`)!;
        bestPathOptions.push([path[0] + grid[x][y], [key, ...path[1]]]);
      } else {
        const pastKey = key.split("__").slice(1).join("__");
        console.log(pastKey);
        console.log(`No ${aKey}, trying ${aKey}${pastKey ? `__${pastKey}` : ""}__${x},${y}`);
        queue.push(key, `${aKey}${pastKey ? `__${pastKey}` : ""}__${x},${y}`);
        bestPathOptions = null;
        break;
      }
    }
    if (bestPathOptions) {
      let bestOption = bestPathOptions[0];
      for (const bestPathOption of bestPathOptions) {
        if(bestOption[0] > bestPathOption[0]) {
          bestOption = bestPathOption;
        }
      }
      bestPaths.set(key, bestOption);
      if (x === 0 && y === 0) {
        console.log(bestOption);
        break;
      }
    }
  }

  renderGrid(grid);

  console.log(chalk.red.bold`Answer: ${0}`);
}
