// A couple of magic percentages
const GENERAL_CUTOFF = 0.8;
const EARLY_CUTOFF = 0.5;

import { output, loadLines, CountedSet } from "aocutils";
import FlatQueue from "flatqueue";

const connectionsList = loadLines()
  .map((i) => i.split(/: /g))
  .flatMap((i) => i[1].split(" ").map((j) => [i[0], j]));

const connections: Record<string, string[]> = {};
for (const conn of connectionsList) {
  connections[conn[0]] ??= [];
  connections[conn[1]] ??= [];
  connections[conn[0]].push(conn[1]);
  connections[conn[1]].push(conn[0]);
}

function traverse(point: string) {
  const minPaths: Record<string, string[]> = {};

  const queue = new FlatQueue<string[]>();
  queue.push([point], 1);

  while (queue.length) {
    const path = queue.pop()!;
    const point = path.at(-1)!;
    if (minPaths[point] && minPaths[point].length <= path.length) {
      continue;
    }
    minPaths[point] = path;
    const conn = connections[point];
    for (const nextPoint of conn) {
      if (!path.includes(nextPoint)) {
        queue.push([...path, nextPoint], path.length + 1);
      }
    }
  }

  return minPaths;
}

let ans = -1;

for (let i = 0; i < 10; i++) {
  const minPaths = traverse(connectionsList[0][0]);
  const paths = Object.values(minPaths);
  if (paths.length < Object.values(connections).length) {
    ans = paths.length * (Object.values(connections).length - paths.length);
    break;
  }
  const joins = new CountedSet<string>();
  for (const path of paths) {
    for (let l = 0; l < path.length - 1; l++) {
      joins.add(path.slice(l, l + 2).join(","));
    }
  }
  const joinsSorted = [...joins]
    .filter((i) => i[1] < paths.length * GENERAL_CUTOFF)
    .sort((a, b) => b[1] - a[1]);

  const index = joinsSorted.findIndex((i) => i[1] < joinsSorted[0][1] * GENERAL_CUTOFF);

  let topJoin = joinsSorted[index - 1];
  let c = 0;
  while (true) {
    c++;
    const s2 = topJoin[0].split(",")[1] + ",";
    const nextTopJoins = joinsSorted.filter((i) => i[0].startsWith(s2));
    if (
      nextTopJoins[0] &&
      nextTopJoins[0][1] > topJoin[1] * (c < 2 ? EARLY_CUTOFF : GENERAL_CUTOFF)
    ) {
      topJoin = nextTopJoins[0];
    } else {
      break;
    }
  }
  console.log(`Removing connection ${topJoin[0]}`);
  const [left, right] = topJoin[0].split(",");
  connections[left] = connections[left].filter((i) => i !== right);
}

if (ans === 0) {
  throw new Error("Unable to find correct connections to remove.");
}

output(ans).forTest(54).forActual(538368);
