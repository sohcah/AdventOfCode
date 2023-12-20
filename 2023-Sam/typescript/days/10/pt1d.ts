// noinspection JSBitwiseOperatorUsage

import { loadLines, output } from "aocutils";

const textInput = loadLines().map((i) => i.split(""));

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

let maxSteps = -1;
const width = input[0].length;
const height = input.length;

const flatInput = input.flat();

const at = (coords: number) => {
  return flatInput[coords] ?? 0;
};

const visited = new Array(width * height).fill(false);

const positions: [number, number][] = [[flatInput.findIndex((j) => j & TYPES.START), 0]];

for (let p = 0; p < positions.length; p++) {
  const [c, s] = positions[p];
  const x = c % width;
  const y = Math.floor(c / width);
  const curr = at(c);
  if (s > maxSteps) maxSteps = s;
  if (x < width - 1 && curr & TYPES.RIGHT) {
    const right = c + 1;
    const a = at(right);
    if (a & TYPES.LEFT && !visited[right]) {
      visited[right] = true;
      positions.push([right, s + 1]);
    }
  }
  if (x > 0 && curr & TYPES.LEFT) {
    const left = c - 1;
    const a = at(left);
    if (a & TYPES.RIGHT && !visited[left]) {
      visited[left] = true;
      positions.push([left, s + 1]);
    }
  }
  if (y > 0 && curr & TYPES.UP) {
    const top = c - width;
    const a = at(top);
    if (a & TYPES.DOWN && !visited[top]) {
      visited[top] = true;
      positions.push([top, s + 1]);
    }
  }
  if (y < height - 1 && curr & TYPES.DOWN) {
    const bottom = c + width;
    const a = at(bottom);
    if (a & TYPES.UP && !visited[bottom]) {
      visited[bottom] = true;
      positions.push([bottom, s + 1]);
    }
  }
}

output(maxSteps).forTest(8).forActual(6812);
