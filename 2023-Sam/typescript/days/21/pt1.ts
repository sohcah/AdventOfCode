import { output, loadLines, IS_TEST } from "aocutils";

const STEPS = IS_TEST ? 6 : 64;

const input = loadLines().map((i) => i.chars);

const startY = input.findIndex((i) => i.includes("S"));
const startX = input[startY].indexOf("S");

const height = input.length;
const width = input[0].length;

let positions: [number, number][] = [[startX, startY]];
for (let step = 0; step < STEPS; step++) {
  const newPositionsSet = new Set<number>();
  const newPositions: [number, number][] = [];
  const addPos = (x: number, y: number) => {
    const c = x + y * width;
    if (!newPositionsSet.has(c)) {
      newPositionsSet.add(c);
      if (input[y][x] !== "#") {
        newPositions.push([x, y]);
      }
    }
  };
  for (const [x, y] of positions) {
    if (x < width - 1) addPos(x + 1, y);
    if (x > 0) addPos(x - 1, y);
    if (y < height - 1) addPos(x, y + 1);
    if (y > 0) addPos(x, y - 1);
  }
  positions = newPositions;
}

console.log(positions.length);

output(positions.length).forTest(16).forActual(3733);
