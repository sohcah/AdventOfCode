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
  const width = input[0].length;
  const height = input.length;

  const flatInput = input.flat();

  const at = (coords: number) => {
    return flatInput[coords] ?? 0;
  };

  const visited = new Array(width * height).fill(false);

  const positions: number[] = [flatInput.findIndex((j) => j & TYPES.START)];

  for (let p = 0; p < positions.length; p++) {
    const c = positions[p];
    const x = c % width;
    const y = Math.floor(c / width);
    const curr = at(c);
    if (x < width - 1 && curr & TYPES.RIGHT) {
      const right = c + 1;
      const a = at(right);
      if (a & TYPES.LEFT && !visited[right]) {
        visited[right] = true;
        positions.push(right);
      }
    }
    if (x > 0 && curr & TYPES.LEFT) {
      const left = c - 1;
      const a = at(left);
      if (a & TYPES.RIGHT && !visited[left]) {
        visited[left] = true;
        positions.push(left);
      }
    }
    if (y > 0 && curr & TYPES.UP) {
      const top = c - width;
      const a = at(top);
      if (a & TYPES.DOWN && !visited[top]) {
        visited[top] = true;
        positions.push(top);
      }
    }
    if (y < height - 1 && curr & TYPES.DOWN) {
      const bottom = c + width;
      const a = at(bottom);
      if (a & TYPES.UP && !visited[bottom]) {
        visited[bottom] = true;
        positions.push(bottom);
      }
    }
  }

  console.log("A", performance.now() - start);

  input2 = input.map((i, y) => {
    return [
      0,
      ...i.map((j, x) => {
        return !visited[x + y * height] ? 0 : j;
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

let evenX = false;
for (let x = 0; x < input2[0].length; x += 0.5) {
  evenX = !evenX;
  let evenY = false;
  for (let y = 0; y < input2.length; y += 0.5) {
    evenY = !evenY;
    if (evenX) {
      if (evenY) {
        input3.push(at2(x, y) !== 0);
      } else {
        const above = at2(x, y - 0.5);
        const below = at2(x, y + 0.5);
        input3.push(!!(above & TYPES.DOWN && below & TYPES.UP));
      }
    } else if (evenY) {
      const left = at2(x - 0.5, y);
      const right = at2(x + 0.5, y);
      input3.push(!!(left & TYPES.RIGHT && right & TYPES.LEFT));
    } else {
      input3.push(false);
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
visited[0] = true;

for (let p = 0; p < positions.length; p++) {
  const coord = positions[p];
  const x = coord % width;
  const y = Math.floor(coord / width);
  if (x < width - 1) {
    const right = coord + 1;
    if (!at(right) && !visited[right]) {
      visited[right] = true;
      positions.push(right);
    }
  }
  if (x > 0) {
    const left = coord - 1;
    if (!at(left) && !visited[left]) {
      visited[left] = true;
      positions.push(left);
    }
  }
  if (y > 0) {
    const top = coord - width;
    if (!at(top) && !visited[top]) {
      visited[top] = true;
      positions.push(top);
    }
  }
  if (y < height - 1) {
    const bottom = coord + width;
    if (!at(bottom) && !visited[bottom]) {
      visited[bottom] = true;
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
