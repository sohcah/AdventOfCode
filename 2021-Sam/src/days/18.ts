import fs from "fs";
import chalk from "chalk";

type SnailfishNum = number | [SnailfishNum, SnailfishNum];

function loadData(): SnailfishNum[] {
  const input: SnailfishNum[] = fs
    .readFileSync("./inputs/18.txt", "utf8")
    .trim()
    .split("\n")
    .map(i => JSON.parse(i));
  return input;
}

function addToLeft(num: SnailfishNum, value?: number): SnailfishNum {
  if (!value) return num;
  if (typeof num === "number") {
    return num + value;
  } 
  return [addToLeft(num[0], value), num[1]];
}

function addToRight(num: SnailfishNum, value?: number): SnailfishNum {
  if (!value) return num;
  if (typeof num === "number") {
    return num + value;
  }
  return [num[0], addToRight(num[1], value)];
}

function explodeDeep(
  num: SnailfishNum,
  depth: number = 0
): [number: SnailfishNum, didExplode: boolean, left?: number, right?: number] {
  if (typeof num === "number") {
    return [num, false];
  }
  const resultA = explodeDeep(num[0], depth + 1);
  if (resultA[1]) {
    return [[resultA[0], addToLeft(num[1], resultA[3])], true, resultA[2]];
  }
  const resultB = explodeDeep(num[1], depth + 1);
  if (resultB[1]) {
    return [[addToRight(resultA[0], resultB[2]), resultB[0]], true, undefined, resultB[3]];
  }
  if (depth >= 4 && typeof num[0] === "number" && typeof num[1] === "number") {
    return [0, true, num[0], num[1]];
  }
  return [num, false];
}

function splitDeep(num: SnailfishNum, depth: number = 0): [SnailfishNum, boolean] {
  if (typeof num === "number") {
    if (num >= 10) {
      return [[Math.floor(num / 2), Math.ceil(num / 2)], true];
    }
    return [num, false];
  }
  const resultA = splitDeep(num[0], depth + 1);
  if (resultA[1]) {
    return [[resultA[0], num[1]], true];
  }
  const resultB = splitDeep(num[1], depth + 1);
  if (resultB[1]) {
    return [[num[0], resultB[0]], true];
  }
  return [num, false];
}

function reduceSnailfishNumbers(num: SnailfishNum): SnailfishNum {
  while (true) {
    const [nextNum, didExplode] = explodeDeep(num);
    if (didExplode) {
      num = nextNum;
      continue;
    }

    const [nextNum2, didSplit] = splitDeep(num);
    if (didSplit) {
      num = nextNum2;
      continue;
    }
    break;
  }
  return num;
}

function calculateMagnitude(num: SnailfishNum): number {
  if (typeof num === "number") {
    return num;
  }
  return 3 * calculateMagnitude(num[0]) + 2 * calculateMagnitude(num[1]);
}

export function Part1() {
  const data = loadData();

  const sum = data.reduce((a, b) => {
    console.log(JSON.stringify(a));
    return reduceSnailfishNumbers([a, b]);
  });

  console.log(chalk.blue(JSON.stringify(sum)));

  console.log(chalk.red.bold`Answer: ${calculateMagnitude(sum)}`);
}

export function Part2() {
  const data = loadData();
  let highestMag: [number, SnailfishNum] = [0, 0];

  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data.length; y++) {
      if (x === y) continue;
      const num = reduceSnailfishNumbers([data[x], data[y]]);
      const mag = calculateMagnitude(num);
      if (mag > highestMag[0]) {
        highestMag = [mag, num];
      }
    }
  }

  console.log(JSON.stringify(highestMag[1]));

  console.log(chalk.red.bold`Answer: ${highestMag[0]}`);
}
