import chalk from "chalk";
import clipboardy from "clipboardy";
import { runDay } from "./runHelpers.js";
import { watch } from "node:fs";

const day = process.argv[2];
const part = process.argv[3];
if (day === undefined || part === undefined) {
  console.log(chalk.red(`Usage: bun start <day> <part>`));
  process.exit(1);
}

let abort = new AbortController();

async function run(abort: AbortSignal) {
  try {
    const result = await runDay(day, part, true, abort);

    const resultValue = result.result;
    if (result.stabilisedAt !== undefined) console.log(chalk.blue(`Stabilised at ${result.stabilisedAt}`));
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
    console.log(chalk.gray(`Took ${(result.outerTime).toFixed(4)}ms`));

  } catch (e: unknown) {
    if (!(e && typeof e === "object" && e instanceof Error && e.name === "AbortError")) {
      throw e;
    }
  }
}

await run(abort.signal);

watch(`./days/${day}`, async () => {
  abort.abort();
  abort = new AbortController();
  const abortSignal = abort.signal;
  setTimeout(async () => {
    if (abortSignal.aborted) return;
    console.log(chalk.blue("Re-running..."));
    await run(abortSignal);
  });
});

