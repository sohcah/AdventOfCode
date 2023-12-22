import { p, load, output, loadLines } from "aocutils";

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
console.log(input);

function getCoordRange(brick: Brick) {
  const min = Math.min(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const max = Math.max(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const coords = [];
  for (let i = min; i <= max; i++) {
    coords.push(brick.from.with(brick.directionIndex, i) as [number, number, number]);
  }
  return coords;
}

// const minX = Math.min(...input.flatMap((i) => [i.from[0], i.to[0]]));
// const maxX = Math.max(...input.flatMap((i) => [i.from[0], i.to[0]]));
// const rangeX = maxX - minX;
const bricksAtCoords = new Map<string, Brick>();
for (const brick of input) {
  for (const coord of getCoordRange(brick)) {
    bricksAtCoords.set(getCoord(...coord), brick);
  }
}

function getCoord(x: number, y: number, z: number): string {
  return `${x},${y},${z}`;
}

let changed = true;
while (changed) {
  changed = false;
  for (const brick of input) {
    // console.log(brick);
    const canMoveDown = getCoordRange(brick).every((i) => {
      const b = bricksAtCoords.get(getCoord(i[0], i[1], i[2] - 1));
      return (b === brick || b === undefined) && i[2] > 1;
    });
    if (canMoveDown) {
      for (const coord of getCoordRange(brick)) {
        bricksAtCoords.delete(getCoord(...coord));
      }
      brick.from = brick.from.with(2, brick.from[2] - 1) as [number, number, number];
      brick.to = brick.to.with(2, brick.to[2] - 1) as [number, number, number];
      for (const coord of getCoordRange(brick)) {
        bricksAtCoords.set(getCoord(...coord), brick);
      }
      changed = true;
    }
  }
}
// console.log(bricksAtCoords);

let count = 0;
for (const brick of input) {
  const bricksAbove = new Set(
    getCoordRange(brick).flatMap((i) => {
      const above = bricksAtCoords.get(getCoord(i[0], i[1], i[2] + 1));
      if (!above || above === brick) return [];
      return [above];
    })
  );
  let disintegratable = true;
  for (const above of bricksAbove) {
    console.log(brick.name, "+", above.name);
    disintegratable &&= getCoordRange(above).some((i) => {
      const below = bricksAtCoords.get(getCoord(i[0], i[1], i[2] - 1));
      return below && below !== brick && below !== above;
    });
  }
  if (disintegratable) {
    console.log(brick.name); //, bricksAbove);
    count++;
  }
}

output(count).forTest(5).forActual(517);
