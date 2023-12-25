import { p, load, output, loadLines, IS_TEST } from "aocutils";
import { init } from "z3-solver";

const inited = await init();

console.log(inited);

const MIN_COORD = IS_TEST ? 7 : 200000000000000;
const MAX_COORD = IS_TEST ? 27 : 400000000000000;

console.log(MIN_COORD, MAX_COORD);

const lines = loadLines();
const input = lines
  .map((line) => {
    const split = line
      .replace(/\s+/g, "")
      .split("@")
      .map((i) => i.split(",").map((i) => +i));

    return {
      x: split[0][0],
      y: split[0][1],
      z: split[0][2],
      dx: split[1][0],
      dy: split[1][1],
      dz: split[1][2],
    };
  })
  .sort((a, b) => a.x - b.x);
function coordinatesAtTime(line: (typeof input)[number], t: number) {
  return {
    x: line.x + t * line.dx,
    y: line.y + t * line.dy,
    z: line.z + t * line.dz,
  };
}

function coordinatesEqual(
  a: ReturnType<typeof coordinatesAtTime>,
  b: ReturnType<typeof coordinatesAtTime>
) {
  return a.x === b.x && a.y === b.y && a.z === b.z;
}

function coordinatesDiff(
  a: ReturnType<typeof coordinatesAtTime>,
  b: ReturnType<typeof coordinatesAtTime>
) {
  return {
    x: b.x - a.x,
    y: b.y - a.y,
    z: b.z - a.z,
  };
}

// console.log(
//   new Set(lines.map((i) => i.split("@")[1].split(",").slice(0,1).join(","))).size
// );

const a = input[0];
const b = input[1];
const c = input[2];

const start = 0;
const end = 1000;

for (let ta = start; ta < end; ta++) {
  const ac = coordinatesAtTime(a, ta);
  console.log(ac);
  for (let tb = start; tb < end; tb++) {
    const bc = coordinatesAtTime(b, tb);
    const abDiff = coordinatesDiff(ac, bc);
    for (let tc = start; tc < end; tc++) {
      const cc = coordinatesAtTime(c, tc);
      if (coordinatesEqual(abDiff, coordinatesDiff(bc, cc))) {
        console.log(ta, tb, tc);
      }
      // console.log(ta, tb, tc);
    }
  }
}
// for (let i = 0; i < input.length; i++) {
//   const a = input[i];
//   for (let j = i + 1; j < input.length; j++) {
//     const b = input[j];
//
//     // find intersection x,y,z,t
//
//
//
//   }
// }

// for (let t = 0; t < )

output(sum).forTest(47);
