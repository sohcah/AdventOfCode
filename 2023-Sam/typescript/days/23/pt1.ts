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

printGrid((x, y) => grid[y][x]);

function getCoord(x: number, y: number) {
  return x + y * width;
}

const data = grid.flat();

const startPos = getCoord(grid[0].indexOf("."), 0);
const endPos = getCoord(grid[height - 1].indexOf("."), height - 1);

const positions = [[startPos]];

function addPath(path: number[]) {
  if (new Set(path).size !== path.length) return;
  positions.push(path);
}

const endPaths = [];

for (let p = 0; p < positions.length; p++) {
  const path = positions[p];
  const pos = path.at(-1)!;

  if (p % 10000 === 0) console.log(p);

  // console.log(data[pos], pos);

  if (pos === endPos) {
    endPaths.push(path);
    continue;
  }

  // up
  if (pos !== startPos && (data[pos - width] === "." || data[pos - width] === "^")) {
    addPath([...path, pos - width]);
  }

  // down
  if (data[pos + width] === "." || data[pos + width] === "v") {
    addPath([...path, pos + width]);
  }

  // left
  if (data[pos - 1] === "." || data[pos - 1] === "<") {
    addPath([...path, pos - 1]);
  }

  // right
  if (data[pos + 1] === "." || data[pos + 1] === ">") {
    addPath([...path, pos + 1]);
  }
}

// console.log(endPaths);

output(endPaths.map(i => i.length).max() - 1).forTest(94);
