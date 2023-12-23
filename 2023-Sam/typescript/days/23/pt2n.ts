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
  const start = performance.now();
  const positions = new FlatQueue<[Set<number>, number, number, number]>();
  positions.push([new Set([startPos]), startPos, -1, 0], -1);
  const visited = new Uint8Array(width * height).fill(0);

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
      graph[lastNode] ??= [];
      graph[pos] ??= [];
      graph[lastNode].push([pos, sinceLastNode]);
      graph[pos].push([lastNode, sinceLastNode]);
      if (visited[pos]) continue;
      visited[pos] = 1;
    }

    if (pos === endPos) continue;

    // up
    if (pos !== startPos && data[pos - width]) {
      addPath([pathSet, pos - width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // down
    if (data[pos + width]) {
      addPath([pathSet, pos + width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // left
    if (data[pos - 1]) {
      addPath([pathSet, pos - 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }

    // right
    if (data[pos + 1]) {
      addPath([pathSet, pos + 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1]);
    }
  }

  console.log(performance.now() - start);
}

const nodeMapping = Object.fromEntries(Object.keys(graph).map((i, n) => [i, n]));

const mappedGraph = Object.fromEntries(
  Object.entries(graph).map(([key, value]) => {
    return [
      nodeMapping[key],
      value
        .filter((i) => i[0] !== Number(key) && i[0] !== -1)
        .map((i) => {
          return [nodeMapping[i[0]], i[1]] as [number, number];
        }),
    ];
  })
);

let bestEndPath = 0;

{
  const start = performance.now();
  const mappedEnd = nodeMapping[endPos];

  const pathSet = new Uint8Array(Object.keys(nodeMapping).length).fill(0);
  const traverse = (length: number, pos: number) => {
    for (const p of mappedGraph[pos]) {
      if (p[0] === mappedEnd) {
        if (length + p[1] > bestEndPath) {
          bestEndPath = length + p[1];
        }
      } else if (pathSet[p[0]] === 0) {
        pathSet[p[0]] = 1;
        traverse(length + p[1], p[0]);
        pathSet[p[0]] = 0;
      }
    }
  };

  pathSet[nodeMapping[startPos]] = 1;
  traverse(0, nodeMapping[startPos]);
  pathSet[nodeMapping[startPos]] = 0;

  console.log(performance.now() - start);
}

output(bestEndPath).forTest(154).forActual(6734);
