import {adjacentPositionsWithoutDiagonals, loadLines, loadTrimmed, output, range} from "aocutils";
import chalk from "chalk";

const sandSource = [500, 0] as [number, number];

const rockPaths = loadLines().map(i => i.split(" -> ").map(j => j.split(",").map(Number)));

const coordinateMap = new Map<string, string>();

const maxY = rockPaths.map(i => i.map(j => j[1])).flat().max();

for (const rockPath of rockPaths) {
  for (let i = 0; i < rockPath.length - 1; i++) {
    const [x1, y1] = rockPath[i];
    const [x2, y2] = rockPath[i + 1];
    console.log(x1, y1, x2, y2);
    for (const x of Array.from(range(x1, x2 + (Math.sign(x2 - x1) || 1), Math.sign(x2 - x1) || 1))) {
      for (const y of Array.from(range(y1, y2 + (Math.sign(y2 - y1) || 1), Math.sign(y2 - y1) || 1))) {
        console.log(x, y);
        coordinateMap.set([x, y].join(","), "#");
      }
    }
  }
}

function isBlocked(coord: [number, number]) {
  const [x, y] = coord;
  return coordinateMap.has([x, y].join(","));
}

let sandPath: [number, number][] = [];
let sandCount = 0;
o: for(let i = 0; i < 1000; i++) {
  let sandPosition: [number, number] = [...sandSource];
  sandPath = [];
  for(let j = 0;j < 1000;j++) {
    // console.log(sandPosition, maxY);
    sandPath.push([...sandPosition]);
    if(sandPosition[1] > maxY) break o;
    if(!isBlocked([sandPosition[0], sandPosition[1] + 1])) {
      sandPosition[1]++;
    } else if(!isBlocked([sandPosition[0] - 1, sandPosition[1] + 1])) {
      sandPosition[0]--;
      sandPosition[1]++;
    } else if(!isBlocked([sandPosition[0] + 1, sandPosition[1] + 1])) {
      sandPosition[0]++;
      sandPosition[1]++;
    } else {
      break;
    }
  }
  coordinateMap.set(sandPosition.join(","), "O");
  sandCount++;
}

for(let y = 0; y <= maxY; y++) {
  let line = "";
  for(let x = 500 - (maxY); x <= 500 + (maxY); x++) {
    const item = coordinateMap.get([x, y].join(",")) ?? (sandPath.some(i => i[0] === x && i[1] === y) ? "~" : ".");
    if(item === "O") {
      line += chalk.yellow`O`;
    } else if(item === "#") {
      line += chalk.gray`#`;
    } else if(item === "~") {
      line += chalk.blueBright`~`;
    } else {
      line += " ";
    }
  }
  console.log(line);
}

output(sandCount).forTest(24);
