import chalk from "chalk";
import clipboardy from "clipboardy";
import { DayResult, runDay } from "./runHelpers.js";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

type RunAndLogDayResult = DayResult & {
  type: "result";
  outerTime: number;
  stabilisedAt?: number;
  day: number;
  part: number
};

async function runAndLogDay(day: number, part: number): Promise<RunAndLogDayResult> {
  console.log("Running", day, part);
  let partString = String(part);
  if (existsSync(resolve(__dirname, `days/${day}/pt${part}b.ts`))) {
    partString = `${part}b`;
  }
  if (existsSync(resolve(__dirname, `days/${day}/pt${part}fast.ts`))) {
    partString = `${part}fast`;
  }
  if (existsSync(resolve(__dirname, `days/${day}/pt${part}faster.ts`))) {
    partString = `${part}faster`;
  }
  if (existsSync(resolve(__dirname, `days/${day}/pt${part}fasterer.ts`))) {
    partString = `${part}fasterer`;
  }

  const result = await runDay(String(day), partString, false);

  const resultValue = result.result;
  console.log(chalk.blue(`Finished Day ${day} Part ${partString}`));
  if (result.stabilisedAt !== undefined)
    console.log(chalk.blue(`Stabilised at ${result.stabilisedAt}`));
  if (result.expected !== undefined) {
    if (result.expected === resultValue) {
      console.log(chalk.green(`Result is correct!`));
    } else {
      console.log(chalk.red(`Result is incorrect, expected ${result.expected}!`));
    }
  } else {
    clipboardy.writeSync(String(resultValue));
    console.log(chalk.yellow(`Copied result to clipboard!`));
  }
  console.log(chalk.blue(`Result is ${String(result.result)}`));
  console.log(chalk.gray(`Result run took ${result.time.toFixed(4)}ms`));
  console.log(chalk.gray(`Took ${result.outerTime.toFixed(4)}ms`));
  return { ...result, day, part };
}

(async function() {
  const start = performance.now();
  const allResults: RunAndLogDayResult[] = [];
  const maxDay = readdirSync(resolve(__dirname, "days")).map(Number).filter(i => !Number.isNaN(i)).sort((a, b) => b - a)[0]!;
  for (let day = 1; day <= maxDay; day++) {
    for (let part = 1; part <= 2; part++) {
      let results = [];
      for (let i = 0; i < 10; i++) {
        results.push(await runAndLogDay(day, part));
      }
      allResults.push({ ...results[0]!, time: results.reduce((a, b) => a + b.time, 0) / results.length });
    }
  }
  console.log(
    chalk.yellow(`Total inner time: ${allResults.reduce((a, b) => a + b.time, 0).toFixed(4)}ms`)
  );
  console.log(chalk.yellow(`Total outer time: ${(performance.now() - start).toFixed(4)}ms`));
  console.log(
    chalk.gray(
      `Top 10 longest:\n` +
      allResults
        .sort((a, b) => b.time - a.time)
        .slice(0, 10)
        .map((i) => `${i.day}p${i.part} - ${i.time.toFixed(4)}ms`)
        .join("\n")
    )
  );
})();
