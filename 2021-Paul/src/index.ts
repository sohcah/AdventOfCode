import chalk from "chalk";
import { performance } from "perf_hooks";

const day = process.argv[2];
if (!day) {
  console.log(chalk`{red Invalid command, please specify a day:}\n{green yarn start <day> [part]}`);
  process.exit(1);
}
const part = process.argv[3];
const f = require(`./days/${day}`);

if ((f?.["Part1"] && part === "1") || !part) {
  console.log(chalk.bold.green`\nStarting Day ${day} - Part 1\n`);
  const start = performance.now();
  f["Part1"]();
  const end = performance.now();
  console.log(
    chalk.bold.green`\nCompleted Day ${day} - Part 2 in ${Math.round((end - start) * 10) / 10}ms\n`);
}

if ((f?.["Part2"] && part === "2") || !part) {
  console.log(chalk.bold.green`\nStarting Day ${day} - Part 2\n`);
  const start = performance.now();
  f["Part2"]?.();
  const end = performance.now();
  console.log(
    chalk.bold.green`\nCompleted Day ${day} - Part 2 in ${Math.round((end - start) * 10) / 10}ms\n`
  );
}
