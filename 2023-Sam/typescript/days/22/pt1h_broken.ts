import { output, loadLines } from "aocutils";

const input = loadLines();

const bricksByXY: Set<Brick>[] = new Array(100).fill(null).map(() => new Set());

class Brick {
  public xys: number[];
  public above: Brick[] = [];
  public below: Brick[] = [];
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

  get standingOn() {
    const bricks = [];
    for (const brick of this.below) {
      if (brick.maxZ < this.minZ - 1) break;
      bricks.push(brick);
    }
    return bricks;
  }

  get stoodOnBy() {
    const bricks = [];
    for (const brick of this.above) {
      if (brick.minZ > this.maxZ + 1) break;
      bricks.push(brick);
    }
    return bricks;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return `Item(${this.index}) { Z: ${this.minZ}-${this.maxZ} }`;
  }
}

const bricks = input
  .map((l, i) => {
    const n = l.indexOf("~");
    return new Brick(+l[0], +l[2], +l.slice(4, n), +l[n + 1], +l[n + 3], +l.slice(n + 5), i);
  })
  .toSorted((a, b) => a.minZ - b.minZ);

for (const brick of bricks) {
  for (const xy of brick.xys) {
    bricksByXY[xy].add(brick);
  }
}

for (const brick of bricks) {
  for (const xy of brick.xys) {
    let above = false;
    const bricksAtXY = bricksByXY[xy];
    for (const other of bricksAtXY) {
      if (other === brick) {
        above = true;
        continue;
      }
      if (above) {
        brick.above.push(other);
      } else {
        brick.below.push(other);
      }
    }
  }
  brick.below.sort((a, b) => b.maxZ - a.maxZ);
}

for (const brick of bricks) {
  const below = brick.below[0];
  if (!below) {
    brick.maxZ = brick.maxZ - brick.minZ + 1;
    brick.minZ = 1;
    continue;
  }
  const diff = brick.minZ - below.maxZ;
  if (diff === 1) continue;
  brick.minZ -= diff - 1;
  brick.maxZ -= diff - 1;
}

let sum = 0;
for (const brick of bricks) {
  console.log(brick, brick.stoodOnBy, brick.standingOn);
  if (!brick.stoodOnBy.some((i) => i.standingOn.length === 1)) {
    sum++;
  }
}

output(sum).forTest(5).forActual(517);
