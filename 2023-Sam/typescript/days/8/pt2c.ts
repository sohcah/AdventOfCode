import { p, load, output } from "aocutils";
function gcd(a: number, b: number) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(numbers: number[]) {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b));
}

// NBN = (BKF, NNH)
const code = p(/[A-Z0-9]{3}/);
const mapping = p`${code("key")} = ${p`(${code("left")}, ${code("right")})`("value")}`;
const input = load(p`${p(/[LR]/).list("")("lr")}\n\n${mapping.list("\n").dict()("mappings")}`);

console.log(input);

const starts = Object.keys(input.mappings).filter((i) => i[2] === "A");
const positions = [...starts];
const sequences = new Array<string[]>(starts.length).fill(null!).map((_, n) => [starts[n]]);
console.log(positions);
const loops = new Array<{
  start: number;
  items: string[];
} | null>(starts.length).fill(null);

let answer = 0;
outer: for (let i = 0; i < 1000000000; i++) {
  const lr = input.lr[i % input.lr.length];
  for (let p = 0; p < positions.length; p++) {
    if (loops[p]) continue;
    const mapping = input.mappings[positions[p]];
    if (lr === "R") {
      positions[p] = mapping.right;
    } else {
      positions[p] = mapping.left;
    }
    const last = sequences[p].findLastIndex(
      (a, n) => i % input.lr.length === (n - 1) % input.lr.length && a === positions[p]
    );
    // console.log(sequences[p]);
    if (last !== -1) {
      loops[p] = {
        start: last,
        items: sequences[p].slice(last),
      };
      console.log(`Found loop for ${p}`);
      continue;
    }
    sequences[p].push(positions[p]);
  }
  if (loops.every((i) => i !== null)) {
    const indexes = loops.map((l) => {
      return l!.items.flatMap((i, n) => (i[2] === "Z" ? [(n + l!.start) % l!.items.length] : [])); //  + l!.start
    });
    let largest = [0, 0];
    for (let l = 0; l < loops.length; l++) {
      if (largest[1] > loops[l]!.items.length) largest = [l, loops[l]!.items.length];
    }
    const loopToUse = largest[0];

    // IF SELF-LOOPING, FAST PATH TO GET ANSWER
    if (indexes.every((i) => i.includes(0))) {
      answer = lcm(loops.map((i) => i!.items.length));
      break outer;
    }

    for (let n = 1; n < 100_000_000_000; n++) {
      a: for (let j = 0; j < indexes[loopToUse].length; j++) {
        const q = indexes[0][j] + loops[0]!.items.length * n;
        for (let l = 0; l < loops.length; l++) {
          if (l === loopToUse) continue;
          const offset = q % loops[l]!.items.length;
          if (!indexes[l].includes(offset)) continue a;
        }
        answer = q;
        break outer;
      }
    }
    break;
  }
}

output(answer).forTest(6).forActual(13334102464297);
