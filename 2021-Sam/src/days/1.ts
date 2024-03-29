import fs from "fs";
import chalk from "chalk";

export function Part1() {
  const lines = fs
    .readFileSync("./inputs/1.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => Number(i.trim()));
  const outputData: [number, 0 | 1 | 2][] = [];
  let up = 0;
  let down = 0;
  outputData.push([lines[0], 0]);
  for (let lineN = 1; lineN < lines.length; lineN++) {
    const prev = lines[lineN - 1];
    const curr = lines[lineN];
    if (curr > prev) {
      outputData.push([curr, 1]);
      up++;
    } else {
      outputData.push([curr, 2]);
      down++;
    }
  }
  fs.writeFileSync("./outputs/1-1.json", JSON.stringify(outputData));
  console.log(chalk.blue`Up: ${up}`);
  console.log(chalk.blue`Down: ${down}`);
}

export function Part2() {
  const lines = fs
    .readFileSync("./inputs/1.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => Number(i.trim()));
  let up = 0;
  let down = 0;
  for (let lineN = 3; lineN < lines.length; lineN++) {
    const prev = lines.slice(lineN - 3, lineN);
    const curr = lines.slice(lineN - 2, lineN + 1);
    if (curr.reduce((a, b) => a + b, 0) > prev.reduce((a, b) => a + b, 0)) {
      up++;
    } else {
      down++;
    }
  }
  console.log(chalk.blue`Up: ${up}`);
  console.log(chalk.blue`Down: ${down}`);
}
