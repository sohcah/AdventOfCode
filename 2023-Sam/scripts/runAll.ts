import chalk from "chalk";
import {runAndLogDay, type RunAndLogDayResult} from "./runHelpers.js";
import {readdirSync, readFileSync} from "node:fs";
import {resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {languages, currentLanguage} from "./languages.js";
import {writeFileSync} from "fs";
import chroma from "chroma-js";

process.env.RELEASE_MODE = "true";

const __dirname = fileURLToPath(new URL("..", import.meta.url));

const languagesToUse = process.env.BENCHMARK ? Object.values(languages) : [currentLanguage];

(async function () {
  const languageResults = [];
  for (const language of languagesToUse) {
    console.log(chalk.bold(language.name));
    const start = performance.now();
    const allResults: RunAndLogDayResult[] = [];
    const maxDay = readdirSync(resolve(__dirname, language.folder)).map(Number).filter(i => !Number.isNaN(i)).sort((a, b) => b - a)[0]!;
    for (let day = 1; day <= maxDay; day++) {
      for (let part = 1; part <= 2; part++) {
        let results = [];
        try {
          for (let i = 0; i < 10; i++) {
            results.push(await runAndLogDay(language, day, part, {postfix: true, throwOnIncorrect: true}));
          }
          allResults.push({...results[0]!, time: results.reduce((a, b) => a + b.time, 0) / results.length});
        } catch (e) {
          allResults.push({type: "result", result: "Failed", day, part, time: -1, outerTime: -1});
          console.log(e);
        }
      }
    }
    console.log(allResults);
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
    languageResults.push(allResults);
  }

  if (process.env.BENCHMARK) {
    const lines: string[] = [];
    lines.push(`*Disclaimer: These timings are measured from when the input has been loaded (but not parsed) to when the output has been returned. It does not include compile, file system or startup times.*\n`)
    lines.push(`|Day|${languagesToUse.map(i => i.name).join("|")}|`);
    lines.push(`|-|${languagesToUse.map(() => "-").join("|")}|`);
    const languageSlowest = languageResults.map(i => Math.log10(Math.max(...i.map(j => j.time + 1))));
    for (let day = 1; day <= 25; day++) {
      lines.push(`|${day}|${languageResults.map((l, n) => {
        return [1, 2].map(part => {
          const result = l.find(i => i.day === day && i.part === part);
          if (!result) return "-";
          if (result.time === -1) return `🚨 FAILED 🚨`;
          const brightColour = chroma("#00ff00").set("hsl.h", 120 * (1 - (Math.log10(result.time + 1) / languageSlowest[n]))).hex();
          return `![${brightColour}](https://placehold.co/10x10/${brightColour.slice(1)}/${brightColour.slice(1)}.png) <span style="color: ${chroma("#aaffaa").set("hsl.h", 120 * (1 - (Math.log10(result.time + 1) / languageSlowest[n]))).hex()}">${result.time.toFixed(3)}ms</span>`;
        }).join(" / ");
      }).join("|")}|`);
    }
    lines.push(`|Total|${languageResults.map(i => {
      return `${i.reduce((a, b) => a + b.time, 0).toFixed(3)}ms`;
    }).join("|")}|`)
    writeFileSync("README.md", readFileSync("README.md", "utf8").replace(/<!--BENCHMARKSTART-->[^]+<!--BENCHMARKEND-->/, `<!--BENCHMARKSTART-->\n${lines.join("\n")}\n<!--BENCHMARKEND-->`))
  }
})();
