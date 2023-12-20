import { load, output } from "aocutils";

const ENABLE_SELF_LOOPING_FAST_PATH = true;

function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

let lrList: boolean[];
let isZ: boolean[];
let starts: number[];
let mappings: Array<{
  left: number;
  right: number;
}>;

const start = performance.now();
{
  const [lrInput, inputLines] = load().groups.map((i) => i.lns);

  lrList = [...lrInput[0]].map((i) => i === "R");

  const positionNumbers = new Map<string, number>();
  for (const line of inputLines) {
    positionNumbers.set(line.slice(0, 3), positionNumbers.size);
  }
  isZ = inputLines.map((i) => i[2] === "Z");

  starts = inputLines.filter((i) => i[2] === "A").map((i) => positionNumbers.get(i.slice(0, 3))!);

  mappings = new Array<{
    left: number;
    right: number;
  }>(positionNumbers.size).fill(null!);
  for (const line of inputLines) {
    mappings[positionNumbers.get(line.slice(0, 3))!] = {
      left: positionNumbers.get(line.slice(7, 10))!,
      right: positionNumbers.get(line.slice(12, 15))!,
    };
  }
}

console.log(`Parsed in ${performance.now() - start}ms`);

const loops = new Array<{
  start: number;
  items: number[];
} | null>(starts.length).fill(null);

for (let p = 0; p < starts.length; p++) {
  let position = starts[p];
  const sequence = [starts[p]];
  const found = new Map<number, number>();
  for (let i = 0; i < 1000000000; i++) {
    const lr = lrList[i % lrList.length];
    const mapping = mappings[position];
    if (lr) {
      position = mapping.right;
    } else {
      position = mapping.left;
    }
    const key = position * lrList.length + (i % lrList.length);
    const last = found.get(key);
    if (last) {
      loops[p] = {
        start: last + 1,
        items: sequence.slice(last + 1),
      };
      console.log(`Found loop for ${p}`, performance.now() - start, i);
      break;
    }
    found.set(key, i);
    sequence.push(position);
  }
}

const indexes = loops.map((l) => {
  return l!.items.flatMap((i, n) => (isZ[i] ? [(n + l!.start) % l!.items.length] : [])); //  + l!.start
});

const canDoSelfLoopingFastPath = indexes.every((i) => i.includes(0));

console.log(`Can do self-looping fast path: ${canDoSelfLoopingFastPath}`);

let answer = 0;
// IF SELF-LOOPING, FAST PATH TO GET ANSWER
if (ENABLE_SELF_LOOPING_FAST_PATH && canDoSelfLoopingFastPath) {
  answer = lcm(loops.map((i) => i!.items.length));
} else {
  let largest = [0, 0];
  for (let l = 0; l < loops.length; l++) {
    if (largest[1] > loops[l]!.items.length) largest = [l, loops[l]!.items.length];
  }
  const loopToUse = largest[0];
  const loopToUseLength = loops[loopToUse]!.items.length;
  const loopToUseIndexes = indexes[loopToUse];
  const loopProperties = loops
    .map((i, n) => ({ length: i!.items.length, indexes: indexes[n] }))
    .filter((_, n) => n !== loopToUse);
  let skip = 1;
  const prev = new Array<number | null>(loopProperties.length).fill(null);
  nLoop: for (let n = 1; n < 100_000_000_000; n += skip) {
    for (let j = 0; j < loopToUseIndexes.length; j++) {
      const q = loopToUseIndexes[j] + loopToUseLength * n;
      if (
        loopProperties.every(({ length, indexes }, l) => {
          const matches = indexes.includes(q % length);
          if (matches) {
            if (prev[l] !== null) {
              skip = Math.max(skip, (q - prev[l]!) / loopToUseLength);
            }
            prev[l] = q;
          }
          return matches;
        })
      ) {
        answer = q;
        break nLoop;
      }
    }
  }
}

output(answer).forTest(6).forActual(13334102464297);
