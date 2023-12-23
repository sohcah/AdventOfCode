import { p, load, output, loadLines } from "aocutils";

const grid = loadLines().map((i) => i.chars);

const height = grid.length;
const width = grid[0].length;

function printGrid(fn: (x: number, y: number) => string) {
  console.log("-".repeat(width + 2));
  for (let y = 0; y < height; y++) {
    let line = " ";
    for (let x = 0; x < width; x++) {
      line += fn(x, y);
    }
    console.log(line);
  }
  console.log("-".repeat(width + 2));
}

// printGrid((x, y) => grid[y][x]);

function getCoord(x: number, y: number) {
  return x + y * width;
}

const data = grid.flat();

const startPos = getCoord(grid[0].indexOf("."), 0);
const endPos = getCoord(grid[height - 1].indexOf("."), height - 1);

const positions: [Set<number>, number][] = [[new Set([startPos]), startPos]];

function addPath(path: [Set<number>, number]) {
  if (path[0].has(path[1])) return;
  const newSet = new Set(path[0]);
  newSet.add(path[1]);
  positions.push([newSet, path[1]]);
}

const endPaths = [];

const slowest = new Uint16Array(width * height).fill(0);

let p = 0;
while (positions.length) {
  const [pathSet, pos] = positions.pop()!;

  if (p % 10000 === 0) console.log(p, positions.length, pathSet.size);

  // if (slowest[pos] > pathSet.size) continue;
  // slowest[pos] = pathSet.size;

  // console.log(data[pos], pos);

  if (pos === endPos) {
    endPaths.push(pathSet);
    console.log("endPaths", endPaths.length, endPaths.map((i) => i.size).max() - 1);
    continue;
  }

  // up
  if (pos !== startPos && data[pos - width] !== "#") {
    addPath([pathSet, pos - width]);
  }

  // down
  if (data[pos + width] !== "#") {
    addPath([pathSet, pos + width]);
  }

  // left
  if (data[pos - 1] !== "#") {
    addPath([pathSet, pos - 1]);
  }

  // right
  if (data[pos + 1] !== "#") {
    addPath([pathSet, pos + 1]);
  }
  p++;
}

// console.log(endPaths);

output(endPaths.map((i) => i.size).max() - 1).forTest(154);
