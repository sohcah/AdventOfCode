import chalk from "chalk";

const day = process.argv[2];
if (!day) {
  console.log(chalk`{red Invalid command, please specify a day:}\n{green yarn start <day> [part]}`);
  process.exit(1);
}
const part = process.argv[3];
const f = require(`./days/${day}`);

if ((f?.["Part1"] && part === "1") || !part) {
  console.log(chalk.bold.green`\nStarting Day ${day} - Part 1\n`);
  f["Part1"]();
}

if ((f?.["Part2"] && part === "2") || !part) {
  console.log(chalk.bold.green`\nStarting Day ${day} - Part 2\n`);
  f["Part2"]?.();
}
