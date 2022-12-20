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

let paths: [string, string[], number][] = [["AA", [], 0]];
for(let move = 1; move <= 30; move++) {
  console.log(move);
  const newPaths = [];
  for (let path of paths) {
    const valve = valvesMap.get(path[0])!;
    for (const tunnel of valve.tunnels) {
      newPaths.push([tunnel, path[1], path[2]]);
    }
    if (valve.flow > 0 && !path[1].includes(path[0])) {
      newPaths.push([path[0], path[1].concat(path[0]), path[2] + (valve.flow * (30 - move))]);
    }
  }
  const grouped = newPaths.groupBy(i=>[i[0],...i[1]].join(","));
  paths = [];
  for(const group of Array.from(grouped.values())) {
    let best = group[0];
    for(const item of group) {
      if(item[2] > best[2]) best = item;
    }
    paths.push(best);
  }
  paths.sort((a,b)=>b[2]-a[2]);
  paths = paths.slice(0, N);
}

console.log(paths.length);

let best;
for(const path of paths) {
  if(!best || path[2] > best[2]) best = path;
}

console.log(best);


output(best[2]).forTest(1651);
