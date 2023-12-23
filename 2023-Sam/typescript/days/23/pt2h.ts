import { output, loadLines } from "aocutils";
import FlatQueue from "flatqueue";

const grid = loadLines().map((i) => i.chars);

const height = grid.length;
const width = grid[0].length;

function getCoord(x: number, y: number) {
  return x + y * width;
}

const data = new Uint8Array(grid.flat().map((i) => (i === "#" ? 0 : 1)));

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

  while (positions.length) {
    const [pathSet, pos, lastNode, sinceLastNode] = positions.pop()!;

    const aroundCount = data[pos - 1] + data[pos + 1] + data[pos - width] + data[pos + width];

    const isNode = pos === startPos || pos === endPos || aroundCount > 2;
    if (isNode) {
      if (!graph[lastNode]) {
        graph[lastNode] = [];
      }
      if (graph[lastNode].some((i) => i[0] === pos)) continue;
      graph[lastNode].push([pos, sinceLastNode]);
    }

    if (pos === endPos) continue;

    // up
    if (pos !== startPos && data[pos - width] === 1) {
      addPath([pathSet, pos - width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // down
    if (data[pos + width] === 1) {
      addPath([pathSet, pos + width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // left
    if (data[pos - 1] === 1) {
      addPath([pathSet, pos - 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // right
    if (data[pos + 1] === 1) {
      addPath([pathSet, pos + 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }
  }
}

let bestEndPath = 0;
let bestEndPathList = [];


{
  let p = 0;
  const positions = new Array<[number[], number, number]>();
  positions.push([[startPos], 0, startPos]);

  while (positions.length) {
    p++;
    const [pathSet, length, pos] = positions.pop()!;

    for (const p of graph[pos] ?? []) {
      if (p[0] === endPos) {
        if (length + p[1] > bestEndPath) {
          bestEndPath = length + p[1];
          bestEndPathList = [...pathSet];
        }
        continue;
      }
      if (!pathSet.includes(p[0])) {
        positions.push([[...pathSet, p[0]], length + p[1], p[0]]);
      }
    }
  }
  console.log(p, bestEndPathList);
}

output(bestEndPath).forTest(154).forActual(6734);
