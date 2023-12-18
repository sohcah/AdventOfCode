import { p, load, output, loadLines } from "aocutils";

const input = loadLines().map((i) => {
  const [a, b, c] = i.split(" ");
  return {
    direction: a,
    amount: Number(b),
    colour: c.slice(2, -1),
  };
});
console.log(input);

const Xs = input
  .filter((i) => i.direction === "R" || i.direction === "L")
  .reduce((a, b) => [...a, a.at(-1)! + b.amount * (b.direction === "L" ? -1 : 1)], [0]);
const minX = Xs.min();
const maxX = Xs.max();
const Ys = input
  .filter((i) => i.direction === "U" || i.direction === "D")
  .reduce((a, b) => [...a, a.at(-1)! + b.amount * (b.direction === "U" ? -1 : 1)], [0]);
const minY = Ys.min();
const maxY = Ys.max();

console.log(minX, maxX, minY, maxY);

const width = maxX - minX + 3;
const startX = -minX + 1;
const height = maxY - minY + 3;
const startY = -minY + 1;

console.log(startX, width, startY, height);

const visited = new Set<number>();
// const visitedV = new Set<number>();
// const visitedH = new Set<number>();
const position = [startX, startY];

for (const line of input) {
  // const visited = line.direction === "L" || line.direction === "R" ? visitedH : visitedV;
  visited.add(position[0] + position[1] * width);
  for (let i = 0; i < line.amount; i++) {
    switch (line.direction) {
      case "U":
        position[1]--;
        break;
      case "D":
        position[1]++;
        break;
      case "L":
        position[0]--;
        break;
      case "R":
        position[0]++;
        break;
    }
    visited.add(position[0] + position[1] * width);
  }
}

const outside = new Set<number>();
const positions: number[] = [0];
for(const position of positions) {
  if (visited.has(position)) continue;
  if (outside.has(position)) continue;
  outside.add(position);
  const x = position % width;
  const y = Math.floor(position / width);
  console.log(x, y);
  if (x > 0) positions.push(position - 1);
  if (x < width - 1) positions.push(position + 1);
  if (y > 0) positions.push(position - width);
  if (y < height - 1) positions.push(position + width);
}

const ans = width * height - outside.size;

for (let y = 0; y < height; y++) {
  let r = "";
  for (let x = 0; x < width; x++) {
    r += outside.has(x + y * width) ? "." : "#";
  }
  console.log(r);
}

// let c = 0;
// for (let y = 0; y < height; y++) {
//   let r = "";
//   let isInside = false;
//   let isInWall = false;
//   for (let x = 0; x < width; x++) {
//     const v = visitedV.has(x + y * width);
//     const h = visitedH.has(x + y * width);
//     if (v) {
//       if (isInWall) {
//         r += "-";
//         c++;
//       } else {
//         r += "#";
//         isInside = !isInside;
//         isInWall = !isInWall;
//         c++;
//       }
//     } else if (h) {
//       r += "|";
//       isInWall = false;
//       c++;
//     } else {
//       if (isInside) {
//         r += ".";
//         c++;
//         isInWall = false;
//       } else {
//         r += " ";
//         isInWall = false;
//       }
//     }
//     // console.log(v);
//   }
//   console.log(r);
// }

output(ans).forTest(62);
