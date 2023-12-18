import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => i.chars.map((i) => i.num));
// console.log(input);

const width = input[0].length;
const height = input.length;
const wh = width * height;

const visited = new Uint16Array(wh * 16);//.fill(-1);
const visitedPositions = new Uint16Array(wh).fill(-1);

console.log(wh * 16);

let positions: [number, number, number, number, number][][] = [[[0, 0, 0, 0, -input[0][0]]]];
for (let step = 1; step < 100000000000; step++) {
  if (positions.length === 0) break;
  const nextPositions: typeof positions = [];
  console.log(positions.length);
  for (const q of positions) {
    const [x, y, rotation, noSteps, heatLoss] = q.at(-1)!;
    // console.log(x, y, rotation, noSteps, heatLoss);
    const p = x + y * width + rotation * wh + noSteps * wh * 4;
    // if (p >= visited.length) {
    //   console.log("ahh", p);
    // }
    if (visited[p] && visited[p] <= heatLoss) {
      continue;
    }
    // if (visited[p]) {
    //   console.log(p, visited[p], heatLoss);
    // }
    visited[p] = heatLoss;
    const coord = x + y * width;
    const h = heatLoss + input[y][x];
    if (visitedPositions[coord] > h) visitedPositions[coord] = h;
    if (coord === wh - 1) {
      if (h === 1359)
        for (let y = 0; y < height; y++) {
          let r = "";
          for (let x = 0; x < width; x++) {
            const f = q.find((i) => i[0] === x && i[1] === y);
            if (f) {
              const fr = f[2];
              r += `${[">", "v", "<", "^"][fr]}`;
              // r += `+${input[y][x]}`
            } else {
              r += ".";
            }
          }
          console.log(r);
        }
      console.log(coord, step, heatLoss);
      // process.exit(1);
    }
    if (x < width - 1 && (rotation !== 0 || noSteps < 3) && rotation !== 2) {
      nextPositions.push([
        // ...q,
        [x + 1, y, 0, rotation === 0 ? noSteps + 1 : 1, h],
        // coord + 1 + 0 * wh + (rotation === 0 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (x > 0 && (rotation !== 2 || noSteps < 3) && rotation !== 0) {
      nextPositions.push([
        // ...q,
        [x - 1, y, 2, rotation === 2 ? noSteps + 1 : 1, h],
        // coord - 1 + 2 * wh + (rotation === 2 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (y < height - 1 && (rotation !== 1 || noSteps < 3) && rotation !== 3) {
      nextPositions.push([
        // ...q,
        [x, y + 1, 1, rotation === 1 ? noSteps + 1 : 1, h],
        // coord + width + 1 * wh + (rotation === 1 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (y > 0 && (rotation !== 3 || noSteps < 3) && rotation !== 1) {
      nextPositions.push([
        // ...q,
        [x, y - 1, 3, rotation === 3 ? noSteps + 1 : 1, h],
        // coord - width + 3 * wh + (rotation === 3 ? noSteps + 1 : 0) * wh * 4 + h * wh * 16,
      ]);
    }
  }
  positions = nextPositions;
}

console.log("ans", visitedPositions[wh - 1]);

output(visitedPositions[wh - 1]).forTest(102).forActual(936);
