import {adjacentPositionsWithoutDiagonals, loadLines, loadTrimmed, output, range} from "aocutils";

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

// function move(at: string, open: string[], score: number, moveNo: number) {
//   if(moveNo <= 25) console.log("Move", moveNo, "at", at, "open", open, "score", score);
//   if(moveNo >= 30) return score;
//   const valve = valvesMap.get(at)!;
//
//   let best = 0;
//   for(const tunnel of valve.tunnels) {
//     const scr = move(tunnel, open, score, moveNo + 1);
//     if(scr > best) best = scr;
//   }
//   if(valve.flow > 0 && !open.includes(at)) {
//     const openScr = move(at, open.concat(at), score + (valve.flow * (30 - moveNo - 1)), moveNo + 1);
//     if (openScr > best) best = openScr;
//   }
//   return best;
// }

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
    paths = paths.slice(0, 10000);
  } else {
    paths = newPaths;
  }
}

console.log(paths.sort((a,b) => b[3] - a[3]));

// const answer = move('AA', [], 0, 1);

let best = 0;
for(const path of paths) {
  if(path[3] > best) best = path[3];
}

output(best).forTest(1707);
