import { p, load, output, loadLines, IS_TEST } from "aocutils";

const MIN_COORD = IS_TEST ? 7 : 200000000000000;
const MAX_COORD = IS_TEST ? 27 : 400000000000000;

console.log(MIN_COORD, MAX_COORD);

const input = loadLines().map((line) => {
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
});

let sum = 0;
for (let i = 0; i < input.length; i++) {
  const a = input[i];
  for (let j = i + 1; j < input.length; j++) {
    const b = input[j];

    // // a.x + a.t * a.dx = b.x + b.t * b.dx;
    // // a.y + a.t * a.dy = b.y + b.t * b.dy;
    // t * a.dx - t * b.dx = b.x - a.x;
    //
    //
    // t * (a.dx - b.dx) = b.x - a.x;

    // const t = (b.x - a.x) / (a.dx - b.dx);
    // const x = a.x + t * a.dx;
    // const y = a.y + t * a.dy;

    // const ax = ()

    // x = a.x + a.t * a.dx, y = a.y + a.t * a.dy

    // t = (y - a.y) / a.dy

    // const axTop = (a.x * ((MIN_COORD - a.y) / a.dy)) / a.dy;
    // const axBottom = (a.x * ((MAX_COORD - a.y) / a.dy)) / a.dy;
    //
    // const bxTop = (b.x * ((MIN_COORD - b.y) / b.dy)) / b.dy;
    // const bxBottom = (b.x * ((MAX_COORD - b.y) / b.dy)) / b.dy;
    //
    // console.log(axTop, bxTop, axBottom, bxBottom);
    // console.log(axTop <= bxTop, axBottom >= bxBottom, axTop >= bxTop, axBottom <= bxBottom)
    //
    // const validXY = (axTop <= bxTop && axBottom >= bxBottom) || (axTop >= bxTop && axBottom <= bxBottom);

    const x1 = a.x;
    const x2 = a.x + MAX_COORD * a.dx;
    const x3 = b.x;
    const x4 = b.x + MAX_COORD * b.dx;
    const y1 = a.y;
    const y2 = a.y + MAX_COORD * a.dy;
    const y3 = b.y;
    const y4 = b.y + MAX_COORD * b.dy;

    const discrim = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / discrim;
    const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / discrim;

    const at = (x - a.x) / a.dx;
    const bt = (x - b.x) / b.dx;

    const validX = x >= MIN_COORD && x <= MAX_COORD;
    const validY = y >= MIN_COORD && y <= MAX_COORD;
    const validT = at > 0 && bt > 0;
    const valid = validT && validX && validY;
    // console.log(validXY, x, y);
    if (valid) {
      sum++;
    }
  }
}

// not 14872
// not 13911

output(sum).forTest(2).forActual(13910);
