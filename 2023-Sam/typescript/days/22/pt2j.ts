import { output } from "aocutils";

const input = load().split("\n");

class Brick {
  // public xys: number[];
  public dependentOn: Brick[] = [];
  constructor(
    public minX: number,
    public minY: number,
    public minZ: number,
    public maxX: number,
    public maxY: number,
    public maxZ: number,
    public index: number
  ) {
    // this.xys = [];
    // for (let x = this.minX; x <= this.maxX; x++) {
    //   for (let y = this.minY; y <= this.maxY; y++) {
    //     this.xys.push(x + y * 10);
    //   }
    // }
  }

  overlaps(other: Brick) {
    return (
      this.minX <= other.maxX &&
      this.maxX >= other.minX &&
      this.minY <= other.maxY &&
      this.maxY >= other.minY
    );
  }

  // [Symbol.for("nodejs.util.inspect.custom")]() {
  //   return `Item(${this.index}) { Z: ${this.minZ}-${this.maxZ}, DO: ${Array.from(
  //     this.dependentOn
  //   ).join(",")} }`;
  // }
}

const bricks = input
  .map((l, i) => {
    const n = l.indexOf("~");
    return new Brick(+l[0], +l[2], +l.slice(4, n), +l[n + 1], +l[n + 3], +l.slice(n + 5), i);
  })
  .toSorted((a, b) => a.minZ - b.minZ);

const maxHeight = new Uint16Array(100).fill(0);

for (const brick of bricks) {
  let max = 0;

  for (let x = brick.minX; x <= brick.maxX; x++) {
    for (let y = brick.minY; y <= brick.maxY; y++) {
      const xy = x + y * 10;
      if (maxHeight[xy] > max) max = maxHeight[xy];
    }
  }
  brick.maxZ = brick.maxZ - brick.minZ + max + 1;
  brick.minZ = max + 1;
  for (let x = brick.minX; x <= brick.maxX; x++) {
    for (let y = brick.minY; y <= brick.maxY; y++) {
      maxHeight[x + y * 10] = brick.maxZ;
    }
  }
}

bricks.sort((a, b) => a.maxZ - b.maxZ);

for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
  const brick = bricks[brickIndex];
  for (let otherIndex = brickIndex - 1; otherIndex >= 0; otherIndex--) {
    const other = bricks[otherIndex];
    if (other.maxZ < brick.minZ - 1) break;
    if (other.maxZ >= brick.minZ) continue;
    if (other.overlaps(brick)) {
      brick.dependentOn.push(other);
    }
  }
}

bricks.sort((a, b) => a.minZ - b.minZ);
bricks.forEach((brick, i) => (brick.index = i));

function iteratorEvery<T>(iterable: Iterable<T>, callbackfn: (value: T) => boolean) {
  for (const value of iterable) {
    if (!callbackfn(value)) return false;
  }
  return true;
}

let sum = 0;
const eliminatedBricks = new Uint8Array(bricks.length);
for (const brick of bricks) {
  eliminatedBricks.fill(0);
  eliminatedBricks[brick.index] = 1;
  let lastValidLayer = brick.maxZ + 1;
  for (let otherIndex = brick.index + 1; otherIndex < bricks.length; otherIndex++) {
    const other = bricks[otherIndex];
    if (other.minZ < brick.maxZ + 1) continue;
    if (other.minZ > lastValidLayer) break;
    if (iteratorEvery(other.dependentOn, (i) => !!eliminatedBricks[i.index])) {
      eliminatedBricks[otherIndex] = 1;
      sum++;
      lastValidLayer = Math.max(lastValidLayer, other.maxZ + 1);
    }
  }
}

output(sum).forTest(7).forActual(61276);
