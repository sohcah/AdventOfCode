import { output, loadLines } from "aocutils";

const STEPS = 26501365;

const input = loadLines().map((i) => i.chars);

const N = (input.length - 1) / 2; // 65;

const startY = input.findIndex((i) => i.includes("S"));
const startX = input[startY].indexOf("S");

const height = input.length;
const width = input[0].length;

if (width !== height) throw new Error("Width and Height must be equal");

const oddPositions = new Set<string>();
const evenPositions = new Set<string>();

let centerCountEven = -1;
let centerCountOdd = -1;
const edgeCounts: number[] = [];
const cornerCounts: number[] = [];

const counts: number[] = [];

let positions: [number, number][] = [[startX, startY]];
for (let step = 0; step < N * 6 + 2; step++) {
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
    if (step % height === (STEPS % height) - 1) {
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
    }
    edgeCounts.push(edgeCount);
  }
  if (step >= N * 2 && step < N * 6 + 2) {
    let cornerCount = 0;
    if (step % height === (STEPS % height) - 1) {
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
    }
    cornerCounts.push(cornerCount);
  }
  counts.push(newPositionsSet.size);
}

const centerN = Math.floor(STEPS / (N * 2 + 1));

const centers = 2 * ((centerN - 1) * centerN) + 1;
const oddCenters = centerN % 2 === 0 ? (centerN - 1) ** 2 : centerN ** 2;
const evenCenters = centers - oddCenters;

const sequencePosition = STEPS % (N * 4 + 2);

const outerCorners = centerN;
const innerCorners = centerN - 1;

const evenCenterCount = STEPS % 2 === 0 ? centerCountEven : centerCountOdd;
const oddCenterCount = STEPS % 2 === 0 ? centerCountOdd : centerCountEven;
const centerPart = evenCenters * evenCenterCount + oddCenters * oddCenterCount;
const edgePartOuter = sequencePosition > N ? edgeCounts[sequencePosition - N] : 0;
const edgePartInner =
  STEPS > N * 3 && (sequencePosition > N * 3 + 1 || sequencePosition < N * 2 + 1)
    ? edgeCounts[((sequencePosition + N) % (N * 4 + 2)) + 1]
    : 0;
let cornerPartInner, cornerPartOuter;
if (sequencePosition < N * 2 + 1) {
  cornerPartInner = innerCorners * cornerCounts[(STEPS + N * 2 + 1) % (N * 4 + 2)];
  cornerPartOuter = outerCorners * cornerCounts[sequencePosition];
} else {
  cornerPartInner = innerCorners * cornerCounts[sequencePosition];
  cornerPartOuter = outerCorners * cornerCounts[(STEPS + N * 2 + 1) % (N * 4 + 2)];
}
// prettier-ignore
const answer =
    centerPart
    + edgePartInner
    + edgePartOuter
    + cornerPartOuter
    + cornerPartInner

output(answer).forTest(-1).forActual(617729401414635);
