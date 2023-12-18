import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => i.chars.map((i) => i.num));
// console.log(input);

const width = input[0].length;
const height = input.length;
const wh = width * height;

const visited = new Uint16Array(wh * 16); //.fill(-1);
const visitedPositions = new Uint16Array(wh).fill(-1);

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
    visited[p] = heatLoss;
    const coord = x + y * width;
    const h = heatLoss + input[y][x];
    if (visitedPositions[coord] > h) visitedPositions[coord] = h;
    if (coord === wh - 1) {
      continue;
    }
    if (x < width - 1 && (rotation !== 0 || noSteps < 3) && rotation !== 2) {
      nextPositions.push([x + 1, y, 0, rotation === 0 ? noSteps + 1 : 1, h]);
    }
    if (x > 0 && (rotation !== 2 || noSteps < 3) && rotation !== 0) {
      nextPositions.push([x - 1, y, 2, rotation === 2 ? noSteps + 1 : 1, h]);
    }
    if (y < height - 1 && (rotation !== 1 || noSteps < 3) && rotation !== 3) {
      nextPositions.push([x, y + 1, 1, rotation === 1 ? noSteps + 1 : 1, h]);
    }
    if (y > 0 && (rotation !== 3 || noSteps < 3) && rotation !== 1) {
      nextPositions.push([x, y - 1, 3, rotation === 3 ? noSteps + 1 : 1, h]);
    }
  }
  positions = nextPositions;
}

console.log("ans", visitedPositions[wh - 1]);

output(visitedPositions[wh - 1])
  .forTest(102)
  .forActual(936);
