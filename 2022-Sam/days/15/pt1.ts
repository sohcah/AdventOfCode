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
console.log(lines, row);

const set = new Set<number>();

// const minX = lines.map(i => i.sx - i.mhd).min();
// const maxX = lines.map(i => i.sx + i.mhd).max();
//
// let count = 0;
// for(let x = minX; x <= maxX; x++) {
//   for(let y = 0; y <= row; y++) {
//     for(const line of lines) {
//
//     }
//   }
// }

for(const line of lines) {
  if(line.minY <= row && line.maxY >= row) {
    const diff = Math.abs(row - line.sy);
    const startX = line.sx - (line.mhd - diff);
    const endX = line.sx + (line.mhd - diff);
    console.log(startX, endX);
    for(let i = startX; i <= endX; i++) {
      set.add(i);
    }
  }
}

for(const line of lines) {
  if(line.by === row) {
    set.delete(line.bx);
  }
}

output(set.size).forTest(26).forActual(5083287);
