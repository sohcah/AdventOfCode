import { p, loadLines, output } from "aocutils";

let input = loadLines().map((i) => i.chars);

function rotate<T>(array: T[][], rotate: number) {
  if (rotate === 0) return array;
  if (rotate === 1 || rotate === -3) {
    return array[0].map((_, n) => array.map((i) => i[n]).reverse());
  }
  if (rotate === 2 || rotate === -2) {
    return array.map((i) => i.slice().reverse()).reverse();
  }
  if (rotate === 3 || rotate === -1) {
    return array[0].map((_, n) => array.map((i) => i[n])).reverse();
  }
  throw new Error("Invalid rotation");
}

const pastPatterns: string[] = [input.map((i) => i.join("")).join("|")];
let loop: string[] = null!;

for (let cycle = 1; cycle < 1000; cycle++) {
  // console.log("----");
  // console.log(input.map((i) => i.join("")).join("\n"));
  for (const i of [3, 0, 1, 2]) {
    input = rotate(
      rotate(input, i).map((i) => {
        let j = i.join("");
        let prev = j;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          j = j.replaceAll(/(\.+)(O+)/g, "$2$1");
          if (j === prev) break;
          prev = j;
        }
        return [...j];
      }),
      -i
    );
  }
  const pattern = input.map((i) => i.join("")).join("|");
  const pastIndex = pastPatterns.indexOf(pattern);
  if (pastIndex !== -1) {
    const length = cycle - pastIndex;
    const offset = length - cycle % length;
    // console.log("loop", pastIndex, cycle, length, offset);
    loop = [...pastPatterns.slice(pastIndex)];
    loop = [...loop.slice(offset), ...loop.slice(0, offset)];
    // console.log(loop);
    // console.log(cycle % loop.length, pattern);
    // console.log(loop[cycle % loop.length] === pattern);
    break;
  }
  pastPatterns.push(pattern);
}
// console.log("----");
// console.log(input.map((i) => i.join("")).join("\n"));

input = loop[1000000000 % loop.length].split("|").map((i) => i.chars);
// console.log("----");
// console.log(input.map((i) => i.join("")).join("\n"));

const result = [...input[0]]
  .map((_, n) => input.map((j) => j[n]))
  .map((i) => {
    return i.map((c, n) => {
      if (c === "O") {
        return i.length - n;
      }
      return 0;
    }).sum;
  });

output(result.sum).forTest(64).forActual(102657);
