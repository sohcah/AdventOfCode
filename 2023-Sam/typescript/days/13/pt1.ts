import { p, loadLines, output } from "aocutils";

const input = load().groups.map((i) => i.lns.map((j) => j.chars));

// console.log(input);
let sum = 0;
for (const grid of input) {
  outer: for (let y = 1; y < grid.length; y++) {
    if (grid[y].join("") === grid[y - 1].join("")) {
      // console.log("potential at y", y);
      for (let y1 = y - 1; y1 >= 0; y1--) {
        const y2 = y + (y - y1) - 1;
        // console.log(y1, y2, grid[y1].join(""), grid[y2]?.join(""));
        if (grid[y2] && grid[y1].join("") !== grid[y2].join("")) {
          continue outer;
        }
      }
      sum += y * 100;
      // console.log("yay", y);
    }
  }
  outer: for (let x = 1; x < grid[0].length; x++) {
    if (grid.map((i) => i[x]).join("") === grid.map((i) => i[x - 1]).join("")) {
      console.log("potential at x", x);
      for (let x1 = x - 1; x1 >= 0; x1--) {
        const x2 = x + (x - x1) - 1;
        if (grid[0][x2] && grid.map((i) => i[x1]).join("") !== grid.map((i) => i[x2]).join(""))
          continue outer;
      }
      sum += x;
      // console.log("yayx", x);
    }
  }
}

output(sum).forTest(405).forActual(31739);
