import { output, loadLines } from "aocutils";

const input = loadLines().map((i) => {
  const [a, b, c] = i.split(" ");
  return {
    direction: a,
    amount: Number(b),
  };
});

const Xs = input
  .filter((i) => i.direction === "R" || i.direction === "L")
  .reduce((a, b) => [...a, a.at(-1)! + b.amount * (b.direction === "L" ? -1 : 1)], [0]);
const minX = Xs.min();
const maxX = Xs.max();
const Ys = input
  .filter((i) => i.direction === "U" || i.direction === "D")
  .reduce((a, b) => [...a, a.at(-1)! + b.amount * (b.direction === "U" ? -1 : 1)], [0]);
const minY = Ys.min();

const width = maxX - minX + 1;
const startX = -minX;
const startY = -minY;

const corners: number[] = [];

const position = [startX, startY];

for (const line of input) {
  switch (line.direction) {
    case "U":
      position[1] -= line.amount;
      break;
    case "D":
      position[1] += line.amount;
      break;
    case "L":
      position[0] -= line.amount;
      break;
    case "R":
      position[0] += line.amount;
      break;
  }
  corners.push(position[0] + position[1] * width);
}

const movedCorners = corners.map((i, index) => {
  const p = corners[(index + corners.length - 1) % corners.length];
  const px = p % width;
  const py = Math.floor(p / width);
  const x = i % width;
  const y = Math.floor(i / width);
  const n = corners[(index + 1) % corners.length];
  const nx = n % width;
  const ny = Math.floor(n / width);

  const directionIn = px < x ? "R" : px > x ? "L" : py < y ? "D" : "U";
  const directionOut = nx > x ? "R" : nx < x ? "L" : ny > y ? "D" : "U";
  const d = directionIn + directionOut;

  const off = {
    RD: [1, 0],
    DL: [1, 1],
    LD: [1, 1],
    DR: [1, 0],
    LU: [0, 1],
    UL: [0, 1],
    UR: [0, 0],
    RU: [0, 0],
  }[d]!;

  return [x + off[0], y + off[1]];
});
movedCorners.push(movedCorners[0]);

let a2 = 0;
for (let i = 0; i < movedCorners.length - 1; i++) {
  const [ax, ay] = movedCorners[i];
  const [bx, by] = movedCorners[i + 1];
  a2 += ax * by - ay * bx;
}
const area = a2 * 0.5;

output(area).forTest(62).forActual(47139);
