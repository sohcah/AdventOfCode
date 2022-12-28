import chalk from "chalk";
import clipboardy from "clipboardy";
import {runDay} from "./runHelpers";

(async function () {
    const day = process.argv[2];
    const part = process.argv[3];
    const result = await runDay(day, part);

    const resultValue = result.result;
    if(result.stabilisedAt !== undefined) console.log(chalk.blue(`Stabilised at ${result.stabilisedAt}`));
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
})();
