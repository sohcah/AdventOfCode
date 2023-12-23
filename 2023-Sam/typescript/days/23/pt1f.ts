import { output, loadLines } from "aocutils";
import FlatQueue from "flatqueue";

const grid = loadLines().map((i) => i.chars);

const height = grid.length;
const width = grid[0].length;

function getCoord(x: number, y: number) {
  return x + y * width;
}

const data = grid.flat();

const startPos = getCoord(grid[0].indexOf("."), 0);
const endPos = getCoord(grid[height - 1].indexOf("."), height - 1);

const graph: Record<string, [number, number][]> = {
  [startPos]: [],
};

{
  const positions = new FlatQueue<[Set<number>, number, number, number]>();
  positions.push([new Set([startPos]), startPos, startPos, -1], -1);

  const addPath = (path: [Set<number>, number, number, number]) => {
    if (path[0].has(path[1])) return;
    const newSet = new Set(path[0]);
    newSet.add(path[1]);
    positions.push([newSet, path[1], path[2], path[3]], -newSet.size);
  };

  let p = 0;
  while (positions.length) {
    const [pathSet, pos, lastNode, sinceLastNode] = positions.pop()!;

    const isNode =
      pos === startPos ||
      pos === endPos ||
      (data[pos - 1] !== "." &&
        data[pos + 1] !== "." &&
        data[pos - width] !== "." &&
        data[pos + width] !== ".");
    if (isNode) {
      if (!graph[lastNode]) {
        graph[lastNode] = [];
      }
      if (graph[lastNode].some((i) => i[0] === pos)) continue;
      graph[lastNode].push([pos, sinceLastNode]);
    }

    if (p % 10000 === 0) console.log(p, positions.length, pathSet.size);

    if (pos === endPos) {
      continue;
    }

    // up
    if (pos !== startPos && (data[pos - width] === "." || data[pos - width] === "^")) {
      addPath([pathSet, pos - width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // down
    if (data[pos + width] === "." || data[pos + width] === "v") {
      addPath([pathSet, pos + width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // left
    if (data[pos - 1] === "." || data[pos - 1] === "<") {
      addPath([pathSet, pos - 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // right
    if (data[pos + 1] === "." || data[pos + 1] === ">") {
      addPath([pathSet, pos + 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }
    p++;
  }
}

console.log(graph);

let bestEndPath = 0;

{
  const positions = new Array<[Set<number>, number, number]>();
  positions.push([new Set([startPos]), 0, startPos]);

  while (positions.length) {
    const [pathSet, length, pos] = positions.pop()!;

    // console.log(pos);
    for (const p of graph[pos] ?? []) {
      // console.log(p);
      if (p[0] === endPos) {
        if (length + p[1] > bestEndPath) {
          bestEndPath = length + p[1];
          console.log(bestEndPath);
        }
        continue;
      }
      if (!pathSet.has(p[0])) {
        positions.push([new Set([...pathSet, p[0]]), length + p[1], p[0]]);
      }
    }
  }
}

// console.log([...jumpTo.entries()].filter(i => i[1]))

console.log(endPos);

output(bestEndPath).forTest(94).forActual(2278);
