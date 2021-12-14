import fs from "fs";
import chalk from "chalk";

function loadData(): number[] {
  const numbers: number[] = fs
    .readFileSync("./inputs/7.txt", "utf8")
    .trim()
    .split(",")
    .map(i => Number(i));
  return numbers;
}

function calcFuel(from: number, to: number): number {
  const diff = Math.abs(to - from);
  return (diff * (diff + 1)) / 2;
  // const diff = Math.abs(to - from);
  // let fuel = 0;
  // for (let i = 0; i < diff; i++) {
  //   fuel += i + 1;
  // }
  // return fuel
}

export function Part1() {
  const numbers = loadData();
  let leastFuel = Infinity;
  let minNum = Math.min(...numbers);
  let maxNum = Math.max(...numbers);
  for (let i = minNum; i <= maxNum; i++) {
    const fuel = numbers.reduce((a, b) => a + Math.abs(b - i), 0);
    if (fuel < leastFuel) {
      leastFuel = fuel;
    }
  }
  console.log(chalk.red.bold`Minimum Fuel Required: ${leastFuel}.`);
}

export function Part2() {
  const numbers = loadData();
  let leastFuel = Infinity;
  let minNum = Math.min(...numbers);
  let maxNum = Math.max(...numbers);
  for (let i = minNum; i <= maxNum; i++) {
    const fuel = numbers.reduce((a, b) => a + calcFuel(b, i), 0);
    if (fuel < leastFuel) {
      leastFuel = fuel;
    }
  }
  console.log(chalk.red.bold`Minimum Fuel Required: ${leastFuel}.`);
}
