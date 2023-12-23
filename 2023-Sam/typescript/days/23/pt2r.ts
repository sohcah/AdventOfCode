import { output, loadLines } from "aocutils";

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
  const visited = new Uint8Array(width * height).fill(0);
  const pathSet = new Set<number>();

  const traverse = (pos: number, lastNode: number, sinceLastNode: number) => {
    if (pathSet.has(pos)) return;
    pathSet.add(pos);
    traverseInner(pos, lastNode, sinceLastNode);
    pathSet.delete(pos);
  };

  const traverseInner = (pos: number, lastNode: number, sinceLastNode: number) => {
    const aroundCount = data[pos - 1] + data[pos + 1] + data[pos - width] + data[pos + width];

    const isNode = pos === startPos || pos === endPos || aroundCount > 2;
    if (isNode) {
      graph[lastNode] ??= [];
      graph[pos] ??= [];
      graph[lastNode].push([pos, sinceLastNode]);
      graph[pos].push([lastNode, sinceLastNode]);
      if (visited[pos]) return;
      visited[pos] = 1;
    }

    if (pos === endPos) return;

    // up
    if (pos !== startPos && data[pos - width]) {
      traverse(pos - width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1);
    }

    // down
    if (data[pos + width]) {
      traverse(pos + width, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1);
    }

    // left
    if (data[pos - 1]) {
      traverse(pos - 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1);
    }

    // right
    if (data[pos + 1]) {
      traverse(pos + 1, isNode ? pos : lastNode, isNode ? 1 : sinceLastNode + 1);
    }
  };
  traverse(startPos, -1, 0);

  console.log(performance.now() - start);
}

delete graph["-1"];

const nodeMapping = Object.fromEntries(Object.keys(graph).map((i, n) => [i, n]));

const mappedGraph = Object.fromEntries(
  Object.entries(graph).map(([key, value]) => {
    return [
      nodeMapping[key],
      value
        .uniqBy((i) => i[0])
        .filter((i) => i[0] !== Number(key) && i[0] !== -1)
        .map((i) => {
          return { to: nodeMapping[i[0]], length: i[1] };
        }),
    ];
  })
);

let bestEndPath;

{
  const start = performance.now();
  const mappedEnd = nodeMapping[endPos];

  const traverseFnContent = `  const pathSet = new Uint8Array(${
    Object.keys(nodeMapping).length
  }).fill(1);
  let bestEndPath = 0;
  const traverse = (length, pos) => {
    switch (pos) {
${Object.entries(mappedGraph)
  .map(([from, tos]) => {
    return `      case ${from}: {
${tos
  .map((to) => {
    if (to.to === mappedEnd) {
      return `        if (length + ${to.length} > bestEndPath) bestEndPath = length + ${to.length};`;
    }
    return `        if (pathSet[${to.to}]) {
          pathSet[${to.to}] = 0;
          traverse(length + ${to.length}, ${to.to});
          pathSet[${to.to}] = 1;
        }`;
  })
  .join("\n")}
        break;
      }`;
  })
  .join("\n")}
    };
  };
  pathSet[pos] = 0;
  traverse(length, pos);
  return bestEndPath;`;

  const traverse = new Function("length", "pos", traverseFnContent);

  //   console.log(`const traverse = (length, pos) => {
  // ${traverseFnContent}
  // };`);

  bestEndPath = traverse(0, nodeMapping[startPos]);

  console.log(performance.now() - start);
}

output(bestEndPath).forTest(154).forActual(6734);
