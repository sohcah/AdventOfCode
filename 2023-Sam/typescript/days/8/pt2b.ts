import { p, load, output } from "aocutils";

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
    // console.log(loops);
    const indexes = loops.map((l) => {
      return l!.items.flatMap((i, n) => (i[2] === "Z" ? [(n + l!.start) % l!.items.length] : [])); //  + l!.start
    });
    let largest = [0, 0];
    for (let l = 0; l < loops.length; l++) {
      if (largest[1] > loops[l]!.items.length) largest = [l, loops[l]!.items.length];
    }
    const loopToUse = largest[0];
    console.log(
      loops.map((i) => [i.start, i.items.length]),
      indexes
    );
    for (let n = 1; n < 10_000_000_000; n++) {
      a: for (let j = 0; j < indexes[loopToUse].length; j++) {
        const q = indexes[0][j] + loops[0]!.items.length * n;
        b: for (let l = 0; l < loops.length; l++) {
          if (l === loopToUse) continue;
          const offset = q % loops[l]!.items.length;
          for (let k = 0; k < indexes[l].length; k++) {
            if (offset === indexes[l][k]) {
              continue b;
            }
          }
          continue a;
        }
        answer = q;
        break outer;
      }
    }
    break;
  }
}

output(answer).forTest(6);
