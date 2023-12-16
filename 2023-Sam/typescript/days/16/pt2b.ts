import { output, loadLines } from "aocutils";

const input = loadLines();

const width = input[0].length;
const height = input.length;

const startPositions: [number, number, number][] = [];
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    if (x === 0) {
      startPositions.push([x, y, 0]);
    }
    if (y === 0) {
      startPositions.push([x, y, 1]);
    }
    if (x === width - 1) {
      startPositions.push([x, y, 2]);
    }
    if (y === height - 1) {
      startPositions.push([x, y, 3]);
    }
  }
}

let maxVisitedPositions = 0;
for (const startPos of startPositions) {
  const start = performance.now();
  const visited: Set<number> = new Set();
  const visitedPositions: Set<number> = new Set();
  const positions: [number, number, number][] = [startPos];

  for (let p = 0; p < positions.length; p++) {
    const position = positions[p];
    const [x, y, rot] = position;
    const q = rot * width * height + y * width + x;
    if (visited.has(q)) continue;
    visited.add(q);
    visitedPositions.add(y * width + x);

    let newRots;

    const cell = input[y][x];

    switch (cell) {
      case ".":
        newRots = [rot];
        break;
      case "/":
        newRots = [
          {
            0: 3,
            3: 0,
            1: 2,
            2: 1,
          }[rot]!,
        ];
        break;
      case "\\":
        newRots = [
          {
            0: 1,
            1: 0,
            2: 3,
            3: 2,
          }[rot]!,
        ];
        break;
      case "-":
        if (rot % 2 === 0) {
          newRots = [rot];
        } else {
          newRots = [rot + 1, rot - 1];
        }
        break;
      case "|":
        if (rot % 2 === 1) {
          newRots = [rot];
        } else {
          newRots = [rot + 1, rot - 1];
        }
        break;
      default:
        throw new Error(`invalid case ${cell}`);
    }
    newRots = newRots.map((r) => (r + 4) % 4);

    for (const newRot of newRots) {
      switch (newRot) {
        case 0: {
          if (x < width - 1) {
            positions.push([x + 1, y, newRot]);
          }
          break;
        }
        case 1: {
          if (y < height - 1) {
            positions.push([x, y + 1, newRot]);
          }
          break;
        }
        case 2: {
          if (x > 0) {
            positions.push([x - 1, y, newRot]);
          }
          break;
        }
        case 3: {
          if (y > 0) {
            positions.push([x, y - 1, newRot]);
          }
          break;
        }
      }
    }
  }

  if (visitedPositions.size > maxVisitedPositions) maxVisitedPositions = visitedPositions.size;
  console.log(performance.now() - start, visitedPositions.size);
}

output(maxVisitedPositions).forTest(51).forActual(7831);
