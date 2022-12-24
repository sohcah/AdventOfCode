import {IS_TEST, loadLines, output} from "aocutils";

const grid = loadLines().map(i => i.split(""));

const height = grid.length - 2;
const width = grid[0].length - 2;

const STORE_FULL_PATH = IS_TEST;

const startPos: [number, number] = [grid[0].indexOf(".") - 1, -1];
const startJoined = startPos.join("|");
const endPos: [number, number] = [grid.at(-1).indexOf(".") - 1, height];
const endJoined = endPos.join("|");

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

let paths: [number, number][][] = [[startPos]];
let answer = -1;

const goals = [endPos, startPos, endPos];
let goal = 0;
let goalJoined = goals[goal].join("|");

for (let round = 0; round < 2000; round++) {
  // console.log("Round", round);

  blizzards = blizzards.map(blizzard => {
    return [(blizzard[0] + blizzardDirs[blizzard[2]][0]) % width, (blizzard[1] + blizzardDirs[blizzard[2]][1]) % height, blizzard[2]];
  });
  if (IS_TEST) blizzards.sort((a, b) => a[0] - b[0]).sort((a, b) => a[1] - b[1]);

  const blizzardSet = new Set();
  for (const blizzard of blizzards) {
    blizzardSet.add(blizzard.slice(0, 2).join("|"));
  }

  const newPaths = new Map<string, [number, number][]>();

  for (const path of paths) {
    const loc = path.at(-1);
    for (const dir of dirs) {
      const newLoc: [number, number] = [loc[0] + dir[0], loc[1] + dir[1]];
      const joined = newLoc.join("|")
      if (newLoc[0] < 0 || newLoc[0] >= width) continue;
      if ((newLoc[1] < 0 || newLoc[1] >= height) && joined !== startJoined && joined !== endJoined) continue;
      if (newPaths.has(joined)) continue;
      if (blizzardSet.has(joined)) continue;
      if (STORE_FULL_PATH) newPaths.set(joined, [
        ...path,
        newLoc
      ]);
      else newPaths.set(joined, [newLoc])
    }
  }

  if (newPaths.has(goalJoined)) {
    console.log("Found path to goal", goal);
    if (goal === goals.length - 1) {
      answer = round + 1;
      break;
    }
    paths = [newPaths.get(goalJoined)];
    goal++;
    goalJoined = goals[goal].join("|");
  } else {
    paths = newPaths.valuesArray();
  }
}

output(answer).forTest(54).forActual(816);
