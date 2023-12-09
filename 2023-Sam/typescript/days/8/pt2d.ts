import { p, load, output } from "aocutils";
function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

const code = p(/[A-Z0-9]{3}/);
const mapping = p`${code("key")} = ${p`(${code("left")}, ${code("right")})`("value")}`;
const input = load(p`${p(/[LR]/).list("")("lr")}\n\n${mapping.list("\n").dict()("mappings")}`);

const starts = Object.keys(input.mappings).filter((i) => i[2] === "A");
const positions = [...starts];
const sequences = new Array<string[]>(starts.length).fill(null!).map((_, n) => [starts[n]]);
const found = new Array(starts.length).fill(null!).map(() => new Map<string, number[]>());
const loops = new Array<{
  start: number;
  items: string[];
} | null>(starts.length).fill(null);

for (let i = 0; i < 1000000000; i++) {
  const lr = input.lr[i % input.lr.length];
  for (let p = 0; p < positions.length; p++) {
    if (loops[p]) continue;
    const mapping = input.mappings[positions[p]];
    if (lr === "R") {
      positions[p] = mapping.right;
    } else {
      positions[p] = mapping.left;
    }
    if (found[p].has(positions[p])) {
      const got = found[p].get(positions[p])!;
      const last = got.findLast((n) => i % input.lr.length === n % input.lr.length);
      if (last) {
        loops[p] = {
          start: last + 1,
          items: sequences[p].slice(last + 1),
        };
        console.log(`Found loop for ${p}`);
        continue;
      }
      found[p].set(positions[p], [...got, i]);
    } else {
      found[p].set(positions[p], [i]);
    }
    sequences[p].push(positions[p]);
  }
  if (loops.every((i) => i !== null)) {
    break;
  }
}

const indexes = loops.map((l) => {
  return l!.items.flatMap((i, n) => (i[2] === "Z" ? [(n + l!.start) % l!.items.length] : [])); //  + l!.start
});

let answer = 0;
// IF SELF-LOOPING, FAST PATH TO GET ANSWER
if (indexes.every((i) => i.includes(55))) {
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
  nLoop: for (let n = 1; n < 100_000_000_000; n++) {
    for (let j = 0; j < loopToUseIndexes.length; j++) {
      const q = loopToUseIndexes[j] + loopToUseLength * n;
      if (loopProperties.every(({ length, indexes }) => indexes.includes(q % length))) {
        answer = q;
        break nLoop;
      }
    }
  }
}

output(answer).forTest(6).forActual(13334102464297);
