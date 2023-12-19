import { output, loadLines } from "aocutils";
import FlatQueue from "flatqueue";

const input = loadLines().map((i) => i.chars.map((i) => i.num));

const width = input[0].length;
const height = input.length;
const wh = width * height;

const data = new Uint8Array(input.flat());

const visited = new Uint8Array(wh * 4 * 11);
let answer = -1;

const validMoves = new Uint8Array(4 * 4 * 11);
for (let rotation = 0; rotation < 4; rotation++) {
  for (let noSteps = 0; noSteps < 11; noSteps++) {
    const n = noSteps * 4 + rotation;
    validMoves[n] =
      ((rotation !== 0 || noSteps < 3) && rotation !== 2 ? 1 : 0) +
      ((rotation !== 2 || noSteps < 3) && rotation !== 0 ? 2 : 0) +
      ((rotation !== 1 || noSteps < 3) && rotation !== 3 ? 4 : 0) +
      ((rotation !== 3 || noSteps < 3) && rotation !== 1 ? 8 : 0);
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
    this.coord = x + y * width;
    this.p = x + y * width + rotation * wh + noSteps * wh * 4;
  }
}

const positions = new FlatQueue<Position>();
positions.push(new Position(0, 0, 0, 0, 0), 0);
let n = 0;
while (positions.length) {
  n++;
  const position = positions.pop()!;
  const p = position.p;
  if (visited[p]) continue;
  visited[p] = 1;
  if (position.coord === wh - 1) {
    console.log("C:" + position.heatLoss.toString());
    answer = position.heatLoss;
    break;
  }
  const m = validMoves[position.noSteps * 4 + position.rotation];
  if (position.x < width - 1 && m & 1) {
    const h = position.heatLoss + data[position.coord + 1];
    positions.push(
      new Position(
        position.x + 1,
        position.y,
        0,
        position.rotation === 0 ? position.noSteps + 1 : 1,
        h
      ),
      h
    );
  }
  if (position.x > 0 && m & 2) {
    const h = position.heatLoss + data[position.coord - 1];
    positions.push(
      new Position(
        position.x - 1,
        position.y,
        2,
        position.rotation === 2 ? position.noSteps + 1 : 1,
        h
      ),
      h
    );
  }
  if (position.y < height - 1 && m & 4) {
    const h = position.heatLoss + data[position.coord + width];
    positions.push(
      new Position(
        position.x,
        position.y + 1,
        1,
        position.rotation === 1 ? position.noSteps + 1 : 1,
        h
      ),
      h
    );
  }
  if (position.y > 0 && m & 8) {
    const h = position.heatLoss + data[position.coord - width];
    positions.push(
      new Position(
        position.x,
        position.y - 1,
        3,
        position.rotation === 3 ? position.noSteps + 1 : 1,
        h
      ),
      h
    );
  }
}
console.log(n);
output(answer).forTest(102).forActual(936);
