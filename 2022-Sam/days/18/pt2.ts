import {cached, loadLines, output, SMap} from "aocutils";

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

const accessibleSet = new SMap<[number, number, number], boolean>();

const trav = (x: number, y: number, z: number, acc: SMap<[number,number,number], boolean>, orig:[number,number,number]) => {
  if(accessibleSet.has([x, y, z])) {
    return accessibleSet.get([x, y, z]);
  }
  if(grid.get([x, y, z])) {
    return true;
  }
  acc.set([x,y,z], true);
  if (Math.abs(orig[0] - x) + Math.abs(orig[1] - y) + Math.abs(orig[2] - z) > rangeTotal) {
    return false;
  }
  for(const [dx, dy, dz] of adj) {
    const c = [x+dx,y+dy,z+dz] as [number, number, number];
    if(!acc.has(c)) {
      if(!trav(x + dx, y + dy, z + dz, acc, orig)) return false;
    }
  }
  return true;
};

const baseTrav = cached((x: number, y: number, z: number) => {
  const map = new SMap<[number,number,number], boolean>();
  const result = trav(x,y,z, map, [x,y,z]);
  for(const a of map.keysArray()) {
    accessibleSet.set(a, result);
  }
  return result;
});

let count = 0;
for(const [x, y, z] of grid.keysArray()) {
  for(const [dx, dy, dz] of adj) {
    if(!grid.get([x + dx, y + dy, z + dz])) {
      let touchesWater = !baseTrav(x + dx, y + dy, z + dz);
      if(touchesWater) count++;
    }
  }
}

output(count).forTest(58);
