import { output } from "aocutils";

const input = load().groups.map((i) => {
  const rows = i.lns;
  return {
    rows,
    columns: [...rows[0]].map((_, n) => rows.map((r) => r[n]).join("")),
  };
});

let sum = 0;
for (const grid of input) {
  outer: for (let y = 1; y < grid.rows.length; y++) {
    if (grid.rows[y] === grid.rows[y - 1]) {
      for (let y1 = y - 1; y1 >= 0; y1--) {
        const y2 = y + (y - y1) - 1;
        if (!grid.rows[y2]) break;
        if (grid.rows[y2] && grid.rows[y1] !== grid.rows[y2]) {
          continue outer;
        }
      }
      sum += y * 100;
    }
  }
  outer: for (let x = 1; x < grid.columns.length; x++) {
    if (grid.columns[x] === grid.columns[x - 1]) {
      for (let x1 = x - 1; x1 >= 0; x1--) {
        const x2 = x + (x - x1) - 1;
        if (!grid.columns[x2]) break;
        if (grid.columns[x1] !== grid.columns[x2]) continue outer;
      }
      sum += x;
    }
  }
}

output(sum).forTest(405).forActual(31739);
