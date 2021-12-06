import fs from "fs";
import chalk from "chalk";

function loadData(): number[] {
  const numbers: number[] = fs
    .readFileSync("./inputs/6.txt", "utf8")
    .trim()
    .split(",")
    .map(i => Number(i));
  return numbers;
}

export function Part1() {
  const numbers = loadData();
  let currLanternFish: number[] = numbers.slice();
  let nextLanternFish: number[] = [];
  for (let i = 0; i < 80; i++) {
    for (const lanternFish of currLanternFish) {
      if (lanternFish <= 0) {
        nextLanternFish.push(6, 8);
      } else {
        nextLanternFish.push(lanternFish - 1);
      }
    }
    currLanternFish = nextLanternFish;
    nextLanternFish = [];
  }
  console.log(chalk.red.bold`${currLanternFish.length} remaining after 80 days.`);
}

export function Part2() {
  const numbers = loadData();
  let currLanternFish: number[] = new Array(9)
    .fill(0)
    .map((_, n) => numbers.filter(i => i === n).length);
  let nextLanternFish: number[] = new Array(9).fill(0);
  for (let i = 0; i < 256; i++) {
    nextLanternFish[6] += currLanternFish[0];
    nextLanternFish[8] += currLanternFish[0];
    for (let j = 0; j < 8; j++) {
      nextLanternFish[j] += currLanternFish[j + 1];
    }

    currLanternFish = nextLanternFish;
    nextLanternFish = new Array(9).fill(0);
    console.log(
      chalk.gray`${currLanternFish.reduce((a, b) => a + b, 0)} remaining after ${i + 1} days.`
    );
  }
  console.log(
    chalk.red.bold`${currLanternFish.reduce((a, b) => a + b, 0)} remaining after 256 days.`
  );
}
