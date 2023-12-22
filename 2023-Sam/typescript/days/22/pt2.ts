import { output, loadLines } from "aocutils";

const input = loadLines()
  .map((i) => i.split("~").map((i) => i.split(",").map(Number) as [number, number, number]))
  .map((i, n) => ({
    from: i[0],
    to: i[1],
    direction: (i[1][0] !== i[0][0] ? "x" : i[1][1] !== i[0][1] ? "y" : "z") as "x" | "y" | "z",
    directionIndex: (i[1][0] !== i[0][0] ? 0 : i[1][1] !== i[0][1] ? 1 : 2) as 0 | 1 | 2,
    name: n.toString(36),
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

function collapse(internalInput: Brick[], internalBricksAtCoords: Map<string, Brick>) {
  const collapsed = new Set<string>();
  let changed = true;
  while (changed) {
    changed = false;
    for (const brick of internalInput) {
      const canMoveDown = getCoordRange(brick).every((i) => {
        const b = internalBricksAtCoords.get(getCoord(i[0], i[1], i[2] - 1));
        return (b === brick || b === undefined) && i[2] > 1;
      });
      if (canMoveDown) {
        for (const coord of getCoordRange(brick)) {
          internalBricksAtCoords.delete(getCoord(...coord));
        }
        brick.from = brick.from.with(2, brick.from[2] - 1) as [number, number, number];
        brick.to = brick.to.with(2, brick.to[2] - 1) as [number, number, number];
        for (const coord of getCoordRange(brick)) {
          internalBricksAtCoords.set(getCoord(...coord), brick);
        }
        collapsed.add(brick.name);
        changed = true;
      }
    }
  }
  return collapsed.size;
}

collapse(input, bricksAtCoords);

const nonDisintegratableBricks = input.flatMap((brick) => {
  const bricksAbove = new Set(
    getCoordRange(brick).flatMap((i) => {
      const above = bricksAtCoords.get(getCoord(i[0], i[1], i[2] + 1));
      if (!above || above === brick) return [];
      return [above];
    })
  );
  let disintegratable = true;
  for (const above of bricksAbove) {
    disintegratable &&= getCoordRange(above).some((i) => {
      const below = bricksAtCoords.get(getCoord(i[0], i[1], i[2] - 1));
      return below && below !== brick && below !== above;
    });
  }
  if (disintegratable) return [];
  return [brick];
});

let sum = 0;
for (const brick of nonDisintegratableBricks) {
  const inputClone = structuredClone(input.filter((i) => i !== brick));
  const bricksAtCoordsClone = new Map<string, Brick>();
  for (const brick of inputClone) {
    for (const coord of getCoordRange(brick)) {
      bricksAtCoordsClone.set(getCoord(...coord), brick);
    }
  }

  const collapsed = collapse(inputClone, bricksAtCoordsClone);
  // console.log(brick.name, collapsed);
  sum += collapsed;
}

output(sum).forTest(7).forActual(61276);
