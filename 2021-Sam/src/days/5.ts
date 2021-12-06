import fs from "fs";
import chalk from "chalk";

function loadData(): [[number, number], [number, number]][] {
  const lines: [[number, number], [number, number]][] = fs
    .readFileSync("./inputs/5.txt", "utf8")
    .trim()
    .split("\n")
    .map(
      i =>
        i
          .trim()
          .split("->")
          .map(
            j =>
              j
                .trim()
                .split(",")
                .map(k => Number(k)) as [number, number]
          ) as [[number, number], [number, number]]
    );
  return lines;
}

function drawLine(data: Map<string, number>, line: [[number, number], [number, number]]): void {
  const xDiff = line[1][0] - line[0][0];
  const yDiff = line[1][1] - line[0][1];
  const xMult = xDiff === 0 ? 0 : xDiff / Math.abs(xDiff);
  const yMult = yDiff === 0 ? 0 : yDiff / Math.abs(yDiff);
  for (let i = 0; i <= Math.max(Math.abs(xDiff), Math.abs(yDiff)); i++) {
    const x = line[0][0] + i * xMult;
    const y = line[0][1] + i * yMult;
    const key = `${x},${y}`;
    data.set(key, (data.get(key) ?? 0) + 1);
  }
}

export function Part1() {
  const lines = loadData();
  let data = new Map<string, number>();
  for (const line of lines) {
    if (line[0][0] === line[1][0] || line[0][1] === line[1][1]) {
      drawLine(data, line);
    }
  }
  let output = "";
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const key = `${x},${y}`;
      const value = data.get(key) ?? 0;
      if (value >= 2) {
        output += chalk.red`${value}`;
      } else if (value === 1) {
        output += chalk.green`${value}`;
      } else {
        output += chalk.gray`${value}`;
      }
    }
    output += "\n";
  }
  console.log(output);
  console.log(chalk.red.bold`${[...data.values()].filter(i => i >= 2).length} overlaps.`);
}


export function Part2() {
  const lines = loadData();
  let data = new Map<string, number>();
  for (const line of lines) {
    drawLine(data, line);
  }
  let output = "";
  for (let y = 0; y < 20; y++) {
    for (let x = 0; x < 20; x++) {
      const key = `${x},${y}`;
      const value = data.get(key) ?? 0;
      if (value >= 2) {
        output += chalk.red`${value}`;
      } else if (value === 1) {
        output += chalk.green`${value}`;
      } else {
        output += chalk.gray`${value}`;
      }
    }
    output += "\n";
  }
  console.log(output);
  console.log(chalk.red.bold`${[...data.values()].filter(i => i >= 2).length} overlaps.`);
}
