import { loadLines, output } from "aocutils";

let input = loadLines().map((i) => i.chars);

function rotate<T>(array: T[][]) {
  return array[0].map((_, n) => array.map((i) => i[n]).toReversed());
}

const pastPatterns: string[] = [input.map((i) => i.join("")).join("|")];
const pastPatternsMap = new Map([[pastPatterns[0], 0]]);
let loop: string[] = null!;

let cycleTime = 0;

for (let cycle = 1; cycle < 1000; cycle++) {
  const start = performance.now();
  for (let i = 0; i < 4; i++) {
    input = rotate(input);
    input.forEach((j) => {
      let backToIndex = 0;
      let countDot = 0;
      for (let n = 0; n <= j.length; n++) {
        if (j[n] === "#" || n === j.length) {
          for (let i = backToIndex; i < n; i++) {
            j[i] = i < backToIndex + countDot ? "." : "O";
          }
          backToIndex = n + 1;
          countDot = 0;
          continue;
        }
        if (j[n] === ".") {
          countDot++;
        }
      }
    });
  }
  cycleTime += performance.now() - start;
  const pattern = input.map((i) => i.join("")).join("|");
  const pastIndex = pastPatternsMap.get(pattern);
  if (pastIndex !== undefined) {
    const length = cycle - pastIndex;
    const offset = length - (cycle % length);
    loop = [...pastPatterns.slice(pastIndex)];
    loop = [...loop.slice(offset), ...loop.slice(0, offset)];
    break;
  }
  pastPatternsMap.set(pattern, pastPatterns.length);
  pastPatterns.push(pattern);
}

console.log(cycleTime);

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
