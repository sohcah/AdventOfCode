import fs from "fs";
import chalk from "chalk";

function loadData(): string[] {
  const values: string[] = fs
    .readFileSync("./inputs/10.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => i.trim());
  return values;
}

const startBrackets: {[key: string]: string} = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
}

const endBrackets: {[key: string]: string} = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
}

const bracketValues: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const bracketAutocompleteValues: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function validateBrackets(input: string): [invalidChar: string | null, stack: string[]] {
  const stack: string[] = [];
  for (let char of input) {
    if (startBrackets[char]) {
      stack.unshift(char);
    } else if (endBrackets[char]) {
      if (endBrackets[char] !== stack[0]) {
        return [char, stack];
      }
      stack.shift()
    }
  }
  return [null, stack];
}

export function Part1() {
  const entries = loadData();

  let score = 0;

  for (const entry of entries) {
    const [invalidChar] = validateBrackets(entry);
    if (invalidChar) {
      console.log(chalk.red(invalidChar));
      score += bracketValues[invalidChar];
    }
  }

  console.log(chalk.red.bold`Answer: ${score}`);
}

export function Part2() {
  const entries = loadData();

  const scores = [];

  for (const entry of entries) {
    const [invalidChar, stack] = validateBrackets(entry);
    if (!invalidChar) {
      let points = 0;
      for (const char of stack) {
        points *= 5;
        points += bracketAutocompleteValues[startBrackets[char]];
      }
      scores.push(points);
      console.log(chalk.red(stack.join("")), points);
    }
  }
  scores.sort((a, b) => a - b);

  console.log(chalk.red.bold`Answer: ${scores[(scores.length - 1) / 2]}`);
}
