import { output, loadLines } from "aocutils";

const input = loadLines()
  .map((i) => i.split("~").map((i) => i.split(",").map(Number) as [number, number, number]))
  .map((i, n) => ({
    from: i[0],
    to: i[1],
    direction: (i[1][0] !== i[0][0] ? "x" : i[1][1] !== i[0][1] ? "y" : "z") as "x" | "y" | "z",
    directionIndex: (i[1][0] !== i[0][0] ? 0 : i[1][1] !== i[0][1] ? 1 : 2) as 0 | 1 | 2,
    name: (n + 10).toString(36),
  }));

type Brick = (typeof input)[number];

function getCoordRange(brick: Brick) {
  const min = Math.min(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const max = Math.max(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const coords = [];
  for (let i = min; i <= max; i++) {
    coords.push(brick.from.with(brick.directionIndex, i) as [number, number, number]);
  }
  return coords;
}

const startAndRange = [0, 1, 2].map((index) => {
  const min = Math.min(...input.flatMap((i) => [i.from[index], i.to[index]]));
  const max = Math.max(...input.flatMap((i) => [i.from[index], i.to[index]]));
  const range = max - min + 1;
  return [-min, range];
});

const xOffset = startAndRange[0][0];
const yMult = startAndRange[0][1];
const yOffset = startAndRange[1][0];
const zMult = yMult * startAndRange[1][1];
const zOffset = startAndRange[2][0];

const max = zMult * startAndRange[2][1];

function getCoord(x: number, y: number, z: number): number {
  return xOffset + x + (y + yOffset) * yMult + (z + zOffset) * zMult;
}

const bricksAtCoords = new Array<Brick>(max).fill(null!);
for (const brick of input) {
  for (const coord of getCoordRange(brick)) {
    bricksAtCoords[getCoord(...coord)] = brick;
  }
}

const sorted = input.sortByAsc((i) => Math.min(i.from[2], i.to[2]));
for (const brick of sorted) {
  let changed = true;
  while (changed) {
    changed = false;
    const canMoveDown = getCoordRange(brick).every((i) => {
      const b = bricksAtCoords[getCoord(i[0], i[1], i[2] - 1)];
      return (b === brick || b === null) && i[2] > 1;
    });
    if (canMoveDown) {
      for (const coord of getCoordRange(brick)) {
        bricksAtCoords[getCoord(...coord)] = null!;
      }
      brick.from = brick.from.with(2, brick.from[2] - 1) as [number, number, number];
      brick.to = brick.to.with(2, brick.to[2] - 1) as [number, number, number];
      for (const coord of getCoordRange(brick)) {
        bricksAtCoords[getCoord(...coord)] = brick;
      }
      changed = true;
    }
  }
}

let count = 0;
for (const brick of input) {
  const bricksAbove = new Set(
    getCoordRange(brick).flatMap((i) => {
      const above = bricksAtCoords[getCoord(i[0], i[1], i[2] + 1)];
      if (!above || above === brick) return [];
      return [above];
    })
  );
  let disintegratable = true;
  for (const above of bricksAbove) {
    disintegratable &&= getCoordRange(above).some((i) => {
      const below = bricksAtCoords[getCoord(i[0], i[1], i[2] - 1)];
      return below && below !== brick && below !== above;
    });
  }
  if (disintegratable) count++;
}

output(count).forTest(5).forActual(517);
