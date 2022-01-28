import fs from "fs";
// import chalk from "chalk";
import { Superset } from "../utils";

const expressions = [
  (a: number) => (a + 6) * ((11 === a ? 1 : 0) === 0 ? 1 : 0),
  (b: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 11 === b ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (b + 14) * (((z % 26) + 11 === b ? 1 : 0) === 0 ? 1 : 0),
  (c: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 15 === c ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (c + 13) * (((z % 26) + 15 === c ? 1 : 0) === 0 ? 1 : 0),
  (d: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -14 === d ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (d + 1) * (((z % 26) + -14 === d ? 1 : 0) === 0 ? 1 : 0),
  (e: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 10 === e ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (e + 6) * (((z % 26) + 10 === e ? 1 : 0) === 0 ? 1 : 0),
  (f: number, z: number) =>
    Math.floor(z / 26) * (25 * ((z % 26 === f ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (f + 13) * ((z % 26 === f ? 1 : 0) === 0 ? 1 : 0),
  (g: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -6 === g ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (g + 6) * (((z % 26) + -6 === g ? 1 : 0) === 0 ? 1 : 0),
  (h: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 13 === h ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (h + 3) * (((z % 26) + 13 === h ? 1 : 0) === 0 ? 1 : 0),
  (i: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -3 === i ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (i + 8) * (((z % 26) + -3 === i ? 1 : 0) === 0 ? 1 : 0),
  (j: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 13 === j ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (j + 14) * (((z % 26) + 13 === j ? 1 : 0) === 0 ? 1 : 0),
  (k: number, z: number) =>
    Math.floor(z / 1) * (25 * (((z % 26) + 15 === k ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (k + 4) * (((z % 26) + 15 === k ? 1 : 0) === 0 ? 1 : 0),
  (l: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -2 === l ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (l + 7) * (((z % 26) + -2 === l ? 1 : 0) === 0 ? 1 : 0),
  (m: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -9 === m ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (m + 15) * (((z % 26) + -9 === m ? 1 : 0) === 0 ? 1 : 0),
  (n: number, z: number) =>
    Math.floor(z / 26) * (25 * (((z % 26) + -2 === n ? 1 : 0) === 0 ? 1 : 0) + 1) +
    (n + 1) * (((z % 26) + -2 === n ? 1 : 0) === 0 ? 1 : 0),
];

export function Part1() {

  const outputs: number[][] = [
    [0],
  ]
  const sectionSolutions: Record<number, number> = {};

  for (let section = 0; section < 14; section++) {
    const sectionOutputs = new Superset<number>();
    console.log(section, outputs[section].length);
    for (let i = 9; i > 0; i--) {
      console.log(section, i);
      let n = 0;
      for (const output of outputs[section]) {
        if (n % 100000 === 0) console.log(section, i, n);
        // if (section === 11 && i === 7 && n > 370000 && n % 10 === 0) {
        //   console.log(section, i, n, output)
        // }
        n++;
        const key = expressions[section](i, output);
        sectionOutputs.add(key);
        if (output < 1000000) {
          const solKey = key * 20 + section;
          const currentSol = sectionSolutions[solKey] ?? 100000000000000;
          const start = sectionSolutions[output * 20 + (section - 1)] ?? 0;
          const val = start * 10 + i;
          if (val < currentSol) {
            sectionSolutions[solKey] = val;
          }
        }
      }
    }
    outputs.push([...sectionOutputs]);
  }

  console.log(outputs);
  fs.writeFileSync("./outputs/24b.json", JSON.stringify(sectionSolutions));
  console.log(sectionSolutions[13]);
  // console.log(chalk.blue.bold`Answer: ${alu.values.w}`);
}
