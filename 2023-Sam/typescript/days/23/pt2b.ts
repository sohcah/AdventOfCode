import {p, load, output, loadLines, ArraySet} from "aocutils";

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

function addPath(path: [Set<number>, number], end = false) {
  if (path[0].has(path[1])) return;
  const newSet = new Set(path[0]);
  newSet.add(path[1]);
  positions[end ? "unshift" : "push"]([newSet, path[1]]);
}

let bestEndPath = 0;

const jumpTo = new Array<number[] | null>(width * height).fill(null);
const triedJumpToLookup = new Uint8Array(width * height).fill(0);

let p = 0;
while (positions.length) {
  const [pathSet, pos] = positions.pop()!;

  if (p % 10000 === 0)
    console.log(
      p,
      positions.length,
      pathSet.size,
      jumpTo.count((i) => i !== null)
    );

  if (jumpTo[pos] !== null) {
    const arr = [...pathSet, ...jumpTo[pos]!.slice(0, -1)];
    const set = new Set(arr);
    if (arr.length === set.size) {
      addPath([set, jumpTo[pos]!.at(-1)!]);
      // console.log("jumped from", pos, "to", jumpTo[pos]);
      continue;
    }
  }

  // At a directional;
  if (data[pos] !== ".") {
    // console.log("Found direction", data[pos]);
    if (!triedJumpToLookup[pos]) {
      let i = 0;
      for (const p of [...pathSet].reverse().slice(1)) {
        i++;
        if (data[p] !== ".") {
          if (i > 4) {
            jumpTo[p] = [...pathSet].slice(-i);
            triedJumpToLookup[pos] = 1;
          }
          // triedJumpToLookup[pos] = 1;
          // console.log('found backtrack', i, data[p], p)
          break;
        }
      }
    }
  }

  // if (slowest[pos] > pathSet.size) continue;
  // slowest[pos] = pathSet.size;

  // console.log(data[pos], pos);

  if (pos === endPos) {
    const endPathLength = pathSet.size - 1;
    if (endPathLength > bestEndPath) {
      bestEndPath = endPathLength;
      console.log("endPaths", endPathLength, bestEndPath);
    }
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

// console.log([...jumpTo.entries()].filter(i => i[1]))

// console.log(endPaths);

output(bestEndPath).forTest(154);
