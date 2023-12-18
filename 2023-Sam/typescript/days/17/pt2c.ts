import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => i.chars.map((i) => i.num));
// console.log(input);

const width = input[0].length;
const height = input.length;
const wh = width * height;

const data = new Uint8Array(input.flat());

const visited = new Uint16Array(wh * 16);
let best = Infinity;

console.log(wh * 16);

let positions: [number, number, number, number, number][] = [[0, 0, 0, 0, -input[0][0]]];
for (let step = 1; step < 100000000000; step++) {
  if (positions.length === 0) break;
  const nextPositions: typeof positions = [];
  console.log(positions.length);
  for (const [x, y, rotation, noSteps, heatLoss] of positions) {
    const p = x + y * width + rotation * wh + noSteps * wh * 4;
    if (visited[p] && visited[p] <= heatLoss) {
      continue;
    }
    // if (visited[p]) {
    //   console.log(p, visited[p], heatLoss);
    // }
    visited[p] = heatLoss;
    const coord = x + y * width;
    const h = heatLoss + data[coord];
    if (coord === wh - 1) {
      if (noSteps > 3 && best > h) best = h;
      continue;
    }
    if (
      x < width - 1 &&
      (rotation !== 0 || noSteps < 10) &&
      (rotation === 0 || noSteps > 3) &&
      rotation !== 2
    ) {
      nextPositions.push([x + 1, y, 0, rotation === 0 ? noSteps + 1 : 1, h]);
    }
    if (
      x > 0 &&
      (rotation !== 2 || noSteps < 10) &&
      (rotation === 2 || noSteps > 3) &&
      rotation !== 0
    ) {
      nextPositions.push([x - 1, y, 2, rotation === 2 ? noSteps + 1 : 1, h]);
    }
    if (
      y < height - 1 &&
      (rotation !== 1 || noSteps < 10) &&
      (rotation === 1 || noSteps > 3) &&
      rotation !== 3
    ) {
      nextPositions.push([x, y + 1, 1, rotation === 1 ? noSteps + 1 : 1, h]);
    }
    if (
      y > 0 &&
      (rotation !== 3 || noSteps < 10) &&
      (rotation === 3 || noSteps > 3) &&
      rotation !== 1
    ) {
      nextPositions.push([x, y - 1, 3, rotation === 3 ? noSteps + 1 : 1, h]);
    }
  }
  positions = nextPositions;
}

output(best).forTest(94).forActual(1157);
