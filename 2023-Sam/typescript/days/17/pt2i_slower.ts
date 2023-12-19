import { output, loadLines } from "aocutils";
import { PriorityQueue } from "@datastructures-js/priority-queue";

const input = loadLines().map((i) => i.chars.map((i) => i.num));

const actualWidth = input[0].length;
const actualHeight = input.length;

const widthShift = Math.ceil(Math.log2(input[0].length));
const widthMultiplier = 1 << widthShift;
const heightShift = Math.ceil(Math.log2(input.length));
const heightMultiplier = 1 << heightShift;
const whShift = widthShift + heightShift;
const whMultiplier = 1 << whShift;

const bottomRight = actualWidth - 1 + (actualHeight - 1) * widthMultiplier;

const data = new Uint8Array(whMultiplier).fill(0);
for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    data[x + (y << widthShift)] = input[y][x];
  }
}

const visited = new Uint8Array(whMultiplier * 4 * 11);
let answer = -1;

const validMoves = new Uint8Array(4 * 4 * 11);
for (let rotation = 0; rotation < 4; rotation++) {
  for (let noSteps = 0; noSteps < 11; noSteps++) {
    const n = (noSteps << 4) + (rotation << 2);
    validMoves[n] =
      (rotation !== 0 || noSteps < 10) && (rotation === 0 || noSteps > 3) && rotation !== 2 ? 1 : 0;
    validMoves[n + 1] =
      (rotation !== 2 || noSteps < 10) && (rotation === 2 || noSteps > 3) && rotation !== 0 ? 1 : 0;
    validMoves[n + 2] =
      (rotation !== 1 || noSteps < 10) && (rotation === 1 || noSteps > 3) && rotation !== 3 ? 1 : 0;
    validMoves[n + 3] =
      (rotation !== 3 || noSteps < 10) && (rotation === 3 || noSteps > 3) && rotation !== 1 ? 1 : 0;
  }
}

class Position {
  public coord: number;
  public p: number;

  constructor(
    public x: number,
    public y: number,
    public rotation: number,
    public noSteps: number,
    public heatLoss: number
  ) {
    this.coord = x + (y << widthShift);
    this.p = x + (y << widthShift) + (rotation << whShift) + (noSteps << (whShift + 2));
  }
}

const positions = new PriorityQueue<Position>((a, b) => {
  return a.heatLoss - b.heatLoss;
});
positions.enqueue(new Position(0, 0, 0, 0, 0));
let n = 0;
while (!positions.isEmpty()) {
  n++;
  const position = positions.dequeue();
  const p = position.p;
  if (visited[p]) continue;
  visited[p] = 1;
  if (position.coord === bottomRight) {
    if (position.noSteps > 3) {
      console.log("C:" + position.heatLoss.toString());
      answer = position.heatLoss;
      break;
    }
    continue;
  }
  const m = (position.noSteps << 4) + (position.rotation << 2);
  if (
    position.x < actualWidth - 1 &&
    validMoves[m] === 1
    // (position.rotation !== 0 || position.noSteps < 10) &&
    // (position.rotation === 0 || position.noSteps > 3) &&
    // position.rotation !== 2
  ) {
    positions.push(
      new Position(
        position.x + 1,
        position.y,
        0,
        position.rotation === 0 ? position.noSteps + 1 : 1,
        position.heatLoss + data[position.coord + 1]
      )
    );
  }
  if (
    position.x > 0 &&
    validMoves[m + 1] === 1
    // (position.rotation !== 2 || position.noSteps < 10) &&
    // (position.rotation === 2 || position.noSteps > 3) &&
    // position.rotation !== 0
  ) {
    positions.push(
      new Position(
        position.x - 1,
        position.y,
        2,
        position.rotation === 2 ? position.noSteps + 1 : 1,
        position.heatLoss + data[position.coord - 1]
      )
    );
  }
  if (
    position.y < actualHeight - 1 &&
    validMoves[m + 2] === 1
    // (position.rotation !== 1 || position.noSteps < 10) &&
    // (position.rotation === 1 || position.noSteps > 3) &&
    // position.rotation !== 3
  ) {
    positions.push(
      new Position(
        position.x,
        position.y + 1,
        1,
        position.rotation === 1 ? position.noSteps + 1 : 1,
        position.heatLoss + data[position.coord + widthMultiplier]
      )
    );
  }
  if (
    position.y > 0 &&
    validMoves[m + 3] === 1
    // (position.rotation !== 3 || position.noSteps < 10) &&
    // (position.rotation === 3 || position.noSteps > 3) &&
    // position.rotation !== 1
  ) {
    positions.push(
      new Position(
        position.x,
        position.y - 1,
        3,
        position.rotation === 3 ? position.noSteps + 1 : 1,
        position.heatLoss + data[position.coord - widthMultiplier]
      )
    );
  }
}
console.log(n);
output(answer).forTest(94).forActual(1157);
