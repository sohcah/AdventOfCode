import { output, loadLines } from "aocutils";

const input = loadLines();

const width = input[0].length;
const height = input.length;
const wh = width * height;

const data = new Uint8Array(
  input
    .flatMap((i) => [...i])
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
      }
      throw new Error(`invalid cell ${i}`);
    })
);

const startPositions: number[] = [];
for (let x = 0; x < width; x++) {
  for (let y = 0; y < height; y++) {
    const c = y * width + x;
    if (x === 0) {
      startPositions.push(c);
    }
    if (y === 0) {
      startPositions.push(c + wh);
    }
    if (x === width - 1) {
      startPositions.push(c + wh * 2);
    }
    if (y === height - 1) {
      startPositions.push(c + wh * 3);
    }
  }
}

let maxVisitedPositions = 0;
for (const startPos of startPositions) {
  // const start = performance.now();
  const visited: Set<number> = new Set();
  const visitedPositions: Set<number> = new Set();
  const positions: number[] = [startPos];

  for (let p = 0; p < positions.length; p++) {
    const q = positions[p];
    const c = q % wh;
    const rot = Math.floor(q / wh);
    const x = c % width;
    const y = Math.floor(c / width);
    // console.log(x, y, data[c]);
    if (visited.has(q)) continue;
    visited.add(q);
    visitedPositions.add(c);

    let newRots;

    const cell = data[c];

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
    newRots = newRots.map((r) => (r + 4) % 4);

    for (const newRot of newRots) {
      const nq = c + newRot * wh;
      switch (newRot) {
        case 0: {
          if (x < width - 1) {
            positions.push(nq + 1);
          }
          break;
        }
        case 1: {
          if (y < height - 1) {
            positions.push(nq + width);
          }
          break;
        }
        case 2: {
          if (x > 0) {
            positions.push(nq - 1);
          }
          break;
        }
        case 3: {
          if (y > 0) {
            positions.push(nq - width);
          }
          break;
        }
      }
    }
  }

  if (visitedPositions.size > maxVisitedPositions) maxVisitedPositions = visitedPositions.size;
  // console.log(performance.now() - start, visitedPositions.size);
}

output(maxVisitedPositions).forTest(51).forActual(7831);
