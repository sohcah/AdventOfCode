import { output } from "aocutils";

const input = load().groups.map((i) => {
  const rows = i.lns;
  return {
    rows,
    columns: [...rows[0]].map((_, n) => rows.map((r) => r[n]).join("")),
  };
});

function diff(a: string, b: string) {
  let wrong = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) wrong++;
  }
  return wrong;
}

let sum = 0;
outout: for (const grid of input) {
  outer: for (let y = 1; y < grid.rows.length; y++) {
    if (diff(grid.rows[y], grid.rows[y - 1]) <= 1) {
      let diffSum = 0;
      for (let y1 = y - 1; y1 >= 0; y1--) {
        const y2 = y + (y - y1) - 1;
        if (!grid.rows[y2]) break;
        diffSum += diff(grid.rows[y1], grid.rows[y2]);
        if (diffSum > 1) {
          continue outer;
        }
      }
      if (diffSum < 1) continue;
      sum += y * 100;
      continue outout;
    }
  }
  outer: for (let x = 1; x < grid.columns.length; x++) {
    if (diff(grid.columns[x], grid.columns[x - 1]) <= 1) {
      let diffSum = 0;
      for (let x1 = x - 1; x1 >= 0; x1--) {
        const x2 = x + (x - x1) - 1;
        if (!grid.columns[x2]) break;
        diffSum += diff(grid.columns[x1], grid.columns[x2]);
        if (diffSum > 1) {
          continue outer;
        }
      }
      if (diffSum < 1) continue;
      sum += x;
      continue outout;
    }
  }
}

output(sum).forTest(400).forActual(31539);
