import {loadLines, output, stabilise} from "aocutils";

const N = stabilise(1000, 1000, 6);

const valves = loadLines().map(i => i.split('; ')).map(i => ({
  id: i[0].slice(6,8),
  flow: Number(i[0].match(/\d+/g)[0]),
  tunnels: i[1].slice("tunnels lead to valves".length).trim().split(', ')
}));
const valvesMap = new Map<string, {id:string;flow: number, tunnels: string[]}>();
for(const valve of valves) {
  valvesMap.set(valve.id, valve);
}

console.log(valves);

let paths: [string, string, Set<string>, number, number][] = [["AA", "AA", new Set(), 0, 0]];
for(let move = 1; move <= 52; move++) {
  console.log(move, paths.length);
  const newPaths = [];
  for (let path of paths) {
    if(move % 2 === 1) {
      const valve = valvesMap.get(path[0])!;
      for (const tunnel of valve.tunnels) {
        newPaths.push([tunnel, path[1], path[2], path[3] + path[4], path[4]]);
      }
      if (valve.flow > 0 && !path[2].has(path[0])) {
        newPaths.push([path[0], path[1], new Set([...Array.from(path[2]), path[0]]), path[3] + path[4], path[4] + valve.flow]);
      }
    } else {
      const valve = valvesMap.get(path[1])!;
      for (const tunnel of valve.tunnels) {newPaths.push([path[0], tunnel, path[2], path[3], path[4]])
      }
      if (valve.flow > 0 && !path[2].has(path[1])) {
        newPaths.push([path[0], path[1], new Set([...Array.from(path[2]), path[1]]), path[3], path[4] + valve.flow]);
      }
    }
  }
  if(move % 2 === 1) {
    const grouped = newPaths.groupBy(i => [i[0], i[1], Array.from(i[2]).sort().join(",")].join(","));
    paths = [];
    for (const group of Array.from(grouped.values())) {
      let best = group[0];
      for (const item of group) {
        if (item[3] + item[4] > best[3] + item[4]) best = item;
      }
      paths.push(best);
    }
    paths.sort((a,b)=>b[3]-a[3]);
    paths = paths.slice(0, N);
  } else {
    paths = newPaths;
  }
}

console.log(paths.sort((a,b) => b[3] - a[3]));

let best = null;
for(const path of paths) {
  if(!best || path[3] > best[3]) best = path;
}
console.log(best);

output(best[3]).forTest(1707);
