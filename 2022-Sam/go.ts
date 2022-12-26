import {resolve, join} from "node:path";
import * as child_process from "child_process";
import {mkdtempSync, readFileSync, existsSync, rmSync} from "node:fs";
import {tmpdir} from "os";
import chalk from "chalk";
import clipboardy from "clipboardy";

const isTest = !!process.env.AOCTEST;

export interface DayInput {
  inputFile: string;
  stabiliseValue?: number;
}

export type DayResult = {
  type: "stabilise";
  start: number;
  increment: number;
  stableCount: number;
} | {
  type: "result";
  result: number | string;
  expected?: number | string | undefined;
  time: number;
}

const tmpDir = mkdtempSync(join(tmpdir(), "aoc-"));

async function callDay(day: string, part: string, input: DayInput): Promise<DayResult> {
  const path = resolve(__dirname, `./days/${day}/pt${part}.ts`);
  const outFile = join(tmpDir, `${Math.floor(Math.random() * 1000000)}.json`);
  const proc = child_process.spawn(
    `yarn workspace ${day} tsx ${path}`,
    {
      shell: true,
      env: {
        ...process.env,
        AOC_INPUT: JSON.stringify(input),
        AOC_OUTPUT: outFile,
      },
      stdio: "inherit",
    },
  );
  await new Promise(res => proc.once("exit", res));

  const output = readFileSync(outFile, "utf8");
  return JSON.parse(output);
}

(async function () {
  let inputFile = resolve(__dirname, "days", process.argv[2], isTest ? "test" : "input");
  if (existsSync(inputFile + process.argv[3])) {
    inputFile += process.argv[3];
  }
  const start = performance.now();
  const result = await callDay(process.argv[2], process.argv[3], {
    inputFile,
  });

  if (result.type === "stabilise") {
    for (let i = 0; i < 10; i++) {
      const resultPromises = [];
      for (let j = 0; j < result.stableCount; j++) {
        resultPromises.push(callDay(process.argv[2], process.argv[3], {
          inputFile,
          stabiliseValue: result.start + ((i * 3 + j) * result.increment),
        }))
      }
      const results = await Promise.all(resultPromises);
      if (results.some(r => r.type === "stabilise")) {
        throw new Error("Can't stabilise");
      }
      const validResults = results as (DayResult & { type: "result" })[];
      if (!validResults.some(r => r.result !== validResults[0].result)) {
        console.log(chalk.blue(`Stabilised at ${result.start + (i * 3 * result.increment)}`));
        const resultValue = validResults[0].result;
        if (validResults[0].expected !== undefined) {
          if (validResults[0].expected === resultValue) {
            console.log(chalk.green(`Result is correct!`));
          } else {
            console.log(chalk.red(`Result is incorrect, expected ${validResults[0].expected}!`));
          }
        } else {
          clipboardy.writeSync(String(resultValue));
          console.log(chalk.yellow(`Copied result to clipboard!`));
        }
        console.log(chalk.blue(`Result is ${resultValue}`));
        console.log(chalk.gray(`Result run took ${validResults[0].time.toFixed(4)}ms`));
        console.log(chalk.gray(`Took ${(performance.now() - start).toFixed(4)}ms`));
        rmSync(tmpDir, {recursive: true});
        return;
      }
    }
  } else {
    const resultValue = result.result;
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
    console.log(chalk.blue(`Result is ${resultValue.toString()}`));
    console.log(chalk.gray(`Result run took ${result.time.toFixed(4)}ms`));
    console.log(chalk.gray(`Took ${(performance.now() - start).toFixed(4)}ms`));
    rmSync(tmpDir, {recursive: true});
  }

})();
