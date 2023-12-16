import { output, loadLines } from "aocutils";

const input = loadLines();

const width = input[0].length;
const height = input.length;

const s1 = Math.ceil(Math.log2(width + 1));
const s2 = s1 + Math.ceil(Math.log2(height + 1));

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

function internal_jump(startC: number, rot: number) {
  const add = {
    0: 1,
    1: d1,
    2: -1,
    3: -d1,
  }[rot]!;
  const visited: [number, number][] = [];

  let c = startC + add;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (c !== startC + add) {
      visited.push([c - add, c - add + rot * d2]);
      if ((data[c] ?? 255) === 255) {
        return { visited, q: c - add + rot * d2 };
      }
    }
    if (data[c] !== 0 && data[c] !== (rot % 2) + 1) break;
    c += add;
  }

  return { visited, q: c + rot * d2 };
}

const jumpCache = new Map<number, { visited: [number, number][]; q: number }>();
// const jumpCache = new Array(4 * d2).fill(null);
function jump(startC: number, rot: number) {
  const k = startC + rot * d2;
  if (!jumpCache.has(k)) {
    jumpCache.set(k, internal_jump(startC, rot));
  }
  return jumpCache.get(k)!;
}

let maxVisitedPositions = 0;
for (const startPos of startPositions) {
  const start = performance.now();
  const visited = new Set<number>();
  const visitedPositions = new Set<number>();
  const positions = [startPos];
  let n = 0;

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
      const j = jump(c, 0);
      n += j.visited.length;
      for (const v of j.visited) {
        visited.add(v[1]);
        visitedPositions.add(v[0]);
      }
      positions.push(j.q);
    }
    if (cellMapping[r + 1] && c < r1M) {
      const j = jump(c, 1);
      n += j.visited.length;
      for (const v of j.visited) {
        visited.add(v[1]);
        visitedPositions.add(v[0]);
      }
      positions.push(j.q);
    }
    if (cellMapping[r + 2] && x > 0) {
      // positions.push(c + r2O);
      const j = jump(c, 2);
      n += j.visited.length;
      for (const v of j.visited) {
        visited.add(v[1]);
        visitedPositions.add(v[0]);
      }
      positions.push(j.q);
    }
    if (cellMapping[r + 3] && c >= d1) {
      const j = jump(c, 3);
      // n += j.visited.length;
      for (const v of j.visited) {
        visited.add(v[1]);
        visitedPositions.add(v[0]);
      }
      positions.push(j.q);
    }
  }

  // console.log([...visitedPositions].sort());

  if (visitedPositions.size > maxVisitedPositions) maxVisitedPositions = visitedPositions.size;
  console.log(performance.now() - start, visitedPositions.size, positions.length, n);
}

output(maxVisitedPositions).forTest(51).forActual(7831);
