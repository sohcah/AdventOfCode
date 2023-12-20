import { output, loadLines } from "aocutils";

const input = loadLines();

const width = input[0].length;
const height = input.length;

const s1 = Math.ceil(Math.log2(width));
const s2 = s1 + Math.ceil(Math.log2(height));

const d1 = 2 ** s1;
const d2 = 2 ** s2;

const a1 = d1 - 1;
const a2 = d2 - 1;

const data = new Uint8Array(
  input
    .flatMap((i) => [...i.padEnd(d1, "_")])
    .map((i) => {
      switch (i) {
        case ".":
          return 0;
        case "-":
          return 1;
        case "|":
          return 2;
        case "/":
          return 3;
        case "\\":
          return 4;
        case "_":
          return -1;
      }
      throw new Error(`invalid cell ${i}`);
    })
);

const cellMapping: Record<number, boolean> = {};
for (const cell of [0, 1, 2, 3, 4]) {
  for (const rot of [0, 1, 2, 3]) {
    let newRots;
    switch (cell) {
      case 0:
        newRots = [rot];
        break;
      case 3:
        newRots = [
          {
            0: 3,
            3: 0,
            1: 2,
            2: 1,
          }[rot]!,
        ];
        break;
      case 4:
        newRots = [
          {
            0: 1,
            1: 0,
            2: 3,
            3: 2,
          }[rot]!,
        ];
        break;
      case 1:
        if (rot % 2 === 0) {
          newRots = [rot];
        } else {
          newRots = [rot + 1, rot - 1];
        }
        break;
      case 2:
        if (rot % 2 === 1) {
          newRots = [rot];
        } else {
          newRots = [rot + 1, rot - 1];
        }
        break;
      default:
        throw new Error(`invalid case ${cell}`);
    }
    newRots = new Set(newRots.map((r) => (r + 4) % 4));
    for (const newRot of [0, 1, 2, 3]) {
      cellMapping[cell * 4 * 4 + rot * 4 + newRot] = newRots.has(newRot);
    }
  }
}

const startPositions: number[] = [];
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const c = y * d1 + x;
    if (x === 0) {
      startPositions.push(c);
    }
    if (y === 0) {
      startPositions.push(c + d2);
    }
    if (x === width - 1) {
      startPositions.push(c + d2 * 2);
    }
    if (y === height - 1) {
      startPositions.push(c + d2 * 3);
    }
  }
}

const r1M = d1 * (height - 1);
const r1O = d1 + d2;
const r2O = -1 + 2 * d2;
const r3O = -d1 + 3 * d2;

let maxVisitedPositions = 0;
for (const startPos of startPositions) {
  // const start = performance.now();
  const visited = new Set<number>();
  const visitedPositions = new Set<number>();
  const positions = [startPos];

  for (let p = 0; p < positions.length; p++) {
    const q = positions[p];
    if (visited.has(q)) continue;
    visited.add(q);
    const c = q & a2;
    const rot = q >> s2;
    const x = c & a1;
    visitedPositions.add(c);

    const r = data[c] * 16 + rot * 4;
    if (cellMapping[r] && x < width - 1) {
      positions.push(c + 1);
    }
    if (cellMapping[r + 1] && c < r1M) {
      positions.push(c + r1O);
    }
    if (cellMapping[r + 2] && x > 0) {
      positions.push(c + r2O);
    }
    if (cellMapping[r + 3] && c >= d1) {
      positions.push(c + r3O);
    }
  }

  // console.log([...visitedPositions].sort());
  if (visitedPositions.size > maxVisitedPositions) maxVisitedPositions = visitedPositions.size;
  // console.log(performance.now() - start, visitedPositions.size, positions.length);
}

output(maxVisitedPositions).forTest(51).forActual(7831);
