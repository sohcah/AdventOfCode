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
}

console.log(paths.length);

// const answer = move('AA', [], 0, 1);

let best;
for(const path of paths) {
  if(!best || path[2] > best[2]) best = path;
}

console.log(best);


output(best[2]).forTest(1651);
