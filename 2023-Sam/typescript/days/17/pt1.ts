import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => i.chars.map((i) => i.num));
// console.log(input);

const width = input[0].length;
const height = input.length;
const wh = width * height;

const visited = new Uint8Array(wh * 16);
const visitedPositions = new Uint16Array(wh).fill(-1);

let positions = [[-input[0][0] * wh * 16]];
for (let step = 1; step < 100000000000; step++) {
  if (positions.length === 0) break;
  const nextPositions = [];
  console.log(positions.length);
  for (const q of positions) {
    const position = q.at(-1)!;
    const p = position % (wh * 16);
    const heatLoss = Math.floor(position / (wh * 16));
    if (visited[p] && visited[p] < heatLoss) continue;
    visited[p] = heatLoss;
    const coord = position % wh;
    const x = coord % width;
    const y = Math.floor(coord / width) % height;
    const rotation = Math.floor(position / wh) % 4;
    const noSteps = Math.floor(position / wh / 4) % 4;
    const h = heatLoss + input[y][x];
    // console.log(x, y, rotation, noSteps, h);
    if (visitedPositions[coord] > h) visitedPositions[coord] = h;
    if (coord === wh - 1) {
      if (h === 1359)
        for (let y = 0; y < height; y++) {
          let r = "";
          for (let x = 0; x < width; x++) {
            const f = q.find((i) => i % wh === y * width + x)
            if (f) {
              const fr = Math.floor(f / wh) % 4;
              r += `${[">","v","<","^"][fr]}`;
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
        ...q,
        coord + 1 + 0 * wh + (rotation === 0 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (x > 0 && (rotation !== 2 || noSteps < 3) && rotation !== 0) {
      nextPositions.push([
        ...q,
        coord - 1 + 2 * wh + (rotation === 2 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (coord < wh - width - 1 && (rotation !== 1 || noSteps < 3) && rotation !== 3) {
      nextPositions.push([
        ...q,
        coord + width + 1 * wh + (rotation === 1 ? noSteps + 1 : 1) * wh * 4 + h * wh * 16,
      ]);
    }
    if (coord > width && (rotation !== 3 || noSteps < 3) && rotation !== 1) {
      nextPositions.push([
        ...q,
        coord - width + 3 * wh + (rotation === 3 ? noSteps + 1 : 0) * wh * 4 + h * wh * 16,
      ]);
    }
  }
  positions = nextPositions;
}

console.log("ans", visitedPositions[wh - 1]);

output(visitedPositions[wh - 1]).forTest(102);
