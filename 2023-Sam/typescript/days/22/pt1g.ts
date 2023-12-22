import { output, loadLines } from "aocutils";

const input = loadLines()
  .map((i) => i.split("~").map((i) => i.split(",").map(Number) as [number, number, number]))
  .map((i) => {
    const invertDirections = i[0][2] > i[1][2];
    return {
      from: invertDirections ? i[1] : i[0],
      to: invertDirections ? i[0] : i[1],
      directionIndex: (i[1][0] !== i[0][0] ? 0 : i[1][1] !== i[0][1] ? 1 : 2) as 0 | 1 | 2,
      id: 0,
      range: [] as number[],
    };
  })
  .sort((a, b) => a.from[2] - b.from[2])
  .map((i, n) => {
    i.id = n;
    return i;
  });

const brickIdMax = input.length;

type Brick = (typeof input)[number];

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

for (const brick of input) {
  const min = Math.min(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  const max = Math.max(brick.from[brick.directionIndex], brick.to[brick.directionIndex]);
  let coord = getCoord(...brick.from);
  const offset = [1, yMult, zMult][brick.directionIndex];
  for (let i = min; i <= max; i++) {
    brick.range.push(coord);
    coord += offset;
  }
}

const bricksAtCoords = new Uint16Array(max).fill(-1);
const NULL = bricksAtCoords[0];
for (const brick of input) {
  for (const coord of brick.range) {
    bricksAtCoords[coord] = brick.id;
  }
}

function collapse(internalInput: Brick[], internalBricksAtCoords: Uint16Array) {
  for (const brick of internalInput) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const canMoveDown = brick.range.every((i) => {
        if (i < zMult) return false;
        const b = internalBricksAtCoords[i - zMult];
        return b === brick.id || b === NULL;
      });
      if (!canMoveDown) break;
      for (const coord of brick.range) {
        internalBricksAtCoords[coord] = NULL;
      }
      brick.from[2]--;
      brick.to[2]--;
      for (let i = 0; i < brick.range.length; i++) {
        brick.range[i] -= zMult;
        internalBricksAtCoords[brick.range[i]] = brick.id;
      }
    }
  }
}

collapse(input, bricksAtCoords);

const disintegratableBricks = input.count((brick) => {
  const bricksAbove = new Uint8Array(brickIdMax).fill(0);
  for (const i of brick.range) {
    const above = bricksAtCoords[i + zMult];
    if (above === NULL || above === brick.id || bricksAbove[above]) continue;
    bricksAbove[above] = 1;
    if (
      !input[above].range.some((i) => {
        const below = bricksAtCoords[i - zMult];
        return below !== NULL && below !== brick.id && below !== above;
      })
    )
      return false;
  }
  return true;
});

output(disintegratableBricks).forTest(5).forActual(517);
