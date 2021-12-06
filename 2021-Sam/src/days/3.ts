import fs from "fs";
import chalk from "chalk";

function loadLines() {
  const lines: boolean[][] = fs
    .readFileSync("./inputs/3.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.trim().split("").map(i => i === "1"));
  return lines;
}

export function Part1() {
  const lines = loadLines();
  const columns = new Array(lines[0].length).fill(0).map((_, i) => lines.map(line => line[i]));
  let epsilon = 0;
  let gamma = 0;
  let i = columns.length - 1;
  for (const column of columns) {
    if (column.filter(i => i).length > column.filter(i => !i).length) {
      gamma += 2 ** i;
    } else {
      epsilon += 2 ** i;
    }
    i--;
  }
  console.log(chalk.blue.bold`Gamma: ${gamma}`);
  console.log(chalk.blue.bold`Epsilon: ${epsilon}`);
  console.log(chalk.blue.bold`Answer: ${gamma * epsilon}`);
}

function Part2Rating(max: boolean) {
  let lines = loadLines();
  for (let bit = 0; bit < lines[0].length && lines.length !== 1; bit++) {
    const column = lines.map(line => line[bit]);
    const ones = column.filter(i => i).length;
    const zeros = column.filter(i => !i).length;
    if (ones >= zeros) {
      lines = lines.filter(i => i[bit] === max);
    } else {
      lines = lines.filter(i => i[bit] !== max);
    }
  }
  return parseInt(lines[0].map(i => i ? "1" : "0").join(""), 2);
}

export function Part2() {
  const oxygen = Part2Rating(true);
  const co2 = Part2Rating(false);
  console.log(chalk.blue.bold`Oxygen: ${oxygen}`);
  console.log(chalk.blue.bold`CO2: ${co2}`);
  console.log(chalk.blue.bold`Answer: ${oxygen * co2}`);
}
