import { p, load, output, loadLines, IS_TEST } from "aocutils";
import chalk from "chalk";

const input = loadLines().map((i) => i.chars);

const N = (input.length - 1) / 2; // 65;

const startY = input.findIndex((i) => i.includes("S"));
const startX = input[startY].indexOf("S");

const height = input.length;
const width = input[0].length;

const STEPS = IS_TEST ? 17 : N * 4 + 1;

if (width !== height) throw new Error("aaah");

const oddPositions = new Set<string>();
const evenPositions = new Set<string>();

let centerCountEven = -1;
let centerCountOdd = -1;
const edgeCounts: number[] = [];
const cornerCounts: number[] = [];

const counts: number[] = [];

let positions: [number, number][] = [[startX, startY]];
for (let step = 0; step < N * 5.4; step++) {
  //N * 8
  const newPositionsSet = step % 2 === 0 ? evenPositions : oddPositions;
  const newPositions: [number, number][] = [];
  const addPos = (x: number, y: number) => {
    const y2 = ((y % height) + height) % height;
    const x2 = ((x % width) + width) % width;
    if (input[y2][x2] !== "#") {
      const c = `${x},${y}`;
      if (!newPositionsSet.has(c)) {
        newPositionsSet.add(c);
        newPositions.push([x, y]);
      }
    }
  };
  for (const [x, y] of positions) {
    addPos(x + 1, y);
    addPos(x - 1, y);
    addPos(x, y + 1);
    addPos(x, y - 1);
  }
  positions = newPositions;

  // console.log(step, positions.length);
  // console.log(step % 2 === 0 ? "even" : "odd");

  if (step === N * 2 || step === N * 2 - 1) {
    let centerCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < height; x++) {
        if (newPositionsSet.has(`${x},${y}`)) centerCount++;
      }
    }
    if (step % 2 === 0) {
      centerCountEven = centerCount;
    } else {
      centerCountOdd = centerCount;
    }
  }

  if (step >= N - 1 && step < N * 4 + 2) {
    let edgeCount = 0;
    for (let y = 0; y < height; y++) {
      for (let x = width; x < width * 2; x++) {
        if (newPositionsSet.has(`${x},${y}`)) edgeCount++;
      }
    }
    for (let y = height; y < height * 2; y++) {
      for (let x = 0; x < width; x++) {
        if (newPositionsSet.has(`${x},${y}`)) edgeCount++;
      }
    }
    for (let y = -height; y < 0; y++) {
      for (let x = 0; x < width; x++) {
        if (newPositionsSet.has(`${x},${y}`)) edgeCount++;
      }
    }
    for (let y = 0; y < height; y++) {
      for (let x = -width; x < 0; x++) {
        if (newPositionsSet.has(`${x},${y}`)) edgeCount++;
      }
    }
    edgeCounts.push(edgeCount);
  }
  if (step >= N * 2 && step < N * 6 + 2) {
    let cornerCount = 0;
    // bottom right
    for (let y = height; y < height * 2; y++) {
      for (let x = width; x < width * 2; x++) {
        if (newPositionsSet.has(`${x},${y}`)) cornerCount++;
      }
    }
    // bottom left
    for (let y = height; y < height * 2; y++) {
      for (let x = -width; x < 0; x++) {
        if (newPositionsSet.has(`${x},${y}`)) cornerCount++;
      }
    }
    // top right
    for (let y = -height; y < 0; y++) {
      for (let x = width; x < width * 2; x++) {
        if (newPositionsSet.has(`${x},${y}`)) cornerCount++;
      }
    }
    // top left
    for (let y = -height; y < 0; y++) {
      for (let x = -width; x < 0; x++) {
        if (newPositionsSet.has(`${x},${y}`)) cornerCount++;
      }
    }
    cornerCounts.push(cornerCount);
  }
  counts.push(newPositionsSet.size);
}

const pos = STEPS % 2 === 1 ? evenPositions : oddPositions;

const gridSize = 3;
for (let y = -height * gridSize; y < height * (gridSize + 1); y++) {
  const yMod = Math.abs(Math.floor(y / height));
  let r = "";
  for (let x = -width * gridSize; x < width * (gridSize + 1); x++) {
    const xMod = Math.abs(Math.floor(x / width));
    // const l = (x < width && x >= 0 ? 1 : 0) + (y < height && y >= 0 ? 1 : 0);
    // const col = ["gray" as const, "blue" as const, "green" as const][l];
    const col = (yMod + xMod) % 2 ? "blue" : "gray";
    r += chalk[col](pos.has(`${x},${y}`) ? "O" : " ");
  }
  console.log(r);
}

