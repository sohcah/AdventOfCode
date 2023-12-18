import { output, loadLines } from "aocutils";

const input = loadLines().map((i) => {
  const c = i.split(" ")[2];
  return {
    direction: (["R", "D", "L", "U"] as const)[Number(c[7])],
    amount: parseInt(c.slice(2, 7), 16),
  };
});
// const input = loadLines().map((i) => {
//   const [a, b, c] = i.split(" ");
//   return {
//     direction: a,
//     amount: Number(b),
//     colour: c.slice(2, -1),
//   };
// });

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

const width = maxX - minX + 1;
const startX = -minX;
const height = maxY - minY + 1;
const startY = -minY;

console.log(startX, width, startY, height);

// const visited = {
//   U: new Set<number>(),
//   D: new Set<number>(),
//   L: new Set<number>(),
//   R: new Set<number>(),
// };

const corners: number[] = [];

const position = [startX, startY];

for (const line of input) {
  // const visited = line.direction === "L" || line.direction === "R" ? visitedH : visitedV;
  // visited[line.direction].add(position[0] + position[1] * width);
  // for (let i = 0; i < line.amount; i++) {
  //   switch (line.direction) {
  //     case "U":
  //       position[1]--;
  //       break;
  //     case "D":
  //       position[1]++;
  //       break;
  //     case "L":
  //       position[0]--;
  //       break;
  //     case "R":
  //       position[0]++;
  //       break;
  //   }
  //   visited[line.direction].add(position[0] + position[1] * width);
  // }
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

console.log("A", corners.length);

const mc = corners.map((i, index) => {
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
  // console.log(directionIn, directionOut);
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

  const fx = x + off[0];
  const fy = y + off[1];

  // console.log(px, py, x, y, nx, ny, "->", fx, fy);
  return [fx, fy];
});
mc.push(mc[0]);

let a2 = 0;
for (let i = 0; i < mc.length - 1; i++) {
  const [ax, ay] = mc[i];
  const [bx, by] = mc[i + 1];
  a2 += ax * by - ay * bx;
  // console.log(ax, ay);
}
const area = a2 * 0.5;

// const outside = new Set<number>();
// const positions: number[] = [0];
// for (const position of positions) {
//   if (visited.has(position)) continue;
//   if (outside.has(position)) continue;
//   outside.add(position);
//   const x = position % width;
//   const y = Math.floor(position / width);
//   // console.log(x, y);
//   if (x > 0) positions.push(position - 1);
//   if (x < width - 1) positions.push(position + 1);
//   if (y > 0) positions.push(position - width);
//   if (y < height - 1) positions.push(position + width);
// }

// const ans = width * height - outside.size;
//
// for (let y = 0; y < height; y++) {
//   let r = "";
//   for (let x = 0; x < width; x++) {
//     r += outside.has(x + y * width) ? "." : "#";
//   }
//   console.log(r);
// }

// const count = 0;
// for (let y = 0; y < height; y++) {
//   const r = "";
//   const isInside = false;
//   const isInWall = false;
//   for (let x = 0; x < width; x++) {
//     const c = x + y * width;
//     if (visited.U.has(c)) {
//     }
//     // const v = visitedV.has(x + y * width);
//     // const h = visitedH.has(x + y * width);
//     // if (v) {
//     //   if (isInWall) {
//     //     r += "-";
//     //     c++;
//     //   } else {
//     //     r += "#";
//     //     isInside = !isInside;
//     //     isInWall = !isInWall;
//     //     c++;
//     //   }
//     // } else if (h) {
//     //   r += "|";
//     //   isInWall = false;
//     //   c++;
//     // } else {
//     //   if (isInside) {
//     //     r += ".";
//     //     c++;
//     //     isInWall = false;
//     //   } else {
//     //     r += " ";
//     //     isInWall = false;
//     //   }
//     // }
//     // console.log(v);
//   }
//   // console.log(r);
// }

output(area).forTest(952408144115);
