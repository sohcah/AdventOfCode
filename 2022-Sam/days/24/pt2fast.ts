import {IS_TEST, loadLines, output} from "aocutils";

const grid = loadLines().map(i => i.split(""));

const height = grid.length - 2;
const width = grid[0].length - 2;
const max = Math.max(height, width)

const STORE_FULL_PATH = IS_TEST;

function toVal(coords: [number, number, ...unknown[]]) {
  return coords[0] * max + coords[1];
}

const startPos: [number, number] = [grid[0].indexOf(".") - 1, -1];
const startVal = toVal(startPos);
const endPos: [number, number] = [grid.at(-1).indexOf(".") - 1, height];
const endVal = toVal(endPos);

let blizzards: [x: number, y: number, direction: number][] = [];

for (let y = 1; y < grid.length - 1; y++) {
  for (let x = 1; x < grid[y].length - 1; x++) {
    if (grid[y][x] !== ".") {
      blizzards.push([x - 1, y - 1, ["^", ">", "v", "<"].indexOf(grid[y][x])]);
    }
  }
}

const dirs: [number, number][] = [
  [0, 0],
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

const blizzardDirs: [number, number][] = [
  [0, height - 1],
  [1, 0],
  [0, 1],
  [width - 1, 0]
];

let paths = new Map<number, [number, number][]>();
paths.set(startVal, [startPos]);
let answer = -1;

const goals = [endPos, startPos, endPos];
let goal = 0;
let goalVal = toVal(goals[goal]);

for (let round = 0; round < 2000; round++) {
  blizzards = blizzards.map(blizzard => {
    return [(blizzard[0] + blizzardDirs[blizzard[2]][0]) % width, (blizzard[1] + blizzardDirs[blizzard[2]][1]) % height, blizzard[2]];
  });

  const blizzardSet = new Set();
  for (const blizzard of blizzards) {
    blizzardSet.add(toVal(blizzard));
  }

  const newPaths = new Map<number, [number, number][]>();

  for (const path of paths.values()) {
    const loc = path.at(-1);
    for (const dir of dirs) {
      const newLoc: [number, number] = [loc[0] + dir[0], loc[1] + dir[1]];
      const newLocVal = toVal(newLoc);
      if (newPaths.has(newLocVal)) continue;
      if (blizzardSet.has(newLocVal)) continue;
      if (newLoc[0] < 0 || newLoc[0] >= width) continue;
      if ((newLoc[1] < 0 || newLoc[1] >= height) && newLocVal !== startVal && newLocVal !== endVal) continue;
      if (STORE_FULL_PATH) newPaths.set(newLocVal, [
        ...path,
        newLoc
      ]);
      else newPaths.set(newLocVal, [newLoc])
    }
  }

  if (newPaths.has(goalVal)) {
    console.log("Found path to goal", goal);
    if (goal === goals.length - 1) {
      answer = round + 1;
      break;
    }
    paths = new Map();
    paths.set(goalVal, newPaths.get(goalVal));
    goalVal = toVal(goals[++goal]);
  } else {
    paths = newPaths;
  }
}

output(answer).forTest(54).forActual(816);
