import { output, loadLines } from "aocutils";
import { PriorityQueue } from "@datastructures-js/priority-queue";

const input = loadLines().map((i) => i.chars.map((i) => i.num));

const width = input[0].length;
const height = input.length;
const wh = width * height;

const data = new Uint8Array(input.flat());

const visited = new Uint8Array(wh * 16);
let answer = -1;

const validMoves = new Uint8Array(4 * 4 * 11);
for (let rotation = 0; rotation < 4; rotation++) {
  for (let noSteps = 0; noSteps < 11; noSteps++) {
    const n = noSteps * 16 + rotation * 4;
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

const positions = new PriorityQueue<[number, number, number, number, number]>((a, b) => {
  return a[4] - b[4];
});
positions.enqueue([0, 0, 0, 0, 0]);
let n = 0;
while (!positions.isEmpty()) {
  n++;
  const [x, y, rotation, noSteps, heatLoss] = positions.dequeue();
  const p = x + y * width + rotation * wh + noSteps * wh * 4;
  if (visited[p]) continue;
  visited[p] = 1;
  const coord = x + y * width;
  if (coord === wh - 1) {
    if (noSteps > 3) {
      answer = heatLoss;
      break;
    }
    continue;
  }
  const m = noSteps * 16 + rotation * 4;
  if (
    x < width - 1 &&
    validMoves[m]
    // (rotation !== 0 || noSteps < 10) &&
    // (rotation === 0 || noSteps > 3) &&
    // rotation !== 2
  ) {
    positions.push([x + 1, y, 0, rotation === 0 ? noSteps + 1 : 1, heatLoss + data[coord + 1]]);
  }
  if (
    x > 0 &&
    validMoves[m + 1]
    // (rotation !== 2 || noSteps < 10) &&
    // (rotation === 2 || noSteps > 3) &&
    // rotation !== 0
  ) {
    positions.push([x - 1, y, 2, rotation === 2 ? noSteps + 1 : 1, heatLoss + data[coord - 1]]);
  }
  if (
    y < height - 1 &&
    validMoves[m + 2]
    // (rotation !== 1 || noSteps < 10) &&
    // (rotation === 1 || noSteps > 3) &&
    // rotation !== 3
  ) {
    positions.push([x, y + 1, 1, rotation === 1 ? noSteps + 1 : 1, heatLoss + data[coord + width]]);
  }
  if (
    y > 0 &&
    validMoves[m + 3]
    // (rotation !== 3 || noSteps < 10) &&
    // (rotation === 3 || noSteps > 3) &&
    // rotation !== 1
  ) {
    positions.push([x, y - 1, 3, rotation === 3 ? noSteps + 1 : 1, heatLoss + data[coord - width]]);
  }
}
console.log(n);
output(answer).forTest(94).forActual(1157);
