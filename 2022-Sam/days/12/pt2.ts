import {adjacentPositionsWithoutDiagonals, loadLines, output} from "aocutils";

const input = loadLines().map(i => i.split("").map(i => [i, score(i)] as const));

function score(letter: string) {
  if(letter.toUpperCase() === letter) {
    return letter === "S" ? 1 : 26;
  }
  return letter.charCodeAt(0) - 96;
}

const startX = input.findIndex(i => i.some(j => j[0] === "E"));
const startPos = [startX, input[startX].findIndex(i => i[0] === "E")] as [number, number];

let paths: [number, number][][] = [[startPos]];
let answer;

let metPoints = new Set<string>();
metPoints.add(startPos.join(","));

r: for(let i = 0; i < 1000; i++) {
  console.log(i, paths.length);
  const newPaths: [number, number][][] = [];
  for(const path of paths) {
    const last = path.at(-1)!;
    for(const coord of Array.from(adjacentPositionsWithoutDiagonals(input, last[0], last[1]))) {
      if(input[coord[0]][coord[1]][1] < input[last[0]][last[1]][1] - 1) continue;
      if(metPoints.has(coord.join(","))) continue;
      // if(path.some(i => i[0] === coord[0] && i[1] === coord[1])) continue;
      if(input[coord[0]][coord[1]][1] === 1) {
        answer = i + 1;
        break r;
      }
      metPoints.add(coord.join(","));
      newPaths.push([...path, coord]);
    }
  }
  paths = newPaths;
}

output(answer).forTest(29);
