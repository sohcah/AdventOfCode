import { output, loadLines, ArraySet } from "aocutils";

const input = loadLines()
  .map((i) => i.split("~").map((i) => i.split(",").map(Number) as [number, number, number]))
  .map((i, n) => {
    const invertDirections = i[0][2] > i[1][2];
    return {
      from: invertDirections ? i[1] : i[0],
      to: invertDirections ? i[0] : i[1],
      direction: (i[1][0] !== i[0][0] ? "x" : i[1][1] !== i[0][1] ? "y" : "z") as "x" | "y" | "z",
      directionIndex: (i[1][0] !== i[0][0] ? 0 : i[1][1] !== i[0][1] ? 1 : 2) as 0 | 1 | 2,
      id: n,
    };
  })
  .sort((a, b) => a.from[2] - b.from[2]);

const start = performance.now();

const brickIdMax = input.length;

type Brick = (typeof input)[number];

function getCoordRange(brick: Brick) {
  const min = Math.min(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const max = Math.max(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const coords: number[] = [];
  let coord = getCoord(...brick.from);
  const offset = [1, yMult, zMult][brick.directionIndex];
  for (let i = min; i <= max; i++) {
    coords.push(coord);
    coord += offset;
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
const zOffset = Math.min(1, startAndRange[2][0]);

const max = zMult * startAndRange[2][1];

function getCoord(x: number, y: number, z: number): number {
  return xOffset + x + (y + yOffset) * yMult + (z + zOffset) * zMult;
}

const bricksAtCoords = new Array<Brick>(max).fill(null!);
for (const brick of input) {
  for (const coord of getCoordRange(brick)) {
    bricksAtCoords[coord] = brick;
  }
}

function collapse(internalInput: Brick[], internalBricksAtCoords: Brick[], maxFall = 1000) {
  const collapsed = new ArraySet(brickIdMax);
  for (const brick of internalInput) {
    // eslint-disable-next-line no-constant-condition
    for (let i = 0; i < maxFall; i++) {
      const coords = getCoordRange(brick);
      const canMoveDown = coords.every((i) => {
        if (i < zMult) return false;
        const b = internalBricksAtCoords[i - zMult];
        return b === brick || b === null;
      });
      if (!canMoveDown) break;
      for (const coord of coords) {
        internalBricksAtCoords[coord] = null!;
      }
      brick.from[2]--;
      brick.to[2]--;
      for (const coord of getCoordRange(brick)) {
        internalBricksAtCoords[coord] = brick;
      }
      collapsed.add(brick.id);
    }
  }
  return collapsed.size;
}

collapse(input, bricksAtCoords);

const nonDisintegratableBricks = input.flatMap((brick) => {
  const bricksAbove = new Set(
    getCoordRange(brick).flatMap((i) => {
      const above = bricksAtCoords[i + zMult];
      if (!above || above === brick) return [];
      return [above];
    })
  );
  let disintegratable = true;
  for (const above of bricksAbove) {
    disintegratable &&= getCoordRange(above).some((i) => {
      const below = bricksAtCoords[i - zMult];
      return below && below !== brick && below !== above;
    });
  }
  if (disintegratable) return [];
  return [brick];
});

console.log(performance.now() - start);

const disStart = performance.now();

let sum = 0;
for (const brick of nonDisintegratableBricks) {
  const inputClone = structuredClone(input.filter((i) => i !== brick));
  const bricksAtCoordsClone = new Array<Brick>(max).fill(null!);
  for (const brick of inputClone) {
    for (const coord of getCoordRange(brick)) {
      bricksAtCoordsClone[coord] = brick;
    }
  }

  const collapsed = collapse(inputClone, bricksAtCoordsClone, 1);
  sum += collapsed;
}
console.log(performance.now() - start);
console.log("Avg:", (performance.now() - disStart) / nonDisintegratableBricks.length);

output(sum).forTest(7).forActual(61276);
