import { loadLines, output } from "aocutils";

const input = loadLines().map((i) => i.split(""));

let input2: string[][];

// const start = performance.now();
{
  const y = input.findIndex((i) => i.includes("S"));
  const x = input[y].findIndex((i) => i === "S");

  const at = (coords: readonly [number, number, number]) => {
    const [x, y] = coords;
    return input[y]?.[x] ?? ".";
  };
  const width = input[0].length;
  const height = input.length;

  const visited = new Array(width * height).fill(-1);

  let maxSteps = -1;
  const positions: (readonly [number, number, number])[] = [[x, y, 0]];
  while (positions.length) {
    const [x, y, steps] = positions.shift()!;
    const c = x * height + y;
    if (visited[c] !== -1) {
      continue;
    }
    visited[c] = steps;
    if (steps > maxSteps) maxSteps = steps;
    const curr = at([x, y, steps]);
    if ("S.-LF".includes(curr)) {
      const right = [x + 1, y, steps + 1] as const;
      const a = at(right);
      if (a === "-" || a === "7" || a === "J") {
        positions.push(right);
      }
    }
    if ("S.-J7".includes(curr)) {
      const left = [x - 1, y, steps + 1] as const;
      const a = at(left);
      if (a === "-" || a === "F" || a === "L") {
        positions.push(left);
      }
    }
    if ("S.|LJ".includes(curr)) {
      const top = [x, y - 1, steps + 1] as const;
      const a = at(top);
      if (a === "|" || a === "F" || a === "7") {
        positions.push(top);
      }
    }
    if ("S.|7F".includes(curr)) {
      const bottom = [x, y + 1, steps + 1] as const;
      const a = at(bottom);
      if (a === "|" || a === "L" || a === "J") {
        positions.push(bottom);
      }
    }
  }

  // console.log("A", performance.now() - start);

  input2 = input.map((i, y) => {
    return [
      ".",
      ...i.map((j, x) => {
        return visited[x * height + y] === -1 ? "." : j;
      }),
      ".",
    ];
  });
  input2.unshift(new Array(input2[0].length).fill("."));
  input2.push(new Array(input2[0].length).fill("."));
}

// console.log("B", performance.now() - start);
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
// console.log("C", performance.now() - start);

const positions: (readonly [number, number])[] = [[0, 0]];

const at = (coords: readonly [number, number]) => {
  const [x, y] = coords;
  return input3[y]?.[x] ?? ".";
};

const width = input3[0].length;
const height = input3.length;

const visited = new Array(width * height).fill(false);

while (positions.length) {
  const [x, y] = positions.shift()!;
  if (x < 0 || x >= width) continue;
  if (y < 0 || y >= height) continue;
  const c = x * height + y;
  if (visited[c]) continue;
  visited[c] = true;
  if (x < width - 1) {
    const right = [x + 1, y] as const;
    if (at(right) === ".") {
      positions.push(right);
    }
  }
  if (x > 0) {
    const left = [x - 1, y] as const;
    if (at(left) === ".") {
      positions.push(left);
    }
  }
  if (y > 0) {
    const top = [x, y - 1] as const;
    if (at(top) === ".") {
      positions.push(top);
    }
  }
  if (y < height - 1) {
    const bottom = [x, y + 1] as const;
    if (at(bottom) === ".") {
      positions.push(bottom);
    }
  }
}
// console.log("D", performance.now() - start);

let unvisited = 0;
for (let y = 0; y < input3.length; y++) {
  if (y % 2 !== 0) continue;
  for (let x = 0; x < input3[y].length; x++) {
    if (x % 2 !== 0) continue;
    if (!visited[x * height + y] && at([x, y]) === ".") {
      unvisited++;
    }
  }
}
// console.log("E", performance.now() - start);

output(unvisited).forTest(10).forActual(527);
