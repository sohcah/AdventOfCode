import fs from "fs";
import chalk from "chalk";

type Data = [string, string[]];

function loadData(): Data {
  const input: string[] = fs.readFileSync("./inputs/20.txt", "utf8").trim().split("\n\n");
  return [input[0], input[1].split("\n").map(i => i.trim())];
}

export function Part1() {
  const [alg, img] = loadData();

  console.log(alg, img);

  let grid: number[][] = [];
  for (let i = 0; i < img.length + 10; i++) {
    grid.push([]);
    for (let j = 0; j < img[0].length + 10; j++) {
      grid[i].push(img[i - 5]?.[j - 5] === "#" ? 1 : 0);
    }
  }

  console.log(grid.map(i => i.map(j => (j ? "#" : ".")).join("")).join("\n"));
  console.log("----");

  for (let step = 0; step < 2; step++) {
    let newGrid: number[][] = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push([]);
      for (let j = 0; j < grid[i].length; j++) {
        let bin = "";
        for (let i2 = -1; i2 <= 1; i2++) {
          for (let j2 = -1; j2 <= 1; j2++) {
            const v =
              grid[i + i2]?.[j + j2] ?? grid[i + i2]?.[j] ?? grid[i]?.[j + j2] ?? grid[i]?.[j];
            bin += v ? "1" : "0";
          }
        }
        newGrid[i].push(alg[parseInt(bin, 2)] === "#" ? 1 : 0);
      }
    }
    grid = newGrid;
    console.log(grid.map(i => i.map(j => (j ? "#" : ".")).join("")).join("\n"));
    console.log("----");
  }

  console.log(chalk.red.bold`Answer: ${grid.flat().filter(i => i === 1).length}`);
}

export function Part2() {
  const [alg, img] = loadData();

  console.log(alg, img);

  let grid: number[][] = [];
  for (let i = 0; i < img.length + 102; i++) {
    grid.push([]);
    for (let j = 0; j < img[0].length + 102; j++) {
      grid[i].push(img[i - 51]?.[j - 51] === "#" ? 1 : 0);
    }
  }

  console.log(grid.map(i => i.map(j => (j ? "#" : ".")).join("")).join("\n"));
  console.log("----");
  
  for (let step = 0; step < 50; step++) {
    let newGrid: number[][] = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push([]);
      for (let j = 0; j < grid[i].length; j++) {
        let bin = "";
        for (let i2 = -1; i2 <= 1; i2++) {
          for (let j2 = -1; j2 <= 1; j2++) {
            const v =
              grid[i + i2]?.[j + j2] ?? grid[i + i2]?.[j] ?? grid[i]?.[j + j2] ?? grid[i]?.[j];
            bin += v ? "1" : "0";
          }
        }
        newGrid[i].push(alg[parseInt(bin, 2)] === "#" ? 1 : 0);
      }
    }
    grid = newGrid;
    console.log(grid.map(i => i.map(j => (j ? "#" : ".")).join("")).join("\n"));
    console.log("----");
  }

  console.log(chalk.red.bold`Answer: ${grid.flat().filter(i => i === 1).length}`);
}
