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

output(maxSteps).forTest(114).forActual(6812);
