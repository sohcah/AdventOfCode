import { p, loadLines, output } from "aocutils";
import chalk from "chalk";

const input = loadLines().map((i) => i.split(""));

let input2: string[][];

// console.log(input);
{
  const y = input.findIndex((i) => i.includes("S"));
  const x = input[y].findIndex((i) => i === "S");

  console.log(x, y);

  const at = (coords: readonly [number, number, number]) => {
    const [x, y] = coords;
    return input[y]?.[x] ?? ".";
  };

  const visited: Map<string, number> = new Map();

  let maxSteps = -1;
  const positions: (readonly [number, number, number])[] = [[x, y, 0]];
  while (positions.length) {
    const [x, y, steps] = positions.shift()!;
    if (visited.has(`${x},${y}`)) {
      continue;
    }
    visited.set(`${x},${y}`, steps);
    if (steps > maxSteps) maxSteps = steps;
    console.log(x, y);
    const curr = at([x, y, steps]);
    if ("S.-LF".includes(curr)) {
      const right = [x + 1, y, steps + 1] as const;
      if (at(right) === "-" || at(right) === "7" || at(right) === "J") {
        positions.push(right);
      }
    }
    if ("S.-J7".includes(curr)) {
      const left = [x - 1, y, steps + 1] as const;
      if (at(left) === "-" || at(left) === "F" || at(left) === "L") {
        positions.push(left);
      }
    }
    if ("S.|LJ".includes(curr)) {
      const top = [x, y - 1, steps + 1] as const;
      if (at(top) === "|" || at(top) === "F" || at(top) === "7") {
        positions.push(top);
      }
    }
    if ("S.|7F".includes(curr)) {
      const bottom = [x, y + 1, steps + 1] as const;
      if (at(bottom) === "|" || at(bottom) === "L" || at(bottom) === "J") {
        positions.push(bottom);
      }
    }
  }

  let max = -1;
  for (const [pos] of visited) {
    const [px, py] = pos.split(",").map(Number);
    const manHat = Math.abs(px - x) + Math.abs(py - y);
    if (manHat > max) max = manHat;
  }

  input2 = input.map((i, y) => {
    return [
      ".",
      ...i.map((j, x) => {
        return visited.has(`${x},${y}`) ? j : ".";
      }),
      ".",
    ];
  });
  input2.unshift(new Array(input2[0].length).fill("."));
  input2.push(new Array(input2[0].length).fill("."));

  console.log(
    input
      .map((i, y) => {
        return i
          .map((j, x) => {
            return visited.get(`${x},${y}`)?.toString(36).slice(0, 2).padStart(2, "0") ?? "..";
          })
          .join("");
      })
      .join("\n")
  );
}
console.log(input2.map((i) => i.join("")).join("\n"));

const at2 = (coords: readonly [number, number]) => {
  const [x, y] = coords;
  return input2[y]?.[x] ?? ".";
};

const input3: string[][] = [];

for (let y = 0; y < input2.length * 2; y++) {
  const r = [];
  for (let x = 0; x < input2[0].length * 2; x++) {
    if (x % 2 === 1 && y % 2 === 1) {
      r.push(".");
    } else if (x % 2 === 0 && y % 2 === 0) {
      r.push(at2([x / 2, y / 2]));
    } else if (x % 2 === 0) {
      const above = at2([x / 2, (y - 1) / 2]);
      const below = at2([x / 2, (y + 1) / 2]);
      if ("7|FS".includes(above) && "JL|S".includes(below)) {
        r.push("|");
      } else {
        r.push(".");
      }
    } else if (y % 2 === 0) {
      const left = at2([(x - 1) / 2, y / 2]);
      const right = at2([(x + 1) / 2, y / 2]);
      if ("-LFS".includes(left) && "J7-S".includes(right)) {
        r.push("-");
      } else {
        r.push(".");
      }
    } else {
      r.push(" ");
    }
  }
  input3.push(r);
}
console.log(input3.map((i) => i.join("")).join("\n"));

const positions: (readonly [number, number])[] = [[0, 0]];

const visited = new Set<string>();

