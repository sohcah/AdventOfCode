import chalk from "chalk";
import { runAndLogDay } from "./runHelpers.js";
import { watch } from "node:fs";
import { currentLanguage } from "./languages.js";

const day = process.argv[2];
const part = process.argv[3];
if (day === undefined || part === undefined) {
  console.log(chalk.red(`Usage: bun ${currentLanguage.prefix}:${process.env.AOCTEST ? "test" : "start"} <day> <part>`));
  process.exit(1);
}

let abort = new AbortController();

async function run(abort: AbortSignal) {
  try {
    await runAndLogDay(currentLanguage, day, part, { log: true, abort });
  } catch (e: unknown) {
    if (!(e && typeof e === "object" && e instanceof Error && e.name === "AbortError")) {
      throw e;
    }
  }
}

run(abort.signal);

for (const watchPath of [`${currentLanguage.folder}/${day}`, ...(currentLanguage.watch ?? [])]) {
  console.log("Watching", watchPath);
  watch(watchPath, async () => {
    console.log("Change in", watchPath);
    abort.abort();
    abort = new AbortController();
    const abortSignal = abort.signal;
    setTimeout(async () => {
      if (abortSignal.aborted) return;
      console.log(chalk.blue("Re-running..."));
      await run(abortSignal);
    });
  });
}
