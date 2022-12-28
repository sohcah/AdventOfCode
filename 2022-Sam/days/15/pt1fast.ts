import {adjacentPositionsWithoutDiagonals, loadLines, loadTrimmed, output, range} from "aocutils";

const lines = loadLines().map(i => i.match(/-?\d+/g)!.map(Number)).map(i => {
  const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
  return ({
    sx: i[0],
    sy: i[1],
    bx: i[2],
    by: i[3],
    mhd,
    maxY: i[1] + mhd,
    minY: i[1] - mhd,
  })
});


let row = 2000000;
if(process.env.AOCTEST) {
  row = 10;
}

const ranges: [number, number][] = [];
for(const line of lines) {
  if(line.minY <= row && line.maxY >= row) {
    const diff = Math.abs(row - line.sy);
    const startX = line.sx - (line.mhd - diff);
    const endX = line.sx + (line.mhd - diff);
    ranges.push([startX, endX]);
  }

}

ranges.sort((a,b)=>a[0]-b[0]);

const mergedRanges: [number, number][] = [];
let currentRange = ranges[0];
for(let i = 1; i < ranges.length; i++) {
    const newRange = ranges[i];
    if(newRange[0] <= currentRange[1]) {
        currentRange[1] = Math.max(currentRange[1], newRange[1]);
    } else {
        mergedRanges.push(currentRange);
        currentRange = newRange;
    }
}
mergedRanges.push(currentRange);

let count = mergedRanges.map(i => i[1] - i[0] + 1).sum;

const removedXs = new Set<number>();

for(const line of lines) {
  if(line.by === row) {
    if(!removedXs.has(line.bx)) {
      removedXs.add(line.bx);
      count--;
    }
  }
}

output(count).forTest(26).forActual(5083287);
