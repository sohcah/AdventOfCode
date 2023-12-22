import { output, loadLines } from "aocutils";

const input = loadLines();

class Brick {
  public xys: number[];
  public dependentOn: number = -1;
  constructor(
    public minX: number,
    public minY: number,
    public minZ: number,
    public maxX: number,
    public maxY: number,
    public maxZ: number,
    public index: number
  ) {
    this.xys = [];
    for (let x = this.minX; x <= this.maxX; x++) {
      for (let y = this.minY; y <= this.maxY; y++) {
        this.xys.push(x + y * 10);
      }
    }
  }

  overlaps(other: Brick) {
    return (
      this.minX <= other.maxX &&
      this.maxX >= other.minX &&
      this.minY <= other.maxY &&
      this.maxY >= other.minY
    );
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Item(${this.index}) { Z: ${this.minZ}-${this.maxZ}, DO: ${this.dependentOn} }`;
  }
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
  for (const xy of brick.xys) {
    if (maxHeight[xy] > max) max = maxHeight[xy];
  }
  brick.maxZ = brick.maxZ - brick.minZ + max + 1;
  brick.minZ = max + 1;
  for (const xy of brick.xys) {
    maxHeight[xy] = brick.maxZ;
  }
}

bricks.sort((a, b) => a.maxZ - b.maxZ);

for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
  const brick = bricks[brickIndex];
  brick.dependentOn = 0;
  for (let otherIndex = brickIndex - 1; otherIndex >= 0; otherIndex--) {
    const other = bricks[otherIndex];
    if (other.maxZ < brick.minZ - 1) break;
    if (other.maxZ >= brick.minZ) continue;
    if (other.overlaps(brick)) {
      brick.dependentOn++;
    }
  }
}

bricks.sort((a, b) => a.minZ - b.minZ);

let count = 0;
for (let brickIndex = 0; brickIndex < bricks.length; brickIndex++) {
  const brick = bricks[brickIndex];
  let hasDependent = false;
  for (let otherIndex = brickIndex + 1; otherIndex < bricks.length; otherIndex++) {
    const other = bricks[otherIndex];
    if (other.minZ > brick.maxZ + 1) break;
    if (other.minZ <= brick.maxZ) continue;
    if (other.dependentOn === 1 && other.overlaps(brick)) {
      hasDependent = true;
      break;
    }
  }
  if (!hasDependent) count++;
}

output(count).forTest(5).forActual(517);
