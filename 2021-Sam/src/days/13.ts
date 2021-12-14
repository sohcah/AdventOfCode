import fs from "fs";
import chalk from "chalk";
import { range } from "../utils";

type Data = {
  points: [number, number][];
  folds: ["x" | "y", number][];
};

function loadData(): Data {
  const input: string[][] = fs
    .readFileSync("./inputs/13.txt", "utf8")
    .trim()
    .split("\n\n")
    .map(i => i.trim().split("\n"));
  const points = input[0].map(
    (i, x) => i.split(",").map(j => Number(j.trim())) as [number, number]
  );
  const folds = input[1]
    .map(i => i.slice("fold along ".length).split("="))
    .map(i => [i[0].trim(), Number(i[1].trim())] as ["x" | "y", number]);

  return { points, folds };
}

function displayGridPoints(points: [number, number][]): void {
  const maxX = Math.max(...points.map(i => i[0]));
  const maxY = Math.max(...points.map(i => i[1]));
  if (maxX > 50 || maxY > 50) {
    return;
  }
  for (const y of range(0, maxY + 1, 1)) {
    for (const x of range(0, maxX + 1, 1)) {
      const point = points.find(i => i[0] === x && i[1] === y);
      if (point) {
        process.stdout.write(chalk.green("##"));
      } else {
        process.stdout.write("  ");
      }
    }
    console.log("");
  }
}

function handleFold(points: [number, number][], fold: ["x" | "y", number]): [number, number][] {
  console.log(chalk.gray`Fold ${fold[0]}=${fold[1]}`);
  if (fold[0] === "x") {
    return points.map(i => {
      if (i[0] >= fold[1]) {
        return [2 * fold[1] - i[0], i[1]];
      }
      return i;
    });
  } else {
    return points.map(i => {
      if (i[1] >= fold[1]) {
        return [i[0], 2 * fold[1] - i[1]];
      }
      return i;
    });
  }
}

export function Part1() {
  const data = loadData();
  let points = data.points;
  const folds = data.folds;

  displayGridPoints(points);
  points = handleFold(points, folds[0]);
  displayGridPoints(points);

  console.log(chalk.red.bold`Answer: ${new Set(points.map(i => i.join(","))).size}`);
}

export function Part2() {
  const data = loadData();
  let points = data.points;
  const folds = data.folds;

  displayGridPoints(points);
  for (const fold of folds) {
    points = handleFold(points, fold);
    displayGridPoints(points);
  }

  console.log(chalk.red.bold`Answer: No copy-pasting today. Read the text above.`);
}