const at = (coords: readonly [number, number]) => {
  const [x, y] = coords;
  return input3[y]?.[x] ?? ".";
};

// const isUpLeft = (i: string) => "7|J".includes(i);
// const isUpRight = (i: string) => "L|F".includes(i);
// const isAcrossTop = (i: string) => "L-J".includes(i);
// const isAcrossBottom = (i: string) => "F-7".includes(i);
//
// while (positions.length) {
//   const [x, y] = positions.shift()!;
//   if (visited.has(`${x},${y}`)) continue;
//   if (x < 0 || x >= input3[0].length) continue;
//   if (y < 0 || y >= input3.length) continue;
//   visited.add(`${x},${y}`);
//   console.log(x, y);
//   const curr = at([x, y]);
//   if (curr === ".") {
//     const right = [x + 1, y] as const;
//     if (
//       at(right) === "." ||
//       ((isAcrossTop(curr) || curr === ".") &&
//         isAcrossTop(at(right)) &&
//         isAcrossBottom(at([right[0], right[1] + 1])))
//     ) {
//       positions.push(right);
//     }
//   }
//   if (".LF7J-".includes(curr)) {
//     const left = [x - 1, y] as const;
//     if (
//       at(left) === "." ||
//       ((isAcrossTop(curr) || curr === ".") &&
//         isAcrossTop(at(left)) &&
//         isAcrossBottom(at([left[0], left[1] + 1])))
//     ) {
//       positions.push(left);
//     }
//   }
//   if (".JLF7|".includes(curr)) {
//     const top = [x, y - 1] as const;
//     if (
//       at(top) === "." ||
//       ((isUpLeft(curr) || curr === ".") && isUpLeft(at(top)) && isUpRight(at([top[0] + 1, top[1]])))
//     ) {
//       positions.push(top);
//     }
//   }
//   if (".JLF7|".includes(curr)) {
//     const bottom = [x, y + 1] as const;
//     if (
//       at(bottom) === "." ||
//       ((isUpLeft(curr) || curr === ".") &&
//         isUpLeft(at(bottom)) &&
//         isUpRight(at([bottom[0] + 1, bottom[1]])))
//     ) {
//       positions.push(bottom);
//     }
//   }
// }
while (positions.length) {
  const [x, y] = positions.shift()!;
  if (visited.has(`${x},${y}`)) continue;
  if (x < 0 || x >= input3[0].length) continue;
  if (y < 0 || y >= input3.length) continue;
  visited.add(`${x},${y}`);
  console.log(x, y);
  const curr = at([x, y]);
  console.log(curr);
  {
    const right = [x + 1, y] as const;
    if (at(right) === ".") {
      positions.push(right);
    }
  }
  {
    const left = [x - 1, y] as const;
    if (at(left) === ".") {
      positions.push(left);
    }
  }
  {
    const top = [x, y - 1] as const;
    if (at(top) === ".") {
      positions.push(top);
    }
  }
  {
    const bottom = [x, y + 1] as const;
    if (at(bottom) === ".") {
      positions.push(bottom);
    }
  }
}

let unvisited = 0;
for (let y = 0; y < input3.length; y++) {
  // if (y % 2 !== 0) continue;
  let r = "";
  for (let x = 0; x < input3[y].length; x++) {
    // if (x % 2 !== 0) continue;
    if (at([x, y]) === "." && !visited.has(`${x},${y}`)) {
      if (y % 2 === 0 && x % 2 === 0) unvisited++;
      if (y % 2 === 0 && x % 2 === 0) {
        r += chalk.bold("I");
      } else {
        r += chalk.gray("i");
      }
    } else {
      const i = at([x, y]);
      if (i === ".") {
        if (y % 2 === 0 && x % 2 === 0) {
          r += chalk.bold("O");
        } else {
          r += chalk.gray("o");
        }
      } else {
        if (y % 2 === 0 && x % 2 === 0) {
          r += chalk.green.bold(i);
        } else {
          r += chalk.green(i);
        }
      }
    }
  }
  console.log(r);
}

output(unvisited).forTest(10).forActual(527);
