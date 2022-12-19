import {adjacentPositionsWithoutDiagonals, cached, loadLines, loadTrimmed, output, range, SMap} from "aocutils";

const lines = loadLines().map(i => i.split(",").map(Number));

const grid = new SMap<[number, number, number], number>();

for (const [x, y, z] of lines) {
  grid.set([x, y, z], 1);
}

const adj = [
  [0, 0, 1],
  [0, 0, -1],
  [0, 1, 0],
  [0, -1, 0],
  [1, 0, 0],
  [-1, 0, 0],
]

const xRange = Math.max(...lines.map(i => i[0])) - Math.min(...lines.map(i => i[0]));
const yRange = Math.max(...lines.map(i => i[1])) - Math.min(...lines.map(i => i[1]));
const zRange = Math.max(...lines.map(i => i[2])) - Math.min(...lines.map(i => i[2]));
const rangeTotal = xRange + yRange + zRange;

const trav = (x: number, y: number, z: number, acc: Map<string, boolean>, orig:[number,number,number]) => {
  if(grid.get([x, y, z])) {
    return true;
  }
  if (Math.abs(orig[0] - x) + Math.abs(orig[1] - y) + Math.abs(orig[2] - z) > rangeTotal) {
    // console.log("too far", orig, [x, y, z]);
    return false;
  }
  for(const [dx, dy, dz] of adj) {
    if(!acc.has(`${x+dx}|${y+dy}|${z+dz}`)) {
      acc.set(`${x+dx}|${y+dy}|${z+dz}`, true)
      if(!trav(x + dx, y + dy, z + dz, acc, orig)) return false;
    }
  }
  return true;
};

const baseTrav = cached((x: number, y: number, z: number) => {
  return trav(x,y,z, new Map(), [x,y,z])
});

let count = 0;
for(const [x, y, z] of grid.keysArray()) {
  for(const [dx, dy, dz] of adj) {
    if(!grid.get([x + dx, y + dy, z + dz])) {
      let touchesWater = !baseTrav(x + dx, y + dy, z + dz);
      if(touchesWater) count++;
      else console.log("no water", [x + dx, y + dy, z + dz]);
    }
  }
}

output(count).forTest(58);
