import { p, loadLines, output } from "aocutils";

const input = load().groups.map((i) => i.lns.map((j) => j.chars));

function diff(a: string, b: string) {
  let wrong = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) wrong++;
  }
  return wrong;
}

// console.log(input);
let sum = 0;
outout: for (const grid of input) {
  outer: for (let y = 1; y < grid.length; y++) {
    if (diff(grid[y].join(""), grid[y - 1].join("")) <= 1) {
      console.log("potential at y", y);
      let diffSum = 0;
      for (let y1 = y - 1; y1 >= 0; y1--) {
        const y2 = y + (y - y1) - 1;
        if (!grid[y2]) break;
        diffSum += diff(grid[y1].join(""), grid[y2].join(""));
        if (diffSum > 1) {
          continue outer;
        }
      }
      if (diffSum < 1) continue;
      sum += y * 100;
      console.log("yay", y);
        continue outout;
    }
  }
  outer: for (let x = 1; x < grid[0].length; x++) {
    if (diff(grid.map((i) => i[x]).join(""), grid.map((i) => i[x - 1]).join("")) <= 1) {
      console.log("potential at x", x);
      let diffSum = 0;
      for (let x1 = x - 1; x1 >= 0; x1--) {
        const x2 = x + (x - x1) - 1;
        if (!grid[0][x2]) break;
        diffSum += diff(grid.map((i) => i[x1]).join(""), grid.map((i) => i[x2]).join(""));
        if (diffSum > 1) {
          continue outer;
        }
      }
      if (diffSum < 1) continue;
      sum += x;
      console.log("yayx", x);
      continue outout;
    }
  }
}

output(sum).forTest(400).forActual(31539);
