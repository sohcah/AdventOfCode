import { loadLines, output } from "aocutils";

let input = loadLines().map((i) => i.chars);

function rotate<T>(array: T[][], rotate: number) {
  if (rotate === 0) return array;
  if (rotate === 1 || rotate === -3) {
    return array[0].map((_, n) => array.map((i) => i[n]).reverse());
  }
  if (rotate === 2 || rotate === -2) {
    return array.map((i) => i.toReversed()).reverse();
  }
  if (rotate === 3 || rotate === -1) {
    return array[0].map((_, n) => array.map((i) => i[n])).reverse();
  }
  throw new Error("Invalid rotation");
}

const pastPatterns: string[] = [input.map((i) => i.join("")).join("|")];
let loop: string[] = null!;

for (let cycle = 1; cycle < 1000; cycle++) {
  for (const i of [1, 2, 3, 0]) {
    input = rotate(
      rotate(input, i).map((i) => {
        const j = i.slice();
        let backToIndex = 0;
        for (let n = 0; n < j.length - 1; n++) {
          if (j[n] === "#") {
            backToIndex = n + 1;
            continue;
          }
          if (j[n] === "O" && j[n + 1] === ".") {
            j.splice(backToIndex, 0, ...j.splice(n + 1, 1));
          }
        }
        return j;
      }),
      -i
    );
  }
  const pattern = input.map((i) => i.join("")).join("|");
  const pastIndex = pastPatterns.indexOf(pattern);
  if (pastIndex !== -1) {
    const length = cycle - pastIndex;
    const offset = length - (cycle % length);
    loop = [...pastPatterns.slice(pastIndex)];
    loop = [...loop.slice(offset), ...loop.slice(0, offset)];
    break;
  }
  pastPatterns.push(pattern);
}

const gridAfterCycles = loop[1000000000 % loop.length].split("|");

const result = [...gridAfterCycles[0]]
  .map((_, n) => gridAfterCycles.map((j) => j[n]))
  .map((i) => {
    return i.reduce((a, c, n) => {
      if (c === "O") {
        return a + i.length - n;
      }
      return a;
    }, 0);
  });

output(result.sum).forTest(64).forActual(102657);
