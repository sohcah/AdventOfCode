import { p, load, output } from "aocutils";

const ENABLE_SELF_LOOPING_FAST_PATH = false;

function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

const start = performance.now();
const code = p(/[A-Z0-9]{3}/);
const mapping = p`${code("key")} = ${p`(${code("left")}, ${code("right")})`("value")}`;
const input = load(p`${p(/[LR]/).list("")("lr")}\n\n${mapping.list("\n").dict()("mappings")}`);

const positionNumbers = new Map<string, number>();
for (const key of Object.keys(input.mappings)) {
  positionNumbers.set(key, positionNumbers.size);
}
const isZ = Object.keys(input.mappings).map((i) => i[2] === "Z");

const starts = Object.keys(input.mappings)
  .filter((i) => i[2] === "A")
  .map((i) => positionNumbers.get(i)!);

const mappings = new Map<number, { left: number; right: number }>();
for (const [key, value] of Object.entries(input.mappings)) {
  mappings.set(positionNumbers.get(key)!, {
    left: positionNumbers.get(value.left)!,
    right: positionNumbers.get(value.right)!,
  });
}

const loops = new Array<{
  start: number;
  items: number[];
} | null>(starts.length).fill(null);

for (let p = 0; p < starts.length; p++) {
  let position = starts[p];
  const sequence = [starts[p]];
  const found = new Map<number, number>();
  for (let i = 0; i < 1000000000; i++) {
    const lr = input.lr[i % input.lr.length];
    const mapping = mappings.get(position)!;
    if (lr === "R") {
      position = mapping.right;
    } else {
      position = mapping.left;
    }
    const key = position * input.lr.length + (i % input.lr.length);
    const last = found.get(key);
    if (last) {
      loops[p] = {
        start: last + 1,
        items: sequence.slice(last + 1),
      };
      console.log(`Found loop for ${p}`, performance.now() - start);
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
