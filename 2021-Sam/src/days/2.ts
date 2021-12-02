import fs from "fs";
import chalk from "chalk";

type Instruction = [instruction: "forward" | "down" | "up", steps: number];

function loadInstructions() {
  const instructions: Instruction[] = fs
    .readFileSync("./inputs/2.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.trim().split(" "))
    .map(i => [i[0] as Instruction[0], Number(i[1])]);
  return instructions;
}

export function Part1() {
  const instructions = loadInstructions();
  let depth = 0;
  let distance = 0;
  for (const instruction of instructions) {
    if (instruction[0] === "up") {
      depth -= instruction[1];
    } else if (instruction[0] === "down") {
      depth += instruction[1];
    } else if (instruction[0] === "forward") {
      distance += instruction[1];
    }
  }
  console.log(chalk.blue`Depth: ${depth}`);
  console.log(chalk.blue`Distance: ${distance}`);
  console.log(chalk.blue.bold`Answer: ${depth * distance}`);
}

export function Part2() {
  const instructions = loadInstructions();
  let aim = 0;
  let depth = 0;
  let distance = 0;
  for (const instruction of instructions) {
    if (instruction[0] === "up") {
      aim -= instruction[1];
    } else if (instruction[0] === "down") {
      aim += instruction[1];
    } else if (instruction[0] === "forward") {
      distance += instruction[1];
      depth += instruction[1] * aim;
    }
  }
  console.log(chalk.blue`Depth: ${depth}`);
  console.log(chalk.blue`Distance: ${distance}`);
  console.log(chalk.blue.bold`Answer: ${depth * distance}`);
}