console.log({
  centerCountEven,
  centerCountOdd,
  edgeCounts,
  cornerCounts,
  counts,
});
// for (let y = -height * 2; y < height * 3; y++) {
//   let r = "";
//   for (let x = -width * 2; x < width * 3; x++) {
//     const l = (x < width && x >= 0 ? 1 : 0) + (y < height && y >= 0 ? 1 : 0);
//     const col = ["gray" as const, "blue" as const, "green" as const][l];
//     r += chalk[col](pos.has(`${x},${y}`) ? "O" : " ");
//   }
//   console.log(r);
// }
//
// console.log(counts[131 - 1], counts[393 - 1], counts[655 - 1]);
// console.log(counts[131], counts[393], counts[655]);
// console.log(counts[65 - 1], counts[131], counts[196 - 1], counts[262], counts[327 - 1]);
// console.log((counts[655] - counts[393]) / (counts[393] - counts[131]));

// for (let S = N * 2 + 1; S < N * 12; S++) {
for (const S of [26501365]) {
  // const S = N * 2 + 2;

  /*
  // Sequence: 1, 1+4,1+4+8,1+4+8+2
  ...#...
  ..###..
  .#####.
  #######
  .#####.
  ..###..
  ...#...
   */

  const centerN = Math.floor(S / (N * 2 + 1));

  // const centers = 5
  // const oddCenters = 1;

  const centers = 2 * ((centerN - 1) * centerN) + 1;
  // const oddCenters = centers < 6 ? 1 : 9;
  // const oddCenters = (2 * centerN - 1) ** 2;
  const oddCenters = centerN % 2 === 0 ? (centerN - 1) ** 2 : centerN ** 2;
  const evenCenters = centers - oddCenters;

  const sequencePosition = S % (N * 4 + 2);

  const outerCorners = centerN;
  const innerCorners = centerN - 1;

  const evenCenterCount = S % 2 === 0 ? centerCountEven : centerCountOdd;
  const oddCenterCount = S % 2 === 0 ? centerCountOdd : centerCountEven;
  const centerPart = evenCenters * evenCenterCount + oddCenters * oddCenterCount;
  const edgePartOuter = sequencePosition > N ? edgeCounts[sequencePosition - N] : 0;
  // const edgePartInner = (S - N) % (N * 4) > N * 2 + 1 ? edgeCounts[(S - N * 3 - 1) % (N * 2)] : 0;
  const edgePartInner =
    S > N * 3 && (sequencePosition > N * 3 + 1 || sequencePosition < N * 2 + 1)
      ? edgeCounts[((sequencePosition + N) % (N * 4 + 2)) + 1]
      : 0;
  let cornerPartInner, cornerPartOuter;
  if (sequencePosition < N * 2 + 1) {
    cornerPartInner = innerCorners * cornerCounts[(S + N * 2 + 1) % (N * 4 + 2)];
    cornerPartOuter = outerCorners * cornerCounts[sequencePosition];
  } else {
    cornerPartInner = innerCorners * cornerCounts[sequencePosition];
    cornerPartOuter = outerCorners * cornerCounts[(S + N * 2 + 1) % (N * 4 + 2)];
  }
  // const cornerPartInner = innerCorners * cornerCounts[(S + N * 2 + 1) % (N * 4 + 2)];
  // const cornerPartOuter = outerCorners * cornerCounts[sequencePosition];
  // (sequencePosition <= N * 2 && sequencePosition > 0 ? cornerCounts[sequencePosition] ?? 0 : 0);

  // prettier-ignore
  const answer =
    centerPart
    + edgePartInner
    + edgePartOuter
    + cornerPartOuter
    + cornerPartInner

  console.log(
    "CN:" + centerN,
    "S:" + S,
    "SP:" + sequencePosition.toString().padStart(3),
    "CE:" + evenCenters,
    "CO:" + oddCenters,
    "CP:" + centerPart.toString().padStart(5),
    "EI:" + edgePartInner.toString().padStart(5),
    "EO:" + edgePartOuter.toString().padStart(5),
    "CI:" + cornerPartInner.toString().padStart(5),
    "CO:" + cornerPartOuter.toString().padStart(5),
    "A:" + answer.toString().padStart(5),
    "E:" + counts[S - 1]?.toString().padStart(5),
    answer === counts[S - 1] ? "" : chalk.red("ERROR")
  );
}
// console.log(pos.size);

output(pos.size).forTest(16);
