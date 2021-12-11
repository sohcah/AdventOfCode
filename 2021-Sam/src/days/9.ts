import fs from "fs";
import chalk from "chalk";

function loadData(): number[][] {
  const values: number[][] = fs
    .readFileSync("./inputs/9.txt", "utf8")
    .trim()
    .split("\n")
    .map(i =>
      i
        .trim()
        .split("")
        .map(j => Number(j))
    );
  return values;
}

export function Part1() {
  const grid = loadData();
  // const letters = loadLetterData(numbers);
  const lowest = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        (grid[i + 1]?.[j] ?? Infinity) > grid[i][j] &&
        (grid[i]?.[j + 1] ?? Infinity) > grid[i][j] &&
        (grid[i]?.[j - 1] ?? Infinity) > grid[i][j] &&
        (grid[i - 1]?.[j] ?? Infinity) > grid[i][j]
      ) {
        lowest.push(grid[i][j]);
      }
    }
  }

  console.log(chalk.red.bold`Answer: ${lowest.reduce((a, b) => a + b + 1, 0)}`);
}

export function Part2() {
  const grid = loadData().map(i => i.map(j => [j, j === 9 ? -1 : 0])) as [value: number, basin: number][][];

  let latest = 1;
  const basinPositions: { [key: number]: [number, number]} = {};
  while (grid.some(i => i.some(j => j[1] === 0))) {
    for (let i = 0; i < grid.length; i++) {
      oo: for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j][1] !== 0) continue;
        if (
          (grid[i + 1]?.[j]?.[0] ?? Infinity) > grid[i][j][0] &&
          (grid[i]?.[j + 1]?.[0] ?? Infinity) > grid[i][j][0] &&
          (grid[i]?.[j - 1]?.[0] ?? Infinity) > grid[i][j][0] &&
          (grid[i - 1]?.[j]?.[0] ?? Infinity) > grid[i][j][0]
        ) {
          grid[i][j][1] = latest;
          basinPositions[latest] = [i, j];
          latest++;
          continue;
        }
        for (let [i2, j2] of [
          [1, 0],
          [0, 1],
          [-1, 0],
          [0, -1],
        ]) {
          if ((grid[i + i2]?.[j + j2]?.[1] ?? 0) !== 0 && (grid[i + i2]?.[j + j2]?.[0] ?? 0) < grid[i][j][0]) {
            grid[i][j][1] = grid[i + i2][j + j2][1];
            continue oo;
          }
        }
      }
    }
  }
  
  const basins = grid.flat(1).reduce((a, b) => {
    if(b[1] === -1) return a;
    return {
      ...a,
      [b[1]]: [...(a[b[1]] ?? []), b[0]],
    }
  }, {} as { [key: number]: number[] });
  
  const basinsCount = Object.entries(basins).map(i => i[1].length).sort((a, b) => b - a);

  let i1 = 0;
  for (const row of grid) {
    let output = "";
    let j1 = 0;
    for (const [val, basin] of row) {
      if (basin === -1) {
        output += chalk.gray(val.toString());
      } else {
        const [i, j] = basinPositions[basin];
        if (i1 === i && j1 === j) {
          // console.log(i, j, i1, j1);
          output += chalk.black.bgHsv((grid.length - i) * j, 50, 100)(val.toString());
        } else {
          output += chalk.hsv((grid.length - i) * j, 50, 100)(val.toString());
        }
      }
      j1++;
    }
    console.log(output);
    i1++;
    // console.log(row.map(i => chalk[i[1] === -1 ? "gray" : (["blue", "green", "red", "cyan", "yellow", "magenta", "blueBright"] as const)[i[1] % 5]]`${i[0]}`).join(""))
  }

  console.log(chalk.red.bold`Answer: ${basinsCount.slice(0,3).reduce((a, b) => a * b, 1)}`);
}
