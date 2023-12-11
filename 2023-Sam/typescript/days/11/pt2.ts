import { loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

const EXPAND_RATIO = process.env.AOCTEST ? 100 : 1000000;

// function printGrid(grid: string[][]) {
//   console.log("---");
//   console.log(grid.map((i) => i.join("")).join("\n"));
//   console.log("---");
// }
//
// printGrid(input);

const expandRows = input.map((i) => i.every((j) => j === "."));
const expandCols = input[0].map((_, c) => input.every((i) => i[c] === "."));

const galaxies = input.flatMap((row, y) =>
  row.flatMap((c, x) => (c === "#" ? [[x, y] as [number, number]] : []))
);

let sum = 0;
let count = 0;
for (let n = 0; n < galaxies.length; n++) {
  for (let m = n + 1; m < galaxies.length; m++) {
    const g1 = galaxies[n];
    const g2 = galaxies[m];

    let dist = Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]);
    for (let r = Math.min(g1[1], g2[1]); r < Math.max(g1[1], g2[1]); r++) {
      if (expandRows[r]) dist += EXPAND_RATIO - 1;
    }
    for (let c = Math.min(g1[0], g2[0]); c < Math.max(g1[0], g2[0]); c++) {
      if (expandCols[c]) dist += EXPAND_RATIO - 1;
    }
    sum += dist;
    count++;
  }
}

console.log(galaxies.length);
console.log(count);

output(sum).forTest(8410).forActual(710674907809);
