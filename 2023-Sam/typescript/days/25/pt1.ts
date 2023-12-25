import { p, load, output, loadLines, CountedSet } from "aocutils";

const connectionsList = loadLines()
  .map((i) => i.split(/: /g))
  .flatMap((i) => i[1].split(" ").map((j) => [i[0], j]));
// .map((i) => [i[0], i[1].split(" ")] as const); //
const connections: Record<string, string[]> = {};
for (const conn of connectionsList) {
  connections[conn[0]] ??= [];
  connections[conn[1]] ??= [];
  connections[conn[0]].push(conn[1]);
  connections[conn[1]].push(conn[0]);
}
console.log(connections);

// const lines = [];
// lines.push("strict graph A {")
// for(const connection of connectionsList) {
//   lines.push(`  ${connection[0]} -- ${connection[1]}`);
// }
// lines.push("}");
// writeFileSync("lines.txt", lines.join("\n"))

// const filtered = connections
//   .sort((a, b) => b[1].length - a[1].length)
//   .map((i, n) => {
//     return [i[0], n < 3 ? i[1].slice(0, -1) : i[1]] as const;
//   });
//
// console.log(filtered);

function traverse(point: string, path: string[], minPaths: Record<string, string[]>) {
  if (path.includes(point)) return;
  if (!minPaths[point] || minPaths[point].length > path.length) {
    minPaths[point] = path;
  } else {
    return;
  }
  const conn = connections[point];
  const nextPath = [...path, point];
  for (const nextPoint of conn) {
    traverse(nextPoint, nextPath, minPaths);
  }
}

// connections["vcq"] = connections["vcq"].filter((i) => i !== "lxb");
// connections["rnx"] = connections["rnx"].filter((i) => i !== "ddj");
// connections["znk"] = connections["znk"].filter((i) => i !== "mmr");

let ans = -1;

for (let i = 0; i < 4; i++) {
  const minPaths: Record<string, string[]> = {};
  traverse(connectionsList[0][0], [], minPaths);
  // console.log(minPaths);
  const paths = Object.values(minPaths);
  if (i === 3) {
    ans = paths.length * (Object.values(connections).length - paths.length);
    console.log(paths.length);
    break;
  }
  const joins = new CountedSet<string>();
  for (const path of paths) {
    for (let l = 0; l < path.length - 1; l++) {
      joins.add(path.slice(l, l + 2).join(","));
    }
  }
  const joinsSorted = [...joins]
    .filter((i) => i[1] < paths.length * 0.8)
    .sort((a, b) => b[1] - a[1]);
  console.log(i, joinsSorted);
  // const topJoin = joinsSorted[0][0].split(",");
  // console.log("Top", topJoin);
  // connections[topJoin[0]] = connections[topJoin[0]].filter((i) => i !== topJoin[1]);
  // for (const p of prefixes) {
  //   console.log(p);
  // }

  const index = joinsSorted.findIndex(i => i[1] < joinsSorted[0][1] * 0.8);

  let topJoin = joinsSorted[index - 1];
  let c= 0;
  while (true) {
    c++;
    const s2 = topJoin[0].split(",")[1] + ",";
    const nextTopJoins = joinsSorted.filter((i) => i[0].startsWith(s2));
    // console.log(i, topJoin, s2, nextTopJoins);
    if (nextTopJoins[0] && nextTopJoins[0][1] > topJoin[1] * (c < 2 ? 0.5 : 0.8)) {
      topJoin = nextTopJoins[0];
    } else {
      break;
    }
  }
  console.log(i, topJoin);
  const [left, right] = topJoin[0].split(",");
  connections[left] = connections[left].filter((i) => i !== right);

  // console.log(paths.length);
}

// const lines = [];
// lines.push("strict graph A {")
// for(const connection of filtered) {
//   lines.push(`  ${connection[0]} -- {${connection[1]}}`);
// }
// lines.push("}");
// writeFileSync("lines.txt", lines.join("\n"));

output(ans).forTest(54).forActual(538368);
