import {loadLines, output, Point2D} from "aocutils";

const lines = loadLines().map(i => i.match(/-?\d+/g).map(Number)).map(i => {
  const mhd = Math.abs(i[0] - i[2]) + Math.abs(i[1] - i[3]);
  return ({
    point: new Point2D(i[0], i[1]),
    sx: i[0],
    sy: i[1],
    bx: i[2],
    by: i[3],
    mhd,
    maxY: i[1] + mhd,
    minY: i[1] - mhd,
  })
});


let max = 4000000;
if(process.env.AOCTEST) {
  max = 20;
}
console.log(lines, max);

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

let answer;

o: for(let row = 0; row <= max; row++) {
  if(row % 100 === 0) console.log("Row", row);
  for(let x = 0; x <= max; x++) {
    const point = new Point2D(x, row);
    let found = false;
    for(const line of lines) {
      if(line.point.manhattanDistance(point) <= line.mhd) {
        const diff = Math.abs(row - line.sy);
        x = line.sx + (line.mhd - diff);
        found = true;
        break;
      }
    }
    if(!found) {
      answer = x * 4000000 + row;
      break o;
    }
  }
  // if(row % 100 === 0) console.log(row);
  // const set = new Set<number>();
  // for(const line of lines) {
  //   if(line.minY <= row && line.maxY >= row) {
  //     const diff = Math.abs(row - line.sy);
  //     const startX = Math.max(line.sx - (line.mhd - diff), 0);
  //     const endX = Math.min(line.sx + (line.mhd - diff), max);
  //     for(let i = startX; i <= endX; i++) {
  //       set.add(i);
  //     }
  //   }
  // }
  // if(set.size < max + 1) {
  //   for(let i = 0; i <= max; i++) {
  //     if(!set.has(i)) {
  //       console.log(i, row);
  //       answer = i * 4000000 + row;
  //       break o;
  //     }
  //   }
  // }
}
// for(const line of lines) {
//   if(line.minY <= row && line.maxY >= row) {
//     const diff = Math.abs(row - line.sy);
//     const startX = line.sx - (line.mhd - diff);
//     const endX = line.sx + (line.mhd - diff);
//     console.log(startX, endX);
//     for(let i = startX; i <= endX; i++) {
//       set.add(i);
//     }
//   }
// }
//
// for(const line of lines) {
//   if(line.by === row) {
//     set.delete(line.bx);
//   }
// }

output(answer).forTest(56000011);
