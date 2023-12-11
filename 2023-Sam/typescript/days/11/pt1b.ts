import { loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

const EXPAND_RATIO = 2;

const expandRows = input.map((i) => i.every((j) => j === "."));
const expandCols = input[0].map((_, c) => input.every((i) => i[c] === "."));

const galaxies = input.flatMap((row, y) =>
  row.flatMap((c, x) => (c === "#" ? [[x, y] as [number, number]] : []))
);

let sum = 0;
for (let n = 0; n < galaxies.length; n++) {
  for (let m = n + 1; m < galaxies.length; m++) {
    const g1 = galaxies[n];
    const g2 = galaxies[m];

    sum += Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]);
  }
}

for (let r = 0; r < expandRows.length; r++) {
  if (!expandRows[r]) continue;
  sum += (EXPAND_RATIO - 1) * galaxies.count((i) => i[1] < r) * galaxies.count((i) => i[1] > r);
}
for (let c = 0; c < expandCols.length; c++) {
  if (!expandCols[c]) continue;
  sum += (EXPAND_RATIO - 1) * galaxies.count((i) => i[0] < c) * galaxies.count((i) => i[0] > c);
}

output(sum).forTest(374).forActual(9329143);
