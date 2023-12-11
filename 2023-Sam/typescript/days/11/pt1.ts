import { loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

// function printGrid(grid: string[][]) {
//   console.log("---");
//   console.log(grid.map((i) => i.join("")).join("\n"));
//   console.log("---");
// }
// printGrid(input);

const expandedVert = input.flatMap((row) => {
  if (row.every((i) => i === ".")) {
    return [row, row];
  }
  return [row];
});

// printGrid(expandedVert);

const expandCols = expandedVert[0].map((_, c) => expandedVert.every((i) => i[c] === "."));
// console.log(expandCols);
const fullExpand = expandedVert.map((row) => {
  return row.flatMap((r, c) => {
    if (expandCols[c]) return [r, r];
    return [r];
  });
});

// printGrid(fullExpand);

const galaxies = fullExpand.flatMap((row, y) =>
  row.flatMap((c, x) => (c === "#" ? [[x, y] as [number, number]] : []))
);

// console.log(galaxies);

let sum = 0;
let count = 0;
for (let n = 0; n < galaxies.length; n++) {
  for (let m = n + 1; m < galaxies.length; m++) {
    const g1 = galaxies[n];
    const g2 = galaxies[m];
    // console.log(n,m,dist);
    sum += Math.abs(g2[0] - g1[0]) + Math.abs(g2[1] - g1[1]);
    count++;
  }
}

console.log(galaxies.length);
console.log(count);

output(sum).forTest(374).forActual(9329143);
