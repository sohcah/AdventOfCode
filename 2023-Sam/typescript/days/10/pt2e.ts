// noinspection JSBitwiseOperatorUsage

import { loadLines, output } from "aocutils";

const textInput = loadLines().map((i) => i.split(""));

let input2: number[][];

const TYPES = {
  LEFT: 1 << 0,
  RIGHT: 1 << 1,
  UP: 1 << 2,
  DOWN: 1 << 3,
  START: 1 << 4,
};

const input = textInput.map((row) => {
  return row.map((cell) => {
    switch (cell) {
      case ".":
        return 0;
      case "S":
        return TYPES.LEFT | TYPES.RIGHT | TYPES.UP | TYPES.DOWN | TYPES.START;
      case "-":
        return TYPES.LEFT | TYPES.RIGHT;
      case "|":
        return TYPES.UP | TYPES.DOWN;
      case "L":
        return TYPES.RIGHT | TYPES.UP;
      case "J":
        return TYPES.LEFT | TYPES.UP;
      case "7":
        return TYPES.LEFT | TYPES.DOWN;
      case "F":
        return TYPES.RIGHT | TYPES.DOWN;
    }
    throw new Error(`Unknown cell ${cell}`);
  });
});

const start = performance.now();
{
  const y = input.findIndex((i) => i.some((j) => j & TYPES.START));
  const x = input[y].findIndex((i) => i & TYPES.START);

  const at = (coords: readonly [number, number, number]) => {
    const [x, y] = coords;
    return input[y]?.[x] ?? 0;
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
    if (curr & TYPES.RIGHT) {
      const right = [x + 1, y, steps + 1] as const;
      const a = at(right);
      if (a & TYPES.LEFT) {
        positions.push(right);
      }
    }
    if (curr & TYPES.LEFT) {
      const left = [x - 1, y, steps + 1] as const;
      const a = at(left);
      if (a & TYPES.RIGHT) {
        positions.push(left);
      }
    }
    if (curr & TYPES.UP) {
      const top = [x, y - 1, steps + 1] as const;
      const a = at(top);
      if (a & TYPES.DOWN) {
        positions.push(top);
      }
    }
    if (curr & TYPES.DOWN) {
      const bottom = [x, y + 1, steps + 1] as const;
      const a = at(bottom);
      if (a & TYPES.UP) {
        positions.push(bottom);
      }
    }
  }

  console.log("A", performance.now() - start);

  input2 = input.map((i, y) => {
    return [
      0,
      ...i.map((j, x) => {
        return visited[x * height + y] === -1 ? 0 : j;
      }),
      0,
    ];
  });
  input2.unshift(new Array(input2[0].length).fill(0));
  input2.push(new Array(input2[0].length).fill(0));
}

console.log("B", performance.now() - start);
const at2 = (x: number, y: number) => {
  return input2[y]?.[x] ?? 0;
};

const input3: boolean[] = [];

for (let x = 0; x < input2[0].length * 2; x++) {
  for (let y = 0; y < input2.length * 2; y++) {
    if (x % 2 === 1 && y % 2 === 1) {
      input3.push(false);
    } else if (x % 2 === 0 && y % 2 === 0) {
      input3.push(at2(x / 2, y / 2) !== 0);
    } else if (x % 2 === 0) {
      const above = at2(x / 2, (y - 1) / 2);
      const below = at2(x / 2, (y + 1) / 2);
      input3.push(!!(above & TYPES.DOWN && below & TYPES.UP));
    } else if (y % 2 === 0) {
      const left = at2((x - 1) / 2, y / 2);
      const right = at2((x + 1) / 2, y / 2);
      input3.push(!!(left & TYPES.RIGHT && right & TYPES.LEFT));
    } else {
      input3.push(true);
    }
  }
}
console.log("C", performance.now() - start);

const width = input2[0].length * 2;
const height = input2.length * 2;

const at = (coords: number) => {
  return input3[coords] ?? false;
};

const visited = new Array(width * height).fill(false);

const positions: number[] = [0];

while (positions.length) {
  const coord = positions.shift()!;
  const x = coord % width;
  const y = Math.floor(coord / width);
  if (visited[coord]) continue;
  visited[coord] = true;
  if (x < width - 1) {
    const right = coord + 1;
    if (!at(right)) {
      positions.push(right);
    }
  }
  if (x > 0) {
    const left = coord - 1;
    if (!at(left)) {
      positions.push(left);
    }
  }
  if (y > 0) {
    const top = coord - width;
    if (!at(top)) {
      positions.push(top);
    }
  }
  if (y < height - 1) {
    const bottom = coord + width;
    if (!at(bottom)) {
      positions.push(bottom);
    }
  }
}
console.log("D", performance.now() - start);

let unvisited = 0;
for (let y = 0; y < height; y++) {
  if (y % 2 !== 0) continue;
  for (let x = 0; x < width; x++) {
    if (x % 2 !== 0) continue;
    if (!visited[x + y * width] && !at(x + y * width)) {
      unvisited++;
    }
  }
}
console.log("E", performance.now() - start);

output(unvisited).forTest(10).forActual(527);
