import { output, loadLines } from "aocutils";
import { PriorityQueue } from "@datastructures-js/priority-queue";

const input = loadLines().map((i) => i.chars.map((i) => i.num));

const width = input[0].length;
const height = input.length;
const wh = width * height;

const data = new Uint8Array(input.flat());

const visited = new Uint8Array(wh * 16);
let answer = -1;

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
  if (
    x < width - 1 &&
    (rotation !== 0 || noSteps < 10) &&
    (rotation === 0 || noSteps > 3) &&
    rotation !== 2
  ) {
    positions.push([
      x + 1,
      y,
      0,
      rotation === 0 ? noSteps + 1 : 1,
      heatLoss + data[x + 1 + y * width],
    ]);
  }
  if (
    x > 0 &&
    (rotation !== 2 || noSteps < 10) &&
    (rotation === 2 || noSteps > 3) &&
    rotation !== 0
  ) {
    positions.push([
      x - 1,
      y,
      2,
      rotation === 2 ? noSteps + 1 : 1,
      heatLoss + data[x - 1 + y * width],
    ]);
  }
  if (
    y < height - 1 &&
    (rotation !== 1 || noSteps < 10) &&
    (rotation === 1 || noSteps > 3) &&
    rotation !== 3
  ) {
    positions.push([
      x,
      y + 1,
      1,
      rotation === 1 ? noSteps + 1 : 1,
      heatLoss + data[x + (y + 1) * width],
    ]);
  }
  if (
    y > 0 &&
    (rotation !== 3 || noSteps < 10) &&
    (rotation === 3 || noSteps > 3) &&
    rotation !== 1
  ) {
    positions.push([
      x,
      y - 1,
      3,
      rotation === 3 ? noSteps + 1 : 1,
      heatLoss + data[x + (y - 1) * width],
    ]);
  }
}
console.log(n);
output(answer).forTest(94).forActual(1157);
